<template lang='pug'>
  .hello
    h1 {{msg}}
    //- Dashboard()
</template>

<script lang="ts">
import Vue from 'vue';
import Dashboard from './Dashboard.vue'
export default Vue.extend({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  components: {
    Dashboard
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='sass' scoped>
body
  background: var( #f5f5f5);
  color: #333333;

h1
  font-family: 'Permanent Marker',cursive;
  letter-spacing: 5px;
  margin: 0 0 20px;
  font-size: 40px;
  color: #349f4b;
  
h3 
  margin: 40px 0 0;

ul 
  list-style-type: none;
  padding: 0;

li 
  display: inline-block;
  margin: 0 10px;

a 
  color: #42b983;

</style>
