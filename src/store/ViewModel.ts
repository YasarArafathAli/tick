import {
  action,
  computed,
  observable
} from "mobx";

interface task {
  id: number,
  title: string,
  status: string,
  date: any,
  edit: boolean
}

let dateString = new Date().toISOString().slice(0,10);
export default class ViewModel {
  @observable todoList: task[] = [];
  @observable title: string = '';
  @observable todoDate: string = dateString;
  @observable displayList: task[] = [];
  
  
  @computed
  incompleteTasks() {
    return this.todoList.filter((task:task) => task.status === "Incomplete")
  }

  @computed
  inProgressTasks() {
    return this.todoList.filter((task:task) => task.date ===this.todoDate)
  }

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
  filterTodo() {
    this.displayList = this.todoList.filter((task:task) =>  task.date === this.todoDate)
    console.log(this.displayList)
  }

  @action
  addToTodo() {

    console.log(this.title)
    if (this.title === "") {
      return 0;
    }

    let todoObj = {
      id: parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(8).toString().replace(".", "")),
      title: this.title,
      status: 'Incomplete',
      date: dateString,
      edit: false
    }
    this.todoList.push(todoObj);
    this.title = '';
    this.filterTodo()
    this.saveLocal()

    console.log(todoObj)
    console.log(this.displayList)
  }

  @action
  editTodo(index: number) {
    this.displayList[index].edit = !this.displayList[index].edit;
  
    this.saveLocal();
  }

  @action
  deleteTodo(id: number) {
    this.todoList = this.todoList.filter(task => task.id!== id);
    this.displayList = this.displayList.filter(task => task.id!== id);
    console.log(this.todoList, this.displayList)
    this.saveLocal()
    }

  @action
  updateTodo(index:number ,id: number, todoName: string) {
    let taskObj: any = this.todoList.find(task => task.id === id);
    taskObj.title = todoName;
    this.displayList[index].edit = !this.displayList[index].edit;
    this.saveLocal();
  }

  
  @action
  completeTodo(id: number) {
    let taskObj: any = this.todoList.find(task => task.id === id);

    if (taskObj.status == 'Incomplete') {
      taskObj.status = "In Progress";
    } else if (taskObj.status == 'In Progress') {
      taskObj.status = "Completed";
    } else {
      taskObj.status = "Incomplete";
    }
    this.saveLocal();
  }


  @action
  clearTodo() {
    this.todoList = [];
    this.saveLocal();
  }

  @action
  saveLocal() {
    const listString = JSON.stringify(this.todoList);
    localStorage.setItem('todoList', listString);
  }


  @action
  capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

export const store = new ViewModel();