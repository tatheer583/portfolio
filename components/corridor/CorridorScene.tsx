'use client';

import { Suspense, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Canvas, ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { Edges, Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import RoomExhibits from './RoomExhibits';
import LivingStreet from './LivingStreet';
import ManualCameraControls, { locateCamera, type CameraCommand, type HandInput } from './ManualCameraControls';

type Room = 'projects' | 'about' | 'journey' | 'contact';
type Position = [number, number, number];
export type TourLocation = 'outside' | 'hallway' | Room;
export type CorridorSceneProps = {
  activeRoom: TourLocation;
  onSelectRoom: (room: Room) => void;
  onEnterStudio: () => void;
  onArrival: (location: TourLocation, navigationId?: number) => void;
  hallwayStop?: 0 | 1 | 2;
  navigationId?: number;
  navigationStyle?: 'walk' | 'instant';
  onJumpTo?: (location: TourLocation) => void;
  reducedMotion?: boolean;
  onReady?: () => void;
  mode?: 'manual' | 'auto';
  playing?: boolean;
  speed?: number;
  manualEnabled?: boolean;
  entranceOpen?: boolean;
  onToggleEntrance?: () => void;
  onOpenEntrance?: () => void;
  onCloseEntrance?: () => void;
  autoWalk?: boolean;
  onAutoWalkStop?: () => void;
  onManualLocation?: (location: TourLocation) => void;
  cameraCommand?: CameraCommand;
  handInput?: HandInput;
  handInputRef?: React.MutableRefObject<HandInput>;
  onSeated?: () => void;
  onOpenProject?: (index: number) => void;
  projectIndex?: number;
  onProjectIndexChange?: (index: number) => void;
};
const palette = {
  ink: '#686450', wall: '#fff1bd', wallShade: '#ebdcaa', floor: '#f5edda',
  gray: '#d9dbd7', grayDark: '#bfc2bc', wood: '#d8bb86', sage: '#8f9a7b',
  terracotta: '#c69673', paper: '#fff7dc',
};

function usePaperTexture() {
  return useMemo(() => {
    if (typeof document === 'undefined') return undefined;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 256, 256);
    let seed = 191;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let i = 0; i < 4900; i++) {
      ctx.fillStyle = `rgba(88,73,42,${0.015 + random() * 0.055})`;
      ctx.fillRect(random() * 256, random() * 256, 0.4 + random(), 0.4 + random());
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 3);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);
}

function Block({ position = [0, 0, 0], size, color = palette.wall, rotation, texture, outline = true }: {
  position?: Position; size: Position; color?: string; rotation?: Position;
  texture?: THREE.Texture; outline?: boolean;
}) {
  return <mesh position={position} rotation={rotation} castShadow receiveShadow>
    <boxGeometry args={size} />
    <meshStandardMaterial color={color} map={texture} roughness={0.95} />
    {outline && <Edges color={palette.ink} threshold={30} />}
  </mesh>;
}

function Oval({ width = 0.7, height = 0.32, color = palette.ink, position = [0, 0, 0] }: {
  width?: number; height?: number; color?: string; position?: Position;
}) {
  const points = useMemo(() => Array.from({ length: 65 }, (_, i) => {
    const a = (i / 64) * Math.PI * 2;
    return [Math.cos(a) * width, Math.sin(a) * height, 0] as Position;
  }), [width, height]);
  return <Line position={position} points={points} color={color} lineWidth={1.2} />;
}

function Plant({ position, scale = 1 }: { position: Position; scale?: number }) {
  return <group position={position} scale={scale}>
    <mesh position={[0, 0.25, 0]} castShadow>
      <cylinderGeometry args={[0.31, 0.24, 0.48, 16]} />
      <meshStandardMaterial color={palette.terracotta} roughness={1} />
      <Edges color={palette.ink} threshold={28} />
    </mesh>
    <mesh position={[0, 0.49, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.31, 0.035, 5, 24]} />
      <meshStandardMaterial color={palette.wood} roughness={1} />
    </mesh>
    <mesh position={[0, 0.48, 0]}><cylinderGeometry args={[0.27, 0.27, 0.02, 16]} /><meshStandardMaterial color="#8d8060" /></mesh>
    {Array.from({ length: 7 }, (_, i) => {
      const angle = i * 2.4, height = 0.9 + (i % 3) * 0.22;
      const x = Math.cos(angle) * 0.32, z = Math.sin(angle) * 0.28;
      return <group key={i}>
        <Line points={[[0, 0.48, 0], [x * 0.5, height * 0.8, z * 0.5], [x, height + 0.16, z]]} color={palette.ink} lineWidth={1.5} />
        <mesh position={[x, height, z]} rotation={[0.2, angle, x * 1.5]} scale={[1, 1.7, 0.27]} castShadow>
          <sphereGeometry args={[0.2, 10, 8]} /><meshStandardMaterial color={i % 2 ? '#a0ab89' : '#879574'} roughness={1} />
        </mesh>
        <mesh position={[x * 0.65 - 0.1, height * 0.78, z * 0.6]} rotation={[0.1, angle + 1, -0.7]} scale={[0.7, 1.55, 0.25]}>
          <sphereGeometry args={[0.16, 10, 8]} /><meshStandardMaterial color="#98a17e" roughness={1} />
        </mesh>
      </group>;
    })}
  </group>;
}

function Drawing({ variant = 0 }: { variant?: number }) {
  return <group position={[0, 0, 0.072]}>
    {variant % 3 === 0 ? <>
      <Oval width={0.29} height={0.32} position={[-0.12, 0.28, 0]} color="#b49661" />
      <Line points={[[-0.55, -0.3, 0], [-0.2, 0.04, 0], [0.06, -0.17, 0], [0.34, 0.15, 0], [0.55, -0.26, 0]]} color={palette.ink} lineWidth={1.2} />
      <Line points={[[-0.55, -0.43, 0], [0.54, -0.43, 0]]} color={palette.ink} lineWidth={1} />
    </> : variant % 3 === 1 ? <>
      <Oval width={0.32} height={0.49} /><Oval width={0.27} height={0.44} position={[0.01, 0.01, 0.01]} color="#b2a07c" />
      <Line points={[[0, -0.48, 0.02], [0, 0.46, 0.02]]} color={palette.ink} lineWidth={1} />
      <Line points={[[-0.31, -0.12, 0.02], [0.31, -0.12, 0.02]]} color={palette.ink} lineWidth={1} />
    </> : <>
      <Line points={[[0, -0.5, 0], [0.04, -0.08, 0], [-0.07, 0.3, 0], [0.13, 0.52, 0]]} color={palette.ink} lineWidth={1.3} />
      {[[-0.14, -0.24, -0.5], [0.15, -0.08, 0.65], [-0.15, 0.17, -0.6], [0.14, 0.35, 0.65]].map(([x, y, angle], i) =>
        <group key={i} position={[x, y, 0]} rotation={[0, 0, angle]}><Oval width={0.11} height={0.2} /></group>)}
    </>}
  </group>;
}

function Artwork({ position, rotation = [0, 0, 0], variant = 0, scale = 1 }: {
  position: Position; rotation?: Position; variant?: number; scale?: number;
}) {
  return <group position={position} rotation={rotation} scale={scale}>
    <Block size={[1.42, 1.78, 0.09]} color={palette.wood} />
    <Block position={[0, 0, 0.06]} size={[1.24, 1.59, 0.02]} color={palette.paper} />
    <Drawing variant={variant} />
  </group>;
}

function Sconce({ position, rotation = [0, 0, 0] }: { position: Position; rotation?: Position }) {
  return <group position={position} rotation={rotation}>
    <Block size={[0.14, 0.35, 0.12]} color={palette.grayDark} />
    <Block position={[0, 0.11, 0.18]} size={[0.15, 0.07, 0.35]} color={palette.grayDark} />
    <mesh position={[0, 0.26, 0.34]}>
      <cylinderGeometry args={[0.18, 0.27, 0.27, 16]} />
      <meshStandardMaterial color="#fff5cd" emissive="#f2d99a" emissiveIntensity={0.35} roughness={1} />
      <Edges color={palette.ink} />
    </mesh>
  </group>;
}

function Floor({ width, depth, position = [0, 0, 0], texture }: {
  width: number; depth: number; position?: Position; texture?: THREE.Texture;
}) {
  return <group position={position}>
    <Block position={[0, -0.07, 0]} size={[width, 0.14, depth]} color={palette.floor} texture={texture} />
    {Array.from({ length: Math.floor(depth / 1.8) }, (_, i) => {
      const z = -depth / 2 + (i + 1) * 1.8;
      return <Line key={`row-${i}`} points={[[-width / 2, 0.014, z], [width / 2, 0.014, z + 0.015]]} color="#b9ad90" lineWidth={0.7} />;
    })}
    {Array.from({ length: Math.floor(width / 1.5) }, (_, i) => {
      const x = -width / 2 + (i + 1) * 1.5;
      return <Line key={`col-${i}`} points={[[x, 0.015, -depth / 2], [x + 0.018, 0.015, depth / 2]]} color="#b9ad90" lineWidth={0.7} />;
    })}
  </group>;
}

const rooms: Record<Room, { name: string; topic: string; number: string; side: -1 | 1; z: number }> = {
  projects: { name: 'Projects', topic: 'PROJECTS', number: '01', side: -1, z: 1 },
  about: { name: 'About me', topic: 'ABOUT ME', number: '02', side: 1, z: 1 },
  journey: { name: 'My journey', topic: 'EDUCATION & EXPERIENCE', number: '03', side: -1, z: -9 },
  contact: { name: 'Say hello', topic: 'CONTACT', number: '04', side: 1, z: -9 },
};
const roomNames = Object.keys(rooms) as Room[];

function SceneHtml({ children, position, distanceFactor = 3, occlude = false, screenSpace = false }: {
  children: React.ReactNode; position: Position; distanceFactor?: number; occlude?: boolean; screenSpace?: boolean;
}) {
  const invalidate = useThree((state) => state.invalidate);
  const element = useRef<HTMLDivElement | null>(null);
  const warmupFrames = useRef(8);
  const mounted = useCallback((node: HTMLDivElement | null) => {
    element.current = node;
    if (node) {
      node.style.visibility = 'hidden';
      warmupFrames.current = 8;
      invalidate(8);
    }
  }, [invalidate]);
  useEffect(() => {
    // Html creates a separate DOM root. A demand canvas can finish its first
    // frame before that root attaches its CSS transform refs.
    const retry = () => { warmupFrames.current = 8; invalidate(8); };
    retry();
    const firstRetry = setTimeout(retry, 40);
    const finalRetry = setTimeout(retry, 220);
    return () => { clearTimeout(firstRetry); clearTimeout(finalRetry); };
  }, [invalidate]);
  useFrame(() => {
    const node = element.current;
    if (node) {
      const transformedParent = node.parentElement?.parentElement;
      if (transformedParent?.style.transform.includes('matrix3d') || (screenSpace && node.parentElement?.style.transform.includes('translate3d'))) node.style.visibility = 'visible';
    }
    if (warmupFrames.current > 0) {
      warmupFrames.current -= 1;
      invalidate();
    }
  });
  return <Html transform={!screenSpace} occlude={occlude} distanceFactor={screenSpace ? undefined : distanceFactor} position={position} center>
    <div ref={mounted} style={{ visibility: 'hidden' }}>{children}</div>
  </Html>;
}

function StudioMotes({ reducedMotion, playing }: { reducedMotion: boolean; playing: boolean }) {
  const group = useRef<THREE.Group>(null);
  const motes = useMemo(() => Array.from({ length: 26 }, (_, index) => ({
    x: ((index * 37) % 101) / 10 - 5,
    y: 0.75 + ((index * 17) % 34) / 10,
    z: 18 - ((index * 29) % 39),
    drift: 0.12 + (index % 5) * 0.035,
    phase: index * 0.73,
    scale: 0.018 + (index % 4) * 0.009,
    color: index % 3 === 0 ? '#fff1bd' : index % 3 === 1 ? '#d8d6aa' : '#cbd8bd',
  })), []);

  useFrame((state, delta) => {
    if (!group.current || reducedMotion || !playing) return;
    const time = state.clock.elapsedTime;
    group.current.children.forEach((child, index) => {
      const mote = motes[index];
      child.position.x = mote.x + Math.sin(time * mote.drift + mote.phase) * 0.22;
      child.position.y = mote.y + Math.sin(time * (mote.drift * 1.8) + mote.phase) * 0.2;
      child.position.z = mote.z + Math.cos(time * mote.drift + mote.phase) * 0.14;
      child.rotation.z += Math.min(delta, 0.05) * (0.12 + index * 0.006);
      const material = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
      material.opacity = 0.12 + (Math.sin(time * 0.6 + mote.phase) + 1) * 0.07;
    });
  });

  useEffect(() => {
    if (!reducedMotion || !group.current) return;
    group.current.children.forEach((child, index) => {
      const mote = motes[index];
      child.position.set(mote.x, mote.y, mote.z);
      child.rotation.set(0, 0, 0);
      ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = 0.16;
    });
  }, [motes, reducedMotion]);

  return <group ref={group} renderOrder={4}>
    {motes.map((mote, index) => <mesh key={index} position={[mote.x, mote.y, mote.z]} scale={mote.scale}>
      <sphereGeometry args={[1, 8, 6]} />
      <meshBasicMaterial color={mote.color} transparent opacity={0.16} depthWrite={false} />
    </mesh>)}
  </group>;
}
function DestinationPoint({ position, label, onSelect, reducedMotion, playing }: {
  position: Position; label: string; onSelect: () => void; reducedMotion: boolean; playing: boolean;
}) {
  const halo = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [labelVisible, setLabelVisible] = useState(true);
  const nearby = useRef(true);
  const seconds = useRef(0);
  const gl = useThree((state) => state.gl);
  useFrame((state, delta) => {
    const showLabel = Math.hypot(state.camera.position.x - position[0], state.camera.position.z - position[2]) < 11.5;
    if (showLabel !== nearby.current) { nearby.current = showLabel; setLabelVisible(showLabel); }
    if (!halo.current || !playing) return;
    if (!reducedMotion) seconds.current += Math.min(delta, 0.05);
    halo.current.scale.setScalar(hovered ? 1.18 : reducedMotion ? 1 : 1 + Math.sin(seconds.current * 2.1) * 0.08);
  });
  useEffect(() => () => { gl.domElement.style.cursor = ''; }, [gl]);
  return <group position={position}
    onClick={(event) => { event.stopPropagation(); if (event.delta <= 5) onSelect(); }}
    onPointerOver={(event) => { event.stopPropagation(); setHovered(true); gl.domElement.style.cursor = 'pointer'; }}
    onPointerOut={() => { setHovered(false); gl.domElement.style.cursor = ''; }}>
    <mesh ref={halo} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.028, 0]}>
      <ringGeometry args={[0.25, 0.39, 40]} />
      <meshBasicMaterial color={hovered ? '#8a9b6b' : '#adab72'} transparent opacity={0.65} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
      <circleGeometry args={[0.12, 24]} />
      <meshBasicMaterial color="#fff1bd" transparent opacity={0.85} side={THREE.DoubleSide} />
    </mesh>
    {labelVisible && <SceneHtml position={[0, 0.94, 0]} screenSpace occlude>
      <button type="button" className="studio-destination-point" onClick={onSelect}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} aria-label={'Go here: ' + label}>
        <span aria-hidden="true" className="studio-point-dot" />{label}<span aria-hidden="true">↗</span>
      </button>
    </SceneHtml>}
  </group>;
}

