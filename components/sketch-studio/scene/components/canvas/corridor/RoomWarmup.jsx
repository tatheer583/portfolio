import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

/**
 * RoomWarmup Component
 *
 * Previously mounted all 4 rooms off-screen during the preloader phase to
 * force shader compilation and texture upload to GPU up front. That made the
 * FIRST LOAD very heavy (it had to fetch every room's textures before the
 * corridor was even usable).
 *
 * Now it just waits a couple of frames and compiles whatever's already in the
 * scene (entrance + corridor), so the corridor is fast to open. Room-specific
 * textures for Gallery/Studio/About/Contact/Resume/Blog are streamed in the
 * background (see App.jsx's idle-time preload) and load on-demand the first
 * time each room is entered — a tiny one-time hitch there, in exchange for a
 * much faster initial page load.
 *
 * Positioned 500 units below the scene so nothing is visible.
 */
const RoomWarmup = ({ onWarmupComplete, isLowTier }) => {
    const [isDone, setIsDone] = useState(false);
    const frameCount = useRef(0);
    const completeFired = useRef(false);
    const { gl, scene, camera } = useThree();

    // Wait for a couple of frames, then compile and finish
    const warmupStart = useRef(performance.now());

    useFrame(() => {
        if (isDone || completeFired.current) return;

        frameCount.current++;

        const targetFrames = isLowTier ? 1 : 2;

        if (frameCount.current >= targetFrames) {
            completeFired.current = true;

            const finishWarmup = () => {
                const warmupDuration = ((performance.now() - warmupStart.current) / 1000).toFixed(2);
                // console.info(`🔥 GPU/Shader Warmup Complete: ${warmupDuration}s ${isLowTier ? '(Bypassed for LOW tier)' : ''}`);

                requestAnimationFrame(() => {
                    setIsDone(true);
                    onWarmupComplete?.();
                });
            };

            // On low tier, bypass intense gl.compileAsync to save memory and avoid Context Lost
            if (isLowTier) {
                finishWarmup();
                return;
            }

            // R3F has already rendered these frames and compiled visible materials.
            // Avoid compiling invisible rooms a second time before showing the entrance.
            finishWarmup();
        }
    });

    // Nothing is mounted anymore — this component only drives the timing/compile step.
    return null;
};

export default RoomWarmup;
