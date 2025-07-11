import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class CreateMedicationDto{

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
 
  @ApiProperty()
  @IsString()
  @IsNotEmpty() 
  dosage: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  frequency:string;

}