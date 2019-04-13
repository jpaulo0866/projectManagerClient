import { Profile } from './profile.model';
import { Person } from './person.model';

export class User {
    public userId = '';
    public ldapUser = false;
    public login = '';
    public password = '';
    public person: Person = new Person();
    public profile: Profile;
    public disabled = false;
    public image = '';
    public createdDate: Date;

}
