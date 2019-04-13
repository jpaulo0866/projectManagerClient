import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ParametersService } from '../parameters.service';
import { Constants } from 'src/app/global/constants';
import { CrudBaseService } from '../interface/crud.interface.service';

@Injectable({
    providedIn: 'root'
})
export abstract class CrudBaseServiceImpl<T> implements CrudBaseService<T> {

    public abstract getPath(): string;

    public abstract getIdField(): string;

    constructor(protected http: HttpClient,
                protected parameterService: ParametersService) {}

    public createOrUpdate(object: T) {
        if (object[this.getIdField()]) {
            return this.update(object);
        } else {
            object[this.getIdField()] = null;
            return this.create(object);
        }
    }

    private create(object: T) {
        return this.http.post(`${this.parameterService.getValueFromProperties(Constants.API_URL)}${this.getPath()}`, object);
    }

    private update(object: T) {
        return this.http.put(`${this.parameterService.getValueFromProperties(Constants.API_URL)}${this.getPath()}`, object);
    }

    delete(id: string) {
        return this.http.delete(`${this.parameterService.getValueFromProperties(Constants.API_URL)}${this.getPath()}/${id}`);
    }

    findById(id: string) {
        return this.http.get(`${this.parameterService.getValueFromProperties(Constants.API_URL)}${this.getPath()}/${id}`);
    }

    findAll(page: number, count: number, field?: string, order?: string) {
        const orderField = field ? field : Constants.BASE_ORDER_FIELD;
        const orderMode = order ? order : Constants.BASE_MODE_ORDER;
// tslint:disable-next-line: max-line-length
        return this.http.get(`${this.parameterService.getValueFromProperties(Constants.API_URL)}${this.getPath()}/${page}/${count}/${orderField}/${orderMode}`);
    }

    protected genericGet(basePath: string, ...params) {
        let restfullpath = basePath;
        params.forEach((item) => restfullpath += `/${item}`);
        return this.http.get(`${this.parameterService.getValueFromProperties(Constants.API_URL)}${restfullpath}`);
    }

}
