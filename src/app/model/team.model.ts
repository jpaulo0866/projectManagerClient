import { User } from './user.model';

export class Team {
    public teamId: string;
    public teamName: string;
    public disabled: boolean;
    public users: User[];
}
