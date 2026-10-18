import React, { useState, useEffect, useMemo } from 'react';
import { Heart, Flame, Users, Gem, Sparkles } from 'lucide-react';
import { CalculateLoveLogo } from './CalculateLoveLogo';
import { SupportedLocale } from '../i18n/routes';

export type CalculatorType = 'love' | 'flames' | 'friendship' | 'marriage' | 'dob';

interface CalculationLoaderProps {
  name1: string;
  name2: string;
  type?: CalculatorType;
  onComplete: () => void;
  minDuration?: number;
  maxDuration?: number;
  locale?: SupportedLocale;
}

const PHRASES_EN: Record<CalculatorType, string[]> = {
  love: [
    'Scanning name harmonics & acoustic resonance...',
    'Decoding unspoken chemistry & emotional vibes...',
    'Measuring letter frequency & vowel balance...',
    'Matching heart frequencies between both souls...',
    'Evaluating communication depth & romantic passion...',
    'Calibrating longevity & shared couple connection...',
    'Almost ready! Generating your Compatibility Certificate...',
  ],
  flames: [
    'Crossing out common letters like classic school days...',
    'Counting remaining characters across both names...',
    'Cycling through Friends, Lovers, Affection, Marriage, Enemies...',
    'Simulating step-by-step circular countdown elimination...',
    'Testing nostalgic notebook chemistry & playful friction...',
    'Destiny unlocked! Revealing your final FLAMES letter...',
  ],
  friendship: [
    'Scanning bestie loyalty & secret-keeping quotient...',
    'Measuring laughter & inside jokes index...',
    'Testing emergency calls & unconditional support...',
    'Evaluating partner-in-crime chemistry & fun quotient...',
    'Calculating mutual trust & loyalty through thick and thin...',
    'Bestie meter calibrated! Preparing your friendship certificate...',
  ],
  marriage: [
    'Balancing romantic courtship with family blessing...',
    'Evaluating lifestyle priorities & communication harmony...',
    'Checking traditional alignment & mutual life goals...',
    'Testing shared future vision & household harmony...',
    'Calculating long-term matrimony readiness indicators...',
    'Alignment ready! Formulating your marriage certificate...',
  ],
  dob: [
    'Calculating Pythagorean Life Path numbers from birth dates...',
    'Analyzing cosmic elemental energies & planetary vibrations...',
    'Harmonizing destiny numbers & karmic life lessons...',
    'Evaluating solar-lunar synchronization & elemental blend...',
    'Synthesizing deep date-of-birth compatibility matrix...',
    'Cosmic connection aligned! Preparing your Life Path report...',
  ],
};

const PHRASES_ES: Record<CalculatorType, string[]> = {
  love: [
    'Analizando la resonancia armónica de ambos nombres...',
    'Sintonizando la química y empatía emocional...',
    'Midiendo la frecuencia de letras y armonía vocal...',
    'Alineando la frecuencia de ambos corazones...',
    'Evaluando la profundidad en comunicación y pasión...',
    'Calibrando la conexión y el compromiso a largo plazo...',
    '¡Casi listo! Generando tu Certificado de Compatibilidad...',
  ],
  flames: [
    'Cancelando letras en común como en los viejos tiempos...',
    'Contando los caracteres restantes en ambos nombres...',
    'Comprobando Amigos, Enamorados, Afecto, Matrimonio...',
    'Simulando el ciclo de eliminación paso a paso...',
    'Descubriendo la afinidad del juego clásico...',
    '¡Destino desbloqueado! Revelando el resultado final...',
  ],
  friendship: [
    'Midiendo la lealtad y el nivel de confianza mutua...',
    'Calculando risas compartidas y complicidad...',
    'Comprobando el apoyo incondicional en cualquier momento...',
    'Evaluando la sintonía para planes y aventuras juntos...',
    'Midiendo la lealtad a prueba de todo...',
    '¡Nivel de amistad calibrado! Preparando el certificado...',
  ],
  marriage: [
    'Equilibrando el noviazgo con los valores compartidos...',
    'Evaluando proyectos de vida y estabilidad conyugal...',
    'Comprobando el respeto mutuo y las metas a largo plazo...',
    'Analizando la visión del hogar y la armonía diaria...',
    'Calculando indicadores de afinidad para el matrimonio...',
    '¡Sintonía lista! Preparando el informe matrimonial...',
  ],
  dob: [
    'Calculando los Senderos de Vida pitagóricos...',
    'Analizando las energías natales y ciclos de vida...',
    'Sintonizando números del destino y lecciones de vida...',
    'Midiendo la armonía cósmica entre ambas fechas...',
    'Sintetizando la matriz de compatibilidad natal...',
    '¡Conexión cósmica alineada! Generando el informe...',
  ],
};

