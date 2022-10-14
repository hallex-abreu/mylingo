
import { Option } from "../../../domain/option";
import { OptionRepository } from "../../../application/repositories/option-repository";

export class InMemoryOptionRepository implements OptionRepository{
    public items: Option[] = [];

    async findOptionByTitle(title: string): Promise<Option | null> {
        const option = this.items.find(option => option.title === title);

        if(!option)
            return null;

        return option;
    }

    async create(option: Option): Promise<void> {
        this.items.push(option); 
    }
}