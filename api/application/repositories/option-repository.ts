import { Option } from "../../domain/option";

export interface OptionRepository{
    findOptionByTitle(title: string): Promise<Option | null>
    create(option: Option): Promise<void>
}