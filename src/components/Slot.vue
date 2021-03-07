<template>
  <div class="bg">
    <div id="slot">
      <div id="jackpot">Jackpot: <span id="jp">5.555.555</span></div>
      <div id="reels">
        <div class="reel"></div>
        <div class="reel"></div>
        <div class="reel"></div>
        <div class="reel"></div>
        <div class="reel"></div>
      </div>
      <div id="controls">
        <button type="button" ref="spin-button" @click="spin">SPIN</button>
        <label>
          <input type="checkbox" name="autoplay" v-model="autoplay" />
          Autoplay
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import Slot from '../scripts/Slot'
import Symbol from '../scripts/Symbol'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      slot: null,
      autoplay: false,
    }
  },
  methods: {
    async spin() {
      this.onSpinStart()

      this.slot.currentSymbols = this.slot.nextSymbols
      this.slot.nextSymbols = [
        [Symbol.random(), Symbol.random(), Symbol.random()],
        [Symbol.random(), Symbol.random(), Symbol.random()],
        [Symbol.random(), Symbol.random(), Symbol.random()],
        [Symbol.random(), Symbol.random(), Symbol.random()],
        [Symbol.random(), Symbol.random(), Symbol.random()],
      ]

      return Promise.all(
        this.slot.reels.map((reel) => {
          reel.renderSymbols(this.slot.nextSymbols[reel.idx])
          return reel.spin()
        })
      ).then(() => this.onSpinEnd())
    },
    onSpinStart() {
      this.$refs['spin-button'].disabled = true
      console.log("SPIN START")
    },
    onSpinEnd() {
      console.log("SPIN END")

      if (this.autoplay) {
        return window.setTimeout(() => this.spin(), 200)
      }

      this.$refs['spin-button'].disabled = false
    }
  },
  mounted() {
    const config = {
      inverted: true,
    }

    this.slot = new Slot(document.getElementById('slot'), config)
  }
}
</script>

<style scoped>
.bg {
  width: 100vw;
  height: 100vh;
  padding: 1rem;
  /* background-image: url("../assets/bg.jpg"); */
  background: #000000;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-family: "Roboto Condensed", sans-serif;
}

@media only screen and (max-width: 1200px) {
  .bg {
    /* background-image: url("../assets/bg_small.jpg"); */
    background: #000000;
  }
}

#reels {
  display: flex;
  width: 100vw;
  height: calc((3 / 5) * 100vw);
  max-height: calc(90vh - 50px - 40px);
  max-width: calc((5 / 3) * (90vh - 50px - 40px));
}

.reel {
  overflow: hidden;
  width: 20%;
  height: 100%;
}

.reel > .icons > img {
  width: calc(100% + 6px);
  margin: -3px 0 0 -3px;
  height: auto;

  /* enable gpu accelaration, fixes iOS flicker */
  transform: translate3d(0, 0, 0);
}

#controls {
  background-color: rgba(255, 255, 255, 0.9);
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 30px;
}

#controls label {
  display: flex;
  align-items: center;
  margin: 0;
}

#controls label input {
  margin-right: 5px;
}

input[type="checkbox"] {
  width: 40px;
  height: 40px;
}

#jackpot {
  color: #d5ad6d;
  font-size: 40px;
  text-align: center;
}

#slot.inverted .reel {
  transform: scaleY(-1);
}

#slot.inverted .reel > .icons > img {
  transform: scaleY(-1);
}
</style>
