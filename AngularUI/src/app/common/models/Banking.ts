import { MixinOrder } from '../../mix-income-management/models/MixinOrder';

export class Banking {
    id?: number;
    // mixinOrder?: MixinOrder;
    orderId?: number;
    bankedDate: String;
    createdAt: Date;
    createdBy: number;
}