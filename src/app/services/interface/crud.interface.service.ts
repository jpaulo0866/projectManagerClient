export interface CrudBaseService<T> {
    createOrUpdate(object: T);
    delete(id: string);
    findById(id: string);
    findAll(page: number, count: number, field?: string, order?: string);
}
