import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Bugapoint} from "../model/bugapoint";

@Component({
  selector: 'app-bugapoint-drag-and-drop',
  templateUrl: './bugapoint-drag-and-drop.component.html',
  styleUrls: ['./bugapoint-drag-and-drop.component.css']
})
export class BugapointDragAndDropComponent {

  routeBugapoints: Bugapoint[] = [{"id" : "1","title" : "hurensohnPunkt", "longitude":40,"latitude":40}, {"id" : "2","title" : "hurensohnPunktolol", "longitude":40,"latitude":40}];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.routeBugapoints, event.previousIndex, event.currentIndex);
  }

  deleteElement(id: string) {
    this.routeBugapoints = this.routeBugapoints.filter(item=>item.id!==id);
  }

  public addElement(bugapoint: Bugapoint){
    this.routeBugapoints.push(bugapoint);
  }
}

