<template>
  <div id="app">
    <SlotComponent msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import SlotComponent from './components/Slot.vue'

export default {
  name: 'App',
  components: {
    SlotComponent
  }
}
</script>

<style>
</style>
