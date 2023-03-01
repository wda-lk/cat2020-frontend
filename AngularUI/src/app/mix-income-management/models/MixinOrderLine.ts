import { Office } from '../../common/models/Office';
import { VoteAssignmentDetail } from '../../mix-income-management/models/VoteAssignmentDetail';
// import { Vat } from '../../common/models/Vat';
// import { Nbt } from '../../common/models/Nbt';

export class MixinOrderLine {
    id?: string;
    customVoteName: string;
    description: string;
    amount: number;
    paymentVatAmount: number|'1.2-2';
    paymentNbtAmount: number;
    stampAmount: number;
    totalAmount: number;
    createdAt? : Date;
    updatedAt?: Date;
    mixinVoteAssignmentDetailId:number;
    voteAssignmentDetails: VoteAssignmentDetail[];
    paymentVatId: number;
    paymentNbtId: number;
    mixinOrderId: number;
    voteOrBal:number;
    voteCode:any;
    // paymentVat:Vat;
    // paymentNbt:Nbt;
}
