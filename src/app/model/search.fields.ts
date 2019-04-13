export enum SearchType {
    Text = 'text',
    CheckBox = 'checkbox',
    Select = 'select'
}

export class SearchFields {
    public name: string;
    public type: SearchType;
    public canonicName: string;
    public dataSource: any;
    public dataSourceField: string;
    // public required: boolean;
}
