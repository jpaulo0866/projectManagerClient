import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';
import { SharedService } from 'src/app/services/shared.service';
import { PageStatisticsService } from 'src/app/services/page-statistics.service';
import { PageStatistic } from 'src/app/model/pageStatistic.model';
import { ResponseApi } from 'src/app/model/response.api';
import { DialogService } from 'src/app/dialog.service';


interface MenuItem {
  name: string;
  link?: string;
  icon: string;
  children?: MenuItem[];
}

const MenuData: MenuItem[] = [
  {
    name: 'Cadastros',
    icon: 'note_add',
    children: [
      {
        name: 'Pessoas e Acessos',
        icon: 'verified_user',
        children: [
          {
            name: 'Perfil',
            icon: 'group',
            link: '/profile'
          },
          {
            name: 'Usuário',
            icon: 'how_to_reg',
            link: '/user'
          },
          {
            name: 'Equipe',
            icon: 'code',
            link: '/team'
          },
          {
            name: 'Pessoas',
            icon: 'person_add',
            link: '/person'
          }
        ]
      },
      {
        name: 'Projetos',
        icon: 'description',
        children: [
          {
            name: 'Tipo de Projeto',
            icon: 'format_list_bulleted',
            link: '/projectType'
          },
          {
            name: 'Complexidade de Demanda',
            icon: 'format_line_spacing',
            link: '/projectcomplexity'
          },
          {
            name: 'Níveis de Priodade',
            icon: 'format_list_numbered',
            link: '/projectpriority'
          },
          {
            name: 'Estágios de Execução',
            icon: 'settings_ethernet',
            link: '/projectstage'
          }
        ]
      },
      {
        name: 'Componentes',
        icon: 'notes',
        children: [
          {
            name: 'Menus',
            icon: 'reorder',
            link: '/menu'
            
          },
          {
            name: 'Submenus',
            icon: 'line_weight',
            link: '/submenu'
          },
          {
            name: 'Rotas',
            icon: 'device_hub',
            link: '/approute'
          },
          {
            name: 'Subcomponentes',
            icon: 'drag_handle',
            link: '/componentitem'
          },
          {
            name: 'Menus de Ajuda',
            icon: 'help_outline',
            link: '/helpmenu'
          }
        ]
      },
      {
        name: 'Permissões',
        icon: 'block',
        children: [
          {
            name: 'Tipo de Permissão',
            icon: 'lock',
            link: '/typepermission'
          },
          {
            name: 'Gerenciar',
            icon: 'lock_open'
          }
        ]
      }
    ]
  },
  // {
  //   name: 'News',
  //   icon: 'announcement',
  //   children: []
  // },
  {
    name: 'Delivery',
    icon: 'work',
    children: [
      {
        name: 'Projetos',
        icon: 'description',
        children: [
          {
            name: 'Gerenciar Projetos',
            icon: ''
          },
          {
            name: 'User Stories',
            icon: ''
          },
          {
            name: 'Tarefas',
            icon: ''
          },
          {
            name: 'WorkFlow',
            icon: 'linear_scale'
          },
          {
            name: 'Gerenciar WorkFlow',
            icon: ''
          }
        ]
      },
      {
        name: 'Bugs',
        icon: 'bug_report',
        children: [
          {
            name: 'Relatório de Bugs',
            icon: ''
          },
          {
            name: 'Tipos de Bugs',
            icon: 'bug_report',
            link: '/bugtype'
          }
        ]
      },
      {
        name: 'Testes',
        icon: '',
        children: [
          {
            name: 'Plano de Testes',
            icon: ''
          },
          {
            name: 'Documentação de Execução',
            icon: ''
          }
        ]
      }
    ]
  },
  {
    name: 'Comercial',
    icon: 'work',
    children: [
      {
        name: 'Clientes',
        icon: 'business_center',
        link: '/customer'
      },
      {
        name: 'Contratos',
        icon: 'class',
        link: '/contract'
      },
      {
        name: 'Tipo de Contrato',
        icon: 'dns',
        link: '/typecontract'
      },
      {
        name: 'Estimativas',
        icon: ''
      }
    ]
  },
  {
    name: 'RH',
    icon: 'work',
    children: [
      {
        name: 'Funcionários',
        icon: 'person_pin',
        link: '/employee'
      },
      {
        name: 'Cargos',
        icon: 'assignment_ind',
        link: '/role'
      },
      {
        name: 'Promoções',
        icon: ''
      },
      {
        name: 'Base de Currículos',
        icon: ''
      }
    ]
  },
  {
    name: 'Métricas e Analíticas',
    icon: 'pie_chart',
    children: [
      {
        name: 'Pesquisas',
        icon: 'search'
      },
      {
        name: 'Relatórios',
        icon: 'assessment'
      },
      {
        name: 'Estatísticas',
        icon: 'show_chart'
      }
    ]
  },
  {
    name: 'Configurações',
    icon: 'settings',
    children: [
      {
        name: 'Menus e Páginas',
        icon: 'pages',
        link: ''
      },
      {
        name: 'Tipos de Contato',
        icon: 'import_contacts',
        link: '/typecontact'
      },
      {
        name: 'Status',
        icon: 'check',
        link: '/status'
      },
      {
        name: 'Tipos de Contrato',
        icon: ''
      }
    ]
  }
];

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Output() menuClickEvent = new EventEmitter<any>();
  listMenu: MenuItem[] = MenuData;

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level, node => node.expandable);

  private transformer = (node: MenuItem, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      icon: node.icon,
      link: node.link,
      level
    };
  }

// tslint:disable-next-line: member-ordering
  treeFlattener = new MatTreeFlattener(
      this.transformer, node => node.level, node => node.expandable, node => node.children);

// tslint:disable-next-line: member-ordering
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private router: Router,
    private eventService: EventService,
    private sharedService: SharedService,
    private pageStatisticsService: PageStatisticsService,
    private dialogService: DialogService) {
    this.dataSource.data = MenuData;
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  hasChildren(node: MenuItem) {
    return node.children && node.children.length > 0;
  }

  ngOnInit() {
  }

  getActivatedRoute(){
    const menuItem = this.getMenuItemFromPath(this.router.url, MenuData);
    return menuItem ? menuItem.name : '';
  }

  route(path: string) {
    if (path) {
      const menuItem = this.getMenuItemFromPath(path, MenuData);
      if (menuItem) {
        const page = this.getPageStatistic(menuItem);
        this.pageStatisticsService.createOrUpdate(page).subscribe((response: ResponseApi) => {},
        err => this.dialogService.showSnackMessage(err.error.message, ''));
      }
      this.menuClickEvent.emit(menuItem);
      this.router.navigate([path]);
    }

  }

  private getMenuItemFromPath(link: string, data: MenuItem[]): MenuItem {
    for (const menu of data) {
      if (menu.link === link) {
        return menu;
      } else if (menu.children) {
        const returned = this.getMenuItemFromPath(link, menu.children);
        if (returned) {
          return returned;
        }
      }
    }

    return null;
  }

  private getPageStatistic(menu: MenuItem) {
    const page = new PageStatistic();
    page.pageIcon = menu.icon;
    page.pageLink = menu.link;
    page.pageName = menu.name;
    page.user = this.sharedService.user;
    return page;
  }
}
