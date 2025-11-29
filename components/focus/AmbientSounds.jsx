import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Waves, TreePine, Cloud, Coffee } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

const sounds = [
  { 
    id: 'rain', 
    icon: Cloud, 
    label: 'Rain',
    url: 'https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3'
  },
  { 
    id: 'waves', 
    icon: Waves, 
    label: 'Ocean',
    url: 'https://assets.mixkit.co/active_storage/sfx/2432/2432-preview.mp3'
  },
  { 
    id: 'forest', 
    icon: TreePine, 
    label: 'Forest',
    url: 'https://assets.mixkit.co/active_storage/sfx/2430/2430-preview.mp3'
  },
  { 
    id: 'cafe', 
    icon: Coffee, 
    label: 'Café',
    url: 'https://assets.mixkit.co/active_storage/sfx/2433/2433-preview.mp3'
  },
];

export default function AmbientSounds({ focusMode }) {
  const [activeSound, setActiveSound] = useState(null);
  const [volume, setVolume] = useState(50);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef(null);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);
  
  useEffect(() => {
    if (activeSound) {
      const sound = sounds.find(s => s.id === activeSound);
      if (sound && audioRef.current) {
        audioRef.current.src = sound.url;
        audioRef.current.loop = true;
        audioRef.current.volume = volume / 100;
        audioRef.current.play().catch(() => {});
      }
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
  }, [activeSound]);
  
  const toggleSound = (soundId) => {
    setActiveSound(activeSound === soundId ? null : soundId);
  };
  
  if (focusMode && !activeSound) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <audio ref={audioRef} />
      
      <AnimatePresence>
        {isExpanded && !focusMode && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-16 right-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-slate-200 dark:border-slate-700 w-64"
          >
            <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">
              Ambient Sounds
            </p>
            
            <div className="grid grid-cols-4 gap-2 mb-4">
              {sounds.map((sound) => (
                <button
                  key={sound.id}
                  onClick={() => toggleSound(sound.id)}
                  className={`p-3 rounded-xl transition-all ${
                    activeSound === sound.id
                      ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  <sound.icon className="w-5 h-5 mx-auto" />
                </button>
              ))}
            </div>
            
            {activeSound && (
              <div className="flex items-center gap-3">
                <VolumeX className="w-4 h-4 text-slate-400" />
                <Slider
                  value={[volume]}
                  onValueChange={(v) => setVolume(v[0])}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <Volume2 className="w-4 h-4 text-slate-400" />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors ${
          activeSound
            ? 'bg-indigo-500 text-white'
            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
        }`}
      >
        {activeSound ? (
          <Volume2 className="w-5 h-5" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </motion.button>
    </motion.div>
  );
}