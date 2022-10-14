import { Question } from "../../domain/question";

export interface QuestionRepository{
    findQuestionById(question_id: number): Promise<Question | null>
    findQuestionByTitle(title: string): Promise<Question | null>
    create(question: Question): Promise<void>
}