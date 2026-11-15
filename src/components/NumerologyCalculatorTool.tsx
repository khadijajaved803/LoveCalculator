import React, { useState } from 'react';
import {
  calculateFullNumerology,
  calculateMobileNumerology,
  calculateVehicleNumerology,
  calculateBusinessNumerology,
  FullNumerologyReading,
  MobileNumerologyResult,
  VehicleNumerologyResult,
  BusinessNumerologyResult,
} from '../lib/numerologyCalculatorEngine';
import { NumerologyDisplayCard } from './NumerologyDisplayCard';
import { CalculationLoader } from './CalculationLoader';
import {
  Hash,
  Calendar,
  User,
  Clock,
  Sparkles,
  Phone,
  Car,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

export type NumerologyToolTab = 'full' | 'dob' | 'name' | 'mobile' | 'vehicle' | 'business';

export const NumerologyCalculatorTool: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NumerologyToolTab>('full');

  // Inputs
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [businessName, setBusinessName] = useState('');

  // Results & Loading
  const [isCalculating, setIsCalculating] = useState(false);
  const [reading, setReading] = useState<FullNumerologyReading | null>(null);
  const [mobileResult, setMobileResult] = useState<MobileNumerologyResult | null>(null);
  const [vehicleResult, setVehicleResult] = useState<VehicleNumerologyResult | null>(null);
  const [businessResult, setBusinessResult] = useState<BusinessNumerologyResult | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (activeTab === 'full') {
      if (!fullName.trim() && !dob) {
        setError('Please enter either your Name or Date of Birth (or both for the full reading).');
        return;
      }
    } else if (activeTab === 'dob') {
      if (!dob) {
        setError('Please select your Date of Birth.');
        return;
      }
    } else if (activeTab === 'name') {
      if (!fullName.trim()) {
        setError('Please enter your Name.');
        return;
      }
    } else if (activeTab === 'mobile') {
      if (!mobileNumber.trim() || mobileNumber.replace(/\D/g, '').length < 4) {
        setError('Please enter a valid mobile number (at least 4 digits).');
        return;
      }
    } else if (activeTab === 'vehicle') {
      if (!vehiclePlate.trim()) {
        setError('Please enter your vehicle or car registration number.');
        return;
      }
    } else if (activeTab === 'business') {
      if (!businessName.trim()) {
        setError('Please enter your business or company name.');
        return;
      }
    }

    setIsCalculating(true);
  };

  const handleLoaderComplete = () => {
    setIsCalculating(false);

    if (activeTab === 'mobile') {
      // If user also provided DOB, extract root
      let dobRoot: number | undefined;
      if (dob) {
        const d = new Date(dob);
        if (!isNaN(d.getDate())) {
          dobRoot = d.getDate() > 9
            ? d.getDate().toString().split('').map(Number).reduce((a, b) => a + b, 0)
            : d.getDate();
        }
      }
      const res = calculateMobileNumerology(mobileNumber, dobRoot);
      setMobileResult(res);
      setReading(null);
      setVehicleResult(null);
      setBusinessResult(null);
    } else if (activeTab === 'vehicle') {
      let dobRoot: number | undefined;
      if (dob) {
        const d = new Date(dob);
        if (!isNaN(d.getDate())) {
          dobRoot = d.getDate() > 9
            ? d.getDate().toString().split('').map(Number).reduce((a, b) => a + b, 0)
            : d.getDate();
        }
      }
      const res = calculateVehicleNumerology(vehiclePlate, dobRoot);
      setVehicleResult(res);
      setReading(null);
      setMobileResult(null);
      setBusinessResult(null);
    } else if (activeTab === 'business') {
      let dobRoot: number | undefined;
      if (dob) {
        const d = new Date(dob);
        if (!isNaN(d.getDate())) {
          dobRoot = d.getDate() > 9
            ? d.getDate().toString().split('').map(Number).reduce((a, b) => a + b, 0)
            : d.getDate();
        }
      }
      const res = calculateBusinessNumerology(businessName, dobRoot);
      setBusinessResult(res);
      setReading(null);
      setMobileResult(null);
      setVehicleResult(null);
    } else {
      // Full / DOB / Name
      const res = calculateFullNumerology(fullName, dob, birthTime);
      setReading(res);
      setMobileResult(null);
      setVehicleResult(null);
      setBusinessResult(null);
    }
  };

  const handleRetake = () => {
    setReading(null);
    setMobileResult(null);
    setVehicleResult(null);
    setBusinessResult(null);
  };

  const hasResult = reading !== null || mobileResult !== null || vehicleResult !== null || businessResult !== null;

  return (
    <div className="w-full">
      {/* ─── Calculating Loader ─── */}
      {isCalculating && (
        <CalculationLoader
          name1={fullName || businessName || vehiclePlate || mobileNumber || 'Numerology'}
          name2={dob || 'Numbers'}
          type="love"
          minDuration={1600}
          maxDuration={2200}
          onComplete={handleLoaderComplete}
        />
      )}

      {/* ─── Result View ─── */}
      {!isCalculating && hasResult && (
        <NumerologyDisplayCard
          reading={reading}
          mobileResult={mobileResult}
          vehicleResult={vehicleResult}
          businessResult={businessResult}
          activeTab={
            activeTab === 'mobile'
              ? 'mobile'
              : activeTab === 'vehicle'
              ? 'vehicle'
              : activeTab === 'business'
              ? 'business'
              : 'full'
          }
          onRetake={handleRetake}
        />
      )}

      {/* ─── Calculator Form ─── */}
      {!isCalculating && !hasResult && (
        <div className="bg-white rounded-3xl shadow-xl border border-purple-100 overflow-hidden">
          {/* Top Decorative Header */}
          <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 p-6 sm:p-8 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 max-w-xl mx-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white border border-white/20 mb-3 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 fill-white text-white" />
                <span>Chaldean & Pythagorean · 100% Free Results</span>
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-display mb-2">
                Numerology Calculator
              </h2>

              <p className="text-xs sm:text-sm text-purple-100 leading-relaxed font-medium">
                Calculate your numerology number — free, by name and date of birth, Chaldean or Pythagorean.
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-8 max-w-2xl mx-auto">
            {/* Mode / Tabs Switcher */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Select Calculator Mode
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => { setActiveTab('full'); setError(''); }}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    activeTab === 'full'
                      ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-xs font-bold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <Sparkles className="w-4 h-4 mx-auto mb-1 text-purple-600" />
                  <span className="text-xs block font-semibold">Name & DOB</span>
                  <span className="text-[10px] text-slate-400">Full Reading</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab('mobile'); setError(''); }}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    activeTab === 'mobile'
                      ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-xs font-bold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <Phone className="w-4 h-4 mx-auto mb-1 text-indigo-500" />
                  <span className="text-xs block font-semibold">Mobile</span>
                  <span className="text-[10px] text-slate-400">Phone Numerology</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab('vehicle'); setError(''); }}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    activeTab === 'vehicle'
                      ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-xs font-bold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <Car className="w-4 h-4 mx-auto mb-1 text-amber-500" />
                  <span className="text-xs block font-semibold">Vehicle</span>
                  <span className="text-[10px] text-slate-400">Car & Bike</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab('business'); setError(''); }}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    activeTab === 'business'
                      ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-xs font-bold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <Briefcase className="w-4 h-4 mx-auto mb-1 text-emerald-500" />
                  <span className="text-xs block font-semibold">Business</span>
                  <span className="text-[10px] text-slate-400">Company Name</span>
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleCalculate} className="space-y-4">
              {/* Error Notice */}
              {error && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Mode: Name & Date of Birth */}
              {activeTab === 'full' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-purple-600" />
                      <span>Full Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-hidden text-sm transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-purple-600" />
                        <span>Date of Birth</span>
                      </label>
                      <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-hidden text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-purple-600" />
                        <span>Birth Time (Optional)</span>
                      </label>
                      <input
                        type="time"
                        value={birthTime}
                        onChange={(e) => setBirthTime(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-hidden text-sm transition-all"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Mode: Mobile */}
              {activeTab === 'mobile' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Mobile / Phone Number</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 9876543210"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-hidden text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Your Date of Birth (Optional — for harmony check)</span>
                    </label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-hidden text-sm transition-all"
                    />
                  </div>
                </>
              )}

              {/* Mode: Vehicle */}
              {activeTab === 'vehicle' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Car className="w-3.5 h-3.5 text-amber-600" />
                      <span>Vehicle / Car / Bike Plate Number</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. MH 02 AB 1234 or DL 10 C 9999"
                      value={vehiclePlate}
                      onChange={(e) => setVehiclePlate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-hidden text-sm uppercase transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Owner's Date of Birth (Optional)</span>
                    </label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-hidden text-sm transition-all"
                    />
                  </div>
                </>
              )}

              {/* Mode: Business */}
              {activeTab === 'business' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Business / Brand Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Nexus Global Infotech"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-hidden text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Founder's Date of Birth (Optional)</span>
                    </label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-hidden text-sm transition-all"
                    />
                  </div>
                </>
              )}

              {/* Features list */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-xs text-slate-600 space-y-1">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span><strong>Chaldean & Pythagorean:</strong> Side-by-side numerical comparison.</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span><strong>Lo Shu Grid:</strong> 3x3 birth date harmonics & planetary alignments.</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span><strong>100% Free & Private:</strong> Results generated instantly on your device.</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl text-center text-sm sm:text-base font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 min-h-[52px]"
              >
                <span>Calculate Numerology Numbers</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
