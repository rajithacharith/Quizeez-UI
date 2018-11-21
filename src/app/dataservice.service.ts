import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  
  url = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { 
  }

  /*get all the papers that have been uploaded so far */
  getPapers(){
    return this.http.get(`${this.url}/papers`);
  }

  /*get the paper by ID*/
  getPaperByID(id : number){
    return this.http.get(`${this.url}/papers/${id}`);
  }
  
  
  /*get paper filtered by the selected 'stream' */
  filterPaperByStream(stream : string){
    return this.http.get(`${this.url}/papers?filter[where][stream]=${stream}`);
  }

  /*get paper filtered by the selected 'year' */
  filterPaperByYear(year : number){
    return this.http.get(`${this.url}/papers?filter[where][year]=${year}`);
  }

  /*get paper filtered by the selected 'lesson' */
  filterPaperByLesson(lesson : string){
    return this.http.get(`${this.url}/papers?filter[where][lesson]=${lesson}`);
  }

  /*get paper filtered by the selected 'subject' */
  filterPaperBySubject(subject : string){
    return this.http.get(`${this.url}/papers?filter[where][subject]=${subject}`);
  }

  /*get paper filtered by the selected 'stream,subject and year' */
  filterPaperByAll(stream : string,subject : string,year : number){
    return this.http.get(`${this.url}/papers?filter[where][stream]=${stream}&filter[where][year]=${year}&filter[where][subject]=${subject}`);
  }

  /*get paper filtered by the selected 'stream,subject,year and lesson' */
  filterPaperByAllandLesson(stream : string,subject : string,year : number,lesson : string){
    return this.http.get(`${this.url}/papers?filter[where][stream]=${stream}&filter[where][year]=${year}&filter[where][subject]=${subject}&filter[where][lesson]=${lesson}`);
  }

  /*get all the questions in all papers*/
  getQuestions(){
    return this.http.get(`${this.url}/questions`);
  }

  /*add a question to the paper */
  addQuestion(paperID : number,questionID: number,question :string,answers : string [],correctAnswer : number){
    
    const ques = {
      paperID : paperID,
      questionID : questionID,
      question : question,
      answers : answers,
      correctAnswer : correctAnswer
    };

    return this.http.post(`${this.url}/questions`,ques);

  }
  /*get the questions in a given paper */
  getQuestionFilterByPaperID(paperID : number){
    return this.http.get(`${this.url}/questions?filter[where][paperID]=${paperID}`);
  }

   
  /*get all answers given by all students */
  getAnswers(){
    return this.http.get(`${this.url}/answers`);
  }

  /* submit answers for a given paper */
  /* Call the function with studentID,paperID and answers for questions as an Object to submit the answer */
  submitAnswers(studentID : number,paperID : number,questionResult : Object){
    const answ = {
      studentID : studentID,
      paperID : paperID,
      questionResult:questionResult
    }

    return this.http.post(`${this.url}/answers`,answ);
  }






}
