"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Play, 
  Download, 
  Eye, 
  Filter,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  MoreHorizontal,
  FileText,
  BarChart3,
  RefreshCw,
  Pause,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plus,
  ArrowLeftRight,
  Trash2,
  Redo,
  Bot,
  Minus,
  Send,
  ArrowRight,
  Info,
  AlertCircle,
  Timer,
  Upload,
  ExternalLink,
  Copy,
  Share,
  Edit,
  Save,
  X,
  Check,
  Loader2,
  Search,
  Calendar,
  User,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
  Shield,
  Database,
  Server,
  Cloud,
  Zap,
  Target,
  PieChart,
  LineChart,
  BarChart,
  Layers,
  Globe,
  Lock,
  Unlock,
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
  Office,
  School,
  Hospital,
  Bank,
  Church,
  Mosque,
  Temple,
  Castle,
  Tent,
  Car,
  Truck,
  Bus,
  Train,
  Plane,
  Ship,
  Bike,
  Scooter,
  Motorcycle,
  Taxi,
  Ambulance,
  Fire,
  Police,
  ShieldCheck
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
  approach: string
  status: "completed" | "running" | "queued" | "failed" | "review_required"
  ifrsLevel: "Level 1" | "Level 2" | "Level 3" | "Pending" | "N/A"
  pv: number | null
  notional: string
  createdBy: {
    name: string
    role: string
    avatar: string
  }
  duration: string
  timestamp: string
  progress?: number
  currency: string
  sensitivity?: {
    ir01: number
    dv01: number
    gamma: number
  }
  xva?: {
    cva: number
    dva: number
    fva: number
  }
}

