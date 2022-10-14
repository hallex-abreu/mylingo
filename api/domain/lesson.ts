export interface ILesson{
    id: number | null,
    title: string,
    ordenation: number
}

export class Lesson {
    private props: ILesson;

    get id(): number | null{
        return this.props.id;
    }

    get title(): string{
        return this.props.title;
    }

    get ordenation(): number{
        return this.props.ordenation;
    }

    constructor(props: ILesson){
        this.props = props;
    }
}