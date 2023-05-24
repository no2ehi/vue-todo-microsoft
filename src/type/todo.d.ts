import Category from "./category";

export default interface Todo {
    id: number;
    text: string;
    categories: Category[];
    completed: boolean;
    star: boolean;
  }