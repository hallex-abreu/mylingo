export interface ILesson{
    id?: number,
    title: string,
    ordenation: number,
    created_at?: Date,
    updated_at?: Date,
}

export class Lesson {
    private props: ILesson;

    get id(): number | undefined {
        return this.props.id;
    }

    get title(): string {
        return this.props.title;
    }

    get ordenation(): number {
        return this.props.ordenation;
    }

    get created_at(): Date | undefined {
        return this.created_at;
    }

    get updated_at(): Date | undefined {
        return this.updated_at;
    }

    constructor(props: ILesson) {
        this.props = props;
    }
}