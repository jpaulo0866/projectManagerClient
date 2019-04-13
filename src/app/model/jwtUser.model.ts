import { User } from './user.model';

export class JwtUser {
    public token: string;
    public user: User;
    public expiration: Date;
}
