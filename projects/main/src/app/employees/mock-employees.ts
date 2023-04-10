import { Employee } from './employee.interface';

export const Employees: Employee[] = [
  { firstName: 'Андрей', lastName: 'Фролов', patronymic: 'Олегович',
    post: 'Старший программист', project: 'Artsofte', salary: 100000,
    success: 'Успешный' },
  { firstName: 'Денис', lastName: 'Денисов', patronymic: 'Олегович',
    post: 'Старший программист', project: 'Yandex', salary: 150000,
    success: 'Успешный' },
  { firstName: 'Артем', lastName: 'Артемов', patronymic: 'Олегович',
    post: 'Старший программист', project: 'Yandex', salary: 150000,
    success: 'Неуспешный' },
  { firstName: 'Василий', lastName: 'Васильев', patronymic: 'Васильевич',
    post: 'Младший программист', project: 'Artsofte', salary: 70000,
    success: 'Обычный' },
]
