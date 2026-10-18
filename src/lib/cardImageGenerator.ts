/**
 * High-Resolution Client-Side Canvas Card Image Generator
 * Generates an ultra-aesthetic 1080x1350 (Instagram / WhatsApp Story / Status ratio)
 * or 1080x1080 square shareable image card with zero server dependencies.
 */

import { SupportedLocale } from '../i18n/routes';

export interface CardRenderOptions {
  type: 'love' | 'flames' | 'friendship' | 'dob' | 'marriage';
  names: { person1: string; person2: string };
  score?: number;
  letter?: string;
  word?: string;
  tagline: string;
  suggestion: string;
  tip?: string;
  details?: string;
  locale?: SupportedLocale;
}

export async function generateCardImageBlob(options: CardRenderOptions): Promise<Blob> {
  const locale = options.locale || 'en';
  const canvas = document.createElement('canvas');
  const width = 1080;
  const height = 1350; // Perfect vertical story/status ratio
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas 2D context not supported');
  }

  // 1. Background Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  if (options.type === 'flames') {
    bgGrad.addColorStop(0, '#fff5f0');
    bgGrad.addColorStop(0.3, '#ffffff');
    bgGrad.addColorStop(0.7, '#fff1f2');
    bgGrad.addColorStop(1, '#fef3c7');
  } else if (options.type === 'friendship') {
    bgGrad.addColorStop(0, '#fffbeb');
    bgGrad.addColorStop(0.4, '#ffffff');
    bgGrad.addColorStop(0.8, '#fff7ed');
    bgGrad.addColorStop(1, '#fef3c7');
  } else {
    bgGrad.addColorStop(0, '#fff1f2');
    bgGrad.addColorStop(0.3, '#ffffff');
    bgGrad.addColorStop(0.7, '#fdf2f8');
    bgGrad.addColorStop(1, '#ffe4e6');
  }
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Decorative Outer Border & Card Frame
  ctx.save();
  ctx.strokeStyle = options.type === 'flames' ? '#f97316' : '#e11d48';
  ctx.lineWidth = 14;
  ctx.strokeRect(30, 30, width - 60, height - 60);

  // Inner card background (white with soft shadow)
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = 'rgba(225, 29, 72, 0.12)';
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 15;
  roundRect(ctx, 60, 60, width - 120, height - 120, 48);
  ctx.fill();
  ctx.restore();

  // Decorative top banner bar
  const bannerGrad = ctx.createLinearGradient(60, 60, width - 60, 60);
  bannerGrad.addColorStop(0, '#e11d48');
  bannerGrad.addColorStop(0.5, '#f43f5e');
  bannerGrad.addColorStop(1, '#f59e0b');
  ctx.fillStyle = bannerGrad;
  roundRectTop(ctx, 60, 60, width - 120, 24, 48);
  ctx.fill();

  // 3. Header: Brand & Certificate Badge
  ctx.fillStyle = '#e11d48';
  ctx.font = 'bold 36px "Outfit", system-ui, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('♥ calculatelove.online', 100, 140);

  const certBadgeText =
    locale === 'es'
      ? 'CERTIFICADO OFICIAL DE AMOR'
      : locale === 'pt-BR'
      ? 'CERTIFICADO OFICIAL DE CASAL'
      : 'OFFICIAL LOVE CERTIFICATE';

  ctx.fillStyle = '#f43f5e';
  ctx.font = '600 24px system-ui, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText(certBadgeText, width - 100, 140);

  // Divider line
  ctx.strokeStyle = '#ffe4e6';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(100, 170);
  ctx.lineTo(width - 100, 170);
  ctx.stroke();

  // 4. Names Banner
  const name1 = options.names.person1;
  const name2 = options.names.person2;

  ctx.textAlign = 'center';
  ctx.fillStyle = '#881337';
  ctx.font = 'bold 54px "Outfit", system-ui, sans-serif';
  const namesText = `${name1}   ♥   ${name2}`;
  ctx.fillText(namesText, width / 2, 250);

  if (options.details) {
    ctx.fillStyle = '#64748b';
    ctx.font = '500 24px system-ui, sans-serif';
    ctx.fillText(options.details, width / 2, 290);
  }

  // 5. Center Visual Hero: Circular Score Ring or FLAMES Badge
  if (options.type === 'flames' && options.letter) {
    // FLAMES Letter Box
    const boxX = width / 2 - 120;
    const boxY = 340;
    const boxSize = 240;

    // Glowing badge
    ctx.save();
    ctx.fillStyle = '#fff1f2';
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 8;
    ctx.shadowColor = 'rgba(244, 63, 94, 0.25)';
    ctx.shadowBlur = 30;
    roundRect(ctx, boxX, boxY, boxSize, boxSize, 40);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Letter
    ctx.fillStyle = '#e11d48';
    ctx.font = 'bold 120px "Outfit", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(options.letter, width / 2, boxY + 160);

    // Word
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 44px "Outfit", system-ui, sans-serif';
    ctx.fillText(options.word || 'FLAMES', width / 2, boxY + boxSize + 60);
  } else {
    // Score Circular Gauge
    const centerX = width / 2;
    const centerY = 450;
    const radius = 130;
    const scoreVal = options.score || 85;

    // Background track
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = '#ffe4e6';
    ctx.lineWidth = 22;
    ctx.stroke();

    // Foreground progress
    ctx.beginPath();
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (Math.PI * 2 * (scoreVal / 100));
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = '#e11d48';
    ctx.lineWidth = 22;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Score Text inside circle
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 96px "Outfit", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${scoreVal}%`, centerX, centerY + 25);

    const compatLabel =
      locale === 'es'
        ? 'COMPATIBILIDAD'
        : locale === 'pt-BR'
        ? 'COMPATIBILIDADE'
        : 'COMPATIBILITY';

    ctx.fillStyle = '#e11d48';
    ctx.font = 'bold 24px system-ui, sans-serif';
    ctx.fillText(compatLabel, centerX, centerY + 65);
  }

  // 6. Tagline
  ctx.textAlign = 'center';
  ctx.fillStyle = '#881337';
  ctx.font = 'bold 40px "Outfit", system-ui, sans-serif';
  ctx.fillText(options.tagline, width / 2, 690);

  // 7. Dil Ki Baat - Reflection Box
  const boxTop = 750;
  const boxLeft = 100;
  const boxWidth = width - 200;
  const boxHeight = 360;

  ctx.save();
  ctx.fillStyle = '#fffbeb'; // soft amber
  ctx.strokeStyle = '#fde68a';
  ctx.lineWidth = 3;
  roundRect(ctx, boxLeft, boxTop, boxWidth, boxHeight, 32);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // Box Title
  const boxTitle =
    locale === 'es'
      ? '✨ Consejo Romántico · Guía de Pareja'
      : locale === 'pt-BR'
      ? '✨ Conselho Afetivo · Dicas de Casal'
      : '✨ Dil Ki Baat · Relationship Advice';

  ctx.textAlign = 'left';
  ctx.fillStyle = '#92400e';
  ctx.font = 'bold 28px "Outfit", system-ui, sans-serif';
  ctx.fillText(boxTitle, boxLeft + 40, boxTop + 60);

  // Suggestion Text (Wrapped)
  ctx.fillStyle = '#1e293b';
  ctx.font = '500 28px system-ui, sans-serif';
  wrapText(ctx, `"${options.suggestion}"`, boxLeft + 40, boxTop + 120, boxWidth - 80, 42);

  // Tip Divider & Text
  if (options.tip) {
    ctx.strokeStyle = '#fde68a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(boxLeft + 40, boxTop + 260);
    ctx.lineTo(boxLeft + boxWidth - 40, boxTop + 260);
    ctx.stroke();

    ctx.fillStyle = '#b45309';
    ctx.font = '600 24px system-ui, sans-serif';
    wrapText(ctx, options.tip, boxLeft + 40, boxTop + 300, boxWidth - 80, 34);
  }

  // 8. Footer Watermark
  const watermark1 =
    locale === 'es'
      ? 'Calculado en https://calculatelove.online · 100% Gratis y Privado'
      : locale === 'pt-BR'
      ? 'Testado em https://calculatelove.online · 100% Grátis e Privado'
      : 'Tested on https://calculatelove.online · 100% Free & Private';

  const watermark2 =
    locale === 'es'
      ? '¡Visita calculatelove.online para calcular el tuyo!'
      : locale === 'pt-BR'
      ? 'Acesse calculatelove.online para testar o seu!'
      : 'Scan or visit calculatelove.online to calculate yours!';

  ctx.textAlign = 'center';
  ctx.fillStyle = '#64748b';
  ctx.font = '600 26px "Outfit", system-ui, sans-serif';
  ctx.fillText(watermark1, width / 2, height - 110);

  ctx.fillStyle = '#e11d48';
  ctx.font = '500 20px system-ui, sans-serif';
  ctx.fillText(watermark2, width / 2, height - 75);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Failed to generate image blob'));
      }
    }, 'image/png');
  });
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function roundRectTop(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x, y + h);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(' ');
  let line = '';

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}
