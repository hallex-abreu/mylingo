import { describe, expect, it } from "vitest";
import { InMemoryLessonRepository } from "../../infra/database/in-memory/in-memory-lesson-repository";
import { CreateLesson } from "./create-lesson";
import { GetAllLessons } from "./get-all-lessons";

describe('Get All Lessons', () => {
    it('Should be get all lessons', async () => {
        const lessonRepository = new InMemoryLessonRepository();

        const sutCreateLesson = new CreateLesson(lessonRepository);
        const sutGetAllLessons = new GetAllLessons(lessonRepository);

        for(let i = 0; i < 10; i++){
            await sutCreateLesson.execute({
                title: `Lesson ${i + 1}`,
                ordenation: i + 1
            });
        }

        expect(sutGetAllLessons.execute({})).resolves.toHaveProperty('content');
    });

    it('Should be verification that does not exist lessons', async () => {
        const lessonRepository = new InMemoryLessonRepository();

        const sutGetAllLessons = new GetAllLessons(lessonRepository);

        expect(sutGetAllLessons.execute({})).rejects.toBeInstanceOf(Error);
    });

    it('Should be validation quantity of pages where pass page 1 and size 5', async () => {
        const lessonRepository = new InMemoryLessonRepository();

        const sutCreateLesson = new CreateLesson(lessonRepository);
        const sutGetAllLessons = new GetAllLessons(lessonRepository);

        for(let i = 0; i < 10; i++){
            await sutCreateLesson.execute({
                title: `Lesson ${i + 1}`,
                ordenation: i + 1
            });
        }

        expect(sutGetAllLessons.execute({
            page: 1,
            size: 5
        })).resolves.toHaveProperty('total_pages', 2);
    });

    it('Should be validation that is the first page', async () => {
        const lessonRepository = new InMemoryLessonRepository();

        const sutCreateLesson = new CreateLesson(lessonRepository);
        const sutGetAllLessons = new GetAllLessons(lessonRepository);

        for(let i = 0; i < 10; i++){
            await sutCreateLesson.execute({
                title: `Lesson ${i + 1}`,
                ordenation: i + 1
            });
        }

        expect(sutGetAllLessons.execute({
            page: 1,
            size: 5
        })).resolves.toHaveProperty('first', true);
    });

    it('Should be validation that does not is the first page', async () => {
        const lessonRepository = new InMemoryLessonRepository();

        const sutCreateLesson = new CreateLesson(lessonRepository);
        const sutGetAllLessons = new GetAllLessons(lessonRepository);

        for(let i = 0; i < 10; i++){
            await sutCreateLesson.execute({
                title: `Lesson ${i + 1}`,
                ordenation: i + 1
            });
        }

        expect(sutGetAllLessons.execute({
            page: 2,
            size: 5
        })).resolves.toHaveProperty('first', false);
    });

    it('Should be validation that order is desc', async () => {
        const lessonRepository = new InMemoryLessonRepository();

        const sutCreateLesson = new CreateLesson(lessonRepository);
        const sutGetAllLessons = new GetAllLessons(lessonRepository);

        for(let i = 0; i < 10; i++){
            await sutCreateLesson.execute({
                id: i + 1,
                title: `Lesson ${i + 1}`,
                ordenation: i + 1
            });
        }

        const lessons = await sutGetAllLessons.execute({
            order: 'desc'
        })

        expect(lessons.content[0].id).toEqual(10);
    });

    it('Should be validation that order is asc', async () => {
        const lessonRepository = new InMemoryLessonRepository();

        const sutCreateLesson = new CreateLesson(lessonRepository);
        const sutGetAllLessons = new GetAllLessons(lessonRepository);

        for(let i = 0; i < 10; i++){
            await sutCreateLesson.execute({
                id: i + 1,
                title: `Lesson ${i + 1}`,
                ordenation: i + 1
            });
        }

        const lessons = await sutGetAllLessons.execute({
            order: 'asc'
        })

        expect(lessons.content[0].id).toEqual(1);
    });

    it('Should be validation sort is valid', async () => {
        const lessonRepository = new InMemoryLessonRepository();

        const sutCreateLesson = new CreateLesson(lessonRepository);
        const sutGetAllLessons = new GetAllLessons(lessonRepository);

        for(let i = 0; i < 10; i++){
            await sutCreateLesson.execute({
                id: i + 1,
                title: `Lesson ${i + 1}`,
                ordenation: i + 1
            });
        }

        expect(sutGetAllLessons.execute({
           sort: 'id'
        })).resolves.toHaveProperty('content');
    });

    it('Should be validation sort not is valid', async () => {
        const lessonRepository = new InMemoryLessonRepository();

        const sutCreateLesson = new CreateLesson(lessonRepository);
        const sutGetAllLessons = new GetAllLessons(lessonRepository);

        for(let i = 0; i < 10; i++){
            await sutCreateLesson.execute({
                id: i + 1,
                title: `Lesson ${i + 1}`,
                ordenation: i + 1
            });
        }

        expect(sutGetAllLessons.execute({
           sort: 'created_at'
        })).rejects.toBeInstanceOf(Error);
    });
});