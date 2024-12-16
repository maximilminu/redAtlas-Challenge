import { UUID } from "crypto";

export class CreateTransactionDto {    
    address: string;
    type: string;
    date: Date;
    price: number;
    propertyId: UUID;

}
