"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Cylinder } from "@react-three/drei";
import * as THREE from "three";
import { ConfigState } from "./ConfigControls";
import { GuitarType } from "./GuitarSelector";

interface GuitarModelProps {
  config: ConfigState;
  guitarType: GuitarType;
}

/* =============================================
   BODY SHAPE OUTLINES (Bezier curves)
   ============================================= */

function createStratShape(): THREE.Shape {
  const s = new THREE.Shape();
  const pts = [
    new THREE.Vector2(0.135, 0.65), // Neck pocket right
    new THREE.Vector2(0.16, 0.55), new THREE.Vector2(0.2, 0.45), new THREE.Vector2(0.28, 0.35), // Inner lower horn
    new THREE.Vector2(0.36, 0.3), new THREE.Vector2(0.42, 0.25), new THREE.Vector2(0.4, 0.15), // Lower horn tip
    new THREE.Vector2(0.36, 0.0), new THREE.Vector2(0.36, -0.2), new THREE.Vector2(0.4, -0.4), // Outer lower horn
    new THREE.Vector2(0.44, -0.6), new THREE.Vector2(0.46, -0.7), new THREE.Vector2(0.5, -0.9), // Waist right
    new THREE.Vector2(0.6, -1.1), new THREE.Vector2(0.7, -1.3), new THREE.Vector2(0.75, -1.5), new THREE.Vector2(0.75, -1.7), // Lower bout right
    new THREE.Vector2(0.7, -1.9), new THREE.Vector2(0.55, -2.1), new THREE.Vector2(0.3, -2.2), // Bottom right
    new THREE.Vector2(0, -2.25), // Bottom center
    new THREE.Vector2(-0.3, -2.2), new THREE.Vector2(-0.55, -2.0), new THREE.Vector2(-0.75, -1.7), // Bottom left
    new THREE.Vector2(-0.85, -1.4), new THREE.Vector2(-0.85, -1.1), // Lower bout left
    new THREE.Vector2(-0.75, -0.8), new THREE.Vector2(-0.65, -0.5), new THREE.Vector2(-0.6, -0.3), // Waist left
    new THREE.Vector2(-0.65, 0.0), new THREE.Vector2(-0.7, 0.2), new THREE.Vector2(-0.7, 0.5), // Upper bout left
    new THREE.Vector2(-0.65, 0.7), new THREE.Vector2(-0.6, 0.9), new THREE.Vector2(-0.55, 1.05), // Upper horn outer
    new THREE.Vector2(-0.45, 1.15), new THREE.Vector2(-0.35, 1.1), new THREE.Vector2(-0.3, 1.0), // Upper horn tip
    new THREE.Vector2(-0.25, 0.85), new THREE.Vector2(-0.18, 0.75), new THREE.Vector2(-0.135, 0.65) // Upper horn inner
  ];
  s.moveTo(pts[0].x, pts[0].y);
  s.splineThru(pts.slice(1));
  s.lineTo(0.135, 0.65);
  return s;
}

function createTeleShape(): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(0, -1.3);
  s.quadraticCurveTo(0.6, -1.35, 1.05, -1.05);
  s.quadraticCurveTo(1.2, -0.8, 1.18, -0.3);
  s.quadraticCurveTo(1.18, 0.15, 1.0, 0.35);
  s.quadraticCurveTo(0.75, 0.52, 0.58, 0.6);
  s.quadraticCurveTo(0.52, 0.78, 0.5, 1.0);
  s.quadraticCurveTo(0.48, 1.12, 0.35, 1.12);
  s.quadraticCurveTo(0.22, 1.08, 0.2, 0.78);
  s.lineTo(0.19, 0.65);
  s.lineTo(-0.19, 0.65);
  s.lineTo(-0.2, 0.78);
  s.quadraticCurveTo(-0.22, 0.95, -0.3, 0.95);
  s.quadraticCurveTo(-0.55, 0.9, -0.7, 0.65);
  s.quadraticCurveTo(-0.85, 0.45, -1.0, 0.35);
  s.quadraticCurveTo(-1.18, 0.15, -1.18, -0.3);
  s.quadraticCurveTo(-1.18, -0.8, -1.05, -1.05);
  s.quadraticCurveTo(-0.6, -1.35, 0, -1.3);
  return s;
}

