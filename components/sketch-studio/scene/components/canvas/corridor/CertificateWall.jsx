import { CERTIFICATES } from '@/data/certificates';
import { Edges, Line, Text, useTexture } from '@react-three/drei';
import { useScene } from '../../../context/SceneContext';

function CertificateImage({ path, aspect = 1.414 }) {
    const texture = useTexture(path);
    const width = Math.min(1.75, 1.3 * aspect);
    return <mesh position={[0, .15, .075]}>
        <planeGeometry args={[width, width / aspect]} />
        <meshBasicMaterial map={texture} />
    </mesh>;
}

function CertificateFrame({ certificate, position, rotation, enabled, accent }) {
    return <group name={`certificate-${certificate.id}`} position={position} rotation={rotation} onClick={event => { if (!enabled) return; event.stopPropagation(); window.open(certificate.url, '_blank', 'noopener,noreferrer'); }}>
        <Line points={[[-.55, .97, 0], [0, 1.3, 0], [.55, .97, 0]]} color="#575046" lineWidth={1.5} />
        <mesh name={`certificate-frame-${certificate.id}`}>
            <boxGeometry args={[2, 1.9, .08]} />
            <meshBasicMaterial color={accent} />
            <Edges color="#403b31" />
        </mesh>
        <mesh position={[0, 0, .055]}>
            <planeGeometry args={[1.85, 1.75]} /><meshBasicMaterial color="#fff6dc" />
        </mesh>
        <mesh position={[0, 0, .052]}>
            <planeGeometry args={[1.72, 1.62]} />
            <meshBasicMaterial color={accent} transparent opacity={.11} />
        </mesh>
        {certificate.image && <CertificateImage path={certificate.image} aspect={certificate.imageAspect} />}
        <Text font="/reference/fonts/CabinSketch-Regular.ttf" position={[0, certificate.image ? -.61 : .15, .08]} fontSize={.105} maxWidth={1.7} color="#383329" textAlign="center">{certificate.title}</Text>
        <Text font="/reference/fonts/CabinSketch-Regular.ttf" position={[0, -.77, .08]} fontSize={.063} maxWidth={1.7} color="#655c4d">{certificate.issuer} · Click to view ↗</Text>
    </group>;
}

export default function CertificateWall({ zOffset }) {
    const { hasEntered } = useScene();
    const accents = ['#4c87a6', '#d39a4b', '#8b6fa9'];
    return <group>
        {CERTIFICATES.map((certificate, i) => {
            const side = i % 2 ? 1 : -1;
            return <CertificateFrame key={certificate.id} certificate={certificate} enabled={hasEntered} accent={accents[i % accents.length]}
                position={[side * 3.42, .25, zOffset - 11 - Math.floor(i / 2) * 19]}
                rotation={[0, -side * Math.PI / 2, 0]} />;
        })}
    </group>;
}
