import { Office } from '../../common/models/Office';
import { MixinOrderLine } from '../../mix-income-management/models/MixinOrderLine';

export class MixinOrder {
    id?: string;
    code: string;
    customerName: string;
    customerNicNumber: string;
    customerMobileNumber: string;
    totalAmount: number;
    chequeNumber?: string;
    chequeDate?: Date;
    chequeBankName?: string;
    state: number;
    createdAt? : Date;
    updatedAt?: Date;
    sessionId: number;
    paymentMethodId: number;
    gnDivisions: any[];
    gnDivisionId: number;
    cashier: any[];
    cashierId: number;
    createdBy: number;
    partner: number;
    partnerId: number;
    office: Office;
    officeId: number;
    mixinCancelOrder: any[];
    mixinOrderLine: MixinOrderLine[];
}