function EntrancePassage({ enabled, opened, onOpen, onClose }: {
  enabled: boolean; opened: boolean; onOpen?: () => void; onClose?: () => void;
}) {
  const camera = useThree((state) => state.camera);
  const direction = useMemo(() => new THREE.Vector3(), []);
  const thresholdSeen = useRef(false);
  const lastZ = useRef(camera.position.z);
  const request = useRef<'open' | 'close' | null>(null);
  useEffect(() => { request.current = null; if (!opened || !enabled) thresholdSeen.current = false; }, [opened, enabled]);
  useFrame(() => {
    const { x, z } = camera.position;
    const outward = z > lastZ.current + 0.0001;
    lastZ.current = z;
    if (!enabled) return;
    camera.getWorldDirection(direction);
    // Leaving from inside should feel just as natural as coming in.
    if (!opened && Math.abs(x) < 1.3 && z > 5.7 && z < 7.75 && (direction.z > 0.35 || outward) && request.current !== 'open') {
      request.current = 'open'; onOpen?.();
    }
    if (!opened) return;
    if (z >= 7.15 && z <= 9.25) thresholdSeen.current = true;
    if (thresholdSeen.current && (z < 7.15 || z > 9.25) && request.current !== 'close') {
      request.current = 'close'; thresholdSeen.current = false; onClose?.();
    }
  });
  return null;
}

