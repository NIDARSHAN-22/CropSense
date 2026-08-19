import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sprout, Search, Cpu, FileCheck } from 'lucide-react';

export const DiagnosisProgress: React.FC = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(2), 600);
    const timer2 = setTimeout(() => setStep(3), 1300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const steps = [
    { num: 1, text: t('scan.step1'), icon: Search },
    { num: 2, text: t('scan.step2'), icon: Cpu },
    { num: 3, text: t('scan.step3'), icon: FileCheck },
  ];

  return (
    <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-xl max-w-lg mx-auto text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
      {/* Animated Botanical Pulse Ring */}
      <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-agri-200 animate-ping opacity-60" />
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-agri-600 to-agri-800 text-white flex items-center justify-center shadow-lg shadow-agri-700/30">
          <Sprout className="w-10 h-10 animate-bounce" />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-extrabold text-agri-950">
          {t('scan.analyzing')}
        </h3>
        <p className="text-xs text-stone-500 mt-1">
          Evaluating symptom signatures against 38+ plant disease profiles
        </p>
      </div>

      {/* Step Indicators */}
      <div className="space-y-3 text-left">
        {steps.map((s) => {
          const Icon = s.icon;
          const isDone = step > s.num;
          const isCurrent = step === s.num;

          return (
            <div
              key={s.num}
              className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                isCurrent
                  ? 'bg-agri-50 border-agri-300 text-agri-900 shadow-sm'
                  : isDone
                  ? 'bg-stone-50 border-stone-200 text-agri-700'
                  : 'bg-white border-stone-100 text-stone-400'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  isCurrent
                    ? 'bg-agri-600 text-white animate-spin'
                    : isDone
                    ? 'bg-agri-100 text-agri-800'
                    : 'bg-stone-100 text-stone-400'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-medium">{s.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
