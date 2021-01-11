export interface IDemoMenu {
  hash: 'base' | 'drag' | 'fileList';
  title: string;
}
export const demoMemu: IDemoMenu[] = [
  {
    hash: 'base',
    title: '基础'
  },
  {
    hash: 'drag',
    title: '拖拽'
  },
  {
    hash: 'fileList',
    title: '文件列表'
  }
];
