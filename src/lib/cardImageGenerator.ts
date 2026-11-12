/**
 * High-Resolution Client-Side Canvas Card Image Generator
 * Generates an ultra-aesthetic 1080x1350 (Instagram / WhatsApp Story / Status ratio)
 * or 1080x1080 square shareable image card with zero server dependencies.
 */

export interface CardRenderOptions {
  type: 'love' | 'flames' | 'friendship' | 'dob' | 'marriage' | 'crush' | 'name-compatibility' | 'numerology' | 'kundali' | 'love-language' | 'porutham' | 'birth-chart' | 'life-path' | 'love-horoscope';
  names: { person1: string; person2: string };
  score?: number;
  maxScore?: number;
  letter?: string;
  word?: string;
  tagline: string;
  suggestion: string;
  tip?: string;
  details?: string;
}

export async function generateCardImageBlob(options: CardRenderOptions): Promise<Blob> {
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
  } else if (options.type === 'crush') {
    bgGrad.addColorStop(0, '#fdf2f8');
    bgGrad.addColorStop(0.3, '#ffffff');
    bgGrad.addColorStop(0.7, '#fff1f2');
    bgGrad.addColorStop(1, '#fce7f3');
  } else if (options.type === 'numerology' || options.type === 'life-path') {
    bgGrad.addColorStop(0, '#faf5ff');
    bgGrad.addColorStop(0.3, '#ffffff');
    bgGrad.addColorStop(0.7, '#f3e8ff');
    bgGrad.addColorStop(1, '#ede9fe');
  } else if (options.type === 'love-horoscope') {
    bgGrad.addColorStop(0, '#fff1f2');
    bgGrad.addColorStop(0.3, '#ffffff');
    bgGrad.addColorStop(0.7, '#fdf2f8');
    bgGrad.addColorStop(1, '#e0e7ff');
  } else if (options.type === 'kundali' || options.type === 'porutham') {
    bgGrad.addColorStop(0, '#fff7ed');
    bgGrad.addColorStop(0.3, '#ffffff');
    bgGrad.addColorStop(0.7, '#fff1f2');
    bgGrad.addColorStop(1, '#fef3c7');
  } else if (options.type === 'love-language') {
    bgGrad.addColorStop(0, '#fff1f2');
    bgGrad.addColorStop(0.3, '#ffffff');
    bgGrad.addColorStop(0.7, '#fdf2f8');
    bgGrad.addColorStop(1, '#fce7f3');
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
  ctx.strokeStyle = options.type === 'flames' ? '#f97316' : options.type === 'porutham' ? '#ea580c' : options.type === 'life-path' ? '#9333ea' : options.type === 'love-horoscope' ? '#e11d48' : '#e11d48';
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
  bannerGrad.addColorStop(0, options.type === 'porutham' ? '#ea580c' : options.type === 'life-path' ? '#7c3aed' : options.type === 'love-horoscope' ? '#e11d48' : '#e11d48');
  bannerGrad.addColorStop(0.5, options.type === 'life-path' ? '#9333ea' : '#f43f5e');
  bannerGrad.addColorStop(1, options.type === 'life-path' ? '#c084fc' : '#f59e0b');
  ctx.fillStyle = bannerGrad;
  roundRectTop(ctx, 60, 60, width - 120, 24, 48);
  ctx.fill();

  // 3. Header: Brand & Certificate Badge
  ctx.fillStyle = options.type === 'porutham' ? '#c2410c' : options.type === 'life-path' ? '#7c3aed' : '#e11d48';
  ctx.font = 'bold 36px "Outfit", system-ui, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('♥ calculatelove.online', 100, 140);

  ctx.fillStyle = '#f43f5e';
  ctx.font = '600 24px system-ui, sans-serif';
  ctx.textAlign = 'right';
  const badgeTitle = options.type === 'love-language'
    ? 'OFFICIAL LOVE LANGUAGE RESULT'
    : options.type === 'porutham'
    ? 'THIRUMANA PORUTHAM REPORT'
    : options.type === 'birth-chart'
    ? 'OFFICIAL NATAL BIRTH CHART'
    : options.type === 'life-path'
    ? 'LIFE PATH NUMBER REPORT'
    : options.type === 'love-horoscope'
    ? 'DAILY LOVE HOROSCOPE'
    : options.type === 'marriage' && options.word
    ? 'MARRIAGE PREDICTION'
    : 'OFFICIAL LOVE CERTIFICATE';
  ctx.fillText(badgeTitle, width - 100, 140);

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
  const namesText = name2 ? `${name1}   ♥   ${name2}` : name1;
  ctx.fillText(namesText, width / 2, 250);

  if (options.details) {
    ctx.fillStyle = '#64748b';
    ctx.font = '500 24px system-ui, sans-serif';
    ctx.fillText(options.details, width / 2, 290);
  }

  // 5. Center Visual Hero: Circular Score Ring or FLAMES Badge or Love Language Box
  if (options.type === 'flames' && options.letter) {
    const boxX = width / 2 - 120;
    const boxY = 340;
    const boxSize = 240;

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

    ctx.fillStyle = '#e11d48';
    ctx.font = 'bold 120px "Outfit", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(options.letter, width / 2, boxY + 160);

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 44px "Outfit", system-ui, sans-serif';
    ctx.fillText(options.word || 'FLAMES', width / 2, boxY + boxSize + 60);
  } else if (options.type === 'love-language') {
    const centerX = width / 2;
    const centerY = 450;
    const radius = 130;
    const scoreVal = options.score || 100;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = '#ffe4e6';
    ctx.lineWidth = 22;
    ctx.stroke();

    ctx.beginPath();
    const startAngle = -Math.PI / 2;
    const maxVal = options.maxScore || 100;
    const endAngle = startAngle + (Math.PI * 2 * (scoreVal / maxVal));
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = '#e11d48';
    ctx.lineWidth = 22;
    ctx.lineCap = 'round';
    ctx.stroke();

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 84px "Outfit", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${scoreVal}%`, centerX, centerY + 20);

    ctx.fillStyle = '#e11d48';
    ctx.font = 'bold 22px system-ui, sans-serif';
    ctx.fillText('PRIMARY SCORE', centerX, centerY + 65);
  } else if (options.type === 'love-horoscope' && options.letter) {
    const boxX = width / 2 - 120;
    const boxY = 340;
    const boxSize = 240;

    ctx.save();
    ctx.fillStyle = '#fff1f2';
    ctx.strokeStyle = '#e11d48';
    ctx.lineWidth = 8;
    ctx.shadowColor = 'rgba(225, 29, 72, 0.25)';
    ctx.shadowBlur = 30;
    roundRect(ctx, boxX, boxY, boxSize, boxSize, 40);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = '#e11d48';
    ctx.font = 'bold 120px "Outfit", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(options.letter, width / 2, boxY + 160);

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 44px "Outfit", system-ui, sans-serif';
    ctx.fillText(options.word || 'Love Horoscope', width / 2, boxY + boxSize + 60);
  } else if (options.type === 'life-path') {
    const centerX = width / 2;
    const centerY = 450;
    const radius = 130;
    const scoreVal = options.score !== undefined ? options.score : 1;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#faf5ff';
    ctx.fill();
    ctx.strokeStyle = '#9333ea';
    ctx.lineWidth = 22;
    ctx.stroke();

    ctx.fillStyle = '#7c3aed';
    ctx.font = 'bold 84px "Outfit", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${scoreVal}`, centerX, centerY + 20);

    ctx.fillStyle = '#7c3aed';
    ctx.font = 'bold 22px system-ui, sans-serif';
    ctx.fillText('LIFE PATH NUMBER', centerX, centerY + 65);
  } else if (options.type === 'marriage' && options.word) {
    // Marriage prediction: big age range, never a misleading % gauge.
    // (MarriageCalculatorPage passes no `word`, so it still uses the % gauge below.)
    const centerX = width / 2;
    const centerY = 450;
    const radius = 130;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#eef2ff';
    ctx.fill();
    ctx.strokeStyle = '#4f46e5';
    ctx.lineWidth = 22;
    ctx.stroke();

    ctx.fillStyle = '#4338ca';
    ctx.font = 'bold 76px "Outfit", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(options.word, centerX, centerY + 20);

    ctx.fillStyle = '#4338ca';
    ctx.font = 'bold 22px system-ui, sans-serif';
    ctx.fillText('PREDICTED MARRIAGE AGE', centerX, centerY + 65);
  } else {
    // Score Circular Gauge (Kundali, Porutham, Love, Friendship, etc.)
    const centerX = width / 2;
    const centerY = 450;
    const radius = 130;
    const scoreVal = options.score !== undefined ? options.score : 85;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = '#ffe4e6';
    ctx.lineWidth = 22;
    ctx.stroke();

    ctx.beginPath();
    const startAngle = -Math.PI / 2;
    const maxVal = options.maxScore || (options.type === 'kundali' ? 36 : options.type === 'porutham' ? 10 : 100);
    const endAngle = startAngle + (Math.PI * 2 * (scoreVal / maxVal));
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = options.type === 'kundali' || options.type === 'porutham' ? '#ea580c' : '#e11d48';
    ctx.lineWidth = 22;
    ctx.lineCap = 'round';
    ctx.stroke();

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 84px "Outfit", system-ui, sans-serif';
    ctx.textAlign = 'center';
    const displayScore = options.type === 'kundali'
      ? `${scoreVal}/36`
      : options.type === 'porutham'
      ? `${scoreVal}/10`
      : `${scoreVal}%`;
    ctx.fillText(displayScore, centerX, centerY + 20);

    ctx.fillStyle = options.type === 'kundali' || options.type === 'porutham' ? '#ea580c' : '#e11d48';
    ctx.font = 'bold 22px system-ui, sans-serif';
    const subLabel = options.type === 'kundali'
      ? 'GUNAS MATCHED'
      : options.type === 'porutham'
      ? 'PORUTHAMS MATCHED'
      : 'COMPATIBILITY';
    ctx.fillText(subLabel, centerX, centerY + 65);
  }

  // 6. Tagline — wrapped so a long line never runs outside the card.
  // The band between the score circle (bottom ~600) and the advice box
  // (top 750) fits at most 3 lines, so shrink the font until it does.
  ctx.textAlign = 'center';
  ctx.fillStyle = '#881337';
  const taglineMaxWidth = width - 200;
  let taglineFont = 40;
  ctx.font = `bold ${taglineFont}px "Outfit", system-ui, sans-serif`;
  let taglineLines = splitWrapLines(ctx, options.tagline, taglineMaxWidth);
  for (const smaller of [34, 30, 28]) {
    if (taglineLines.length <= 3) break;
    taglineFont = smaller;
    ctx.font = `bold ${taglineFont}px "Outfit", system-ui, sans-serif`;
    taglineLines = splitWrapLines(ctx, options.tagline, taglineMaxWidth);
  }
  const taglineLineHeight = taglineFont + 12;
  const taglineBlockHeight = taglineLines.length * taglineLineHeight;
  const taglineFirstBaseline = 605 + (140 - taglineBlockHeight) / 2 + taglineFont * 0.75;
  wrapText(ctx, options.tagline, width / 2, taglineFirstBaseline, taglineMaxWidth, taglineLineHeight);

  // 7. Reflection / Action Box
  const boxTop = 750;
  const boxLeft = 100;
  const boxWidth = width - 200;
  const boxHeight = 360;

  ctx.save();
  ctx.fillStyle = '#fffbeb';
  ctx.strokeStyle = '#fde68a';
  ctx.lineWidth = 3;
  roundRect(ctx, boxLeft, boxTop, boxWidth, boxHeight, 32);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // Box Title
  ctx.textAlign = 'left';
  ctx.fillStyle = options.type === 'kundali' || options.type === 'porutham' ? '#9a3412' : '#92400e';
  ctx.font = 'bold 28px "Outfit", system-ui, sans-serif';
  const boxTitle = options.type === 'porutham'
    ? '✨ Tamil Jathagam Porutham · Astrology Verdict'
    : options.type === 'kundali'
    ? '✨ Vedic Kundali Milan · Astrological Advice'
    : options.type === 'love-language'
    ? '💡 Your Weekly Action · How To Be Loved'
    : options.type === 'life-path'
    ? '✨ Life Path Insight · Numerology Reading'
    : options.type === 'love-horoscope'
    ? '✨ Today’s Love Horoscope · What the Day Favours'
    : '✨ Dil Ki Baat · Relationship Advice';
  ctx.fillText(boxTitle, boxLeft + 40, boxTop + 60);

  // Suggestion Text
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
  ctx.textAlign = 'center';
  ctx.fillStyle = '#64748b';
  ctx.font = '600 26px "Outfit", system-ui, sans-serif';
  ctx.fillText('Tested on https://calculatelove.online · 100% Free & Private', width / 2, height - 110);

  ctx.fillStyle = '#e11d48';
  ctx.font = '500 20px system-ui, sans-serif';
  ctx.fillText('Scan or visit calculatelove.online to calculate yours!', width / 2, height - 75);

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

function splitWrapLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      lines.push(line);
      line = words[n] + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line);
  return lines;
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const lines = splitWrapLines(ctx, text, maxWidth);
  for (const line of lines) {
    ctx.fillText(line, x, y);
    y += lineHeight;
  }
}
