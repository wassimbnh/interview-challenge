import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsDateString, Min, IsNotEmpty } from 'class-validator';
import { Medication } from 'src/medications/entities/medication.entity';
import { Patient } from 'src/patients/entities/patient.entity';

export class AssignmentDto {

  @IsInt()
  @IsNotEmpty()
  patientId: number;

  
  @IsInt()
  medicationId: number;

  @IsDateString()
  startDate: Date;

  @ApiProperty()
  @IsInt()
  @Min(1)
  numberOfDays: number;

  patient: Patient;

  medication: Medication;
}