function createLPShape(): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(0, -1.35);
  s.bezierCurveTo(0.5, -1.42, 0.95, -1.25, 1.12, -0.85);
  s.bezierCurveTo(1.25, -0.5, 1.25, -0.1, 1.15, 0.2);
  s.bezierCurveTo(1.0, 0.5, 0.8, 0.62, 0.6, 0.68);
  s.quadraticCurveTo(0.5, 0.85, 0.48, 1.05);
  s.quadraticCurveTo(0.46, 1.18, 0.34, 1.18);
  s.quadraticCurveTo(0.22, 1.14, 0.2, 0.82);
  s.lineTo(0.19, 0.65);
  s.lineTo(-0.19, 0.65);
  s.lineTo(-0.2, 0.82);
  s.quadraticCurveTo(-0.22, 0.95, -0.32, 0.92);
  s.quadraticCurveTo(-0.55, 0.85, -0.75, 0.6);
  s.bezierCurveTo(-1.0, 0.3, -1.15, 0.1, -1.2, -0.2);
  s.bezierCurveTo(-1.25, -0.55, -1.2, -0.9, -1.05, -1.1);
  s.bezierCurveTo(-0.85, -1.35, -0.5, -1.42, 0, -1.35);
  return s;
}

function createSGShape(): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(0, -1.2);
  s.quadraticCurveTo(0.5, -1.25, 0.9, -1.0);
  s.quadraticCurveTo(1.1, -0.78, 1.1, -0.35);
  s.quadraticCurveTo(1.1, 0.05, 0.9, 0.25);
  s.quadraticCurveTo(0.7, 0.42, 0.55, 0.52);
  s.quadraticCurveTo(0.48, 0.72, 0.46, 1.15);
  s.quadraticCurveTo(0.44, 1.35, 0.34, 1.35);
  s.quadraticCurveTo(0.24, 1.32, 0.2, 1.0);
  s.quadraticCurveTo(0.2, 0.82, 0.19, 0.68);
  s.lineTo(0.19, 0.6);
  s.lineTo(-0.19, 0.6);
  s.lineTo(-0.19, 0.68);
  s.quadraticCurveTo(-0.2, 0.82, -0.2, 1.0);
  s.quadraticCurveTo(-0.24, 1.42, -0.34, 1.45);
  s.quadraticCurveTo(-0.44, 1.42, -0.46, 1.15);
  s.quadraticCurveTo(-0.48, 0.72, -0.55, 0.52);
  s.quadraticCurveTo(-0.7, 0.42, -0.9, 0.25);
  s.quadraticCurveTo(-1.1, 0.05, -1.1, -0.35);
  s.quadraticCurveTo(-1.1, -0.78, -0.9, -1.0);
  s.quadraticCurveTo(-0.5, -1.25, 0, -1.2);
  return s;
}

function createOffsetShape(): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(0, -1.38);
  s.bezierCurveTo(0.55, -1.42, 1.0, -1.2, 1.18, -0.8);
  s.bezierCurveTo(1.3, -0.45, 1.25, -0.05, 1.08, 0.2);
  s.quadraticCurveTo(0.85, 0.38, 0.65, 0.48);
  s.quadraticCurveTo(0.58, 0.65, 0.55, 0.82);
  s.quadraticCurveTo(0.52, 1.05, 0.5, 1.12);
  s.quadraticCurveTo(0.48, 1.2, 0.36, 1.18);
  s.quadraticCurveTo(0.24, 1.14, 0.2, 0.85);
  s.lineTo(0.19, 0.65);
  s.lineTo(-0.19, 0.65);
  s.lineTo(-0.2, 0.85);
  s.quadraticCurveTo(-0.24, 1.2, -0.3, 1.42);
  s.quadraticCurveTo(-0.34, 1.52, -0.44, 1.5);
  s.quadraticCurveTo(-0.55, 1.44, -0.6, 1.1);
  s.quadraticCurveTo(-0.64, 0.85, -0.68, 0.6);
  s.quadraticCurveTo(-0.78, 0.45, -0.95, 0.3);
  s.bezierCurveTo(-1.15, 0.1, -1.25, -0.15, -1.22, -0.5);
  s.bezierCurveTo(-1.2, -0.85, -1.05, -1.15, -0.85, -1.28);
  s.bezierCurveTo(-0.55, -1.42, 0, -1.38, 0, -1.38);
  return s;
}

/* =============================================
   PICKGUARD SHAPES
   ============================================= */

