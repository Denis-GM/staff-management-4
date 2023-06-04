import { IEmployee } from '../interfaces/employee.interface';

export const Employees: IEmployee[] = [
  {
    id: 1, firstName: 'Андрей', lastName: 'Фролов', patronymic: 'Олегович', birthday: '10.02.2001', email: 'an@y.ru',
    education: 'Высшее', city: 'Екатеринбург', educational_institution: 'Уральский федеральный университет',
    specialization: 'Программная инженерия', year_graduation: '2021', post: 'Старший программист',
    project: 'Artsofte', salary: 100000,
    status: 'Успешный'
  },
  {
    id: 2, firstName: 'Денис', lastName: 'Денисов', patronymic: 'Олегович', birthday: '21.012.1995', email: 'd@y.ru',
    education: 'Высшее', city: 'Екатеринбург', educational_institution: 'Уральский федеральный университет',
    specialization: 'Программная инженерия', year_graduation: '2017', post: 'Старший программист',
    project: 'Yandex', salary: 150000,
    status: 'Успешный'
  },
  {
    id: 3, firstName: 'Артем', lastName: 'Артемов', patronymic: 'Олегович', birthday: '15.07.1999', email: 'ar@y.ru',
    education: 'Высшее', city: 'Екатеринбург', educational_institution: 'Уральский федеральный университет',
    specialization: 'Программная инженерия', year_graduation: '2023', post: 'Старший программист',
    project: 'Yandex', salary: 150000,
    status: 'Неуспешный'
  },
  {
    id: 4, firstName: 'Василий', lastName: 'Васильев', patronymic: 'Васильевич', birthday: '05.01.2000', email: 'v@y.ru',
    education: 'Высшее', city: 'Екатеринбург', educational_institution: 'Уральский федеральный университет',
    specialization: 'Программная инженерия', year_graduation: '2025', post: 'Младший программист',
    project: 'Artsofte', salary: 70000,
    status: 'Обычный'
  },
  {
    id: 5, firstName: 'Радик', lastName: 'Васильев', patronymic: 'Васильевич', birthday: '05.01.2000', email: 'r@y.ru',
    education: 'Высшее', city: 'Екатеринбург', educational_institution: 'Уральский федеральный университет',
    specialization: 'Программная инженерия', year_graduation: '2024', post: 'Младший программист',
    project: 'Artsofte', salary: 70000, status: 'Обычный'
  },
  {
    id: 6, firstName: 'Василий', lastName: 'Васильев', patronymic: 'Васильевич', birthday: '05.01.2000',
    email: 'r@y.ru',
    education: 'УрФУ', city: 'Екатеринбург', educational_institution: 'Уральский федеральный университет', specialization: 'Программная инженерия',
    year_graduation: '2024', post: 'Младший программист', project: 'Artsofte', salary: 70000,
    status: 'Уволен'
  },
  {
    id: 7, firstName: 'Денис', lastName: 'Иванов', patronymic: 'Олегович', birthday: '10.02.2001', email: 'an@y.ru',
    education: 'Высшее', city: 'Екатеринбург', educational_institution: 'Уральский федеральный университет',
    specialization: 'Программная инженерия', year_graduation: '2021', post: 'Старший программист',
    project: 'Google', salary: 100000,
    status: 'Успешный'
  },
];
