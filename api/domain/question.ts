import { IOption } from "./option";

export interface IQuestion{
    id: number | null,
    lesson_id: number,
    title: string,
    response: string,
    options: Array<IOption> | null
}

export class Question {
    private props: IQuestion;

    get id(): number | null{
        return this.props.id;
    }

    get lesson_id(): number{
        return this.props.lesson_id;
    }

    get title(): string{
        return this.props.title;
    }

    get response(): string{
        return this.props.response;
    }

    get options(): Array<IOption> | null{
        return this.props.options;
    }

    constructor(props: IQuestion){
        this.props = props;
    }
}