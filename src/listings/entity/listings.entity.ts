import { BaseEntity } from "src/config/base.entity";
import { IListing } from "src/interface/listings.interface";
import { Column, Entity } from "typeorm";

@Entity({name: 'listings'})
export class ListingEntity extends BaseEntity implements IListing {
    @Column()
    price: number;  
    @Column()
    status: string;
    @Column()
    propertyType: string;
}