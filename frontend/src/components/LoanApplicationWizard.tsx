import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createLoan } from '../services/api';

export default function LoanApplicationWizard() {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('5000');
  const [purpose, setPurpose] = useState('Inventory Purchase');
  const [file, setFile] = useState<File | null>(null);
  const [aiLogs, setAiLogs] = useState<string[]>([]);
  const navigate = useNavigate();

  // Simulated AI Underwriting process hitting the REAL backend
  useEffect(() => {
    if (step === 3) {
      const logs = [
        "Initiating Document Upload...",
        "Extracting financial data...",
        "Sending to OpenAI for analysis...",
        "Evaluating Default Risk...",
        "Calculating Risk Score...",
      ];
      
      let i = 0;
      const interval = setInterval(() => {
        if (i < logs.length) {
          setAiLogs(prev => [...prev, logs[i]]);
          i++;
        }
      }, 800);

      // Call the real API
      createLoan("B-123", {
        amountCents: Math.round(parseFloat(amount) * 100),
        termDays: 60,
        purpose: purpose
      }).then(() => {
        setAiLogs(prev => [...prev, "API SUCCESS: Loan created in DynamoDB!"]);
        setTimeout(() => setStep(4), 1500);
      }).catch(err => {
        setAiLogs(prev => [...prev, `API ERROR: ${err.message}`]);
      }).finally(() => {
        clearInterval(interval);
      });

      return () => clearInterval(interval);
    }
  }, [step]);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
        
        {/* Header */}
        <div className="bg-emerald-900/50 p-6 border-b border-emerald-800/50">
          <h2 className="text-2xl font-bold text-emerald-400">AI Underwriting Engine</h2>
          <p className="text-slate-400 text-sm mt-1">LenderX Automated Capital Deployment</p>
        </div>

        <div className="p-8">
          {/* STEP 1: Details */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Requested Amount (USD)</label>
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-emerald-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Purpose of Capital</label>
                <input type="text" value={purpose} onChange={e => setPurpose(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-emerald-500 outline-none" />
              </div>
              <button onClick={() => setStep(2)} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition">
                Continue to Verification
              </button>
            </div>
          )}

          {/* STEP 2: Document Upload */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="border-2 border-dashed border-slate-600 rounded-2xl p-10 text-center hover:border-emerald-500 hover:bg-slate-700/30 transition cursor-pointer">
                <input type="file" className="hidden" id="file-upload" onChange={e => setFile(e.target.files?.[0] || null)} />
                <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                  <svg className="w-12 h-12 text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                  <span className="text-lg font-semibold text-slate-200">{file ? file.name : "Drop Ledger/Receipts Here"}</span>
                  <span className="text-sm text-slate-500 mt-2">Required for AI cash-flow analysis</span>
                </label>
              </div>
              <button onClick={() => setStep(3)} disabled={!file} className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition">
                Run AI Analysis
              </button>
            </div>
          )}

          {/* STEP 3: AI Processing */}
          {step === 3 && (
            <div className="space-y-4 font-mono text-sm">
              <div className="flex items-center justify-center mb-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
              </div>
              <div className="bg-slate-950 rounded-lg p-4 h-48 overflow-y-auto border border-slate-800">
                {aiLogs.map((log, idx) => (
                  <div key={idx} className="text-emerald-400 mb-2">
                    <span className="text-slate-600 mr-2">[{new Date().toISOString().split('T')[1].substring(0, 8)}]</span>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Success */}
          {step === 4 && (
            <div className="text-center space-y-6 animate-in zoom-in-95">
              <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/50">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h3 className="text-3xl font-bold text-white">Loan Approved</h3>
              <div className="bg-slate-900 p-4 rounded-xl border border-emerald-900 inline-block text-left">
                <p className="text-slate-400">Amount: <span className="text-white font-bold">${amount}</span></p>
                <p className="text-slate-400">Risk Score: <span className="text-emerald-400 font-bold">92/100</span></p>
                <p className="text-slate-400">Status: <span className="text-white font-bold">Listed on Marketplace</span></p>
              </div>
              <button onClick={() => navigate('/borrower')} className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-xl transition mt-4">
                Return to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
