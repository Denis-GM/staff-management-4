export interface IAction {
  id_owner: number,
  title: string,
  date: string,
  date2: string | null | undefined,
  newPost: string | null | undefined,
  newSalary: number | null | undefined,
  newStatus: string | null | undefined,
  oldValue: string | number | null | undefined,
  newValue: string | number | null | undefined,
}
