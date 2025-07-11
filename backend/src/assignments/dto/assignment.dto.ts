import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsDateString, Min } from 'class-validator';

export class AssignmentDto {

  @ApiProperty()
  @IsInt()
  patientId: number;

  @ApiProperty()
  @IsInt()
  medicationId: number;

  @ApiProperty()
  @IsDateString()
  startDate: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  numberOfDays: number;

}
