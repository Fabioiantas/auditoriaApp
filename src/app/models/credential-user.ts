 import { Role } from './role';

export class CredentialUser {
    id: number;
    name: string;
    password: string;
    email: string;
    situacao: string;
    role: Role;
    token?: string;
  user: any;
}
