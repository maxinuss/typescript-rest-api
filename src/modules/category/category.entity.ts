import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated, OneToMany,
} from "typeorm";
import { Product } from "../product/product.entity";

@Entity()
export class Category {
  @PrimaryColumn('uuid')
  @Generated('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public image: string;

  @Column()
  public description: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public created: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated: Date;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
