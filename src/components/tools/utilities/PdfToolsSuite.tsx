import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { jsPDF } from 'jspdf';
import {
  FileText,
  Layers,
  Scissors,
  Image as ImageIcon,
  Download,
  Upload,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Trash2,
} from 'lucide-react';

export const PdfToolsSuite: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'merge' | 'split' | 'image-to-pdf'>('merge');

  // State for Merge
  const [mergeFiles, setMergeFiles] = useState<File[]>([]);
  const [isMerging, setIsMerging] = useState<boolean>(false);

  // State for Split
  const [splitFile, setSplitFile] = useState<File | null>(null);
  const [splitPagesCount, setSplitPagesCount] = useState<number>(0);
  const [splitFromPage, setSplitFromPage] = useState<number>(1);
  const [splitToPage, setSplitToPage] = useState<number>(1);
  const [isSplitting, setIsSplitting] = useState<boolean>(false);

  // State for Image-to-PDF
  const [imagesForPdf, setImagesForPdf] = useState<File[]>([]);
  const [isConvertingImages, setIsConvertingImages] = useState<boolean>(false);

  // Message feedback
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // MERGE HANDLER
  const handleMergeFiles = async () => {
    if (mergeFiles.length < 2) {
      setStatusMessage({ type: 'error', text: 'Please upload at least 2 PDF files to merge.' });
      return;
    }

    setIsMerging(true);
    setStatusMessage(null);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of mergeFiles) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes as Uint8Array], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `merged_document_${Date.now()}.pdf`;
      link.click();

      setStatusMessage({ type: 'success', text: 'PDFs merged successfully!' });
    } catch (err) {
      console.error(err);
      setStatusMessage({ type: 'error', text: 'Failed to merge PDFs. Ensure files are not password-protected.' });
    } finally {
      setIsMerging(false);
    }
  };

  // SPLIT HANDLER
  const handleSplitFileSelected = async (file: File) => {
    setSplitFile(file);
    setStatusMessage(null);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const count = pdf.getPageCount();
      setSplitPagesCount(count);
      setSplitFromPage(1);
      setSplitToPage(count);
    } catch (err) {
      console.error(err);
      setStatusMessage({ type: 'error', text: 'Could not inspect PDF. File may be encrypted.' });
    }
  };

  const handleExecuteSplit = async () => {
    if (!splitFile || splitPagesCount === 0) return;
    setIsSplitting(true);
    setStatusMessage(null);

    try {
      const arrayBuffer = await splitFile.arrayBuffer();
      const sourcePdf = await PDFDocument.load(arrayBuffer);
      const subPdf = await PDFDocument.create();

      const startIdx = Math.max(0, splitFromPage - 1);
      const endIdx = Math.min(splitPagesCount - 1, splitToPage - 1);
      const pageIndices: number[] = [];
      for (let i = startIdx; i <= endIdx; i++) {
        pageIndices.push(i);
      }

      const copiedPages = await subPdf.copyPages(sourcePdf, pageIndices);
      copiedPages.forEach((page) => subPdf.addPage(page));

      const subPdfBytes = await subPdf.save();
      const blob = new Blob([subPdfBytes as Uint8Array], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${splitFile.name.replace('.pdf', '')}_pages_${splitFromPage}_to_${splitToPage}.pdf`;
      link.click();

      setStatusMessage({ type: 'success', text: `Extracted pages ${splitFromPage} to ${splitToPage} successfully!` });
    } catch (err) {
      console.error(err);
      setStatusMessage({ type: 'error', text: 'Error splitting PDF.' });
    } finally {
      setIsSplitting(false);
    }
  };

  // IMAGE TO PDF HANDLER (using jsPDF)
  const handleImagesToPdf = async () => {
    if (imagesForPdf.length === 0) {
      setStatusMessage({ type: 'error', text: 'Please select at least 1 image to convert.' });
      return;
    }

    setIsConvertingImages(true);
    setStatusMessage(null);

    try {
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

      for (let i = 0; i < imagesForPdf.length; i++) {
        const file = imagesForPdf[i];
        const dataUrl: string = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });

        if (i > 0) doc.addPage();
        // Place image scaled to fit A4 (210mm x 297mm) with 10mm margins
        doc.addImage(dataUrl, 'JPEG', 10, 10, 190, 260, undefined, 'FAST');
      }

      doc.save(`converted_images_${Date.now()}.pdf`);
      setStatusMessage({ type: 'success', text: 'Images converted to PDF successfully!' });
    } catch (err) {
      console.error(err);
      setStatusMessage({ type: 'error', text: 'Error converting images to PDF.' });
    } finally {
      setIsConvertingImages(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Privacy Guarantee */}
      <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between shadow-md text-xs">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#FF671F]" />
          <span>
            <strong className="text-white">Zero Server-Side Storage:</strong> All PDF merges, page splits, and image conversions happen 100% in your browser using WebAssembly and client-side memory.
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-4">
        <button
          onClick={() => {
            setActiveTab('merge');
            setStatusMessage(null);
          }}
          className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition cursor-pointer ${
            activeTab === 'merge'
              ? 'border-[#FF671F] text-[#FF671F]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Merge Multiple PDFs</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('split');
            setStatusMessage(null);
          }}
          className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition cursor-pointer ${
            activeTab === 'split'
              ? 'border-[#06038D] text-[#06038D]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Scissors className="w-4 h-4" />
          <span>Split PDF Pages</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('image-to-pdf');
            setStatusMessage(null);
          }}
          className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition cursor-pointer ${
            activeTab === 'image-to-pdf'
              ? 'border-[#046A38] text-[#046A38]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Images to PDF</span>
        </button>
      </div>

      {/* Status Feedback */}
      {statusMessage && (
        <div
          className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* TAB 1: MERGE PDF */}
      {activeTab === 'merge' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center bg-slate-50/50 hover:bg-orange-50/20 hover:border-[#FF671F] transition cursor-pointer relative">
            <input
              type="file"
              multiple
              accept="application/pdf"
              onChange={(e) => {
                if (e.target.files) {
                  setMergeFiles(Array.from(e.target.files));
                }
              }}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <Upload className="w-10 h-10 text-[#FF671F] mx-auto mb-2" />
            <div className="text-sm font-bold text-slate-800">
              Click or Drag & Drop PDF files to Merge
            </div>
            <p className="text-xs text-slate-500 mt-1">Select 2 or more PDF documents</p>
          </div>

          {mergeFiles.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Selected Files ({mergeFiles.length})
              </h4>
              <div className="space-y-2">
                {mergeFiles.map((f, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                  >
                    <span className="font-semibold text-slate-800 truncate max-w-sm">
                      {i + 1}. {f.name}
                    </span>
                    <span className="text-slate-400">{Math.round(f.size / 1024)} KB</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleMergeFiles}
                disabled={isMerging}
                className="w-full py-3 rounded-xl bg-[#046A38] hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md btn-3d-green transition cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${isMerging ? 'animate-spin' : ''}`} />
                <span>{isMerging ? 'Merging Documents...' : 'Merge & Download Single PDF'}</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SPLIT PDF */}
      {activeTab === 'split' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center bg-slate-50/50 hover:bg-indigo-50/20 hover:border-[#06038D] transition cursor-pointer relative">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleSplitFileSelected(e.target.files[0]);
                }
              }}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <Scissors className="w-10 h-10 text-[#06038D] mx-auto mb-2" />
            <div className="text-sm font-bold text-slate-800">
              {splitFile ? `Selected: ${splitFile.name}` : 'Select a PDF to Extract or Split Pages'}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {splitPagesCount > 0 ? `Total Pages: ${splitPagesCount}` : 'Upload any multi-page PDF'}
            </p>
          </div>

          {splitPagesCount > 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    From Page
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={splitPagesCount}
                    value={splitFromPage}
                    onChange={(e) => setSplitFromPage(Number(e.target.value) || 1)}
                    className="w-full text-xs font-bold border border-slate-300 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    To Page
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={splitPagesCount}
                    value={splitToPage}
                    onChange={(e) => setSplitToPage(Number(e.target.value) || 1)}
                    className="w-full text-xs font-bold border border-slate-300 rounded-lg p-2"
                  />
                </div>
              </div>

              <button
                onClick={handleExecuteSplit}
                disabled={isSplitting}
                className="w-full py-3 rounded-xl bg-[#06038D] hover:bg-blue-900 disabled:opacity-50 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{isSplitting ? 'Extracting Pages...' : 'Extract & Download PDF'}</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: IMAGE TO PDF */}
      {activeTab === 'image-to-pdf' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center bg-slate-50/50 hover:bg-emerald-50/20 hover:border-[#046A38] transition cursor-pointer relative">
            <input
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp,image/jpg"
              onChange={(e) => {
                if (e.target.files) {
                  setImagesForPdf(Array.from(e.target.files));
                }
              }}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <ImageIcon className="w-10 h-10 text-[#046A38] mx-auto mb-2" />
            <div className="text-sm font-bold text-slate-800">
              Select Photos or Scanned Documents
            </div>
            <p className="text-xs text-slate-500 mt-1">Combine multiple JPG or PNG images into a clean A4 PDF</p>
          </div>

          {imagesForPdf.length > 0 && (
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-slate-600">
                <span>{imagesForPdf.length} Images Selected</span>
                <button
                  onClick={() => setImagesForPdf([])}
                  className="text-red-600 hover:text-red-700 cursor-pointer"
                >
                  Clear All
                </button>
              </div>

              <button
                onClick={handleImagesToPdf}
                disabled={isConvertingImages}
                className="w-full py-3 rounded-xl bg-[#046A38] hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md btn-3d-green transition cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{isConvertingImages ? 'Compiling PDF...' : 'Convert Images to Single PDF'}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
