import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';

@Controller('assign')
export class AssignmentsController {

    constructor(
        private readonly assignService: AssignmentsService
    ){}


    @Post("medication/patient")
    assignMedicationPatient(@Query("patientId") patientId: number, @Body() assignDto: CreateAssignmentDto){
        return this.assignService.assignMedicationPatient(patientId, assignDto)
    }

    @Get("/get/medication-by-patient") //get assignments
    getMedicationsByPatient(@Query("patientId") patientId: number){
        return this.assignService.getMedicationsByPatient(patientId)
    }

    @Get("/get/by-patient")
    getAllAssignmentsByPatient(@Query("patientId") patientId: number){
        return this.assignService.getAllAssignmentsByPatient(patientId)
    }

    @Get("/get/remain/treatment-days")
    getRemainTreatmentDaysByPatient(){
        return this.assignService.getRemainTreatmentDaysByPatient()
    }

    @Delete("/delete")
    deleteAssignmentsB(@Query("patientId") patientId: number, @Query("medicationId") medicationId: number){
        return this.assignService.deleteAssignment(patientId, medicationId)
    }

}
