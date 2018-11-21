import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class SharedserviceService {
  public stream: string;
  public subject: string;
  public year: number;
  public lesson: string;



  constructor() { }

  setStream(stream:string){ this.stream = stream; }
  setSubject(subject:string){ this.subject = subject; }
  setYear(year:number){ this.year = year; }
  setLesson(lesson:string){ this.lesson = lesson; }

  getStream(){ return this.stream;}
  getSubject(){ return this.subject;}
  getYear(){ return this.year;}
  getLesson(){ return this.lesson;}
}
