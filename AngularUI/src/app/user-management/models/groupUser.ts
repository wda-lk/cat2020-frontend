 import { UserDetail } from './UserDetail';

export class GroupUser {
    groupID: number;
    userID: number;
    userCreatedID? : number;
    userModifiedID? : number;
    dateCreated : Date;
    dateModified: Date;
}
