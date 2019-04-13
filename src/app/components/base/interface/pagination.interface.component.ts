export interface IPaginationComponent {
    setNextPage(event: any): void;
    setPreviousPage(event: any): void;
    setPage(i: number, event: any): void;
    findAll(page: number, count: number);
}