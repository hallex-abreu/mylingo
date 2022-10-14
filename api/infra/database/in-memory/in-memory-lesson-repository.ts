import { Lesson } from "../../../domain/lesson";
import { LessonRepository } from "../../../application/repositories/lesson-repository";

export class InMemoryLessonRepository implements LessonRepository{
    public items: Lesson[] = [];

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