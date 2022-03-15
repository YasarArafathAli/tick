<template lang='pug'>
div
    div#input
        form(@submit='state.addToTodo()')
            input(type='text' v-model='state.title' placeholder='Add Todo..')
            input.btn-green(type='submit' value='Add')
        input(type='date' @change='state.filterTodo()' v-model='state.todoDate' )
    ul
    .todoItem(v-for='(task,index) in state.displayList' :key='task.id' :id='task.id')
      .title
        span(v-if='task.edit')
          form(@submit='state.updateTodo(index, task.id,task.title)')
            input.editInput(type='text' v-model='task.title' placeholder='Add Todo..')
        span(v-else='' :class="{ 'task-done': task.status == 'Completed','inprogress': task.status == 'In Progress' }" @dblclick='state.editTodo(index)')
          strong {{state.capitalize(task.title)}}
      .status
        p(:class="{'completed' : task.status == 'Completed','incomplete': task.status == 'Incomplete','inprogress' : task.status == 'In Progress'}") {{task.status}}
      .controls
        a.complete-item.item-icon(href='#' @click='state.completeTodo(task.id)')
          i.fas.fa-check(v-if="task.status == 'In Progress'")
          i.fas.fa-play(v-else-if="task.status == 'Incomplete'")
          i.fas.fa-undo(v-else='')
        a.edit-item.item-icon(href='#' @click='state.editTodo(index)')
          i.far.fa-edit
        a.delete-item.item-icon(href='#' @click='state.deleteTodo(task.id)')
          i.far.fa-times-circle
    button.btn-green.clear(@click='state.clearTodo(this)') Clear

</template>
<script lang='ts'>
import Vue from "vue";
    import Component from "vue-class-component";
    import { Observer } from "mobx-vue";
    import ViewModel from "../store/ViewModel";
    @Observer
    @Component
    export default class AddInput extends Vue {
        state = new ViewModel()
        mounted() { 
            this.state.fetchItems();
            this.state.filterTodo();
        }
       
    }
</script>
<style lang="sass" scoped>
    ul
        list-style-type: none;
    #input
        display: flex;

    form
        width: 70%
    input[type='date']
        width: 20%;
        padding: 5px;
    .task-done 
        text-decoration: line-through;
        text-decoration: line-through;
        opacity: 0.5;

    .todoItem
        display: flex;
    
    .completed
        color: #25c060;
    
    .incomplete
        color: #d62828;  
    
    .inprogress
        color: #0300b1;
    
    .todoItem .title
        flex-grow: 3;
        width: 55%;
        margin: 16px;
        text-align: left;
    
    .todoItem .status
        text-align: left;
        width: 100px;
        font-size: 14px;
        padding: 5px;
    
    .todoItem .controls
        margin: 16px;
    
    .item-icon 
        font-size: 1.2rem;
        cursor: pointer;
    
    .complete-item:hover 
        color: #25c060;
    
    .edit-item:hover 
        color: #11b5e4;
    
    .delete-item:hover 
        color: #d62828;
    
    .btn-green 
        background: transparent;
        color: #25c060;
    
    .btn-green:hover 
        background: #25c060;
        color: #232323;
    
    
    .editInput
        width: 50%;
        border: none;
    
    
    .controls a
        padding: 0 10px;
    
    .clear
        padding: 8px 20px;
        border-radius: 5px;
    
    input
        padding: 8px;
        border-radius: 5px;
        outline: none;
    
    input[type='text']
        width: 80%;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        border-right: none;
    
    input[type='submit']
        width: 12%;
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        
    
</style>