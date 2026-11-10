/**
 * Fase 1 para 9 a 12 anos: bolinhas numeradas e coloridas.
 * A fase tem três missões, cada uma com um jeito de formar o grupo:
 *   1) pela cor (como no 5–8, só que com números);
 *   2) por uma propriedade do número (ímpar, par, múltiplo…);
 *   3) pelas duas coisas ao mesmo tempo ("os ímpares que pertencem ao grupo dos vermelhos").
 * Depois de cada missão, o grupo aparece escrito com a notação de verdade: { }, ∈ e ∉.
 *
 * Uma bolinha: { id, n, color }
 * Uma missão: { id, text, short, label, letter, test, reveal }
 */

export const COLORS = {
  red: { name: 'vermelha', plural: 'vermelhas', letter: 'V' },
  blue: { name: 'azul', plural: 'azuis', letter: 'A' },
  yellow: { name: 'amarela', plural: 'amarelas', letter: 'M' },
};

const range = (from, to) => Array.from({ length: to - from + 1 }, (_, index) => from + index);
const shuffle = (list) => [...list].sort(() => Math.random() - 0.5);
const pick = (list) => list[Math.floor(Math.random() * list.length)];
export const formatSet = (list) => (list.length ? `{${[...list].sort((x, y) => x - y).join(', ')}}` : '{ }');

/** Propriedade dos números usada em cada dificuldade. */
const PROPERTIES = {
  easy: [{ id: 'odd', name: 'ímpares', one: 'ímpar', letter: 'I', test: (n) => n % 2 === 1, tip: 'Números ímpares terminam em 1, 3, 5, 7 ou 9.' }],
  medium: [
    { id: 'even', name: 'pares', one: 'par', letter: 'P', test: (n) => n % 2 === 0, tip: 'Números pares terminam em 0, 2, 4, 6 ou 8.' },
    { id: 'odd', name: 'ímpares', one: 'ímpar', letter: 'I', test: (n) => n % 2 === 1, tip: 'Números ímpares terminam em 1, 3, 5, 7 ou 9.' },
  ],
  hard: [
    { id: 'mult3', name: 'múltiplos de 3', one: 'múltiplo de 3', letter: 'T', test: (n) => n % 3 === 0, tip: 'Os múltiplos de 3 estão na tabuada do 3: 3, 6, 9, 12…' },
    { id: 'gt15', name: 'maiores que 15', one: 'maior que 15', letter: 'G', test: (n) => n > 15, tip: '"Maior que 15" não inclui o próprio 15.' },
  ],
};

const SIZES = {
  easy: { count: 8, max: 10 },
  medium: { count: 10, max: 20 },
  hard: { count: 12, max: 30 },
};

const between = (list, test, min, max) => {
  const count = list.filter(test).length;
  return count >= min && count <= max;
};

/** Sorteia bolinhas até que as três missões tenham elementos dentro e fora do círculo. */
function makeTokens(difficulty, color, property) {
  const { count, max } = SIZES[difficulty];
  for (let attempt = 0; attempt < 500; attempt += 1) {
    const numbers = shuffle(range(1, max)).slice(0, count);
    const colors = shuffle(Object.keys(COLORS));
    const tokens = numbers.map((n, index) => ({ id: `n${n}`, n, color: index < Math.round(count * 0.4) ? color : pick(colors.filter((c) => c !== color)) }));
    const isColor = (t) => t.color === color;
    const isProp = (t) => property.test(t.n);
    const both = (t) => isColor(t) && isProp(t);
    const colorOnly = (t) => isColor(t) && !isProp(t);
    const propOnly = (t) => !isColor(t) && isProp(t);
    if (
      between(tokens, isProp, 3, count - 3) &&
      between(tokens, both, 2, 3) &&
      between(tokens, colorOnly, 1, 3) &&
      between(tokens, propOnly, 1, count)
    ) {
      return shuffle(tokens);
    }
  }
  throw new Error('Não foi possível sortear as bolinhas.');
}

/** As três missões da fase, com as bolinhas sorteadas (as mesmas nas três). */
export function generateColorSetPhase(difficulty) {
  const colorId = pick(Object.keys(COLORS));
  const color = COLORS[colorId];
  const property = pick(PROPERTIES[difficulty] ?? PROPERTIES.easy);
  const tokens = makeTokens(difficulty, colorId, property);
  const listOf = (test) => tokens.filter(test).map((t) => t.n).sort((x, y) => x - y);

  const colorList = listOf((t) => t.color === colorId);
  const propList = listOf((t) => property.test(t.n));
  const bothList = listOf((t) => t.color === colorId && property.test(t.n));
  const inProp = propList[0];
  const outProp = tokens.map((t) => t.n).find((n) => !property.test(n));

  return {
    tokens,
    color: colorId,
    missions: [
      {
        id: 'color',
        text: `Coloque dentro do círculo todas as bolinhas ${color.plural}.`,
        short: `Bolinhas ${color.plural}`,
        label: `${color.plural[0].toUpperCase()}${color.plural.slice(1)}`,
        test: (t) => t.color === colorId,
        hint: `Olhe só a cor da bolinha: o número não importa agora.`,
        reveal: {
          math: [`${color.letter} = ${formatSet(colorList)}`],
          text: `Os matemáticos escrevem um grupo assim: uma letra para dar nome, e os elementos dentro das chaves { }. ${color.letter} é o grupo das ${color.plural}.`,
        },
      },
      {
        id: 'property',
        text: `Agora a cor não importa! Coloque no círculo os números ${property.name}.`,
        short: `Números ${property.name}`,
        label: property.name[0].toUpperCase() + property.name.slice(1),
        test: (t) => property.test(t.n),
        hint: property.tip,
        reveal: {
          math: [`${property.letter} = ${formatSet(propList)}`, `${inProp} ∈ ${property.letter}     ${outProp} ∉ ${property.letter}`],
          text: `Aquele símbolo parecido com um E arredondado quer dizer “pertence”: o ${inProp} pertence ao grupo ${property.letter}. Com um risquinho por cima, ele quer dizer “não pertence”: o ${outProp} ficou de fora.`,
        },
      },
      {
        id: 'both',
        text: `Desafio! Coloque no círculo só os números ${property.name} que pertencem ao grupo das ${color.plural}.`,
        short: `${property.name[0].toUpperCase()}${property.name.slice(1)} e ${color.plural}`,
        label: `${property.name[0].toUpperCase()}${property.name.slice(1)} e ${color.plural}`,
        test: (t) => t.color === colorId && property.test(t.n),
        hint: `A bolinha precisa ser ${color.name} e o número precisa ser ${property.one}: as duas coisas juntas!`,
        reveal: {
          math: [`${color.letter} = ${formatSet(colorList)}`, `${property.letter} = ${formatSet(propList)}`, `${property.name} e ${color.plural} = ${formatSet(bothList)}`],
          text: `Esses números estão nos dois grupos ao mesmo tempo: em ${color.letter} e em ${property.letter}. Mais adiante, isso vai ganhar um símbolo só para ele!`,
        },
      },
    ],
  };
}
