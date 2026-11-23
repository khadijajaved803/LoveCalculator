// Angel number engine, the commonly used digit-sum method.
// A date of birth is added digit by digit and reduced to a single digit
// from 1 to 9. The result is a traditional reading, not a prediction.

export interface AngelNumberResult {
  number: number;
  dob: string;
  dayOfWeek: string;
  steps: string[];
}

export interface SingleDigitMeaning {
  title: string;
  description: string;
  love: string;
}

export const SINGLE_DIGIT_MEANINGS: Record<number, SingleDigitMeaning> = {
  1: {
    title: 'New Beginnings',
    description:
      'One is read as the number of fresh starts and independence: the first step, the new idea, the decision only you can make. In the tradition it means a beginning is open to you now, and the next move is yours to take.',
    love: 'In love, 1 points to a fresh start: a new relationship, or a new chapter in the one you already have.',
  },
  2: {
    title: 'Balance & Partnership',
    description:
      'Two is read as the number of balance, patience and partnership: two sides held together, not one overpowering the other. In the tradition it means a relationship, with a person, or with a decision, is asking for patience and a steady hand.',
    love: 'In love, 2 is the partnership number: harmony, trust and two people moving at the same pace.',
  },
  3: {
    title: 'Creativity & Expression',
    description:
      'Three is read as the number of expression and joy: saying what you mean, making something, and letting your energy show. In the tradition it means your voice matters right now. Speak up, create, and stop holding the idea in.',
    love: 'In love, 3 points to open communication: say what you feel, and listen for what is said back.',
  },
  4: {
    title: 'Stability & Foundations',
    description:
      'Four is read as the number of foundations and steady work: the walls, the routine, the things that last because they were built carefully. In the tradition it means slow down and build properly. The result you want needs a solid base first.',
    love: 'In love, 4 means commitment and building together: a relationship that grows steadier the more you invest in it.',
  },
  5: {
    title: 'Change & Freedom',
    description:
      'Five is read as the number of change and freedom: a shift in direction, a door opening, a routine that no longer fits. In the tradition it means change is already on its way, and the useful response is flexibility, not resistance.',
    love: 'In love, 5 points to change: a new phase, a new freedom inside the relationship, or the courage to let something shift.',
  },
  6: {
    title: 'Care & Home',
    description:
      'Six is read as the number of care, home and responsibility: looking after people, keeping promises, and making a place feel safe. In the tradition it means the people close to you need your attention, and giving it is the work that matters now.',
    love: 'In love, 6 means devotion and family: a love that shows itself in care, not in grand gestures.',
  },
  7: {
    title: 'Reflection & Wisdom',
    description:
      'Seven is read as the number of reflection and inner wisdom: quiet, study, and the answer that only comes when you stop rushing. In the tradition it means look inward before you act. The understanding you need is already there, waiting to be noticed.',
    love: 'In love, 7 points to a deep connection: one that grows through understanding, not through noise.',
  },
  8: {
    title: 'Abundance & Strength',
    description:
      'Eight is read as the number of abundance and results: effort coming back as reward, and the strength to hold what you have built. In the tradition it means what you put in is about to show. Keep going, and expect the return to match the work.',
    love: 'In love, 8 means a relationship that gives back what you put into it: steady effort, steady reward.',
  },
  9: {
    title: 'Completion & Kindness',
    description:
      'Nine is read as the number of completion and kindness: a chapter closing, a lesson learned, and room made for what comes next. In the tradition it means let go of what has finished. Holding on only delays the next beginning.',
    love: 'In love, 9 points to a chapter ending with grace, or a love that asks for generosity before anything else.',
  },
};

export interface RepeatedMeaning {
  title: string;
  meaning: string;
  love: string;
}

