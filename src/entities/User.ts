import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn('increment') id: number;

	@CreateDateColumn() createdAt: Date;

	@UpdateDateColumn() updatedAt: Date;
}