function RoomPassage({ enabled, openedRoom, onOpen, onClose }: {
  enabled: boolean; openedRoom: Room | null; onOpen: (room: Room) => void; onClose: (room: Room) => void;
}) {
  const camera = useThree((state) => state.camera);
  const crossedThreshold = useRef(false);
  const pendingOpen = useRef<Room | null>(null);
  useEffect(() => {
    crossedThreshold.current = false;
    pendingOpen.current = null;
  }, [enabled, openedRoom]);
  useFrame(() => {
    if (!enabled) return;
    const { x, z } = camera.position;
    const physicalRoom = inferRoom(camera.position);
    // A visitor already inside a room must always have a usable exit.
    // Hallway entry still requires opening the actual door first.
    if (physicalRoom && physicalRoom !== openedRoom && pendingOpen.current !== physicalRoom) {
      pendingOpen.current = physicalRoom;
      onOpen(physicalRoom);
      return;
    }
    if (!openedRoom) return;
    const doorway = rooms[openedRoom];
    if (Math.sign(x) === doorway.side && Math.abs(x) >= 3.4 && Math.abs(z - doorway.z) < 3.65) {
      crossedThreshold.current = true;
    }
    // The region changes at x=4.05, before the whole doorway is clear.
    // Keep the leaf and passage open until the camera is safely in the hall.
    if (crossedThreshold.current && Math.abs(x) < 3.4) {
      crossedThreshold.current = false;
      onClose(openedRoom);
    }
  });
  return null;
}

