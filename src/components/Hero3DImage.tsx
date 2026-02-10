import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState, useEffect } from "react";
import * as THREE from "three";
import logo from "@/assets/pngwing.com.png";


function FloatingImage({ textureUrl }: { textureUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
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
      // Slow float with subtle side-to-side drift and gentle tilt
      meshRef.current.position.y = Math.sin(t * 0.6) * 0.1;
      meshRef.current.position.x = Math.sin(t * 0.35) * 0.08;
      meshRef.current.rotation.x = Math.sin(t * 0.45) * 0.05;
      meshRef.current.rotation.z = Math.sin(t * 0.4) * 0.04;

      const pulseScale = 0.98 + Math.sin(t * 0.9) * 0.02;
      meshRef.current.scale.setScalar(pulseScale);
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <planeGeometry args={[2.5, 2.5]} />
      <meshBasicMaterial map={texture} transparent toneMapped={false} />
    </mesh>
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
      <Canvas
        camera={{ position: [0, 0, 5], fov: 40 }}
        shadows
        gl={{ outputColorSpace: THREE.SRGBColorSpace, toneMapping: THREE.NoToneMapping }}
        style={{ pointerEvents: isMobile ? "none" : "auto" }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 4, 2]} intensity={0.7} />
        <FloatingImage textureUrl= {logo} />
        {!isMobile && <OrbitControls enableZoom={false} enablePan={false} />}
      </Canvas>
    </div>
  );
}
