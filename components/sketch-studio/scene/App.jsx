import { useState, Suspense, useEffect, useCallback, useLayoutEffect, lazy } from 'react';
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber';
import { Preload, useTexture, Text, PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';

import Preloader from './components/dom/Preloader';

// Read-only scene inspection for local rendering diagnostics; no visible UI.
const SceneInspection = () => {
  const state = useThree();
  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has('inspectScene')) return;
    const canvas = state.gl.domElement;
    canvas.__portfolioScene = state;
    return () => { delete canvas.__portfolioScene; };
  }, [state]);
  return null;
};
import PaperTransition from './components/dom/PaperTransition';
import { AudioProvider, useAudio } from './context/AudioManager';
import { initAudio } from './utils/audioManager';
import { PerformanceProvider, usePerformance } from './context/PerformanceContext';
import { SceneProvider } from './context/SceneContext';
import NavigationUI from './components/ui/NavigationUI';
import GlobalOverlay from './components/ui/GlobalOverlay';
import ScreenReaderOverlay from './components/ui/ScreenReaderOverlay';
import ContactOfficePanel from './components/ui/ContactOfficePanel';
import CorridorLookControls from './components/ui/CorridorLookControls';

// Initialize PostHog


// Lazy load the heavy 3D experience
const Experience = lazy(() => import('./components/canvas/Experience'));


// --- CONDITIONAL ASSET PRELOADING ---
// On high-end devices, preloads everything for zero stutter.
// On mobile/low-end devices, only preloads core textures to prevent Out Of Memory crashes.
import { 
  ENTRANCE_TEXTURES, 
  CORRIDOR_TEXTURES, 
  UI_TEXTURES,
  GALLERY_TEXTURES,
  CONTACT_TEXTURES,
  ABOUT_TEXTURES,
  STUDIO_TEXTURES,
  IMAGE_ASSETS,
  filterTexturesByDevice
} from './config/texturePreloadList';
import { TextureLoader } from 'three';

// Standard Browser-level Image Preloader (for <img> tags)
const preloadBrowserImage = (path) => {
  if (typeof window === 'undefined') return;
  const img = new Image();
  img.src = path;
};

const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent || '');
const isWeakCPU = typeof navigator.hardwareConcurrency !== 'undefined' && navigator.hardwareConcurrency <= 4;
const isLowRAM = typeof navigator.deviceMemory !== 'undefined' && navigator.deviceMemory <= 4;
const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 450;
const isLowEnd = isMobileDevice || isWeakCPU || isLowRAM || isSmallScreen;

// Refined check for "hover capability" (non-touch devices should have hover: hover)
// Laptops with touch screens (which also have a mouse/trackpad) will return true here.
const supportsHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

// Trigger Three.js preloads at module level (as standard for Drei)
// STRATEGY: Only preload what's needed to see + use the entrance and corridor
// immediately (fast first paint). Gallery/Studio/Contact textures (the heavy
// per-room assets) are deferred and streamed in the background after the
// experience becomes interactive, via requestIdleCallback below.
const CORE_TEXTURES = [...ENTRANCE_TEXTURES, ...CORRIDOR_TEXTURES, ...UI_TEXTURES, ...IMAGE_ASSETS];
const filteredCore = filterTexturesByDevice(CORE_TEXTURES, supportsHover);
const filteredAbout = filterTexturesByDevice(ABOUT_TEXTURES, supportsHover);

filteredCore.forEach(path => useTexture.preload(path));
filteredAbout.forEach(path => useLoader.preload(TextureLoader, path));

// Background (idle-time) preload for heavier room-specific textures.
// Runs only after the browser is idle (i.e. after the entrance/corridor is
// already interactive), so it never blocks first load — but by the time the
// user walks down the corridor to a door, the room's textures are usually
// already warm in cache.
const scheduleDeferredPreload = () => {
  if (typeof window === 'undefined') return;

  const runDeferred = () => {
    // Skip the heavy background warm-up entirely on low-end devices to avoid
    // memory pressure / competing with foreground rendering.
    if (isLowEnd) return;

    const filteredGalleryContact = filterTexturesByDevice([...GALLERY_TEXTURES, ...CONTACT_TEXTURES], supportsHover);
    const filteredStudio = filterTexturesByDevice(STUDIO_TEXTURES, supportsHover);

    filteredGalleryContact.forEach((path) => useTexture.preload(path));
    filteredStudio.forEach((path) => useLoader.preload(TextureLoader, path));
  };

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(runDeferred, { timeout: 8000 });
  } else {
    setTimeout(runDeferred, 3000);
  }
};

