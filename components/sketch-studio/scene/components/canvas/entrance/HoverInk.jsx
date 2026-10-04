import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Color the paper areas of the drawing while preserving its ink and transparency.
export default function HoverInk({ texture, size, kind }) {
    const active = useRef(false);
    const raycast = useMemo(() => {
        const image = texture.image;
        const canvas = document.createElement('canvas');
        canvas.width = image.width; canvas.height = image.height;
        const context = canvas.getContext('2d', { willReadFrequently: true });
        context.drawImage(image, 0, 0);
        const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
        return function testInk(raycaster, intersections) {
            const hits = [];
            THREE.Mesh.prototype.raycast.call(this, raycaster, hits);
            for (const hit of hits) {
                const x = Math.min(canvas.width - 1, Math.max(0, Math.floor(hit.uv.x * canvas.width)));
                const y = Math.min(canvas.height - 1, Math.max(0, Math.floor((1 - hit.uv.y) * canvas.height)));
                if (pixels[(y * canvas.width + x) * 4 + 3] > 20) intersections.push(hit);
            }
        };
    }, [texture]);
    const uniforms = useMemo(() => ({
        artwork: { value: texture },
        reveal: { value: kind === 'cat' ? .65 : 0 },
        isTree: { value: kind === 'tree' ? 1 : 0 },
    }), [texture, kind]);
    useFrame((_, delta) => {
        uniforms.reveal.value = THREE.MathUtils.damp(uniforms.reveal.value, active.current ? 1 : kind === 'cat' ? .65 : 0, 8, delta);
    });
    return (
        <mesh
            name={`hover-color-${kind}`}
            raycast={raycast}
            onPointerOver={event => { event.stopPropagation(); active.current = true; }}
            onPointerOut={() => { active.current = false; }}
            onClick={event => { event.stopPropagation(); active.current = !active.current; }}
        >
            <planeGeometry args={size} />
            <shaderMaterial
                uniforms={uniforms}
                transparent depthWrite={false}
                vertexShader={`varying vec2 inkUv;
                    void main() { inkUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`}
                fragmentShader={`uniform sampler2D artwork; uniform float reveal; uniform float isTree;
                    varying vec2 inkUv;
                    void main() {
                        vec4 paper = texture2D(artwork, inkUv);
                        if (paper.a < 0.02) discard;
                        vec3 fur = mix(vec3(0.78, 0.45, 0.19), vec3(0.93, 0.68, 0.4), smoothstep(0.2, 0.7, inkUv.y));
                        float eye = max(1.0 - smoothstep(0.03, 0.055, distance(inkUv, vec2(0.44, 0.69))),
                                        1.0 - smoothstep(0.03, 0.055, distance(inkUv, vec2(0.54, 0.69))));
                        fur = mix(fur, vec3(0.53, 0.71, 0.49), eye);
                        vec3 leaves = mix(vec3(0.68, 0.47, 0.28), vec3(0.51, 0.71, 0.43), smoothstep(0.4, 0.52, inkUv.y));
                        vec3 pigment = mix(fur, leaves, isTree);
                        vec3 colored = paper.rgb * pigment;
                        gl_FragColor = vec4(mix(paper.rgb * 0.93, colored, reveal), paper.a);
                        #include <tonemapping_fragment>
                        #include <colorspace_fragment>
                    }`}
            />
        </mesh>
    );
}
