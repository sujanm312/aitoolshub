import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square,
  Copy,
  Check,
  RotateCcw,
  Sliders,
  Languages,
  FileText,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
      isFinal: boolean;
      length: number;
    };
    length: number;
  };
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: () => void;
  onresult: (event: SpeechRecognitionEventLike) => void;
  onerror: (event: { error: string }) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  }
}

export const SpeechToTextAndBack: React.FC = () => {
  const [text, setText] = useState<string>(
    'Welcome to aitoolshub speech studio. You can speak into your microphone to convert your voice to clean text, or paste your documents here to have them read aloud naturally using your browser speech engine with zero API cost.'
  );
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPausedSpeaking, setIsPausedSpeaking] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [speechLang, setSpeechLang] = useState<string>('en-IN');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Text to Speech settings
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState<number>(0);
  const [rate, setRate] = useState<number>(1.0);
  const [pitch, setPitch] = useState<number>(1.0);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  // Populate browser voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      setVoices(available);
      // Auto select Indian English or local if available
      const inVoiceIdx = available.findIndex(
        (v) => v.lang === 'en-IN' || v.name.includes('India') || v.lang.startsWith('en')
      );
      if (inVoiceIdx >= 0) setSelectedVoiceIndex(inVoiceIdx);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // Initialize Speech Recognition
  const startListening = () => {
    setErrorMsg(null);
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      setErrorMsg('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    try {
      const recognition = new SpeechRecognitionAPI();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = speechLang;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: SpeechRecognitionEventLike) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript) {
          setText((prev) => (prev ? `${prev} ${finalTranscript}` : finalTranscript));
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setErrorMsg('Microphone access was blocked. Please permit microphone access in your browser settings.');
        } else {
          setErrorMsg(`Voice input error: ${event.error}`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to initialize microphone');
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // Text to Speech
  const handleSpeak = () => {
    if (!('speechSynthesis' in window) || !text.trim()) return;

    if (isPausedSpeaking) {
      window.speechSynthesis.resume();
      setIsPausedSpeaking(false);
      setIsSpeaking(true);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (voices[selectedVoiceIndex]) {
      utterance.voice = voices[selectedVoiceIndex];
    }
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPausedSpeaking(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPausedSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPausedSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handlePause = () => {
    if ('speechSynthesis' in window && isSpeaking) {
      window.speechSynthesis.pause();
      setIsPausedSpeaking(true);
      setIsSpeaking(false);
    }
  };

  const handleStopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPausedSpeaking(false);
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const estimatedReadTimeSec = Math.round((words / 140) * 60);

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <span className="px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-[#FF671F]">
            Web Speech API · Zero API Key · 100% Free
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
            Speech-to-Text Dictation & Natural Audio Reader
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Dictate documents with your voice or listen to any text read out loud using client-side speech engines.
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 self-start md:self-auto text-xs font-semibold text-slate-500">
          <span className="px-2.5 py-1 bg-slate-100 rounded-lg">{words} Words</span>
          <span className="px-2.5 py-1 bg-slate-100 rounded-lg">{chars} Chars</span>
          <span className="px-2.5 py-1 bg-slate-100 rounded-lg">~{estimatedReadTimeSec}s Read</span>
        </div>
      </div>

      {errorMsg && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
          {errorMsg}
        </div>
      )}

      {/* Main Studio Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Editor Box */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={12}
              placeholder="Type, paste text, or click 'Start Voice Typing' to transcribe your speech in real-time..."
              className="w-full p-4 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-[#FF671F] text-slate-900 text-sm leading-relaxed"
            />

            {isListening && (
              <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-600 text-white text-xs font-bold animate-pulse shadow-md">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>Microphone Active (Listening...)</span>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {/* Dictation Button */}
              {isListening ? (
                <button
                  onClick={stopListening}
                  className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-red-600 hover:bg-red-700 flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <MicOff className="w-4 h-4" />
                  <span>Stop Dictation</span>
                </button>
              ) : (
                <button
                  onClick={startListening}
                  className="px-4 py-2.5 rounded-xl font-bold text-xs text-white btn-3d-saffron flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Mic className="w-4 h-4" />
                  <span>Start Voice Typing</span>
                </button>
              )}

              {/* Language Selector for Speech Recognition */}
              <select
                value={speechLang}
                onChange={(e) => setSpeechLang(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-700"
              >
                <option value="en-IN">English (India)</option>
                <option value="hi-IN">Hindi (हिंदी)</option>
                <option value="en-US">English (US)</option>
                <option value="en-GB">English (UK)</option>
                <option value="bn-IN">Bengali (বাংলা)</option>
                <option value="ta-IN">Tamil (தமிழ்)</option>
                <option value="te-IN">Telugu (తెలుగు)</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copyText}
                className="px-3 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy Text'}</span>
              </button>

              <button
                onClick={() => setText('')}
                className="px-3 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-500 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </div>
          </div>
        </div>

        {/* Text-to-Speech Engine Controls */}
        <div className="lg:col-span-4 bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-[#06038D]" />
              <span>Audio Reader Engine</span>
            </h3>

            {isSpeaking && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#046A38] text-[10px] font-bold animate-pulse">
                Speaking...
              </span>
            )}
          </div>

          {/* Voice Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Select Natural Voice</label>
            <select
              value={selectedVoiceIndex}
              onChange={(e) => setSelectedVoiceIndex(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800"
            >
              {voices.map((v, i) => (
                <option key={i} value={i}>
                  {v.name} ({v.lang})
                </option>
              ))}
              {voices.length === 0 && <option value={0}>Default Browser Voice</option>}
            </select>
          </div>

          {/* Reading Speed Slider */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
              <span>Reading Speed</span>
              <span>{rate.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full accent-[#06038D]"
            />
          </div>

          {/* Voice Pitch Slider */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
              <span>Pitch</span>
              <span>{pitch.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
              className="w-full accent-[#FF671F]"
            />
          </div>

          {/* Player Buttons */}
          <div className="pt-2 grid grid-cols-3 gap-2">
            <button
              onClick={handleSpeak}
              className="py-2 px-3 rounded-xl bg-[#06038D] text-white hover:bg-indigo-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Read</span>
            </button>

            <button
              onClick={handlePause}
              disabled={!isSpeaking}
              className="py-2 px-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>Pause</span>
            </button>

            <button
              onClick={handleStopSpeaking}
              disabled={!isSpeaking && !isPausedSpeaking}
              className="py-2 px-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Square className="w-3.5 h-3.5" />
              <span>Stop</span>
            </button>
          </div>

          {/* Privacy Note */}
          <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Voice synthesis is rendered via browser Web Speech. No audio sent to external servers.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
