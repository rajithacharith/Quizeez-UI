export interface ArrangedQuestionsFormat extends Array<string>{
        paperID: number,
        questionID: number;
        question: string;
        answers:string[];
        correctAnswer:number;
      
}
