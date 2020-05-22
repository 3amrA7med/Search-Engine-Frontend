export interface ISuggestion {

    _embedded : {
        suggestions: Suggestion[];
    }
}

export class Suggestion{
    suggestion: string;
}