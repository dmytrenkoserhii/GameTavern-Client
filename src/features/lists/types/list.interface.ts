export interface List {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  //TODO: update any type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  games: any[];
}
