import { IEmployee } from '../interfaces/employee.interface';

export const Employees: IEmployee[] = [
  { id: 1, firstName: 'Андрей', lastName: 'Фролов', patronymic: 'Олегович', birthday: '10.02.2001', email: 'an@y.ru',
    education: 'Высшее', city:'Екатеринбург', educational_institution: 'Уральский федеральный университет',
    specialization: 'Программная инженерия', year_graduation: '2021', post: 'Старший программист',
    project: 'Artsofte', salary: 100000,
    success: 'Успешный' },
  { id: 2, firstName: 'Денис', lastName: 'Денисов', patronymic: 'Олегович', birthday: '21.012.1995', email: 'd@y.ru',
    education: 'Высшее', city:'Екатеринбург', educational_institution: 'Уральский федеральный университет',
    specialization: 'Программная инженерия', year_graduation: '2017', post: 'Старший программист',
    project: 'Yandex', salary: 150000,
    success: 'Успешный'},
  { id: 3, firstName: 'Артем', lastName: 'Артемов', patronymic: 'Олегович', birthday: '15.07.1999', email: 'ar@y.ru',
    education: 'Высшее', city:'Екатеринбург', educational_institution: 'Уральский федеральный университет',
    specialization: 'Программная инженерия', year_graduation: '2023', post: 'Старший программист',
    project: 'Yandex', salary: 150000,
    success: 'Неуспешный' },
  { id: 4, firstName: 'Василий', lastName: 'Васильев', patronymic: 'Васильевич', birthday: '05.01.2000', email: 'v@y.ru',
    education: 'Высшее', city:'Екатеринбург', educational_institution: 'Уральский федеральный университет',
    specialization: 'Программная инженерия', year_graduation: '2025', post: 'Младший программист',
    project: 'Artsofte', salary: 70000,
    success: 'Обычный' },
  { id: 4, firstName: 'Радик', lastName: 'Васильев', patronymic: 'Васильевич', birthday: '05.01.2000', email: 'r@y.ru',
    education: 'Высшее', city:'Екатеринбург', educational_institution: 'Уральский федеральный университет',
    specialization: 'Программная инженерия', year_graduation: '2024', post: 'Младший программист',
    project: 'Artsofte', salary: 70000, success: 'Обычный' },
  { id: 5, firstName: 'Радик', lastName: 'Васильев', patronymic: 'Васильевич', birthday: '05.01.2000',
    email: 'r@y.ru',
    education: 'Высшее', city:'Екатеринбург', educational_institution: 'Уральский федеральный университет',
    specialization: 'Программная инженерия', year_graduation: '2024', post: 'Младший программист', project: 'Artsofte', salary: 70000,
    success: 'Обычный'},
  { id: 6, firstName: 'Андрей', lastName: 'Кузьмин', patronymic: 'Дмитриевич', birthday: '01.10.2003',
    email: 'r@y.ru',
    education: 'Высшее', city:'Екатеринбург', educational_institution: 'Уральский федеральный университет',
    specialization: 'Программная инженерия', year_graduation: '2024', post: 'Тимлид', project: 'UrFU EDU', salary: 800000,
    success: 'Успешный' },
  { id: 7, firstName: 'Антон', lastName: 'Зырянов', patronymic: 'Андреевич', birthday: '09.09.2003',
    email: 'r@y.ru',
    education: 'Высшее', city:'Екатеринбург', educational_institution: 'Уральский федеральный университет',
    specialization: 'Программная инженерия', year_graduation: '2024', post: 'Старший программист', project: 'UrFU EDU', salary: 100000,
    success: 'Успешный' },
  { id: 8, firstName: 'Денис', lastName: 'Денисов', patronymic: 'Олегович', birthday: '21.012.1995',
    email: 'r@y.ru',
    education: 'Высшее', city:'Екатеринбург', educational_institution: 'Уральский федеральный университет',
    specialization: 'Программная инженерия', year_graduation: '2024', post: 'Старший программист', project: 'Yandex', salary: 150000,
    success: 'Успешный'},
  { id: 9, firstName: 'Артем', lastName: 'Артемов', patronymic: 'Олегович', birthday: '15.07.1999',
    email: 'r@y.ru',
    education: 'Высшее', city:'Екатеринбург', educational_institution: 'Уральский федеральный университет',
    specialization: 'Программная инженерия', year_graduation: '2024', post: 'Старший программист', project: 'Yandex', salary: 150000,
    success: 'Неуспешный' },
  { id: 10, firstName: 'Василий', lastName: 'Васильев', patronymic: 'Васильевич', birthday: '05.01.2000',
    email: 'r@y.ru',
    education: 'Высшее', city:'Екатеринбург', educational_institution: 'Уральский федеральный университет',
    specialization: 'Программная инженерия', year_graduation: '2024', post: 'Младший программист', project: 'Artsofte', salary: 70000,
    success: 'Обычный' },
  { id: 11, firstName: 'Радик', lastName: 'Васильев', patronymic: 'Васильевич', birthday: '05.01.2000',
    email: 'r@y.ru',
    education: 'Высшее', city:'Екатеринбург', educational_institution: 'Уральский федеральный университет',
    specialization: 'Программная инженерия', year_graduation: '2024', post: 'Младший программист', project: 'Artsofte', salary: 70000,
    success: 'Обычный' },
  { id: 12, firstName: 'Тест', lastName: 'Васильев', patronymic: 'Васильевич', birthday: '05.01.2000',
    email: 'r@y.ru',
    education: 'Высшее', city:'Екатеринбург', educational_institution: 'Уральский федеральный университет',
    specialization: 'Программная инженерия', year_graduation: '2024', post: 'Младший программист', project: 'Artsofte', salary: 70000,
    success: 'Обычный' },
]
