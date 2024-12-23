export interface List {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  games?: [];
}
