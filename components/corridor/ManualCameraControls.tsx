'use client';

import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

type Room = 'projects' | 'about' | 'journey' | 'contact';
export type ManualLocation = 'outside' | 'hallway' | Room;
export type CameraCommand = { id: number; action: 'forward' | 'back' | 'left' | 'right' | 'turn-left' | 'turn-right' | 'face-left' | 'face-right' | 'reset' | 'seat' };
export type HandInput = { lookX: number; lookY: number; forward: number };
const roomCoordinates: Record<Room, { side: number; z: number }> = {
  projects: { side: -1, z: 1 }, about: { side: 1, z: 1 },
  journey: { side: -1, z: -9 }, contact: { side: 1, z: -9 },
};
const roomNames = Object.keys(roomCoordinates) as Room[];

export function locateCamera(x: number, z: number): ManualLocation {
  if (z > 8.05) return 'outside';
  if (Math.abs(x) > 4.05) {
    const side = Math.sign(x);
    return roomNames.reduce<Room | null>((best, room) => {
      const candidate = roomCoordinates[room];
      if (candidate.side !== side) return best;
      return !best || Math.abs(z - candidate.z) < Math.abs(z - roomCoordinates[best].z) ? room : best;
    }, null) ?? 'outside';
  }
  return 'hallway';
}

export function canWalkAt(x: number, z: number, entranceOpen: boolean, openedRooms: ReadonlySet<Room>): boolean {
  if (x < -32 || x > 32 || z > 37.5 || z < -18.55) return false;
  if (z >= 8.55) {
    // Neighbor storefronts and tree trunks remain solid too.
    if (Math.abs(x) > 12.7 && Math.abs(x) < 20.3 && z < 13.2) return false;
    for (const side of [-1, 1]) {
      if ((x - side * 10.8) ** 2 + (z - 18.5) ** 2 < 0.5 ** 2) return false;
      if ((x - side * 7.5) ** 2 + (z - 20) ** 2 < 0.35 ** 2) return false;
    }
    return true;
  }
  // The physical doorway is wider than the animated leaves. Give the camera
  // a little breathing room so a gentle cursor yaw cannot trap the visitor on
  // the threshold after the door has opened.
  if (z > 7.75) return entranceOpen && Math.abs(x) < 1.85;
  if (Math.abs(x) <= 3.65) return true;
  for (const room of roomNames) {
    const { side, z: doorZ } = roomCoordinates[room];
    if (Math.sign(x) !== side) continue;
    if (Math.abs(x) < 4.35) {
      if (openedRooms.has(room) && Math.abs(z - doorZ) < 0.95) return true;
    } else if (Math.abs(x) < 12.65 && Math.abs(z - doorZ) < 3.65) return true;
  }
  return false;
}

function isEditing(target: EventTarget | null) {
  return target instanceof Element && !!target.closest('input,textarea,select,button,a,dialog,[role="dialog"],[contenteditable="true"],[data-no-camera]');
}

function pointerAxis(value: number, deadzone: number) {
  return Math.sign(value) * Math.max(0, (Math.abs(value) - deadzone) / (1 - deadzone));
}

