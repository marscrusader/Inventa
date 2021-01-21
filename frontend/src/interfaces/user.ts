export interface CreateUserFormInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface GetUserResponse {
  id: number;
  firstName: string;
  lastName: string;
}
