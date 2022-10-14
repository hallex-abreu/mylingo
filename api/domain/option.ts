export interface IOption{
    id: number | null,
    question_id: number,
    title: string
}

export class Option {
    private props: IOption;

    get id(): number | null{
        return this.props.id;
    }

    get question_id(): number{
        return this.props.question_id;
    }

    get title(): string{
        return this.props.title;
    }

    constructor(props: IOption){
        this.props = props;
    }
}