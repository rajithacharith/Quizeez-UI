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
    return this.http.get(`${this.url}/papers?filter[where][paperID]=${id}`);
  }


  /*get paper filtered by the selected 'stream' */
  filterPaperByStream(stream : string){
    return this.http.get(`${this.url}/papers?filter[where][stream]=${stream}`);
  }

  /*get paper filtered by the selected 'language' */
  filterPaperByLanguage(language : string){
    return this.http.get(`${this.url}/papers?filter[where][language]=${language}`);
  }

  /*get paper filtered by the selected 'year' */
  filterPaperByYear(year : number){
    return this.http.get(`${this.url}/papers?filter[where][year]=${year}`);
  }


  /*get paper filtered by the selected 'subject' */
  filterPaperBySubject(subject : string){
    return this.http.get(`${this.url}/papers?filter[where][subject]=${subject}`);
  }

  /*get paper filtered by the selected 'stream,subject and year' */
  filterPaperByAll(stream : string,subject : string,year : number){
    return this.http.get(`${this.url}/papers?filter[where][stream]=${stream}&filter[where][year]=${year}&filter[where][subject]=${subject}`);
  }

  /*get paper filtered by the selected 'stream,subject,year and language' */
  filterPaperByAllandLanguage(stream : string,subject : string,year : number,language: string){
    return this.http.get(`${this.url}/papers?filter[where][stream]=${stream}&filter[where][year]=${year}&filter[where][subject]=${subject}&filter[where][language]=${language}`);
  }

  /*get paper filtered by the selected 'year' */
  filterPaperByStreamAndLanguage(stream : string, language: string){
    return this.http.get(`${this.url}/papers?filter[where][stream]=${stream}&filter[where][language]=${language}`);
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
  /*add a question object to the paper */
  addQuestionAsObject(ques: any) {
    return this.http.post(`${this.url}/questions`, ques);

  }


  /*get the questions in a given paper */
  getQuestionFilterByPaperID(paperID : number){
    return this.http.get(`${this.url}/questions?filter[where][paperID]=${paperID}`);
  }
  /**get the questions in a given paper filtered by questionID*/
  /* getQuestionFilterByQuestionID(questionID : number){
    return this.http.get(`${this.url}/questions?filter[where][questionID]=${questionID}`);
  }  */
  /*get all answers given by all students */
  getAnswers(){
    return this.http.get(`${this.url}/answers`);
  }

  /* submit answers for a given paper */
  /* Call the function with studentID,paperID and answers for questions as an Object to submit the answer */

  storeMarkedAnswers(studentID : number,paperID : number,markedAnswers : boolean[]){
    const ans = {
      studentID : studentID,
      paperID : paperID,
      markedAnswers : markedAnswers
    }
    return this.http.post(`${this.url}/studentAnswers`,ans);
  }

  userLogin(email : string , password : string){
    const access = {
      email: email,
      password : password
    }
    return this.http.post(`${this.url}/Users/login`,access);
  }


  userLogout(accessToken : string){
    return this.http.post(`${this.url}/Users/logout`,accessToken);
  }
  /* Add paper as a object */
  addPaper(paper: any) {
    return this.http.post(`${this.url}/papers`, paper);
  }

  /* Add subject */
  addSubject(subjectName : string,subjectStream : string){
    const newSubject = {
      subjectName : subjectName,
      stream : subjectStream
    }
    return this.http.post(`${this.url}/subjects`, newSubject);
  }

  getSubjectsByStream(stream : string){
    return this.http.get(`${this.url}/subjects?filter[where][stream]=${stream}`);
  }

  getAllSubjects(){
    return this.http.get(`${this.url}/subjects`);
  }

  /* Register Users */
  register(email: string, password: string) {
    const User = {
      email : email,
      password : password
    };
    return this.http.post(`${this.url}/Users`, User);
  }



}
