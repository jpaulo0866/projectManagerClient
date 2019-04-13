import { SubMenu } from './subMenu.model';

export class MenuRegister {
   
    public menuId: string;
    public menuName: string;
    public disabled: boolean;
    public subMenu: SubMenu[] = new Array();    
}
