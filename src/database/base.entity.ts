import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export interface IBaseEntity {
  id: string;
  createdAt: Date;
  createdBy: string | null;
  updatedAt: Date;
  updatedBy: string | null;
  deletedAt: Date | null;
  deletedBy: string | null;
}

export class BaseEntity implements IBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'uuid', nullable: true })
  createdBy: string | null;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'uuid', nullable: true })
  updatedBy: string | null;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @Column({ type: 'uuid', nullable: true })
  deletedBy: string | null;
}
