import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  
  url = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { 
  }

  getPapers(){
    return this.http.get(`${this.url}/papers`);
  }


  getPaperByID(id : number){
    return this.http.get(`${this.url}/papers/${id}`);
  }
  
  /*answerQuestion(studentID : number , paperID: number , questionResult : object){};*/

  getQuestions(){
    return this.http.get(`${this.url}/questions`);
  }

  

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

  filterPaperByStream(stream : string){
    return this.http.get(`${this.url}/papers?filter[where][stream]=${stream}`);
  }

  filterPaperByYear(year : number){
    return this.http.get(`${this.url}/papers?filter[where][year]=${year}`);
  }

  filterPaperBySubject(subject : string){
    return this.http.get(`${this.url}/papers?filter[where][subject]=${subject}`);
  }

  filterPaperByAll(stream : string,subject : string,year : number){
    return this.http.get(`${this.url}/papers?filter[where][stream]=${stream}&filter[where][year]=${year}&filter[where][subject]=${subject}`);
  }
/*
  updateQuestion(paperID : number,questionID: number,question :string,answers : string [],correctAnswer : number){
    
    const ques = {
      paperID : paperID,
      questionID : questionID,
      question : question,
      answers : answers,
      correctAnswer : correctAnswer
    };

    return this.http.post(`${this.url}/questions/${questionID}`,ques);

  }
*/

}
