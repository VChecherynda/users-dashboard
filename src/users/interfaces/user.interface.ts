export interface User {
  name: string;
  age: number;
  location: string;
  email: string;
  password: string;
}

export interface UserSaved {
  id: string;
  name: string;
  age: number;
  location: string;
  email: string;
}

export interface UserUpdate {
  name: string;
  age: number;
  location: string;
}
