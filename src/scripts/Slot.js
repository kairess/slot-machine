import Reel from "./Reel.js";
import Symbol from "./Symbol.js";

export default class Slot {
  constructor(domElement, config = {}) {
    this.slotName = config.slotName
    Symbol.preload(config.slotName);

    this.currentSymbols = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    this.nextSymbols = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    this.container = domElement;

    this.reels = Array.from(this.container.getElementsByClassName("reel")).map(
      (reelContainer, idx) =>
        new Reel(reelContainer, idx, this.slotName,this.currentSymbols[idx])
    );

    if (config.inverted) {
      this.container.classList.add("inverted");
    }
  }
}
