import { AppRoute } from './app-route.model';

export class SubMenu {
    public subMenuId = '';
    public subMenuName = '';
    public disabled = false;
    public components: Array<AppRoute>;
}