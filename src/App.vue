<template>
  <div id="app">
    <router-view>
      <Index />
      <Login />
      <Register />
      <Upload />
      <Detail />
      <Message />
      <Movie />
    </router-view>
  </div>
</template>

<script>
  import Index from './components/Index.vue'
  import Login from './components/Login.vue'
  import Register from './components/Register.vue'
  import Upload from './components/Upload.vue'
  import Detail from './components/Detail.vue'
  import Movie from './components/Movie.vue'

  export default {
    name: 'App',
    components: {
      Index,
      Login,
      Register,
      Upload,
      Detail,
      Movie,
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