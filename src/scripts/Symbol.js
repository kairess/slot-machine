const cache = {};

export default class Symbol {
  constructor(slotName = 'starwars', name = Symbol.random()) {
    this.slotName = slotName;
    this.name = name;

    if (cache[name]) {
      this.img = cache[name].cloneNode();
    } else {
      this.img = new Image();
      this.img.src = `/symbols/${slotName}/${name}.svg`

      cache[name] = this.img;
    }
  }

  static preload(slotName) {
    Symbol.symbols.forEach((symbol) => new Symbol(slotName, symbol));
  }

  static get symbols() {
    return [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
    ];
  }

  static random() {
    return this.symbols[Math.floor(Math.random() * this.symbols.length)];
  }
}
