"use client"

import { useEffect, useState } from "react"
import { Plus, Trash2, Save, X } from "lucide-react"
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
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover"
import { Calendar } from "@/app/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { BACKEND_URL } from "../config"

export default function PatientTable() {


  const [patients, setPatients] = useState<Patient[]>([])
  const [formErrors, setFormErrors] = useState({
    name: "",
    dateOfBirth: "",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
  })

  useEffect(() => {
    fetch(`${BACKEND_URL}/patients/all`)
      .then((res) => res.json())
      .then((data) => setPatients(data))
  }, [])

  const handleSave = async () => {
  const errors = {
    name: formData.name.trim() === "" ? "Name is required" : "",
    dateOfBirth: formData.dateOfBirth === "" ? "Date of Birth is required" : "",
  }

  setFormErrors(errors)

  const hasErrors = Object.values(errors).some((msg) => msg !== "")
  if (hasErrors) return

  try {
    const response = await fetch(`${BACKEND_URL}/patients/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })

    if (!response.ok) throw new Error("Failed to create patient")

    const createdPatient = await response.json()
    setPatients((prev) => [...prev, createdPatient])
    setIsDialogOpen(false)
    setFormData({ name: "", dateOfBirth: "" })
    setFormErrors({ name: "", dateOfBirth: "" }) 
  } catch (error) {
    console.error("Error creating patient:", error)
  }
}



  const handleCancel = () => {
    setIsDialogOpen(false)
    setFormData({ name: "", dateOfBirth: "" })
  }

  const handleDelete = (id: number) => {
    setPatients(patients.filter((patient) => patient.patientId !== id))
  }

  const handleAdd = () => {
    setIsDialogOpen(true)
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">Patient Management</CardTitle>
              <CardDescription>Manage your patients with basic CRUD operations</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleAdd} className="flex items-center gap-2 cursor-pointer">
                  <Plus className="h-4 w-4" />
                  Add Patient
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Patient</DialogTitle>
                  <DialogDescription>
                    Fill in all the required information below.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter name"
                      className="col-span-3"
                    />
                    {formErrors.name && (
                      <div className="col-start-2 col-span-3 text-red-500 text-sm">{formErrors.name}</div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dateOfBirth" className="text-right">
                    Date of Birth
                  </Label>
                  <div className="col-span-3">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.dateOfBirth
                            ? format(new Date(formData.dateOfBirth), "yyyy-MM-dd")
                            : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.dateOfBirth ? new Date(formData.dateOfBirth) : undefined}
                          onSelect={(date) =>
                            setFormData({
                              ...formData,
                              dateOfBirth: date ? format(date, "yyyy-MM-dd") : "",
                            })
                          }
                          initialFocus
                        />
                      </PopoverContent>
                      {formErrors.dateOfBirth && (
                      <div className="col-start-2 col-span-3 text-red-500 text-sm">{formErrors.dateOfBirth}</div>
                    )}
                    </Popover>
                  </div>
                </div>
                </div>
                <div className="flex justify-end gap-2 cursor-pointer">
                  <Button onClick={handleCancel} className="cursor-pointer" variant="outline">
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className="flex items-center gap-2 cursor-pointer">
                    <Save className="h-4 w-4" />
                    Save Patient
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
                  <th className="text-left p-4 font-semibold text-gray-900">Name</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Date Of Birth</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr
                    key={patient.patientId}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 text-gray-900">{patient.name}</td>
                    <td className="p-4 text-gray-700">{patient.dateOfBirth}</td>
                    <td className="p-4">
                      <Button
                        onClick={() => handleDelete(patient.patientId)}
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
              </tbody>
            </table>
            {patients.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No patients found. Click "Add Medication" to create your first one.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
