import React, { useState, useMemo } from 'react';
import { jsPDF } from 'jspdf';
import {
  FileText,
  Plus,
  Trash2,
  Download,
  Building,
  User,
  Percent,
  CheckCircle,
} from 'lucide-react';

interface InvoiceItem {
  id: string;
  description: string;
  hsnSac: string;
  quantity: number;
  rate: number;
  gstRate: number; // 0, 5, 12, 18, 28
}

export const GstInvoiceGenerator: React.FC = () => {
  // Business Details
  const [businessName, setBusinessName] = useState<string>('Apex Digital Solutions LLP');
  const [businessGstin, setBusinessGstin] = useState<string>('27AABCA1234F1Z8');
  const [businessAddress, setBusinessAddress] = useState<string>('102, Tech Park, Andheri East, Mumbai, Maharashtra 400069');

  // Client Details
  const [clientName, setClientName] = useState<string>('Skyline Retailers Pvt Ltd');
  const [clientGstin, setClientGstin] = useState<string>('27AACCS9876E1ZT');
  const [clientAddress, setClientAddress] = useState<string>('404, Bandra Kurla Complex, Mumbai, MH 400051');

  // Invoice Meta
  const [invoiceNumber, setInvoiceNumber] = useState<string>('INV-2026-089');
  const [invoiceDate, setInvoiceDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isInterState, setIsInterState] = useState<boolean>(false); // Intra-state (CGST+SGST) vs Inter-state (IGST)

  // Items
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: '1',
      description: 'Web Application Development & UI Design Services',
      hsnSac: '998314',
      quantity: 1,
      rate: 75000,
      gstRate: 18,
    },
    {
      id: '2',
      description: 'Cloud Server Infrastructure Maintenance',
      hsnSac: '998315',
      quantity: 3,
      rate: 10000,
      gstRate: 18,
    },
  ]);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Date.now().toString(),
        description: 'Professional Consulting Services',
        hsnSac: '998311',
        quantity: 1,
        rate: 15000,
        gstRate: 18,
      },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((i) => i.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  // Calculations
  const invoiceTotals = useMemo(() => {
    let subtotal = 0;
    let totalCgst = 0;
    let totalSgst = 0;
    let totalIgst = 0;

    items.forEach((item) => {
      const taxable = item.quantity * item.rate;
      subtotal += taxable;
      const taxAmount = taxable * (item.gstRate / 100);

      if (isInterState) {
        totalIgst += taxAmount;
      } else {
        totalCgst += taxAmount / 2;
        totalSgst += taxAmount / 2;
      }
    });

    const grandTotal = subtotal + totalCgst + totalSgst + totalIgst;

    return {
      subtotal,
      totalCgst,
      totalSgst,
      totalIgst,
      totalTax: totalCgst + totalSgst + totalIgst,
      grandTotal,
    };
  }, [items, isInterState]);

  const formatINR = (val: number) =>
    '₹' + Math.round(val).toLocaleString('en-IN');

  // Client-Side PDF Generation via jsPDF
  const generatePdf = () => {
    const doc = new jsPDF();

    // Header Branding
    doc.setFillColor(15, 23, 42); // Navy #0F172A
    doc.rect(0, 0, 210, 25, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('TAX INVOICE', 14, 16);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated via aitoolshub.co.in`, 140, 16);

    // Business Details
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(businessName, 14, 38);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`GSTIN: ${businessGstin}`, 14, 44);
    doc.text(businessAddress, 14, 50, { maxWidth: 90 });

    // Invoice Meta
    doc.setFont('helvetica', 'bold');
    doc.text(`Invoice No: ${invoiceNumber}`, 140, 38);
    doc.setFont('helvetica', 'normal');
    doc.text(`Date: ${invoiceDate}`, 140, 44);
    doc.text(`Tax Type: ${isInterState ? 'Inter-State (IGST)' : 'Intra-State (CGST + SGST)'}`, 140, 50);

    // Billed To
    doc.setDrawColor(226, 232, 240);
    doc.line(14, 60, 196, 60);

    doc.setFont('helvetica', 'bold');
    doc.text('BILLED TO (BUYER):', 14, 68);
    doc.setFont('helvetica', 'normal');
    doc.text(clientName, 14, 74);
    doc.text(`GSTIN: ${clientGstin}`, 14, 80);
    doc.text(clientAddress, 14, 86, { maxWidth: 100 });

    // Table Header
    let y = 100;
    doc.setFillColor(241, 245, 249);
    doc.rect(14, y, 182, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('ITEM DESCRIPTION', 16, y + 5);
    doc.text('HSN/SAC', 85, y + 5);
    doc.text('QTY', 110, y + 5);
    doc.text('RATE (INR)', 125, y + 5);
    doc.text('GST %', 155, y + 5);
    doc.text('TOTAL (INR)', 175, y + 5);

    // Items Rows
    doc.setFont('helvetica', 'normal');
    items.forEach((item) => {
      y += 9;
      const rowTotal = item.quantity * item.rate;
      doc.text(item.description, 16, y + 5, { maxWidth: 65 });
      doc.text(item.hsnSac, 85, y + 5);
      doc.text(item.quantity.toString(), 112, y + 5);
      doc.text(item.rate.toLocaleString('en-IN'), 125, y + 5);
      doc.text(`${item.gstRate}%`, 155, y + 5);
      doc.text(rowTotal.toLocaleString('en-IN'), 175, y + 5);
    });

    // Summary Box
    y += 18;
    doc.line(14, y, 196, y);
    y += 6;

    doc.text(`Subtotal:`, 130, y);
    doc.text(`INR ${invoiceTotals.subtotal.toLocaleString('en-IN')}`, 175, y);

    if (isInterState) {
      y += 6;
      doc.text(`IGST:`, 130, y);
      doc.text(`INR ${Math.round(invoiceTotals.totalIgst).toLocaleString('en-IN')}`, 175, y);
    } else {
      y += 6;
      doc.text(`CGST:`, 130, y);
      doc.text(`INR ${Math.round(invoiceTotals.totalCgst).toLocaleString('en-IN')}`, 175, y);
      y += 6;
      doc.text(`SGST:`, 130, y);
      doc.text(`INR ${Math.round(invoiceTotals.totalSgst).toLocaleString('en-IN')}`, 175, y);
    }

    y += 8;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(`Grand Total:`, 130, y);
    doc.text(`INR ${Math.round(invoiceTotals.grandTotal).toLocaleString('en-IN')}`, 175, y);

    // Footer note
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.text('This is a computer-generated tax invoice valid under Section 31 of the CGST Act.', 14, 280);

    doc.save(`${invoiceNumber}_Tax_Invoice.pdf`);
  };

  return (
    <div className="space-y-8">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900 text-white shadow-md">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#FF671F]" />
            <span>Instant GST Tax Invoice Maker</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            100% Client-Side PDF Generation. No software installation or login required.
          </p>
        </div>

        <button
          onClick={generatePdf}
          className="px-5 py-2.5 rounded-xl bg-[#046A38] hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center gap-2 shadow-lg btn-3d-green transition cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Download PDF Invoice</span>
        </button>
      </div>

      {/* Invoice Form Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Supplier / Your Business */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Building className="w-4 h-4 text-[#FF671F]" />
            <span>Seller / Your Business Details</span>
          </h3>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">
              Business / Trade Name
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full text-xs font-bold border border-slate-300 rounded-lg p-2 focus:outline-none focus:border-[#FF671F]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                GSTIN (15 Digits)
              </label>
              <input
                type="text"
                value={businessGstin}
                onChange={(e) => setBusinessGstin(e.target.value)}
                className="w-full text-xs font-mono font-bold border border-slate-300 rounded-lg p-2 focus:outline-none focus:border-[#FF671F]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Invoice Number
              </label>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="w-full text-xs font-bold border border-slate-300 rounded-lg p-2 focus:outline-none focus:border-[#FF671F]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">
              Business Address
            </label>
            <input
              type="text"
              value={businessAddress}
              onChange={(e) => setBusinessAddress(e.target.value)}
              className="w-full text-xs border border-slate-300 rounded-lg p-2 focus:outline-none focus:border-[#FF671F]"
            />
          </div>
        </div>

        {/* Client / Buyer */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <User className="w-4 h-4 text-[#06038D]" />
            <span>Buyer / Client Details</span>
          </h3>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">
              Client / Company Name
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full text-xs font-bold border border-slate-300 rounded-lg p-2 focus:outline-none focus:border-[#06038D]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Client GSTIN (or Unregistered)
              </label>
              <input
                type="text"
                value={clientGstin}
                onChange={(e) => setClientGstin(e.target.value)}
                className="w-full text-xs font-mono font-bold border border-slate-300 rounded-lg p-2 focus:outline-none focus:border-[#06038D]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Tax Treatment
              </label>
              <select
                value={isInterState ? 'inter' : 'intra'}
                onChange={(e) => setIsInterState(e.target.value === 'inter')}
                className="w-full text-xs font-bold border border-slate-300 rounded-lg p-2 focus:outline-none focus:border-[#06038D]"
              >
                <option value="intra">Intra-State (CGST + SGST)</option>
                <option value="inter">Inter-State (IGST)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">
              Client Address
            </label>
            <input
              type="text"
              value={clientAddress}
              onChange={(e) => setClientAddress(e.target.value)}
              className="w-full text-xs border border-slate-300 rounded-lg p-2 focus:outline-none focus:border-[#06038D]"
            />
          </div>
        </div>
      </div>

      {/* Itemized Rows Table */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Line Items & Services</h3>
          <button
            onClick={addItem}
            className="px-3 py-1.5 rounded-lg bg-orange-50 text-[#FF671F] font-bold text-xs flex items-center gap-1 hover:bg-orange-100 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Item</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-600 font-bold">
              <tr>
                <th className="p-2.5">Description</th>
                <th className="p-2.5 w-24">HSN/SAC</th>
                <th className="p-2.5 w-16">Qty</th>
                <th className="p-2.5 w-28">Rate (₹)</th>
                <th className="p-2.5 w-20">GST %</th>
                <th className="p-2.5 w-28 text-right">Amount (₹)</th>
                <th className="p-2.5 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="p-2">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      className="w-full p-1 border border-slate-200 rounded text-xs font-medium"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={item.hsnSac}
                      onChange={(e) => updateItem(item.id, 'hsnSac', e.target.value)}
                      className="w-full p-1 border border-slate-200 rounded text-xs font-mono"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value) || 1)}
                      className="w-full p-1 border border-slate-200 rounded text-xs font-bold"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) => updateItem(item.id, 'rate', Number(e.target.value) || 0)}
                      className="w-full p-1 border border-slate-200 rounded text-xs font-bold"
                    />
                  </td>
                  <td className="p-2">
                    <select
                      value={item.gstRate}
                      onChange={(e) => updateItem(item.id, 'gstRate', Number(e.target.value))}
                      className="w-full p-1 border border-slate-200 rounded text-xs font-bold"
                    >
                      <option value={0}>0%</option>
                      <option value={5}>5%</option>
                      <option value={12}>12%</option>
                      <option value={18}>18%</option>
                      <option value={28}>28%</option>
                    </select>
                  </td>
                  <td className="p-2 text-right font-bold text-slate-900">
                    {formatINR(item.quantity * item.rate)}
                  </td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-slate-400 hover:text-red-600 transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Invoice Summary Totals */}
        <div className="flex justify-end pt-4 border-t border-slate-100">
          <div className="w-72 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span className="font-bold">{formatINR(invoiceTotals.subtotal)}</span>
            </div>
            {isInterState ? (
              <div className="flex justify-between text-slate-600">
                <span>IGST:</span>
                <span className="font-bold">{formatINR(invoiceTotals.totalIgst)}</span>
              </div>
            ) : (
              <>
                <div className="flex justify-between text-slate-600">
                  <span>CGST:</span>
                  <span className="font-bold">{formatINR(invoiceTotals.totalCgst)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>SGST:</span>
                  <span className="font-bold">{formatINR(invoiceTotals.totalSgst)}</span>
                </div>
              </>
            )}
            <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
              <span>Total Payable:</span>
              <span className="text-[#046A38]">{formatINR(invoiceTotals.grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
