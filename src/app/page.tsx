'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { generateWalkenSpeech } from '@/lib/tts';
import { Toast } from '@/components/Toast';
import { motion, AnimatePresence } from 'framer-motion';

// Sample Walken phrases for inspiration
const SAMPLE_PHRASES = [
  "I got a fever, and the only prescription is more cowbell!",
  "Ya know, this watch I got here was first purchased by your great-grandfather.",
  "Two mice, fell into a bucket of cream. The first mouse quickly gave up and drowned.",
  "You're talkin' to me all wrong. It's the wrong tone.",
  "Lions, tigers, bears... oh my! I mean, they'll kill ya... but they won't hurt ya.",
];

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState({ 
    title: '', 
    description: '', 
    type: 'default' as 'default' | 'success' | 'error'
  });
  const [characterCount, setCharacterCount] = useState(0);
  
  // Audio player setup
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Update character count when input changes
  useEffect(() => {
    setCharacterCount(inputText.length);
  }, [inputText]);
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputText.trim()) {
      showToast('Error', 'Please enter some text first.', 'error');
      return;
    }
    
    setIsGenerating(true);
    
    try {
      const audioUrl = await generateWalkenSpeech(inputText);
      setAudioUrl(audioUrl);
      showToast('Success', 'Your Walken audio is ready!', 'success');
    } catch (error) {
      console.error('Error generating audio:', error);
      showToast('Error', 'Failed to generate speech. Please try again.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Play the generated audio
  const playAudio = () => {
    if (audioUrl && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };
  
  // Use a sample phrase
  const useSamplePhrase = (phrase: string) => {
    setInputText(phrase);
  };
  
  // Show toast notification
  const showToast = (title: string, description: string, type: 'default' | 'success' | 'error' = 'default') => {
    setToastMessage({ title, description, type });
    setToastOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-amber-600 to-orange-600 p-6 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-5"></div>
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto flex flex-col items-center relative z-10"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight">
            Walkin' <span className="text-yellow-300">Talkin'</span>
          </h1>
          <p className="text-white text-xl mt-3 text-center font-light max-w-2xl">
            Experience the unmistakable cadence and rhythm of Christopher Walken's voice
          </p>
          <div className="flex items-center gap-3 mt-4">
            <span className="px-3 py-1 bg-amber-800 bg-opacity-70 rounded-full text-sm text-amber-200 font-medium">
              Powered by ElevenLabs
            </span>
            <span className="px-3 py-1 bg-amber-800 bg-opacity-70 rounded-full text-sm text-amber-200 font-medium">
              AI Voice Generation
            </span>
          </div>
        </motion.div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl w-full mx-auto p-6 flex-grow">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700"
        >
          {/* Profile badge */}
          <div className="flex items-center mb-6 bg-gray-900 rounded-xl p-4 border border-gray-700">
            <div className="w-16 h-16 rounded-full overflow-hidden relative mr-4 border-2 border-amber-500">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-600"></div>
              <div className="absolute inset-2 bg-gray-900 rounded-full flex items-center justify-center text-3xl font-bold text-amber-500">W</div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-amber-400">Christopher Walken</h2>
              <p className="text-gray-400 text-sm">AI Voice Double</p>
            </div>
          </div>

          {/* Input form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="input-text" className="block text-lg font-medium mb-2 text-amber-300">
                What would you like Christopher to say?
              </label>
              <div className="relative">
                <textarea
                  id="input-text"
                  className="w-full p-4 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 min-h-[140px] text-white placeholder:text-gray-500 transition-all duration-200"
                  placeholder="Type something you'd like Christopher Walken to say..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={isGenerating}
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                  {characterCount} characters
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <motion.button
                type="submit"
                disabled={isGenerating || !inputText.trim()}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium rounded-xl shadow-lg hover:from-amber-600 hover:to-orange-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                    <span>Generate Walken Speech</span>
                  </>
                )}
              </motion.button>
              
              {audioUrl && (
                <motion.button
                  type="button"
                  className={`px-6 py-3 bg-gray-700 text-white font-medium rounded-xl shadow-lg hover:bg-gray-600 flex items-center gap-2 transition-all duration-200 ${isPlaying ? 'bg-green-600 hover:bg-green-700' : ''}`}
                  onClick={playAudio}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  {isPlaying ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M10 15V9M14 15V9" />
                      </svg>
                      <span>Playing...</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polygon points="10 8 16 12 10 16 10 8" />
                      </svg>
                      <span>Play Audio</span>
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </form>
          
          {/* Audio player (hidden but functional) */}
          {audioUrl && (
            <div className="mt-6 p-4 bg-gray-900 rounded-xl border border-gray-700">
              <h3 className="font-medium text-amber-400 mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                Your Generated Audio
              </h3>
              <audio
                ref={audioRef}
                src={audioUrl}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                className="w-full"
                controls
              />
            </div>
          )}
          
          {/* Sample phrases */}
          <div className="mt-10">
            <h2 className="text-lg font-medium mb-3 text-amber-300 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Famous Walken quotes:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SAMPLE_PHRASES.map((phrase, index) => (
                <motion.button
                  key={index}
                  onClick={() => useSamplePhrase(phrase)}
                  className="text-left p-4 bg-gray-900 border border-gray-700 rounded-xl hover:bg-gray-850 text-sm transition-all duration-200 group"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-orange-500 text-lg">"</span>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
                      {phrase}
                    </span>
                    <span className="text-orange-500 text-lg">"</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                    Click to use
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Fun facts section */}
          <div className="mt-10 p-5 bg-gradient-to-r from-amber-900/30 to-orange-900/30 rounded-xl border border-amber-900/50">
            <h2 className="text-lg font-medium mb-3 text-amber-300 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Fun Walken Facts
            </h2>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                Christopher Walken was born Ronald Walken on March 31, 1943, in Queens, New York.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                Before acting, Walken worked as a lion tamer in a circus when he was 15 years old.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                He won an Academy Award for Best Supporting Actor for his role in "The Deer Hunter" (1978).
              </li>
            </ul>
          </div>
        </motion.div>
      </main>
      
      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white p-6 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm">
            Walkin' Talk - Experience the distinctive voice of Christopher Walken
          </p>
          <p className="text-xs mt-2 text-gray-500">
            This is a demonstration app using AI voice synthesis technology.
            No actual Christopher Walken voice data was used in this project.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
      
      {/* Toast notification */}
      <Toast
        open={toastOpen}
        onOpenChange={setToastOpen}
        title={toastMessage.title}
        description={toastMessage.description}
        type={toastMessage.type}
      />
    </div>
  );
}