function createPickguardShape(type: GuitarType): THREE.Shape | null {
  const s = new THREE.Shape();
  switch (type) {
    case "stratocaster":
      const pPts = [
        new THREE.Vector2(0.135, 0.6),
        new THREE.Vector2(0.18, 0.5), new THREE.Vector2(0.25, 0.4), new THREE.Vector2(0.32, 0.3), // Lower horn inner
        new THREE.Vector2(0.32, 0.2), new THREE.Vector2(0.3, 0.1), // Inside tip
        new THREE.Vector2(0.35, -0.1), new THREE.Vector2(0.4, -0.4), new THREE.Vector2(0.45, -0.7), // Waist right
        new THREE.Vector2(0.55, -1.0), new THREE.Vector2(0.6, -1.3), new THREE.Vector2(0.55, -1.6), // Controls right
        new THREE.Vector2(0.4, -1.8), new THREE.Vector2(0.2, -1.9), new THREE.Vector2(0, -1.9), // Bottom under controls
        new THREE.Vector2(-0.2, -1.8), new THREE.Vector2(-0.35, -1.5), new THREE.Vector2(-0.4, -1.0), // Curve up around bridge
        new THREE.Vector2(-0.4, -0.5), new THREE.Vector2(-0.45, -0.2), new THREE.Vector2(-0.5, 0.0), // Waist left
        new THREE.Vector2(-0.55, 0.3), new THREE.Vector2(-0.5, 0.6), new THREE.Vector2(-0.4, 0.8), // Upper bout
        new THREE.Vector2(-0.35, 0.85), new THREE.Vector2(-0.25, 0.75), new THREE.Vector2(-0.135, 0.6) // Upper horn to neck
      ];
      s.moveTo(pPts[0].x, pPts[0].y);
      s.splineThru(pPts.slice(1));
      s.lineTo(0.135, 0.6);
      return s;
    case "telecaster":
      s.moveTo(-0.18, 0.65);
      s.lineTo(-0.2, 0.78);
      s.quadraticCurveTo(-0.22, 0.9, -0.3, 0.9);
      s.quadraticCurveTo(-0.5, 0.85, -0.65, 0.6);
      s.quadraticCurveTo(-0.8, 0.4, -0.95, 0.3);
      s.quadraticCurveTo(-1.1, 0.1, -1.1, -0.2);
      s.lineTo(-1.0, -0.55);
      s.lineTo(0.35, -0.55);
      s.lineTo(0.4, 0.1);
      s.lineTo(0.19, 0.65);
      s.lineTo(-0.18, 0.65);
      return s;
    case "offset":
      s.moveTo(-0.18, 0.65);
      s.lineTo(-0.6, 0.55);
      s.quadraticCurveTo(-0.75, 0.42, -0.9, 0.28);
      s.quadraticCurveTo(-1.1, 0.08, -1.12, -0.2);
      s.lineTo(-1.0, -0.6);
      s.lineTo(0.3, -0.6);
      s.lineTo(0.4, 0.0);
      s.lineTo(0.5, 0.55);
      s.quadraticCurveTo(0.48, 0.65, 0.19, 0.65);
      s.lineTo(-0.18, 0.65);
      return s;
    case "lespaul":
      s.moveTo(-0.38, 0.5);
      s.quadraticCurveTo(-0.6, 0.35, -0.7, 0.15);
      s.lineTo(-0.65, -0.35);
      s.lineTo(-0.15, -0.35);
      s.lineTo(-0.15, 0.5);
      s.lineTo(-0.38, 0.5);
      return s;
    case "sg":
      s.moveTo(-0.15, 0.6);
      s.lineTo(-0.45, 0.5);
      s.quadraticCurveTo(-0.6, 0.35, -0.6, 0.1);
      s.lineTo(-0.55, -0.2);
      s.lineTo(-0.1, -0.2);
      s.lineTo(-0.1, 0.6);
      s.lineTo(-0.15, 0.6);
      return s;
  }
}

/* =============================================
   EXTRUDED BODY COMPONENT
   ============================================= */

function GuitarBody({ type, color }: { type: GuitarType; color: string }) {
  const geometry = useMemo(() => {
    let shape: THREE.Shape;
    let depth = 0.18;
    let bevelT = 0.04;

    switch (type) {
      case "stratocaster": shape = createStratShape(); depth = 0.19; bevelT = 0.04; break;
      case "telecaster": shape = createTeleShape(); depth = 0.19; bevelT = 0.035; break;
      case "lespaul": shape = createLPShape(); depth = 0.32; bevelT = 0.045; break;
      case "sg": shape = createSGShape(); depth = 0.14; bevelT = 0.035; break;
      case "offset": shape = createOffsetShape(); depth = 0.19; bevelT = 0.04; break;
    }

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelThickness: bevelT,
      bevelSize: bevelT,
      bevelSegments: 10,
      curveSegments: 48,
    });
    
    // Center only on Z-axis so the Pickguard and Hardware sit properly on the surface
    geo.computeBoundingBox();
    if (geo.boundingBox) {
      const zOffset = -(geo.boundingBox.max.z + geo.boundingBox.min.z) / 2;
      geo.translate(0, 0, zOffset);
    }
    
    return geo;
  }, [type]);

  // Translucent resin/glass effect
  return (
    <mesh geometry={geometry}>
      <meshPhysicalMaterial
        color={color}
        transmission={0.32}
        thickness={1.8}
        roughness={0.06}
        metalness={0.0}
        clearcoat={1}
        clearcoatRoughness={0.02}
        ior={1.45}
        envMapIntensity={1.4}
        attenuationColor={color}
        attenuationDistance={0.6}
        transparent={true}
        opacity={0.92}
        specularIntensity={0.8}
        specularColor="#ffffff"
      />
    </mesh>
  );
}

