const letters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];
export default qaris => {
  const qariAndLetter = Object.keys(qaris).map(qari => {
    qaris[qari].letter = qaris[qari].name.charAt(0);
    return qaris[qari];
  });

  return letters.map(letter => {
    const qariObject = { letter: letter };
    qariObject.qaris = qariAndLetter.filter(item => item.letter === letter);
    return qariObject;
  });
};
