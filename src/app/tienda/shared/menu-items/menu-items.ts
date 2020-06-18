import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  iconType: string;
  children: any[];
}

const MENUITEMS = [
  { state: 'inicio', type: 'link', name: 'Inicio', icon: 'av_timer', iconType: 'icon', children: [] },
  {
    state: 'bebidas', type: 'sub', name: 'Bebidas', icon: 'web', iconType: 'icon',
    children: [{ state: 'alcoholicas', type: 'sub', name: 'Alcoholicas', icon: 'view_list', iconType: 'icon' },
    { state: 'no_alcoholicas', type: 'sub', name: 'No alcoholicas', icon: 'voicemail', iconType: 'icon' }]
  },
  {
    state: 'alimentacion', type: 'sub', name: 'Alimentacion', icon: 'vignette', iconType: 'icon',
    children: [{ state: 'almuerzo', type: 'sub', name: 'Alalmuerzos', icon: 'view_headline', iconType: 'icon' },
    { state: 'desayunos', type: 'sub', name: 'Desaryunos', icon: 'tab', iconType: 'icon' }]
  },
  { state: 'comida', type: 'link', name: 'Comida', icon: 'crop_7_5', iconType: 'icon', children: [] },
  { state: 'mar', type: 'link', name: 'Mar', icon: 'view_comfy', iconType: 'icon', children: [] },
  //{ state: 'lists', type: 'link', name: 'Lists', icon: 'view_list', iconType: 'icon', children: [] },
  /*  { state: 'menu', type: 'link', name: 'Menu', icon: 'view_headline' },
    { state: 'tabs', type: 'link', name: 'Tabs', icon: 'tab' },
    { state: 'stepper', type: 'link', name: 'Stepper', icon: 'web' },
    {
      state: 'expansion',
      type: 'link',
      name: 'Expansion Panel',
      icon: 'vertical_align_center'
    },
    { state: 'chips', type: 'link', name: 'Chips', icon: 'vignette' },
    { state: 'toolbar', type: 'link', name: 'Toolbar', icon: 'voicemail' },
    {
      state: 'progress-snipper',
      type: 'link',
      name: 'Progress snipper',
      icon: 'border_horizontal'
    },
    {
      state: 'progress',
      type: 'link',
      name: 'Progress Bar',
      icon: 'blur_circular'
    },
    {
      state: 'dialog',
      type: 'link',
      name: 'Dialog',
      icon: 'assignment_turned_in'
    },
    { state: 'tooltip', type: 'link', name: 'Tooltip', icon: 'assistant' },
    { state: 'snackbar', type: 'link', name: 'Snackbar', icon: 'adb' },
    { state: 'slider', type: 'link', name: 'Slider', icon: 'developer_mode' },
    {
      state: 'slide-toggle',
      type: 'link',
      name: 'Slide Toggle',
      icon: 'all_inclusive'
    }*/
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
