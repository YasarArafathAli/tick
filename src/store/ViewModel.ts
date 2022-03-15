import {
  action,
  computed,
  observable
} from "mobx";

interface task {
    title: string,
    status: string,
    edit: boolean
}

export default class ViewModel {
  @observable todoList: task[] = [];
  @observable title: string = '';

  @action.bound
  async fetchItems() {
    if (localStorage.getItem('todoList')) {
      try {
        var localArray: string = localStorage.getItem('todoList') || '[]'
        this.todoList = JSON.parse(localArray);
      } catch (e) {
        localStorage.removeItem('todoList');
      }
    }
  }

  @action
  capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  @action
  clearTodo() {
    this.todoList = [];
    this.saveLocal();
  }



  @action
  deleteTodo(index: number) {
    this.todoList.splice(index, 1);
    this.saveLocal();
  }


  @action
  updateTodo(index: number, todoName: string) {
    this.todoList[index].title = todoName;
    this.todoList[index].edit = !this.todoList[index].edit;
    this.saveLocal();
  }


  @action
  completeTodo(index: number) {
    console.log(this.todoList[index])
    if (this.todoList[index].status == 'Incomplete') {
      this.todoList[index].status = "In Progress";
    } else if (this.todoList[index].status == 'In Progress') {
      this.todoList[index].status = "Completed";

    } else {
      this.todoList[index].status = "Incomplete";
    }

    this.saveLocal();
  }

  @action
  editTodo(index: number) {
    this.todoList[index].edit = !this.todoList[index].edit;
    this.saveLocal();
  }

  @action
  addToTodo() {

    console.log(this.title)
    if (this.title === "") {
      return 0;
    }
    let todoObj = {
      title: this.title,
      status: 'Incomplete',
      edit: false
    }
    this.todoList.push(todoObj);
    this.title = '';
    this.saveLocal()
    console.log(todoObj)
  }

  @action
  saveLocal() {
    const listString = JSON.stringify(this.todoList);
    localStorage.setItem('todoList', listString);
  }
}

export const store = new ViewModel();