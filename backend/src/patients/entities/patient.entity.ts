import { Assignment } from "src/assignments/entities/assignment.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Patient{

  @PrimaryGeneratedColumn()
  patientId: number;

  @Column()
  name: string;

  @Column({ type: 'date' })
  dateOfBirth: string;

  @OneToMany(() => Assignment, assignment => assignment.patient)
  assignments: Assignment[];

}