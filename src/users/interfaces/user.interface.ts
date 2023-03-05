export interface User {
  name: string;
  age: number;
  location: string;
  email: string;
  password: string;
}

export interface NewUser {
  email: string;
  password: string;
}

export interface SavedUser {
  name: string;
  age: number;
  location: string;
}
