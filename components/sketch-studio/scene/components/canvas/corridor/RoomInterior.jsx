import { useMemo, memo, Suspense, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Eagerly import room components - textures are preloaded during the preloader phase
import GalleryRoom from '../rooms/Gallery/GalleryRoom';
import StudioRoom from '../rooms/Studio/StudioRoom';
import AboutRoom from '../rooms/About/AboutRoom';
import ContactRoom from '../rooms/Contact/OfficeRoom';

// Room configurations
const ROOM_CONFIG = {
    corridorWidth: 2.2,   // Wider "vestibule" feeling
    corridorHeight: 2.4,  // frameHeight - 0.1
    corridorDepth: 2,     // Shorter - quick transition
    roomWidth: 30,
    roomHeight: 20,
    roomDepth: 25
};

const SUBTITLES = {
    'THE GALLERY': 'Explore my creative projects',
    'THE STUDIO': 'Watch behind the scenes',
    'DEV DIARY': 'My development journey',
    'RESUME': 'My experience, at a glance',
    'BLOG': 'Notes from my AI/ML journey',
    "LET'S CONNECT": 'Get in touch with me'
};

// Self-authored blog post cards for the BLOG room
const BLOG_POSTS = [];

// Naturalny kafelek listwy: 1582x94px przy wysokości 0.15 → ~2.524 units szerokości
const NATURAL_TILE_W = (1582 / 94) * 0.15;

/**
 * RoomInterior Component
 *
 * Memoized room geometry to prevent re-renders and improve performance.
 * Contains corridor + giant room at the end.
 */
const RoomInterior = memo(({ label, showRoom, onReady, isExiting }) => {
    const { corridorWidth, corridorHeight, corridorDepth, roomWidth, roomHeight, roomDepth } = ROOM_CONFIG;
    const halfDepth = corridorDepth / 2;
    const roomZ = -corridorDepth - roomDepth / 2;

    // Load corridor textures
    const floorTexSrc = useTexture('/reference/textures/corridor/kawalekpodlogi.webp');
    const wallTexSrc = useTexture('/reference/textures/corridor/wall_texture.webp');
    const ceilingTexSrc = useTexture('/reference/textures/corridor/ceiling_texture.webp');
    const bbTexSrc = useTexture('/reference/textures/corridor/texturadoprogow.webp');

    // Resume room textures (only meaningfully used when label === 'RESUME', but loaded
    // eagerly here since RoomInterior already sits inside an upstream Suspense boundary)
    const resumePageTex = useTexture('/reference/textures/resume/resume_page.webp');
    const googleLogoTex = useTexture('/reference/textures/resume/google.webp');
    const microsoftLogoTex = useTexture('/reference/textures/resume/microsoft.webp');
    const openaiLogoTex = useTexture('/reference/textures/resume/openai.webp');
    const nvidiaLogoTex = useTexture('/reference/textures/resume/nvidia.webp');
    const amazonLogoTex = useTexture('/reference/textures/resume/amazon.webp');

    // Memoize textured materials for mini-corridor
    const materials = useMemo(() => {
        // Floor
        const floorTex = floorTexSrc.clone();
        floorTex.needsUpdate = true;
        floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping;
        floorTex.repeat.set(corridorDepth / 2.5, corridorWidth / 2.5);

        // Left wall
        const wallTexL = wallTexSrc.clone();
        wallTexL.needsUpdate = true;
        wallTexL.wrapS = wallTexL.wrapT = THREE.RepeatWrapping;
        wallTexL.repeat.set(corridorDepth / 2, corridorHeight / 2);

        // Right wall (same settings)
        const wallTexR = wallTexSrc.clone();
        wallTexR.needsUpdate = true;
        wallTexR.wrapS = wallTexR.wrapT = THREE.RepeatWrapping;
        wallTexR.repeat.set(corridorDepth / 2, corridorHeight / 2);

        // Ceiling
        const ceilTex = ceilingTexSrc.clone();
        ceilTex.needsUpdate = true;
        ceilTex.wrapS = ceilTex.wrapT = THREE.RepeatWrapping;
        ceilTex.repeat.set(corridorDepth / 2.5, corridorWidth / 2.5);

        // Baseboard left
        const bbLeft = bbTexSrc.clone();
        bbLeft.needsUpdate = true;
        bbLeft.wrapS = bbLeft.wrapT = THREE.RepeatWrapping;
        bbLeft.repeat.set(corridorDepth / NATURAL_TILE_W, 1);

        // Baseboard right
        const bbRight = bbTexSrc.clone();
        bbRight.needsUpdate = true;
        bbRight.wrapS = bbRight.wrapT = THREE.RepeatWrapping;
        bbRight.repeat.set(corridorDepth / NATURAL_TILE_W, 1);

        return {
            corridorFloor: new THREE.MeshBasicMaterial({ color: '#e0e0e0',  map: floorTex, side: THREE.DoubleSide }),
            corridorWallL: new THREE.MeshBasicMaterial({ color: '#e0e0e0',  map: wallTexL, side: THREE.DoubleSide }),
            corridorWallR: new THREE.MeshBasicMaterial({ color: '#e0e0e0',  map: wallTexR, side: THREE.DoubleSide }),
            corridorCeiling: new THREE.MeshBasicMaterial({ color: '#e0e0e0',  map: ceilTex, side: THREE.DoubleSide }),
            bbLeft: new THREE.MeshBasicMaterial({ color: '#e0e0e0',  map: bbLeft, side: THREE.DoubleSide }),
            bbRight: new THREE.MeshBasicMaterial({ color: '#e0e0e0',  map: bbRight, side: THREE.DoubleSide }),
            threshold: new THREE.MeshBasicMaterial({ color: '#e0e0e0', 
                map: (() => {
                    const t = bbTexSrc.clone();
                    t.needsUpdate = true;
                    t.wrapS = t.wrapT = THREE.RepeatWrapping;
                    t.repeat.set(corridorWidth / NATURAL_TILE_W, 1);
                    return t; })(),

                side: THREE.DoubleSide
            }),
            // Room materials (keep flat for rooms that have their own content)
            roomFloor: new THREE.MeshBasicMaterial({ color: '#e5e5e5', side: THREE.DoubleSide }),
            roomCeiling: new THREE.MeshBasicMaterial({ color: '#fff6dc', side: THREE.DoubleSide }),
            roomWall: new THREE.MeshBasicMaterial({ color: '#f0f0f0', side: THREE.DoubleSide }),
            roomBackWall: new THREE.MeshBasicMaterial({ color: '#f5f5f5', side: THREE.DoubleSide }),
        };
    }, [floorTexSrc, wallTexSrc, ceilingTexSrc, bbTexSrc]);

    // Memoize geometries
    const geometries = useMemo(() => ({
        corridorSideWall: new THREE.PlaneGeometry(corridorDepth, corridorHeight),
        corridorFloorCeiling: new THREE.PlaneGeometry(corridorWidth, corridorDepth),
        corridorBaseboard: new THREE.PlaneGeometry(corridorDepth, 0.15),
        threshold: new THREE.PlaneGeometry(corridorWidth, 0.15),
        roomFloorCeiling: new THREE.PlaneGeometry(roomWidth, roomDepth),
        roomSideWall: new THREE.PlaneGeometry(roomDepth, roomHeight),
        roomBackWall: new THREE.PlaneGeometry(roomWidth, roomHeight)
    }), []);

    const isGallery = label === 'THE GALLERY';

    // Refs + animation for RESUME room floating logos and BLOG room cards
    const logoRefs = useRef([]);
    const cardRefs = useRef([]);
    const resumePageRef = useRef();

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();

        if (label === 'RESUME') {
            logoRefs.current.forEach((mesh, i) => {
                if (!mesh) return;
                mesh.position.y += 0; // base set via JSX; offset handled below
                mesh.rotation.z = Math.sin(t * 0.6 + i) * 0.08;
                mesh.position.z = mesh.userData.baseZ + Math.sin(t * 0.8 + i * 1.3) * 0.15;
            });
            if (resumePageRef.current) {
                resumePageRef.current.rotation.z = Math.sin(t * 0.3) * 0.01;
            }
        }

        if (label === 'BLOG') {
            cardRefs.current.forEach((group, i) => {
                if (!group) return;
                group.position.y = group.userData.baseY + Math.sin(t * 0.7 + i * 1.1) * 0.06;
            });
        }
    });

    // Trigger onReady for generic rooms (which don't have their own component to do it)
    useEffect(() => {
        if (showRoom && !['THE GALLERY', 'THE STUDIO', 'THE ABOUT', "LET'S CONNECT"].includes(label)) {
            onReady?.();
        }
    }, [showRoom, label, onReady]);

    return (
        <group position={[0, -0.149, 0]}>
            {/* === CORRIDOR (The "Mini-Corridor" Transition) === */}
            {/* Left wall */}
            <mesh
                position={[-corridorWidth / 2, 0, -halfDepth]}
                rotation={[0, Math.PI / 2, 0]}
                geometry={geometries.corridorSideWall}
                material={materials.corridorWallL}
            />

            {/* Right wall */}
            <mesh
                position={[corridorWidth / 2, 0, -halfDepth]}
                rotation={[0, -Math.PI / 2, 0]}
                geometry={geometries.corridorSideWall}
                material={materials.corridorWallR}
            />

            {/* Floor */}
            <mesh
                position={[0, -corridorHeight / 2, -halfDepth]}
                rotation={[-Math.PI / 2, 0, 0]}
                geometry={geometries.corridorFloorCeiling}
                material={materials.corridorFloor}
            />

            {/* Ceiling */}
            <mesh
                position={[0, corridorHeight / 2, -halfDepth]}
                rotation={[Math.PI / 2, 0, 0]}
                geometry={geometries.corridorFloorCeiling}
                material={materials.corridorCeiling}
            />

            {/* Baseboard Left */}
            <mesh
                position={[-corridorWidth / 2 + 0.01, -corridorHeight / 2 + 0.075, -halfDepth]}
                rotation={[0, Math.PI / 2, 0]}
                geometry={geometries.corridorBaseboard}
                material={materials.bbLeft}
            />

            {/* Baseboard Right */}
            <mesh
                position={[corridorWidth / 2 - 0.01, -corridorHeight / 2 + 0.075, -halfDepth]}
                rotation={[0, -Math.PI / 2, 0]}
                geometry={geometries.corridorBaseboard}
                material={materials.bbRight}
            />

            {/* === THRESHOLD (End of Mini-Corridor) === */}
            <mesh
                position={[0, -corridorHeight / 2 + 0.005, -corridorDepth]}
                rotation={[-Math.PI / 2, 0, 0]}
                geometry={geometries.threshold}
                material={materials.threshold}
            />

            {/* === ROOM CONTENT === */}
            {showRoom && (
                <group>
                    {isGallery ? (
                        // === NEW GALLERY ROOM ===
                        // Positioned at the end of the corridor
                        <group position={[0, -0.5, -corridorDepth]}>
                            <Suspense fallback={null}>
                                <GalleryRoom showRoom={showRoom} onReady={onReady} isExiting={isExiting} />
                            </Suspense>
                        </group>
                    ) : label === 'THE STUDIO' ? (
                        // === NEW STUDIO ROOM ===
                        <group position={[0, -0.5, -corridorDepth]}>
                            <Suspense fallback={null}>
                                <StudioRoom showRoom={showRoom} onReady={onReady} isExiting={isExiting} />
                            </Suspense>
                        </group>
                    ) : label === 'THE ABOUT' ? (
                        // === NEW ABOUT ROOM ===
                        <group position={[0, -0.5, -corridorDepth]}>
                            <Suspense fallback={null}>
                                <AboutRoom showRoom={showRoom} onReady={onReady} isExiting={isExiting} />
                            </Suspense>
                        </group>
                    ) : label === "LET'S CONNECT" ? (
                        // === NEW CONTACT ROOM ===
                        <group position={[0, -0.5, -corridorDepth]}>
                            <Suspense fallback={null}>
                                <ContactRoom showRoom={showRoom} onReady={onReady} isExiting={isExiting} />
                            </Suspense>
                        </group>
                    ) : (
                        // === DEFAULT GENERIC ROOM (For other sections) ===
                        <group position={[0, roomHeight / 2 - corridorHeight / 2, roomZ]}>
                            {/* Floor */}
                            <mesh
                                position={[0, -roomHeight / 2, 0]}
                                rotation={[-Math.PI / 2, 0, 0]}
                                geometry={geometries.roomFloorCeiling}
                                material={materials.roomFloor}
                            />

                            {/* Floor grid */}
                            <gridHelper
                                args={[Math.min(roomWidth, roomDepth), 20, '#cccccc', '#dddddd']}
                                position={[0, -roomHeight / 2 + 0.01, 0]}
                            />

                            {/* Ceiling */}
                            <mesh
                                position={[0, roomHeight / 2, 0]}
                                rotation={[Math.PI / 2, 0, 0]}
                                geometry={geometries.roomFloorCeiling}
                                material={materials.roomCeiling}
                            />

                            {/* Back wall */}
                            <mesh
                                position={[0, 0, -roomDepth / 2]}
                                geometry={geometries.roomBackWall}
                                material={materials.roomBackWall}
                            />

                            {/* Left wall */}
                            <mesh
                                position={[-roomWidth / 2, 0, 0]}
                                rotation={[0, Math.PI / 2, 0]}
                                geometry={geometries.roomSideWall}
                                material={materials.roomWall}
                            />

                            {/* Right wall */}
                            <mesh
                                position={[roomWidth / 2, 0, 0]}
                                rotation={[0, -Math.PI / 2, 0]}
                                geometry={geometries.roomSideWall}
                                material={materials.roomWall}
                            />

                            {/* Title */}
                            <Text
                                position={[0, 2, -roomDepth / 2 + 2]}
                                fontSize={4}
                                color="#1a1a1a"
                                anchorX="center"
                                anchorY="middle"
                                maxWidth={roomWidth * 0.8}
                                textAlign="center"
                            >
                                {label}
                            </Text>

                            {/* Subtitle */}
                            <Text
                                position={[0, -1, -roomDepth / 2 + 2]}
                                fontSize={0.8}
                                color="#666666"
                                anchorX="center"
                                anchorY="middle"
                                maxWidth={roomWidth * 0.7}
                                textAlign="center"
                            >
                                {SUBTITLES[label] || ''}
                            </Text>

                            {/* === RESUME ROOM CONTENT === */}
                            {label === 'RESUME' && (
                                <group position={[0, -0.5, -roomDepth / 2 + 3]}>
                                    {/* Resume page */}
                                    <mesh ref={resumePageRef} position={[0, 0.3, 0]}>
                                        <planeGeometry args={[4.5, 4.5 * (2200 / 1700)]} />
                                        <meshBasicMaterial map={resumePageTex} transparent side={THREE.DoubleSide} />
                                    </mesh>
                                    {/* Sketch border frame */}
                                    <mesh position={[0, 0.3, -0.01]}>
                                        <planeGeometry args={[4.7, 4.7 * (2200 / 1700) + 0.2]} />
                                        <meshBasicMaterial color="#1a1a1a" side={THREE.DoubleSide} />
                                    </mesh>

                                    {/* Caption above logos */}
                                    <Text
                                        position={[0, 5.3, 0.3]}
                                        fontSize={0.32}
                                        color="#888888"
                                        anchorX="center"
                                        anchorY="middle"
                                        font="/reference/fonts/CabinSketch-Regular.ttf"
                                        fontStyle="italic"
                                    >
                                        Companies I’d love to work with someday
                                    </Text>

                                    {/* Dream company logos floating around the resume (animated + clickable) */}
                                    {[
                                        { tex: googleLogoTex, pos: [-4.2, 3.2, 0.5], label: 'Google', url: 'https://careers.google.com' },
                                        { tex: microsoftLogoTex, pos: [4.2, 3, 0.6], label: 'Microsoft', url: 'https://careers.microsoft.com' },
                                        { tex: openaiLogoTex, pos: [-4.6, -0.5, 0.4], label: 'OpenAI', url: 'https://openai.com/careers' },
                                        { tex: nvidiaLogoTex, pos: [4.6, -1, 0.5], label: 'Nvidia', url: 'https://www.nvidia.com/en-us/about-nvidia/careers/' },
                                        { tex: amazonLogoTex, pos: [0, -4.6, 0.5], label: 'Amazon', url: 'https://www.amazon.jobs' },
                                    ].map((company, i) => (
                                        <group
                                            key={company.label}
                                            ref={(el) => {
                                                if (el) el.userData.baseZ = company.pos[2];
                                                logoRefs.current[i] = el;
                                            }}
                                            position={company.pos}
                                        >
                                            <mesh
                                                onClick={() => window.open(company.url, '_blank')}
                                                onPointerOver={(e) => { document.body.style.cursor = 'pointer'; e.stopPropagation(); }}
                                                onPointerOut={() => { document.body.style.cursor = 'default'; }}
                                            >
                                                <planeGeometry args={[0.9, 0.9]} />
                                                <meshBasicMaterial map={company.tex} transparent side={THREE.DoubleSide} />
                                            </mesh>
                                            <Text
                                                position={[0, -0.62, 0]}
                                                fontSize={0.18}
                                                color="#555555"
                                                anchorX="center"
                                                anchorY="middle"
                                                font="/reference/fonts/CabinSketch-Regular.ttf"
                                            >
                                                {company.label}
                                            </Text>
                                        </group>
                                    ))}

                                    {/* Download link */}
                                    <Text
                                        position={[0, -5.9, 0.3]}
                                        fontSize={0.4}
                                        color="#1a56db"
                                        anchorX="center"
                                        anchorY="middle"
                                        font="/reference/fonts/CabinSketch-Bold.ttf"
                                        onClick={() => window.open('/resume', '_blank')}
                                        onPointerOver={(e) => { document.body.style.cursor = 'pointer'; e.stopPropagation(); }}
                                        onPointerOut={() => { document.body.style.cursor = 'default'; }}
                                    >
                                        ↓ Download Resume (PDF)
                                    </Text>
                                </group>
                            )}

                            {/* === BLOG ROOM CONTENT === */}
                            {label === 'BLOG' && (
                                <group position={[0, 0, -roomDepth / 2 + 3]}>
                                    {BLOG_POSTS.map((post, i) => {
                                        const col = i % 2;
                                        const row = Math.floor(i / 2);
                                        const px = (col === 0 ? -3.2 : 3.2);
                                        const py = 1.5 - row * 3.2;
                                        return (
                                            <group
                                                key={post.title}
                                                ref={(el) => {
                                                    if (el) el.userData.baseY = py;
                                                    cardRefs.current[i] = el;
                                                }}
                                                position={[px, py, 0]}
                                            >
                                                {/* Card background */}
                                                <mesh
                                                    onPointerOver={(e) => { document.body.style.cursor = 'pointer'; e.stopPropagation(); }}
                                                    onPointerOut={() => { document.body.style.cursor = 'default'; }}
                                                >
                                                    <planeGeometry args={[5.6, 2.8]} />
                                                    <meshBasicMaterial color="#fdfaf3" side={THREE.DoubleSide} />
                                                </mesh>
                                                <mesh position={[0, 0, -0.01]}>
                                                    <planeGeometry args={[5.75, 2.95]} />
                                                    <meshBasicMaterial color="#1a1a1a" side={THREE.DoubleSide} />
                                                </mesh>
                                                {/* Post icon */}
                                                <Text
                                                    position={[2.35, 1.05, 0.05]}
                                                    fontSize={0.4}
                                                    color="#1a1a1a"
                                                    anchorX="center"
                                                    anchorY="middle"
                                                >
                                                    {post.icon}
                                                </Text>
                                                {/* Title */}
                                                <Text
                                                    position={[-2.5, 0.85, 0.05]}
                                                    fontSize={0.32}
                                                    color="#1a1a1a"
                                                    anchorX="left"
                                                    anchorY="top"
                                                    maxWidth={5}
                                                    font="/reference/fonts/CabinSketch-Bold.ttf"
                                                >
                                                    {post.title}
                                                </Text>
                                                {/* Excerpt */}
                                                <Text
                                                    position={[-2.5, 0.15, 0.05]}
                                                    fontSize={0.19}
                                                    color="#555555"
                                                    anchorX="left"
                                                    anchorY="top"
                                                    maxWidth={5}
                                                    lineHeight={1.4}
                                                >
                                                    {post.excerpt}
                                                </Text>
                                                {/* Tag + date footer */}
                                                <Text
                                                    position={[-2.5, -1.15, 0.05]}
                                                    fontSize={0.16}
                                                    color="#999999"
                                                    anchorX="left"
                                                    anchorY="middle"
                                                    font="/reference/fonts/CabinSketch-Regular.ttf"
                                                    fontStyle="italic"
                                                >
                                                    {post.tag}
                                                </Text>
                                            </group>
                                        );
                                    })}
                                </group>
                            )}

                            {/* Lighting - WYLACZONE */}
                            {/* <pointLight position={[0, roomHeight / 2 - 2, 0]} intensity={1} distance={40} color="#ffffff" /> */}
                            {/* <pointLight position={[0, 0, -roomDepth / 4]} intensity={0.5} distance={30} color="#fffaf0" /> */}
                        </group>
                    )}
                </group>
            )}
        </group>
    );
});

RoomInterior.displayName = 'RoomInterior';

export default RoomInterior;
