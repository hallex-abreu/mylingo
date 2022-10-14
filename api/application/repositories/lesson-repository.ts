import { Lesson } from "../../domain/lesson";

export interface LessonRepository{
    findLessonById(lesson_id: number): Promise<Lesson | null>
    findLessonByTitle(title: string): Promise<Lesson | null>
    findLessonByOrdenation(ordenation: number): Promise<Lesson | null>
    create(lesson: Lesson): Promise<void>
}