export const REPEATED_MEANINGS: Record<string, RepeatedMeaning> = {
  '111': {
    title: 'New Beginnings',
    meaning:
      'One-one-one is read as the sign of a beginning: your thoughts are taking shape, and the idea you keep returning to is the one to act on. In the tradition it means the door is open now. Start.',
    love: 'In love, 111 points to a fresh start: a new person, or a new chapter with the person you already have.',
  },
  '222': {
    title: 'Balance & Partnership',
    meaning:
      'Two-two-two is read as the sign of partnership and alignment: things are coming together, slowly and in the right order. In the tradition it means trust the timing. The pieces are moving even when you cannot see them move.',
    love: 'In love, 222 is the number people look for most: a relationship aligning, a partner arriving, or two people finding the same pace.',
  },
  '333': {
    title: 'Creativity & Support',
    meaning:
      'Three-three-three is read as the sign of support and expression: you are not doing this alone, and your voice is part of the work. In the tradition it means create, speak up, and let the people around you help.',
    love: 'In love, 333 points to honest expression: say what you feel, and let the relationship grow from it.',
  },
  '444': {
    title: 'Protection & Stability',
    meaning:
      'Four-four-four is read as the sign of solid ground: your foundations are holding, and the work you have done is not wasted. In the tradition it means you are supported. Keep building, the structure will hold.',
    love: 'In love, 444 means a steady foundation: a relationship built on something real, not on a moment.',
  },
  '555': {
    title: 'Change Is Coming',
    meaning:
      'Five-five-five is read as the sign of change: a shift in direction, a door closing and another opening. In the tradition it means stay flexible. The change is already moving, and resisting it only makes it harder.',
    love: 'In love, 555 points to a change of phase: the relationship is about to look different, and that is not a bad thing.',
  },
  '666': {
    title: 'Rebalance',
    meaning:
      'Six-six-six is read as the sign to rebalance: too much attention on money, worry or appearances, and not enough on what actually matters. In the tradition it is not a warning of harm. It is a nudge to look at where your energy is going and bring it back to the people and things you value.',
    love: 'In love, 666 asks for balance: give the relationship the attention the worries have been taking.',
  },
  '777': {
    title: 'Wisdom & Good Fortune',
    meaning:
      'Seven-seven-seven is read as the sign of depth and good fortune: you are on the right track, and the quiet work is paying off. In the tradition it means trust your understanding. The answer you found by thinking is the right one.',
    love: 'In love, 777 points to a deep connection: the kind that grows through understanding, not through display.',
  },
  '888': {
    title: 'Abundance & Reward',
    meaning:
      'Eight-eight-eight is read as the sign of reward: effort coming back, results arriving, and the balance tipping in your favour. In the tradition it means the work you did is about to show, expect the return to match what you put in.',
    love: 'In love, 888 means a relationship that rewards steady effort, what you give is what comes back.',
  },
  '999': {
    title: 'Completion',
    meaning:
      'Nine-nine-nine is read as the sign of an ending: a chapter closing, a lesson finished, and space opening for what comes next. In the tradition it means let go with grace, the next beginning needs the room.',
    love: 'In love, 999 points to a chapter closing: an ending handled kindly, or a love that has taught you what it came to teach.',
  },
  '000': {
    title: 'Wholeness & Possibility',
    meaning:
      'Zero-zero-zero is read as the sign of wholeness: a blank page, a full circle, and every possibility still open. In the tradition it means you are starting from nothing and from everything at once, the next step can be anything you choose.',
    love: 'In love, 000 points to a love that starts whole: no history to undo, no pattern to repeat.',
  },
  '11:11': {
    title: 'Alignment & New Beginnings',
    meaning:
      'Eleven-eleven is the number people notice most: the clock at 11:11, the moment you look up and catch it. In the tradition it is read as alignment, your thoughts and your direction lining up, and as the classic moment to make a wish, because a new beginning is open. It is the most searched angel number there is, and the simplest to explain: you noticed it because you were ready to notice it.',
    love: 'In love, 11:11 is read as a new love arriving, or a new beginning inside the love you already have.',
  },
  '1212': {
    title: 'Growth & Progress',
    meaning:
      'Twelve-twelve is read as the sign of progress: you are moving toward something real, step by step, and the work is adding up. In the tradition it means keep going, the goal is closer than it looks, and the next step matters more than the whole road.',
    love: 'In love, 1212 points to a relationship growing in the right direction: steady progress, not sudden change.',
  },
};

function digitSum(n: number): number {
  let s = 0;
  for (const ch of String(n)) s += Number(ch);
  return s;
}

export function calculateAngelNumber(dob: string): AngelNumberResult | null {
  if (!dob) return null;
  const parts = dob.split('-');
  if (parts.length !== 3) return null;
  const [year, month, day] = parts.map((p) => parseInt(p, 10));
  if (!year || !month || !day) return null;
  const date = new Date(year, month - 1, day);
  if (Number.isNaN(date.getTime())) return null;

  const digits = `${String(day).padStart(2, '0')}${String(month).padStart(2, '0')}${year}`.split('').map(Number);
  const firstSum = digits.reduce((a, b) => a + b, 0);
  const steps: string[] = [
    `${digits.join(' + ')} = ${firstSum}`,
  ];
  let n = firstSum;
  while (n > 9) {
    const reduced = digitSum(n);
    steps.push(
      `${String(n).split('').join(' + ')} = ${reduced}`,
    );
    n = reduced;
  }

  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
  return { number: n, dob, dayOfWeek, steps };
}

export function getSingleDigitMeaning(n: number): SingleDigitMeaning {
  return SINGLE_DIGIT_MEANINGS[n] ?? SINGLE_DIGIT_MEANINGS[1];
}
