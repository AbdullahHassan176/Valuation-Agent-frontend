"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
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
  CreditCard,
  LineChart,
  Activity,
  Scale,
  Download,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Play,
  Pause,
  Settings,
  Bot,
  Send,
  AlertTriangle,
  Info,
  Timer,
  BarChart3,
  Users,
  Database,
  FileText,
  Lock,
  Unlock,
  Bell,
  Search,
  HelpCircle,
  Coins,
  ShieldAlt,
  ClipboardList,
  Cog,
  Mountain,
  TrendingUp,
  User,
  Coins,
  Maximize2,
  ExternalLink,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react"

interface ValuationRun {
  id: string
  title: string
  notional: number
  currency: string
  asOfDate: string
  createdBy: string
  status: 'completed' | 'running' | 'failed' | 'pending'
  presentValue: number
  presentValueEUR: number
  fxRate: number
  ifrsLevel: number
  xvaAdjustment: number
  processingTime: string
  timeline: Array<{
    step: string
    description: string
    status: 'completed' | 'running' | 'pending'
    timestamp: string
  }>
  contractDetails: {
    notional: string
    tradeDate: string
    effectiveDate: string
    maturityDate: string
    tenor: string
    direction: string
    fixedRate: string
    floatingIndex: string
    payFrequency: string
    receiveFrequency: string
  }
  modelConfig: {
    valuationModel: string
    pricingMethod: string
    simulationPaths: string
    timeSteps: string
    discountCurve: string
    forwardCurve: string
    volatilitySurface: string
    meanReversion: string
    volatility: string
    modelVersion: string
  }
  dataLineage: {
    marketDataSource: { name: string; status: string; lastUpdated: string }
    curveBuild: { name: string; hash: string }
    calibrationData: { name: string; expiry: string }
    validationStatus: { status: string; details: string }
  }
  marketEnvironment: {
    usdSofr3m: { rate: string; change: string }
    usdOis5y: { rate: string; change: string }
    usdEurFx: { rate: string; change: string }
  }
  scenarioAnalysis: Array<{
    name: string
    value: string
    type: 'base' | 'stress'
    description: string
  }>
  qualityMetrics: Array<{
    name: string
    value: string
    percentage: number
    description: string
  }>
  riskMetrics: {
    ir01: string
    dv01: string
    gamma: string
    vega: string
  }
  xvaComponents: Array<{
    name: string
    value: string
    percentage: string
    description: string
    icon: string
    color: string
  }>
  auditLog: Array<{
    timestamp: string
    level: string
    message: string
  }>
  complianceChecklist: Array<{
    name: string
    status: string
    description: string
  }>
}

