<template lang="pug">
    div
        .incomplete(v-for="task in state.incompleteTasks" :key="task.title")
        |   {{ task.title }}) 
        .inProgress(v-for="task in state.inProgressTasks" :key="task.title")
        |   {{ task.title }}) 
</template>
<script>
import Vue from "vue";
    import Component from "vue-class-component";
    import { Observer } from "mobx-vue";
    import ViewModel from "../store/ViewModel";
    @Observer
    @Component
    export default class AddInput extends Vue {
        state = new ViewModel()
       
    }
</script>
<style lang="sass" scoped>
    
</style>