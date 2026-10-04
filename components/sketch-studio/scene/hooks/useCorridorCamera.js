import { useCallback, useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useAchievements } from '../context/AchievementsContext';

const UI_TARGETS = 'button, a, input, textarea, select, [role="dialog"], .office-contact, .corridor-look, .navigation-ui, .achievement-popup';
const MAX_CURSOR_YAW = Math.PI * .44;
const MAX_PITCH = Math.PI * .46;
const TOUR_STEPS = [
    { id: 'welcome', label: 'Welcome to the studio', z: 5, yaw: 0, duration: 2.5 },
    { id: 'gallery', label: 'The Gallery · project wall', z: -4, yaw: Math.PI / 2, duration: 3.5 },
    { id: 'studio', label: 'The Studio · systems in motion', z: -20, yaw: -Math.PI / 2, duration: 4 },
    { id: 'about', label: 'The About room · the journey', z: -36, yaw: Math.PI / 2, duration: 4 },
    { id: 'resume', label: 'Resume · experience at a glance', z: -52, yaw: -Math.PI / 2, duration: 4 },
    { id: 'projects', label: 'Build notes · all projects', z: -68, yaw: Math.PI / 2, duration: 4 },
    { id: 'contact', label: 'Let’s connect · take a seat', z: -84, yaw: -Math.PI / 2, duration: 4 },
    { id: 'finish', label: 'Tour complete · explore freely', z: -88, yaw: 0, duration: 2.5 },
];

