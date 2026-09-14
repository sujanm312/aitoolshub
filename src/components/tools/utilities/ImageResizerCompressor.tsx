import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Download,
  Sliders,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  FileCheck,
  Maximize2,
  Lock,
  Unlock,
  ShieldCheck,
} from 'lucide-react';

interface Preset {
  id: string;
  name: string;
  category: string;
  widthPx: number;
  heightPx: number;
  targetMinKb: number;
  targetMaxKb: number;
  description: string;
}

const GOV_PRESETS: Preset[] = [
  {
    id: 'upsc-photo',
    name: 'UPSC CSE / CDS Photo',
    category: 'UPSC',
    widthPx: 350,
    heightPx: 350,
    targetMinKb: 20,
    targetMaxKb: 50,
    description: '350×350 px, strict 20KB to 50KB range',
  },
  {
    id: 'ssc-photo',
    name: 'SSC CGL / CHSL Photo',
    category: 'SSC',
    widthPx: 413,
    heightPx: 531,
    targetMinKb: 20,
    targetMaxKb: 50,
    description: '3.5cm × 4.5cm (approx 413×531 px at 300 DPI), 20–50KB',
  },
  {
    id: 'ssc-sign',
    name: 'SSC Signature',
    category: 'SSC',
    widthPx: 472,
    heightPx: 236,
    targetMinKb: 10,
    targetMaxKb: 20,
    description: '4.0cm × 2.0cm, 10KB to 20KB range',
  },
  {
    id: 'ibps-photo',
    name: 'IBPS PO / Clerk Photo',
    category: 'Banking',
    widthPx: 200,
    heightPx: 230,
    targetMinKb: 20,
    targetMaxKb: 50,
    description: '200×230 px, 20KB to 50KB range',
  },
  {
    id: 'ibps-sign',
    name: 'IBPS Signature',
    category: 'Banking',
    widthPx: 140,
    heightPx: 60,
    targetMinKb: 10,
    targetMaxKb: 20,
    description: '140×60 px, 10KB to 20KB range',
  },
  {
    id: 'neet-photo',
    name: 'NEET / NTA Photo',
    category: 'Medical / JEE',
    widthPx: 450,
    heightPx: 600,
    targetMinKb: 10,
    targetMaxKb: 200,
    description: 'Passport size photo, 10KB to 200KB',
  },
];

