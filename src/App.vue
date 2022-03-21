<template>
  <div id="app">
    <div class="container">
    <nav>
      <HelloWorld msg='TaskIt'/>
      <div class="navlink">
        <ul>
          <li>
      <router-link to="/">Home</router-link> 
          </li>
          <li>|</li>
          <li>
      <router-link to="/about">About</router-link>
          </li>
        </ul>

      </div>
    </nav>
    <router-view/>
    </div>
  </div>
</template>

<script>
  import HelloWorld from '@/components/HelloWorld.vue'; 

export default {
  name: 'app',
  components: {
  HelloWorld

  }

}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');

#app {
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  text-align: center;
  color: #2c3e50;
  margin: 20px;
  font-size: 18px;
}

nav {
  padding: 30px;
  display: flex;
  justify-content: space-around;
}

ul{
  display: flex;
  list-style-type: none;
}
li{
  padding: 10px
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.container{
  max-width: 800px;
  margin: auto;
}
</style>
