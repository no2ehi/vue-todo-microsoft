export default interface Todo {
    id: number;
    text: string;
    categories: Array<string>;
    completed: boolean;
    star: boolean;
  }