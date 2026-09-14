import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Download,
  Printer,
  Sliders,
  Grid,
  Maximize2,
  RefreshCw,
  CheckCircle,
  Scissors,
  ShieldCheck,
  ZoomIn,
  ZoomOut,
  RotateCw,
} from 'lucide-react';

interface PhotoPreset {
  id: string;
  name: string;
  widthMm: number;
  heightMm: number;
  widthPx: number;
  heightPx: number;
  bgStandard: string;
  country: string;
}

const PASSPORT_PRESETS: PhotoPreset[] = [
  {
    id: 'india-passport',
    name: 'India Passport / OCI',
    widthMm: 35,
    heightMm: 45,
    widthPx: 413,
    heightPx: 531,
    bgStandard: 'Plain White / Off-white',
    country: 'India',
  },
  {
    id: 'us-visa',
    name: 'US Visa / Passport (2x2")',
    widthMm: 51,
    heightMm: 51,
    widthPx: 600,
    heightPx: 600,
    bgStandard: 'Pure White Only',
    country: 'United States',
  },
  {
    id: 'schengen-visa',
    name: 'Schengen / Europe Visa',
    widthMm: 35,
    heightMm: 45,
    widthPx: 413,
    heightPx: 531,
    bgStandard: 'Light Grey / Plain White',
    country: 'Schengen Area',
  },
  {
    id: 'pan-card',
    name: 'India PAN Card Photo',
    widthMm: 25,
    heightMm: 35,
    widthPx: 295,
    heightPx: 413,
    bgStandard: 'White background',
    country: 'India NSDL',
  },
  {
    id: 'uk-passport',
    name: 'UK Passport Photo',
    widthMm: 35,
    heightMm: 45,
    widthPx: 413,
    heightPx: 531,
    bgStandard: 'Plain Cream or Light Grey',
    country: 'United Kingdom',
  },
];

type SheetType = 'a4' | '4x6';

