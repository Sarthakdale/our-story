"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { story } from "./data/story"; 
import confetti from "canvas-confetti";
import { Heart, Lock } from "lucide-react"; // Added Lock icon

export default function Home() {
  const [currentNodeId, setCurrentNodeId] = useState("start");
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState(""); // NEW: For the input field
  const [errorMsg, setErrorMsg] = useState("");     // NEW: For wrong answers
  
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const node = story[currentNodeId];

  // Typing Effect
  useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);
    setInputValue(""); // Reset input on new node
    setErrorMsg("");
    let index = 0;
    
    const typingInterval = setInterval(() => {
      if (index < node.text.length) {
        setDisplayedText((prev) => prev + node.text.charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        if (node.id === "success") triggerConfetti();
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [currentNodeId, node.text, node.id]);

  const triggerConfetti = () => {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#ff69b4', '#ff1493', '#ffffff'] });
  };

  const handleChoice = (nextId: string) => {
    setCurrentNodeId(nextId);
  };

  // NEW: Handle the Input Submission
  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.toLowerCase().trim() === node.correctAnswer?.toLowerCase()) {
      // Success!
      if (node.nextId) setCurrentNodeId(node.nextId);
    } else {
      // Wrong Answer
      setErrorMsg("Access Denied. Try again, love.");
      // Optional: Shake animation logic could go here
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-stone-900 text-stone-300 font-typewriter selection:bg-pink-500 selection:text-white">
      <audio ref={audioRef} src="/song.mp3" loop />

      <div className="absolute top-6 left-6 z-10">
        <button onClick={toggleMusic} className="opacity-50 hover:opacity-100 transition-opacity border border-stone-600 px-3 py-1 rounded-full text-xs">
          {isPlaying ? "Pause Music ⏸" : "Play Music ▶"}
        </button>
      </div>

      <div className="max-w-2xl w-full">
        <div className="bg-stone-800/80 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-2xl border border-stone-700 relative min-h-[400px] flex flex-col">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-8 border-b border-stone-700 pb-4">
             <div className="flex gap-2">
               <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
               <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
             </div>
             <div className="text-xs uppercase tracking-widest text-stone-500">
               ID: {node.id.toUpperCase()}
             </div>
          </div>

          {/* Text */}
          <div className="flex-grow text-lg md:text-xl leading-relaxed whitespace-pre-wrap">
            {displayedText}
            {isTyping && <span className="animate-pulse ml-1 text-pink-500">|</span>}
          </div>

          {/* Image */}
          {node.image && !isTyping && (
             <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} src={node.image} className="mt-6 rounded border border-stone-600 w-full h-64 object-cover"/>
          )}

          {/* INTERACTION AREA */}
          <div className="mt-8">
            <AnimatePresence>
              {!isTyping && (
                <>
                  {/* TYPE: INPUT FIELD */}
                  {node.type === 'input' ? (
                    <motion.form 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      onSubmit={handleInputSubmit} className="flex flex-col gap-2"
                    >
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="Type answer here..."
                          className="flex-grow bg-stone-900 border border-stone-600 rounded p-3 focus:border-pink-500 outline-none transition-colors"
                          autoFocus
                        />
                        <button type="submit" className="bg-stone-700 hover:bg-pink-600 text-white px-6 rounded transition-colors">
                          <Lock className="w-4 h-4" />
                        </button>
                      </div>
                      {errorMsg && <p className="text-red-400 text-sm mt-1">{errorMsg}</p>}
                    </motion.form>
                  ) : (
                    /* TYPE: STANDARD CHOICES */
                    <div className="flex flex-col gap-3">
                      {node.choices?.map((choice, i) => (
                        <motion.button
                          key={i}
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                          onClick={() => handleChoice(choice.nextId)}
                          className="w-full text-left p-4 rounded bg-stone-900/50 hover:bg-stone-700 hover:text-pink-300 border border-stone-700 hover:border-pink-500/30 transition-all duration-300 group flex justify-between items-center"
                        >
                          <span>{">"} {choice.text}</span>
                          <Heart className="w-4 h-4 opacity-0 group-hover:opacity-100 text-pink-500 transition-opacity" />
                        </motion.button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      <footer className="mt-12 text-stone-600 text-xs">Sarthak &copy; 2026</footer>
    </main>
  );
}