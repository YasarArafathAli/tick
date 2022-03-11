import { action, computed, observable } from "mobx";
export default class ViewModel {
    @observable todoList: Object = [];

   
    @action.bound async fetchUsers() {
    	if (localStorage.getItem('todoList')) {
            try {
              var localArray: string  = localStorage.getItem('todoList') || '[]'
              this.todoList = JSON.parse(localArray);
              console.log(this.todoList)
            } catch(e) {
              localStorage.removeItem('todoList');
            }
          }                                                           
    }
}