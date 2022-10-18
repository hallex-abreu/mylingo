import { Option } from "../../domain/option";
import { OptionRepository } from "../repositories/option-repository";
import { QuestionRepository } from "../repositories/question-repository";

interface CreateOptionRequest{
    id?: number,
    question_id: number,
    title: string
}

type CreateOptionResponse = Option;

export class CreateOption{
    constructor(
        private questionRepository: QuestionRepository,
        private optionRepository: OptionRepository
    ){}   

    async execute({id, question_id, title}: CreateOptionRequest): Promise<CreateOptionResponse>{
        const exist_question_by_id = await this.questionRepository.findQuestionById(question_id);

        if(!exist_question_by_id)
            throw new Error('Does not exist question with id');

        const exist_option_by_title = await this.optionRepository.findOptionByTitle(title);

        if(exist_option_by_title)
            throw new Error('Option already registered with title');

        const option = new Option({
            id,
            question_id,
            title
        });

        await this.optionRepository.create(option);

        return option;
    }
}