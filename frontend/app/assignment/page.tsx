"use client"

import { useEffect, useState } from "react"
import { Plus, Trash2, Save } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"
import { Label } from "@/app/components/ui/label"
import { BACKEND_URL } from "../config"
import { useRouter } from "next/navigation"

export default function AssignmentTable() {

  const router = useRouter()

  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [patients, setPatients] = useState<Patient[]>([])
  const [medications, setMedications] = useState<Medication[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formErrors, setFormErrors] = useState({
    medicationId: "",
    patientId: "",
    startDate: "",
    days: ""
  })
  const [formData, setFormData] = useState({
    patientId: 0,
    medicationId: 0,
    startDate: "",
    numberOfDays: 0,
  })


  const getAllPatients=() =>{
    fetch(`${BACKEND_URL}/patients/all`)
    .then((res)=>res.json())
    .then((data)=> {
      setPatients(data);
    })
  }

  const getAllMedications=() =>{
    fetch(`${BACKEND_URL}/medications/all`)
    .then((res)=>res.json())
    .then((data)=> {
      setMedications(data);
    })
  }

  const fetchAssignments = async () => {
    const res = await fetch(`${BACKEND_URL}/assign/get/remain/treatment-days`)
    const data = await res.json()
    setAssignments(data)
  }

  useEffect(()=>{
    fetchAssignments();
    getAllMedications();
    getAllPatients();
  }, [])

  const handleSave = async () => {

    const errors = {
      medicationId: formData.medicationId === 0 ? "Medication is required" : "",
      patientId: formData.patientId === 0 ? "Patient is required" : "",
      startDate: formData.startDate === "" ? "Start date is required" : "",
      days: formData.numberOfDays <= 0 ? "Days are required" : ""
    }
    setFormErrors(errors)
    
    const hasErrors = Object.values(errors).some((msg) => msg !== "")
    if (hasErrors) return

    const selectedPatient = patients.find(p => p.patientId === Number(formData.patientId))
    const selectedMedication = medications.find(m => m.medicationId === Number(formData.medicationId))

    if (selectedPatient && selectedMedication) {

      const newAssignment: CreateAssignment = {
        patientId: selectedPatient.patientId,
        medicationId: selectedMedication.medicationId,
        startDate: formData.startDate,
        numberOfDays: formData.numberOfDays,
      }

      try {
        const response = await fetch(`${BACKEND_URL}/assign/medication/patient?patientId=${selectedPatient.patientId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAssignment),
      })

      if (!response.ok) throw new Error("Failed to create medication")

      await fetchAssignments();
      setIsDialogOpen(false);
      setFormData({ patientId: 0, medicationId: 0, startDate: "", numberOfDays:0})
      setFormErrors({ patientId: "", medicationId: "", startDate: "", days:""}) 
    } catch (error) {
      console.error("Error creating patient:", error)
  }

      setIsDialogOpen(false)

      setFormData({
        patientId: 0,
        medicationId: 0,
        startDate: "",
        numberOfDays: 0,
      })
    }
  }

  const handleCancel = () => {
    setIsDialogOpen(false)
    setFormData({ patientId: 0, medicationId: 0, startDate: "", numberOfDays: 0 })
  }

  const handleDelete = async (medicationId: number, patientId: number) => {
    await fetch(`${BACKEND_URL}/assign/delete?patientId=${patientId}&medicationId=${medicationId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
      })

    await fetchAssignments();

  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <Button
        variant="outline"
        className="mb-4 flex items-center gap-2 cursor-pointer"
        onClick={() => router.back()}
      >
        ← Back
      </Button>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">Medication Management</CardTitle>
              <CardDescription>Manage your medications with basic CRUD operations</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setIsDialogOpen(true)} className="flex items-center gap-2 cursor-pointer">
                  <Plus className="h-4 w-4" />
                  Add Assignment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Assignment</DialogTitle>
                  <DialogDescription>
                    Fill in all the required information below.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {/* Patient Select */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="patient" className="text-right">Patient</Label>
                    <select
                      id="patient"
                      value={formData.patientId}
                      onChange={(e) => setFormData({ ...formData, patientId: Number(e.target.value) })}
                      className="col-span-3 border border-gray-300 rounded px-3 py-2"
                    >
                      <option value="">Select Patient</option>
                      {patients.map((patient) => (
                        <option key={patient.patientId} value={patient.patientId}>
                          {patient.name}
                        </option>
                      ))}
                    </select>
                    {formErrors.patientId && (
                      <div className="col-start-2 col-span-3 text-red-500 text-sm">{formErrors.patientId}</div>
                    )}
                  </div>

                  {/* Medication Select */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="medication" className="text-right">Medication</Label>
                    <select
                      id="medication"
                      value={formData.medicationId}
                      onChange={(e) => setFormData({ ...formData, medicationId: Number(e.target.value) })}
                      className="col-span-3 border border-gray-300 rounded px-3 py-2"
                    >
                      <option value="">Select Medication</option>
                      {medications.map((med) => (
                        <option key={`${med.medicationId}-${med.name}`} value={med.medicationId}>
                          {med.name}
                        </option>
                      ))}
                    </select>
                    {formErrors.medicationId && (
                      <div className="col-start-2 col-span-3 text-red-500 text-sm">{formErrors.medicationId}</div>
                    )}
                  </div>

                  {/* Start Date */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="startDate" className="text-right">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="col-span-3"
                    />
                    {formErrors.startDate && (
                      <div className="col-start-2 col-span-3 text-red-500 text-sm">{formErrors.startDate}</div>
                    )}
                  </div>

                  {/* Number of Days */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="days" className="text-right">Days</Label>
                    <Input
                      id="days"
                      type="number"
                      min="1"
                      value={formData.numberOfDays}
                      onChange={(e) => setFormData({ ...formData, numberOfDays: Number(e.target.value) })}
                      className="col-span-3"
                    />
                    {formErrors.days && (
                      <div className="col-start-2 col-span-3 text-red-500 text-sm">{formErrors.days}</div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button onClick={handleCancel} className="cursor-pointer" variant="outline">Cancel</Button>
                  <Button onClick={handleSave} className="flex items-center gap-2 cursor-pointer">
                    <Save className="h-4 w-4" />
                    Save Medication
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 font-semibold text-gray-900">Patient</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Medication</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Days Remaining</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr key={`${assignment.patientId}-${assignment.medicationId}`} className="border-b hover:bg-gray-50">
                    <td className="p-4">{assignment.patientName}</td>
                    <td className="p-4">{assignment.medicationName}</td>
                    <td className="p-4">{assignment.remainingDays}</td>
                    <td className="p-4">
                      <Button
                        onClick={() => handleDelete(assignment.medicationId, assignment.patientId)}
                        variant="destructive"
                        size="sm"
                        className="flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="h-3 w-3" />
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
                {assignments.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-gray-500">
                      No medications assigned. Click "Add Medication" to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
