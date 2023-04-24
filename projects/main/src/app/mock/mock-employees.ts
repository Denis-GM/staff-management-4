import { IEmployee } from '../interfaces/employee.interface';

export const Employees: IEmployee[] = [
  { id: 1, firstName: 'Андрей', lastName: 'Фролов', patronymic: 'Олегович', birthday: '10.02.2001',
    education: 'УрФУ', post: 'Старший программист', project: 'Artsofte', salary: 100000,
    success: 'Успешный' },
  { id: 2, firstName: 'Денис', lastName: 'Денисов', patronymic: 'Олегович', birthday: '21.012.1995',
    education: 'УрФУ', post: 'Старший программист', project: 'Yandex', salary: 150000,
    success: 'Успешный'},
  { id: 3, firstName: 'Артем', lastName: 'Артемов', patronymic: 'Олегович', birthday: '15.07.1999',
    education: 'УрФУ', post: 'Старший программист', project: 'Yandex', salary: 150000,
    success: 'Неуспешный' },
  { id: 4, firstName: 'Василий', lastName: 'Васильев', patronymic: 'Васильевич', birthday: '05.01.2000',
    education: 'УрФУ', post: 'Младший программист', project: 'Artsofte', salary: 70000,
    success: 'Обычный' },
]
