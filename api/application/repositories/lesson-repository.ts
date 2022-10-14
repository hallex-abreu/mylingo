import { Lesson } from "../../domain/lesson";

export interface LessonRepository{
    findLessonById(lesson_id: number): Promise<Lesson | null>
    findLessonByTitle(title: string): Promise<Lesson | null>
    findLessonByOrdenation(ordenation: number): Promise<Lesson | null>
    findAllLesssons(page: number, size: number, sort: string | null, order: string | null, filter: string | null): Promise<Lesson[] | null>
    getCountLessons(filter: string | null): Promise<number>
    create(lesson: Lesson): Promise<void>
}