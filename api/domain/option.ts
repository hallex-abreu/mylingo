export interface IOption{
    id?: number,
    question_id: number,
    title: string,
    created_at?: Date,
    updated_at?: Date
}

export class Option {
    private props: IOption;

    get id(): number | undefined {
        return this.props.id;
    }

    get question_id(): number {
        return this.props.question_id;
    }

    get title(): string {
        return this.props.title;
    }

    get created_at(): Date | undefined {
        return this.created_at;
    }

    get updated_at(): Date | undefined {
        return this.updated_at;
    }

    constructor(props: IOption) {
        this.props = props;
    }
}