if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    scheduleDeferredPreload();
  } else {
    window.addEventListener('load', scheduleDeferredPreload, { once: true });
  }
}

const FONT_URL = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff';

// Helper component to handle global audio enable on interaction
const GlobalAudioEnabler = () => {
  const { enableAudio } = useAudio();
  useEffect(() => {
    const handleInteraction = () => enableAudio();
    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true });
    window.addEventListener('keydown', handleInteraction, { once: true });
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [enableAudio]);
  return null;
};

// Scene background using corridor wall texture (static, no animation)
const PaperSceneBackground = () => {
  const { scene } = useThree();
  const texture = useTexture('/reference/textures/paper-texture.webp');

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    scene.background = texture;

    return () => {
      scene.background = null;
    };
  }, [scene, texture]);

  return null;
};

function AppContent() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  // Use Performance Context
  const { settings, downgradeTier, tier } = usePerformance();

  // Force initialize audio in the background on mount
  useEffect(() => {
    initAudio();
  }, []);

  const handleSceneReady = useCallback(() => {
    requestAnimationFrame(() => {
      setSceneReady(true);
    });
  }, []);

  return (
    <AudioProvider>
      <SceneProvider>
        <GlobalAudioEnabler />
        <div className="app">
          {/* Full screen 3D Canvas */}
          <div className="canvas-wrapper">
            <Canvas
              camera={{
                position: [0, 0.2, 28],
                fov: 60,
                near: 0.1,
                far: 150
              }}
              gl={{
                antialias: settings.antialias,
                alpha: false,
                powerPreference: settings.powerPreference,
                localClippingEnabled: true,
                failIfMajorPerformanceCaveat: false
              }}
              dpr={settings.dpr}
              shadows={settings.shadows}
            >
              <color attach="background" args={['#fff6dc']} />
              <fog attach="fog" args={['#fff6dc', 15, 50]} />

              {/* Scale performance down if fps drops */}
              <SceneInspection />
              <PerformanceMonitor
                onDecline={() => downgradeTier()}
                flipflops={3}
                onFallback={() => downgradeTier()}
              />

              {/* Advanced FPS & Performance Monitor */}
              {/* <Perf position="top-left" minimal={false} /> */}

              <Suspense fallback={null}>
                <Experience
                  isLoaded={isLoaded}
                  onSceneReady={handleSceneReady}
                  performanceTier={tier}
                />
              </Suspense>
            </Canvas>
          </div>

          {/* Navigation UI - Hamburger, Map, Back, Audio */}
          {isLoaded && (
            <>
              <NavigationUI />
              <GlobalOverlay />
              <PaperTransition />
              <ScreenReaderOverlay />
              <ContactOfficePanel />
              <CorridorLookControls />
            </>
          )}

          {/* 2D Preloader */}
          <Preloader
            ready={sceneReady}
            onComplete={() => setIsLoaded(true)}
          />
        </div>
      </SceneProvider>
    </AudioProvider>
  );
}

import { AchievementsProvider } from './context/AchievementsContext';

export default function App() {
  // Preload browser-based images (for standard <img> tags) immediately upon mounting App
  // This ensures they are in the network waterfall during the initial loading phase.
  useEffect(() => {
    const filteredImages = filterTexturesByDevice(IMAGE_ASSETS, supportsHover);
    // console.log(`[Preload] Triggering browser-level image preloads for ${filteredImages.length} assets.`);
    filteredImages.forEach(path => preloadBrowserImage(path));
  }, []);

  return (
    <PerformanceProvider>
      <AchievementsProvider>
        <AppContent />
      </AchievementsProvider>
    </PerformanceProvider>
  );
}
