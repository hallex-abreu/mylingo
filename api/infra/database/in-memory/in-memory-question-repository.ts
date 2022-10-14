
import { Question } from "../../../domain/question";
import { QuestionRepository } from "../../../application/repositories/question-repository";

export class InMemoryQuestionRepository implements QuestionRepository{
    public items: Question[] = [];

    async findQuestionById(question_id: number): Promise<Question | null> {
        const question = this.items.find(question => question.id === question_id);

        if(!question)
            return null;

        return question;
    }

    async findQuestionByTitle(title: string): Promise<Question | null> {
        const question = this.items.find(question => question.title === title);

        if(!question)
            return null;

        return question;
    }

    async create(question: Question): Promise<void> {
        this.items.push(question); 
    }
}