function Door({ room, opened, onSelect, reducedMotion, navigating, playing }: {
  room: Room; opened: boolean; onSelect: (room: Room) => void; reducedMotion: boolean; navigating: boolean; playing: boolean;
}) {
  const { name, topic, number, side, z } = rooms[room];
  const leaf = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  useFrame((_, delta) => {
    if (!leaf.current || !playing) return;
    const angle = opened ? 1.55 : hovered && !reducedMotion ? 0.12 : 0;
    leaf.current.rotation.y = reducedMotion ? angle : THREE.MathUtils.damp(leaf.current.rotation.y, angle, 7.5, delta);
  });
  const activate = (event: ThreeEvent<MouseEvent>) => { event.stopPropagation(); if (event.delta > 5) return; if (!navigating) onSelect(room); };
  return <group position={[side * 3.99, 0, z]} rotation={[0, side === -1 ? Math.PI / 2 : -Math.PI / 2, 0]}>
    <Block position={[-1.17, 1.76, 0]} size={[0.14, 3.52, 0.27]} color={palette.paper} />
    <Block position={[1.17, 1.76, 0]} size={[0.14, 3.52, 0.27]} color={palette.paper} />
    <Block position={[0, 3.46, 0]} size={[2.48, 0.14, 0.27]} color={palette.paper} />
    <group ref={leaf} position={[-1.07, 0, 0.025]}>
      <group position={[1.07, 0, 0]} onClick={activate}
        onPointerOver={(event) => { event.stopPropagation(); setHovered(true); }} onPointerOut={() => setHovered(false)}>
        <Block position={[0, 1.7, 0]} size={[2.14, 3.37, 0.11]} color={hovered ? '#e2e3dc' : palette.gray} />
        <Block position={[0, 0.88, 0.065]} size={[1.73, 1.24, 0.025]} color={palette.gray} />
        <Block position={[0, 2.36, 0.065]} size={[1.73, 1.32, 0.025]} color={palette.gray} />
        <mesh position={[0, 2.46, 0.11]} scale={[0.84, 0.36, 0.027]}>
          <sphereGeometry args={[1, 32, 16]} /><meshStandardMaterial color={palette.paper} roughness={1} />
        </mesh>
        <Oval position={[0, 2.46, 0.145]} width={0.84} height={0.36} />
        <SceneHtml position={[0, 2.46, 0.18]} occlude>
          <button disabled={navigating} type="button" className="corridor-door-label" onClick={() => onSelect(room)}
            onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
            style={{ width: 195, background: 'transparent', border: 0, color: palette.ink, cursor: 'pointer', fontFamily: 'Georgia, serif', fontSize: 18, lineHeight: 1.25, padding: '12px 0' }}
            aria-label={`Open ${name} door`}>{name}</button>
        </SceneHtml>
        <mesh position={[0.79, 1.48, 0.17]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.16, 10]} /><meshStandardMaterial color="#867a5b" roughness={0.45} />
        </mesh>
        <Block position={[0.68, 1.48, 0.26]} size={[0.29, 0.055, 0.045]} color="#b6a17a" />
        {[0.46, 2.9].map((y) => <Block key={y} position={[-1.07, y, 0.01]} size={[0.05, 0.16, 0.14]} color={palette.grayDark} />)}
      </group>
    </group>
    <SceneHtml position={[0, 3.85, 0.08]} distanceFactor={2.7} occlude>
      <span aria-hidden="true" style={{ color: palette.ink, fontFamily: 'Georgia, serif', fontSize: 14, letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>{number} / {topic}</span>
    </SceneHtml>
    <Sconce position={[1.75, 2.92, 0.01]} />
  </group>;
}

function Entrance({ opened, onEnter, reducedMotion, navigating, playing, auto }: {
  opened: boolean; onEnter: () => void; reducedMotion: boolean; navigating: boolean; playing: boolean; auto: boolean;
}) {
  const left = useRef<THREE.Group>(null);
  const right = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  useFrame((state, delta) => {
    if (!playing) return;
    const nearby = !auto || state.camera.position.z <= 11.5;
    const angle = opened && nearby ? 1.47 : hovered && !reducedMotion ? 0.08 : 0;
    if (left.current) left.current.rotation.y = reducedMotion ? angle : THREE.MathUtils.damp(left.current.rotation.y, angle, 7, delta);
    if (right.current) right.current.rotation.y = reducedMotion ? -angle : THREE.MathUtils.damp(right.current.rotation.y, -angle, 7, delta);
  });
  return <group position={[0, 0, 8.05]}>
    {[-1, 1].map((side) => <Block key={side} position={[side * 2.78, 2.65, 0]} size={[2.88, 5.3, 0.29]} color={palette.wall} />)}
    <Block position={[0, 4.43, 0]} size={[2.7, 1.74, 0.29]} color={palette.wall} />
    <Block position={[0, 5.39, 0.62]} size={[9.13, 0.17, 1.94]} color={palette.wallShade} />
    <Block position={[0, 0.08, 0.53]} size={[3.2, 0.15, 1.45]} color={palette.wood} />
    {[-1.32, 1.32].map((x) => <Block key={x} position={[x, 1.81, 0.15]} size={[0.13, 3.62, 0.25]} color={palette.paper} />)}
    <Block position={[0, 3.61, 0.15]} size={[2.76, 0.12, 0.25]} color={palette.paper} />
    {[-1, 1].map((side) => <group key={side} ref={side === -1 ? left : right} position={[side * 1.25, 0, 0.12]}>
      <group position={[-side * 0.615, 0, 0]} onClick={(event) => { event.stopPropagation(); if (event.delta > 5) return; if (!navigating) onEnter(); }}
        onPointerOver={(event) => { event.stopPropagation(); setHovered(true); }} onPointerOut={() => setHovered(false)}>
        <Block position={[0, 1.76, 0]} size={[1.23, 3.5, 0.12]} color={palette.gray} />
        <Block position={[0, 0.64, 0.08]} size={[0.91, 0.92, 0.025]} color={palette.gray} />
        <mesh position={[0, 2.4, 0.08]} scale={[0.36, 0.64, 0.027]}><sphereGeometry args={[1, 32, 20]} /><meshStandardMaterial color="#cfd6c9" roughness={1} /></mesh>
        <Oval width={0.37} height={0.65} position={[0, 2.4, 0.12]} />
        <Block position={[-side * 0.4, 1.49, 0.14]} size={[0.05, 0.33, 0.07]} color="#978869" />
      </group>
    </group>)}
    <SceneHtml position={[0, 4.48, 0.22]} distanceFactor={4.5}>
      <div className="studio-facade-sign" style={{ width: 220, textAlign: 'center', color: palette.ink, fontFamily: 'Georgia, serif', fontSize: 24, letterSpacing: '0.01em' }}>Tatheer&apos;s studio<div style={{ fontSize: 8, letterSpacing: '0.22em', marginTop: 7 }}>A DIGITAL HOME FOR IDEAS</div></div>
    </SceneHtml>
    {!opened && <SceneHtml position={[0, 1.95, 0.26]} distanceFactor={3.1}>
      <button disabled={navigating} className="studio-entrance-action" type="button" onClick={onEnter} aria-label="Open studio entrance" style={{ width: 150, padding: '9px 14px', border: '1px solid #686450', borderRadius: 30, background: '#fff2bf', color: palette.ink, fontFamily: 'Georgia, serif', fontSize: 16, cursor: 'pointer' }}>Open door ↗</button>
    </SceneHtml>}
    <group position={[-2.75, 2.5, 0.21]}>
      <Block size={[1.69, 2.49, 0.055]} color={palette.wood} />
      <Block position={[0, 0, 0.037]} size={[1.54, 2.33, 0.02]} color={palette.paper} />
      <SceneHtml position={[0, 0.03, 0.062]} distanceFactor={3.7}>
        <div className="studio-facade-poster" style={{ width: 148, textAlign: 'center', color: palette.ink, fontFamily: 'Georgia, serif' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.22em' }}>OPEN STUDIO</div>
          <div style={{ fontSize: 29, lineHeight: 1.08, marginTop: 14 }}>Made of<br />curiosity.</div>
          <div style={{ fontSize: 11, marginTop: 22, letterSpacing: '0.03em' }}>MUHAMMAD TATHEER</div>
          <div style={{ fontSize: 8, marginTop: 8 }}>WEB · AI · SECURITY</div>
          <div style={{ marginTop: 18, fontSize: 11 }}>Four rooms. One story.</div>
        </div>
      </SceneHtml>
    </group>
    <group position={[2.76, 2.52, 0.22]}>
      <mesh scale={[0.68, 1.15, 0.035]}><sphereGeometry args={[1, 36, 24]} /><meshStandardMaterial color="#d6ddc7" roughness={1} /></mesh>
      <Oval width={0.7} height={1.17} position={[0, 0, 0.07]} />
      <Oval width={0.59} height={1.06} position={[0, 0, 0.075]} color="#a49b7f" />
      <Line points={[[0, -1.06, 0.08], [0, 1.06, 0.08]]} color={palette.ink} lineWidth={1.3} />
      <Line points={[[-0.59, 0, 0.08], [0.59, 0, 0.08]]} color={palette.ink} lineWidth={1.3} />
    </group>
  </group>;
}

function Hallway({ onSelectRoom, reducedMotion, texture, navigating, openDoorRoom, playing }: {
  onSelectRoom: (room: Room) => void;
  reducedMotion: boolean; texture?: THREE.Texture; navigating: boolean; openDoorRoom: Room | null; playing: boolean;
}) {
  return <group>
    <Floor width={8.4} depth={27} position={[0, 0, -5.5]} texture={texture} />
    {[-1, 1].map((side) => <group key={side}>
      {/* Actual apertures: camera and open door leaves pass through these gaps. */}
      {[[2.2, 8], [-7.8, -0.2], [-19, -10.2]].map(([from, to], index) =>
        <Block key={index} position={[side * 4.16, 1.76, (from + to) / 2]} size={[0.3, 3.52, to - from]} color={palette.wall} texture={texture} />)}
      <Block position={[side * 4.16, 4.41, -5.5]} size={[0.3, 1.78, 27]} color={palette.wall} texture={texture} />
      {[[2.2, 8], [-7.8, -0.2], [-19, -10.2]].map(([from, to], index) =>
        <Block key={`base-${index}`} position={[side * 4, 0.17, (from + to) / 2]} size={[0.11, 0.34, to - from]} color={palette.wallShade} />)}
      <Line points={[[side * 4, 3.98, 8], [side * 4, 3.98, -19]]} color="#9d8e6c" lineWidth={0.8} />
      <Block position={[side * 4, 4.96, -5.5]} size={[0.16, 0.21, 27]} color={palette.wallShade} />
    </group>)}
    <Block position={[0, 5.36, -5.5]} size={[8.6, 0.17, 27]} color="#f7e9bc" texture={texture} />
    <Block position={[0, 2.65, -18.98]} size={[8.5, 5.3, 0.24]} color={palette.wall} texture={texture} />
    {[5.9, 0.1, -5.7, -11.5, -17.3].map((z) => <Block key={z} position={[0, 5.14, z]} size={[8.3, 0.22, 0.22]} color={palette.wallShade} />)}
    {roomNames.map((room) => <Door key={room} room={room} opened={openDoorRoom === room} onSelect={onSelectRoom} reducedMotion={reducedMotion} navigating={navigating} playing={playing} />)}
    <Artwork position={[-3.98, 2.3, -4.3]} rotation={[0, Math.PI / 2, 0]} variant={2} scale={0.7} />
    <Artwork position={[3.98, 2.3, -4.3]} rotation={[0, -Math.PI / 2, 0]} variant={0} scale={0.7} />
    <Artwork position={[-3.98, 2.35, -14.5]} rotation={[0, Math.PI / 2, 0]} variant={1} scale={0.75} />
    <Artwork position={[3.98, 2.35, -14.5]} rotation={[0, -Math.PI / 2, 0]} variant={2} scale={0.75} />
    <Plant position={[-3.15, 0, -17]} scale={1.5} /><Plant position={[3.15, 0, -17]} scale={1.2} />
    <group position={[0, 2.62, -18.78]}>
      <mesh scale={[1.22, 1.82, 0.04]}><sphereGeometry args={[1, 48, 24]} /><meshStandardMaterial color="#dce1cf" roughness={1} /></mesh>
      <Oval width={1.24} height={1.84} position={[0, 0, 0.07]} /><Oval width={1.12} height={1.72} position={[0, 0, 0.08]} color="#a49b7f" />
      <Line points={[[0, -1.71, 0.09], [0, 1.71, 0.09]]} color={palette.ink} lineWidth={1.4} />
      <Line points={[[-1.09, 0, 0.09], [1.09, 0, 0.09]]} color={palette.ink} lineWidth={1.4} />
    </group>
    <Block position={[0, 0.56, -17.9]} size={[2.96, 0.13, 0.74]} color={palette.wood} />
    {[-1.25, 1.25].map((x) => <Block key={x} position={[x, 0.27, -17.9]} size={[0.14, 0.53, 0.54]} color={palette.wallShade} />)}
  </group>;
}

function RoomShell({ room, texture, reducedMotion, showExhibit, labelsVisible, animationPaused, exhibitProps }: { room: Room; texture?: THREE.Texture; reducedMotion: boolean; showExhibit: boolean; labelsVisible: boolean; animationPaused: boolean; exhibitProps: Pick<CorridorSceneProps, 'projectIndex' | 'onProjectIndexChange' | 'onOpenProject'> }) {
  const { side, z } = rooms[room];
  return <group position={[side * 9, 0, z]} rotation={[0, side === -1 ? Math.PI / 2 : -Math.PI / 2, 0]}>
    <Floor width={8} depth={9} position={[0, 0, 0.5]} texture={texture} />
    <Block position={[0, 2.65, -4.04]} size={[8.16, 5.3, 0.16]} color={palette.wall} texture={texture} />
    {[-4.04, 4.04].map((x) => <group key={x}>
      <Block position={[x, 2.65, 0.5]} size={[0.16, 5.3, 9]} color={palette.wall} texture={texture} />
      <Block position={[x < 0 ? -3.93 : 3.93, 0.18, 0.5]} size={[0.1, 0.34, 9]} color={palette.wallShade} />
    </group>)}
    <Block position={[0, 5.37, 0.5]} size={[8.2, 0.16, 9]} color="#f7e9bc" texture={texture} />
    <Block position={[0, 0.18, -3.93]} size={[8, 0.34, 0.1]} color={palette.wallShade} />
    <Block position={[0, 5.03, -3.93]} size={[8, 0.23, 0.15]} color={palette.wallShade} />
    <pointLight position={[0, 4.5, 0.4]} intensity={8} distance={12} decay={2} color="#fff2bf" />
    <Plant position={[-3.35, 0, -3.1]} scale={1.15} /><Plant position={[3.35, 0, -3.2]} scale={1.05} />
    <Sconce position={[3.2, 3.7, -3.92]} />
    <group position={[-3.94, 2.92, 0.1]} rotation={[0, Math.PI / 2, 0]}>
      <mesh scale={[0.71, 1.05, 0.035]}><sphereGeometry args={[1, 32, 20]} /><meshStandardMaterial color="#dce3cf" roughness={1} /></mesh>
      <Oval width={0.73} height={1.07} position={[0, 0, 0.06]} />
      <Line points={[[0, -1.03, 0.07], [0, 1.03, 0.07]]} color={palette.ink} lineWidth={1.2} />
      <Line points={[[-0.69, 0, 0.07], [0.69, 0, 0.07]]} color={palette.ink} lineWidth={1.2} />
    </group>
    {showExhibit && <RoomExhibits room={room} reducedMotion={reducedMotion} labelsVisible={labelsVisible} animationPaused={animationPaused} {...exhibitProps} />}
  </group>;
}

type Waypoint = { position: Position; target: Position; duration: number; showRoom?: Room | null };
type CameraRoute = { points: Waypoint[]; index: number; elapsed: number; start: THREE.Vector3; startTarget: THREE.Vector3; token: number; navigationId?: number; location: TourLocation; seated?: boolean };
const outsidePosition: Position = [0, 2.75, 20];
const outsideTarget: Position = [0, 2.66, 8.1];

function inferRoom(position: THREE.Vector3): Room | null {
  if (Math.abs(position.x) <= 4.05 || position.z > 6 || position.z < -14) return null;
  const side = position.x < 0 ? -1 : 1;
  return roomNames.reduce<Room | null>((best, room) => {
    if (rooms[room].side !== side) return best;
    return !best || Math.abs(position.z - rooms[room].z) < Math.abs(position.z - rooms[best].z) ? room : best;
  }, null);
}

function buildRoute(position: THREE.Vector3, location: TourLocation, hallwayStop: 0 | 1 | 2): Waypoint[] {
  const path: Waypoint[] = [];
  const startRoom = inferRoom(position);
  const add = (destination: Position, target: Position, duration: number) => path.push({ position: destination, target, duration });
  let corridorZ = position.z;
  if (startRoom && startRoom === location) {
    const { side, z } = rooms[location];
    add([side * 6.2, 2.5, z], [side * 11, 2.2, z], 0.65);
    path[0].showRoom = location;
    return path;
  }
  if (startRoom) {
    const { side, z } = rooms[startRoom];
    add([side * 4.9, 2.5, z], [0, 2.35, z], 0.55);
    add([side * 3.15, 2.5, z], [0, 2.35, z], 0.45);
    add([0, 2.48, z], [0, 2.3, location === 'outside' ? 10 : z - 7], 0.55);
    path[path.length - 1].showRoom = null;
    corridorZ = z;
  } else if (Math.abs(position.x) > 0.05 && position.z <= 8) {
    add([0, 2.48, position.z], [0, 2.3, position.z - 7], 0.45);
  }
  if (location === 'outside') {
    // The first establishing shot keeps the visitor on the sidewalk directly
    // in front of the studio rather than far down the street.
    if (position.z >= 19.5 && !startRoom) return [];
    if (position.z < 7.1 || startRoom) add([0, 2.5, 7.1], [0, 2.5, 12], 0.9);
    add([0, 2.55, 10.1], [0, 2.65, 8], 0.65);
    if (position.z < 20) add([0, 2.7, 20], outsideTarget, 1.15);
    return path;
  }
  if (position.z > 8.1 && !startRoom) {
    // Approach the storefront in a straight line. Keeping one target for the
    // sidewalk waypoints prevents the camera from snapping between headings.
    if (position.z > 18.5) add([0, 2.7, 18.5], [0, 2.55, 8.2], 0.85);
    if (position.z > 14) add([0, 2.62, 14], [0, 2.52, 8.2], 0.95);
    if (position.z > 11.2) add([0, 2.56, 11.2], [0, 2.48, 8.2], 0.75);
    add([0, 2.54, 10.1], [0, 2.44, 4.5], 0.55);
    add([0, 2.5, 7.2], [0, 2.35, -7], 0.9);
    add([0, 2.48, 5.2], [0, 2.3, -10], 0.7);
    corridorZ = 5.2;
  }
  if (location === 'hallway') {
    const z = [5.2, -3, -5.7][hallwayStop];
    const last = path[path.length - 1];
    if (last && Math.abs(last.position[2] - z) < 0.05) last.target = [0, 2.3, z - 10];
    else add([0, 2.48, z], [0, 2.3, z - 10], path.length ? 0.7 : 0.8);
    return path;
  }
  const { side, z } = rooms[location];
  const doorTarget: Position = [side * 8, 2.35, z];
  // Walk along the clear centerline, turn toward the selected door, then cross its aperture.
  add([0, 2.48, z + 2.2], [0, 2.3, z - 4], Math.min(1.15, 0.5 + Math.abs(corridorZ - z - 2.2) * 0.04));
  add([0, 2.48, z], doorTarget, 0.55);
  path[path.length - 1].showRoom = location;
  add([side * 3.15, 2.5, z], doorTarget, 0.65);
  add([side * 3.15, 2.5, z], doorTarget, 0.2);
  add([side * 6.2, 2.5, z], [side * 11, 2.2, z], 0.8);
  return path;
}

function CameraRig({ props, onArrival, onRouteStart, onExhibitView, onSeated, onManualResume }: {
  props: CorridorSceneProps; onArrival: CorridorSceneProps['onArrival'];
  onRouteStart: (departing: Room | null) => void; onExhibitView: (room: Room | null) => void; onSeated: () => void; onManualResume: (location: TourLocation) => void;
}) {
  const { camera, size, invalidate } = useThree();
  const lookAt = useRef(new THREE.Vector3(...outsideTarget));
  const first = useRef(true), requestToken = useRef(0);
  const route = useRef<CameraRoute | null>(null);
  const arrivedPosition = useRef(new THREE.Vector3(...outsidePosition));
  const targetFov = useRef(54);
  const stepPosition = useMemo(() => new THREE.Vector3(), []);
  const stepTarget = useMemo(() => new THREE.Vector3(), []);
  const direction = useMemo(() => new THREE.Vector3(), []);
  const settings = useRef(props);
  settings.current = props;
  const callbacks = useRef({ onArrival, onRouteStart, onExhibitView, onSeated, onManualResume });
  callbacks.current = { onArrival, onRouteStart, onExhibitView, onSeated, onManualResume };
  const portrait = size.width / size.height < 0.85;
  const requestKey = props.navigationId ?? `${props.activeRoom}:${props.hallwayStop ?? 0}`;

  useLayoutEffect(() => {
    const current = settings.current;
    if (first.current) {
      camera.position.set(...outsidePosition);
      camera.lookAt(lookAt.current);
      camera.updateMatrixWorld(true);
      first.current = false;
    } else if (current.mode === 'manual') {
      camera.getWorldDirection(direction);
      lookAt.current.copy(camera.position).addScaledVector(direction, 6);
    }
    requestToken.current += 1;
    const points = buildRoute(camera.position, current.activeRoom, current.hallwayStop ?? 0);
    callbacks.current.onRouteStart(inferRoom(camera.position));
    const paused = current.playing === false;
    if (paused && points.length === 0) points.push({ position: [camera.position.x, camera.position.y, camera.position.z], target: [lookAt.current.x, lookAt.current.y, lookAt.current.z], duration: 0.01 });
    const perspective = camera as THREE.PerspectiveCamera;
    if (current.navigationStyle === 'instant' || (current.reducedMotion && !paused) || points.length === 0) {
      const end = points[points.length - 1];
      if (end) { camera.position.set(...end.position); lookAt.current.set(...end.target); }
      else if (current.activeRoom === 'outside') { camera.position.set(...outsidePosition); lookAt.current.set(...outsideTarget); }
      arrivedPosition.current.copy(camera.position);
      const narrow = perspective.aspect < 0.85;
      targetFov.current = current.activeRoom === 'outside' ? (narrow ? 75 : 54)
        : current.activeRoom === 'hallway' ? (narrow ? 94 : 65) : (narrow ? 94 : 54);
      perspective.fov = targetFov.current;
      camera.lookAt(lookAt.current); camera.updateProjectionMatrix(); camera.updateMatrixWorld(true);
      route.current = null;
      invalidate(8);
      callbacks.current.onExhibitView(current.activeRoom === 'outside' || current.activeRoom === 'hallway' ? null : current.activeRoom);
      callbacks.current.onArrival(current.activeRoom, current.navigationId);
    } else {
      route.current = { points, index: 0, elapsed: 0, start: camera.position.clone(), startTarget: lookAt.current.clone(), token: requestToken.current, navigationId: current.navigationId, location: current.activeRoom };
      invalidate(8);
    }
  }, [requestKey, camera, direction, invalidate]);

  useLayoutEffect(() => {
    const current = settings.current;
    const perspective = camera as THREE.PerspectiveCamera;
    perspective.aspect = size.width / Math.max(size.height, 1);
    if (current.mode !== 'manual' || current.manualEnabled === false || route.current) {
      targetFov.current = current.activeRoom === 'outside' ? (portrait ? 75 : 54)
        : current.activeRoom === 'hallway' ? (portrait ? 94 : 65) : (portrait ? 94 : 54);
      if (current.reducedMotion && current.playing !== false) perspective.fov = targetFov.current;
    }
    camera.updateProjectionMatrix(); camera.updateMatrixWorld(true); invalidate(5);
  }, [camera, size.width, size.height, portrait, props.activeRoom, props.mode, props.manualEnabled, props.reducedMotion, invalidate]);

  useLayoutEffect(() => {
    const command = settings.current.cameraCommand;
    if (!command) return;
    if (command.action === 'reset') {
      requestToken.current += 1; route.current = null;
      arrivedPosition.current.copy(camera.position);
      camera.getWorldDirection(direction); lookAt.current.copy(camera.position).addScaledVector(direction, 6);
      targetFov.current = (camera as THREE.PerspectiveCamera).fov;
      callbacks.current.onManualResume(locateCamera(camera.position.x, camera.position.z)); invalidate(5);
    } else if (command.action === 'seat') {
      requestToken.current += 1;
      callbacks.current.onRouteStart(inferRoom(camera.position));
      callbacks.current.onExhibitView('projects');
      camera.getWorldDirection(direction); lookAt.current.copy(camera.position).addScaledVector(direction, 6);
      targetFov.current = portrait ? 78 : 48;
      route.current = {
        points: [{ position: [-6.2, 1.35, 1], target: [-11.5, 1.9, 1], duration: 0.85 }],
        index: 0, elapsed: 0, start: camera.position.clone(), startTarget: lookAt.current.clone(),
        token: requestToken.current, navigationId: settings.current.navigationId, location: 'projects', seated: true,
      };
      invalidate(8);
    }
    // Incrementing command id is the event, independent of mirrored region state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.cameraCommand?.id, camera, direction, invalidate]);

  useEffect(() => { invalidate(5); }, [props.playing, props.mode, props.manualEnabled, invalidate]);
  useFrame((state, delta) => {
    const currentSettings = settings.current;
    const manual = currentSettings.mode === 'manual';
    if (document.hidden || currentSettings.playing === false) return;
    const current = route.current;
    if (!current && manual && currentSettings.manualEnabled !== false) return;
    if (current && current.token === requestToken.current) {
      const dt = Math.min(delta, 0.25) * THREE.MathUtils.clamp(currentSettings.speed ?? 1, 0.4, 3);
      current.elapsed += dt;
      const step = currentSettings.reducedMotion ? current.points[current.points.length - 1] : current.points[current.index];
      const progress = currentSettings.reducedMotion ? 1 : Math.min(current.elapsed / step.duration, 1);
      // Smootherstep keeps the camera calm at every route waypoint. The
      // extra easing at both ends removes the tiny jerk that was visible when
      // a room door or seated viewpoint took over.
      const eased = progress * progress * progress * (progress * (progress * 6 - 15) + 10);
      stepPosition.set(...step.position); stepTarget.set(...step.target);
      camera.position.lerpVectors(current.start, stepPosition, eased);
      lookAt.current.lerpVectors(current.startTarget, stepTarget, eased);
      if (!currentSettings.reducedMotion && !current.seated) camera.position.y += Math.sin(progress * Math.PI * 4) * 0.016;
      if (progress === 1) {
        if ('showRoom' in step) callbacks.current.onExhibitView(step.showRoom ?? null);
        current.index = currentSettings.reducedMotion ? current.points.length : current.index + 1;
        if (current.index >= current.points.length) {
          arrivedPosition.current.copy(camera.position); route.current = null;
          if (current.seated) callbacks.current.onSeated();
          else callbacks.current.onArrival(current.location, current.navigationId);
        } else {
          current.start.copy(camera.position); current.startTarget.copy(lookAt.current); current.elapsed = 0;
        }
      }
      invalidate();
    } else if (!currentSettings.reducedMotion) {
      // Cursor parallax follows both axes. The vertical travel is deliberately
      // larger than the old two-centimetre nudge so moving the pointer up/down
      // is readable on the street and in each room while staying cinematic.
      camera.position.x = THREE.MathUtils.damp(camera.position.x, arrivedPosition.current.x + state.pointer.x * 0.035, 4, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, arrivedPosition.current.y + state.pointer.y * 0.11, 4, delta);
    }
    const perspective = camera as THREE.PerspectiveCamera;
    perspective.fov = currentSettings.reducedMotion ? targetFov.current : THREE.MathUtils.damp(perspective.fov, targetFov.current, 3, delta);
    camera.lookAt(lookAt.current); camera.updateProjectionMatrix(); camera.updateMatrixWorld(true);
  }, -1);
  return null;
}

function SceneContents(props: CorridorSceneProps & { hidden: boolean }) {
  const texture = usePaperTexture();
  const camera = useThree((state) => state.camera);
  const portraitScene = useThree((state) => state.size.width / Math.max(state.size.height, 1) < 0.85);
  const [traveling, setTraveling] = useState(false);
  const [visibleRoom, setVisibleRoom] = useState<Room | null>(null);
  const [arrivedRoom, setArrivedRoom] = useState<Room | null>(null);
  // Visited rooms stay mounted so their exhibits do not pop in and out. The
  // actual door leaf has its own transient state and closes after departure.
  const [visitedRooms, setVisitedRooms] = useState<Set<Room>>(() => new Set());
  const [openDoorRoom, setOpenDoorRoom] = useState<Room | null>(null);
  const openedRooms = useMemo(() => new Set<Room>(openDoorRoom ? [openDoorRoom] : []), [openDoorRoom]);
  const reducedMotion = !!props.reducedMotion;
  const latest = useRef(props); latest.current = props;
  const readyRef = useRef(props.onReady);
  const addRoom = useCallback((room: Room) => setVisitedRooms((previous) => previous.has(room) ? previous : new Set(previous).add(room)), []);
  const handleExhibitView = useCallback((room: Room | null) => {
    setVisibleRoom(room);
    setOpenDoorRoom(room);
  }, []);
  const handleRouteStart = useCallback((room: Room | null) => {
    if (room) addRoom(room);
    const target = latest.current.activeRoom;
    if (target !== 'outside' && target !== 'hallway') addRoom(target);
    // Keep the door open while leaving its room, then let the route's
    // `showRoom: null` waypoint close it behind the visitor.
    setVisibleRoom(room); setOpenDoorRoom(room); setArrivedRoom(null); setTraveling(true);
  }, [addRoom]);
  const handleArrival = useCallback((location: TourLocation, navigationId?: number) => {
    const room = location === 'outside' || location === 'hallway' ? null : location;
    if (room) addRoom(room);
    setTraveling(false); setVisibleRoom(room); setOpenDoorRoom(room); setArrivedRoom(room);
    latest.current.onArrival(location, navigationId);
  }, [addRoom]);
  const handleManualLocation = useCallback((location: TourLocation) => {
    const room = location === 'outside' || location === 'hallway' ? null : location;
    if (room) addRoom(room);
    setTraveling(false); setVisibleRoom(room); setArrivedRoom(room);
    if (room || location === 'outside') setOpenDoorRoom(room);
    latest.current.onManualLocation?.(location);
  }, [addRoom]);
  const closeRoomDoor = useCallback((room: Room) => {
    setOpenDoorRoom((current) => current === room ? null : current);
  }, []);
  const handleSeatArrival = useCallback(() => {
    setTraveling(false); setVisibleRoom('projects'); setOpenDoorRoom('projects'); setArrivedRoom('projects');
    latest.current.onSeated?.();
  }, []);
  const selectRoom = useCallback((room: Room) => {
    if (latest.current.mode === 'manual' && openDoorRoom && room !== openDoorRoom) {
      const currentDoor = rooms[openDoorRoom];
      if (Math.abs(camera.position.x) >= 3.4 && Math.sign(camera.position.x) === currentDoor.side && Math.abs(camera.position.z - currentDoor.z) < 3.65) return;
    }
    addRoom(room);
    setVisibleRoom(room);
    setOpenDoorRoom(room);
    if (latest.current.mode !== 'manual') latest.current.onSelectRoom(room);
  }, [addRoom, camera, openDoorRoom]);
  const enterStudio = useCallback(() => {
    if (latest.current.mode === 'manual' && latest.current.onToggleEntrance) latest.current.onToggleEntrance();
    else latest.current.onEnterStudio();
  }, []);
  useEffect(() => { readyRef.current?.(); }, []);
  useEffect(() => () => texture?.dispose(), [texture]);
  const playing = props.playing !== false && !props.hidden;
  const manualEnabled = props.mode === 'manual' && props.manualEnabled !== false && !traveling && !props.hidden;
  const entranceOpen = props.entranceOpen ?? (props.activeRoom !== 'outside' || traveling);
  return <>
    <color attach="background" args={['#f5ecd8']} /><fog attach="fog" args={['#f5ecd8', 43, 95]} />
    <ambientLight intensity={1.1} /><hemisphereLight args={['#fff9df', '#b7ab87', 1.25]} />
    <directionalLight position={[-3, 8, 17]} intensity={2} color="#fff6d6" castShadow shadow-mapSize={[1024, 1024]} shadow-camera-left={-22} shadow-camera-right={22} shadow-camera-top={22} shadow-camera-bottom={-22} shadow-bias={-0.0005} shadow-normalBias={0.025} />
    <directionalLight position={[6, 5, -12]} intensity={0.6} color="#f9e6b1" />
    <CameraRig props={props} onArrival={handleArrival} onRouteStart={handleRouteStart} onExhibitView={handleExhibitView} onSeated={handleSeatArrival} onManualResume={handleManualLocation} />
    <ManualCameraControls enabled={manualEnabled} speed={props.speed} entranceOpen={entranceOpen} openedRooms={openedRooms} cameraCommand={props.cameraCommand} handInput={props.handInput} handInputRef={props.handInputRef} onLocation={handleManualLocation} autoWalk={props.autoWalk} onAutoWalkStop={props.onAutoWalkStop} />
    <EntrancePassage enabled={manualEnabled} opened={entranceOpen} onOpen={props.onOpenEntrance} onClose={props.onCloseEntrance} />
    <RoomPassage enabled={manualEnabled} openedRoom={openDoorRoom} onOpen={setOpenDoorRoom} onClose={closeRoomDoor} />
    <Floor width={72} depth={33} position={[0, -0.1, 24.5]} texture={texture} />
    <LivingStreet playing={playing} speed={props.speed} reducedMotion={reducedMotion} />
    <StudioMotes playing={playing} reducedMotion={reducedMotion} />
    <Block position={[0, -0.04, 10.9]} size={[11.5, 0.08, 5.8]} color={palette.floor} texture={texture} />
    <Entrance opened={entranceOpen} onEnter={enterStudio} reducedMotion={reducedMotion} navigating={traveling} playing={playing} auto={props.mode === 'auto'} />
    <Plant position={[-4.82, 0, 9.85]} scale={1.7} /><Plant position={[4.82, 0, 9.85]} scale={1.5} />
    <Hallway onSelectRoom={selectRoom} reducedMotion={reducedMotion} texture={texture} navigating={traveling} openDoorRoom={openDoorRoom} playing={playing} />
    {props.manualEnabled && props.onJumpTo && <>
      {props.activeRoom === 'outside' && <DestinationPoint position={[0, 0, 10.6]} label="Enter studio" onSelect={() => props.onJumpTo?.('hallway')} reducedMotion={reducedMotion} playing={playing} />}
      {props.activeRoom === 'hallway' && roomNames.map((room) => <DestinationPoint key={room} position={[rooms[room].side * (portraitScene ? 1.15 : 1.8), 0, rooms[room].z]} label={room === 'projects' ? 'Projects' : room === 'about' ? 'About me' : room === 'journey' ? 'My journey' : 'Say hello'} onSelect={() => props.onJumpTo?.(room)} reducedMotion={reducedMotion} playing={playing} />)}
      {arrivedRoom && <DestinationPoint position={[rooms[arrivedRoom].side * 5.05, 0, rooms[arrivedRoom].z]} label="Back to hall" onSelect={() => props.onJumpTo?.('hallway')} reducedMotion={reducedMotion} playing={playing} />}
    </>}
    {roomNames.map((room) => <RoomShell key={room} room={room} texture={texture} reducedMotion={reducedMotion} showExhibit={visitedRooms.has(room) || visibleRoom === room} labelsVisible={arrivedRoom === room} animationPaused={!playing || visibleRoom !== room} exhibitProps={{ projectIndex: props.projectIndex, onProjectIndexChange: props.onProjectIndexChange, onOpenProject: props.onOpenProject }} />)}
  </>;
}

export default function CorridorScene(props: CorridorSceneProps) {
  const [hidden, setHidden] = useState(false);
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const update = () => { setHidden(document.hidden); setCompact(window.innerWidth < 700); };
    update(); document.addEventListener('visibilitychange', update); window.addEventListener('resize', update);
    return () => { document.removeEventListener('visibilitychange', update); window.removeEventListener('resize', update); };
  }, []);
  const animate = !props.reducedMotion && props.playing !== false && !hidden;
  return <div className="corridor-webgl" style={{ position: 'absolute', inset: 0 }}>
    <Canvas shadows frameloop={animate ? 'always' : 'demand'} dpr={[1, compact ? 1 : 1.5]}
      camera={{ position: outsidePosition, fov: 54, near: 0.1, far: 110 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => { gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = 1.02; gl.setClearColor('#f5ecd8'); }}
      style={{ display: 'block', width: '100%', height: '100%' }}>
      <Suspense fallback={null}><SceneContents {...props} hidden={hidden} /></Suspense>
    </Canvas>
  </div>;
}