export const ImageResizerCompressor: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [originalSizeKb, setOriginalSizeKb] = useState<number>(0);
  const [originalDimensions, setOriginalDimensions] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

  // Settings
  const [activePreset, setActivePreset] = useState<string>('ssc-photo');
  const [targetWidth, setTargetWidth] = useState<number>(413);
  const [targetHeight, setTargetHeight] = useState<number>(531);
  const [targetMaxKb, setTargetMaxKb] = useState<number>(50);
  const [targetMinKb, setTargetMinKb] = useState<number>(20);
  const [keepAspectRatio, setKeepAspectRatio] = useState<boolean>(false);
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff'); // White background for govt forms

  // Processing Results
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [compressedDataUrl, setCompressedDataUrl] = useState<string | null>(null);
  const [compressedSizeKb, setCompressedSizeKb] = useState<number>(0);
  const [compressionQuality, setCompressionQuality] = useState<number>(0.85);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Apply preset
  const handlePresetSelect = (presetId: string) => {
    setActivePreset(presetId);
    const p = GOV_PRESETS.find((x) => x.id === presetId);
    if (p) {
      setTargetWidth(p.widthPx);
      setTargetHeight(p.heightPx);
      setTargetMaxKb(p.targetMaxKb);
      setTargetMinKb(p.targetMinKb);
    }
  };

  // Handle file select
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processSelectedFile(file);
  };

  const processSelectedFile = (file: File) => {
    setSelectedFile(file);
    setOriginalSizeKb(Math.round(file.size / 1024));

    const url = URL.createObjectURL(file);
    setOriginalImageUrl(url);

    const img = new Image();
    img.onload = () => {
      setOriginalDimensions({ w: img.width, h: img.height });
      // Trigger compression
      compressImage(img, targetWidth, targetHeight, targetMaxKb, targetMinKb);
    };
    img.src = url;
  };

  // Binary search quality compressor to hit target KB
  const compressImage = async (
    img: HTMLImageElement,
    w: number,
    h: number,
    maxKb: number,
    minKb: number
  ) => {
    setIsProcessing(true);

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsProcessing(false);
      return;
    }

    // Fill white background (crucial for signatures and transparent PNGs in govt exams)
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, w, h);

    // Draw image to fill the canvas
    ctx.drawImage(img, 0, 0, w, h);

    // Binary search for optimal JPEG quality to reach between minKb and maxKb
    let minQuality = 0.05;
    let maxQuality = 0.98;
    let bestBlob: Blob | null = null;
    let bestQuality = 0.8;

    for (let i = 0; i < 7; i++) {
      const midQuality = (minQuality + maxQuality) / 2;
      const blob: Blob | null = await new Promise((resolve) =>
        canvas.toBlob((b) => resolve(b), 'image/jpeg', midQuality)
      );

      if (!blob) break;
      const sizeKb = blob.size / 1024;

      if (sizeKb > maxKb) {
        maxQuality = midQuality;
      } else {
        bestBlob = blob;
        bestQuality = midQuality;
        minQuality = midQuality;
      }
    }

    // Fallback if none found below maxKb
    if (!bestBlob) {
      bestBlob = await new Promise((resolve) =>
        canvas.toBlob((b) => resolve(b), 'image/jpeg', 0.1)
      );
    }

    if (bestBlob) {
      const finalKb = Math.round(bestBlob.size / 1024);
      setCompressedBlob(bestBlob);
      setCompressedSizeKb(finalKb);
      setCompressionQuality(Math.round(bestQuality * 100));

      const reader = new FileReader();
      reader.onloadend = () => {
        setCompressedDataUrl(reader.result as string);
        setIsProcessing(false);
      };
      reader.readAsDataURL(bestBlob);
    } else {
      setIsProcessing(false);
    }
  };

  // Re-compress when parameters change
  const handleRecompress = () => {
    if (!originalImageUrl) return;
    const img = new Image();
    img.onload = () => {
      compressImage(img, targetWidth, targetHeight, targetMaxKb, targetMinKb);
    };
    img.src = originalImageUrl;
  };

  // Download compressed image
  const handleDownload = () => {
    if (!compressedDataUrl || !selectedFile) return;
    const link = document.createElement('a');
    const baseName = selectedFile.name.replace(/\.[^/.]+$/, '');
    link.download = `${baseName}_gov_resized_${targetWidth}x${targetHeight}_${compressedSizeKb}kb.jpg`;
    link.href = compressedDataUrl;
    link.click();
  };

  const isSizeInTargetRange =
    compressedSizeKb >= targetMinKb && compressedSizeKb <= targetMaxKb;

  return (
    <div className="space-y-8">
      {/* Top Banner Notice */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-900">
        <ShieldCheck className="w-5 h-5 text-[#FF671F] shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold text-amber-900 block">
            100% Client-Side Privacy Guaranteed
          </strong>
          Your photos and signatures are processed entirely in your browser memory via the HTML5 Canvas API. No image is ever uploaded to any cloud server.
        </div>
      </div>

      {/* Preset Quick-Buttons */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
          Select Exam Authority or Portal Preset:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {GOV_PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                handlePresetSelect(p.id);
                setTimeout(handleRecompress, 50);
              }}
              className={`p-3 rounded-xl text-left border transition cursor-pointer ${
                activePreset === p.id
                  ? 'border-[#FF671F] bg-orange-50/50 text-[#06038D] ring-2 ring-orange-200'
                  : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
              }`}
            >
              <div className="text-[10px] font-bold uppercase text-[#FF671F]">
                {p.category}
              </div>
              <div className="font-bold text-xs mt-0.5 truncate">{p.name}</div>
              <div className="text-[11px] text-slate-500 mt-1">
                {p.targetMinKb}–{p.targetMaxKb} KB
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Upload & Canvas Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* File Upload Box */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition ${
              originalImageUrl
                ? 'border-emerald-300 bg-emerald-50/20 hover:bg-emerald-50/40'
                : 'border-slate-300 bg-white hover:border-[#FF671F] hover:bg-orange-50/20'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-[#FF671F]">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <span className="font-bold text-slate-800 text-sm">
                  {selectedFile ? 'Change Selected Image' : 'Upload Passport Photo or Signature'}
                </span>
                <p className="text-xs text-slate-500 mt-1">
                  Drag and drop JPG, PNG, or WEBP file (Max 10MB)
                </p>
              </div>
              {selectedFile && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
                  <span>{selectedFile.name}</span>
                  <span className="text-slate-400">({originalSizeKb} KB)</span>
                </div>
              )}
            </div>
          </div>

          {/* Dimensions & Quality Controls */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#FF671F]" />
              <span>Target Dimensions & File Size Range</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">
                  Target Width (px)
                </label>
                <input
                  type="number"
                  value={targetWidth}
                  onChange={(e) => setTargetWidth(Number(e.target.value) || 100)}
                  className="w-full text-sm font-bold text-slate-900 border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#FF671F]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">
                  Target Height (px)
                </label>
                <input
                  type="number"
                  value={targetHeight}
                  onChange={(e) => setTargetHeight(Number(e.target.value) || 100)}
                  className="w-full text-sm font-bold text-slate-900 border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#FF671F]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">
                  Min KB Allowed
                </label>
                <input
                  type="number"
                  value={targetMinKb}
                  onChange={(e) => setTargetMinKb(Number(e.target.value) || 5)}
                  className="w-full text-sm font-bold text-slate-900 border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#FF671F]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">
                  Max KB Allowed
                </label>
                <input
                  type="number"
                  value={targetMaxKb}
                  onChange={(e) => setTargetMaxKb(Number(e.target.value) || 50)}
                  className="w-full text-sm font-bold text-slate-900 border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#FF671F]"
                />
              </div>
            </div>

            <button
              onClick={handleRecompress}
              disabled={!originalImageUrl || isProcessing}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition"
            >
              <RefreshCw className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
              <span>{isProcessing ? 'Processing Canvas...' : 'Re-Compress & Apply Settings'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Comparison & Download */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl space-y-6">
            <h3 className="text-base font-bold text-white flex items-center justify-between">
              <span>Preview & Compliance Status</span>
              {compressedSizeKb > 0 && (
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1 ${
                    isSizeInTargetRange
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {isSizeInTargetRange ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Govt Compliant ({compressedSizeKb} KB)</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{compressedSizeKb} KB (Adjust limits)</span>
                    </>
                  )}
                </span>
              )}
            </h3>

            {/* Preview Area */}
            <div className="aspect-4/3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center p-4 overflow-hidden relative">
              {compressedDataUrl ? (
                <img
                  src={compressedDataUrl}
                  alt="Resized Govt Preview"
                  className="max-h-full max-w-full object-contain rounded shadow-lg border border-slate-700"
                />
              ) : (
                <div className="text-center text-slate-500 space-y-2">
                  <ImageIcon className="w-10 h-10 mx-auto stroke-1" />
                  <p className="text-xs">Upload an image to see live compressed preview</p>
                </div>
              )}
            </div>

            {/* Metrics Breakdown */}
            {compressedDataUrl && (
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                  <span className="text-slate-400 block">Original Size:</span>
                  <strong className="text-slate-200 text-sm font-bold">
                    {originalSizeKb} KB ({originalDimensions.w}×{originalDimensions.h})
                  </strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                  <span className="text-slate-400 block">Output Result:</span>
                  <strong className="text-emerald-400 text-sm font-bold">
                    {compressedSizeKb} KB ({targetWidth}×{targetHeight})
                  </strong>
                </div>
              </div>
            )}

            {/* Download CTA */}
            <button
              onClick={handleDownload}
              disabled={!compressedDataUrl || isProcessing}
              className="w-full py-3.5 rounded-xl bg-[#046A38] hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg btn-3d-green transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Form-Ready JPG ({compressedSizeKb} KB)</span>
            </button>

            <div className="text-[11px] text-slate-400 text-center leading-relaxed">
              Compatible with UPSC, SSC, IBPS, State PSC, NTA, GATE, Railway Recruitment Boards (RRB), and all Indian state recruitment portals.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
