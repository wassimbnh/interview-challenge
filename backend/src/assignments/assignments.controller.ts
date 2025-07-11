import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { AssignmentDto } from './dto/assignment.dto';

@Controller('assign')
export class AssignmentsController {

    constructor(
        private readonly assignService: AssignmentsService
    ){}


    @Post("medication/patient")
    assignMedicationPatient(@Query("patientId") patientId: number, @Body() assignDto: AssignmentDto){
        return this.assignService.assignMedicationPatient(patientId, assignDto)
    }

    @Get("/get/medication-by-patient") //get assignments
    getMedicationsByPatient(@Query("patientId") patientId: number){
        return this.assignService.getMedicationsByPatient(patientId)
    }

}
