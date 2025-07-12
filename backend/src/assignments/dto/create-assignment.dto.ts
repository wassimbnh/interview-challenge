import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsDateString, Min, IsNotEmpty } from 'class-validator';

export class CreateAssignmentDto {

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
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