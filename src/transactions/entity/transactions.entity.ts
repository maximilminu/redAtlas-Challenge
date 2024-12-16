import { BaseEntity } from 'src/config/base.entity';
import { ITransaction } from 'src/interface/transaction.interface';
import { PropertyEntity } from 'src/properties/entity/properties.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'transactions' })
export class TransactionEntity extends BaseEntity implements ITransaction {
  @Column()
  address: string;
  @Column()
  type: string;
  @Column()
  date: Date;
  @Column()
  price: number;
  @ManyToOne(() => PropertyEntity, (property) => property.transactions, {
    onDelete: 'CASCADE',
  })
  property: PropertyEntity;
}
