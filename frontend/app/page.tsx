"use client"

import { Button } from "@/app/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"

import { useRouter } from "next/navigation"


export default function CrudTable() {
  
    const router = useRouter()

  const navigateToPatient = () =>{
    router.push("/patient")
  }

  const navigateToMedication = () =>{
    router.push("/medication")
  }

  const navigateToAssignments = () =>{
    router.push("/assignment")
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">Manage</CardTitle>
              <CardDescription>Manage your data with full operations</CardDescription>
            </div>
            
          </div>
        </CardHeader>
        <Button onClick={()=>navigateToPatient()} className="flex items-center gap-2 cursor-pointer">
                  Patients
        </Button>
        <Button onClick={()=>navigateToMedication()} className="flex items-center gap-2 cursor-pointer">
                  Medications
        </Button>
        <Button onClick={()=>navigateToAssignments()} className="flex items-center gap-2 cursor-pointer">
                  Assignments
        </Button>
      </Card>
    </div>
  )
}
