<template>
  <div>
    <SortingWrapper />
  </div>
</template>

<script>
import SortingWrapper from './components/SortingWrapper.vue'

export default {
  name: 'App',
  components: {
    SortingWrapper
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.button {
  padding: 12px 20px;
  vertical-align: middle;
  color: #fff;
  font-size: 15px;
  background-color: #FF8D00;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