export default function useCorridorCamera({ segmentLength = 120, scrollSpeed = .025, scrollEnabled, parallaxEnabled }) {
    const { camera } = useThree();
    const { unlockAchievement } = useAchievements();
    const enabled = useRef(false);
    const override = useRef(false);
    const targetZ = useRef(camera.position.z);
    const yaw = useRef(0);
    const pitch = useRef(0);
    const pointer = useRef({ x: 0, y: 0 });
    const drag = useRef(null);
    const targetRotation = useRef(new THREE.Quaternion());
    const targetEuler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));
    const tour = useRef({ active: false, paused: false, index: 0, elapsed: 0, speed: 1, startZ: camera.position.z, startYaw: 0 });

    const emitTour = useCallback((state, step = TOUR_STEPS[tour.current.index]) => {
        window.dispatchEvent(new CustomEvent('portfolio:tour-progress', {
            detail: { state, step, index: tour.current.index, total: TOUR_STEPS.length },
        }));
    }, []);

    const resetLook = useCallback(() => {
        yaw.current = 0; pitch.current = 0;
        pointer.current = { x: 0, y: 0 };
    }, []);
    useEffect(() => {
        const next = Boolean(scrollEnabled || parallaxEnabled);
        if (next && !enabled.current) {
            targetZ.current = camera.position.z;
            resetLook();
        }
        enabled.current = next;
    }, [scrollEnabled, parallaxEnabled, camera, resetLook]);

    useEffect(() => {
        const handleTour = event => {
            const { action, speed } = event.detail || {};
            if (action === 'start') {
                tour.current = {
                    active: true,
                    paused: false,
                    index: 0,
                    elapsed: 0,
                    speed: Number(speed) || 1,
                    startZ: camera.position.z,
                    startYaw: yaw.current,
                };
                pointer.current = { x: 0, y: 0 };
                emitTour('started');
            } else if (action === 'pause' && tour.current.active) {
                tour.current.paused = !tour.current.paused;
                emitTour(tour.current.paused ? 'paused' : 'resumed');
            } else if (action === 'stop') {
                tour.current.active = false;
                tour.current.paused = false;
                targetZ.current = camera.position.z;
                resetLook();
                emitTour('stopped');
            } else if (action === 'speed' && Number(speed) > 0) {
                tour.current.speed = Number(speed);
                emitTour('speed');
            }
        };
        window.addEventListener('portfolio:tour', handleTour);
        return () => window.removeEventListener('portfolio:tour', handleTour);
    }, [camera, emitTour, resetLook]);

    useEffect(() => {
        const usable = event => enabled.current && !override.current && !event.target?.closest?.(UI_TARGETS);
        const walk = distance => {
            targetZ.current -= distance;
            unlockAchievement('corridor_explore');
        };
        const wheel = event => {
            if (!usable(event) || !scrollEnabled) return;
            event.preventDefault();
            walk(THREE.MathUtils.clamp(event.deltaY, -500, 500) * scrollSpeed);
        };
        const key = event => {
            if (!enabled.current || override.current || event.target?.closest?.('input, textarea, select, [role="dialog"]')) return;
            if (event.key === ' ' && event.target?.closest?.('button, a')) return;
            const name = event.key.toLowerCase();
            if (['arrowleft', 'a', 'arrowright', 'd'].includes(name)) {
                event.preventDefault();
                yaw.current += ['arrowleft', 'a'].includes(name) ? Math.PI / 9 : -Math.PI / 9;
                pointer.current = { x: 0, y: 0 };
            } else if (name === 'r' || name === 'home') {
                event.preventDefault(); resetLook();
            } else if (scrollEnabled) {
                const distances = { arrowup: 2.5, w: 2.5, arrowdown: -2.5, s: -2.5, pagedown: 10, pageup: -10, ' ': 5 };
                if (distances[name] !== undefined) { event.preventDefault(); walk(distances[name]); }
            }
        };
        const down = event => {
            if (!usable(event) || event.target.tagName !== 'CANVAS' || event.button !== 0) return;
            drag.current = { x: event.clientX, y: event.clientY, touch: event.pointerType === 'touch' };
        };
        const move = event => {
            if (!enabled.current || override.current || !parallaxEnabled) return;
            if (drag.current) {
                const dx = event.clientX - drag.current.x;
                const dy = event.clientY - drag.current.y;
                yaw.current += dx * .006;
                if (drag.current.touch) walk(-dy * scrollSpeed);
                else pitch.current = THREE.MathUtils.clamp(pitch.current + dy * .004, -MAX_PITCH, MAX_PITCH);
                drag.current.x = event.clientX; drag.current.y = event.clientY;
                pointer.current = { x: 0, y: 0 };
            } else if (usable(event) && event.pointerType !== 'touch') {
                pointer.current = { x: THREE.MathUtils.clamp(event.clientX / window.innerWidth * 2 - 1, -1, 1), y: THREE.MathUtils.clamp(event.clientY / window.innerHeight * 2 - 1, -1, 1) };
            }
        };
        const up = () => { drag.current = null; };
        const look = event => {
            if (!enabled.current || override.current) return;
            pointer.current = { x: 0, y: 0 };
            if (event.detail.direction === 'reset') resetLook();
            else yaw.current += event.detail.direction === 'left' ? Math.PI / 2 : -Math.PI / 2;
        };
        window.addEventListener('wheel', wheel, { passive: false });
        window.addEventListener('keydown', key);
        window.addEventListener('pointerdown', down);
        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
        window.addEventListener('pointercancel', up);
        window.addEventListener('blur', up);
        window.addEventListener('portfolio:look', look);
        return () => {
            window.removeEventListener('wheel', wheel);
            window.removeEventListener('keydown', key);
            window.removeEventListener('pointerdown', down);
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerup', up);
            window.removeEventListener('pointercancel', up);
            window.removeEventListener('blur', up);
            window.removeEventListener('portfolio:look', look);
        };
    }, [scrollEnabled, parallaxEnabled, scrollSpeed, resetLook, unlockAchievement]);

    useFrame((_, delta) => {
        if (!enabled.current || override.current) return;
        const dt = Math.min(delta, .1);
        if (tour.current.active && !tour.current.paused) {
            const step = TOUR_STEPS[tour.current.index];
            tour.current.elapsed += dt * tour.current.speed;
            const duration = step.duration;
            const progress = THREE.MathUtils.clamp(tour.current.elapsed / duration, 0, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            camera.position.z = THREE.MathUtils.lerp(tour.current.startZ, step.z, eased);
            yaw.current = THREE.MathUtils.lerp(tour.current.startYaw, step.yaw, eased);
            if (progress >= 1) {
                if (tour.current.index >= TOUR_STEPS.length - 1) {
                    tour.current.active = false;
                    targetZ.current = camera.position.z;
                    emitTour('complete', step);
                } else {
                    tour.current.index += 1;
                    tour.current.elapsed = 0;
                    tour.current.startZ = step.z;
                    tour.current.startYaw = step.yaw;
                    emitTour('step', TOUR_STEPS[tour.current.index]);
                }
            }
        } else if (scrollEnabled) {
            camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ.current, 7, dt);
        }
        // Rotate the visitor's view; keep their position in the corridor center.
        camera.position.x = THREE.MathUtils.damp(camera.position.x, 0, 6, dt);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, .2, 6, dt);
        targetEuler.current.set(THREE.MathUtils.clamp(pitch.current - pointer.current.y * .18, -MAX_PITCH, MAX_PITCH), yaw.current - pointer.current.x * MAX_CURSOR_YAW, 0);
        targetRotation.current.setFromEuler(targetEuler.current);
        camera.quaternion.slerp(targetRotation.current, 1 - Math.exp(-6 * dt));
    });

    const setCameraOverride = useCallback(active => {
        override.current = active;
        if (active) {
            tour.current.active = false;
            tour.current.paused = false;
        }
        if (!active) { targetZ.current = camera.position.z; resetLook(); }
        drag.current = null;
    }, [camera, resetLook]);
    return {
        setCameraOverride,
        getCurrentSegment: () => Math.floor((10 - camera.position.z) / segmentLength),
        getCameraZ: () => camera.position.z,
    };
}
