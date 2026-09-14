import React, { useState, useRef } from 'react';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import {
  QrCode,
  Download,
  Copy,
  Check,
  Link,
  Wifi,
  CreditCard,
  MessageSquare,
  Sparkles,
  Sliders,
} from 'lucide-react';

type QrType = 'url' | 'text' | 'upi' | 'wifi' | 'whatsapp';

export const QrCodeSuite: React.FC = () => {
  const [qrType, setQrType] = useState<QrType>('url');
  const [urlInput, setUrlInput] = useState<string>('https://aitoolshub.co.in');
  const [textInput, setTextInput] = useState<string>('Welcome to aitoolshub tools suite');

  // UPI State
  const [upiVpa, setUpiVpa] = useState<string>('username@okhdfcbank');
  const [upiName, setUpiName] = useState<string>('Sujan Mondal');
  const [upiAmount, setUpiAmount] = useState<string>('500');

  // WiFi State
  const [wifiSsid, setWifiSsid] = useState<string>('MyHomeFiber_5G');
  const [wifiPass, setWifiPass] = useState<string>('SecurePassword123');
  const [wifiEncryption, setWifiEncryption] = useState<string>('WPA');

  // WhatsApp State
  const [waPhone, setWaPhone] = useState<string>('919876543210');
  const [waMessage, setWaMessage] = useState<string>('Hi, I need assistance with your services.');

  // Visual Customization
  const [fgColor, setFgColor] = useState<string>('#0F172A');
  const [bgColor, setBgColor] = useState<string>('#FFFFFF');
  const [qrSize, setQrSize] = useState<number>(240);
  const [copied, setCopied] = useState<boolean>(false);

  const qrCanvasRef = useRef<HTMLDivElement | null>(null);

  // Compute Raw String to Encode
  const getQrValue = () => {
    switch (qrType) {
      case 'url':
        return urlInput.trim();
      case 'upi':
        return `upi://pay?pa=${encodeURIComponent(upiVpa)}&pn=${encodeURIComponent(
          upiName
        )}&am=${encodeURIComponent(upiAmount)}&cu=INR`;
      case 'wifi':
        return `WIFI:S:${wifiSsid};T:${wifiEncryption};P:${wifiPass};;`;
      case 'whatsapp':
        return `https://wa.me/${waPhone.replace(/\D/g, '')}?text=${encodeURIComponent(waMessage)}`;
      case 'text':
      default:
        return textInput;
    }
  };

  const qrValue = getQrValue();

  // Download Canvas as PNG
  const downloadPng = () => {
    const canvas = qrCanvasRef.current?.querySelector('canvas');
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `aitoolshub_qrcode_${qrType}_${Date.now()}.png`;
    link.href = url;
    link.click();
  };

  const copyQrText = () => {
    navigator.clipboard.writeText(qrValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between shadow-md text-xs">
        <div className="flex items-center gap-2">
          <QrCode className="w-5 h-5 text-[#FF671F]" />
          <span>
            <strong className="text-white">Universal High-Resolution QR Generator:</strong> Create scannable QR codes for websites, UPI payments (GPay, PhonePe, Paytm), home WiFi, and WhatsApp.
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: QR Content Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            {/* QR Type Tabs */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Select QR Code Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: 'url', label: 'Website URL', icon: Link },
                  { id: 'upi', label: 'UPI Payment', icon: CreditCard },
                  { id: 'wifi', label: 'WiFi Access', icon: Wifi },
                  { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
                  { id: 'text', label: 'Plain Text', icon: QrCode },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setQrType(item.id as QrType)}
                      className={`p-2.5 rounded-xl text-xs font-bold border flex flex-col items-center gap-1.5 transition cursor-pointer ${
                        qrType === item.id
                          ? 'bg-orange-50 text-[#FF671F] border-[#FF671F] ring-1 ring-[#FF671F]'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Type Specific Form Inputs */}
            {qrType === 'url' && (
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Destination Website Link
                </label>
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="w-full text-xs font-bold border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:border-[#FF671F]"
                />
              </div>
            )}

            {qrType === 'upi' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      UPI ID / VPA
                    </label>
                    <input
                      type="text"
                      value={upiVpa}
                      onChange={(e) => setUpiVpa(e.target.value)}
                      placeholder="e.g. name@okhdfcbank"
                      className="w-full text-xs font-mono font-bold border border-slate-300 rounded-lg p-2 focus:outline-none focus:border-[#FF671F]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Payee Name
                    </label>
                    <input
                      type="text"
                      value={upiName}
                      onChange={(e) => setUpiName(e.target.value)}
                      placeholder="Your Store / Name"
                      className="w-full text-xs font-bold border border-slate-300 rounded-lg p-2 focus:outline-none focus:border-[#FF671F]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Amount (Optional in INR)
                  </label>
                  <input
                    type="number"
                    value={upiAmount}
                    onChange={(e) => setUpiAmount(e.target.value)}
                    className="w-full text-xs font-bold border border-slate-300 rounded-lg p-2 focus:outline-none focus:border-[#FF671F]"
                  />
                </div>
              </div>
            )}

            {qrType === 'wifi' && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Network Name (SSID)
                  </label>
                  <input
                    type="text"
                    value={wifiSsid}
                    onChange={(e) => setWifiSsid(e.target.value)}
                    className="w-full text-xs font-bold border border-slate-300 rounded-lg p-2 focus:outline-none focus:border-[#FF671F]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      WiFi Password
                    </label>
                    <input
                      type="text"
                      value={wifiPass}
                      onChange={(e) => setWifiPass(e.target.value)}
                      className="w-full text-xs font-bold border border-slate-300 rounded-lg p-2 focus:outline-none focus:border-[#FF671F]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Security Type
                    </label>
                    <select
                      value={wifiEncryption}
                      onChange={(e) => setWifiEncryption(e.target.value)}
                      className="w-full text-xs font-bold border border-slate-300 rounded-lg p-2"
                    >
                      <option value="WPA">WPA / WPA2 / WPA3</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">None (Open)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {qrType === 'whatsapp' && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Phone Number (With Country Code, e.g. 919876543210)
                  </label>
                  <input
                    type="text"
                    value={waPhone}
                    onChange={(e) => setWaPhone(e.target.value)}
                    className="w-full text-xs font-bold border border-slate-300 rounded-lg p-2 focus:outline-none focus:border-[#FF671F]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Pre-filled Message
                  </label>
                  <textarea
                    rows={2}
                    value={waMessage}
                    onChange={(e) => setWaMessage(e.target.value)}
                    className="w-full text-xs border border-slate-300 rounded-lg p-2 focus:outline-none focus:border-[#FF671F]"
                  />
                </div>
              </div>
            )}

            {qrType === 'text' && (
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Text or Code Snippet
                </label>
                <textarea
                  rows={3}
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="w-full text-xs font-medium border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:border-[#FF671F]"
                />
              </div>
            )}

            {/* Color Styling */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    QR Color
                  </label>
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-8 h-8 rounded border border-slate-300 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Background
                  </label>
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-8 h-8 rounded border border-slate-300 cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setFgColor('#06038D');
                    setBgColor('#FFFFFF');
                  }}
                  className="px-2.5 py-1 rounded bg-blue-50 text-[#06038D] text-[11px] font-bold"
                >
                  Navy Blue
                </button>
                <button
                  onClick={() => {
                    setFgColor('#FF671F');
                    setBgColor('#FFFFFF');
                  }}
                  className="px-2.5 py-1 rounded bg-orange-50 text-[#FF671F] text-[11px] font-bold"
                >
                  Saffron
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Preview Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl space-y-6 text-center">
            <h3 className="text-base font-bold text-white">
              Live Scannable QR Code
            </h3>

            {/* Canvas Container */}
            <div
              ref={qrCanvasRef}
              className="inline-block p-4 rounded-2xl bg-white shadow-2xl mx-auto border-4 border-slate-800"
            >
              <QRCodeCanvas
                value={qrValue || 'https://aitoolshub.co.in'}
                size={qrSize}
                fgColor={fgColor}
                bgColor={bgColor}
                level="H"
                includeMargin={false}
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={downloadPng}
                className="w-full py-3.5 rounded-xl bg-[#046A38] hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg btn-3d-green transition cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download High-Res PNG</span>
              </button>

              <button
                onClick={copyQrText}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Payload Copied!' : 'Copy Raw Text / URI'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
