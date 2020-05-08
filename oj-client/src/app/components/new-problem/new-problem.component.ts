import { Component, OnInit, Inject } from '@angular/core';
import { Problem } from '../../models/problem.model';
import { DataService } from '../../services/data.service';

const DEFAULT_PROBLEM: Problem = Object.freeze({
  id: 0,
  name: "",
  desc: "",
  difficulty: "default"
});

@Component({
  selector: 'app-new-problem',
  templateUrl: './new-problem.component.html',
  styleUrls: ['./new-problem.component.css']
})
export class NewProblemComponent implements OnInit {

  public difficulties = ["Easy", "Medium", "Hard", "Super"];

  newProblem: Problem = Object.assign({}, DEFAULT_PROBLEM);

  constructor(@Inject("data") private data: DataService) { }

  ngOnInit() {
  }

  nameErrorMsg: string = '';
  descriptionErrorMsg: string = '';
  generalErrorMsg: string = '';

  emptyNameCheck(){
    if (!this.newProblem.name.length) {
      this.nameErrorMsg= 'Problem name cannot be empty';
    }else{
      this.nameErrorMsg='';
    }
  }

  emptyDescriptionCheck(){
    if (!this.newProblem.desc.length) {
      this.descriptionErrorMsg= 'Problem description cannot be empty';
    }else{
      this.descriptionErrorMsg='';
    }
  }

  addProblem(): void {
    if(!this.newProblem.name.length || !this.newProblem.desc.length || this.newProblem.difficulty== "default"){
        this.generalErrorMsg= 'Invalid inputs';
    }else{
      this.data.addProblem(this.newProblem)
             .catch(error =>console.log(error._body));
             this.newProblem = Object.assign({}, DEFAULT_PROBLEM);
    }
  }

}
