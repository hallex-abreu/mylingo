import { describe, expect, it } from "vitest";
import { Question } from "../../domain/question";
import { InMemoryLessonRepository } from "../../infra/database/in-memory/in-memory-lesson-repository";
import { InMemoryQuestionRepository } from "../../infra/database/in-memory/in-memory-question-repository";
import { CreateLesson } from "./create-lesson";
import { CreateQuestion } from "./create-question";


describe('Create lesson', () => {
    it('Should be create an question', async () => {
        const lessonRepository = new InMemoryLessonRepository();
        const questionRepository = new InMemoryQuestionRepository();

        const stuLesson = new CreateLesson(
            lessonRepository
        );

        const sutQuestion = new CreateQuestion(
            lessonRepository,
            questionRepository 
        );

        await stuLesson.execute({
            id: 1,
            title: 'Introdução',
            ordenation: 1
        });

        expect(sutQuestion.execute({
            id: null,
            lesson_id: 1,
            title: 'Café e chá por favor',
            response: 'Coffee and tea please'
        })).resolves.toBeInstanceOf(Question)
    });

    it('Not Should be create an question where does not exist lesson id', async () => {
        const lessonRepository = new InMemoryLessonRepository();
        const questionRepository = new InMemoryQuestionRepository();

        const stuLesson = new CreateLesson(
            lessonRepository
        );

        const sutQuestion = new CreateQuestion(
            lessonRepository,
            questionRepository 
        );

        await stuLesson.execute({
            id: 1,
            title: 'Introdução',
            ordenation: 1
        });

        expect(sutQuestion.execute({
            lesson_id: 2,
            title: 'Café e chá por favor',
            response: 'Coffee and tea please'
        })).rejects.toBeInstanceOf(Error)
    });

    it('Not Should be create an question with same title', async () => {
        const lessonRepository = new InMemoryLessonRepository();
        const questionRepository = new InMemoryQuestionRepository();

        const stuLesson = new CreateLesson(
            lessonRepository
        );

        const sutQuestion = new CreateQuestion(
            lessonRepository,
            questionRepository 
        );

        await stuLesson.execute({
            id: 1,
            title: 'Introdução',
            ordenation: 1
        });

        await sutQuestion.execute({
            lesson_id: 1,
            title: 'Café e chá por favor',
            response: 'Coffee and tea please'
        })

        expect(sutQuestion.execute({
            lesson_id: 1,
            title: 'Café e chá por favor',
            response: 'Coffee and tea please'
        })).rejects.toBeInstanceOf(Error)
    });
});