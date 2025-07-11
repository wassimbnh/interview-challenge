import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { Medication } from './entities/medication.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MedicationsService {

    constructor(
        @InjectRepository(Medication) private medicationRepository: Repository<Medication>
    ){}
    
    createMedication(medicationDTO: CreateMedicationDto): Promise<Medication> {
        const medication = this.medicationRepository.create(medicationDTO);
        return this.medicationRepository.save(medication)
    }

    getAllMedications(): Promise<Medication[]> {
        return this.medicationRepository.find()
    }

    async getOneMedication(id: number): Promise<Medication>{
         const patient = await this.medicationRepository.findOneBy({ medicationId:id });
        if (!patient) throw new NotFoundException(`Medication not found`);
        return patient;
    }

    async updateMedication(id: number, updateMedicationDto: UpdateMedicationDto) {
        const patient = await this.medicationRepository.findOneBy({ medicationId: id});
        if (!patient) throw new NotFoundException(`Patient not found`);

        await this.medicationRepository.update(id, updateMedicationDto);
        return this.findOne(id);
    }

    async deleteMedication(id: number) {
        const patient = await this.medicationRepository.findOneBy({ medicationId: id });
        if (!patient) throw new NotFoundException(`Patient not found`);
        await this.medicationRepository.remove(patient);
    }

    async findOne(id: number): Promise<Medication> {
        const patient = await this.medicationRepository.findOneBy({ medicationId:id });
        if (!patient) throw new NotFoundException(`Medication not found`);
        return patient;
    }

}
