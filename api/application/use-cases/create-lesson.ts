import { Lesson } from "../../domain/lesson";
import { LessonRepository } from "../repositories/lesson-repository";

interface ICreateLessonRequest {
    id: number | null,
    title: string,
    ordenation: number
}

type ICreateLessonResponse = Lesson;

export class CreateLesson {
    constructor(
        private lessonRepository: LessonRepository
    ){}

    async execute({id, title, ordenation}: ICreateLessonRequest): Promise<ICreateLessonResponse>{
        const exist_lesson_by_title = await this.lessonRepository.findLessonByTitle(title);

        if(exist_lesson_by_title)
            throw new Error('Lesson already registered with title');
        
        const exist_lesson_by_ordernation = await this.lessonRepository.findLessonByOrdenation(ordenation);

        if(exist_lesson_by_ordernation)
            throw new Error('Lesson already registered with ordenation');

        const lesson = new Lesson({
            id,
            title,
            ordenation
        });

        await this.lessonRepository.create(lesson);

        return lesson;
    }   
}