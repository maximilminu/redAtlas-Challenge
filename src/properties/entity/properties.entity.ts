import { BaseEntity } from "src/config/base.entity";
import { IProperty } from "src/interface/property.interface";
import { TransactionEntity } from "src/transactions/entity/transactions.entity";
import { Column, Entity, OneToMany } from "typeorm";


@Entity({name: 'properties'})
export class PropertyEntity extends BaseEntity implements IProperty {
    @Column()
    name: string    
    @Column({unique: true})
    address: string    
    @Column()
    area: string    
    @Column()
    ownerName: string    
    @Column()
    sector: string
    @Column({ type: 'float', nullable: true })
    metros2: number

    @OneToMany(() => TransactionEntity, (transaction) => transaction.property)
    transactions: TransactionEntity[];
}