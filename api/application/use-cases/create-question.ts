import { Question } from "../../domain/question";
import { LessonRepository } from "../repositories/lesson-repository";
import { QuestionRepository } from "../repositories/question-repository";

interface ICreateQuestionReques{
    id?: number,
    lesson_id: number,
    title: string,
    response: string
}

type ICreateQuestionResponse = Question;

export class CreateQuestion{
    constructor(
        private lessonRespository: LessonRepository,
        private questionRepository: QuestionRepository
    ){}   

    async execute({id, lesson_id, title, response}: ICreateQuestionReques): Promise<ICreateQuestionResponse>{
        const exist_lesson_by_id = await this.lessonRespository.findLessonById(lesson_id);

        if(!exist_lesson_by_id)
            throw new Error('Does not exist lesson with id');

        const exist_question_by_title = await this.questionRepository.findQuestionByTitle(title);

        if(exist_question_by_title)
            throw new Error('Question already registered with title');

        const question = new Question({
            id,
            lesson_id,
            title,
            response,
            options: null
        });

        await this.questionRepository.create(question);

        return question;
    }   
}