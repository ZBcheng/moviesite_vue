<template>
  <div id="app">
    <router-view>
      <Index />
      <Login />
    </router-view>
  </div>
</template>

<script>
  import Index from './components/Index.vue'
  import Login from './components/Login.vue'

  export default {
    name: 'App',
    components: {
      Index,
      Login,
    }
  }
</script>

<style>
  #app {
    height: 100%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>