/* =============================================
   PICKGUARD COMPONENT
   ============================================= */

function GuitarPickguard({ type, color }: { type: GuitarType; color: string }) {
  const geometry = useMemo(() => {
    const shape = createPickguardShape(type);
    if (!shape) return null;
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.015,
      bevelEnabled: true,
      bevelThickness: 0.005,
      bevelSize: 0.005,
      bevelSegments: 2,
      curveSegments: 20,
    });
    return geo;
  }, [type]);

  if (!geometry) return null;
  const zOff = type === "lespaul" ? 0.19 : type === "sg" ? 0.1 : 0.13;

  return (
    <group position={[0, 0, zOff]}>
      {/* Main pickguard body */}
      <mesh geometry={geometry}>
        <meshStandardMaterial color={type === "stratocaster" && color === "#000000" ? "#151515" : color} roughness={0.3} metalness={0.01} />
      </mesh>
      {/* 3-Ply White edge simulation for black strat pickguards */}
      {type === "stratocaster" && color === "#000000" && (
        <mesh geometry={geometry} position={[0, 0, -0.005]} scale={[1.02, 1.02, 1]}>
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      )}
    </group>
  );
}

/* =============================================
   NECK, HEADSTOCK & FRETBOARD
   ============================================= */

function NeckAssembly({ config, guitarType }: { config: ConfigState; guitarType: GuitarType }) {
  const neckColor = config.neckMaterial;
  const hwColor = config.hardwareColor;
  const is3plus3 = guitarType === "lespaul" || guitarType === "sg";
  const headstockColor = is3plus3 ? "#2a1500" : neckColor;

  const fretboardColor = useMemo(() => {
    if (neckColor === "#e6c280") return "#c49a5c";
    if (neckColor === "#382116") return "#2a180f";
    return "#120a04";
  }, [neckColor]);

  // Exact math based on Scale Length = 3.2
  // Neck pocket is at local y=0 (which is global y=0.65). This is the 16th fret.
  // Nut is at local y = 1.93
  // 21st fret is at local y = -0.32
  const nutY = 1.93;
  const heelY = -0.32;

  const neckGeo = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-0.135, heelY); 
    s.lineTo(-0.105, nutY);
    s.quadraticCurveTo(0, nutY + 0.02, 0.105, nutY);
    s.lineTo(0.135, heelY);
    s.quadraticCurveTo(0, heelY - 0.05, -0.135, heelY);
    return new THREE.ExtrudeGeometry(s, {
      depth: 0.11, bevelEnabled: true, bevelThickness: 0.03,
      bevelSize: 0.02, bevelSegments: 4, curveSegments: 12,
    });
  }, []);

  const fretboardGeo = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-0.135, heelY); 
    s.lineTo(-0.105, nutY);
    s.lineTo(0.105, nutY); 
    s.lineTo(0.135, heelY);
    return new THREE.ExtrudeGeometry(s, {
      depth: 0.02, bevelEnabled: false, curveSegments: 8,
    });
  }, []);

  const headGeo = useMemo(() => {
    const s = new THREE.Shape();
    if (is3plus3) {
      s.moveTo(-0.105, nutY); s.lineTo(-0.2, nutY + 0.5);
      s.quadraticCurveTo(-0.22, nutY + 0.7, -0.15, nutY + 0.75);
      s.lineTo(0.15, nutY + 0.75);
      s.quadraticCurveTo(0.22, nutY + 0.7, 0.2, nutY + 0.5);
      s.lineTo(0.105, nutY);
    } else if (guitarType === "stratocaster") {
      // PERFECTION: Large 70s CBS Headstock exactly matched
      s.moveTo(-0.105, nutY);
      s.lineTo(-0.11, nutY + 0.15); // Left straight
      s.lineTo(-0.11, nutY + 0.55); // Tuners edge
      s.bezierCurveTo(-0.11, nutY + 0.75, 0.05, nutY + 0.85, 0.12, nutY + 0.75); // Top round
      s.bezierCurveTo(0.35, nutY + 0.65, 0.45, nutY + 0.45, 0.15, nutY + 0.25); // Bulbous right CBS curve
      s.quadraticCurveTo(0.08, nutY + 0.15, 0.105, nutY); // Swoop down to nut
    } else {
      // Standard Tele/Offset Headstock
      s.moveTo(-0.105, nutY); 
      s.lineTo(-0.12, nutY + 0.6);
      s.quadraticCurveTo(-0.15, nutY + 0.7, -0.05, nutY + 0.75);
      s.lineTo(0.1, nutY + 0.75);
      s.quadraticCurveTo(0.15, nutY + 0.65, 0.105, nutY);
    }
    return new THREE.ExtrudeGeometry(s, {
      depth: 0.1, bevelEnabled: true, bevelThickness: 0.015,
      bevelSize: 0.015, bevelSegments: 3, curveSegments: 24,
    });
  }, [is3plus3, guitarType]);

  // Fret positions (correct distances from the nut down towards the body)
  const frets = useMemo(() => {
    const scale = 3.2;
    const positions: number[] = [];
    for (let i = 1; i <= 21; i++) {
      // Distance from nut
      const distFromNut = scale * (1 - 1 / Math.pow(2, i / 12));
      // Local y coordinate (nut is at nutY, body is downwards)
      positions.push(nutY - distFromNut);
    }
    return positions;
  }, []);

  const dotFrets = [3, 5, 7, 9, 12, 15, 17, 19, 21];
  const dotColor = neckColor === "#e6c280" ? "#111111" : "#eeeeee"; // Black dots on maple

  return (
    <group position={[0, 0.65, 0]}>
      {/* Neck shaft */}
      <mesh geometry={neckGeo} position={[0, 0, -0.1]}>
        <meshStandardMaterial color={neckColor} roughness={0.5} />
      </mesh>

      {/* Fretboard */}
      <mesh geometry={fretboardGeo} position={[0, 0, 0.03]}>
        <meshStandardMaterial color={fretboardColor} roughness={0.7} />
      </mesh>

      {/* Fret wires */}
      {frets.map((y, i) => {
        // Interpolate width between nut (0.105) and heel (0.135)
        const t = (nutY - y) / (nutY - heelY);
        const w = 0.105 + t * (0.135 - 0.105);
        return (
          <mesh key={i} position={[0, y, 0.05]}>
            <boxGeometry args={[w * 2, 0.008, 0.015]} />
            <meshStandardMaterial color={hwColor} metalness={0.9} roughness={0.1} />
          </mesh>
        );
      })}

      {/* Fret dots */}
      {dotFrets.map((fretNum) => {
        if (fretNum > frets.length) return null;
        const y1 = fretNum === 1 ? nutY : frets[fretNum - 2];
        const y2 = frets[fretNum - 1];
        const midY = (y1 + y2) / 2;
        const isDouble = fretNum === 12;
        return isDouble ? (
          <group key={fretNum}>
            <Cylinder args={[0.015, 0.015, 0.004]} position={[-0.04, midY, 0.053]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color={dotColor} roughness={0.8} />
            </Cylinder>
            <Cylinder args={[0.015, 0.015, 0.004]} position={[0.04, midY, 0.053]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color={dotColor} roughness={0.8} />
            </Cylinder>
          </group>
        ) : (
          <Cylinder key={fretNum} args={[0.02, 0.02, 0.004]} position={[0, midY, 0.053]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color={dotColor} roughness={0.8} />
          </Cylinder>
        );
      })}

      {/* Nut */}
      <mesh position={[0, nutY, 0.04]}>
        <boxGeometry args={[0.22, 0.03, 0.03]} />
        <meshStandardMaterial color="#f5ecd8" roughness={0.4} />
      </mesh>

      {/* Headstock */}
      <mesh geometry={headGeo} position={[0, 0, -0.05]}>
        <meshPhysicalMaterial color={headstockColor} clearcoat={0.6} roughness={0.35} />
      </mesh>

      {/* Truss rod hole (black plastic insert) for Strat */}
      {guitarType === "stratocaster" && (
        <mesh position={[0, nutY + 0.04, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.08]} />
          <meshStandardMaterial color="#111" />
        </mesh>
      )}

      {/* String Trees for Strat */}
      {guitarType === "stratocaster" && (
        <group>
          <Cylinder args={[0.012, 0.012, 0.02]} position={[0.03, nutY + 0.35, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color={hwColor} metalness={0.9} />
          </Cylinder>
          <Cylinder args={[0.012, 0.012, 0.02]} position={[0.06, nutY + 0.45, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color={hwColor} metalness={0.9} />
          </Cylinder>
        </group>
      )}

      {/* Tuning machines */}
      {is3plus3 ? (
        <>
          {[0.2, 0.4, 0.6].map((y, i) => (
            <group key={`t${i}`}>
              <Cylinder args={[0.025, 0.02, 0.2]} position={[-0.2, nutY + y, -0.02]} rotation={[0, 0, Math.PI / 2]}>
                <meshStandardMaterial color={hwColor} metalness={0.9} roughness={0.1} />
              </Cylinder>
              <Cylinder args={[0.04, 0.04, 0.03]} position={[-0.3, nutY + y, -0.02]} rotation={[0, 0, Math.PI / 2]}>
                <meshStandardMaterial color={hwColor} metalness={0.85} roughness={0.15} />
              </Cylinder>
              <Cylinder args={[0.025, 0.02, 0.2]} position={[0.2, nutY + y, -0.02]} rotation={[0, 0, Math.PI / 2]}>
                <meshStandardMaterial color={hwColor} metalness={0.9} roughness={0.1} />
              </Cylinder>
              <Cylinder args={[0.04, 0.04, 0.03]} position={[0.3, nutY + y, -0.02]} rotation={[0, 0, Math.PI / 2]}>
                <meshStandardMaterial color={hwColor} metalness={0.85} roughness={0.15} />
              </Cylinder>
            </group>
          ))}
        </>
      ) : (
        <>
          {[0.15, 0.28, 0.41, 0.54, 0.67, 0.8].map((y, i) => (
            <group key={`t${i}`}>
              <Cylinder args={[0.025, 0.02, 0.15]} position={[-0.15, nutY + y, -0.02]} rotation={[0, 0, Math.PI / 2]}>
                <meshStandardMaterial color={hwColor} metalness={0.9} roughness={0.1} />
              </Cylinder>
              <Cylinder args={[0.035, 0.035, 0.03]} position={[-0.25, nutY + y, -0.02]} rotation={[0, 0, Math.PI / 2]}>
                <meshStandardMaterial color={hwColor} metalness={0.85} roughness={0.15} />
              </Cylinder>
            </group>
          ))}
        </>
      )}

      {/* Strings */}
      {[-0.1, -0.06, -0.02, 0.02, 0.06, 0.1].map((x, i) => {
        // Stratocaster bridge is further back
        const isStrat = guitarType === "stratocaster";
        const bridgeY = isStrat ? -1.9 : -1.37; // local Y
        const stringLen = nutY - bridgeY;
        const stringY = (nutY + bridgeY) / 2;
        return (
          <Cylinder key={`s${i}`} args={[0.004 + i * 0.001, 0.004 + i * 0.001, stringLen]} position={[x, stringY, 0.06]}>
            <meshStandardMaterial color="#d0d0d0" metalness={0.95} roughness={0.05} />
          </Cylinder>
        );
      })}
    </group>
  );
}

/* =============================================
   PICKUPS
   ============================================= */

function Pickups({ config, guitarType }: { config: ConfigState; guitarType: GuitarType }) {
  const z = guitarType === "lespaul" ? 0.2 : guitarType === "sg" ? 0.1 : 0.13;
  const pColor = config.pickupsColor;
  const hwColor = config.hardwareColor;
  const effectiveConfig = (guitarType === "lespaul" || guitarType === "sg") ? "HH" : config.pickupConfig;

  const singleCoil = (y: number, rot = 0) => (
    <group position={[-0.03, y, z + 0.01]} rotation={[0, 0, rot]}>
      <mesh>
        <boxGeometry args={[0.65, 0.13, 0.06]} />
        <meshStandardMaterial color={pColor} roughness={0.35} />
      </mesh>
      {[-0.22, -0.13, -0.04, 0.05, 0.14, 0.23].map((x, i) => (
        <Cylinder key={i} args={[0.015, 0.015, 0.03]} position={[x, 0, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color={hwColor} metalness={0.9} roughness={0.1} />
        </Cylinder>
      ))}
    </group>
  );

  const humbucker = (y: number) => (
    <group position={[-0.03, y, z + 0.01]}>
      <mesh>
        <boxGeometry args={[0.7, 0.28, 0.08]} />
        <meshPhysicalMaterial color={hwColor} metalness={0.7} roughness={0.2} clearcoat={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <boxGeometry args={[0.62, 0.22, 0.04]} />
        <meshStandardMaterial color={pColor} roughness={0.3} />
      </mesh>
      {[-0.2, -0.12, -0.04, 0.04, 0.12, 0.2].map((x, i) => (
        <group key={i}>
          <Cylinder args={[0.013, 0.013, 0.025]} position={[x, -0.05, 0.045]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color={hwColor} metalness={0.9} roughness={0.1} />
          </Cylinder>
          <Cylinder args={[0.013, 0.013, 0.025]} position={[x, 0.05, 0.045]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color={hwColor} metalness={0.9} roughness={0.1} />
          </Cylinder>
        </group>
      ))}
    </group>
  );

  return (
    <group>
      {effectiveConfig === "SSS" && guitarType === "stratocaster" && <>{singleCoil(0.1, 0.06)}{singleCoil(-0.35, 0.06)}{singleCoil(-0.8, 0.1)}</>}
      {effectiveConfig === "SSS" && guitarType !== "stratocaster" && <>{singleCoil(0.35, 0.06)}{singleCoil(-0.02, 0.06)}{singleCoil(-0.38, 0.1)}</>}
      {effectiveConfig === "HSS" && guitarType === "stratocaster" && <>{humbucker(0.1)}{singleCoil(-0.35, 0.06)}{singleCoil(-0.8, 0.1)}</>}
      {effectiveConfig === "HSS" && guitarType !== "stratocaster" && <>{humbucker(0.38)}{singleCoil(-0.05, 0.06)}{singleCoil(-0.38, 0.1)}</>}
      {effectiveConfig === "HH" && guitarType === "stratocaster" && <>{humbucker(0.1)}{humbucker(-0.8)}</>}
      {effectiveConfig === "HH" && guitarType !== "stratocaster" && <>{humbucker(0.3)}{humbucker(-0.25)}</>}
    </group>
  );
}

/* =============================================
   BRIDGE & HARDWARE
   ============================================= */

function Bridge({ config, guitarType }: { config: ConfigState; guitarType: GuitarType }) {
  const z = guitarType === "lespaul" ? 0.2 : guitarType === "sg" ? 0.1 : 0.13;
  const hw = config.hardwareColor;
  const isGibson = guitarType === "lespaul" || guitarType === "sg";

  return (
    <group>
      {isGibson ? (
        <>
          {/* Tune-o-matic */}
          <mesh position={[0, -0.6, z]}>
            <boxGeometry args={[0.8, 0.12, 0.07]} />
            <meshStandardMaterial color={hw} metalness={0.9} roughness={0.1} />
          </mesh>
          {[-0.26, -0.16, -0.05, 0.05, 0.16, 0.26].map((x, i) => (
            <mesh key={i} position={[x, -0.6, z + 0.04]}>
              <boxGeometry args={[0.04, 0.06, 0.04]} />
              <meshStandardMaterial color={hw} metalness={0.9} roughness={0.08} />
            </mesh>
          ))}
          {/* Stop tailpiece */}
          <mesh position={[0, -0.82, z]}>
            <boxGeometry args={[0.65, 0.1, 0.06]} />
            <meshStandardMaterial color={hw} metalness={0.9} roughness={0.1} />
          </mesh>
        </>
      ) : guitarType === "stratocaster" ? (
        <>
          {/* Fender-style bridge for stratocaster */}
          <mesh position={[-0.03, -1.25, z]}>
            <boxGeometry args={[0.75, 0.3, 0.08]} />
            <meshStandardMaterial color={hw} metalness={0.85} roughness={0.12} />
          </mesh>
          {[-0.22, -0.13, -0.04, 0.06, 0.15, 0.24].map((x, i) => (
            <mesh key={i} position={[x - 0.03, -1.25, z + 0.05]}>
              <boxGeometry args={[0.045, 0.1, 0.04]} />
              <meshStandardMaterial color={hw} metalness={0.9} roughness={0.08} />
            </mesh>
          ))}
          {config.bridgeType === "tremolo" && (
            <Cylinder args={[0.015, 0.012, 0.9]} position={[0.35, -1.35, z + 0.06]} rotation={[-Math.PI / 5, 0, Math.PI / 10]}>
              <meshStandardMaterial color={hw} metalness={0.85} roughness={0.12} />
            </Cylinder>
          )}
        </>
      ) : (
        <>
          {/* Fender-style bridge for others */}
          <mesh position={[-0.03, -0.72, z]}>
            <boxGeometry args={[0.75, 0.3, 0.08]} />
            <meshStandardMaterial color={hw} metalness={0.85} roughness={0.12} />
          </mesh>
          {[-0.22, -0.13, -0.04, 0.06, 0.15, 0.24].map((x, i) => (
            <mesh key={i} position={[x - 0.03, -0.72, z + 0.05]}>
              <boxGeometry args={[0.045, 0.1, 0.04]} />
              <meshStandardMaterial color={hw} metalness={0.9} roughness={0.08} />
            </mesh>
          ))}
          {config.bridgeType === "tremolo" && (
            <Cylinder args={[0.015, 0.012, 0.9]} position={[0.35, -0.85, z + 0.06]} rotation={[-Math.PI / 5, 0, Math.PI / 10]}>
              <meshStandardMaterial color={hw} metalness={0.85} roughness={0.12} />
            </Cylinder>
          )}
        </>
      )}
    </group>
  );
}

function Controls({ guitarType, config }: { guitarType: GuitarType; config: ConfigState }) {
  const z = guitarType === "lespaul" ? 0.22 : guitarType === "sg" ? 0.11 : 0.14;
  const knobColor = config.pickupsColor === "#111111" ? "#111111" : "#f0f0f0";
  const hwColor = config.hardwareColor;

  const knob = (x: number, y: number) => (
    <group position={[x, y, z]}>
      {/* Skirt */}
      <Cylinder args={[0.09, 0.11, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color={knobColor} roughness={0.25} />
      </Cylinder>
      {/* Top cylinder */}
      <Cylinder args={[0.06, 0.07, 0.06]} position={[0, 0, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color={knobColor} roughness={0.5} />
      </Cylinder>
      {/* White dot/number indicator */}
      <mesh position={[0, 0.08, 0.02]}>
        <boxGeometry args={[0.015, 0.015, 0.015]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );

  const stratControls = () => (
    <group>
      {/* 3 Knobs */}
      {knob(0.48, -0.65)}
      {knob(0.58, -0.85)}
      {knob(0.64, -1.05)}
      
      {/* 5-way Switch */}
      <group position={[0.35, -0.75, z]} rotation={[0, 0, -Math.PI / 6]}>
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[0.02, 0.18, 0.01]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        {/* Switch Lever */}
        <Cylinder args={[0.008, 0.008, 0.06]} position={[0, 0.04, 0.03]} rotation={[Math.PI / 2, -Math.PI / 8, 0]}>
          <meshStandardMaterial color={hwColor} metalness={0.9} roughness={0.2} />
        </Cylinder>
        {/* Switch Tip */}
        <mesh position={[0, 0.06, 0.06]} rotation={[Math.PI / 2, -Math.PI / 8, 0]}>
          <cylinderGeometry args={[0.018, 0.02, 0.04]} />
          <meshStandardMaterial color={knobColor} roughness={0.4} />
        </mesh>
      </group>

      {/* Recessed Jack Plate */}
      <group position={[0.65, -1.35, 0.08]} rotation={[-Math.PI / 6, Math.PI / 5, Math.PI / 8]}>
        <mesh>
          <cylinderGeometry args={[0.15, 0.15, 0.02, 32, 1, false, 0, Math.PI * 2]} />
          <meshStandardMaterial color={hwColor} metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Recessed hole */}
        <mesh position={[0, 0.01, 0]}>
          <cylinderGeometry args={[0.1, 0.12, 0.02, 32]} />
          <meshStandardMaterial color="#111" roughness={0.8} />
        </mesh>
        {/* Jack nut */}
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.01, 6]} />
          <meshStandardMaterial color={hwColor} metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );

  switch (guitarType) {
    case "stratocaster":
      return stratControls();
    case "telecaster":
      return <group>{knob(0.5, -0.65)}{knob(0.55, -0.9)}</group>;
    case "lespaul":
    case "sg":
      return <group>{knob(-0.42, -0.45)}{knob(0.42, -0.45)}{knob(-0.42, -0.78)}{knob(0.42, -0.78)}</group>;
    case "offset":
      return <group>{knob(0.48, -0.78)}{knob(0.52, -1.0)}</group>;
  }
}

/* =============================================
   MAIN MODEL
   ============================================= */

export function GuitarModel({ config, guitarType }: GuitarModelProps) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.15 - 0.35;
    }
  });

  return (
    <group ref={group} dispose={null} position={[0, -1.5, 0]}>
      <GuitarBody type={guitarType} color={config.bodyColor} />
      <GuitarPickguard type={guitarType} color={config.pickguardColor} />
      <NeckAssembly config={config} guitarType={guitarType} />
      <Pickups config={config} guitarType={guitarType} />
      <Bridge config={config} guitarType={guitarType} />
      <Controls guitarType={guitarType} config={config} />
    </group>
  );
}
