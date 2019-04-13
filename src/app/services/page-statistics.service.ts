import { Injectable } from '@angular/core';
import { CrudBaseServiceImpl } from './impl/crud.impl.service';
import { PageStatistic } from '../model/pageStatistic.model';
import { CrudBaseService } from './interface/crud.interface.service';

@Injectable({
  providedIn: 'root'
})
export class PageStatisticsService extends CrudBaseServiceImpl<PageStatistic> implements CrudBaseService<PageStatistic> {

  public getPath(): string {
    return '/api/analytics/pagestatistics';
  }

  public getIdField(): string {
    return 'pageStatisticId';
  }

  public getLastAccess(userId: string) {
    return this.genericGet(this.getPath(), 'lastaccess', userId);
  }
}
