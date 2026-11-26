import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Html,
  useAnimations,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import { AdditiveBlending, LoopRepeat, PCFShadowMap } from "three";
import type { Group, Material, Mesh } from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

function SceneLoader() {
  const { progress } = useProgress();

  return (
    <Html center className="scene-loader">
      {Math.round(progress)}% loaded
    </Html>
  );
}

function FloorGlow() {
  const innerGlowRef = useRef<Mesh>(null);
  const outerGlowRef = useRef<Mesh>(null);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const pulse = 1 + Math.sin(elapsed * 1.6) * 0.04;
    const pulseOuter = 1 + Math.sin(elapsed * 1.2) * 0.06;

    if (innerGlowRef.current) {
      innerGlowRef.current.scale.set(pulse, pulse, pulse);
    }

    if (outerGlowRef.current) {
      outerGlowRef.current.scale.set(pulseOuter, pulseOuter, pulseOuter);
    }
  });

  return (
    <>
      <mesh
        ref={outerGlowRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2.1, 0]}
        renderOrder={1}
      >
        <circleGeometry args={[1.72, 64]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.15}
          depthWrite={false}
          toneMapped={false}
          blending={AdditiveBlending}
        />
      </mesh>

      <mesh
        ref={innerGlowRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2.08, 0]}
        renderOrder={2}
      >
        <circleGeometry args={[1.02, 64]} />
        <meshBasicMaterial
          color="#f8fafc"
          transparent
          opacity={0.28}
          depthWrite={false}
          toneMapped={false}
          blending={AdditiveBlending}
        />
      </mesh>
    </>
  );
}

function AvatarModel() {
  const groupRef = useRef<Group>(null);
  const { scene, animations } = useGLTF("/models/avatar.glb", "/draco/");
  const clonedScene = useMemo(() => clone(scene), [scene]);
  const { actions, names } = useAnimations(animations, clonedScene);

  useEffect(() => {
    clonedScene.traverse((object) => {
      if (!("isMesh" in object) || !object.isMesh) return;

      const mesh = object as Mesh;
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      const materials = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];

      materials.forEach((material: Material) => {
        if (!material || typeof material !== "object") return;

        if ("roughness" in material && typeof material.roughness === "number") {
          material.roughness = Math.min(material.roughness, 0.78);
        }

        if ("metalness" in material && typeof material.metalness === "number") {
          material.metalness = Math.min(material.metalness, 0.12);
        }

        if (
          "envMapIntensity" in material &&
          typeof material.envMapIntensity === "number"
        ) {
          material.envMapIntensity = Math.max(material.envMapIntensity, 1.5);
        }

        if (
          "emissiveIntensity" in material &&
          typeof material.emissiveIntensity === "number"
        ) {
          material.emissiveIntensity = Math.max(material.emissiveIntensity, 0.22);
        }

        if ("needsUpdate" in material) {
          material.needsUpdate = true;
        }
      });
    });
  }, [clonedScene]);

  useEffect(() => {
    const animationName = names[0];
    if (!animationName) return;

    const action = actions[animationName];
    if (!action) return;

    action.reset();
    action.fadeIn(0.35);
    action.setLoop(LoopRepeat, Infinity);
    action.play();
    action.setEffectiveTimeScale(0.9);

    return () => {
      action.fadeOut(0.2);
      action.stop();
    };
  }, [actions, names]);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;

    const elapsed = state.clock.getElapsedTime();
    group.rotation.y = Math.sin(elapsed * 0.34) * 0.075;
    group.position.y = -1.72 + Math.sin(elapsed * 1.05) * 0.02;
  });

  return (
    <group ref={groupRef} position={[0, -1.72, 0]}>
      <primitive object={clonedScene} scale={1.72} />
    </group>
  );
}

function ThreeScene() {
  return (
    <div className="three-scene" aria-label="Animated 3D character">
      <Canvas
        camera={{ position: [0, 1.2, 7], fov: 24 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl, scene }) => {
          gl.toneMappingExposure = 2.05;
          scene.background = null;
        }}
        shadows={{ type: PCFShadowMap }}
      >
        <ambientLight intensity={2.75} />
        <hemisphereLight
          intensity={2.45}
          color="#f8fbff"
          groundColor="#16314a"
        />
        <directionalLight
          position={[0.8, 5.2, 4.4]}
          intensity={6.8}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight
          position={[-4.2, 3.8, 1.8]}
          intensity={3.7}
          color="#7dd3fc"
        />
        <spotLight
          position={[0.2, 6, 4.9]}
          intensity={182}
          angle={0.42}
          penumbra={0.9}
          distance={18}
          color="#ffffff"
          castShadow
        />
        <pointLight
          position={[0, 1.75, 3.5]}
          intensity={52}
          distance={12}
          color="#fefce8"
        />
        <pointLight
          position={[2.9, 1.8, 1.3]}
          intensity={25}
          distance={10}
          color="#f59e0b"
        />
        <pointLight
          position={[-3.2, 2.4, 0.8]}
          intensity={30}
          distance={12}
          color="#67e8f9"
        />

        <Suspense fallback={<SceneLoader />}>
          <AvatarModel />
          <FloorGlow />
          <ContactShadows
            position={[0, -2.45, 0]}
            opacity={0.34}
            scale={12}
            blur={2.5}
            far={4.2}
            color="#020617"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/avatar.glb", "/draco/");

export default ThreeScene;
