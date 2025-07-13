import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentsService } from './assignments.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { Patient } from '../patients/entities/patient.entity';
import { Medication } from '../medications/entities/medication.entity';

describe('AssignmentsService', () => {
  let service: AssignmentsService;

  const mockAssignmentRepository = {
    find: jest.fn(),
  };

  const mockPatientRepository = {
    findOneBy: jest.fn(),
  };

  const mockMedicationRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssignmentsService,
        {
          provide: getRepositoryToken(Assignment),
          useValue: mockAssignmentRepository,
        },
        {
          provide: getRepositoryToken(Patient),
          useValue: mockPatientRepository,
        },
        {
          provide: getRepositoryToken(Medication),
          useValue: mockMedicationRepository,
        },
      ],
    }).compile();

    service = module.get<AssignmentsService>(AssignmentsService);
  });

  it('should calculate remaining treatment days for each medication', async () => {
    const today = new Date();

    const assignments = [
  {
    "patientId": 1,
    "medicationId": 1,
    "startDate": "2025-07-10",
    "numberOfDays": 5,
    "medication": {
      "medicationId": 1,
      "name": "LZ-400",
      "dosage": "10mg",
      "frequency": "3"
    }
  },
  {
    "patientId": 1,
    "medicationId": 2,
    "startDate": "2025-07-11",
    "numberOfDays": 10,
    "medication": {
      "medicationId": 2,
      "name": "MK-20",
      "dosage": "20mg",
      "frequency": "3"
    }
  },
  {
    "patientId": 1,
    "medicationId": 3,
    "startDate": "2025-07-05",
    "numberOfDays": 3,
    "medication": {
      "medicationId": 3,
      "name": "RK-1000",
      "dosage": "3mg",
      "frequency": "2"
    }
  }
]

    mockAssignmentRepository.find.mockResolvedValue(assignments);

    const result = await service.getRemainTreatmentDaysByPatient(1);

    expect(result).toEqual([
      {
        medicationId: 1,
        medicationName: 'LZ-400',
        remainingDays: 2,
      },
      {
        medicationId: 2,
        medicationName: 'MK-20',
        remainingDays: 8,
      },
      {
        medicationId: 3,
        medicationName: 'RK-1000',
        remainingDays: 0,
      },
    ]);
  });

  it('should return an empty list if no assignments are found', async () => {
    mockAssignmentRepository.find.mockResolvedValue([]);

    const result = await service.getRemainTreatmentDaysByPatient(999); // not existing patientId

    expect(result).toEqual([]);
  });
});