export default function RunsPage() {
  const router = useRouter()
  const [selectedRuns, setSelectedRuns] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    dateRange: { from: "", to: "" },
    instrumentType: "All Types",
    runStatus: "All Statuses",
    ifrsLevel: "All Levels",
    currency: "All Currencies",
    approach: "All Approaches",
    createdBy: "All Users",
    notionalRange: { min: "", max: "" }
  })
  const [activeFilters, setActiveFilters] = useState<string[]>(["Last 7 days", "IRS Only"])
  const [density, setDensity] = useState<"compact" | "normal" | "comfortable">("normal")
  const [showChat, setShowChat] = useState(true)
  const [showNewRunDialog, setShowNewRunDialog] = useState(false)
  const [showExportDialog, setShowExportDialog] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedRunType, setSelectedRunType] = useState('')
  const [runConfig, setRunConfig] = useState({
    notional: '',
    currency: 'USD',
    tenor: '5Y',
    fixedRate: '',
    floatingIndex: 'SOFR'
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [chatMessages, setChatMessages] = useState<Array<{
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
  }>>([])
  const [chatInput, setChatInput] = useState("")

  const runs: ValuationRun[] = [
    {
      id: "VAL-2025-0118-001",
      instrument: {
        name: "USD IRS",
        type: "IRS",
        description: "Pay Fixed 3.50%",
        icon: "percentage"
      },
      asOfDate: "2025-01-18",
      approach: "DCF",
      status: "completed",
      ifrsLevel: "Level 2",
      pv: 127450.23,
      notional: "10M notional",
      currency: "USD",
      createdBy: {
        name: "Alex Johnson",
        role: "Senior Analyst",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
      },
      duration: "2.1 min",
      timestamp: "2 minutes ago",
      sensitivity: { ir01: 1250.45, dv01: 987.32, gamma: 45.67 },
      xva: { cva: 1250.45, dva: 987.32, fva: 234.56 }
    },
    {
      id: "VAL-2025-0118-002",
      instrument: {
        name: "USD/EUR CCS",
        type: "CCS",
        description: "SOFR vs €STR",
        icon: "exchange"
      },
      asOfDate: "2025-01-18",
      approach: "HW1F",
      status: "review_required",
      ifrsLevel: "Level 3",
      pv: -45782.91,
      notional: "10M USD notional",
      currency: "USD",
      createdBy: {
        name: "Sarah Chen",
        role: "VP Derivatives",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
      },
      duration: "3.1 min",
      timestamp: "12 minutes ago",
      sensitivity: { ir01: 2150.45, dv01: 1876.32, gamma: 78.67 },
      xva: { cva: 2150.45, dva: 1876.32, fva: 456.78 }
    },
    {
      id: "VAL-2025-0118-003",
      instrument: {
        name: "CHF IRS",
        type: "IRS",
        description: "Receive Fixed 1.25%",
        icon: "percentage"
      },
      asOfDate: "2025-01-18",
      approach: "DCF",
      status: "failed",
      ifrsLevel: "N/A",
      pv: null,
      notional: "5M CHF notional",
      currency: "CHF",
      createdBy: {
        name: "Mike Rodriguez",
        role: "Quantitative Analyst",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
      },
      duration: "Failed at 1.2 min",
      timestamp: "25 minutes ago"
    },
    {
      id: "VAL-2025-0118-004",
      instrument: {
        name: "GBP IRS",
        type: "IRS",
        description: "Pay Fixed 4.20%",
        icon: "percentage"
      },
      asOfDate: "2025-01-18",
      approach: "DCF",
      status: "running",
      ifrsLevel: "Pending",
      pv: null,
      notional: "15M GBP notional",
      currency: "GBP",
      createdBy: {
        name: "Emma Wilson",
        role: "Risk Manager",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg"
      },
      duration: "1.8 min",
      timestamp: "5 minutes ago",
      progress: 65
    },
    {
      id: "VAL-2025-0118-005",
      instrument: {
        name: "JPY/EUR CCS",
        type: "CCS",
        description: "TONA vs €STR",
        icon: "exchange"
      },
      asOfDate: "2025-01-18",
      approach: "HW1F",
      status: "queued",
      ifrsLevel: "Pending",
      pv: null,
      notional: "50M JPY notional",
      currency: "JPY",
      createdBy: {
        name: "David Kim",
        role: "Treasury Analyst",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg"
      },
      duration: "Queued",
      timestamp: "8 minutes ago"
    },
    {
      id: "VAL-2025-0118-006",
      instrument: {
        name: "EUR Cap",
        type: "Cap",
        description: "3M EURIBOR Cap 2.50%",
        icon: "shield"
      },
      asOfDate: "2025-01-18",
      approach: "Black-Scholes",
      status: "completed",
      ifrsLevel: "Level 2",
      pv: 45678.90,
      notional: "25M EUR notional",
      currency: "EUR",
      createdBy: {
        name: "Lisa Wang",
        role: "Derivatives Trader",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg"
      },
      duration: "4.2 min",
      timestamp: "1 hour ago",
      sensitivity: { ir01: 3456.78, dv01: 2345.67, gamma: 123.45 },
      xva: { cva: 3456.78, dva: 2345.67, fva: 567.89 }
    }
  ]

  const handleNewIRSRun = () => {
    setSelectedRunType('IRS')
    setShowNewRunDialog(true)
  }

  const handleNewCCSRun = () => {
    setSelectedRunType('CCS')
    setShowNewRunDialog(true)
  }

  const handleExportList = () => {
    setShowExportDialog(true)
  }

  const handleSelectAll = () => {
    if (selectedRuns.length === runs.length) {
      setSelectedRuns([])
    } else {
      setSelectedRuns(runs.map(run => run.id))
    }
  }

  const handleRestartSelected = () => {
    if (selectedRuns.length === 0) return
    setIsProcessing(true)
    console.log('Restarting selected runs:', selectedRuns)
    setTimeout(() => {
      setIsProcessing(false)
      setSelectedRuns([])
    }, 2000)
  }

  const handleCancelSelected = () => {
    if (selectedRuns.length === 0) return
    setIsProcessing(true)
    console.log('Canceling selected runs:', selectedRuns)
    setTimeout(() => {
      setIsProcessing(false)
      setSelectedRuns([])
    }, 1500)
  }

  const handleExportSelected = () => {
    if (selectedRuns.length === 0) return
    console.log('Exporting selected runs:', selectedRuns)
    setShowExportDialog(true)
  }

  const handleDeleteSelected = () => {
    if (selectedRuns.length === 0) return
    console.log('Deleting selected runs:', selectedRuns)
    setSelectedRuns([])
  }

  const handleStartRun = () => {
    setIsProcessing(true)
    console.log('Starting new run:', { type: selectedRunType, config: runConfig })
    setShowNewRunDialog(false)
    setRunConfig({ notional: '', currency: 'USD', tenor: '5Y', fixedRate: '', floatingIndex: 'SOFR' })
    setTimeout(() => {
      setIsProcessing(false)
    }, 3000)
  }

  const handleExport = (format: string) => {
    console.log('Exporting in format:', format)
    setShowExportDialog(false)
  }

  const handleRunSelect = (runId: string) => {
    setSelectedRuns(prev => 
      prev.includes(runId) 
        ? prev.filter(id => id !== runId)
        : [...prev, runId]
    )
  }

  const handleViewRun = (runId: string) => {
    router.push(`/runs/${runId}`)
  }

  const handleChatSubmit = () => {
    if (chatInput.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        role: 'user' as const,
        content: chatInput,
        timestamp: new Date()
      }
      setChatMessages(prev => [...prev, newMessage])
      setChatInput('')
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: (Date.now() + 1).toString(),
          role: 'assistant' as const,
          content: `I can help you analyze the selected runs. You have ${selectedRuns.length} runs selected. Would you like me to explain the valuation methodology or generate a sensitivity analysis?`,
          timestamp: new Date()
        }
        setChatMessages(prev => [...prev, aiResponse])
      }, 1000)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "running":
        return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
      case "queued":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "failed":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "review_required":
        return <AlertTriangle className="w-4 h-4 text-orange-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "bg-green-600 text-white",
      running: "bg-blue-600 text-white",
      queued: "bg-yellow-600 text-white",
      failed: "bg-red-600 text-white",
      review_required: "bg-orange-600 text-white"
    }
    return variants[status as keyof typeof variants] || "bg-gray-600 text-white"
  }

  const getIFRSBadge = (level: string) => {
    const variants = {
      "Level 1": "bg-green-600 text-white",
      "Level 2": "bg-blue-600 text-white",
      "Level 3": "bg-orange-600 text-white",
      "Pending": "bg-yellow-600 text-white",
      "N/A": "bg-gray-600 text-white"
    }
    return variants[level as keyof typeof variants] || "bg-gray-600 text-white"
  }

  const filteredRuns = runs.filter(run => {
    const matchesSearch = run.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         run.instrument.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         run.createdBy.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesInstrumentType = filters.instrumentType === "All Types" || run.instrument.type === filters.instrumentType
    const matchesStatus = filters.runStatus === "All Statuses" || run.status === filters.runStatus
    const matchesCurrency = filters.currency === "All Currencies" || run.currency === filters.currency
    
    return matchesSearch && matchesInstrumentType && matchesStatus && matchesCurrency
  })

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-2">Valuation Runs</h1>
            <p className="text-gray-300">Manage and monitor your valuation runs</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <Button 
                onClick={handleNewIRSRun}
                className="bg-green-600 hover:bg-green-700 text-black font-medium"
              >
                <Plus className="w-4 h-4 mr-2" />
                New IRS Run
              </Button>
              <Button 
                onClick={handleNewCCSRun}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                <ArrowLeftRight className="w-4 h-4 mr-2" />
                New CCS Run
              </Button>
              <Button 
                onClick={handleExportList}
                className="bg-gray-700 hover:bg-gray-600 text-white font-medium"
              >
                <Download className="w-4 h-4 mr-2" />
                Export List
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 px-8 py-6">
          {/* Search and Filters */}
          <div className="mb-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search runs by ID, instrument, or creator..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
              </div>
              <Button 
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <Card className="bg-gray-800 border-gray-700 mb-4">
                <CardHeader>
                  <CardTitle className="text-white">Advanced Filters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-gray-300">Instrument Type</Label>
                      <Select value={filters.instrumentType} onValueChange={(value) => setFilters({...filters, instrumentType: value})}>
                        <SelectTrigger className="bg-gray-700 border-gray-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All Types">All Types</SelectItem>
                          <SelectItem value="IRS">IRS</SelectItem>
                          <SelectItem value="CCS">CCS</SelectItem>
                          <SelectItem value="Cap">Cap</SelectItem>
                          <SelectItem value="Swaption">Swaption</SelectItem>
                          <SelectItem value="FRA">FRA</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-gray-300">Status</Label>
                      <Select value={filters.runStatus} onValueChange={(value) => setFilters({...filters, runStatus: value})}>
                        <SelectTrigger className="bg-gray-700 border-gray-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All Statuses">All Statuses</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="running">Running</SelectItem>
                          <SelectItem value="queued">Queued</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                          <SelectItem value="review_required">Review Required</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-gray-300">Currency</Label>
                      <Select value={filters.currency} onValueChange={(value) => setFilters({...filters, currency: value})}>
                        <SelectTrigger className="bg-gray-700 border-gray-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All Currencies">All Currencies</SelectItem>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                          <SelectItem value="CHF">CHF</SelectItem>
                          <SelectItem value="JPY">JPY</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-sm text-gray-300">Active filters:</span>
                {activeFilters.map((filter, index) => (
                  <Badge key={index} variant="secondary" className="bg-gray-700 text-gray-300">
                    {filter}
                    <button 
                      onClick={() => setActiveFilters(prev => prev.filter((_, i) => i !== index))}
                      className="ml-2 hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Bulk Operations */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedRuns.length === runs.length}
                  onCheckedChange={handleSelectAll}
                  className="border-gray-600"
                />
                <span className="text-sm text-gray-300">
                  Select All ({runs.length})
                </span>
              </div>
              
              {selectedRuns.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-300">
                    {selectedRuns.length} selected
                  </span>
                  <Button 
                    onClick={handleRestartSelected}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={isProcessing}
                  >
                    {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                    Restart Selected
                  </Button>
                  <Button 
                    onClick={handleCancelSelected}
                    size="sm"
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                    disabled={isProcessing}
                  >
                    {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Pause className="w-4 h-4" />}
                    Cancel Selected
                  </Button>
                  <Button 
                    onClick={handleExportSelected}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Download className="w-4 h-4" />
                    Export Selected
                  </Button>
                  <Button 
                    onClick={handleDeleteSelected}
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Selected
                  </Button>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-300">Density:</span>
                <Select value={density} onValueChange={(value: "compact" | "normal" | "comfortable") => setDensity(value)}>
                  <SelectTrigger className="w-32 bg-gray-700 border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="comfortable">Comfortable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Runs Table */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Instrument</TableHead>
                    <TableHead>As-of Date</TableHead>
                    <TableHead>Approach</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>IFRS Level</TableHead>
                    <TableHead>Present Value</TableHead>
                    <TableHead>Notional</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRuns.map((run) => (
                    <TableRow key={run.id} className="border-gray-700 hover:bg-gray-700/50">
                      <TableCell>
                        <Checkbox
                          checked={selectedRuns.includes(run.id)}
                          onCheckedChange={() => handleRunSelect(run.id)}
                          className="border-gray-600"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                            <BarChart3 className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-white font-medium">{run.instrument.name}</div>
                            <div className="text-sm text-gray-400">{run.instrument.description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">{run.asOfDate}</TableCell>
                      <TableCell className="text-gray-300">{run.approach}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(run.status)}
                          <Badge className={getStatusBadge(run.status)}>
                            {run.status.replace('_', ' ')}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getIFRSBadge(run.ifrsLevel)}>
                          {run.ifrsLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {run.pv !== null ? (
                          <span className="text-white font-medium">
                            ${run.pv.toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-gray-300">{run.notional}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <img 
                            src={run.createdBy.avatar} 
                            alt={run.createdBy.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <div>
                            <div className="text-white text-sm">{run.createdBy.name}</div>
                            <div className="text-gray-400 text-xs">{run.createdBy.role}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">{run.duration}</TableCell>
                      <TableCell className="text-gray-300">{run.timestamp}</TableCell>
                      <TableCell>
                        <Button 
                          onClick={() => handleViewRun(run.id)}
                          size="sm"
                          variant="ghost"
                          className="text-gray-400 hover:text-white"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-400">
              Showing {filteredRuns.length} of {runs.length} runs
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* AI Chat Panel */}
        {showChat && (
          <div className="w-80 bg-gray-800 border-l border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">AI Assistant</h3>
              <Button 
                onClick={() => setShowChat(false)}
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="h-96 bg-gray-700 rounded-lg p-4 overflow-y-auto mb-4">
              {chatMessages.length === 0 ? (
                <div className="text-center text-gray-400">
                  <Bot className="w-8 h-8 mx-auto mb-2" />
                  <p>Ask me about your runs, valuations, or IFRS-13 compliance.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {chatMessages.map((message) => (
                    <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs p-3 rounded-lg ${
                        message.role === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-600 text-gray-200'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex space-x-2">
              <Input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about your runs..."
                className="bg-gray-700 border-gray-600 text-white"
                onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
              />
              <Button 
                onClick={handleChatSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* New Run Dialog */}
      <Dialog open={showNewRunDialog} onOpenChange={setShowNewRunDialog}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Create New {selectedRunType} Run</DialogTitle>
            <DialogDescription>
              Configure the parameters for your new valuation run.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="notional" className="text-gray-300">Notional Amount</Label>
                <Input
                  id="notional"
                  value={runConfig.notional}
                  onChange={(e) => setRunConfig({...runConfig, notional: e.target.value})}
                  placeholder="10,000,000"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="currency" className="text-gray-300">Currency</Label>
                <Select value={runConfig.currency} onValueChange={(value) => setRunConfig({...runConfig, currency: value})}>
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="CHF">CHF</SelectItem>
                    <SelectItem value="JPY">JPY</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tenor" className="text-gray-300">Tenor</Label>
                <Select value={runConfig.tenor} onValueChange={(value) => setRunConfig({...runConfig, tenor: value})}>
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1Y">1 Year</SelectItem>
                    <SelectItem value="2Y">2 Years</SelectItem>
                    <SelectItem value="5Y">5 Years</SelectItem>
                    <SelectItem value="10Y">10 Years</SelectItem>
                    <SelectItem value="30Y">30 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="fixedRate" className="text-gray-300">Fixed Rate (%)</Label>
                <Input
                  id="fixedRate"
                  value={runConfig.fixedRate}
                  onChange={(e) => setRunConfig({...runConfig, fixedRate: e.target.value})}
                  placeholder="3.50"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="floatingIndex" className="text-gray-300">Floating Index</Label>
              <Select value={runConfig.floatingIndex} onValueChange={(value) => setRunConfig({...runConfig, floatingIndex: value})}>
                <SelectTrigger className="bg-gray-700 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SOFR">SOFR</SelectItem>
                  <SelectItem value="LIBOR">LIBOR</SelectItem>
                  <SelectItem value="EURIBOR">EURIBOR</SelectItem>
                  <SelectItem value="TONA">TONA</SelectItem>
                  <SelectItem value="€STR">€STR</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button 
                onClick={() => setShowNewRunDialog(false)}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleStartRun}
                className="bg-green-600 hover:bg-green-700 text-black"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Starting...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start Run
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Export Runs</DialogTitle>
            <DialogDescription>
              Choose the format and options for your export.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-gray-300">Export Format</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <Button 
                  onClick={() => handleExport('excel')}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Excel (.xlsx)
                </Button>
                <Button 
                  onClick={() => handleExport('csv')}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  CSV (.csv)
                </Button>
              </div>
            </div>
            <div>
              <Label className="text-gray-300">Include</Label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox defaultChecked className="border-gray-600" />
                  <span className="text-sm text-gray-300">Run details</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox defaultChecked className="border-gray-600" />
                  <span className="text-sm text-gray-300">Present values</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox className="border-gray-600" />
                  <span className="text-sm text-gray-300">Sensitivities</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox className="border-gray-600" />
                  <span className="text-sm text-gray-300">Cashflows</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button 
                onClick={() => setShowExportDialog(false)}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}