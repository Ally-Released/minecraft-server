"use client";

import { useEffect, useRef, useState } from "react";
import {
  SkinViewer,
  FunctionAnimation,
  IdleAnimation,
  WalkingAnimation,
} from "skinview3d";

export type EmoteType = "champion" | "combat" | "wave" | "swagger" | "walk" | "idle";

interface SkinViewer3DProps {
  username: string;
  uuid?: string;
  skinUrl?: string;
  width?: number;
  height?: number;
  emote?: EmoteType;
  enableControls?: boolean;
  className?: string;
}

export function SkinViewer3D({
  username,
  uuid,
  skinUrl,
  width = 240,
  height = 300,
  emote = "idle",
  enableControls = true,
  className = "",
}: SkinViewer3DProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const viewerRef = useRef<SkinViewer | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    let viewer: SkinViewer;

    // Resolve skin endpoint (passes custom skin_url if present from Supabase/Cracked sync)
    const targetSkin = skinUrl
      ? `/api/skin/${encodeURIComponent(username || "Player")}?url=${encodeURIComponent(skinUrl)}`
      : `/api/skin/${encodeURIComponent(username || uuid || "Player")}`;

    try {
      viewer = new SkinViewer({
        canvas: canvasRef.current,
        width,
        height,
        skin: targetSkin,
      });

      viewerRef.current = viewer;

      // Adjust camera and default hero angle
      viewer.camera.position.z = 70;
      viewer.camera.position.y = 10;
      viewer.playerObject.rotation.y = -0.3; // Heroic 3/4 angle
      viewer.zoom = 0.95;

      // Enable orbit controls
      viewer.controls.enableRotate = enableControls;
      viewer.controls.enableZoom = false;
      viewer.controls.enablePan = false;

      // Setup the requested emote animation
      applyEmote(viewer, emote);

      setLoaded(true);
    } catch (err) {
      console.error("Failed to initialize skin viewer:", err);
    }

    return () => {
      if (viewerRef.current) {
        viewerRef.current.dispose();
        viewerRef.current = null;
      }
    };
  }, [username, uuid, skinUrl, width, height, emote, enableControls]);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        className="cursor-grab active:cursor-grabbing drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] transition-opacity duration-300"
        style={{ opacity: loaded ? 1 : 0 }}
      />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-electric border-t-transparent animate-spin" />
        </div>
      )}
    </div>
  );
}

function applyEmote(viewer: SkinViewer, emote: EmoteType) {
  switch (emote) {
    case "champion":
      // Both arms raised high in victory, breathing chest, proud head movement
      viewer.animation = new FunctionAnimation((player, progress) => {
        const t = progress * 3;
        player.skin.leftArm.rotation.x = Math.PI - 0.25 + Math.sin(t) * 0.08;
        player.skin.leftArm.rotation.z = 0.45 + Math.cos(t) * 0.05;
        player.skin.rightArm.rotation.x = Math.PI - 0.25 + Math.sin(t) * 0.08;
        player.skin.rightArm.rotation.z = -0.45 - Math.cos(t) * 0.05;
        player.skin.head.rotation.y = Math.sin(t * 0.4) * 0.15;
        player.skin.head.rotation.x = -0.12 + Math.cos(t * 0.4) * 0.06;
        player.position.y = Math.sin(t) * 0.4;
      });
      break;

    case "combat":
      // Combat fighting guard stance, one fist ready, head locked, fighting bob
      viewer.animation = new FunctionAnimation((player, progress) => {
        const t = progress * 3.5;
        player.skin.body.rotation.y = -0.25;
        player.skin.head.rotation.y = 0.25 + Math.sin(t * 0.3) * 0.08;
        player.skin.leftArm.rotation.x = -1.15 + Math.sin(t) * 0.07;
        player.skin.leftArm.rotation.z = 0.35;
        player.skin.rightArm.rotation.x = -0.65 + Math.cos(t) * 0.09;
        player.skin.rightArm.rotation.z = -0.28;
        player.skin.leftLeg.rotation.x = -0.15;
        player.skin.rightLeg.rotation.x = 0.15;
        player.position.y = Math.sin(t) * 0.35;
      });
      break;

    case "wave":
      // Friendly waving arm high, head tilt
      viewer.animation = new FunctionAnimation((player, progress) => {
        const t = progress * 4;
        player.skin.rightArm.rotation.x = Math.PI - 0.2;
        player.skin.rightArm.rotation.z = -0.4 + Math.sin(t * 2) * 0.35;
        player.skin.leftArm.rotation.z = 0.12 + Math.sin(t * 0.5) * 0.04;
        player.skin.leftArm.rotation.x = Math.cos(t * 0.5) * 0.05;
        player.skin.head.rotation.z = Math.sin(t * 0.5) * 0.08;
        player.skin.head.rotation.y = Math.sin(t * 0.3) * 0.18;
      });
      break;

    case "swagger":
      // Hip sway, cocky arm rest, looking sideways
      viewer.animation = new FunctionAnimation((player, progress) => {
        const t = progress * 2.5;
        player.skin.head.rotation.y = -0.35 + Math.sin(t * 0.4) * 0.1;
        player.skin.head.rotation.x = 0.15;
        player.skin.leftArm.rotation.x = -0.25;
        player.skin.leftArm.rotation.z = 0.4;
        player.skin.rightArm.rotation.x = -1.35 + Math.sin(t) * 0.06;
        player.skin.rightArm.rotation.z = -0.6;
        player.position.y = Math.sin(t) * 0.25;
      });
      break;

    case "walk":
      viewer.animation = new WalkingAnimation();
      break;

    case "idle":
    default:
      viewer.animation = new IdleAnimation();
      break;
  }
}
