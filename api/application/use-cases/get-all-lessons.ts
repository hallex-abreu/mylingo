import { Lesson } from "../../domain/lesson";
import { LessonRepository } from "../repositories/lesson-repository";

interface GetAllLessonsRequest{
    page?: number,
    size?: number,
    sort?: string | null,
    filter?: string | null
}

export interface GetAllLessonsResponse{
    content: Lesson[],
    first: boolean,
    last: boolean,
    page: number,
    size: number,
    number_elements: number,
    total_elements: number,
    total_pages: number
}

export class GetAllLessons{
    constructor(
        private lessonRepository: LessonRepository
    ){}

    async execute({page = 1, size = 10, sort = null, filter = null}: GetAllLessonsRequest): Promise<GetAllLessonsResponse>{
        const lessons = await this.lessonRepository.findAllLesssons(page, size, sort, filter);
        
        if(!lessons)
            throw new Error('Does not exist lessons');

        const count = await this.lessonRepository.getCountLessons(filter);

        const total_page = (Math.ceil(count / size));

        return {
            content: lessons,
            first: page === 1 ? true : false,
            last: total_page === page ? true : false,
            page,
            size,
            number_elements: lessons.length,
            total_elements: count,
            total_pages: total_page > 0 ? total_page : 1
        };
    }    
}