export const PassportPhotoMaker: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [activePreset, setActivePreset] = useState<string>('india-passport');
  const [sheetType, setSheetType] = useState<SheetType>('a4');
  const [copiesCount, setCopiesCount] = useState<number>(8);
  const [showCutLines, setShowCutLines] = useState<boolean>(true);
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');
  
  // Adjustments
  const [zoom, setZoom] = useState<number>(1);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [rotation, setRotation] = useState<number>(0);

  const [singlePhotoDataUrl, setSinglePhotoDataUrl] = useState<string | null>(null);
  const [sheetDataUrl, setSheetDataUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const singleCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const sheetCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageObjRef = useRef<HTMLImageElement | null>(null);

  const currentPreset = PASSPORT_PRESETS.find((p) => p.id === activePreset) || PASSPORT_PRESETS[0];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      const url = event.target?.result as string;
      setOriginalImageUrl(url);

      const img = new Image();
      img.onload = () => {
        imageObjRef.current = img;
        // Reset transform
        setZoom(1);
        setOffsetX(0);
        setOffsetY(0);
        setRotation(0);
      };
      img.src = url;
    };
    reader.readAsDataURL(file);
  };

  // Re-render single photo and printable sheet
  useEffect(() => {
    if (!imageObjRef.current || !singleCanvasRef.current || !sheetCanvasRef.current) return;

    const img = imageObjRef.current;
    const singleCanvas = singleCanvasRef.current;
    const singleCtx = singleCanvas.getContext('2d');
    if (!singleCtx) return;

    // 1. Draw Single Passport Photo
    singleCanvas.width = currentPreset.widthPx;
    singleCanvas.height = currentPreset.heightPx;

    singleCtx.fillStyle = backgroundColor;
    singleCtx.fillRect(0, 0, singleCanvas.width, singleCanvas.height);

    // Filter adjustments
    singleCtx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;

    singleCtx.save();
    singleCtx.translate(singleCanvas.width / 2 + offsetX, singleCanvas.height / 2 + offsetY);
    singleCtx.rotate((rotation * Math.PI) / 180);

    // Calculate aspect ratio covering
    const imgAspect = img.width / img.height;
    const targetAspect = singleCanvas.width / singleCanvas.height;
    let drawW: number;
    let drawH: number;

    if (imgAspect > targetAspect) {
      drawH = singleCanvas.height * zoom;
      drawW = drawH * imgAspect;
    } else {
      drawW = singleCanvas.width * zoom;
      drawH = drawW / imgAspect;
    }

    singleCtx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
    singleCtx.restore();

    // Reset filter
    singleCtx.filter = 'none';

    // Optional border
    if (showCutLines) {
      singleCtx.strokeStyle = '#cbd5e1';
      singleCtx.lineWidth = 2;
      singleCtx.strokeRect(0, 0, singleCanvas.width, singleCanvas.height);
    }

    const singleUrl = singleCanvas.toDataURL('image/jpeg', 0.95);
    setSinglePhotoDataUrl(singleUrl);

    // 2. Draw Multi-Copy Printable Sheet
    const sheetCanvas = sheetCanvasRef.current;
    const sheetCtx = sheetCanvas.getContext('2d');
    if (!sheetCtx) return;

    // A4 sheet: 2480 x 3508 (300 DPI) or 1240 x 1754 (150 DPI)
    // 4x6 sheet: 1200 x 1800 (300 DPI) or 600 x 900 (150 DPI)
    const isA4 = sheetType === 'a4';
    sheetCanvas.width = isA4 ? 1240 : 900;
    sheetCanvas.height = isA4 ? 1754 : 600;

    sheetCtx.fillStyle = '#ffffff';
    sheetCtx.fillRect(0, 0, sheetCanvas.width, sheetCanvas.height);

    // Header label on paper
    sheetCtx.fillStyle = '#64748b';
    sheetCtx.font = '16px sans-serif';
    sheetCtx.fillText(
      `aitoolshub.co.in - ${currentPreset.name} (${currentPreset.widthMm}x${currentPreset.heightMm}mm) · 100% Client-Side Private`,
      40,
      40
    );

    // Grid layout calculations
    const pW = currentPreset.widthPx * 0.65; // scale down for 150dpi layout preview
    const pH = currentPreset.heightPx * 0.65;
    const gapX = 24;
    const gapY = 28;
    const startX = 50;
    const startY = 70;

    const maxCols = Math.floor((sheetCanvas.width - startX * 2 + gapX) / (pW + gapX));
    const totalToDraw = Math.min(copiesCount, isA4 ? 32 : 12);

    for (let i = 0; i < totalToDraw; i++) {
      const col = i % maxCols;
      const row = Math.floor(i / maxCols);
      const x = startX + col * (pW + gapX);
      const y = startY + row * (pH + gapY);

      sheetCtx.drawImage(singleCanvas, x, y, pW, pH);

      if (showCutLines) {
        sheetCtx.strokeStyle = '#94a3b8';
        sheetCtx.setLineDash([4, 4]);
        sheetCtx.lineWidth = 1;
        sheetCtx.strokeRect(x - 2, y - 2, pW + 4, pH + 4);
        sheetCtx.setLineDash([]);
      }
    }

    const sheetUrl = sheetCanvas.toDataURL('image/jpeg', 0.92);
    setSheetDataUrl(sheetUrl);
  }, [
    originalImageUrl,
    activePreset,
    sheetType,
    copiesCount,
    showCutLines,
    backgroundColor,
    zoom,
    offsetX,
    offsetY,
    brightness,
    contrast,
    rotation,
    currentPreset,
  ]);

  const downloadSinglePhoto = () => {
    if (!singlePhotoDataUrl) return;
    const a = document.createElement('a');
    a.href = singlePhotoDataUrl;
    a.download = `passport-photo-${currentPreset.id}.jpg`;
    a.click();
  };

  const downloadPrintableSheet = () => {
    if (!sheetDataUrl) return;
    const a = document.createElement('a');
    a.href = sheetDataUrl;
    a.download = `passport-printable-${sheetType}-sheet.jpg`;
    a.click();
  };

  const handlePrintSheet = () => {
    if (!sheetDataUrl) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Passport Photo Sheet - aitoolshub</title>
          <style>
            @page { size: auto; margin: 5mm; }
            body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; }
            img { max-width: 100%; height: auto; display: block; }
          </style>
        </head>
        <body onload="window.print();window.close();">
          <img src="${sheetDataUrl}" />
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-8">
      {/* Hidden canvases for rendering */}
      <canvas ref={singleCanvasRef} className="hidden" />
      <canvas ref={sheetCanvasRef} className="hidden" />

      {/* Preset Selector Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <span className="px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-[#FF671F]">
            100% In-Browser · No Photos Uploaded
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
            Passport Photo & Multi-Copy A4 Print Generator
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Crop, adjust background, and print ready-to-cut 35x45mm or 2x2" photo sheets for studio quality at home.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2.5 rounded-xl font-bold text-xs text-white btn-3d-saffron flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Photo</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-5">
          {/* Preset Buttons */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
              Standard Photo Preset
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PASSPORT_PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActivePreset(p.id)}
                  className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                    activePreset === p.id
                      ? 'border-[#FF671F] bg-orange-50/50 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="font-bold text-xs text-slate-900">{p.name}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {p.widthMm} × {p.heightMm} mm ({p.country})
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Photo Position & Adjustments */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#FF671F]" />
              <span>Scale & Alignment</span>
            </h3>

            {/* Zoom Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                <span>Face Zoom</span>
                <span>{Math.round(zoom * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full accent-[#FF671F]"
              />
            </div>

            {/* Vertical / Horizontal Pan */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">Shift Left / Right</label>
                <input
                  type="range"
                  min="-150"
                  max="150"
                  value={offsetX}
                  onChange={(e) => setOffsetX(parseInt(e.target.value))}
                  className="w-full accent-slate-600"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">Shift Up / Down</label>
                <input
                  type="range"
                  min="-150"
                  max="150"
                  value={offsetY}
                  onChange={(e) => setOffsetY(parseInt(e.target.value))}
                  className="w-full accent-slate-600"
                />
              </div>
            </div>

            {/* Brightness & Contrast */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200">
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-500 mb-1">
                  <span>Brightness</span>
                  <span>{brightness}%</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="140"
                  value={brightness}
                  onChange={(e) => setBrightness(parseInt(e.target.value))}
                  className="w-full accent-[#046A38]"
                />
              </div>
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-500 mb-1">
                  <span>Contrast</span>
                  <span>{contrast}%</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="140"
                  value={contrast}
                  onChange={(e) => setContrast(parseInt(e.target.value))}
                  className="w-full accent-[#046A38]"
                />
              </div>
            </div>

            {/* Rotate & Reset Button */}
            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => setRotation((r) => (r + 90) % 360)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Rotate 90°</span>
              </button>

              <button
                onClick={() => {
                  setZoom(1);
                  setOffsetX(0);
                  setOffsetY(0);
                  setBrightness(100);
                  setContrast(100);
                  setRotation(0);
                }}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Alignment</span>
              </button>
            </div>
          </div>

          {/* Printable Sheet Settings */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Grid className="w-3.5 h-3.5 text-[#06038D]" />
              <span>Multi-Copy Sheet Layout</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Paper Size</label>
                <select
                  value={sheetType}
                  onChange={(e) => setSheetType(e.target.value as SheetType)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800"
                >
                  <option value="a4">A4 Full Sheet (210×297mm)</option>
                  <option value="4x6">4×6 Inch Photo Paper</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Number of Copies</label>
                <select
                  value={copiesCount}
                  onChange={(e) => setCopiesCount(parseInt(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800"
                >
                  <option value={4}>4 Photos</option>
                  <option value={6}>6 Photos</option>
                  <option value={8}>8 Photos (Recommended)</option>
                  <option value={12}>12 Photos</option>
                  <option value={16}>16 Photos</option>
                  <option value={24}>24 Photos</option>
                  <option value={32}>32 Photos (Full A4)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showCutLines}
                  onChange={(e) => setShowCutLines(e.target.checked)}
                  className="rounded text-[#FF671F] focus:ring-[#FF671F]"
                />
                <span className="flex items-center gap-1">
                  <Scissors className="w-3.5 h-3.5 text-slate-400" />
                  <span>Include Scissor Cut Borders</span>
                </span>
              </label>

              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 text-[11px]">BG:</span>
                <button
                  onClick={() => setBackgroundColor('#ffffff')}
                  className={`w-5 h-5 rounded-full border ${backgroundColor === '#ffffff' ? 'ring-2 ring-[#FF671F]' : ''} bg-white`}
                  title="White"
                />
                <button
                  onClick={() => setBackgroundColor('#e2e8f0')}
                  className={`w-5 h-5 rounded-full border ${backgroundColor === '#e2e8f0' ? 'ring-2 ring-[#FF671F]' : ''} bg-slate-200`}
                  title="Light Grey"
                />
                <button
                  onClick={() => setBackgroundColor('#e0f2fe')}
                  className={`w-5 h-5 rounded-full border ${backgroundColor === '#e0f2fe' ? 'ring-2 ring-[#FF671F]' : ''} bg-sky-100`}
                  title="Light Blue"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live Visual Preview Column */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            {/* Single Photo Zoomed Preview */}
            <div className="md:col-span-5 bg-slate-100 rounded-2xl p-4 border border-slate-200 text-center flex flex-col items-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                Single Photo ({currentPreset.widthMm}×{currentPreset.heightMm}mm)
              </span>

              {singlePhotoDataUrl ? (
                <div className="relative group">
                  <img
                    src={singlePhotoDataUrl}
                    alt="Passport Preview"
                    className="rounded-lg shadow-md max-h-56 object-contain border border-slate-300"
                  />
                  <div className="absolute inset-0 border-2 border-dashed border-red-400/40 pointer-events-none rounded-lg" />
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-36 h-48 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-3 text-slate-400 cursor-pointer hover:border-[#FF671F] hover:bg-orange-50/40 transition"
                >
                  <ImageIcon className="w-8 h-8 text-slate-300 mb-2" />
                  <span className="text-xs font-bold text-center">Upload Photo</span>
                  <span className="text-[10px] text-slate-400 mt-1">JPEG or PNG</span>
                </div>
              )}

              <button
                onClick={downloadSinglePhoto}
                disabled={!singlePhotoDataUrl}
                className="mt-4 w-full py-2 px-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download 1 Photo (JPEG)</span>
              </button>
            </div>

            {/* Full Printable A4 / 4x6 Sheet Preview */}
            <div className="md:col-span-7 bg-slate-900 rounded-2xl p-4 border border-slate-800 text-center flex flex-col items-center">
              <div className="flex items-center justify-between w-full mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {sheetType === 'a4' ? 'A4 Multi-Copy Sheet' : '4x6" Photo Print'}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-emerald-400 font-mono font-bold">
                  {copiesCount} Copies
                </span>
              </div>

              {sheetDataUrl ? (
                <img
                  src={sheetDataUrl}
                  alt="Sheet Preview"
                  className="rounded shadow-xl max-h-56 w-auto object-contain border border-slate-700 bg-white"
                />
              ) : (
                <div className="w-full h-48 bg-slate-800/80 rounded-xl flex flex-col items-center justify-center text-slate-500 border border-slate-700">
                  <Grid className="w-8 h-8 text-slate-600 mb-2" />
                  <span className="text-xs font-bold">Multi-Photo Sheet Preview</span>
                  <span className="text-[10px] text-slate-400">Auto-generated upon upload</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 w-full mt-4">
                <button
                  onClick={downloadPrintableSheet}
                  disabled={!sheetDataUrl}
                  className="py-2.5 px-3 rounded-xl text-white font-bold text-xs btn-3d-saffron flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Sheet</span>
                </button>

                <button
                  onClick={handlePrintSheet}
                  disabled={!sheetDataUrl}
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Printer className="w-3.5 h-3.5 text-orange-400" />
                  <span>Print Sheet</span>
                </button>
              </div>
            </div>
          </div>

          {/* Privacy & Studio Quality Assurance */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#046A38] shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">100% Privacy Guarantee & Zero Cloud Upload:</strong>
              Your biometric photos never leave your device. All alignment, background color blending, and A4 multi-image layout calculations are processed locally inside your browser's HTML5 Canvas sandbox.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
