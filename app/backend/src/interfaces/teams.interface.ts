export interface Iteam {
  id: number;
  teamName: string;
}

export interface Iteamm {
  getAll(): Promise<Iteam[]>;
  getById(id: number): Promise<Iteam | null>;
}
