import { Body, Controller, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PatientsService } from './patients.service';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Controller('patients')
export class PatientsController {


    constructor(private readonly patientsService: PatientsService){}

    @Post("/create")
    createPatient(@Body(ValidationPipe) createPatientDto: CreatePatientDto){
        return this.patientsService.createPatient(createPatientDto)
    }

    @Get("/all")
    getAllPatients(){
        return this.patientsService.getAllPatients()
    }

    @Get("/one")
    getOnePatientById(@Query("patientId") id: number){
        return this.patientsService.getOnePatientById(Number(id))
    }

    @Put('/update')
    updatePatient(@Query('patientId') id: string, @Body(ValidationPipe) dto: UpdatePatientDto) {
        return this.patientsService.updatePatient(+id, dto);
    }

    @Delete("/delete")
    deleteOnePatient(@Query('patientId') id: string) {
        return this.patientsService.deletePatient(+id);
    }

}
