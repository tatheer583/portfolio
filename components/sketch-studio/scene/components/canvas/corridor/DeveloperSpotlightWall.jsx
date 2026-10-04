import { Edges, Line, Text } from '@react-three/drei';
import { useScene } from '../../../context/SceneContext';
import { DEVELOPER_QUOTES } from '../../../data/developerQuotes';

const FONT = '/reference/fonts/CabinSketch-Regular.ttf';
const ACCENTS = ['#4c87a6', '#d39a4b', '#8b6fa9', '#5b927c', '#b46f62'];
const POSITIONS = [
    { side: -1, z: -6 },
    { side: 1, z: -12 },
    { side: -1, z: -26 },
    { side: 1, z: -42 },
    { side: -1, z: -58 },
];

function slugify(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function SpotlightPoster({ item, index, position, enabled }) {
    const accent = ACCENTS[index % ACCENTS.length];
    const rotation = [0, -position.side * Math.PI / 2, 0];
    return <group
        name={`developer-poster-${slugify(item.name)}`}
        position={[position.side * 3.42, 2.15, position.z]}
        rotation={rotation}
        onClick={event => { if (!enabled) return; event.stopPropagation(); }}
    >
        <Line points={[[-.48, .64, 0], [0, .87, 0], [.48, .64, 0]]} color="#575046" lineWidth={1.3} />
        <mesh name={`developer-poster-frame-${index}`}>
            <boxGeometry args={[1.72, 1.32, .09]} />
            <meshBasicMaterial color={accent} />
            <Edges color="#403b31" />
        </mesh>
        <mesh position={[0, 0, .058]}>
            <planeGeometry args={[1.57, 1.17]} />
            <meshBasicMaterial color="#fff6dc" />
        </mesh>
        <mesh position={[0, 0, .061]}>
            <planeGeometry args={[1.49, 1.09]} />
            <meshBasicMaterial color={accent} transparent opacity={.12} />
        </mesh>
        <Text font={FONT} position={[0, .47, .09]} fontSize={.075} color="#655c4d" anchorX="center" anchorY="middle">
            DEVELOPER SPOTLIGHT
        </Text>
        <Text font={FONT} position={[0, .29, .09]} fontSize={.12} maxWidth={1.42} color="#383329" textAlign="center" anchorX="center" anchorY="middle">
            {item.name}
        </Text>
        <Text font={FONT} position={[0, .02, .09]} fontSize={.083} maxWidth={1.38} lineHeight={1.1} color="#3e5d52" textAlign="center" anchorX="center" anchorY="middle">
            “{item.quote}”
        </Text>
        <Text font={FONT} position={[0, -.37, .09]} fontSize={.055} maxWidth={1.4} color="#655c4d" textAlign="center" anchorX="center" anchorY="middle">
            {item.role}
        </Text>
        <Text font={FONT} position={[0, -.51, .09]} fontSize={.045} maxWidth={1.38} lineHeight={1.05} color="#494034" textAlign="center" anchorX="center" anchorY="middle">
            {item.note}
        </Text>
    </group>;
}

export default function DeveloperSpotlightWall({ zOffset }) {
    const { hasEntered } = useScene();
    return <group name="developer-spotlight-wall">
        {DEVELOPER_QUOTES.map((item, index) => (
            <SpotlightPoster
                key={item.name}
                item={item}
                index={index}
                enabled={hasEntered}
                position={{ ...POSITIONS[index], z: zOffset + POSITIONS[index].z }}
            />
        ))}
    </group>;
}
