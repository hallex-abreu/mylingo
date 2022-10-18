import { Lesson } from "../../../domain/lesson";
import { LessonRepository } from "../../../application/repositories/lesson-repository";

export class InMemoryLessonRepository implements LessonRepository{
    public items: Lesson[] = [];

    async findAllLesssons(page: number, size: number, sort: string | undefined, order: string | undefined, filter: string | undefined): Promise<Lesson[] | null> {
        let lessons: Lesson[] = this.items;

        if(lessons.length === 0)
            return null;
        
        if(filter)
            lessons = lessons.filter(lesson => lesson.title.includes(filter));
        
   
        if(order)
            if(order === 'desc')
                lessons = lessons.reverse();

        return lessons.slice((page - 1) * size, page * size);;
    }

    async getCountLessons(filter: string | undefined): Promise<number> {
        let lessons: Lesson[] = this.items;
        
        if(filter)
            lessons = lessons.filter(lesson => lesson.title.includes(filter));

        return lessons.length;
    }

    async findLessonById(lesson_id: number): Promise<Lesson | null> {
        const lesson = this.items.find(lesson => lesson.id === lesson_id);

        if(!lesson)
            return null;

        return lesson;
    }

    async findLessonByTitle(title: string): Promise<Lesson | null> {
        const lesson = this.items.find(lesson => lesson.title === title);

        if(!lesson)
            return null;

        return lesson;
    }

    async findLessonByOrdenation(ordenation: number): Promise<Lesson | null> {
        const lesson = this.items.find(lesson => lesson.ordenation === ordenation);

        if(!lesson)
            return null;

        return lesson;
    }

    async create(lesson: Lesson): Promise<void> {
        this.items.push(lesson); 
    }
}