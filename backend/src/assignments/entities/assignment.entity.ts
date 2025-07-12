import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';
import { Medication } from '../../medications/entities/medication.entity';

@Entity()
export class Assignment {

  @PrimaryColumn()
  patientId: number;

  @PrimaryColumn()
  medicationId: number;

  @Column({ type: 'date' })
  startDate: Date;

  @Column()
  numberOfDays: number;

  @ManyToOne(() => Patient, patient => patient.assignments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'patientId' })
  patient: Patient;

  @ManyToOne(() => Medication, medication => medication.assignments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'medicationId' })
  medication: Medication;

}
