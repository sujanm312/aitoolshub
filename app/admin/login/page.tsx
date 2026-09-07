'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
} from 'lucide-react';

export const AUTHORIZED_EMAIL = 'designer.sujanmondal@gmail.com';

export default function AdminLoginPage() {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState<string>(AUTHORIZED_EMAIL);
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 60-Second Countdown Timer for Resend OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'otp' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  // Focus first OTP input on step change
  useEffect(() => {
    if (step === 'otp') {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 150);
    }
  }, [step]);

  // Step 1: Send OTP
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const trimmedEmail = email.trim().toLowerCase();

    // Strict Authorization Check
    if (trimmedEmail !== AUTHORIZED_EMAIL.toLowerCase()) {
      setErrorMessage('Access Denied: Unauthorized Administrator');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to dispatch verification code.');
      }

      setStep('otp');
      setSuccessMessage('A 6-digit One-Time Password has been dispatched to your email.');
      setCountdown(60);
      setCanResend(false);
      setOtpDigits(['', '', '', '', '', '']);
    } catch (err: any) {
      setErrorMessage(err.message || 'Access Denied or email dispatch service unavailable.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Handle Individual Digit Change
  const handleOtpChange = (index: number, val: string) => {
    const cleanVal = val.replace(/\D/g, '');

    if (cleanVal.length <= 1) {
      const newDigits = [...otpDigits];
      newDigits[index] = cleanVal;
      setOtpDigits(newDigits);

      // Auto-focus next input
      if (cleanVal && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }

      // Auto-submit if all 6 filled
      if (newDigits.every((d) => d !== '') && index === 5) {
        submitOtp(newDigits.join(''));
      }
    }
  };

  // Handle Backspace Key
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle Full Paste (e.g., 6 digits copied from email)
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim().replace(/\D/g, '');
    if (pastedData.length >= 6) {
      const digits = pastedData.slice(0, 6).split('');
      setOtpDigits(digits);
      inputRefs.current[5]?.focus();
      submitOtp(digits.join(''));
    }
  };

  // Step 3: Verify OTP Submission
  const submitOtp = async (codeToVerify?: string) => {
    const finalCode = codeToVerify || otpDigits.join('');
    if (finalCode.length !== 6) {
      setErrorMessage('Please enter all 6 digits of the verification code.');
      return;
    }

    setErrorMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), otp: finalCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid verification code.');
      }

      setSuccessMessage('Access Granted! Redirecting to management dashboard...');
      setTimeout(() => {
        window.location.href = data.redirectUrl || '/admin/dashboard';
      }, 700);
    } catch (err: any) {
      setErrorMessage(err.message || 'Verification failed. Please check the code and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] via-[#111C38] to-[#0A0D18] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
      {/* Background Decorative Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF671F]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#046A38]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div className="w-full max-w-md mb-6 text-center">
        <a href="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF671F] via-orange-500 to-[#046A38] p-0.5 shadow-lg group-hover:scale-105 transition">
            <div className="w-full h-full bg-[#0F172A] rounded-[10px] flex items-center justify-center font-black text-sm text-white">
              AH
            </div>
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-2xl tracking-tight text-white">aitoolshub</span>
              <span className="w-2 h-2 rounded-full bg-[#FF671F]" />
            </div>
            <span className="text-xs text-slate-400 font-mono">aitoolshub.co.in</span>
          </div>
        </a>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative z-10">
        {/* Tricolor Accent Line on Top */}
        <div className="h-2 w-full bg-gradient-to-r from-[#FF671F] via-[#FF9933] to-[#046A38]" />

        <div className="p-7 sm:p-9">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-orange-50 text-[#FF671F] border border-orange-100 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Admin Authentication</h2>
              <p className="text-xs text-slate-500 mt-0.5">Passwordless 2-Factor Email OTP</p>
            </div>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Banner */}
          {successMessage && (
            <div className="mb-5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#046A38] text-xs font-semibold flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* STEP 1: EMAIL INPUT */}
          {step === 'email' ? (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Authorized Administrator Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="designer.sujanmondal@gmail.com"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF671F] focus:bg-white transition"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  Strict access control for: <strong className="text-slate-700">{AUTHORIZED_EMAIL}</strong>
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-2xl font-bold text-sm text-white bg-[#FF671F] hover:bg-[#E05510] active:translate-y-0.5 shadow-[0_4px_0_#b45309] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Validating & Sending OTP...</span>
                  </>
                ) : (
                  <>
                    <span>Send Verification Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* STEP 2: 6-DIGIT SPLIT OTP INPUT */
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setStep('email');
                    setErrorMessage('');
                  }}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer transition"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Change Email</span>
                </button>
                <span className="text-xs font-mono font-semibold text-slate-500 truncate max-w-[190px]">
                  {email}
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 text-center">
                  Enter 6-Digit Verification Code
                </label>

                {/* 6-Box Split Input with Auto-Focus & Paste */}
                <div className="flex items-center justify-between gap-2 sm:gap-2.5">
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => {
                        inputRefs.current[idx] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      onPaste={handlePaste}
                      className="w-11 sm:w-13 h-14 text-center text-xl sm:text-2xl font-black text-slate-900 bg-slate-50 border-2 border-slate-300 rounded-2xl focus:outline-none focus:border-[#FF671F] focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition shadow-xs"
                    />
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => submitOtp()}
                disabled={loading || otpDigits.some((d) => d === '')}
                className="w-full py-3.5 px-4 rounded-2xl font-bold text-sm text-white bg-[#046A38] hover:bg-[#034E28] active:translate-y-0.5 shadow-[0_4px_0_#02381e] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Authenticate & Enter Admin</span>
                  </>
                )}
              </button>

              {/* Resend Countdown Timer */}
              <div className="text-center pt-2">
                {canResend ? (
                  <button
                    type="button"
                    onClick={() => handleSendOtp()}
                    className="text-xs font-bold text-[#FF671F] hover:underline flex items-center gap-1.5 mx-auto cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Resend One-Time Password</span>
                  </button>
                ) : (
                  <p className="text-xs text-slate-400 font-mono">
                    Resend code in <strong className="text-slate-700">{countdown}s</strong>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Card Footer Security Note */}
        <div className="bg-slate-50 px-7 py-4 border-t border-slate-200 text-center">
          <p className="text-[11px] text-slate-500 font-medium">
            Protected by Signed HMAC Sessions &bull; aitoolshub.co.in
          </p>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-slate-500">
        <a href="/" className="hover:text-white transition">
          &larr; Return to Public aitoolshub Platform
        </a>
      </div>
    </div>
  );
}
