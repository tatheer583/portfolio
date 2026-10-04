'use client';
import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';
type V = [number, number, number];
const ink = '#686450';
function Box({ at, size, color, rotation }: { at: V; size: V; color: string; rotation?: V }) {
  return <mesh position={at} rotation={rotation} castShadow receiveShadow><boxGeometry args={size} /><meshStandardMaterial color={color} roughness={0.95} /><Edges color={ink} threshold={30} /></mesh>;
}
function Tree({ x }: { x: number }) {
  return <group position={[x, 0, 18.5]}>
    <mesh position={[0, 1.45, 0]} castShadow><cylinderGeometry args={[0.16, 0.22, 2.9, 8]} /><meshStandardMaterial color="#b89d72" roughness={1} /><Edges color={ink} /></mesh>
    <Box at={[0, 0.02, 0]} size={[2.05, 0.1, 1.85]} color="#cfc4a3" />
    {[[-0.64, 3.2, 0], [0.63, 3.6, 0.14], [0, 4.4, -0.12]].map((at, i) => <mesh key={i} position={at as V} scale={[1.05, 1.35, 0.85]} castShadow><icosahedronGeometry args={[1.04, 1]} /><meshStandardMaterial color={i % 2 ? '#a4ad86' : '#919d7b'} roughness={1} flatShading /><Edges color="#7b8569" threshold={35} /></mesh>)}
  </group>;
}
function Lamp({ x }: { x: number }) {
  return <group position={[x, 0, 20]}>
    <mesh position={[0, 2.24, 0]} castShadow><cylinderGeometry args={[0.075, 0.09, 4.48, 8]} /><meshStandardMaterial color="#8e8f80" /><Edges color={ink} /></mesh>
    <Box at={[0, 4.48, 0]} size={[0.58, 0.11, 0.58]} color="#aaa995" /><Box at={[0, 4.24, 0]} size={[0.35, 0.42, 0.35]} color="#fff0b8" /><Box at={[0, 0.08, 0]} size={[0.42, 0.16, 0.42]} color="#a6a493" />
  </group>;
}
function Neighbor({ side }: { side: number }) {
  return <group position={[side * 16.5, 0, 9.25]}>
    <Box at={[0, 2.56, 0]} size={[7, 5.12, 5.9]} color={side < 0 ? '#f2e4b8' : '#ead9a6'} /><Box at={[0, 5.2, 0.22]} size={[7.35, 0.16, 6.4]} color="#c8c4ae" /><Box at={[0, 0.14, 3.13]} size={[7.45, 0.28, 0.45]} color="#d2c5a4" /><Box at={[0, 1.59, 3.03]} size={[1.45, 3, 0.075]} color="#c5cac1" />
    {[-2.35, 2.35].map(x => <group key={x}><Box at={[x, 2.02, 3.02]} size={[1.75, 2.22, 0.05]} color="#cbd6c1" /><Box at={[x, 2.02, 3.065]} size={[0.055, 2.21, 0.025]} color="#999780" /><Box at={[x, 2.02, 3.065]} size={[1.76, 0.055, 0.025]} color="#999780" /></group>)}
    <Box at={[0, 4.09, 3.17]} size={[6.64, 0.54, 0.13]} color={side < 0 ? '#b2b79a' : '#c5a685'} /><Box at={[0, 3.65, 3.56]} size={[6.87, 0.09, 1.16]} color="#e5d4a8" rotation={[-0.12, 0, 0]} />
  </group>;
}
function Car({ color }: { color: string }) {
  return <group><Box at={[0, 0.47, 0]} size={[3.45, 0.65, 1.46]} color={color} /><Box at={[-0.18, 1, 0]} size={[1.85, 0.64, 1.27]} color={color} />
    <Box at={[-0.17, 1.06, 0.649]} size={[1.49, 0.39, 0.028]} color="#c8d0c4" /><Box at={[-0.17, 1.06, -0.649]} size={[1.49, 0.39, 0.028]} color="#c8d0c4" /><Box at={[-0.2, 1.08, 0.67]} size={[0.045, 0.42, 0.025]} color={ink} />
    {[-1.14, 1.14].flatMap(x => [-0.73, 0.73].map(z => <mesh key={`${x}-${z}`} position={[x, 0.32, z]} rotation={[Math.PI / 2, 0, 0]} castShadow><cylinderGeometry args={[0.32, 0.32, 0.12, 12]} /><meshStandardMaterial color="#656a60" roughness={1} /><Edges color={ink} /></mesh>))}<Box at={[1.735, 0.5, 0]} size={[0.025, 0.17, 0.95]} color="#eee1b9" />
  </group>;
}
export default function LivingStreet({ reducedMotion = false, playing = true, speed = 1 }: { reducedMotion?: boolean; playing?: boolean; speed?: number }) {
  const firstCar = useRef<THREE.Group>(null), secondCar = useRef<THREE.Group>(null), leaves = useRef<THREE.Group>(null);
  const elapsed = useRef(0), visible = useRef(true);
  useEffect(() => { const update = () => { visible.current = !document.hidden; }; update(); document.addEventListener('visibilitychange', update); return () => document.removeEventListener('visibilitychange', update); }, []);
  useFrame((_, delta) => {
    if (reducedMotion || !playing || !visible.current) return;
    elapsed.current += Math.min(delta, 0.1) * THREE.MathUtils.clamp(speed, 0.4, 3);
    const t = elapsed.current;
    if (firstCar.current) firstCar.current.position.x = ((t * 2.3 + 19) % 68) - 34;
    if (secondCar.current) secondCar.current.position.x = 34 - ((t * 1.8 + 49) % 68);
    if (leaves.current) leaves.current.children.forEach((leaf, i) => { leaf.position.y = 0.8 + ((i * 0.57 + t * 0.23) % 3.2); leaf.position.x = (i < 4 ? -10.8 : 10.8) + Math.sin(t * 0.4 + i) * 1.2; leaf.rotation.z = t * 0.35 + i; });
  });
  return <group>
    <Box at={[0, -0.095, 28.25]} size={[72, 0.11, 10.5]} color="#a5a594" /><Box at={[0, -0.035, 19.55]} size={[72, 0.12, 6.8]} color="#e9ddbb" /><Box at={[0, 0.015, 23]} size={[72, 0.2, 0.23]} color="#cbc6ae" /><Box at={[0, -0.055, 34.4]} size={[72, 0.18, 1.25]} color="#ddd2b4" />
    {Array.from({ length: 18 }, (_, i) => <Box key={`lane-${i}`} at={[-34 + i * 4, -0.027, 28.25]} size={[1.8, 0.006, 0.055]} color="#eae4cb" />)}
    {Array.from({ length: 8 }, (_, i) => <Box key={`cross-${i}`} at={[7.3, -0.024, 23.65 + i * 1.12]} size={[3.6, 0.007, 0.49]} color="#ece6cf" />)}
    {[-1, 1].map(side => <group key={side}><Neighbor side={side} /><Tree x={side * 10.8} /><Lamp x={side * 7.5} /></group>)}
    <group ref={firstCar} position={[-15, 0, 25.5]}><Car color="#c5b382" /></group><group ref={secondCar} position={[-15, 0, 31]} rotation={[0, Math.PI, 0]}><Car color="#a4b199" /></group>
    <group ref={leaves}>{Array.from({ length: 8 }, (_, i) => <mesh key={i} position={[i < 4 ? -10.8 : 10.8, 0.8 + i * 0.3, 17 + i % 4]} rotation={[0.3, i, i]} scale={[0.08, 0.16, 0.025]}><sphereGeometry args={[1, 6, 4]} /><meshStandardMaterial color={i % 2 ? '#a6ac83' : '#bdaf77'} roughness={1} /></mesh>)}</group>
  </group>;
}
