// export enum typesAction { }

export interface IAction {
  id_owner: number,
  title: string,
  date: string,
  date2: string | null | undefined,
  newPost: string | null | undefined,
  newSalary: number | null | undefined,
}

export interface IActionEdit {
  id_owner: number,
  title: string,
  date: string,
  oldValue: string | number | null | undefined,
  newValue: string | number | null | undefined,
}

export const Actions = [
  { id_owner: 1, title: 'Собеседование', date: '21.04.2023', date2: null, newPost: null,
    newSalary: null},
  { id_owner: 1, title: 'Принятие на работу', date: '10.07.2023', date2: null, newPost: null,
    newSalary: null},
  { id_owner: 1, title: 'Изменение данных', date: '22.05.2023', oldValue: 'd', newValue: 'Екб'},
  { id_owner: 1, title: 'Первый рабочий день', date: '21.07.2023', date2: null, newPost: null,
    newSalary: null},
  { id_owner: 1, title: 'Повышение', date: '01.05.2023', date2: null, newPost: 'Младший программист',
    newSalary: 12000},
  { id_owner: 1, title: 'Понижение', date: '06.05.2023', date2: null, newPost: 'Младший программист',
    newSalary: 10000},
  { id_owner: 1, title: 'Больничный', date: '05.04.2023', date2: '12.04.2023', newPost: null,
    newSalary: null},
  { id_owner: 1, title: 'Отпуск', date: '05.04.2023', date2: '12.04.2023', newPost: null,
    newSalary: null},
  { id_owner: 2, title: 'Собеседование', date: '01.05.2023', date2: null, newPost: null,
    newSalary: null},
  { id_owner: 2, title: 'Принят на работу', date: '12.05.2023', date2: null,  newPost: null,
    newSalary: null},
];
