import { describe, expect, it } from "vitest";
import { Option } from "../../domain/option";
import { InMemoryLessonRepository } from "../../infra/database/in-memory/in-memory-lesson-repository";
import { InMemoryOptionRepository } from "../../infra/database/in-memory/in-memory-option-repository";
import { InMemoryQuestionRepository } from "../../infra/database/in-memory/in-memory-question-repository";
import { CreateLesson } from "./create-lesson";
import { CreateOption } from "./create-option";
import { CreateQuestion } from "./create-question";


describe('Create lesson', () => {
    it('Should be create an option', async () => {
        const lessonRepository = new InMemoryLessonRepository();
        const questionRepository = new InMemoryQuestionRepository();
        const optionRepository = new InMemoryOptionRepository();

        const stuLesson = new CreateLesson(
            lessonRepository
        );

        const sutQuestion = new CreateQuestion(
            lessonRepository,
            questionRepository 
        );

        const stuOption = new CreateOption(
            questionRepository,
            optionRepository
        );

        await stuLesson.execute({
            id: 1,
            title: 'Introdução',
            ordenation: 1
        });

        await sutQuestion.execute({
            id: 1,
            lesson_id: 1,
            title: 'Café e chá por favor',
            response: 'Coffee and tea please'
        });

        expect(stuOption.execute({
            id: null,
            question_id: 1,
            title: 'Coffee and tea please'
        })).resolves.toBeInstanceOf(Option)
    });

    it('Not Should be create an question with same title', async () => {
        const lessonRepository = new InMemoryLessonRepository();
        const questionRepository = new InMemoryQuestionRepository();
        const optionRepository = new InMemoryOptionRepository();

        const stuLesson = new CreateLesson(
            lessonRepository
        );

        const sutQuestion = new CreateQuestion(
            lessonRepository,
            questionRepository 
        );

        const stuOption = new CreateOption(
            questionRepository,
            optionRepository
        );

        await stuLesson.execute({
            id: 1,
            title: 'Introdução',
            ordenation: 1
        });

        await sutQuestion.execute({
            id: 1,
            lesson_id: 1,
            title: 'Café e chá por favor',
            response: 'Coffee and tea please'
        });

        await stuOption.execute({
            id: null,
            question_id: 1,
            title: 'Coffee and tea please'
        });

        expect(stuOption.execute({
            id: null,
            question_id: 1,
            title: 'Coffee and tea please'
        })).rejects.toBeInstanceOf(Error)
    });
});