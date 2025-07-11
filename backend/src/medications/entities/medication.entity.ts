import { Assignment } from "src/assignments/entities/assignment.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Medication{

  @PrimaryGeneratedColumn()
  medicationId: number;

  @Column()
  name: string;

  @Column()
  dosage: string;

  @Column()
  frequency:string;

  @OneToMany(() => Assignment, assignment => assignment.medication)
  assignments: Assignment[];
  
}