export default function RunDetailPage() {
  const params = useParams()
  const [run, setRun] = useState<ValuationRun | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<Array<{
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
  }>>([])
  const [chatInput, setChatInput] = useState("")

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    const mockRun: ValuationRun = {
      id: params.id as string,
      title: "Interest Rate Swap Valuation",
      notional: 10000000,
      currency: "USD",
      asOfDate: "2025-01-18",
      createdBy: "Alex Johnson",
      status: "completed",
      presentValue: 127450.23,
      presentValueEUR: 117385.67,
      fxRate: 1.0858,
      ifrsLevel: 2,
      xvaAdjustment: 2847.12,
      processingTime: "2m 18s",
      timeline: [
        {
          step: "Intake & Validation",
          description: "Contract parsed and validated successfully",
          status: "completed",
          timestamp: "08:20:15 UTC"
        },
        {
          step: "Data Sourcing",
          description: "Market data and curves retrieved",
          status: "completed",
          timestamp: "08:20:47 UTC"
        },
        {
          step: "Valuation Engine",
          description: "DCF calculation with Hull-White 1F model",
          status: "completed",
          timestamp: "08:21:52 UTC"
        },
        {
          step: "Risk Analytics",
          description: "Sensitivities and XVA calculations",
          status: "completed",
          timestamp: "08:22:18 UTC"
        },
        {
          step: "IFRS-13 Classification",
          description: "Level 2 - Observable market inputs",
          status: "completed",
          timestamp: "08:22:33 UTC"
        }
      ],
      contractDetails: {
        notional: "USD 10,000,000",
        tradeDate: "2025-01-02",
        effectiveDate: "2025-01-02",
        maturityDate: "2030-01-02",
        tenor: "5 Years",
        direction: "Pay Fixed",
        fixedRate: "3.50%",
        floatingIndex: "USD-SOFR-OIS",
        payFrequency: "Semi-Annual",
        receiveFrequency: "Quarterly"
      },
      modelConfig: {
        valuationModel: "Hull-White 1F",
        pricingMethod: "Monte Carlo",
        simulationPaths: "50,000",
        timeSteps: "Daily",
        discountCurve: "USD-OIS",
        forwardCurve: "USD-SOFR-3M",
        volatilitySurface: "USD-SWAPTION",
        meanReversion: "0.0342",
        volatility: "0.0089",
        modelVersion: "v2.1.4"
      },
      dataLineage: {
        marketDataSource: { name: "Bloomberg API", status: "Live", lastUpdated: "08:15 UTC" },
        curveBuild: { name: "Bootstrap v1.8.2", hash: "a7f3c9e2d1b8" },
        calibrationData: { name: "Swaption Vols", expiry: "1M-10Y" },
        validationStatus: { status: "All Checks Passed", details: "No anomalies detected" }
      },
      marketEnvironment: {
        usdSofr3m: { rate: "4.87%", change: "+0.02% vs previous" },
        usdOis5y: { rate: "4.23%", change: "-0.01% vs previous" },
        usdEurFx: { rate: "1.0858", change: "+0.0012 vs previous" }
      },
      scenarioAnalysis: [
        { name: "Base Case", value: "$127,450.23", type: "base", description: "Current market conditions" },
        { name: "Rates +100bp", value: "$89,234.56", type: "stress", description: "Parallel shift up" },
        { name: "Rates -100bp", value: "$167,892.34", type: "stress", description: "Parallel shift down" },
        { name: "Vol +50%", value: "$132,847.91", type: "stress", description: "Volatility shock" }
      ],
      qualityMetrics: [
        { name: "Model Accuracy", value: "99.2%", percentage: 99.2, description: "Monte Carlo convergence" },
        { name: "Data Quality", value: "100%", percentage: 100, description: "No missing data points" },
        { name: "Calibration Fit", value: "87.4%", percentage: 87.4, description: "Volatility surface fit" },
        { name: "Risk Consistency", value: "96.8%", percentage: 96.8, description: "Cross-gamma checks" }
      ],
      riskMetrics: {
        ir01: "$892.15",
        dv01: "$89.22",
        gamma: "$12.34",
        vega: "$234.67"
      },
      xvaComponents: [
        {
          name: "Credit Valuation Adjustment",
          value: "$1,847.23",
          percentage: "0.018% of notional",
          description: "CVA - Counterparty default risk",
          icon: "Shield",
          color: "success"
        },
        {
          name: "Debt Valuation Adjustment",
          value: "-$623.45",
          percentage: "-0.006% of notional",
          description: "DVA - Own credit risk",
          icon: "UserShield",
          color: "warning"
        },
        {
          name: "Funding Valuation Adjustment",
          value: "$1,623.34",
          percentage: "0.016% of notional",
          description: "FVA - Funding costs",
          icon: "Coins",
          color: "info"
        }
      ],
      auditLog: [
        { timestamp: "08:20:15", level: "INFO", message: "Contract validation started" },
        { timestamp: "08:20:16", level: "INFO", message: "Trade date validation: PASSED" },
        { timestamp: "08:20:17", level: "INFO", message: "Notional validation: PASSED" },
        { timestamp: "08:20:18", level: "INFO", message: "Rate validation: PASSED" },
        { timestamp: "08:20:19", level: "DEBUG", message: "Loading USD-OIS curve data" },
        { timestamp: "08:20:47", level: "INFO", message: "Market data retrieved successfully" },
        { timestamp: "08:21:15", level: "DEBUG", message: "Initializing Hull-White model" },
        { timestamp: "08:21:52", level: "INFO", message: "Monte Carlo simulation completed" },
        { timestamp: "08:22:18", level: "INFO", message: "XVA calculations completed" },
        { timestamp: "08:22:33", level: "INFO", message: "IFRS-13 classification: Level 2" }
      ],
      complianceChecklist: [
        { name: "Market Data Validation", status: "passed", description: "All inputs within acceptable ranges" },
        { name: "Model Validation", status: "passed", description: "Hull-White 1F approved for IRS" },
        { name: "IFRS-13 Classification", status: "passed", description: "Level 2 - Observable inputs used" },
        { name: "Risk Limits", status: "passed", description: "All sensitivities within limits" },
        { name: "Documentation", status: "passed", description: "Complete audit trail generated" }
      ]
    }
    setRun(mockRun)
  }, [params.id])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'running': return <Clock className="w-4 h-4 text-blue-600" />
      case 'failed': return <XCircle className="w-4 h-4 text-red-600" />
      default: return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge className="bg-green-600 text-white">Completed</Badge>
      case 'running': return <Badge className="bg-blue-600 text-white">Running</Badge>
      case 'failed': return <Badge className="bg-red-600 text-white">Failed</Badge>
      default: return <Badge className="bg-gray-600 text-white">Pending</Badge>
    }
  }

  const formatCurrency = (amount: number, currency: string = "USD") => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: chatInput,
      timestamp: new Date()
    }

    setChatMessages(prev => [...prev, userMessage])
    setChatInput("")

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: "I can help analyze this IRS run in detail. Here's what I can do:\n\n• Explain valuation methodology\n• Run sensitivity scenarios\n• Generate detailed reports\n• Answer IFRS-13 questions",
        timestamp: new Date()
      }
      setChatMessages(prev => [...prev, assistantMessage])
    }, 1000)
  }

  if (!run) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading run details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header with Breadcrumb */}
      <section className="bg-gray-800 border-b border-gray-700 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 text-sm text-gray-300 mb-3">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-0 h-auto">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Runs
              </Button>
              <span>/</span>
              <span>Run Detail</span>
              <span>/</span>
              <span className="text-green-600">VAL-2025-0118-{run.id}</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{run.title}</h1>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-gray-300">{run.currency} {run.notional.toLocaleString()} Notional</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-300">As-of: {run.asOfDate}</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-300">Created by {run.createdBy}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-300">Run Status</div>
              <div className="flex items-center space-x-2">
                {getStatusBadge(run.status)}
                <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button className="bg-green-600 hover:bg-green-700 text-black font-medium">
                <HelpCircle className="w-4 h-4 mr-2" />
                Explain Run
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
                <LineChart className="w-4 h-4 mr-2" />
                Sensitivities
              </Button>
              <Button className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Processing Timeline */}
      <section className="px-8 py-6 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Processing Timeline</h2>
          <div className="text-sm text-gray-300">
            Total Processing Time: <span className="text-white font-medium">{run.processingTime}</span>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-700"></div>
          
          <div className="space-y-6">
            {run.timeline.map((step, index) => (
              <div key={index} className="relative flex items-center">
                <div className={`absolute -left-2 w-4 h-4 rounded-full border-2 border-gray-900 ${
                  step.status === 'completed' ? 'bg-green-600' : 
                  step.status === 'running' ? 'bg-blue-600' : 'bg-gray-600'
                }`}></div>
                <div className="ml-6 flex items-center justify-between w-full">
                  <div>
                    <h3 className="text-white font-medium">{step.step}</h3>
                    <p className="text-sm text-gray-300">{step.description}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      step.status === 'completed' ? 'text-green-600' : 
                      step.status === 'running' ? 'text-blue-600' : 'text-gray-400'
                    }`}>
                      {step.status === 'completed' ? 'Completed' : 
                       step.status === 'running' ? 'Running' : 'Pending'}
                    </div>
                    <div className="text-xs text-gray-400">{step.timestamp}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="px-8 py-4 bg-gray-800 border-b border-gray-700">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-gray-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-green-600 data-[state=active]:text-black">
              <PieChart className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="cashflows" className="data-[state=active]:bg-green-600 data-[state=active]:text-black">
              <CreditCard className="w-4 h-4 mr-2" />
              Cashflows
            </TabsTrigger>
            <TabsTrigger value="curves" className="data-[state=active]:bg-green-600 data-[state=active]:text-black">
              <LineChart className="w-4 h-4 mr-2" />
              Curves
            </TabsTrigger>
            <TabsTrigger value="sensitivities" className="data-[state=active]:bg-green-600 data-[state=active]:text-black">
              <Activity className="w-4 h-4 mr-2" />
              Sensitivities
            </TabsTrigger>
            <TabsTrigger value="ifrs13" className="data-[state=active]:bg-green-600 data-[state=active]:text-black">
              <Scale className="w-4 h-4 mr-2" />
              IFRS-13
            </TabsTrigger>
            <TabsTrigger value="artifacts" className="data-[state=active]:bg-green-600 data-[state=active]:text-black">
              <Download className="w-4 h-4 mr-2" />
              Artifacts
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </section>

      {/* Tab Content */}
      <div className="px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="overview" className="space-y-8">
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-xs text-gray-300 bg-gray-700 px-2 py-1 rounded">Base CCY</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{formatCurrency(run.presentValue)}</div>
                  <div className="text-sm text-gray-300">Present Value (USD)</div>
                  <div className="mt-3 text-xs text-gray-400">Mark-to-Market</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                      <ArrowLeftRight className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-xs text-gray-300 bg-gray-700 px-2 py-1 rounded">Reporting CCY</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">€{run.presentValueEUR.toLocaleString()}</div>
                  <div className="text-sm text-gray-300">Present Value (EUR)</div>
                  <div className="mt-3 text-xs text-gray-400">FX Rate: {run.fxRate}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-yellow-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                      <span className="text-yellow-600 font-bold text-lg">{run.ifrsLevel}</span>
                    </div>
                    <span className="text-xs text-yellow-600 bg-yellow-600 bg-opacity-20 px-2 py-1 rounded">Level {run.ifrsLevel}</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">Observable</div>
                  <div className="text-sm text-gray-300">IFRS-13 Classification</div>
                  <div className="mt-3 text-xs text-gray-400">Market-based inputs</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-xs text-green-600 bg-green-600 bg-opacity-20 px-2 py-1 rounded">CVA/DVA</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{formatCurrency(run.xvaAdjustment)}</div>
                  <div className="text-sm text-gray-300">XVA Adjustment</div>
                  <div className="mt-3 text-xs text-gray-400">Credit risk included</div>
                </CardContent>
              </Card>
            </div>

            {/* Contract Details and Model Information */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-white">Contract Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(run.contractDetails).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <span className="text-white font-medium">{value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-white">Model Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(run.modelConfig).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <span className="text-white font-medium">{value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-white">Data Lineage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">Market Data Source:</span>
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <div className="text-sm text-white font-medium">{run.dataLineage.marketDataSource.name}</div>
                    <div className="text-xs text-gray-400">Last updated: {run.dataLineage.marketDataSource.lastUpdated}</div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">Curve Build:</span>
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <div className="text-sm text-white font-medium">{run.dataLineage.curveBuild.name}</div>
                    <div className="text-xs text-gray-400">Hash: {run.dataLineage.curveBuild.hash}</div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">Calibration Data:</span>
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <div className="text-sm text-white font-medium">{run.dataLineage.calibrationData.name}</div>
                    <div className="text-xs text-gray-400">Expiry: {run.dataLineage.calibrationData.expiry}</div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">Validation Status:</span>
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <div className="text-sm text-white font-medium">{run.dataLineage.validationStatus.status}</div>
                    <div className="text-xs text-gray-400">{run.dataLineage.validationStatus.details}</div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-700">
                    <div className="text-sm text-gray-300 mb-2">Run Identifier</div>
                    <div className="bg-gray-700 rounded p-2">
                      <code className="text-xs text-green-600">VAL-2025-0118-{run.id}</code>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-300 mb-2">Data Hash</div>
                    <div className="bg-gray-700 rounded p-2">
                      <code className="text-xs text-gray-300">sha256:b4c7f8a9e2d3</code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* XVA Components */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">XVA Components</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {run.xvaComponents.map((component, index) => (
                    <div key={index} className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            component.color === 'success' ? 'bg-green-600 bg-opacity-20' :
                            component.color === 'warning' ? 'bg-yellow-600 bg-opacity-20' :
                            'bg-blue-600 bg-opacity-20'
                          }`}>
                            {component.icon === 'Shield' && <Shield className="w-4 h-4 text-green-600" />}
                            {component.icon === 'UserShield' && <User className="w-4 h-4 text-yellow-600" />}
                            {component.icon === 'Coins' && <Coins className="w-4 h-4 text-blue-600" />}
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{component.name}</h4>
                            <p className="text-xs text-gray-300">{component.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-white">{component.value}</div>
                          <div className="text-xs text-gray-400">{component.percentage}</div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div className={`h-2 rounded-full ${
                          component.color === 'success' ? 'bg-green-600' :
                          component.color === 'warning' ? 'bg-yellow-600' :
                          'bg-blue-600'
                        }`} style={{width: '65%'}}></div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-4 border-t border-gray-600">
                    <div className="flex justify-between">
                      <span className="text-gray-300 font-medium">Total XVA Impact:</span>
                      <span className="text-xl font-bold text-white">{formatCurrency(run.xvaAdjustment)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quality Metrics */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">Quality Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {run.qualityMetrics.map((metric, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">{metric.name}</span>
                        <span className={metric.percentage >= 95 ? 'text-green-600' : metric.percentage >= 85 ? 'text-yellow-600' : 'text-red-600'}>
                          {metric.value}
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className={`h-2 rounded-full ${
                          metric.percentage >= 95 ? 'bg-green-600' : 
                          metric.percentage >= 85 ? 'bg-yellow-600' : 'bg-red-600'
                        }`} style={{width: `${metric.percentage}%`}}></div>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">{metric.description}</div>
                    </div>
                  ))}
                  
                  <div className="pt-4 border-t border-gray-600">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                      <span className="text-sm text-gray-300">All quality gates passed</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Audit Trail & Compliance */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-white">Audit Trail & Compliance</CardTitle>
                  <Button className="bg-green-600 hover:bg-green-700 text-black font-medium">
                    <Download className="w-4 h-4 mr-2" />
                    Export Audit Log
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-white font-medium mb-4">Processing Log</h4>
                    <div className="bg-gray-700 rounded-lg p-4 max-h-64 overflow-y-auto">
                      <div className="space-y-3 text-sm">
                        {run.auditLog.map((log, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <span className="text-gray-400 text-xs">{log.timestamp}</span>
                            <span className={`${
                              log.level === 'INFO' ? 'text-green-600' :
                              log.level === 'DEBUG' ? 'text-blue-600' :
                              'text-red-600'
                            }`}>[{log.level}]</span>
                            <span className="text-gray-300">{log.message}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-4">Compliance Checklist</h4>
                    <div className="space-y-3">
                      {run.complianceChecklist.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-green-600 bg-opacity-10 border border-green-600 rounded-lg">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          <div className="flex-1">
                            <div className="text-white font-medium">{item.name}</div>
                            <div className="text-xs text-gray-300">{item.description}</div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="mt-6 p-4 bg-green-600 bg-opacity-10 border border-green-600 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <ShieldCheck className="w-6 h-6 text-green-600" />
                          <div>
                            <div className="text-white font-semibold">Compliance Status: APPROVED</div>
                            <div className="text-sm text-gray-300">All regulatory requirements met</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cashflows">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">Cashflow Analysis</CardTitle>
                <CardDescription>Detailed cashflow breakdown and timeline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <LineChart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Cashflow analysis will be implemented here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="curves">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">Market Curves</CardTitle>
                <CardDescription>Interest rate curves and market data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Curve analysis will be implemented here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sensitivities">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">Risk Sensitivities</CardTitle>
                <CardDescription>Greeks and risk measures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-300">IR01 (1bp)</span>
                      <LineChart className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-xl font-bold text-white">{run.riskMetrics.ir01}</div>
                    <div className="text-xs text-gray-400">Interest rate delta</div>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-300">DV01</span>
                      <Activity className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-xl font-bold text-white">{run.riskMetrics.dv01}</div>
                    <div className="text-xs text-gray-400">Dollar duration</div>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-300">Gamma</span>
                      <TrendingUp className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div className="text-xl font-bold text-white">{run.riskMetrics.gamma}</div>
                    <div className="text-xs text-gray-400">Convexity measure</div>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-300">Vega</span>
                      <Mountain className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-xl font-bold text-white">{run.riskMetrics.vega}</div>
                    <div className="text-xs text-gray-400">Volatility sensitivity</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ifrs13">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">IFRS-13 Classification</CardTitle>
                <CardDescription>Fair value hierarchy and observable inputs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Scale className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">IFRS-13 analysis will be implemented here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="artifacts">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">Export Artifacts</CardTitle>
                <CardDescription>Generated reports and documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Download className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Export artifacts will be available here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Chat Agent Panel */}
      {isChatOpen && (
        <div className="fixed right-4 top-24 bottom-4 w-96 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-40 flex flex-col">
          <div className="p-4 border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-600 bg-opacity-20 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="text-white font-medium">Valuation Assistant</h3>
                <span className="text-xs text-green-600">Online</span>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsChatOpen(false)}
              className="text-gray-300 hover:text-white"
            >
              <XCircle className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {chatMessages.map((message) => (
              <div key={message.id} className={`flex items-start space-x-3 ${
                message.role === 'user' ? 'justify-end' : ''
              }`}>
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 bg-green-600 bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-green-600" />
                  </div>
                )}
                <div className={`flex-1 rounded-lg p-3 max-w-xs ${
                  message.role === 'user' 
                    ? 'bg-green-600 bg-opacity-20' 
                    : 'bg-gray-700'
                }`}>
                  <p className="text-sm text-white whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 bg-blue-600 bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-gray-700">
            <div className="flex flex-wrap gap-2 mb-3">
              <Button size="sm" variant="outline" className="text-xs">
                Get Status
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                +1bp Bump
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                FX +1%
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                Explain Run
              </Button>
            </div>
            
            <form onSubmit={handleChatSubmit} className="relative">
              <input
                type="text"
                placeholder="Ask about this specific run..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <Button 
                type="submit"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-opacity-80"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Chat Toggle Button */}
      {!isChatOpen && (
        <Button
          onClick={() => setIsChatOpen(true)}
          className="fixed right-4 bottom-4 bg-green-600 hover:bg-green-700 text-black font-medium rounded-full w-14 h-14 shadow-lg"
        >
          <Bot className="w-6 h-6" />
        </Button>
      )}
    </div>
  )
}