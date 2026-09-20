import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createLoan } from '../services/api';

export default function LoanApplicationWizard() {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('5000');
  const [purpose, setPurpose] = useState('Commercial Solar Microgrid');
  const [file, setFile] = useState<File | null>(null);
  const [aiLogs, setAiLogs] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  // Simulated AI Underwriting process hitting the REAL backend
  useEffect(() => {
    if (step === 3) {
      const logs = [
        "[AWS API Gateway] POST /loans incoming payload...",
        "[AWS Lambda] Initializing Underwriting Agent...",
        "[S3] Securely buffering encrypted financial documents...",
        "[OpenAI API] Extracting cash-flow velocity from M-Pesa statements...",
        "[OpenAI API] Analyzing 12-month historical default probabilities...",
        "[AWS Step Functions] Transition -> State: Risk_Evaluation",
        "Deterministic Risk Score Calculated: 94/100 (Tier 1)",
        "[DynamoDB] Persisting Loan Record (PartitionKey: B-123)...",
      ];
      
      let i = 0;
      const interval = setInterval(() => {
        if (i < logs.length) {
          setAiLogs(prev => [...prev, logs[i]]);
          i++;
        }
      }, 700);

      // Call the real API
      createLoan("B-123", {
        amountCents: Math.round(parseFloat(amount) * 100),
        termDays: 60,
        purpose: purpose
      }).then(() => {
        setAiLogs(prev => [...prev, "[SUCCESS] Smart Contract Escrow Initialized on-chain."]);
        setTimeout(() => {
          setStep(4);
          // Animate score
          let currScore = 0;
          const scoreInt = setInterval(() => {
            currScore += 2;
            setScore(currScore);
            if (currScore >= 94) clearInterval(scoreInt);
          }, 30);
        }, 1500);
      }).catch(err => {
        setAiLogs(prev => [...prev, `[ERROR] AWS Architecture Trace: ${err.message}`]);
      }).finally(() => {
        clearInterval(interval);
      });

      return () => clearInterval(interval);
    }
  }, [step]);

  return (
    <div className="min-h-screen bg-[#091712] text-white flex overflow-hidden font-sans">
      
      {/* Left Panel: Form UI */}
      <div className="w-full lg:w-1/2 flex flex-col p-8 lg:p-16 overflow-y-auto border-r border-[#142921]">
        
        <button onClick={() => navigate('/borrower')} className="text-emerald-300 hover:text-white transition flex items-center gap-2 mb-12 w-fit font-medium">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Return to Dashboard
        </button>

        <div className="mb-10">
          <img src="/logo-white.png" alt="LenderX" className="h-8 w-auto object-contain mb-6" />
          <h1 className="font-editorial text-4xl lg:text-5xl font-bold tracking-[0.035em] text-white mb-3">AI Credit Underwriting</h1>
          <p className="text-emerald-100/90 text-sm lg:text-base leading-relaxed font-light tracking-[0.015em]">
            Upload your unbanked ledger data (M-Pesa, supplier receipts, inventory logs). Our AWS-powered LLM agent will deterministically underwrite your risk in seconds, entirely bypassing traditional FICO scores.
          </p>
        </div>

        <div className="flex-1">
          {/* STEP 1: Details */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-[#0e1f18] p-6 rounded-2xl border border-[#142921]">
                <label className="block text-xs font-bold text-[#34d399] uppercase tracking-wider mb-2">Requested Capital (USDC)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">$</span>
                  <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full bg-[#06120e] border border-[#163327] rounded-xl py-3 pl-8 pr-4 text-white font-mono focus:border-[#10b981] outline-none transition" />
                </div>
              </div>
              <div className="bg-[#0e1f18] p-6 rounded-2xl border border-[#142921]">
                <label className="block text-xs font-bold text-[#34d399] uppercase tracking-wider mb-2">RWA Purpose / Asset</label>
                <input type="text" value={purpose} onChange={e => setPurpose(e.target.value)} className="w-full bg-[#06120e] border border-[#163327] rounded-xl p-3 text-white focus:border-[#10b981] outline-none transition" />
              </div>
              <button onClick={() => setStep(2)} className="w-full bg-[#059669] hover:bg-[#047857] text-white font-bold py-4 rounded-xl transition shadow-lg shadow-[#059669]/20 flex items-center justify-center gap-2 mt-4">
                Continue to Asset Verification <span>→</span>
              </button>
            </div>
          )}

          {/* STEP 2: Document Upload */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 h-full flex flex-col justify-center">
              <div className="border-2 border-dashed border-[#10b981]/30 bg-[#10b981]/5 rounded-3xl p-12 text-center hover:border-[#10b981] hover:bg-[#10b981]/10 transition cursor-pointer group">
                <input type="file" className="hidden" id="file-upload" onChange={e => setFile(e.target.files?.[0] || null)} />
                <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                  <div className="w-16 h-16 bg-[#064e3b] text-[#34d399] rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  </div>
                  <span className="text-xl font-bold text-white mb-2">{file ? file.name : "Drop Ledger & Mobile Receipts"}</span>
                  <span className="text-sm text-emerald-200/90 font-medium">Supports PDF, CSV, and JPG extracts from M-Pesa.</span>
                </label>
              </div>
              <button onClick={() => setStep(3)} disabled={!file} className="w-full bg-[#059669] hover:bg-[#047857] disabled:opacity-50 disabled:bg-[#163327] disabled:text-white/30 text-white font-bold py-4 rounded-xl transition shadow-lg shadow-[#059669]/20 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                Run AI Underwriting Agent
              </button>
            </div>
          )}

          {/* STEP 4: Success State */}
          {step === 4 && (
            <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-700">
              <div className="bg-[#0e1f18] p-8 rounded-3xl border border-[#10b981] shadow-2xl shadow-[#10b981]/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#10b981] opacity-10 blur-3xl rounded-full"></div>
                
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-editorial font-bold text-white mb-1">Loan Authorized</h3>
                    <p className="text-sm text-[#34d399] font-medium">Live on Global Marketplace</p>
                  </div>
                  <div className="w-16 h-16 bg-[#064e3b] border border-[#10b981] rounded-full flex items-center justify-center shadow-inner">
                    <svg className="w-8 h-8 text-[#34d399]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-[#06120e] p-4 rounded-xl border border-[#163327]">
                    <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">Approved Capital</span>
                    <p className="text-2xl font-mono text-white mt-1">${amount}</p>
                  </div>
                  <div className="bg-[#06120e] p-4 rounded-xl border border-[#163327]">
                    <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">Interest Rate</span>
                    <p className="text-2xl font-mono text-white mt-1">15.0%</p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-[#163327] pt-6">
                  <span className="text-sm font-bold text-white">LenderX Risk Score</span>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-editorial font-bold text-[#34d399]">{score}</div>
                    <div className="text-xs text-emerald-200/90 font-medium">/ 100 <br/>(Tier 1)</div>
                  </div>
                </div>
              </div>
              <button onClick={() => navigate('/borrower')} className="w-full bg-[#163327] hover:bg-[#1a3d2e] border border-[#10b981]/30 text-white font-bold py-4 rounded-xl transition">
                Return to Borrower Dashboard
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel: Technical AWS Trace Terminal */}
      <div className="hidden lg:flex w-1/2 bg-[#06120e] flex-col p-8 border-l border-[#142921] relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000')] opacity-5 bg-cover mix-blend-overlay"></div>
        
        <div className="relative z-10 flex items-center justify-between mb-8 pb-4 border-b border-[#163327]">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#10b981] animate-pulse"></div>
            <span className="font-mono text-xs text-[#34d399] uppercase tracking-widest">AWS Step Functions Trace</span>
          </div>
          <span className="font-mono text-[10px] text-white/40">US-EAST-1 / AP-SOUTH-1</span>
        </div>

        <div className="relative z-10 flex-1 bg-[#091712]/80 backdrop-blur-md rounded-2xl border border-[#163327] p-6 font-mono text-xs md:text-sm overflow-y-auto shadow-2xl">
          {step < 3 && (
            <div className="text-[#a7f3d0]/30 h-full flex items-center justify-center">
              Awaiting payload to initialize AWS architecture...
            </div>
          )}
          
          {(step === 3 || step === 4) && (
            <div className="space-y-4">
              {step === 3 && (
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-5 h-5 border-2 border-[#10b981] border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-[#34d399] font-bold animate-pulse">Executing Distributed Agent Workflow...</span>
                </div>
              )}
              
              {aiLogs.map((log, idx) => {
                const isError = log.includes("[ERROR]");
                const isSuccess = log.includes("[SUCCESS]") || log.includes("DynamoDB");
                const isAws = log.includes("[AWS") || log.includes("[S3]");
                const isOpenAi = log.includes("[OpenAI");
                
                return (
                  <div key={idx} className={`animate-in slide-in-from-left-4 fade-in leading-relaxed ${isError ? 'text-red-400' : isSuccess ? 'text-[#10b981] font-bold' : isAws ? 'text-blue-300' : isOpenAi ? 'text-purple-300' : 'text-[#a7f3d0]'}`}>
                    <span className="text-white/30 mr-3">[{new Date().toISOString().split('T')[1].substring(0, 11)}]</span>
                    {log}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
