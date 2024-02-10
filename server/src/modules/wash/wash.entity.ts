import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum WashType {
  COMPLETE = 'complete',
  SIMPLE = 'simple',
}

export enum WashStatus {
  SCHEDULED = 'scheduled',
  COMPLETE = 'complete',
  CANCELED = 'canceled',
}

@Entity()
export class Wash {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  plate: string;

  @Column()
  scheduleHour: string;

  @Column()
  scheduleDay: string;

  @Column({
    type: 'enum',
    enum: WashType,
    default: WashType.COMPLETE,
  })
  type: WashType;

  @Column({
    type: 'enum',
    enum: WashStatus,
    default: WashStatus.SCHEDULED,
  })
  status: WashStatus;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
