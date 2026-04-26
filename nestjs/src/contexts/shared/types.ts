export type Nullable<T> = T | null

export interface NewableClass<T> extends Function {
  new (...args: any[]): T;
}