const PHRASES_PT: Record<CalculatorType, string[]> = {
  love: [
    'Analisando a ressonância harmônica dos nomes...',
    'Sintonizando a química e a sintonia emocional...',
    'Medindo o equilíbrio de letras e vogais...',
    'Cruzando a vibração de ambos os corações...',
    'Avaliando a qualidade do diálogo e a paixão...',
    'Calibrando a estabilidade e os planos para o futuro...',
    'Quase pronto! Gerando seu Certificado de Compatibilidade...',
  ],
  flames: [
    'Eliminando letras repetidas como nos tempos de colégio...',
    'Contando os caracteres restantes em ambos os nomes...',
    'Verificando Amigos, Namorados, Afeto, Casamento...',
    'Simulando a contagem circular passo a passo...',
    'Decifrando o resultado nostálgico do caderno...',
    'Destino revelado! Mostrando o resultado final...',
  ],
  friendship: [
    'Analisando a lealdade e a confiança entre amigos...',
    'Medindo o índice de risadas e piadas internas...',
    'Avaliando a cumplicidade e a presença nos momentos difíceis...',
    'Testando a sintonia para passeios e parcerias...',
    'Calculando o companheirismo para a vida toda...',
    'Termômetro da amizade calibrado! Gerando o certificado...',
  ],
  marriage: [
    'Equilibrando o romance com o apoio e harmonia familiar...',
    'Avaliando projetos de vida e estabilidade conjugal...',
    'Analisando objetivos em comum e cumplicidade a dois...',
    'Verificando a visão de futuro e harmonia do lar...',
    'Calculando a prontidão para um futuro a dois sólido...',
    'Sintonia de casamento pronta! Gerando o certificado...',
  ],
  dob: [
    'Calculando os números do Caminho de Vida pitagórico...',
    'Analisando energias cósmicas e ciclos de nascimento...',
    'Sintonizando os números do destino e harmonia pessoal...',
    'Avaliando a sincronicidade elemental entre as datas...',
    'Sintetizando a matriz de compatibilidade natal...',
    'Conexão cósmica alinhada! Preparando o relatório...',
  ],
};

const THEMES: Record<
  CalculatorType,
  {
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    gradient: string;
    badgeBg: string;
    badgeText: string;
    titleEn: string;
    titleEs: string;
    titlePt: string;
  }
> = {
  love: {
    icon: Heart,
    accentColor: 'text-rose-500',
    gradient: 'from-rose-500 via-pink-500 to-purple-500',
    badgeBg: 'bg-rose-50 border-rose-200',
    badgeText: 'text-rose-700',
    titleEn: 'Calculating Romantic Resonance',
    titleEs: 'Calculando Resonancia Romántica',
    titlePt: 'Calculando Ressonância Romântica',
  },
  flames: {
    icon: Flame,
    accentColor: 'text-amber-500',
    gradient: 'from-amber-500 via-orange-500 to-rose-500',
    badgeBg: 'bg-amber-50 border-amber-200',
    badgeText: 'text-amber-700',
    titleEn: 'Unraveling FLAMES Nostalgia',
    titleEs: 'Descifrando el Juego FLAMES',
    titlePt: 'Revelando o Clássico FLAMES',
  },
  friendship: {
    icon: Users,
    accentColor: 'text-purple-500',
    gradient: 'from-purple-500 via-indigo-500 to-rose-500',
    badgeBg: 'bg-purple-50 border-purple-200',
    badgeText: 'text-purple-700',
    titleEn: 'Testing Bestie Dynamics',
    titleEs: 'Midiendo la Sintonía de Amistad',
    titlePt: 'Testando a Sintonia de Amizade',
  },
  marriage: {
    icon: Gem,
    accentColor: 'text-purple-600',
    gradient: 'from-purple-600 via-rose-500 to-amber-500',
    badgeBg: 'bg-purple-50 border-purple-200',
    badgeText: 'text-purple-800',
    titleEn: 'Evaluating Marriage Alignment',
    titleEs: 'Evaluando Armonía Matrimonial',
    titlePt: 'Avaliando Sintonia de Casamento',
  },
  dob: {
    icon: Sparkles,
    accentColor: 'text-indigo-500',
    gradient: 'from-indigo-500 via-purple-500 to-rose-500',
    badgeBg: 'bg-indigo-50 border-indigo-200',
    badgeText: 'text-indigo-700',
    titleEn: 'Calculating Life Path Harmony',
    titleEs: 'Calculando Senderos de Vida',
    titlePt: 'Calculando Caminho de Vida',
  },
};

