import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { useState, useEffect } from "react";
import * as THREE from "three";
import logo from "@/assets/pngwing.com.png";


function FloatingImage({ textureUrl }: { textureUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);
  const [hovered, setHovered] = useState(false);
  const [texture] = useState(() => new THREE.TextureLoader().load(textureUrl));
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Subtle floating motion + gentle tilt
      meshRef.current.position.y = Math.sin(t * 0.7) * 0.18;
      meshRef.current.rotation.y = Math.sin(t * 0.25) * 0.15;
      meshRef.current.rotation.x = Math.sin(t * 0.35) * 0.06;
      meshRef.current.rotation.z = Math.sin(t * 0.3) * 0.04;

      // Pulsing scale effect (slightly stronger on hover)
      const hoverBoost = hovered ? 0.05 : 0;
      const pulseScale = 0.92 + Math.sin(t * 1.8) * (0.06 + hoverBoost);
      meshRef.current.scale.setScalar(pulseScale);
    }
    
    // Pulsing glow effect
    if (glowRef.current) {
      const glowIntensity = 1.1 + Math.sin(t * 2.2) * (hovered ? 0.7 : 0.45);
      glowRef.current.intensity = glowIntensity;
    }

    if (haloRef.current) {
      haloRef.current.rotation.z = -t * 0.2;
      const haloPulse = 0.98 + Math.sin(t * 2.0) * (hovered ? 0.06 : 0.03);
      haloRef.current.scale.setScalar(haloPulse);
      const haloMaterial = haloRef.current.material as THREE.MeshBasicMaterial;
      haloMaterial.opacity = hovered ? 0.55 : 0.4;
    }
  });

  return (
    <>
      <pointLight ref={glowRef} position={[0, 0, 1]} color="#00b3ff" intensity={0.9} distance={8} />
      <mesh ref={haloRef} position={[0, 0, -0.02]}>
        <planeGeometry args={[2.85, 2.85]} />
        <meshBasicMaterial
          color="#3ad1ff"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh
        ref={meshRef}
        onPointerOver={() => !isMobile && setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <planeGeometry args={[2.5, 2.5]} />
        <meshStandardMaterial
          map={texture}
          transparent
          emissive={new THREE.Color("#4fd1ff")}
          emissiveIntensity={hovered ? 0.55 : 0.35}
        />
      </mesh>
    </>
  );
}

export default function Hero3DImage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="w-full h-[640px] md:h-[720px] flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 5], fov: 40 }} shadows style={{ pointerEvents: isMobile ? "none" : "auto" }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 4, 2]} intensity={0.7} />
        <FloatingImage textureUrl= {logo} />
        {!isMobile && <OrbitControls enableZoom={false} enablePan={false} />}
      </Canvas>
    </div>
  );
}
