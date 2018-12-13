import { IDocument } from 'app/shared/model//document.model';

export interface IContent {
    id?: number;
    dataContentType?: string;
    data?: any;
    document?: IDocument;
}

export class Content implements IContent {
    constructor(public id?: number, public dataContentType?: string, public data?: any, public document?: IDocument) {}
}
