import { StrictDict } from 'js-libs/build/common';

export const diceTypes = StrictDict({
  d4: 'd4',
  d6: 'd6',
  d8: 'd8',
  d10: 'd10',
  d12: 'd12',
  d20: 'd20',
  d100: 'd100',
});

export const diceSides = StrictDict({
  [diceTypes.d4]: 4,
  [diceTypes.d6]: 6,
  [diceTypes.d8]: 8,
  [diceTypes.d10]: 10,
  [diceTypes.d12]: 12,
  [diceTypes.d20]: 20,
  [diceTypes.d100]: 100,
});

const tgcURI = 'https://s3.amazonaws.com/files.thegamecrafter.com';
export const diceURIs = StrictDict({
  [diceTypes.d4]: `${tgcURI}/23ab580e2280cd20f2ef36260eb2b8902132e5f7`,
  [diceTypes.d6]: `${tgcURI}/19337628523391821dd8aa251a925afb611932fe`,
  [diceTypes.d8]: `${tgcURI}/c123717767de732ae400c7cc0e193581ee444987`,
  [diceTypes.d10]: 'https://iambesser.me/DA/images/10/1D10.png',
  [diceTypes.d12]: `${tgcURI}/292a945e3ab648e1e24ffa6c8e130c68a8cfa3ff`,
  [diceTypes.d20]: 'https://i.ya-webdesign.com/images/d20-1-png-3.png',
  [diceTypes.d100]: 'https://cdn01.zipify.com/images/000/182/977/original/2179683_20171023T152757.png',
});
