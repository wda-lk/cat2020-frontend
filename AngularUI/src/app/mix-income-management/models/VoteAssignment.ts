
import { VoteAssignmentDetail } from '../models/VoteAssignmentDetail';
import { VoteDetail } from '../../vote-management/models/VoteDetail';
import { AccountDetail } from '../../vote-management/models/AccountDetail';
import { SubOffice } from '../../common/models/SubOffice';

export class VoteAssignment {
    id?: string;
    isActive: number;
    voteId: number;
    subOfficeId: number;
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
    subOffice : SubOffice
    subOfficeId: number;
    accountDetail : AccountDetail;
    bankAccountId: number;
    dateCreated?: Date;
    dateModified?: Date;
    sabhaId:number;
    voteAssignmentDetail? : VoteAssignmentDetail;
}

