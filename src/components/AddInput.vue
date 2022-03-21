<template lang='pug'>
div
    div#input
        form(@submit='state.addToTodo()')
            input(type='text' v-model='state.title' placeholder='Add Todo..')
            input(type='date' v-model='state.inputDate' )
            input(type='time' v-model='state.inputTime' @change='state.console()')

            input.btn-green(type='submit' value='Add')
        input(type='date' @change='state.filterTodo()' v-model='state.todoDate' )
    .noTasks(v-if='state.displayList.length === 0')
        strong Add a task to track :) 
    ul.draggableList(v-else)
                li(v-for='(task,index) in state.displayList' :key='task.id' :id='task.id')
                    .todoItem(draggable='true' @dragstart='state.dragStart($event, index)' @dragover.prevent @drop='state.dragDrop($event,index)'  @dragenter.prevent)
                        .dragIcon()
                            p
                                i.fas.fa-ellipsis-v
                        .title
                            span(v-if='task.edit') 
                                form(@submit='state.updateTodo(index, task.id,task.title)')
                                    input.editInput(type='text' v-model='task.title' placeholder='Add Todo..')
                            span(v-else='' :class="{ 'task-done': task.status === 'Completed','inprogress': task.status === 'In Progress' }" @dblclick='state.editTodo(index)')
                                strong {{state.capitalize(task.title)}}
                        .endTime
                            p
                                i.item-icon.fas.fa-clock
                                    strong {{task.endTime}}
                        .status
                            p(:class="{'completed' : task.status === 'Completed','incomplete': task.status === 'Incomplete','inprogress' : task.status === 'In Progress'}") 
                                span(v-if="task.status === 'Incomplete'") 
                                    i.fas.fa-hourglass-start.item-icon
                                span(v-if="task.status === 'Completed'") 
                                    i.fas.fa-hourglass-end.item-icon
                                span(v-if="task.status === 'In Progress'") 
                                    i.fas.fa-hourglass-half.item-icon
                                span {{task.status}}
                        .controls
                            a.complete-item.item-icon(href='#' @click='state.completeTodo(task.id)')
                                i.fas.fa-check(v-if="task.status === 'In Progress'")
                                i.fas.fa-play(v-else-if="task.status === 'Incomplete'")
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
    // import draggable from 'vuedraggable';
    @Observer
    @Component
    export default class AddInput extends Vue {
        state = new ViewModel()
        mounted() { 
            this.state.fetchItems();
            this.state.filterTodo();
        }
        // components() {
        //     return {
        //         draggable
        //     }
        // }
       
       
    }
</script>
<style lang="sass" scoped>
    ul
        list-style-type: none;
        display: block;
    #input
        display: flex;
    form
        width: 70%
    input[type='date']
        width: 25%;
        padding: 5px;
    input[type='time']
        width: 20%;
        padding: 5px;
    .task-done 
        text-decoration: line-through;
        text-decoration: line-through;
        opacity: 0.5;

    .todoItem
        display: flex;
        background-color: #fff;
    
    .completed
        color: #25c060;
    
    .incomplete
        color: #d62828;  
    
    .inprogress
        color: #0300b1;
    
    .todoItem .title
        flex-grow: 3;
        width: 40%;
        margin: 16px;
        text-align: left;
    
    .todoItem .status, .todoItem .endTime
        text-align: left;
        width: 100px;
        font-size: 14px;
        padding: 5px;
    
    .todoItem .controls
        margin: 16px;
    .noTasks
        padding: 15px;
    .item-icon 
        font-size: 1.2rem;
        cursor: pointer;
    
    .complete-item:hover 
        color: #25c060;
    
    p strong
        padding: 0 0 15px 5px;
        font-size: 15px
    .edit-item:hover 
        color: #11b5e4;
    
    .over
        background-color: #999999;
    
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
        width: 75%;
        

    input[type='submit']
        width: 15%;
    
    
        
    
</style>