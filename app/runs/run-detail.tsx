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
    console.log("Downloading run:", run?.id)
  }

  const handleShare = () => {
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
      <div className="container mx-auto p-4 sm:p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      </div>
    )
  }

  if (error || !run) {
    return (
      <div className="container mx-auto p-4 sm:p-6">
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
    <div className="space-y-4 sm:space-y-6">
      {/* Header - Mobile Optimized */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBack} className="shrink-0">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Back to Runs</span>
            <span className="sm:hidden">Back</span>
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-3xl font-bold truncate">{run.instrument.name}</h1>
            <p className="text-gray-600 text-sm sm:text-base truncate">{run.instrument.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleDownload} className="flex-1 sm:flex-none">
            <Download className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Download</span>
          </Button>
          <Button variant="outline" onClick={handleShare} className="flex-1 sm:flex-none">
            <Share className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Share</span>
          </Button>
        </div>
      </div>

      {/* Status and Overview - Mobile Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-base">
              {getStatusIcon(run.status)}
              <span>Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {getStatusBadge(run.status)}
            {run.status === "completed" && run.completedAt && (
              <p className="text-sm text-gray-600 mt-2">
                Completed: {new Date(run.completedAt).toLocaleString()}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-base">
              <DollarSign className="h-5 w-5" />
              <span>Present Value</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl sm:text-2xl font-bold">
              {run.pv.toLocaleString()} {run.currency}
            </div>
            {run.results?.pvBreakdown.sensitivities && (
              <div className="text-sm text-gray-600 mt-1">
                PV01: {run.results.pvBreakdown.sensitivities[0]?.value.toLocaleString()} {run.currency}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="sm:col-span-2 lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-base">
              <Calendar className="h-5 w-5" />
              <span>As Of Date</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg font-semibold">{run.asOfDate}</div>
            <div className="text-sm text-gray-600">
              Created: {new Date(run.createdAt).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Tabs - Mobile Optimized */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
          <TabsTrigger value="cashflows" className="text-xs sm:text-sm">Cashflows</TabsTrigger>
          <TabsTrigger value="sensitivities" className="text-xs sm:text-sm">Sensitivities</TabsTrigger>
          <TabsTrigger value="details" className="text-xs sm:text-sm">Details</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">PV Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {run.results?.pvBreakdown.legs.map((leg, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm">{leg.name}</span>
                      <span className="font-mono text-sm">{leg.pv.toLocaleString()} {run.currency}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center py-2 font-bold border-t">
                    <span>Total PV</span>
                    <span className="font-mono">{run.pv.toLocaleString()} {run.currency}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Market Data:</span>
                  <span>{run.marketDataProfile}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Approach:</span>
                  <span className="text-right">{run.approach.join(", ")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Created By:</span>
                  <span className="text-right truncate">{run.createdBy}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cashflows" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Cashflow Schedule</CardTitle>
              <CardDescription className="text-sm">
                Detailed cashflow breakdown for this valuation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {run.results?.cashflows.map((cf, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b">
                    <div className="flex-1 min-w-0">
                      <span className="font-medium text-sm">{cf.date}</span>
                      <span className="text-xs text-gray-600 ml-2">({cf.type})</span>
                    </div>
                    <span className="font-mono text-sm">
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
              <CardTitle className="text-base">Risk Sensitivities</CardTitle>
              <CardDescription className="text-sm">
                Sensitivity analysis for this valuation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {run.results?.pvBreakdown.sensitivities.map((sens, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm">{sens.shock}</span>
                    <span className="font-mono text-sm">{sens.value.toLocaleString()} {run.currency}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Run Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Run ID</label>
                  <p className="font-mono text-sm">{run.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Instrument Type</label>
                  <p className="text-sm">{run.instrument.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Currency</label>
                  <p className="text-sm">{run.currency}</p>
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
