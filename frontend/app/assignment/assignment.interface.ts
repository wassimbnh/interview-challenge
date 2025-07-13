
interface Assignment {

  patientId: number;
  medicationId: number;
  medicationName: string
  patientName: string
  remainingDays: number

}


interface CreateAssignment {

  patientId: number;
  medicationId: number;
  startDate: string;
  numberOfDays: number;

}
