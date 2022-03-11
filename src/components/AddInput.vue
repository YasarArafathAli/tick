<template>
    <div>
        <form @submit ='addTodo'>
        <input type='text' v-model='todo'  placeholder="Add Todo.."/>
        <input type='submit' class ="btn-green " value="Add">

        </form>
        <ul>
            <div class="todoItem" v-for='(todo,index) in todoList' :key ='index' :id='index'>
                <div class='title' >
                <span v-if='todo.edit'>
                    <form @submit='updateTodo(index,todo.title)'>
                    <input type='text' class='editInput' v-model='todo.title'  placeholder="Add Todo.."/>
                    </form>
                    </span>
                 <span v-else :class="{ 'task-done': todo.status == 'Completed','inprogress': todo.status == 'In Progress' }" @dblclick='editTodo(index)'>
                     <strong>{{capitalize(todo.title)}}</strong>
            </span>
                
                </div>
                <div class='status' >
                    <p :class="{'completed' : todo.status == 'Completed','incomplete': todo.status == 'Incomplete','inprogress' : todo.status == 'In Progress'}">{{todo.status}}</p>
                </div>
                <div class='controls'>
                    <a href="#" class="complete-item item-icon" @click="completeTodo(index)">
                        <i v-if = "todo.status == 'In Progress'" class="fas fa-check" ></i>
                        <i v-else-if = "todo.status == 'Incomplete'" class="fas fa-play" ></i>
                        <i v-else class="fas fa-undo" ></i>
                    </a>
       <a href="#" class="edit-item item-icon" @click="editTodo(index)">
           <i class="far fa-edit"></i>
           </a>
       <a href="#" class="delete-item item-icon" @click="deleteTodo(index)">
           <i class="far fa-times-circle"></i>
           </a>
                </div>
                </div>

        </ul>
        <button class ="btn-green clear" @click="clearTodo(this)">Clear</button>
    </div>
</template>
<script>
import Vue from 'vue';

class Todo {
    constructor(name) {
        return {
                title: name,
                status: 'Incomplete',
                edit: false
            }
        
    }
}

export default Vue.extend({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
        return {
            todo: "",
            todoList : []
        }
    },
    mounted() {
    if (localStorage.getItem('todoList')) {
            try { 
              this.todoList = JSON.parse(localStorage.getItem('todoList'));
              console.log(this.todoList)
            } catch(e) {
              localStorage.removeItem('todoList');
            }
          }
  },
    methods: {
        addTodo: function (e) {
            e.preventDefault();
            console.log()
            if(this.todo == ""){
                return 0;
            }
            let todo = new Todo(this.todo)
            this.todoList.push(todo);
            this.todo = '';
            this.saveLocal()
        },
        completeTodo: function (index) {
            if (this.todoList[index].status == 'Incomplete') {
                this.todoList[index].status = "In Progress";
            }
            else if(this.todoList[index].status == 'In Progress'){
                this.todoList[index].status = "Completed";

            }
            else{
                this.todoList[index].status = "Incomplete";
            }

            this.saveLocal();
        },
        editTodo: function (index) {
            this.todoList[index].edit = !this.todoList[index].edit;
            this.saveLocal();
        },
        updateTodo: function (index,todoName){
            this.todoList[index].title = todoName;
            this.todoList[index].edit = !this.todoList[index].edit;     
            this.saveLocal();
        },
        deleteTodo : function (index) {
            this.todoList.splice(index,1);
            this.saveLocal();
        },
        saveLocal : function(){
            const listString = JSON.stringify(this.todoList);
            localStorage.setItem('todoList', listString);
        },
        clearTodo : function () {
            this.todoList = [];
            this.saveLocal(); 
        },
        capitalize: function (str) {
            return str.charAt(0).toUpperCase() + str.slice(1); 
        }
    }
});
</script>
<style scoped>
     ul{
        list-style-type: none;
    }
    .task-done {
  text-decoration: line-through;
  text-decoration: line-through;
        opacity: 0.5;
}
    .todoItem{
        display: flex;
    }
    .completed{
        color: #25c060;
    }
    .incomplete{
        color:#d62828;
    }
    .inprogress{
        color:#0300b1;
    }
    .todoItem .title{
        flex-grow: 3;
        width: 55%;
        margin: 16px;
        text-align: left;
    }
    .todoItem .status{
        text-align: left;
        width: 100px;
        font-size: 14px;
        padding: 5px;
    }
    .todoItem .controls{
        margin: 16px;
    }
    .item-icon {
        font-size: 1.2rem;
        cursor: pointer;
    }
    .complete-item:hover {
        color: #25c060;
    }
    .edit-item:hover {
        color: #11b5e4;
    }
    .delete-item:hover {
        color: #d62828;
    }
    .btn-green {
        background: transparent;
        color: #25c060;
    }
    .btn-green:hover {
        background:#25c060;
        color: #232323;
    }
    
    .editInput{
        width:50%;
        border: none;
    }
    
    .controls a{
        padding: 0 10px;
    }
    .clear{
        padding: 8px 20px;
        border-radius: 5px;
    }
    input{
        padding: 8px;
        border-radius:5px;
        outline: none;
    }
    input[type='text']{
        width: 80%;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        border-right: none;
    }
    input[type='submit']{
        width: 12%;
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        
    }
</style>