export default function ManualCameraControls({ enabled, speed = 1, entranceOpen, openedRooms, cameraCommand, handInput, handInputRef, autoWalk = false, onAutoWalkStop, onLocation }: {
  enabled: boolean; speed?: number; entranceOpen: boolean; openedRooms: ReadonlySet<Room>;
  cameraCommand?: CameraCommand; handInput?: HandInput; handInputRef?: React.MutableRefObject<HandInput>;
  autoWalk?: boolean; onAutoWalkStop?: () => void; onLocation: (location: ManualLocation) => void;
}) {
  const { camera, gl, invalidate } = useThree();
  const rotation = useMemo(() => new THREE.Euler(0, 0, 0, 'YXZ'), []);
  const renderedRotation = useMemo(() => new THREE.Euler(0, 0, 0, 'YXZ'), []);
  const faceTarget = useRef<number | null>(null);
  const keys = useRef(new Set<string>());
  const drag = useRef<{ id: number; x: number; y: number } | null>(null);
  const cursorLook = useRef({ x: 0, y: 0 });
  const impulse = useRef({ forward: 0, strafe: 0, turn: 0, remaining: 0 });
  const movement = useRef({ forward: 0, strafe: 0, turn: 0 });
  const autoWalkStopped = useRef(false);
  const autoWalkBlockedTime = useRef(0);
  const lastLocation = useRef<ManualLocation | null>(null);
  const settings = useRef({ enabled, speed, entranceOpen, openedRooms, handInput, handInputRef, autoWalk, onAutoWalkStop, onLocation });
  settings.current = { enabled, speed, entranceOpen, openedRooms, handInput, handInputRef, autoWalk, onAutoWalkStop, onLocation };
  const stopAutoWalk = () => {
    if (!settings.current.autoWalk || autoWalkStopped.current) return;
    autoWalkStopped.current = true;
    autoWalkBlockedTime.current = 0;
    settings.current.onAutoWalkStop?.();
  };
  const sync = () => rotation.setFromQuaternion(camera.quaternion, 'YXZ');
  const emitLocation = (force = false) => {
    const location = locateCamera(camera.position.x, camera.position.z);
    if (force || location !== lastLocation.current) {
      lastLocation.current = location;
      settings.current.onLocation(location);
    }
  };
  useLayoutEffect(() => {
    sync();
    renderedRotation.copy(rotation);
    faceTarget.current = null;
    keys.current.clear();
    drag.current = null;
    cursorLook.current.x = 0; cursorLook.current.y = 0;
    impulse.current.remaining = 0;
    movement.current.forward = 0; movement.current.strafe = 0; movement.current.turn = 0;
    if (enabled) invalidate(3);
    // Camera orientation belongs to the current physical position on enabling.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, camera, invalidate]);

  useEffect(() => {
    autoWalkStopped.current = false;
    autoWalkBlockedTime.current = 0;
    if (enabled && autoWalk) invalidate();
  }, [autoWalk, enabled, invalidate]);

  useEffect(() => {
    const canvas = gl.domElement;
    const previousTouchAction = canvas.style.touchAction;
    const previousTabIndex = canvas.tabIndex;
    canvas.style.touchAction = 'none';
    canvas.tabIndex = 0;
    canvas.setAttribute('aria-label', 'Interactive studio. Move the pointer to look, hold it near the left or right edge to keep turning, or drag to look around. Use W/S or up/down to walk and left/right to face each side.');
    const keyDown = (event: KeyboardEvent) => {
      if (!settings.current.enabled || event.altKey || event.ctrlKey || event.metaKey || isEditing(event.target)) return;
      const key = event.key.toLowerCase();
      if (!['w', 'a', 's', 'd', 'q', 'e', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) return;
      stopAutoWalk();
      event.preventDefault(); keys.current.add(key); invalidate();
      if (key === 'arrowleft' || key === 'arrowright') {
        keys.current.delete(key);
        if (event.repeat) return;
        cursorLook.current.x = 0; cursorLook.current.y = 0;
        faceTarget.current = rotation.y + (key === 'arrowright' ? -1 : 1) * Math.PI / 2;
        movement.current.turn = 0;
        invalidate();
      } else if (key === 'q' || key === 'e') {
        faceTarget.current = null;
        cursorLook.current.x = 0; cursorLook.current.y = 0;
      }
    };
    const keyUp = (event: KeyboardEvent) => { if (keys.current.delete(event.key.toLowerCase())) invalidate(); };
    const stop = () => {
      stopAutoWalk();
      keys.current.clear(); drag.current = null; faceTarget.current = null;
      cursorLook.current.x = 0; cursorLook.current.y = 0; impulse.current.remaining = 0;
      movement.current.forward = 0; movement.current.strafe = 0; movement.current.turn = 0;
      invalidate();
    };
    const updateCursorLook = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      cursorLook.current.x = THREE.MathUtils.clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
      cursorLook.current.y = THREE.MathUtils.clamp(1 - ((event.clientY - rect.top) / rect.height) * 2, -1, 1);
    };
    const down = (event: PointerEvent) => {
      if (!settings.current.enabled || event.button !== 0 || isEditing(event.target)) return;
      stopAutoWalk();
      // Keep accumulated angles across gestures so both axes can turn through 360°.
      cursorLook.current.x = 0; cursorLook.current.y = 0;
      faceTarget.current = null;
      drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
      canvas.setPointerCapture(event.pointerId); canvas.focus({ preventScroll: true });
      invalidate();
    };
    const move = (event: PointerEvent) => {
      if (!settings.current.enabled || isEditing(event.target)) return;
      const current = drag.current;
      if (!current) {
        if (event.pointerType !== 'mouse') return;
        updateCursorLook(event);
        invalidate();
        return;
      }
      if (current.id !== event.pointerId) return;
      rotation.y -= (event.clientX - current.x) * 0.004;
      rotation.x = THREE.MathUtils.clamp(rotation.x - (event.clientY - current.y) * 0.004, -1.45, 1.45);
      current.x = event.clientX; current.y = event.clientY; invalidate();
    };
    const up = (event: PointerEvent) => {
      if (drag.current?.id !== event.pointerId) return;
      drag.current = null; cursorLook.current.x = 0; cursorLook.current.y = 0;
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
      invalidate();
    };
    const leave = () => { if (!drag.current) { cursorLook.current.x = 0; cursorLook.current.y = 0; invalidate(); } };
    const wheel = (event: WheelEvent) => {
      if (!settings.current.enabled || isEditing(event.target)) return;
      event.preventDefault();
      const perspective = camera as THREE.PerspectiveCamera;
      perspective.fov = THREE.MathUtils.clamp(perspective.fov + Math.sign(event.deltaY) * 3, 28, 95);
      perspective.updateProjectionMatrix(); invalidate();
    };
    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);
    window.addEventListener('blur', stop);
    document.addEventListener('visibilitychange', stop);
    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', up);
    canvas.addEventListener('pointerleave', leave);
    canvas.addEventListener('wheel', wheel, { passive: false });
    return () => {
      window.removeEventListener('keydown', keyDown); window.removeEventListener('keyup', keyUp);
      window.removeEventListener('blur', stop); document.removeEventListener('visibilitychange', stop);
      canvas.removeEventListener('pointerdown', down); canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerup', up); canvas.removeEventListener('pointercancel', up); canvas.removeEventListener('pointerleave', leave); canvas.removeEventListener('wheel', wheel);
      canvas.style.touchAction = previousTouchAction; canvas.tabIndex = previousTabIndex;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camera, gl, invalidate, rotation]);

  useEffect(() => {
    if (!cameraCommand) return;
    stopAutoWalk();
    const action = cameraCommand.action;
    if (action === 'reset') { sync(); renderedRotation.copy(rotation); faceTarget.current = null; keys.current.clear(); drag.current = null; cursorLook.current.x = 0; cursorLook.current.y = 0; impulse.current.remaining = 0; movement.current.forward = 0; movement.current.strafe = 0; movement.current.turn = 0; emitLocation(true); invalidate(4); return; }
    if (action === 'seat' || !settings.current.enabled) return;
    if (action === 'face-left' || action === 'face-right') {
      cursorLook.current.x = 0; cursorLook.current.y = 0;
      faceTarget.current = rotation.y + (action === 'face-right' ? -1 : 1) * Math.PI / 2;
      movement.current.turn = 0;
      impulse.current.remaining = 0;
      invalidate(8);
      return;
    }
    faceTarget.current = null;
    impulse.current = {
      forward: action === 'forward' ? 1 : action === 'back' ? -1 : 0,
      strafe: action === 'right' ? 1 : action === 'left' ? -1 : 0,
      turn: action === 'turn-right' ? 1 : action === 'turn-left' ? -1 : 0,
      remaining: 0.32,
    };
    invalidate(3);
    // Commands are discrete events, their identity is the incremented id.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraCommand?.id]);

  useEffect(() => {
    if (!handInputRef) return;
    const poll = setInterval(() => {
      const hand = handInputRef.current;
      if (settings.current.enabled && !document.hidden && (hand.forward || hand.lookX || hand.lookY)) invalidate();
    }, 75);
    return () => clearInterval(poll);
  }, [handInputRef, invalidate]);
  useFrame((_, delta) => {
    const current = settings.current;
    if (!current.enabled || document.hidden) return;
    const dt = Math.min(delta, 0.08);
    const held = keys.current;
    const command = impulse.current;
    const hasCommand = command.remaining > 0;
    const hand = current.handInputRef?.current ?? current.handInput;
    const manualInput = held.size > 0 || hasCommand || Math.abs(hand?.forward ?? 0) > 0.02 || Math.abs(hand?.lookX ?? 0) > 0.02 || Math.abs(hand?.lookY ?? 0) > 0.02;
    if (current.autoWalk && manualInput) stopAutoWalk();
    const autoForward = current.autoWalk && !autoWalkStopped.current && !manualInput;
    const forward = (held.has('w') || held.has('arrowup') ? 1 : 0) - (held.has('s') || held.has('arrowdown') ? 1 : 0) + (hasCommand ? command.forward : 0) + (hand?.forward ?? 0) + (autoForward ? 1 : 0);
    const strafe = (held.has('d') ? 1 : 0) - (held.has('a') ? 1 : 0) + (hasCommand ? command.strafe : 0);
    const turn = (held.has('e') ? 1 : 0) - (held.has('q') ? 1 : 0) + (hasCommand ? command.turn : 0);
    const pointer = drag.current || faceTarget.current !== null || turn || hand?.lookX || hand?.lookY ? { x: 0, y: 0 } : cursorLook.current;
    const pointerX = pointerAxis(pointer.x, 0.16);
    const pointerY = pointerAxis(pointer.y, 0.16);
    // A steady center keeps exhibits easy to click. Moving toward either edge
    // continues turning, so pointer navigation can explore every direction.
    const edgeTurn = pointerAxis(pointer.x, 0.68);
    const cursorTurn = Math.sign(edgeTurn) * THREE.MathUtils.smoothstep(Math.abs(edgeTurn), 0, 1) * 1.35;
    const smoothTurn = THREE.MathUtils.damp(movement.current.turn, turn, 13, dt);
    movement.current.turn = smoothTurn;
    if (faceTarget.current !== null) {
      rotation.y = THREE.MathUtils.damp(rotation.y, faceTarget.current, 9, dt);
      if (Math.abs(rotation.y - faceTarget.current) < 0.003) {
        rotation.y = faceTarget.current;
        faceTarget.current = null;
      }
    } else {
      rotation.y -= (smoothTurn * 1.65 + (hand?.lookX ?? 0) * 1.35 + cursorTurn) * dt;
    }
    rotation.x = THREE.MathUtils.clamp(rotation.x + (hand?.lookY ?? 0) * dt, -1.45, 1.45);
    const targetYaw = rotation.y - pointerX * 0.34;
    const targetPitch = THREE.MathUtils.clamp(rotation.x + pointerY * 0.28, -1.45, 1.45);
    renderedRotation.y = THREE.MathUtils.damp(renderedRotation.y, targetYaw, 12, dt);
    renderedRotation.x = THREE.MathUtils.damp(renderedRotation.x, targetPitch, 12, dt);
    camera.rotation.copy(renderedRotation);
    const inputLength = Math.hypot(forward, strafe);
    const desiredForward = inputLength > 0 ? forward / Math.max(inputLength, 1) : 0;
    const desiredStrafe = inputLength > 0 ? strafe / Math.max(inputLength, 1) : 0;
    movement.current.forward = THREE.MathUtils.damp(movement.current.forward, desiredForward, 14, dt);
    movement.current.strafe = THREE.MathUtils.damp(movement.current.strafe, desiredStrafe, 14, dt);
    const movingForward = Math.abs(movement.current.forward) > 0.001;
    const movingStrafe = Math.abs(movement.current.strafe) > 0.001;
    // A soft centre-line assist keeps a slightly off-centre cursor path from
    // catching on the entrance frame while the open door is being crossed.
    if (current.entranceOpen && movingForward && Math.abs(desiredStrafe) < 0.1 && Math.abs(camera.position.x) < 1.85 && camera.position.z < 10.3 && camera.position.z > 7.3 && Math.abs(Math.cos(renderedRotation.y)) > 0.65) {
      camera.position.x = THREE.MathUtils.damp(camera.position.x, 0, 3.5, dt);
    }
    if (movingForward || movingStrafe) {
      const distance = 2.9 * THREE.MathUtils.clamp(current.speed, 0.4, 3) * dt;
      const facing = Math.cos(renderedRotation.x) < 0 ? -1 : 1;
      const dx = (-Math.sin(renderedRotation.y) * movement.current.forward * facing + Math.cos(renderedRotation.y) * movement.current.strafe) * distance;
      const dz = (-Math.cos(renderedRotation.y) * movement.current.forward * facing - Math.sin(renderedRotation.y) * movement.current.strafe) * distance;
      const beforeWalkX = camera.position.x;
      const beforeWalkZ = camera.position.z;
      const steps = Math.max(1, Math.ceil(Math.hypot(dx, dz) / 0.12));
      for (let i = 0; i < steps; i++) {
        const nextX = camera.position.x + dx / steps;
        if (canWalkAt(nextX, camera.position.z, current.entranceOpen, current.openedRooms)) camera.position.x = nextX;
        const nextZ = camera.position.z + dz / steps;
        if (canWalkAt(camera.position.x, nextZ, current.entranceOpen, current.openedRooms)) camera.position.z = nextZ;
      }
      if (autoForward && movement.current.forward > 0.2) {
        const walkedDistance = Math.hypot(camera.position.x - beforeWalkX, camera.position.z - beforeWalkZ);
        autoWalkBlockedTime.current = walkedDistance < Math.hypot(dx, dz) * 0.12 ? autoWalkBlockedTime.current + dt : 0;
        if (autoWalkBlockedTime.current >= 0.2) stopAutoWalk();
      } else {
        autoWalkBlockedTime.current = 0;
      }
    }
    if (hasCommand) command.remaining -= dt;
    camera.updateMatrixWorld(true);
    emitLocation();
    const settlingLook = Math.abs(renderedRotation.y - targetYaw) > 0.0005 || Math.abs(renderedRotation.x - targetPitch) > 0.0005;
    if (forward || strafe || turn || hasCommand || movingForward || movingStrafe || Math.abs(smoothTurn) > 0.001 || hand?.lookX || hand?.lookY || cursorTurn || faceTarget.current !== null || settlingLook) invalidate();
  }, -0.5);
  return null;
}


