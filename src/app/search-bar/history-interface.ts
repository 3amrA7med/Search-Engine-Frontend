export interface IHistory {

    _embedded : {
        histories: History[];
    }
}

export class History{
    id: number;
    history: string;
}
