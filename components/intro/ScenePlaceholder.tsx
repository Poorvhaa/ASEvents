import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, Mail, Compass, DoorOpen, Home } from 'lucide-react';

interface ScenePlaceholderProps {
  sceneId: string;
  name: string;
  localProgress: number;
}

const sceneDataMap: Record<string, { title: string; desc: string; icon: React.ComponentType<any> }> = {
  ribbon: {
    title: 'THE LUXURY TIE',
    desc: 'Scene 1 & 2: A realistic 3D ribbon wrapped around a textured paper invitation. As you scroll, the ribbon slowly unknots and slides away.',
    icon: Bookmark
  },
  invitation: {
    title: 'THE ENVELOPE UNFOLDS',
    desc: 'Scene 3: The custom wax seal cracks and the heavy-stock gold-foil invitation opens outward, revealing the event details.',
    icon: Mail
  },
  portal: {
    title: 'THE DEPTH TRANSITION',
    desc: 'Scene 4: The camera plunges deep into the gold embossing of the invitation, transitioning through a dimensional particle field.',
    icon: Compass
  },
  entrance: {
    title: 'THE GRAND FOYER',
    desc: 'Scene 5: A luxury event architectural lobby materializes. Ambient lighting casts golden reflections on marble surfaces.',
    icon: DoorOpen
  },
  homepage: {
    title: 'THE IMMERSION REVEAL',
    desc: 'Scene 6: The 3D camera pulls back to line up with the main webpage, transitioning the user smoothly into the active home sections.',
    icon: Home
  }
};

export const ScenePlaceholder = React.memo(({ sceneId, name, localProgress }: ScenePlaceholderProps) => {
  const data = sceneDataMap[sceneId] || {
    title: name.toUpperCase(),
    desc: 'Placeholder Scene description and details.',
    icon: Compass
  };
  
  const IconComponent = data.icon;

  return (
    <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-[#121212] overflow-hidden">
      {/* Premium Spotlight Radial Glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 transition-transform duration-500" 
        style={{
          background: 'radial-gradient(circle at center, rgba(197, 168, 128, 0.15) 0%, transparent 60%)',
          transform: `scale(${1 + localProgress * 0.1})`
        }}
      />

      {/* Decorative Golden Corner Accents */}
      <div className="absolute top-12 left-12 w-8 h-8 border-t border-l border-[#C5A880]/30" />
      <div className="absolute top-12 right-12 w-8 h-8 border-t border-r border-[#C5A880]/30" />
      <div className="absolute bottom-12 left-12 w-8 h-8 border-b border-l border-[#C5A880]/30" />
      <div className="absolute bottom-12 right-12 w-8 h-8 border-b border-r border-[#C5A880]/30" />

      {/* Main Content Card */}
      <div className="z-10 text-center max-w-xl px-6 flex flex-col items-center">
        {/* Animated Icon Ring */}
        <div className="relative mb-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-[#C5A880]/10 animate-ping opacity-75" style={{ animationDuration: '3s' }} />
          <div className="w-16 h-16 rounded-full border border-[#C5A880]/30 flex items-center justify-center bg-[#121212]">
            <IconComponent className="w-6 h-6 text-[#C5A880]" />
          </div>
        </div>

        {/* Scene Meta ID */}
        <span className="text-xs font-sans tracking-[0.25em] text-[#C5A880]/60 mb-2 uppercase block">
          [ SCENE: {sceneId} ]
        </span>

        {/* Large Centered Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FAF8F5] tracking-wider mb-6 font-bold leading-tight select-none">
          {data.title}
        </h2>

        {/* Champagne Accent Divider Line */}
        <div className="w-24 h-[1px] bg-[#C5A880]/40 mb-6 relative">
          {/* Progress Dot on Divider */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#C5A880] shadow-[0_0_8px_#C5A880]"
            style={{ left: `${localProgress * 100}%`, transform: 'translate(-50%, -50%)' }}
          />
        </div>

        {/* Scene Description */}
        <p className="text-sm md:text-base text-[#FAF8F5]/70 font-sans tracking-wide leading-relaxed mb-8 max-w-lg select-none">
          {data.desc}
        </p>

        {/* Scene Progress Stats */}
        <div className="flex gap-8 text-xs font-mono tracking-widest text-[#C5A880]/80">
          <div>
            STATUS: <span className="text-[#FAF8F5]">ACTIVE</span>
          </div>
          <div>
            SCENE PROGRESS: <span className="text-[#FAF8F5]">{(localProgress * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>

      {/* Ambient background particles (using simple CSS animation) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-[#C5A880] animate-pulse" />
        <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 rounded-full bg-[#C5A880] animate-pulse" style={{ animationDelay: '0.8s' }} />
      </div>
    </div>
  );
});

ScenePlaceholder.displayName = 'ScenePlaceholder';
