"use client"

import { useState } from "react"
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

export default function CrudTable() {
  const [users, setUsers] = useState<Medication[]>([
    {
      medicationId: "1",
      name: "Aspirin",
      dosage: "500mg",
      frequency: "Daily",
    },
    {
      medicationId: "2",
      name: "Ibuprofen",
      dosage: "200mg",
      frequency: "Twice a day",
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    frequency: "",
  })

  const handleSave = () => {
    const newMedication: Medication = {
      medicationId: Date.now().toString(), // Or use a UUID library
      ...formData,
    }
    setUsers([...users, newMedication])
    setIsDialogOpen(false)
    setFormData({ name: "", dosage: "", frequency: "" })
  }

  const handleCancel = () => {
    setIsDialogOpen(false)
    setFormData({ name: "", dosage: "", frequency: "" })
  }

  const handleDelete = (id: string) => {
    setUsers(users.filter((user) => user.medicationId !== id))
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
              <CardTitle className="text-2xl font-bold">Medication Management</CardTitle>
              <CardDescription>Manage your medications with basic CRUD operations</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleAdd} className="flex items-center gap-2 cursor-pointer">
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
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dosage" className="text-right">
                      Dosage
                    </Label>
                    <Input
                      id="dosage"
                      value={formData.dosage}
                      onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                      placeholder="Enter dosage"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="frequency" className="text-right">
                      Frequency
                    </Label>
                    <Input
                      id="frequency"
                      value={formData.frequency}
                      onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                      placeholder="Enter frequency"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 cursor-pointer">
                  <Button onClick={handleCancel} className="cursor-pointer" variant="outline">
                    Cancel
                  </Button>
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
                  <th className="text-left p-4 font-semibold text-gray-900">Name</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Dosage</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Frequency</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.medicationId}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 text-gray-900">{user.name}</td>
                    <td className="p-4 text-gray-700">{user.dosage}</td>
                    <td className="p-4 text-gray-700">{user.frequency}</td>
                    <td className="p-4">
                      <Button
                        onClick={() => handleDelete(user.medicationId)}
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
              </tbody>
            </table>
            {users.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No medications found. Click "Add Medication" to create your first one.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
