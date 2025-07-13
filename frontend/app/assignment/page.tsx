"use client"

import { useState } from "react"
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

interface Patient {
  patientId: number
  name: string
  dateOfBirth: string
}

interface Medication {
  medicationId: number
  name: string
  dosage: string
  frequency: string
}

interface Assignment {
  patientId: number
  patientName: string
  medicationId: number
  medicationName: string
  remainingDays: number
}

export default function AssignmentTable() {
  const patients: Patient[] = [
    { patientId: 1, name: "John Doe", dateOfBirth: "1990-05-15" },
    { patientId: 2, name: "Jane Smith", dateOfBirth: "1985-08-10" },
  ]

  const medications: Medication[] = [
    { medicationId: 1, name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
    { medicationId: 2, name: "Amoxicillin", dosage: "250mg", frequency: "Three times a day" },
  ]

  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [formData, setFormData] = useState({
    patientId: 0,
    medicationId: 0,
    startDate: "",
    numberOfDays: 0,
  })

  const handleSave = () => {
    const selectedPatient = patients.find(p => p.patientId === Number(formData.patientId))
    const selectedMedication = medications.find(m => m.medicationId === Number(formData.medicationId))

    if (selectedPatient && selectedMedication) {
      const newAssignment: Assignment = {
        patientId: selectedPatient.patientId,
        patientName: selectedPatient.name,
        medicationId: selectedMedication.medicationId,
        medicationName: selectedMedication.name,
        remainingDays: formData.numberOfDays,
      }

      setAssignments([...assignments, newAssignment])
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

  const handleDelete = (medicationId: number) => {
    setAssignments(assignments.filter(a => a.medicationId !== medicationId))
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">Medication Management</CardTitle>
              <CardDescription>Manage your medications with basic CRUD operations</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setIsDialogOpen(true)} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Medication
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Medication</DialogTitle>
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
                        <option key={med.medicationId} value={med.medicationId}>
                          {med.name}
                        </option>
                      ))}
                    </select>
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
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button onClick={handleCancel} variant="outline">Cancel</Button>
                  <Button onClick={handleSave} className="flex items-center gap-2">
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
                        onClick={() => handleDelete(assignment.medicationId)}
                        variant="destructive"
                        size="sm"
                        className="flex items-center gap-1"
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
