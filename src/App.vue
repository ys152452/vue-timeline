<template>
  <div id="app">
    <h1> Vue-Timeline</h1>
    <router-link to='/'>example_top</router-link>
    <router-link to='1'>example_left</router-link>
    <router-link to='2'>example_bottom</router-link>
    <router-link to='3'>example_right</router-link>
    <router-link to='4'>example_top-bottom</router-link>
    <router-link to='5'>example_left-right</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang='scss'>
body,html{
  width: 100%;
  height: 100%;
  background:rgba(240, 238, 135, 0.204)
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 100%;
  height: 100%;
}
</style>
