import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX, ArrowRight, Play, RotateCcw } from 'lucide-react';
import { cinematicFlaconImg } from '../assets/images';

interface CinematicIntroProps {
  onComplete: () => void;
  isOpen?: boolean;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  maxOpacity: number;
  decay: number;
  shimmerSpeed: number;
  angle: number;
}

interface MistWisp {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  opacity: number;
  angle: number;
  angularSpeed: number;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({
  onComplete,
  isOpen = true,
}) => {
  const [phase, setPhase] = useState<'darkness' | 'illumination' | 'brand_reveal' | 'crescendo' | 'finished'>('darkness');
  const [progress, setProgress] = useState(0); // 0 to 1
  const [isMuted, setIsMuted] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [hasInteractedSound, setHasInteractedSound] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const duration = 8500; // 8.5 seconds cinematic film length

  // Dismiss / Enter Atelier with luxurious smooth fade
  const handleEnterAtelier = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);

    // Fade out audio gracefully
    if (gainNodeRef.current && audioContextRef.current) {
      try {
        gainNodeRef.current.gain.setTargetAtTime(0, audioContextRef.current.currentTime, 0.4);
      } catch {
        // Audio already disposed or suspended
      }
    }

    setTimeout(() => {
      onComplete();
    }, 900);
  }, [isExiting, onComplete]);

  // Luxury Ambient Sound Engine via Web Audio API (sensual, warm drone chord)
  const initAudio = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Base root: 110Hz (A2 warm cello-like foundation)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(110, ctx.currentTime);

      // Fifth: 164.81Hz (E3)
      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(164.81, ctx.currentTime);

      // Ninth: 246.94Hz (B3 ethereal harmonic)
      const osc3 = ctx.createOscillator();
      osc3.type = 'triangle';
      osc3.frequency.setValueAtTime(246.94, ctx.currentTime);

      // Delicate upper chime: 440Hz with subtle slow vibrato
      const osc4 = ctx.createOscillator();
      osc4.type = 'sine';
      osc4.frequency.setValueAtTime(440, ctx.currentTime);

      // Low-pass filter for warmth and velvet texture
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(480, ctx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      osc3.connect(filter);
      osc4.connect(filter);
      filter.connect(masterGain);

      osc1.start();
      osc2.start();
      osc3.start();
      osc4.start();

      // Fade in smoothly
      masterGain.gain.setTargetAtTime(0.18, ctx.currentTime, 1.2);
    } catch {
      // Audio autoplay policy or lack of support
    }
  }, []);

  const toggleSound = () => {
    setHasInteractedSound(true);
    if (isMuted) {
      if (!audioContextRef.current) {
        initAudio();
      } else if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      if (gainNodeRef.current && audioContextRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0.18, audioContextRef.current.currentTime, 0.5);
      }
      setIsMuted(false);
    } else {
      if (gainNodeRef.current && audioContextRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioContextRef.current.currentTime, 0.3);
      }
      setIsMuted(true);
    }
  };

  // Keyboard shortcut: Escape or Space to skip/enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        handleEnterAtelier();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleEnterAtelier]);

  // Main Animation Timeline & Particle Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initialize Golden Ember Particles
    const particleCount = 55;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.8,
        speedY: -(Math.random() * 0.45 + 0.15),
        speedX: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.6 + 0.2,
        maxOpacity: Math.random() * 0.7 + 0.3,
        decay: Math.random() * 0.005 + 0.002,
        shimmerSpeed: Math.random() * 0.03 + 0.01,
        angle: Math.random() * Math.PI * 2,
      });
    }

    // Initialize Ethereal Mist Wisps (fluid smoke simulation)
    const mistCount = 20;
    const mists: MistWisp[] = [];
    const centerX = width / 2;
    const centerY = height * 0.58;

    for (let i = 0; i < mistCount; i++) {
      mists.push({
        x: centerX + (Math.random() - 0.5) * 360,
        y: centerY + (Math.random() - 0.5) * 220,
        radius: Math.random() * 120 + 80,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -(Math.random() * 0.25 + 0.05),
        opacity: Math.random() * 0.12 + 0.04,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.004,
      });
    }

    startTimeRef.current = performance.now();

    const render = (now: number) => {
      const elapsed = now - (startTimeRef.current || now);
      const curProgress = Math.min(1, elapsed / duration);
      setProgress(curProgress);

      // Phase transitions based on cinematic pacing
      if (curProgress < 0.18) {
        setPhase('darkness');
      } else if (curProgress < 0.42) {
        setPhase('illumination');
      } else if (curProgress < 0.75) {
        setPhase('brand_reveal');
      } else if (curProgress < 0.98) {
        setPhase('crescendo');
      } else {
        setPhase('finished');
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Cinematic Volumetric Lighting / Ambient Back-Glow
      // The light blooms softly behind the perfume bottle
      const lightBloomIntensity = Math.min(1, Math.max(0, (curProgress - 0.08) / 0.4));
      if (lightBloomIntensity > 0) {
        const bottleX = width / 2;
        const bottleY = height * 0.52;
        const glowRadius = Math.min(width, height) * 0.75;

        // Golden warm volumetric sphere
        const grad = ctx.createRadialGradient(
          bottleX,
          bottleY - 40,
          10,
          bottleX,
          bottleY,
          glowRadius
        );
        grad.addColorStop(0, `rgba(212, 175, 55, ${0.28 * lightBloomIntensity})`);
        grad.addColorStop(0.35, `rgba(197, 168, 128, ${0.16 * lightBloomIntensity})`);
        grad.addColorStop(0.65, `rgba(158, 128, 85, ${0.07 * lightBloomIntensity})`);
        grad.addColorStop(1, 'rgba(8, 7, 6, 0)');

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Soft spotlight god-ray beam across the top
        ctx.save();
        ctx.translate(bottleX, bottleY - 180);
        ctx.rotate((Math.sin(now * 0.0004) * 0.05));
        const rayGrad = ctx.createLinearGradient(-150, 0, 150, 300);
        rayGrad.addColorStop(0, `rgba(232, 213, 181, ${0.12 * lightBloomIntensity})`);
        rayGrad.addColorStop(0.5, `rgba(212, 175, 55, ${0.05 * lightBloomIntensity})`);
        rayGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = rayGrad;
        ctx.beginPath();
        ctx.moveTo(-60, -100);
        ctx.lineTo(60, -100);
        ctx.lineTo(240, 400);
        ctx.lineTo(-240, 400);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // 2. Realistic Swirling Mist & Smoke Simulation
      const mistIntensity = Math.min(1, Math.max(0, (curProgress - 0.12) / 0.35));
      if (mistIntensity > 0) {
        ctx.save();
        for (let i = 0; i < mists.length; i++) {
          const m = mists[i];
          m.x += m.speedX;
          m.y += m.speedY;
          m.angle += m.angularSpeed;

          // Wrap mist around bottle base
          if (m.y < height * 0.25) {
            m.y = height * 0.75 + Math.random() * 50;
            m.x = width / 2 + (Math.random() - 0.5) * 320;
          }

          const currentOpacity = m.opacity * mistIntensity * (0.8 + 0.2 * Math.sin(now * 0.001 + i));
          const mistGrad = ctx.createRadialGradient(
            m.x,
            m.y,
            0,
            m.x,
            m.y,
            m.radius
          );
          // Champagne smoke tint
          mistGrad.addColorStop(0, `rgba(235, 225, 210, ${currentOpacity * 1.5})`);
          mistGrad.addColorStop(0.4, `rgba(197, 168, 128, ${currentOpacity * 0.8})`);
          mistGrad.addColorStop(0.8, `rgba(158, 128, 85, ${currentOpacity * 0.2})`);
          mistGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = mistGrad;
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // 3. Delicate Floating Champagne Gold Particles / Scent Embers
      const particleIntensity = Math.min(1, Math.max(0, (curProgress - 0.05) / 0.3));
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(now * 0.001 + p.angle) * 0.3;
        p.angle += p.shimmerSpeed;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        const shimmer = (Math.sin(p.angle) + 1) * 0.5;
        const curOp = p.maxOpacity * (0.4 + 0.6 * shimmer) * particleIntensity;

        // Render warm golden particle
        ctx.fillStyle = `rgba(232, 213, 181, ${curOp})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glow halo for larger embers
        if (p.size > 1.8 && curOp > 0.4) {
          ctx.fillStyle = `rgba(212, 175, 55, ${curOp * 0.3})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 4. Moving Glass Caustic Reflections / Anamorphic Beam across Flacon
      const glassGlintProgress = (curProgress - 0.28) / 0.55;
      if (glassGlintProgress > 0 && glassGlintProgress < 1) {
        const bottleCenter = width / 2;
        const bottleTop = height * 0.35;
        const glintX = bottleCenter - 140 + glassGlintProgress * 280;
        const glintY = bottleTop + 120 + glassGlintProgress * 140;

        ctx.save();
        // Anamorphic horizontal streak
        const flareGrad = ctx.createRadialGradient(
          glintX,
          glintY,
          2,
          glintX,
          glintY,
          90
        );
        flareGrad.addColorStop(0, 'rgba(255, 250, 235, 0.9)');
        flareGrad.addColorStop(0.2, 'rgba(232, 213, 181, 0.6)');
        flareGrad.addColorStop(0.6, 'rgba(212, 175, 55, 0.15)');
        flareGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = flareGrad;
        ctx.beginPath();
        // Elliptical flare
        ctx.ellipse(glintX, glintY, 70, 8, -Math.PI / 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (curProgress < 1 && !isExiting) {
        animFrameIdRef.current = requestAnimationFrame(render);
      }
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [duration, isExiting]);

  // Audio cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close();
        } catch {
          // Ignore
        }
      }
    };
  }, []);

  if (!isOpen) return null;

  // Illumination calculation for bottle unveiling
  // Phase 0: 0.05 opacity (silhouetted in darkness)
  // Phase 1 (0.15 -> 0.45): smoothly lights up with golden ambient
  // Phase 2: fully illuminated, majestic glass highlights
  const bottleLightLevel = Math.min(1, Math.max(0.12, (progress - 0.1) / 0.4));
  const bottleScale = 1 + progress * 0.05; // Gentle slow-motion push-in lens effect

  // Brand Name ORÉLLE Reveal Timing (starts gracefully around 3.2s)
  const brandRevealOpacity = Math.min(1, Math.max(0, (progress - 0.32) / 0.28));
  const brandRevealTranslate = Math.max(0, (1 - brandRevealOpacity) * 16);

  // Subtitle Reveal Timing
  const subtitleOpacity = Math.min(1, Math.max(0, (progress - 0.48) / 0.25));

  // Enter Atelier button reveals towards second half
  const buttonOpacity = Math.min(1, Math.max(0, (progress - 0.55) / 0.22));

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden bg-[#070605] text-[#FAF8F5] select-none transition-opacity duration-900 ease-out ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="ORÉLLE Cinematic Experience"
    >
      {/* Dynamic Atmospheric Canvas (Mist, Lighting, Golden Particles & Reflections) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10 w-full h-full"
      />

      {/* Cinematic Vignette & Deep Noir Edge Gradients */}
      <div className="absolute inset-0 z-15 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_35%,rgba(7,6,5,0.85)_85%,#070605_100%)]" />

      {/* Centerpiece: The Luxurious Perfume Bottle Stage */}
      <div className="relative z-5 w-full h-full flex flex-col items-center justify-center px-4">
        {/* The Flacon Container with Slow-Motion Camera Movement */}
        <div
          className="relative max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl w-full flex items-center justify-center transition-transform duration-100 ease-linear"
          style={{
            transform: `scale(${bottleScale})`,
          }}
        >
          {/* Back Spotlight Silhouette Halo */}
          <div
            className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#D4AF37]/20 blur-3xl pointer-events-none transition-opacity duration-1000"
            style={{ opacity: bottleLightLevel }}
          />

          {/* Luxury Perfume Bottle Image */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/11] flex items-center justify-center overflow-hidden">
            <img
              src={cinematicFlaconImg}
              alt="ORÉLLE Haute Parfumerie Flacon"
              className="w-full h-full object-contain filter contrast-[1.08] transition-all duration-700"
              style={{
                opacity: bottleLightLevel,
                filter: `brightness(${0.4 + bottleLightLevel * 0.75}) contrast(1.1) drop-shadow(0 20px 45px rgba(0,0,0,0.8))`,
              }}
            />

            {/* Realistic Glass Reflection Sweep (Simulating light sweeping across bottle bevels) */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
              style={{
                opacity: progress > 0.25 && progress < 0.85 ? 0.75 : 0,
                background: `linear-gradient(115deg, transparent 40%, rgba(255, 248, 230, 0.28) 48%, rgba(212, 175, 55, 0.4) 52%, transparent 60%)`,
                transform: `translateX(${-120 + progress * 240}%)`,
              }}
            />
          </div>
        </div>

        {/* Center Typography: ORÉLLE Reveal */}
        <div
          className="relative z-20 text-center -mt-6 sm:-mt-10 max-w-2xl px-4 transition-all duration-700 ease-out"
          style={{
            opacity: brandRevealOpacity,
            transform: `translateY(${brandRevealTranslate}px)`,
          }}
        >
          {/* Subtle Editorial Kicker */}
          <p className="text-[10px] sm:text-[11px] tracking-[0.45em] uppercase text-[#C5A880] font-light mb-2 sm:mb-3">
            Haute Parfumerie
          </p>

          {/* The Star: ORÉLLE with prominent É accent */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.3em] font-light leading-none text-balance text-[#FAF8F5]">
            OR<span className="text-[#E8D5B5] inline-block transform hover:scale-105 transition-transform">É</span>LLE
          </h1>

          {/* Golden Sheen Underline */}
          <div className="mx-auto w-24 sm:w-32 h-[1px] bg-gradient-to-r from-transparent via-[#C5A880] to-transparent my-4 sm:my-5 opacity-80" />

          {/* Subtitle & Heritage */}
          <div
            className="space-y-2 transition-opacity duration-700"
            style={{ opacity: subtitleOpacity }}
          >
            <p className="text-[11px] sm:text-[12px] tracking-[0.35em] uppercase text-[#E5D5C0] font-light">
              Paris · Grasse · Kannauj
            </p>
            <p className="font-serif italic text-sm sm:text-base text-[#A89F91] font-light max-w-md mx-auto">
              L’Élixir Intemporel — The intimate architecture of signature scent.
            </p>
          </div>

          {/* Enter Atelier Action Button */}
          <div
            className="pt-6 sm:pt-8 transition-opacity duration-700"
            style={{ opacity: buttonOpacity }}
          >
            <button
              onClick={handleEnterAtelier}
              className="group relative inline-flex items-center gap-3 px-8 py-3.5 bg-[#171412] hover:bg-[#25201C] text-[#FAF8F5] border border-[#C5A880]/70 hover:border-[#E8D5B5] text-[12px] tracking-[0.25em] uppercase font-medium transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.18)] hover:shadow-[0_0_35px_rgba(212,175,55,0.35)] cursor-pointer"
            >
              <span>Enter The Atelier</span>
              <ArrowRight className="w-4 h-4 text-[#C5A880] transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Top Header Controls: Minimalist & Refined */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-6 sm:p-8">
        {/* Left: Film Brand Indicator */}
        <div className="flex items-center gap-2.5 text-[10px] tracking-[0.3em] uppercase text-[#8C827A] font-light">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
          <span>ORÉLLE Cinéma</span>
        </div>

        {/* Right: Quick Skip to Atelier */}
        <button
          onClick={handleEnterAtelier}
          className="text-[11px] tracking-[0.25em] uppercase text-[#C5A880] hover:text-[#FAF8F5] transition-colors py-1.5 px-3 border border-transparent hover:border-[#C5A880]/40 cursor-pointer"
        >
          Skip Intro ↗
        </button>
      </div>

      {/* Bottom Bar: Timeline Progress & Discreet Audio Control */}
      <div className="absolute bottom-0 left-0 right-0 z-30 p-6 sm:p-8 flex items-center justify-between">
        {/* Sound Toggle (Ambient harmonic drone) */}
        <button
          onClick={toggleSound}
          className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#A89F91] hover:text-[#FAF8F5] transition-colors py-1 px-2.5 border border-[#332F2C] hover:border-[#C5A880]/60 cursor-pointer"
          title="Toggle ambient fragrance sound"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-[#8C827A]" />
              <span className="text-[10px]">Sound Off</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="text-[10px]">Sound On</span>
            </>
          )}
        </button>

        {/* Center: Delicate Hairline Gold Progress Bar */}
        <div className="hidden sm:flex items-center gap-3 w-48 lg:w-64">
          <div className="w-full h-[1.5px] bg-[#221F1C] overflow-hidden rounded-full">
            <div
              className="h-full bg-gradient-to-r from-[#9E8055] via-[#C5A880] to-[#E8D5B5] transition-all duration-75"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-[#8C827A] tracking-widest shrink-0">
            0{Math.min(8, Math.floor(progress * 8.5))}s
          </span>
        </div>

        {/* Right: Auto-transition Hint */}
        <div className="text-[10px] tracking-[0.2em] uppercase text-[#8C827A] font-light">
          {progress >= 0.98 ? (
            <button
              onClick={handleEnterAtelier}
              className="text-[#C5A880] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Welcome</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          ) : (
            <span>Press Space or Esc</span>
          )}
        </div>
      </div>
    </div>
  );
};
