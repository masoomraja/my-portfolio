import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Decal, Html, useTexture } from "@react-three/drei";
import type { Group, Texture } from "three";
import { PCFShadowMap, Vector3 } from "three";

type SkillConfig = {
  image: string;
  label: string;
  radius: number;
  tint: string;
};

type SkillBody = SkillConfig & {
  position: Vector3;
  rotation: Vector3;
  textureRotation: number;
  velocity: Vector3;
};

const SKILL_RADIUS_SCALE = 0.9;

// Add more icons here after placing them in public/skills.
const skillCatalog: SkillConfig[] = [
  {
    label: "JavaScript",
    image: "/skills/javascript.png",
    radius: 0.62,
    tint: "#fde047",
  },
  {
    label: "MySQL",
    image: "/skills/mysql.png",
    radius: 0.64,
    tint: "#7dd3fc",
  },
  {
    label: "Node.js",
    image: "/skills/node.png",
    radius: 0.62,
    tint: "#86efac",
  },
  {
    label: "React",
    image: "/skills/react.png",
    radius: 0.66,
    tint: "#67e8f9",
  },
  {
    label: "MongoDB",
    image: "/skills/mongo.webp",
    radius: 0.64,
    tint: "#4ade80",
  },
  {
    label: "Java",
    image: "/skills/java.png",
    radius: 0.6,
    tint: "#fb923c",
  },
  {
    label: "Python",
    image: "/skills/python.png",
    radius: 0.6,
    tint: "#facc15",
  },
  {
    label: "Express",
    image: "/skills/express.png",
    radius: 0.6,
    tint: "#e5e7eb",
  },
  {
    label: "C",
    image: "/skills/c.png",
    radius: 0.58,
    tint: "#60a5fa",
  },
  {
    label: "GenAI",
    image: "/skills/genai.webp",
    radius: 0.6,
    tint: "#d8b4fe",
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function createBodies() {
  return skillCatalog.map((skill) => {
    const radius = skill.radius * SKILL_RADIUS_SCALE;

    return {
      ...skill,
      radius,
    position: new Vector3(
      randomBetween(-2.15, 2.15),
      randomBetween(-0.5, 0.95),
      randomBetween(-1.2, 1.2)
    ),
    rotation: new Vector3(
      randomBetween(-0.06, 0.06),
      randomBetween(-0.28, 0.28),
      randomBetween(-0.04, 0.04)
    ),
    textureRotation: randomBetween(-0.7, 0.7),
    velocity: new Vector3(
      randomBetween(-0.0045, 0.0045),
      randomBetween(-0.0035, 0.0035),
      randomBetween(-0.0038, 0.0038)
    ),
    };
  });
}

function SkillsLoader() {
  return (
    <Html center className="scene-loader">
      Loading skills
    </Html>
  );
}

function SkillSphere({
  body,
  register,
}: {
  body: SkillBody;
  register: (node: Group | null) => void;
}) {
  const texture = useTexture(body.image) as Texture;

  return (
    <group ref={register}>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[body.radius, 64, 64]} />
        <meshPhysicalMaterial
          clearcoat={1}
          clearcoatRoughness={0.08}
          color="#ffffff"
          metalness={0.02}
          reflectivity={0.92}
          roughness={0.12}
        />

        <Decal
          position={[body.radius * 0.12, body.radius * 0.12, body.radius * 0.85]}
          rotation={[0.06, 0.08, body.textureRotation * 0.4]}
          scale={body.radius * 1.18}
        >
          <meshBasicMaterial
            map={texture}
            opacity={1}
            polygonOffset
            polygonOffsetFactor={-4}
            toneMapped={false}
            transparent
          />
        </Decal>
      </mesh>
    </group>
  );
}

function SkillsField({ scatterSignal }: { scatterSignal: number }) {
  const groupRefs = useRef<Array<Group | null>>([]);
  const bodies = useMemo(() => createBodies(), []);
  const pointerWorld = useRef(new Vector3());
  const lastScatterRef = useRef(0);

  useFrame((state) => {
    if (scatterSignal !== lastScatterRef.current) {
      lastScatterRef.current = scatterSignal;
      bodies.forEach((body) => {
        body.velocity.set(
          randomBetween(-0.085, 0.085),
          randomBetween(-0.065, 0.075),
          randomBetween(-0.05, 0.05)
        );
      });
    }

    const dt = clamp(state.clock.getDelta() * 60, 0.6, 1.35);
    const unprojected = new Vector3(state.pointer.x, state.pointer.y, 0.5)
      .unproject(state.camera)
      .sub(state.camera.position);

    const distanceToPlane = -state.camera.position.z / unprojected.z;
    pointerWorld.current
      .copy(state.camera.position)
      .add(unprojected.normalize().multiplyScalar(distanceToPlane));

    const bounds = {
      x: 3.2,
      y: 1.6,
      z: 1.7,
    };
    const elapsed = state.clock.getElapsedTime();

    bodies.forEach((body, index) => {
      const driftX = Math.sin(elapsed * 0.58 + index * 0.9) * 0.00028 * dt;
      const driftY = Math.cos(elapsed * 0.48 + index * 0.8) * 0.00022 * dt;
      const driftZ = Math.sin(elapsed * 0.44 + index * 1.1) * 0.00026 * dt;

      body.velocity.x += driftX - body.position.x * 0.00062 * dt;
      body.velocity.y += driftY - body.position.y * 0.00082 * dt;
      body.velocity.z += driftZ - body.position.z * 0.00062 * dt;

      const dx = body.position.x - pointerWorld.current.x;
      const dy = body.position.y - pointerWorld.current.y;
      const dz = body.position.z * 0.72;
      const pointerDistance = Math.hypot(dx, dy, dz) || 0.0001;
      const pointerRadius = body.radius + 1.35;

      if (pointerDistance < pointerRadius) {
        const strength =
          ((pointerRadius - pointerDistance) / pointerRadius) * 0.022 * dt;
        body.velocity.x += (dx / pointerDistance) * strength;
        body.velocity.y += (dy / pointerDistance) * strength;
        body.velocity.z += (dz / pointerDistance) * strength;
      }

      body.velocity.multiplyScalar(0.986);
      body.position.addScaledVector(body.velocity, dt * 0.92);

      if (body.position.x - body.radius < -bounds.x) {
        body.position.x = -bounds.x + body.radius;
        body.velocity.x = Math.abs(body.velocity.x) * 0.94;
      }

      if (body.position.x + body.radius > bounds.x) {
        body.position.x = bounds.x - body.radius;
        body.velocity.x = -Math.abs(body.velocity.x) * 0.94;
      }

      if (body.position.y - body.radius < -bounds.y) {
        body.position.y = -bounds.y + body.radius;
        body.velocity.y = Math.abs(body.velocity.y) * 0.94;
      }

      if (body.position.y + body.radius > bounds.y) {
        body.position.y = bounds.y - body.radius;
        body.velocity.y = -Math.abs(body.velocity.y) * 0.94;
      }

      if (body.position.z - body.radius < -bounds.z) {
        body.position.z = -bounds.z + body.radius;
        body.velocity.z = Math.abs(body.velocity.z) * 0.94;
      }

      if (body.position.z + body.radius > bounds.z) {
        body.position.z = bounds.z - body.radius;
        body.velocity.z = -Math.abs(body.velocity.z) * 0.94;
      }
    });

    for (let i = 0; i < bodies.length; i += 1) {
      const bodyA = bodies[i];

      for (let j = i + 1; j < bodies.length; j += 1) {
        const bodyB = bodies[j];
        const delta = new Vector3().subVectors(bodyB.position, bodyA.position);
        const distance = delta.length() || 0.0001;
        const minimumDistance = bodyA.radius + bodyB.radius + 0.06;

        if (distance >= minimumDistance) continue;

        const normal = delta.normalize();
        const overlap = minimumDistance - distance;

        bodyA.position.addScaledVector(normal, -overlap * 0.5);
        bodyB.position.addScaledVector(normal, overlap * 0.5);

        const relativeVelocity = new Vector3().subVectors(
          bodyB.velocity,
          bodyA.velocity
        );
        const separatingSpeed = relativeVelocity.dot(normal);

        if (separatingSpeed < 0) {
          const impulse = (-1.18 * separatingSpeed) / 2;
          bodyA.velocity.addScaledVector(normal, -impulse);
          bodyB.velocity.addScaledVector(normal, impulse);
        }
      }
    }

    bodies.forEach((body, index) => {
      const node = groupRefs.current[index];
      if (!node) return;

      node.position.copy(body.position);
      node.rotation.set(body.rotation.x, body.rotation.y, body.rotation.z);
    });
  });

  return (
    <>
      {bodies.map((body, index) => (
        <SkillSphere
          body={body}
          key={body.label}
          register={(node) => {
            groupRefs.current[index] = node;
          }}
        />
      ))}

      <ContactShadows
        frames={1}
        blur={2.8}
        far={6}
        opacity={0.4}
        position={[0, -2.18, 0]}
        scale={9}
      />
    </>
  );
}

function SkillsPlayground() {
  const [scatterSignal, setScatterSignal] = useState(0);

  return (
    <div className="skills-showcase">
      <div className="skills-showcase-copy">
        <p className="skills-kicker">Interactive Stack</p>
        <h3>Hands-on tools across backend, web, cloud, and AI.</h3>
        <p>
          From Java, Spring Boot, and MySQL backends to React interfaces, Docker
          containers, and Agentic AI workflows—interact with the core
          technologies behind my projects.
        </p>
        <ul className="skills-notes">
          <li>Backend &amp; APIs: Java, Spring Boot, JDBC, Node.js, Express.js</li>
          <li>Databases &amp; DevOps: MySQL, MongoDB, Docker, Nginx, AWS</li>
          <li>AI &amp; Languages: Python, JavaScript, C, C++, GenAI &amp; NLP</li>
        </ul>
        <button
          className="btn btn-secondary skills-scatter-btn"
          type="button"
          onClick={() => setScatterSignal((prev) => prev + 1)}
        >
          Scatter 3D Spheres
        </button>
      </div>

      <div className="skills-playground">
        <Canvas
          camera={{ position: [0, 0.1, 6.8], fov: 34 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          onCreated={({ gl, scene }) => {
            gl.toneMappingExposure = 1.9;
            scene.background = null;
          }}
          shadows={{ type: PCFShadowMap }}
        >
          <ambientLight intensity={1.35} />
          <directionalLight
            castShadow
            color="#ffffff"
            intensity={2.4}
            position={[2.2, 4.8, 5.6]}
          />
          <pointLight color="#67e8f9" intensity={18} position={[-4.2, 1.2, 1.8]} />
          <pointLight color="#f9a8d4" intensity={16} position={[4.6, 2.4, 2.6]} />
          <pointLight color="#ffffff" intensity={12} position={[0, -0.6, 4.6]} />

          <Suspense fallback={<SkillsLoader />}>
            <SkillsField scatterSignal={scatterSignal} />
          </Suspense>
        </Canvas>

        <div className="skills-playground-hint">
          Move cursor or tap Scatter to interact
        </div>
      </div>
    </div>
  );
}

export default SkillsPlayground;
