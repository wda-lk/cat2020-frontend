 import { UserDetail } from '../models/UserDetail';

export class Group {
    id?: number;
    description: string;
    isActive: boolean;
    userCreatedID? : number;
    userModified? : number;
    sabhaID? : number ;
    dateCreated? : Date;
    dateModified? : Date;
    assignedUserList: UserDetail = new UserDetail();
    notAssignedUserList : UserDetail = new UserDetail();
}