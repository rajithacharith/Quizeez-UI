import { Component, OnInit } from '@angular/core';
import { SharedserviceService } from "../services/sharedservice.service";
import { ArrangedQuestionsFormat } from "../arranged-questions-format";
import { DataserviceService } from "../dataservice.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-paper',
  templateUrl: './admin-paper.component.html',
  styleUrls: ['./admin-paper.component.css']
})





export class AdminPaperComponent implements OnInit, ArrangedQuestionsFormat {
  [n: number]: string;
  toString(): string {
    throw new Error("Method not implemented.");
  }
  toLocaleString(): string {
    throw new Error("Method not implemented.");
  }
  join(separator?: string): string {
    throw new Error("Method not implemented.");
  }
  reverse(): string[] {
    throw new Error("Method not implemented.");
  }
  shift(): string {
    throw new Error("Method not implemented.");
  }
  slice(start?: number, end?: number): string[] {
    throw new Error("Method not implemented.");
  }
  sort(compareFn?: (a: string, b: string) => number): this {
    throw new Error("Method not implemented.");
  }
  splice(start: number, deleteCount?: number): string[];
  splice(start: number, deleteCount: number, ...items: string[]): string[];
  splice(start: any, deleteCount?: any, ...rest?: any[]) {
    throw new Error("Method not implemented.");
  }
  unshift(...items: string[]): number {
    throw new Error("Method not implemented.");
  }
  indexOf(searchElement: string, fromIndex?: number): number {
    throw new Error("Method not implemented.");
  }
  lastIndexOf(searchElement: string, fromIndex?: number): number {
    throw new Error("Method not implemented.");
  }
  every(callbackfn: (value: string, index: number, array: string[]) => boolean, thisArg?: any): boolean {
    throw new Error("Method not implemented.");
  }
  some(callbackfn: (value: string, index: number, array: string[]) => boolean, thisArg?: any): boolean {
    throw new Error("Method not implemented.");
  }
  forEach(callbackfn: (value: string, index: number, array: string[]) => void, thisArg?: any): void {
    throw new Error("Method not implemented.");
  }
  map<U>(callbackfn: (value: string, index: number, array: string[]) => U, thisArg?: any): U[] {
    throw new Error("Method not implemented.");
  }
  filter<S extends string>(callbackfn: (value: string, index: number, array: string[]) => value is S, thisArg?: any): S[];
  filter(callbackfn: (value: string, index: number, array: string[]) => , thisArg?: any): string[];
  filter(callbackfn: any, thisArg?: any) {
    throw new Error("Method not implemented.");
  }
  reduce(callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: string[]) => string): string;
  reduce(callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: string[]) => string, initialValue: string): string;
  reduce<U>(callbackfn: (previousValue: U, currentValue: string, currentIndex: number, array: string[]) => U, initialValue: U): U;
  reduce(callbackfn: any, initialValue?: any) {
    throw new Error("Method not implemented.");
  }
  reduceRight(callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: string[]) => string): string;
  reduceRight(callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: string[]) => string, initialValue: string): string;
  reduceRight<U>(callbackfn: (previousValue: U, currentValue: string, currentIndex: number, array: string[]) => U, initialValue: U): U;
  reduceRight(callbackfn: any, initialValue?: any) {
    throw new Error("Method not implemented.");
  }
  find<S extends string>(predicate: (this: void, value: string, index: number, obj: string[]) => value is S, thisArg?: any): S;
  find(predicate: (value: string, index: number, obj: string[]) => boolean, thisArg?: any): string;
  find(predicate: any, thisArg?: any) {
    throw new Error("Method not implemented.");
  }
  findIndex(predicate: (value: string, index: number, obj: string[]) => boolean, thisArg?: any): number {
    throw new Error("Method not implemented.");
  }
  fill(value: string, start?: number, end?: number): this {
    throw new Error("Method not implemented.");
  }
  copyWithin(target: number, start: number, end?: number): this {
    throw new Error("Method not implemented.");
  }
  [Symbol.iterator](): IterableIterator<string> {
    throw new Error("Method not implemented.");
  }
  entries(): IterableIterator<[number, string]> {
    throw new Error("Method not implemented.");
  }
  keys(): IterableIterator<number> {
    throw new Error("Method not implemented.");
  }
  values(): IterableIterator<string> {
    throw new Error("Method not implemented.");
  }
  [Symbol.unscopables](): { copyWithin: boolean; entries: boolean; fill: boolean; find: boolean; findIndex: boolean; keys: boolean; values: boolean; } {
    throw new Error("Method not implemented.");
  }

  public paperID:any;
  public questionID:any;
  public question:any;
  public answers:any;
  public correctAnswer:any;
  public includes:any;
  public length:any;
  public push:any;
  public pop:any;
  public concat:any;
  public noOfQuestions: number ;
  public message: any;
  public i: number ;
  public questionSet = {};
  public question0 : any;
  public paperStream : string ;
  public questionArray = [] ;
  public answer0Array = [];
  public answer1Array = [];
  public answer2Array = [];
  public answer3Array = [];
  public answer4Array = [];
  public correctAnswerArray = [];
  public answer5visible: boolean;

  public arrangedQuestion = {} as ArrangedQuestionsFormat;
  public setOfArrangedQuestions = {} ;
  questionAnswerArray: string [] = [];

  questionsForm: FormGroup;

  constructor(private shared: SharedserviceService, private dataService: DataserviceService, private router: Router,private formBuilder: FormBuilder) {  }

  ngOnInit() {

    console.log(this.arrangedQuestion);

    this.questionsForm = this.formBuilder.group({
      question: [{}, [Validators.required]],
      answer0: ['', [Validators.required]],
      answer1: ['', [Validators.required]],
      answer2: ['', [Validators.required]],
      answer3: ['', [Validators.required]],
      answer4: ['', [Validators.required]],
      correctAnswer: ['', [Validators.required]],
  });


    this.shared.currentMessage.subscribe((message) => {
      this.message = message;
      console.log(this.message);
    });
    this.paperID = this.message.paperID;
    this.noOfQuestions = this.message.noOfQuestions;
    this.paperStream = this.message.stream;
    console.log(this.paperStream);
    if (this.paperStream === 'A/L') {
      this.answer5visible = true;
    }
    if (this.paperStream === 'O/L') {
      this.answer5visible = false;
    }

    for (this.i =0;this.i < this.noOfQuestions;this.i++){
      const question = {
        'paperID': this.paperID,
        'questionID': this.i,
        'question': '',
        'answers': [],
        'correctAnswer':''
      };
      this.questionSet[this.i] = question;
    }

    console.log(this.questionSet);
  }

  addQuestions(){



    console.log("clicked");

    for(let i=0; i<this.questionArray.length; i++){
      this.arrangedQuestion.paperID = this.paperID;
      this.arrangedQuestion.questionID= i;
      this.arrangedQuestion.question= this.questionArray[i];
      this.arrangedQuestion.correctAnswer=parseInt( this.correctAnswerArray[i]);

      this.questionAnswerArray.push(this.answer0Array[i]);
      this.questionAnswerArray.push(this.answer1Array[i]);
      this.questionAnswerArray.push(this.answer2Array[i]);
      this.questionAnswerArray.push(this.answer3Array[i]);
      if(this.answer5visible){
        this.questionAnswerArray.push(this.answer4Array[i]);
      }
      this.arrangedQuestion.answers=this.questionAnswerArray;

      this.dataService.addQuestionAsObject(this.arrangedQuestion).subscribe(()=>{
        console.log("added the question");
        console.log(this.arrangedQuestion);
      });

      this.setOfArrangedQuestions[i]=this.arrangedQuestion;
      this.questionAnswerArray=[];
      this.arrangedQuestion={} as ArrangedQuestionsFormat;
    }


    console.log(this.setOfArrangedQuestions);
    this.router.navigateByUrl('/admin');
  }

  get f() { return this.questionsForm.controls; }


}
