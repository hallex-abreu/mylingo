import { IOption } from "./option";

export interface IQuestion{
    id?: number,
    lesson_id: number,
    title: string,
    response: string,
    options: Array<IOption> | null,
    created_at?: Date,
    updated_at?: Date
}

export class Question {
    private props: IQuestion;

    get id(): number | undefined {
        return this.props.id;
    }

    get lesson_id(): number {
        return this.props.lesson_id;
    }

    get title(): string {
        return this.props.title;
    }

    get response(): string {
        return this.props.response;
    }

    get options(): Array<IOption> | null {
        return this.props.options;
    }

    get created_at(): Date | undefined {
        return this.created_at;
    }

    get updated_at(): Date | undefined {
        return this.updated_at;
    }

    constructor(props: IQuestion) {
        this.props = props;
    }
}