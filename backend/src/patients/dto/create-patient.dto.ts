import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString } from 'class-validator';

export class CreatePatientDto{

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsDateString()
    dateOfBirth: string;

}