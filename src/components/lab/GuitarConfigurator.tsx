"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { GuitarModel } from "./GuitarModel";
import { ConfigControls, ConfigState } from "./ConfigControls";
import { GuitarSelector, GuitarType } from "./GuitarSelector";

export function GuitarConfigurator() {
  const [guitarType, setGuitarType] = useState<GuitarType>("stratocaster");

  const [config, setConfig] = useState<ConfigState>({
    bodyColor: "#111111", // Black
    pickguardColor: "#111111", // Black
    pickupsColor: "#111111", // Black
    neckMaterial: "#e6c280", // Maple
    hardwareColor: "#dddddd", // Chrome
    pickupConfig: "SSS",
    bridgeType: "tremolo",
  });

  // When switching guitar type, adjust defaults
  const handleGuitarTypeChange = (type: GuitarType) => {
    setGuitarType(type);

    // Auto-adjust pickup config for LP/SG
    if (type === "lespaul" || type === "sg") {
      setConfig((prev) => ({ ...prev, pickupConfig: "HH" as const }));
    }

    // Set sensible defaults per guitar type
    switch (type) {
      case "stratocaster":
        setConfig((prev) => ({
          ...prev,
          bodyColor: "#111111",
          pickguardColor: "#111111",
          pickupsColor: "#111111",
          hardwareColor: "#dddddd",
          neckMaterial: "#e6c280",
          bridgeType: "tremolo" as const,
          pickupConfig: "SSS" as const,
        }));
        break;
      case "telecaster":
        setConfig((prev) => ({
          ...prev,
          bodyColor: "#8FBFAA",
          pickguardColor: "#ffffff",
          bridgeType: "fixed" as const,
          pickupConfig: "SSS" as const,
        }));
        break;
      case "lespaul":
        setConfig((prev) => ({
          ...prev,
          bodyColor: "#C8922A",
          pickguardColor: "#2a1500",
          hardwareColor: "#d4af37",
          bridgeType: "fixed" as const,
          pickupConfig: "HH" as const,
        }));
        break;
      case "sg":
        setConfig((prev) => ({
          ...prev,
          bodyColor: "#8B1A1A",
          pickguardColor: "#111111",
          hardwareColor: "#dddddd",
          bridgeType: "fixed" as const,
          pickupConfig: "HH" as const,
        }));
        break;
      case "offset":
        setConfig((prev) => ({
          ...prev,
          bodyColor: "#F2C4C4",
          pickguardColor: "#ffffff",
          bridgeType: "tremolo" as const,
          pickupConfig: "SSS" as const,
        }));
        break;
    }
  };

  return (
    <div className="lab-configurator flex flex-col w-full h-[calc(100vh-64px)]" style={{ background: "var(--lab-bg)" }}>
      {/* ===== TOP: Guitar Model Selector ===== */}
      <GuitarSelector selected={guitarType} onSelect={handleGuitarTypeChange} />

      {/* ===== BOTTOM: Config Panel + 3D Canvas ===== */}
      <div className="flex flex-1 flex-col-reverse lg:flex-row overflow-hidden">
        {/* Left: Config Controls */}
        <div
          className="w-full lg:w-[380px] xl:w-[420px] flex-shrink-0 overflow-y-auto lab-scrollbar"
          style={{
            borderRight: "1px solid var(--lab-border)",
          }}
        >
          <ConfigControls config={config} setConfig={setConfig} guitarType={guitarType} />
        </div>

        {/* Right: 3D Canvas */}
        <div className="flex-1 relative cursor-grab active:cursor-grabbing min-h-[300px] lg:min-h-0">
          <Canvas camera={{ position: [0, 0.5, 8], fov: 42 }} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}>
            <color attach="background" args={["#1a1a1f"]} />
            <ambientLight intensity={0.5} />
            {/* Main key light */}
            <spotLight
              position={[8, 10, 8]}
              angle={0.2}
              penumbra={1}
              intensity={1.5}
              castShadow
              shadow-mapSize={[1024, 1024]}
            />
            {/* Cool fill light */}
            <spotLight
              position={[-6, 6, -4]}
              angle={0.3}
              penumbra={1}
              intensity={0.8}
              color="#8fb8e0"
            />
            {/* Backlight for translucent glow */}
            <spotLight
              position={[0, 2, -6]}
              angle={0.5}
              penumbra={1}
              intensity={1.8}
              color="#ffffff"
            />
            {/* Bottom rim light */}
            <pointLight position={[0, -5, 5]} intensity={0.4} color="#fff5e0" />
            {/* Side rim lights */}
            <pointLight position={[5, 0, 2]} intensity={0.3} color="#e0d0ff" />
            <pointLight position={[-5, 0, 2]} intensity={0.3} color="#ffe0d0" />

            <GuitarModel config={config} guitarType={guitarType} />

            <Environment preset="studio" />
            <ContactShadows
              position={[0, -3.5, 0]}
              opacity={0.4}
              scale={12}
              blur={3}
              far={5}
              color="#000"
            />
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              minDistance={4}
              maxDistance={14}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 1.4}
            />
          </Canvas>

          {/* Vignette overlay */}
          <div className="canvas-vignette absolute inset-0 pointer-events-none" />

          {/* Lab badge */}
          <div className="absolute top-4 left-4 pointer-events-none">
            <div
              className="inline-flex items-center rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{
                background: "rgba(26, 26, 30, 0.7)",
                backdropFilter: "blur(8px)",
                border: "1px solid var(--lab-border)",
                color: "var(--lab-text-muted)",
              }}
            >
              <span
                className="flex h-1.5 w-1.5 rounded-full mr-2 animate-pulse"
                style={{ background: "#4ade80" }}
              />
              Live 3D
            </div>
          </div>

          {/* Guitar type label */}
          <div className="absolute bottom-4 left-4 pointer-events-none">
            <h2
              className="text-2xl md:text-3xl font-black tracking-tight uppercase"
              style={{ color: "var(--lab-text)", opacity: 0.15 }}
            >
              {guitarType === "lespaul" ? "Les Paul" : guitarType}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
