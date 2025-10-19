"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function SimpleRunsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <section className="bg-gray-800 border-b border-gray-700 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-2">Valuation Runs</h1>
            <p className="text-gray-300">Monitor and manage all valuation runs</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button className="bg-green-600 hover:bg-green-700 text-black font-medium">
              New Run
            </Button>
          </div>
        </div>
      </section>

      <section className="px-8 py-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">Test Card</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-gray-300">This is a test card to check if the basic components work.</span>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
