"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { generateWalkenSpeech } from "@/lib/tts";
import { Toast } from "@/components/Toast";
import { motion, AnimatePresence } from "framer-motion";

// Sample Walken phrases for inspiration
const SAMPLE_PHRASES = [
  "I got a fever, and the only prescription is more cowbell!",
  "Ya know, this watch I got here was first purchased by your great-grandfather.",
  "Two mice, fell into a bucket of cream. The first mouse quickly gave up and drowned.",
  "You're talkin' to me all wrong. It's the wrong tone.",
  "Lions, tigers, bears... oh my! I mean, they'll kill ya... but they won't hurt ya.",
];

// Retro icons as components
const ConstructionIcon = () => (
  <div className="h-5 w-5 mx-2 inline-block">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="12" width="20" height="10" fill="#000000" />
      <rect x="4" y="14" width="16" height="6" fill="#FFFF00" />
      <path d="M12 2L22 12H2L12 2Z" fill="#FF0000" />
    </svg>
  </div>
);

const NewIcon = () => (
  <div className="h-5 w-5 mx-2 inline-block">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#FF0000" />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fill="#FFFFFF"
        fontWeight="bold"
        fontSize="10"
      >
        NEW
      </text>
    </svg>
  </div>
);

const FlameIcon = () => (
  <div className="h-6 w-6 inline-block">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C12 2 7 8 7 14C7 18.4183 9.58172 22 12 22C14.4183 22 17 18.4183 17 14C17 8 12 2 12 2Z"
        fill="#FF5500"
      />
      <path
        d="M12 5C12 5 9 9 9 13C9 15.7614 10.3431 18 12 18C13.6569 18 15 15.7614 15 13C15 9 12 5 12 5Z"
        fill="#FFCC00"
      />
    </svg>
  </div>
);

const WalkenIcon = () => (
  <div
    className="w-16 h-16 mr-4 border-2 border-white"
    style={{ backgroundColor: "#ffcc00" }}
  >
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="6" fill="#FFFFFF" />
      <path d="M6 14H18L16 24H8L6 14Z" fill="#FFFFFF" />
      <path d="M9 7H10V9H9V7Z" fill="#000000" />
      <path d="M14 7H15V9H14V7Z" fill="#000000" />
      <path d="M10 12H14V13H10V12Z" fill="#000000" />
    </svg>
  </div>
);

const SpeakerIcon = () => (
  <div className="inline-block ml-2 h-4">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4L6 10H2V14H6L12 20V4Z" fill="#000000" />
      <path
        d="M16 8C17.1046 8 18 9.79086 18 12C18 14.2091 17.1046 16 16 16"
        stroke="#000000"
        strokeWidth="2"
      />
      <path
        d="M19 5C21.2091 5 23 8.13401 23 12C23 15.866 21.2091 19 19 19"
        stroke="#000000"
        strokeWidth="2"
      />
    </svg>
  </div>
);

const LoadingIcon = () => (
  <div className="inline-block h-5 w-5 mr-2">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="#000000"
        strokeWidth="2"
        strokeDasharray="40 20"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          from="0 12 12"
          to="360 12 12"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  </div>
);

const MicrophoneIcon = () => (
  <div className="inline-block h-5 w-5 mr-2">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="9" y="2" width="6" height="12" rx="3" fill="#000000" />
      <path
        d="M5 10C5 13.866 8.13401 17 12 17C15.866 17 19 13.866 19 10"
        stroke="#000000"
        strokeWidth="2"
      />
      <path d="M12 17V22" stroke="#000000" strokeWidth="2" />
      <path d="M8 22H16" stroke="#000000" strokeWidth="2" />
    </svg>
  </div>
);

