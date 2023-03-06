export interface User {
  name: string;
  age: number;
  location: string;
  email: string;
  password: string;
}

export interface UserSaved {
  name: string;
  age: number;
  location: string;
}

export interface UserUpdate {
  name: string;
  age: number;
  location: string;
}
