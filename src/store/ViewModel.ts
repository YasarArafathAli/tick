import {
  action,
  computed,
  observable
} from "mobx";

interface task {
  id: number,
  title: string,
  status: string,
  date: string,
  endTime: string
  edit: boolean
}

let dateString = new Date().toISOString().slice(0,10);
let timeString = new Date().toString().slice(16,21);
export default class ViewModel {
  @observable todoList: task[] = [];
  @observable displayList: task[] = [];
  @observable todoDate: string = dateString;
  @observable title: string = '';
  @observable inputDate: string = dateString;
  @observable inputTime: string = timeString;

  @observable overActive: boolean = false;

  
  
  @computed
  incompleteTasks() {
    return this.todoList.filter((task:task) => task.status === "Incomplete")
  }

  @computed
  inProgressTasks() {
    return this.todoList.filter((task:task) => task.status === "In Progress")
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
    this.displayList = this.todoList.filter((task:task) =>  task.date === this.todoDate);
    this.sortTodo();
  }

  @action
  dragStart(evt:any, index:any ){
    console.log('Drag Element Index:')
    evt.dataTransfer.dropEffect = 'move'
    evt.dataTransfer.effectAllowed = 'move'
    evt.dataTransfer.setData('itemID', index)
    console.log(index)
  }

 
  @action
  dragDrop(evt: any,index: number){
    console.log('Drop Element Index:');
    const oldIndex = evt.dataTransfer.getData('itemID')
    this.displayList[oldIndex] = this.displayList.splice(index,1,this.displayList[oldIndex])[0]
    console.log(this.displayList)
  }

  @action
  sortTodo(){
    this.displayList = this.displayList.sort((a,b) => a.id-b.id)
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
      date: this.inputDate,
      endTime: this.inputTime,
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
    this.filterTodo();
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
    this.todoList = this.todoList.filter(x => !this.displayList.includes(x))
    this.displayList = [];
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