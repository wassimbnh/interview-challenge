import { InjectRepository } from '@nestjs/typeorm';
import { AssignmentDto } from './dto/assignment.dto';
import { Assignment } from './entities/assignment.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Patient } from 'src/patients/entities/patient.entity';
import { Medication } from 'src/medications/entities/medication.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { differenceInDays, addDays } from 'date-fns';
import { RemainTreatment } from './interfaces/remain-days.interface';

@Injectable()
export class AssignmentsService {
    
    
    constructor(
        @InjectRepository(Assignment) private assignRepository: Repository<Assignment>,
        @InjectRepository(Patient) private patientRepository: Repository<Patient>,
        @InjectRepository(Medication) private medicationRepository: Repository<Medication>
    ){ 
    }


    async assignMedicationPatient(patientId: number, assignDto: CreateAssignmentDto): Promise<AssignmentDto> {
        const patient = await this.patientRepository.findOneBy({ patientId:patientId})
        const medication = await this.medicationRepository.findOneBy({ medicationId: assignDto.medicationId})
        if(!patient)
            throw new NotFoundException(`Patient not found`)
        
        if(!medication)
            throw new NotFoundException(`Medication not found`)

        const assign = this.assignRepository.create({
            patientId,
            medicationId: assignDto.medicationId,
            startDate: assignDto.startDate,
            numberOfDays: assignDto.numberOfDays,
        });

        return this.assignRepository.save(assign);
    }


    async getMedicationsByPatient(patientId: number): Promise<Medication[]> {

        const assignments = await this.getAssignments(patientId)

        return assignments.map(assignment => assignment.medication);
    }


    async getRemainTreatmentDaysByPatient(patientId: number): Promise<RemainTreatment[]>{
        const assignments = await this.getAssignments(patientId);
        
        const today = new Date();

        return assignments.map(ass => {
            const start = new Date(ass.startDate);
            const end = addDays(start, ass.numberOfDays);
            const remaining = Math.max(0, differenceInDays(end, today));

                return {
                medicationId: ass.medicationId,
                medicationName: ass.medication?.name,
                remainingDays: remaining,
                };
            });
    }

    async getAssignments(patientId: number): Promise<AssignmentDto[]>{        

        const assignments = await this.assignRepository.find({
            where: { patient: { patientId: patientId } },
            relations: ['medication'],
        });

        return assignments
    }
}


