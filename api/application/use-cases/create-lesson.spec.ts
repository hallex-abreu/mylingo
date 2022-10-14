import { describe, expect, it } from "vitest";
import { Lesson } from "../../domain/lesson";
import { InMemoryLessonRepository } from "../../infra/database/in-memory/in-memory-lesson-repository";
import { CreateLesson } from "./create-lesson";

describe('Create lesson', () => {
    it('Should be create an lesson', () => {
        const lessonRepository = new InMemoryLessonRepository();

        const sut = new CreateLesson(lessonRepository);

        expect(sut.execute({
            id: null,
            title: 'Introdução',
            ordenation: 1
        })).resolves.toBeInstanceOf(Lesson)
    });

    it('Not Should be create an lesson same title', async () => {
        const lessonRepository = new InMemoryLessonRepository();

        const sut = new CreateLesson(lessonRepository);

        await sut.execute({
            id: null,
            title: 'Introdução',
            ordenation: 1
        });

        expect(sut.execute({
            id: null,
            title: 'Introdução',
            ordenation: 1
        })).rejects.toBeInstanceOf(Error)
    });

    it('Not Should be create an lesson same ordenation', async () => {
        const lessonRepository = new InMemoryLessonRepository();

        const sut = new CreateLesson(lessonRepository);

        await sut.execute({
            id: null,
            title: 'Introdução',
            ordenation: 1
        });

        expect(sut.execute({
            id: null,
            title: 'Números',
            ordenation: 1
        })).rejects.toBeInstanceOf(Error)
    });
});