"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Save, X } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"
import { Label } from "@/app/components/ui/label"

interface User {
  id: number
  name: string
  email: string
  role: string
  status: "Active" | "Inactive"
}

export default function CrudTable() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor", status: "Inactive" },
  ])

  const [editingId, setEditingId] = useState<number | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "Active" as "Active" | "Inactive",
  })

  const handleEdit = (user: User) => {
    setEditingId(user.id)
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    })
  }

  const handleSave = () => {
    if (editingId) {
      setUsers(users.map((user) => (user.id === editingId ? { ...user, ...formData } : user)))
      setEditingId(null)
    } else {
      const newUser: User = {
        id: Math.max(...users.map((u) => u.id)) + 1,
        ...formData,
      }
      setUsers([...users, newUser])
      setIsDialogOpen(false)
    }
    setFormData({ name: "", email: "", role: "", status: "Active" })
  }

  const handleCancel = () => {
    setEditingId(null)
    setIsDialogOpen(false)
    setFormData({ name: "", email: "", role: "", status: "Active" })
  }

  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const handleAdd = () => {
    setIsDialogOpen(true)
    setFormData({ name: "", email: "", role: "", status: "Active" })
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">User Management</CardTitle>
              <CardDescription>Manage your users with full CRUD operations</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleAdd} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Create a new user account. Fill in all the required information below.
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
                      placeholder="Enter full name"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter email address"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      Role
                    </Label>
                    <Input
                      id="role"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="Enter role"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as "Active" | "Inactive" })}
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button onClick={handleCancel} variant="outline">
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save User
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
                  <th className="text-left p-4 font-semibold text-gray-900">ID</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Name</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Email</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Role</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Status</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium text-gray-900">{user.id}</td>
                    <td className="p-4">
                      {editingId === user.id ? (
                        <Input
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full"
                        />
                      ) : (
                        <span className="text-gray-900">{user.name}</span>
                      )}
                    </td>
                    <td className="p-4">
                      {editingId === user.id ? (
                        <Input
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full"
                        />
                      ) : (
                        <span className="text-gray-600">{user.email}</span>
                      )}
                    </td>
                    <td className="p-4">
                      {editingId === user.id ? (
                        <Input
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          className="w-full"
                        />
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {user.role}
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      {editingId === user.id ? (
                        <select
                          value={formData.status}
                          onChange={(e) =>
                            setFormData({ ...formData, status: e.target.value as "Active" | "Inactive" })
                          }
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      ) : (
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.status}
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      {editingId === user.id ? (
                        <div className="flex gap-2">
                          <Button onClick={handleSave} size="sm" className="flex items-center gap-1">
                            <Save className="h-3 w-3" />
                            Save
                          </Button>
                          <Button
                            onClick={handleCancel}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 bg-transparent"
                          >
                            <X className="h-3 w-3" />
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEdit(user)}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <Edit className="h-3 w-3" />
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDelete(user.id)}
                            variant="destructive"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <Trash2 className="h-3 w-3" />
                            Delete
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No users found. Click "Add User" to create your first user.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
