import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges, Text, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const FONT = '/reference/fonts/CabinSketch-Regular.ttf';

function InkBox({ position, size, color = '#ececea', rotation, children }) {
    return <group position={position} rotation={rotation}>
        <mesh>
            <boxGeometry args={size} />
            <meshBasicMaterial color={color} />
            <Edges color="#454036" threshold={20} />
        </mesh>
        {children}
    </group>;
}

function DeskMonitor({ position, phase = 0 }) {
    const cursor = useRef();
    useFrame(({ clock }) => {
        if (cursor.current) cursor.current.visible = Math.sin(clock.elapsedTime * 3 + phase) > 0;
    });
    return <group position={position}>
        <InkBox size={[1.85, 1.1, .13]}>
            <mesh position={[0, 0, .075]}>
                <planeGeometry args={[1.62, .86]} />
                <meshBasicMaterial color="#fff7df" />
            </mesh>
            <Text font={FONT} fontSize={.115} color="#3e6754" anchorX="left" position={[-.72, .25, .08]}>{'> hello, visitor\n  build. learn. create.\n  let’s work together'}</Text>
            <mesh ref={cursor} position={[-.68, -.28, .085]}>
                <planeGeometry args={[.07, .018]} /><meshBasicMaterial color="#3e6754" />
            </mesh>
        </InkBox>
        <InkBox position={[0, -.66, 0]} size={[.13, .25, .11]} />
        <InkBox position={[0, -.8, .07]} size={[.62, .05, .4]} />
    </group>;
}

export default function OfficeRoom({ showRoom, onReady }) {
    const readyFrames = useRef(0);
    const wood = useTexture('/reference/textures/corridor/kawalekpodlogi.webp');
    useFrame(() => {
        if (showRoom && readyFrames.current < 6 && ++readyFrames.current === 6) onReady?.();
    });
    return <group visible={showRoom}>
        <mesh position={[0, -.75, -7]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[20, 18]} />
            <meshBasicMaterial color="#e8d7ac" map={wood} side={THREE.DoubleSide} />
        </mesh>
        <InkBox position={[0, 2.75, -12]} size={[20, 7, .1]} color="#fff0c5" />
        <InkBox position={[-10, 2.75, -7]} size={[.1, 7, 18]} color="#fff1ca" />
        <InkBox position={[10, 2.75, -7]} size={[.1, 7, 18]} color="#fff1ca" />
        <Text font={FONT} position={[-2.4, 4.1, -11.8]} fontSize={.62} color="#3e3931">TATHEER’S OFFICE</Text>
        <Text font={FONT} position={[-2.4, 3.4, -11.8]} fontSize={.25} color="#655d4d">Good ideas start with a conversation.</Text>
        {/* Window, mullions, and a small sun through the warm paper wall. */}
        <InkBox position={[-6.6, 2.9, -11.8]} size={[3.1, 2.9, .13]} color="#e6ece2">
            <InkBox position={[0, 0, .1]} size={[.07, 2.9, .1]} />
            <InkBox position={[0, 0, .1]} size={[3.1, .07, .1]} />
            <mesh position={[-.64, .73, .09]}><circleGeometry args={[.29, 32]} /><meshBasicMaterial color="#e4bb67" /></mesh>
        </InkBox>
        {/* Work desk, twin screens, keyboard, mug, and an office chair. */}
        <InkBox position={[-2.5, .34, -8.4]} size={[6.2, .13, 2.25]} color="#ead9ae" />
        {[-5.2, .2].map(x => <InkBox key={x} position={[x, -.16, -8.5]} size={[.15, 1, 1.9]} color="#dedbd2" />)}
        <DeskMonitor position={[-3.7, 1.24, -9]} />
        <DeskMonitor position={[-1.5, 1.24, -9]} phase={1} />
        <InkBox position={[-2.6, .45, -7.8]} size={[1.5, .06, .45]} />
        <InkBox position={[-.05, .57, -8.7]} size={[.28, .38, .28]} color="#bfcdbc" />
        <Text font={FONT} position={[-.05, .58, -8.55]} fontSize={.07} color="#3e3931">☕</Text>
        <InkBox position={[-2.5, -.17, -10.2]} size={[1.35, .16, 1.05]} color="#b3b7ad" />
        <InkBox position={[-2.5, .5, -10.7]} size={[1.35, 1.4, .15]} color="#b3b7ad" />
        <InkBox position={[-2.5, -.49, -10.2]} size={[.13, .6, .13]} />
        <InkBox position={[-2.5, -.73, -10.2]} size={[1.1, .06, .12]} />
        {/* Books and a plant give the office an inhabited feel. */}
        <InkBox position={[3.4, 1.1, -11.5]} size={[3.3, .09, .7]} color="#ddd7c4" />
        {['#b5c8af', '#d3bd90', '#b7bdd3', '#d8b5a1'].map((color, i) => <InkBox key={color} position={[2.45 + i * .35, 1.58, -11.45]} size={[.26, .85 + i * .07, .48]} color={color} rotation={[0, 0, i === 3 ? -.13 : 0]} />)}
        <mesh position={[-6.7, -.25, -8.5]}>
            <cylinderGeometry args={[.42, .31, 1, 12]} /><meshBasicMaterial color="#d9c4a5" /><Edges color="#454036" />
        </mesh>
        {[0, 1, 2, 3, 4].map(i => <mesh key={i} position={[-6.7 + Math.sin(i * 1.6) * .24, .48 + i * .13, -8.5 + Math.cos(i * 1.6) * .2]} rotation={[.15, i, .5]}>
            <sphereGeometry args={[.26, 8, 6]} /><meshBasicMaterial color="#9ebc88" /><Edges color="#64744b" />
        </mesh>)}
        <Text font={FONT} position={[3.7, 2.6, -11.8]} fontSize={.25} color="#514939">WEB • AI • CREATIVE TECHNOLOGY</Text>
    </group>;
}