const PlayingIcon = () => (
  <div className="inline-block h-5 w-5 mr-2">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="6" width="2" height="12" fill="#000000">
        <animate
          attributeName="height"
          values="12;4;12"
          dur="1s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="9" y="6" width="2" height="12" fill="#000000">
        <animate
          attributeName="height"
          values="4;12;4"
          dur="1s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="14" y="6" width="2" height="12" fill="#000000">
        <animate
          attributeName="height"
          values="8;4;8"
          dur="1s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="19" y="6" width="2" height="12" fill="#000000">
        <animate
          attributeName="height"
          values="4;8;4"
          dur="1s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  </div>
);

const PlayIcon = () => (
  <div className="inline-block h-5 w-5 mr-2">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 3L19 12L5 21V3Z" fill="#000000" />
    </svg>
  </div>
);

const AudioIcon = () => (
  <div className="h-5 w-5 inline-block">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#0066CC" />
      <path d="M8 8L16 8" stroke="#FFFFFF" strokeWidth="2" />
      <path d="M8 12L16 12" stroke="#FFFFFF" strokeWidth="2" />
      <path d="M8 16L16 16" stroke="#FFFFFF" strokeWidth="2" />
    </svg>
  </div>
);

const QuoteIcon = () => (
  <div className="h-5 w-5 inline-block">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 10H6C4.89543 10 4 9.10457 4 8V6C4 4.89543 4.89543 4 6 4H8C9.10457 4 10 4.89543 10 6V10ZM10 10L10 14C10 15.1046 9.10457 16 8 16H6"
        stroke="#000000"
        strokeWidth="2"
      />
      <path
        d="M20 10H16C14.8954 10 14 9.10457 14 8V6C14 4.89543 14.8954 4 16 4H18C19.1046 4 20 4.89543 20 6V10ZM20 10L20 14C20 15.1046 19.1046 16 18 16H16"
        stroke="#000000"
        strokeWidth="2"
      />
    </svg>
  </div>
);

const ClickIcon = () => (
  <div className="h-3 w-3 inline-block">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L10 12L4 14L10 16L12 22L14 16L20 14L14 12L12 2Z"
        fill="#FF0000"
      />
    </svg>
  </div>
);

const EmailIcon = () => (
  <div className="h-4 w-4 inline-block">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="2"
        y="4"
        width="20"
        height="16"
        fill="#FFCC00"
        stroke="#000000"
      />
      <path d="M2 4L12 12L22 4" stroke="#000000" />
    </svg>
  </div>
);

const HomeIcon = () => (
  <div className="h-6 w-6 inline-block">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 12L12 3L21 12" stroke="#FFFFFF" strokeWidth="2" />
      <path d="M5 10V20H19V10" stroke="#FFFFFF" strokeWidth="2" />
      <path d="M9 20V14H15V20" stroke="#FFFFFF" strokeWidth="2" />
    </svg>
  </div>
);

const GuestbookIcon = () => (
  <div className="h-6 w-6 inline-block">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="16" height="16" fill="#FFFFFF" />
      <path d="M8 8H16" stroke="#0066CC" strokeWidth="2" />
      <path d="M8 12H16" stroke="#0066CC" strokeWidth="2" />
      <path d="M8 16H12" stroke="#0066CC" strokeWidth="2" />
    </svg>
  </div>
);

const LinksIcon = () => (
  <div className="h-6 w-6 inline-block">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="4" fill="#FFFFFF" />
      <circle cx="16" cy="16" r="4" fill="#FFFFFF" />
      <path d="M11 11L13 13" stroke="#FFFFFF" strokeWidth="2" />
    </svg>
  </div>
);

