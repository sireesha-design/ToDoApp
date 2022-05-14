import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,Validators}from'@angular/forms';

import { ITask } from '../model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
todoForm !: FormGroup;
tasks: ITask []=[];
inProgress: ITask []=[];
done: ITask []=[];
updatId!:any;
isEditEnabled:boolean=false;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.todoForm=this.fb.group({
      item:['',Validators.required]
    })
  }
  addTask(){
    this.tasks.push({
      description:this.todoForm.value.item,
      done:false,
    })
    this.todoForm.reset();
  }
  onEdit(item:ITask,i:number){
this.todoForm.controls['item'].setValue(item.description);
this.updatId=i;
this.isEditEnabled=true;
  }
  updateTask(){
    this.tasks[this.updatId].description=this.todoForm.value.item;
    this.tasks[this.updatId].done=false;
    this.todoForm.reset();
    this.updatId=undefined;
    this.isEditEnabled=false;
    }
  deleteTask(i:number){
    this.tasks.splice(i,2);

  }
  deleteInProgressTask(i:number){
    this.inProgress.splice(i,2);

  }  
  deleteDoneTask(i:number){
    this.done.splice(i,2);

  }
  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