export const CalculationLoader: React.FC<CalculationLoaderProps> = ({
  name1,
  name2,
  type = 'love',
  onComplete,
  minDuration = 3500,
  maxDuration = 6500,
  locale = 'en',
}) => {
  const duration = useMemo(() => {
    return Math.floor(Math.random() * (maxDuration - minDuration + 1)) + minDuration;
  }, [minDuration, maxDuration]);

  const [progress, setProgress] = useState(0);

  const phraseDict = locale === 'es' ? PHRASES_ES : locale === 'pt-BR' ? PHRASES_PT : PHRASES_EN;
  const sentences = phraseDict[type] || phraseDict.love;
  const theme = THEMES[type] || THEMES.love;
  const IconComponent = theme.icon;

  useEffect(() => {
    const startTime = performance.now();
    let animationFrameId: number;

    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawPct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(rawPct);

      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setTimeout(() => {
          onComplete();
        }, 200);
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [duration, onComplete]);

  const sentenceIndex = Math.min(
    sentences.length - 1,
    Math.floor((progress / 100) * sentences.length)
  );

  const activeTitle = locale === 'es' ? theme.titleEs : locale === 'pt-BR' ? theme.titlePt : theme.titleEn;

  return (
    <div className="bg-white rounded-3xl border border-rose-200/90 shadow-xl p-6 sm:p-8 md:p-10 text-center relative overflow-hidden animate-in fade-in duration-300">
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${theme.gradient}`} />

      <div className="flex justify-center mb-6">
        <CalculateLoveLogo size={36} />
      </div>

      <div className="flex justify-center mb-5">
        <div className="relative">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-rose-50 border-2 border-rose-200 flex items-center justify-center shadow-inner animate-pulse">
            <IconComponent className={`w-10 h-10 sm:w-12 sm:h-12 ${theme.accentColor}`} />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-md border border-rose-100">
            <Sparkles className="w-5 h-5 text-amber-500 animate-spin" />
          </div>
        </div>
      </div>

      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 mb-3 shadow-2xs">
        <span>{name1}</span>
        <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-bounce" />
        <span>{name2}</span>
      </div>

      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-display mb-1">
        {activeTitle}
      </h3>

      <p className="text-xs sm:text-sm text-rose-600 font-medium min-h-[2.5rem] flex items-center justify-center transition-all duration-300">
        {sentences[sentenceIndex]}
      </p>

      <div className="max-w-md mx-auto mt-6">
        <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1.5">
          <span>{locale === 'es' ? 'Procesando armonía' : locale === 'pt-BR' ? 'Processando harmonia' : 'Harmonic Progress'}</span>
          <span className="tabular-nums font-mono text-rose-600">{progress}%</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60 shadow-inner">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${theme.gradient} transition-all duration-150`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-400">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
        <span>
          {locale === 'es'
            ? 'Cálculo 100% privado en tu navegador · Fórmula determinista'
            : locale === 'pt-BR'
            ? 'Cálculo 100% privado no seu navegador · Fórmula determinística'
            : '100% private in your browser · Deterministic character formula'}
        </span>
      </div>
    </div>
  );
};
