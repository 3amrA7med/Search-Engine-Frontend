export interface ISearch {

    searchResults : Search[];
    pageDetails: Page;
}
export interface IImageSearch{
    searchResults : ImageSearch[];
    pageDetails: Page;
}

export class Search{
    title:string;
    description:string;
    url:string;
}
export class ImageSearch{
    url:string;
}
export class Page{
    totalSize:number;
}