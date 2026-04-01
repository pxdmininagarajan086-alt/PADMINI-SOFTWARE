import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Printer, Download } from 'lucide-react';
import { useEffect } from 'react';

export default function PreviewQuote() {
  const location = useLocation();
  const navigate = useNavigate();
  const quoteData = location.state?.quoteData;

  useEffect(() => {
    // Load html2pdf script if not already loaded
    if (!window.html2pdf) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  if (!quoteData) {
    return (
      <div className="p-8 text-center">
        <h2>No quote data found</h2>
        <button className="btn btn-primary mt-4" onClick={() => navigate('/quotations/new')}>
          Go Back
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const element = document.getElementById('quotation-render');
    const opt = {
      margin: 0,
      filename: `${quoteData.number}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    window.html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="preview-quote-page bg-[#f1f3f5] min-h-screen p-8">
      <div className="no-print max-w-[210mm] mx-auto mb-8 flex justify-between items-center">
        <button className="btn btn-secondary flex items-center gap-2" onClick={() => navigate('/quotations/new')}>
          <ArrowLeft size={18} /> Back to Edit
        </button>
        <div className="flex gap-4">
          <button className="btn btn-secondary flex items-center gap-2" onClick={handlePrint}>
            <Printer size={18} /> Print
          </button>
          <button className="btn btn-primary flex items-center gap-2" onClick={handleDownload}>
            <Download size={18} /> Download PDF
          </button>
        </div>
      </div>

      <div id="quotation-render" className="bg-white mx-auto shadow-2xl" style={{ width: '210mm' }}>
        {/* Page 1: Quotation Details */}
        <div className="p-[20mm] flex flex-col min-h-[297mm] relative overflow-hidden font-['Inter'] page-break">
          {/* Professional Accents */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#0F4C81]/5 rounded-bl-full -mr-32 -mt-32"></div>
          
          {/* Company Header */}
          <div className="flex justify-between items-start mb-12 relative z-10">
            <div className="max-w-md text-left">
              <h1 className="font-['Manrope'] font-extrabold text-3xl text-[#0F4C81] tracking-tight mb-4 uppercase">NAGAS CIVIL ENGINEERING CONTRACTORS</h1>
              <div className="text-gray-600 text-sm flex flex-col gap-2">
                <p className="flex items-center gap-2">12/45, Industrial Estate, Chennai - 600032</p>
                <p className="flex items-center gap-2">+91 98400 12345 | +91 44 2250 1122</p>
                <p className="flex items-center gap-2">contact@nagascontractors.com</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-[#0F4C81] text-white px-6 py-2 inline-block rounded-lg font-['Manrope'] font-bold text-xl tracking-widest mb-4">ESTIMATE</div>
              <p className="text-gray-500 text-sm font-semibold">Date: {quoteData.date}</p>
              <p className="text-gray-500 text-sm font-semibold">Quote ID: #{quoteData.number}</p>
            </div>
          </div>

          {/* Client Info */}
          <div className="bg-gray-50 p-6 rounded-xl mb-12 flex justify-between border border-gray-200">
            <div className="text-left w-full">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">QUOTATION FOR:</h3>
              <p className="font-['Manrope'] font-bold text-lg text-[#0F4C81]">{quoteData.customer.name}</p>
              <p className="text-gray-600 text-sm max-w-md mt-1 whitespace-pre-wrap">{quoteData.customer.address}</p>
              <p className="text-gray-600 text-sm mt-1">{quoteData.customer.email}</p>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="flex-grow">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-[#0F4C81]/20">
                  <th className="py-4 px-2 font-['Manrope'] font-bold text-[#0F4C81] text-sm uppercase tracking-wider">Description</th>
                  <th className="py-4 px-6 font-['Manrope'] font-bold text-[#0F4C81] text-sm text-center uppercase tracking-wider">Qty</th>
                  <th className="py-4 px-6 font-['Manrope'] font-bold text-[#0F4C81] text-sm text-center uppercase tracking-wider">Unit</th>
                  <th className="py-4 px-2 font-['Manrope'] font-bold text-[#0F4C81] text-sm text-right uppercase tracking-wider">Amount (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {quoteData.items.map((item, index) => (
                  <tr key={index}>
                    <td className="py-6 px-2 text-left">
                      <div className="font-bold text-gray-800 mb-1">{item.desc || 'Services'}</div>
                      <div className="text-xs text-gray-500 leading-relaxed max-w-md">Professional industrial grade supplies and execution.</div>
                    </td>
                    <td className="py-6 px-6 text-center text-gray-800">{item.qty}</td>
                    <td className="py-6 px-6 text-center text-gray-800">Nos</td>
                    <td className="py-6 px-2 text-right font-semibold text-gray-800">{item.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Section */}
          <div className="mt-8 flex justify-end">
            <div className="w-80 space-y-3">
              <div className="flex justify-between text-sm px-2 text-left">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-semibold">₹{quoteData.subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm px-2 text-left">
                <span className="text-gray-500">GST (10%)</span>
                <span className="font-semibold">₹{quoteData.tax.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="h-[1px] bg-gray-200/50"></div>
              <div className="flex justify-between items-center py-2 px-2 bg-[#0F4C81]/5 rounded-lg text-left">
                <span className="font-['Manrope'] font-bold text-[#0F4C81]">GRAND TOTAL</span>
                <span className="font-['Manrope'] font-extrabold text-xl text-[#0F4C81]">₹{quoteData.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          {/* Footer Branding */}
          <div className="mt-auto pt-12 border-t border-gray-100 flex justify-between items-end">
            <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Generated via NCEC Ledger</div>
            <div className="text-right">
              <p className="text-xs font-bold text-[#0F4C81] mb-12">Authorized Signatory</p>
              <div className="h-[1px] w-48 bg-gray-300 mb-1"></div>
              <p className="text-[10px] text-gray-400">For Nagas Civil Engineering Contractors</p>
            </div>
          </div>
        </div>

        {/* Page 2: Terms & Conditions */}
        <div className="p-[20mm] flex flex-col min-h-[297mm] relative overflow-hidden font-['Inter']">
          <div className="border-b-4 border-[#0F4C81]/20 pb-4 mb-12 text-left">
            <h2 className="font-['Manrope'] font-extrabold text-2xl text-[#0F4C81] tracking-tight uppercase">TERMS &amp; CONDITIONS</h2>
          </div>
          <div className="flex-grow space-y-8 text-left">
            <div className="grid grid-cols-1 gap-6">
              {[
                { title: "Material Quality", desc: "The scaffolding materials provided will be MS (Mild Steel) pipes and couplers of standard industrial grade." },
                { title: "Taxation & GST", desc: "GST is calculated at 18%. Changes in government tax regulation will be adjusted in the final invoice." },
                { title: "Payment Terms", desc: "50% advance on approval. 40% on completion of erection. 10% within 7 days of site clearance." },
                { title: "Duration & Rentals", desc: "Quoted price includes rental for 30 days. Extension attracts ₹2.50 per sq. ft per day." },
                { title: "Safety & Liability", desc: "NAGAS Contractors will ensure worker safety. Client must ensure site is clear of unauthorized personnel." },
                { title: "Site Access", desc: "The client shall provide uninterrupted access to the site and utility connections as needed." },
                { title: "Validity", desc: "This quotation is valid for 15 days from the date of issue. Prices may vary if order is delayed." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <span className="bg-[#0F4C81]/10 text-[#0F4C81] font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-[#0F4C81]/20">{i + 1}</span>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-auto pt-12 border-t border-gray-100 flex justify-between items-end">
            <p className="text-[10px] text-gray-400 italic">All disputes are subject to Chennai jurisdiction only.</p>
            <div className="text-right">
              <p className="text-xs font-bold text-[#0F4C81]">Page 02 / 02</p>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          /* Hide sidebar and header */
          .sidebar, .header, .sidebar-container, .top-header, .no-print { 
            display: none !important; 
          }
          
          /* Reset container margins/padding */
          .app-container, .main-content, .preview-quote-page {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }
          
          body { 
            background: white !important; 
          }

          #quotation-render {
            box-shadow: none !important;
            width: 100% !important;
            margin: 0 !important;
          }

          .page-break {
            page-break-after: always;
          }
        }
      `}} />
    </div>
  );
}
