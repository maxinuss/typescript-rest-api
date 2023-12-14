import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated, ManyToOne, JoinColumn,
} from "typeorm";
import { Category } from "../category/category.entity";

@Entity()
export class Product {
  @PrimaryColumn('uuid')
  @Generated('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public image: string;

  @Column()
  public description: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    transformer : {
      to (value)  {
        return value ;
      },
      from (value)  {
        return +value ;
      },
    },
  })
  public price: number;

  @Column({ name: 'category_id', nullable: false })
  public categoryId: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  public category: Category;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public created: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated: Date;
}
