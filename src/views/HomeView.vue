<template lang="pug">
  .home
    AddInput
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; 
import AddInput from '@/components/AddInput.vue'; 

export default Vue.extend({
  name: 'HomeView',
  components: {
    HelloWorld,
    AddInput
  },
});
</script>
