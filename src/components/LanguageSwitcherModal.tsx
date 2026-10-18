import React, { useEffect, useRef } from 'react';
import { X, Check, Globe } from 'lucide-react';
import { SupportedLocale, getEquivalentPath, getLocaleFromPath } from '../i18n/routes';
import { getTranslations } from '../i18n/translations';

interface LanguageSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
  onNavigate: (path: string) => void;
}

interface LanguageOption {
  code: SupportedLocale;
  name: string;
  nativeName: string;
  region: string;
  flag: string;
}

const LANGUAGES: LanguageOption[] = [
  {
    code: 'en',
    name: 'English (India)',
    nativeName: 'English',
    region: 'India & Global',
    flag: '🇮🇳',
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    region: 'España y Latinoamérica',
    flag: '🇪🇸',
  },
  {
    code: 'pt-BR',
    name: 'Brazilian Portuguese',
    nativeName: 'Português (Brasil)',
    region: 'Brasil',
    flag: '🇧🇷',
  },
];

export const LanguageSwitcherModal: React.FC<LanguageSwitcherModalProps> = ({
  isOpen,
  onClose,
  currentPath,
  onNavigate,
}) => {
  const currentLocale = getLocaleFromPath(currentPath);
  const t = getTranslations(currentLocale);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectLanguage = (targetLocale: SupportedLocale) => {
    const targetPath = getEquivalentPath(currentPath, targetLocale);
    onNavigate(targetPath);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="language-modal-title"
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-rose-100 overflow-hidden transform transition-all animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-rose-50/50 via-white to-pink-50/40">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shadow-xs">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 id="language-modal-title" className="text-sm font-bold text-slate-900 font-display">
                {t.modal.title}
              </h2>
              <p className="text-xs text-slate-500">
                {t.modal.subtitle}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label={t.modal.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language Options List */}
        <div className="p-4 space-y-2.5">
          {LANGUAGES.map((lang) => {
            const isSelected = currentLocale === lang.code;
            const targetUrl = getEquivalentPath(currentPath, lang.code);

            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelectLanguage(lang.code)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between group ${
                  isSelected
                    ? 'border-rose-400 bg-rose-50/60 shadow-xs'
                    : 'border-slate-200/80 hover:border-rose-200 hover:bg-slate-50/80'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="text-2xl select-none" role="img" aria-label={lang.name}>
                    {lang.flag}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${isSelected ? 'text-rose-700' : 'text-slate-800 group-hover:text-rose-600'}`}>
                        {lang.nativeName}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-200/70 text-rose-800">
                          Active
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 block">
                      {lang.region}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono block mt-0.5">
                      {targetUrl}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 pl-2">
                  {isSelected ? (
                    <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border border-slate-300 group-hover:border-rose-400 transition-colors" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>{t.common.testedPrivate}</span>
          <button
            type="button"
            onClick={onClose}
            className="font-semibold text-rose-600 hover:text-rose-700"
          >
            {t.modal.close}
          </button>
        </div>
      </div>
    </div>
  );
};
