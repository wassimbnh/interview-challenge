import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
    
    
    
    constructor(
        @InjectRepository(Patient) private patientRepository: Repository<Patient>
    ){}


    createPatient(createPatientDto: CreatePatientDto): Promise<Patient>{
        const patient = this.patientRepository.create(createPatientDto);
        return this.patientRepository.save(patient)
    }

    getAllPatients():Promise<Patient[]> {
        return this.patientRepository.find()
    }

    async getOnePatientById(id: number): Promise<Patient> {
        const patient = await this.patientRepository.findOneBy({ patientId:id });
        if (!patient) throw new NotFoundException(`Patient not found`);
        return patient;
    }

    async updatePatient(id: number, dto: UpdatePatientDto): Promise<Patient>{
        const patient = await this.patientRepository.findOneBy({ patientId:id});
        if (!patient) throw new NotFoundException(`Patient not found`);

        await this.patientRepository.update(id, dto);
        return this.findOne(id);
    }
    

    async deletePatient(id: number): Promise<void> {
        const patient = await this.patientRepository.findOneBy({ patientId:id });
        if (!patient) throw new NotFoundException(`Patient not found`);
        await this.patientRepository.remove(patient);

    }


    async findOne(id: number): Promise<Patient> {
        const patient = await this.patientRepository.findOneBy({ patientId:id });
        if (!patient) throw new NotFoundException(`Patient not found`);
        return patient;
    }

}
