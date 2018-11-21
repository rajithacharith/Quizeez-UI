import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedserviceService {
  public stream: string;
  public subject: string;
  public year: number;
  public lesson: string;


  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();


  constructor() { }

  changeMessage(message: any) {
    this.messageSource.next(message)
    console.log('added message');
  }

  setStream(stream: string){ this.stream = stream; console.log('stream set'); }
  setSubject(subject: string){ this.subject = subject; console.log('stream set'); }
  setYear(year:number){ this.year = year; console.log('stream set'); }
  setLesson(lesson:string){ this.lesson = lesson; }

  getStream(){ return this.stream;}
  getSubject(){ return this.subject;}
  getYear(){ return this.year;}
  getLesson(){ return this.lesson;}
}
