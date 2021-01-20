export interface CreateUserFormInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface GetUserResponse {
  id: string;
  firstName: string;
  lastName: string;
}
