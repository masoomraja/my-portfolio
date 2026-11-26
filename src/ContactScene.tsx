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

function ContactFloorGlow() {
  const innerGlowRef = useRef<Mesh>(null);
  const outerGlowRef = useRef<Mesh>(null);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const pulse = 1 + Math.sin(elapsed * 1.4) * 0.035;
    const pulseOuter = 1 + Math.sin(elapsed * 1.1) * 0.05;

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
        position={[0, -1.46, 0]}
        renderOrder={1}
      >
        <circleGeometry args={[1.1, 64]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.12}
          depthWrite={false}
          toneMapped={false}
          blending={AdditiveBlending}
        />
      </mesh>

      <mesh
        ref={innerGlowRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.44, 0]}
        renderOrder={2}
      >
        <circleGeometry args={[0.7, 64]} />
        <meshBasicMaterial
          color="#f8fafc"
          transparent
          opacity={0.22}
          depthWrite={false}
          toneMapped={false}
          blending={AdditiveBlending}
        />
      </mesh>
    </>
  );
}

function ContactModel() {
  const groupRef = useRef<Group>(null);
  const { scene, animations } = useGLTF("/models/contact.glb", false, true);
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
          material.roughness = Math.min(material.roughness, 0.82);
        }

        if ("metalness" in material && typeof material.metalness === "number") {
          material.metalness = Math.min(material.metalness, 0.14);
        }

        if (
          "envMapIntensity" in material &&
          typeof material.envMapIntensity === "number"
        ) {
          material.envMapIntensity = Math.max(material.envMapIntensity, 1.2);
        }

        if (
          "emissiveIntensity" in material &&
          typeof material.emissiveIntensity === "number"
        ) {
          material.emissiveIntensity = Math.max(material.emissiveIntensity, 0.18);
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
    action.fadeIn(0.3);
    action.setLoop(LoopRepeat, Infinity);
    action.setEffectiveTimeScale(0.9);
    action.play();

    return () => {
      action.fadeOut(0.2);
      action.stop();
    };
  }, [actions, names]);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;

    const elapsed = state.clock.getElapsedTime();
    group.rotation.y = Math.sin(elapsed * 0.32) * 0.06;
    group.position.y = -1.08 + Math.sin(elapsed * 1.05) * 0.015;
  });

  return (
    <group ref={groupRef} position={[0, -1.08, 0]}>
      <primitive object={clonedScene} scale={1.16} />
    </group>
  );
}

function ContactScene() {
  return (
    <div className="contact-three-scene" aria-label="Animated 3D contact model">
      <Canvas
        camera={{ position: [0, 1.05, 6.7], fov: 28 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl, scene }) => {
          gl.toneMappingExposure = 1.88;
          scene.background = null;
        }}
        shadows={{ type: PCFShadowMap }}
      >
        <ambientLight intensity={2.1} />
        <hemisphereLight
          intensity={2}
          color="#f8fbff"
          groundColor="#16314a"
        />
        <directionalLight
          position={[0.8, 5.2, 4.4]}
          intensity={5.8}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight
          position={[-4.2, 3.8, 1.8]}
          intensity={3}
          color="#7dd3fc"
        />
        <spotLight
          position={[0.2, 6, 4.9]}
          intensity={144}
          angle={0.42}
          penumbra={0.9}
          distance={18}
          color="#ffffff"
        />
        <pointLight
          position={[0, 1.7, 3.4]}
          intensity={40}
          distance={12}
          color="#fefce8"
        />
        <pointLight
          position={[2.6, 1.7, 1.3]}
          intensity={18}
          distance={10}
          color="#f59e0b"
        />
        <pointLight
          position={[-2.9, 2.4, 0.8]}
          intensity={22}
          distance={12}
          color="#67e8f9"
        />

        <Suspense fallback={<SceneLoader />}>
          <ContactModel />
          <ContactFloorGlow />
          <ContactShadows
            frames={1}
            position={[0, -1.7, 0]}
            opacity={0.24}
            scale={8}
            blur={2.4}
            far={3.8}
            color="#020617"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default ContactScene;
