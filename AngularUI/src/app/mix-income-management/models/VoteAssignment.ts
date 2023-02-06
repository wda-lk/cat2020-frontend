
import { VoteAssignmentDetail } from '../models/VoteAssignmentDetail';
import { VoteDetail } from '../../vote-management/models/VoteDetail';
import { AccountDetail } from '../../vote-management/models/AccountDetail';
import { Office } from '../../common/models/Office';

export class VoteAssignment {
    id?: string;
    isActive: number;
    voteId: number;
    officeId: number;
    bankAccountId: number;
    dateCreated?: Date;
    dateModified?: Date;
    sabhaId:number;
    voteAssignmentDetail? : VoteAssignmentDetail;
}

export class VoteAssignmentFullDataClass {
    id?: string;
    isActive: number;
    voteDetail : VoteDetail;
    voteId: number;
    office : Office
    officeId: number;
    accountDetail : AccountDetail;
    bankAccountId: number;
    dateCreated?: Date;
    dateModified?: Date;
    sabhaId:number;
    voteAssignmentDetail? : VoteAssignmentDetail;
}

