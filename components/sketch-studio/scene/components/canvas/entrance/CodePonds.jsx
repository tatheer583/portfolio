import { useFrame } from '@react-three/fiber';
import { Edges, Text } from '@react-three/drei';
import { useRef } from 'react';

const FONT = '/reference/fonts/CabinSketch-Regular.ttf';
const PONDS = [
    {
        position: [2.2, 0, 0.35],
        tint: '#a7d4cc',
        label: 'LOGIC POND',
        fish: [
            { label: 'PYTHON', color: '#3875a5', accent: '#f0c94c', phase: 0 },
            { label: 'NODE.JS', color: '#5b9d63', accent: '#d7ead1', phase: 2.1 },
            { label: 'RUST', color: '#d46d42', accent: '#f6d5a7', phase: 4.2 },
        ],
    },
    {
        position: [3.78, 0, 0.88],
        tint: '#a9c9dc',
        label: 'CREATIVE POND',
        fish: [
            { label: 'TS', color: '#3178c6', accent: '#d7edff', phase: 1 },
            { label: 'REACT', color: '#4ebbd1', accent: '#dffaff', phase: 3.2 },
            { label: 'GO', color: '#49a9bb', accent: '#d9f4f4', phase: 5 },
        ],
    },
];

function Fish({ label, color, accent, phase, index }) {
    const fish = useRef();
    useFrame(({ clock }) => {
        if (!fish.current) return;
        const time = clock.elapsedTime * 0.8 + phase;
        fish.current.position.x = Math.sin(time) * 0.38;
        fish.current.position.y = Math.sin(time * 1.8) * 0.035;
        fish.current.position.z = Math.cos(time * 1.2) * 0.1;
        fish.current.rotation.y = Math.cos(time) * 0.2;
    });
    return <group ref={fish} position={[0, 0.08 + index * 0.025, index * 0.12 - 0.1]}>
        <mesh scale={[0.34, 0.2, 0.14]}>
            <sphereGeometry args={[1, 16, 10]} />
            <meshBasicMaterial color={color} />
            <Edges color="#393832" threshold={15} />
        </mesh>
        <mesh position={[-0.34, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <coneGeometry args={[0.19, 0.32, 3]} />
            <meshBasicMaterial color={accent} />
        </mesh>
        <mesh position={[0.2, 0.065, 0.13]}>
            <sphereGeometry args={[0.028, 8, 6]} />
            <meshBasicMaterial color="#292823" />
        </mesh>
        <Text font={FONT} position={[0, 0.26, 0.02]} fontSize={0.085} color="#34352f" anchorX="center" anchorY="middle">{label}</Text>
    </group>;
}

function Pond({ pond }) {
    return <group position={pond.position}>
        <mesh>
            <cylinderGeometry args={[0.82, 0.82, 0.11, 32]} />
            <meshBasicMaterial color="#cdbd9c" />
            <Edges color="#4f554d" threshold={15} />
        </mesh>
        <mesh position={[0, 0.065, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.73, 32]} />
            <meshBasicMaterial color={pond.tint} transparent opacity={0.92} />
        </mesh>
        <mesh position={[0, 0.072, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.73, 0.026, 8, 32]} />
            <meshBasicMaterial color="#6e8f84" />
        </mesh>
        {pond.fish.map((fish, index) => <Fish key={fish.label} {...fish} index={index} />)}
        <Text font={FONT} position={[0, 0.42, 0.08]} fontSize={0.1} color="#3c4942" anchorX="center">{pond.label}</Text>
        <mesh position={[0.52, 0.12, 0.26]} rotation={[0, 0, -0.12]}>
            <boxGeometry args={[0.08, 0.18, 0.08]} />
            <meshBasicMaterial color="#80a76f" />
        </mesh>
        <mesh position={[0.61, 0.17, 0.24]} rotation={[0.2, 0, 0.3]}>
            <sphereGeometry args={[0.11, 8, 6]} />
            <meshBasicMaterial color="#9bbd84" />
        </mesh>
    </group>;
}

export default function CodePonds({ floorY }) {
    return <group name="code-fish-garden" position={[0, floorY + 0.05, 0]}>
        {PONDS.map(pond => <Pond key={pond.label} pond={pond} />)}
    </group>;
}
