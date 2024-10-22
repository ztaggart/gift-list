export interface Holiday {
  name: string;
  people: People[];
}

export interface People {
  name: string;
  gifts: Gift[];
}

export interface Gift {
  name: string;
  price: number;
}
