"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  ArrowLeftRight, 
  Shield, 
  ShieldCheck, 
  TrendingUp, 
  TrendingDown,
  PieChart,
  BarChart3,
  LineChart,
  Download,
  Share,
  RefreshCw,
  AlertTriangle,
  Info,
  Eye,
  Settings,
  Bot,
  Database,
  Server,
  Cloud,
  Zap,
  Target,
  Globe,
  Lock,
  Key,
  Bell,
  MessageCircle,
  HelpCircle,
  Star,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Home,
  Building,
  Store,
  Factory,
  Warehouse,
  School,
  Church,
  Castle,
  Tent,
  Car,
  Truck,
  Bus,
  Train,
  Plane,
  Ship,
  Bike,
  Flame,
  Calendar
} from "lucide-react"

interface ValuationRun {
  id: string
  instrument: {
    name: string
    type: "IRS" | "CCS" | "Cap" | "Swaption" | "FRA"
    description: string
    icon: string
  }
  asOfDate: string
  status: "completed" | "running" | "failed" | "queued"
  pv: number
  currency: string
  createdBy: string
  createdAt: string
  completedAt?: string
  errorMessage?: string
  approach: string[]
  marketDataProfile: string
  xvaConfig?: {
    computeCva: boolean
    computeDva: boolean
    computeFva: boolean
  }
  results?: {
    pvBreakdown: {
      pvBaseCcy: number
      legs: Array<{
        name: string
        pv: number
      }>
      sensitivities: Array<{
        shock: string
        value: number
      }>
    }
    cashflows: Array<{
      date: string
      type: string
      amount: number
      currency: string
    }>
  }
}

export default function RunDetailPage() {
  const router = useRouter()
  const [run, setRun] = useState<ValuationRun | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Get run ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const runId = urlParams.get('id') || 'run-001'
    
    // Mock data - replace with actual API call
    const mockRun: ValuationRun = {
      id: runId,
      instrument: {
        name: "USD 5Y IRS",
        type: "IRS",
        description: "5-year USD Interest Rate Swap",
        icon: "📈"
      },
      asOfDate: "2024-01-15",
      status: "completed",
      pv: 125000.50,
      currency: "USD",
      createdBy: "john.doe@company.com",
      createdAt: "2024-01-15T09:30:00Z",
      completedAt: "2024-01-15T09:32:15Z",
      approach: ["OIS_discounting"],
      marketDataProfile: "synthetic",
      results: {
        pvBreakdown: {
          pvBaseCcy: 125000.50,
          legs: [
            { name: "Fixed Leg", pv: -125000.50 },
            { name: "Float Leg", pv: 250000.00 }
          ],
          sensitivities: [
            { shock: "PV01", value: 5000.00 }
          ]
        },
        cashflows: [
          { date: "2024-04-15", type: "Fixed", amount: -25000, currency: "USD" },
          { date: "2024-07-15", type: "Fixed", amount: -25000, currency: "USD" },
          { date: "2024-10-15", type: "Fixed", amount: -25000, currency: "USD" },
          { date: "2025-01-15", type: "Fixed", amount: -25000, currency: "USD" },
          { date: "2025-04-15", type: "Fixed", amount: -25000, currency: "USD" }
        ]
      }
    }

    setRun(mockRun)
    setLoading(false)
  }, [])

  const handleBack = () => {
    router.push('/runs')
  }

  const handleDownload = () => {
    // Implement download functionality
    console.log("Downloading run:", run?.id)
  }

  const handleShare = () => {
    // Implement share functionality
    console.log("Sharing run:", run?.id)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "running":
        return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />
      case "failed":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "queued":
        return <Clock className="h-5 w-5 text-yellow-500" />
      default:
        return <Info className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "bg-green-100 text-green-800",
      running: "bg-blue-100 text-blue-800",
      failed: "bg-red-100 text-red-800",
      queued: "bg-yellow-100 text-yellow-800"
    }
    
    return (
      <Badge className={variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      </div>
    )
  }

  if (error || !run) {
    return (
      <div className="container mx-auto p-6">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {error || "Run not found"}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Runs
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{run.instrument.name}</h1>
            <p className="text-gray-600">{run.instrument.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Status and Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {getStatusIcon(run.status)}
              <span>Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {getStatusBadge(run.status)}
            {run.status === "completed" && run.completedAt && (
              <p className="text-sm text-gray-600 mt-2">
                Completed: {new Date(run.completedAt).toLocaleString()}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Present Value</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {run.pv.toLocaleString()} {run.currency}
            </div>
            {run.results?.pvBreakdown.sensitivities && (
              <div className="text-sm text-gray-600 mt-1">
                PV01: {run.results.pvBreakdown.sensitivities[0]?.value.toLocaleString()} {run.currency}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>As Of Date</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">{run.asOfDate}</div>
            <div className="text-sm text-gray-600">
              Created: {new Date(run.createdAt).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="cashflows">Cashflows</TabsTrigger>
          <TabsTrigger value="sensitivities">Sensitivities</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>PV Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                {run.results?.pvBreakdown.legs.map((leg, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b">
                    <span>{leg.name}</span>
                    <span className="font-mono">{leg.pv.toLocaleString()} {run.currency}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center py-2 font-bold">
                  <span>Total PV</span>
                  <span className="font-mono">{run.pv.toLocaleString()} {run.currency}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Market Data:</span>
                  <span>{run.marketDataProfile}</span>
                </div>
                <div className="flex justify-between">
                  <span>Approach:</span>
                  <span>{run.approach.join(", ")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Created By:</span>
                  <span>{run.createdBy}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cashflows" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cashflow Schedule</CardTitle>
              <CardDescription>
                Detailed cashflow breakdown for this valuation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {run.results?.cashflows.map((cf, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b">
                    <div>
                      <span className="font-medium">{cf.date}</span>
                      <span className="text-sm text-gray-600 ml-2">({cf.type})</span>
                    </div>
                    <span className="font-mono">
                      {cf.amount.toLocaleString()} {cf.currency}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sensitivities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Risk Sensitivities</CardTitle>
              <CardDescription>
                Sensitivity analysis for this valuation
              </CardDescription>
            </CardHeader>
            <CardContent>
              {run.results?.pvBreakdown.sensitivities.map((sens, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b">
                  <span>{sens.shock}</span>
                  <span className="font-mono">{sens.value.toLocaleString()} {run.currency}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Run Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Run ID</label>
                  <p className="font-mono">{run.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Instrument Type</label>
                  <p>{run.instrument.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Currency</label>
                  <p>{run.currency}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(run.status)}
                    {getStatusBadge(run.status)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