const InfoIcon = () => (
  <div className="h-5 w-5 inline-block">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#0066CC" />
      <path
        d="M12 7V8"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 11V17"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

const BulletIcon = () => (
  <div className="h-4 w-4 mt-1 inline-block">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L14.4 8.8H22L16 13.2L18.4 20L12 15.6L5.6 20L8 13.2L2 8.8H9.6L12 2Z"
        fill="#FF6600"
      />
    </svg>
  </div>
);

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    title: "",
    description: "",
    type: "default" as "default" | "success" | "error",
  });
  const [characterCount, setCharacterCount] = useState(0);
  const [visitorCount, setVisitorCount] = useState(0);

  // Initialize visitor count on client side only
  useEffect(() => {
    setVisitorCount(Math.floor(Math.random() * 10000) + 5000);
  }, []);

  // Audio player setup
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Update character count when input changes
  useEffect(() => {
    setCharacterCount(inputText.length);
  }, [inputText]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputText.trim()) {
      showToast("Error", "Please enter some text first.", "error");
      return;
    }

    setIsGenerating(true);

    try {
      const audioUrl = await generateWalkenSpeech(inputText);
      setAudioUrl(audioUrl);
      showToast("Success", "Your Walken audio is ready!", "success");
    } catch (error) {
      console.error("Error generating audio:", error);
      showToast(
        "Error",
        "Failed to generate speech. Please try again.",
        "error"
      );
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

  // Move useSamplePhrase outside of component and make it a regular function
  const handleSamplePhrase = (phrase: string) => {
    setInputText(phrase);
    if (textAreaRef.current) {
      textAreaRef.current.value = phrase;
    }
  };

  // Show toast notification
  const showToast = (
    title: string,
    description: string,
    type: "default" | "success" | "error" = "default"
  ) => {
    setToastMessage({ title, description, type });
    setToastOpen(true);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--page-bg)" }}
    >
      {/* Under Construction Banner */}
      <div className="bg-yellow-300 text-black text-center py-1 marquee">
        <div className="marquee-content">
          <span className="inline-flex items-center">
            <ConstructionIcon />
            WELCOME TO WALKIN&apos; TALKIN&apos; - THE BEST CHRISTOPHER WALKEN
            VOICE GENERATOR ON THE WEB!
            <NewIcon />
            SITE BEST VIEWED IN INTERNET EXPLORER 6.0 OR NETSCAPE NAVIGATOR
            <ConstructionIcon />
          </span>
        </div>
      </div>

      {/* Header */}
      <header className="w-full bg-gradient-to-r from-blue-700 to-blue-900 p-4 border-t-2 border-b-2 border-white">
        <table width="100%" cellPadding={0} cellSpacing={0} border={0}>
          <tbody>
            <tr>
              <td align="center">
                <table width="800" cellPadding={10} cellSpacing={0} border={0}>
                  <tbody>
                    <tr>
                      <td align="center">
                        <div className="flex flex-col items-center">
                          <h1
                            className="text-5xl md:text-6xl font-bold text-white"
                            style={{
                              textShadow:
                                "3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                            }}
                          >
                            <span className="text-yellow-300 twinkle">★</span>{" "}
                            Walkin'{" "}
                            <span className="text-yellow-300">Talkin'</span>{" "}
                            <span
                              className="text-yellow-300 twinkle"
                              style={{ animationDelay: "0.5s" }}
                            >
                              ★
                            </span>
                          </h1>
                          <div className="flex items-center gap-2 mt-2">
                            <FlameIcon />
                            <span
                              className="text-white text-xl font-bold"
                              style={{ textShadow: "1px 1px 0 #000" }}
                            >
                              Christopher Walken Voice Generator
                            </span>
                            <FlameIcon />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </header>

      {/* Visitor Counter */}
      <div className="bg-black text-white text-center py-1 text-sm">
        <span>You are visitor #</span>
        <span className="font-bold text-yellow-300">
          {visitorCount.toLocaleString()}
        </span>
        <span> since 2001</span>
      </div>

      {/* Main content */}
      <main className="flex-grow py-6" style={{ background: "var(--page-bg)" }}>
        <table width="100%" cellPadding={0} cellSpacing={0} border={0}>
          <tbody>
            <tr>
              <td align="center">
                <table
                  width="800"
                  cellPadding={0}
                  cellSpacing={0}
                  border={0}
                  style={{
                    background: "var(--content-bg)",
                    border: "2px solid var(--border-color)",
                  }}
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          width="100%"
                          cellPadding={15}
                          cellSpacing={0}
                          border={0}
                        >
                          <tbody>
                            <tr>
                              <td
                                className="bg-[#0066cc]"
                                style={{ border: "1px solid #003399" }}
                              >
                                <div className="flex items-center">
                                  <WalkenIcon />
                                  <div>
                                    <h2
                                      className="text-xl font-bold text-white"
                                      style={{ textShadow: "1px 1px 0 #000" }}
                                    >
                                      Christopher Walken
                                    </h2>
                                    <p className="text-yellow-300 text-sm font-bold">
                                      AI Voice Double
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                {/* Input form */}
                                <form
                                  onSubmit={handleSubmit}
                                  className="space-y-6"
                                >
                                  <div>
                                    <table
                                      width="100%"
                                      cellPadding={0}
                                      cellSpacing={0}
                                      border={0}
                                    >
                                      <tbody>
                                        <tr>
                                          <td>
                                            <label
                                              htmlFor="input-text"
                                              className="block text-lg font-bold mb-2 text-blue-800"
                                            >
                                              What would you like Christopher to
                                              say?
                                              <SpeakerIcon />
                                            </label>
                                            <div className="relative">
                                              <textarea
                                                id="input-text"
                                                className="w-full p-4 retro-input min-h-[140px] text-black"
                                                placeholder="Type something you'd like Christopher Walken to say..."
                                                value={inputText}
                                                onChange={(e) =>
                                                  setInputText(e.target.value)
                                                }
                                                disabled={isGenerating}
                                                ref={textAreaRef}
                                              />
                                              <div className="absolute bottom-3 right-3 text-xs text-gray-600">
                                                {characterCount} characters
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>

                                  <div className="flex flex-wrap gap-3">
                                    <button
                                      type="submit"
                                      disabled={
                                        isGenerating || !inputText.trim()
                                      }
                                      className="retro-button px-6 py-3 text-black disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                      {isGenerating ? (
                                        <>
                                          <LoadingIcon />
                                          <span>Generating...</span>
                                        </>
                                      ) : (
                                        <>
                                          <MicrophoneIcon />
                                          <span>Generate Walken Speech</span>
                                        </>
                                      )}
                                    </button>

                                    {audioUrl && (
                                      <button
                                        type="button"
                                        className={`retro-button px-6 py-3 text-black ${
                                          isPlaying ? "bg-green-200" : ""
                                        }`}
                                        onClick={playAudio}
                                      >
                                        {isPlaying ? (
                                          <>
                                            <PlayingIcon />
                                            <span>Playing...</span>
                                          </>
                                        ) : (
                                          <>
                                            <PlayIcon />
                                            <span>Play Audio</span>
                                          </>
                                        )}
                                      </button>
                                    )}
                                  </div>
                                </form>

                                {/* Audio player (hidden but functional) */}
                                {audioUrl && (
                                  <div className="mt-6 p-4 bg-white border-2 inset border-gray-400">
                                    <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                                      <AudioIcon />
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
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {/* Sample phrases */}
                        <table
                          width="100%"
                          cellPadding={15}
                          cellSpacing={0}
                          border={0}
                        >
                          <tbody>
                            <tr>
                              <td
                                className="bg-[#ffcc00]"
                                style={{ border: "1px solid #cc9900" }}
                              >
                                <h2 className="text-lg font-bold mb-3 text-blue-800 flex items-center gap-2">
                                  <QuoteIcon />
                                  Famous Walken quotes:
                                </h2>
                                <table
                                  width="100%"
                                  cellPadding={0}
                                  cellSpacing={0}
                                  border={0}
                                >
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                          {SAMPLE_PHRASES.map(
                                            (phrase, index) => (
                                              <div
                                                key={index}
                                                onClick={() =>
                                                  handleSamplePhrase(phrase)
                                                }
                                                className="text-left p-4 bg-white border-2 outset border-gray-400 hover:bg-blue-100 text-sm cursor-pointer"
                                              >
                                                <div className="flex items-start gap-2">
                                                  <span className="text-red-500 text-lg">
                                                    "
                                                  </span>
                                                  <span className="text-blue-900">
                                                    {phrase}
                                                  </span>
                                                  <span className="text-red-500 text-lg">
                                                    "
                                                  </span>
                                                </div>
                                                <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                                                  <ClickIcon />
                                                  Click to use
                                                </div>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {/* Fun facts section */}
                        <table
                          width="100%"
                          cellPadding={15}
                          cellSpacing={0}
                          border={0}
                        >
                          <tbody>
                            <tr>
                              <td
                                className="bg-[#ff6600]"
                                style={{ border: "1px solid #cc3300" }}
                              >
                                <h2
                                  className="text-lg font-bold mb-3 text-white flex items-center gap-2"
                                  style={{ textShadow: "1px 1px 0 #000" }}
                                >
                                  <InfoIcon />
                                  Fun Walken Facts
                                </h2>
                                <div className="bg-white p-3 border-2 outset border-gray-400">
                                  <ul className="space-y-2 text-sm text-blue-900">
                                    <li className="flex items-start gap-2">
                                      <BulletIcon />
                                      Christopher Walken was born Ronald Walken
                                      on March 31, 1943, in Queens, New York.
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <BulletIcon />
                                      Before acting, Walken worked as a lion
                                      tamer in a circus when he was 15 years
                                      old.
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <BulletIcon />
                                      He won an Academy Award for Best
                                      Supporting Actor for his role in "The Deer
                                      Hunter" (1978).
                                    </li>
                                  </ul>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </main>

      {/* Footer */}
      <footer className="w-full bg-blue-900 text-white p-4 border-t-2 border-white">
        <table width="100%" cellPadding={0} cellSpacing={0} border={0}>
          <tbody>
            <tr>
              <td align="center">
                <div className="text-center">
                  <div className="text-sm mb-2">
                    <EmailIcon />
                    <a href="#" className="text-yellow-300 underline">
                      contact@walkintalkin.com
                    </a>
                  </div>
                  <div className="flex justify-center gap-4 mb-2">
                    <a href="#" className="text-white hover:text-yellow-300">
                      <HomeIcon />
                    </a>
                    <a href="#" className="text-white hover:text-yellow-300">
                      <GuestbookIcon />
                    </a>
                    <a href="#" className="text-white hover:text-yellow-300">
                      <LinksIcon />
                    </a>
                  </div>

                  {/* Browser compatibility badges */}
                  <div className="flex justify-center gap-2 my-3">
                    <div className="bg-white text-black text-xs px-2 py-1 border border-gray-400">
                      Best viewed with:
                    </div>
                    <div className="bg-white text-black text-xs px-2 py-1 border border-gray-400 flex items-center">
                      <span className="font-bold text-blue-800">e</span>{" "}
                      Internet Explorer 6.0
                    </div>
                    <div className="bg-white text-black text-xs px-2 py-1 border border-gray-400 flex items-center">
                      <span className="font-bold text-red-600">N</span> Netscape
                    </div>
                  </div>

                  {/* Hit counter */}
                  <div className="my-3 inline-block bg-black border border-gray-600 p-1">
                    <div className="text-xs text-gray-400 mb-1">
                      Total Hits:
                    </div>
                    <div className="flex">
                      {visitorCount
                        .toString()
                        .split("")
                        .map((digit, i) => (
                          <div
                            key={i}
                            className="bg-blue-900 text-yellow-300 font-mono px-1 border border-gray-700 mx-px"
                          >
                            {digit}
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="text-xs text-gray-300">
                    This site is best viewed in 800x600 resolution
                  </div>
                  <div className="text-xs text-gray-300 mt-1">
                    © 2001-2024 Walkin' Talkin' - All Rights Reserved
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
