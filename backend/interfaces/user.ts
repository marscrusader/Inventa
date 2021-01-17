import { BuildOptions, Model } from "sequelize/types";

export interface UserAttributes {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  auth0Id: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface UserModelInterface extends Model<UserAttributes>, UserAttributes { }

export type UserStatic = typeof Model & {
  new(values?: Record<string, unknown>, options?: BuildOptions): UserModelInterface;
};

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
