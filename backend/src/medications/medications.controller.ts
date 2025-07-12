import { Body, Controller, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';

@Controller('medications')
export class MedicationsController {

    constructor(
        private readonly medicationsService: MedicationsService
    ){}

    @Post("/create")
    createMedication(@Body(ValidationPipe) medicationDTO: CreateMedicationDto){
        return this.medicationsService.createMedication(medicationDTO)
    }

    @Get("/all")
    getAllMedication(){
        return this.medicationsService.getAllMedications()
    }

    @Get("/one")
    getOneMedication(@Query("id") id: number){
        return this.medicationsService.getOneMedication(id)
    }

    @Put("/update")
    updateMedication(@Query("id") id: number, @Body(ValidationPipe) updateMedicationDto: UpdateMedicationDto){
        return this.medicationsService.updateMedication(id, updateMedicationDto)
    }

    @Delete("/delete")
    deleteMedication(@Query("id") id: number){
        return this.medicationsService.deleteMedication(id)
    }

}
