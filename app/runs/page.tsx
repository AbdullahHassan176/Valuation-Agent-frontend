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
}

export default function RunsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedRuns, setSelectedRuns] = useState<string[]>([])
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  // Mock data - replace with actual API calls
  const runs: ValuationRun[] = [
    {
      id: "run-001",
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
      marketDataProfile: "synthetic"
    },
    {
      id: "run-002",
      instrument: {
        name: "EUR/USD CCS",
        type: "CCS",
        description: "Cross Currency Swap EUR/USD",
        icon: "🌍"
      },
      asOfDate: "2024-01-15",
      status: "running",
      pv: 0,
      currency: "USD",
      createdBy: "jane.smith@company.com",
      createdAt: "2024-01-15T10:15:00Z",
      approach: ["OIS_discounting_with_FX"],
      marketDataProfile: "synthetic"
    },
    {
      id: "run-003",
      instrument: {
        name: "GBP 3Y IRS",
        type: "IRS",
        description: "3-year GBP Interest Rate Swap",
        icon: "💷"
      },
      asOfDate: "2024-01-15",
      status: "failed",
      pv: 0,
      currency: "GBP",
      createdBy: "mike.wilson@company.com",
      createdAt: "2024-01-15T11:00:00Z",
      errorMessage: "Invalid market data for GBP",
      approach: ["OIS_discounting"],
      marketDataProfile: "synthetic"
    }
  ]

  const filteredRuns = runs.filter(run => {
    const matchesSearch = run.instrument.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         run.instrument.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || run.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleSelectRun = (runId: string) => {
    setSelectedRuns(prev => 
      prev.includes(runId) 
        ? prev.filter(id => id !== runId)
        : [...prev, runId]
    )
  }

  const handleSelectAll = () => {
    setSelectedRuns(
      selectedRuns.length === filteredRuns.length 
        ? [] 
        : filteredRuns.map(run => run.id)
    )
  }

  const handleCreateRun = () => {
    setShowCreateDialog(true)
  }

  const handleViewRun = (runId: string) => {
    router.push(`/runs/run-detail?id=${runId}`)
  }

  const handleDownloadRun = (runId: string) => {
    console.log("Downloading run:", runId)
  }

  const handleDeleteRuns = () => {
    console.log("Deleting runs:", selectedRuns)
    setSelectedRuns([])
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "running":
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "queued":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
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

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header - Mobile Optimized */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Valuation Runs</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Manage and monitor your valuation calculations
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <Button
            onClick={handleCreateRun}
            className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Run
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Filters and Search - Mobile Stack */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="flex-1">
              <Label htmlFor="search" className="text-sm">Search</Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search runs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Label htmlFor="status" className="text-sm">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="running">Running</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="queued">Queued</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions Bar - Mobile Optimized */}
      {selectedRuns.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <span className="text-sm text-gray-600">
                {selectedRuns.length} run(s) selected
              </span>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm" onClick={handleDeleteRuns} className="w-full sm:w-auto">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Runs List - Mobile Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Valuation Runs ({filteredRuns.length})</h2>
        </div>
        
        {/* Mobile Card View */}
        <div className="block sm:hidden space-y-3">
          {filteredRuns.map((run) => (
            <Card key={run.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={selectedRuns.includes(run.id)}
                      onCheckedChange={() => handleSelectRun(run.id)}
                    />
                    <span className="text-2xl">{run.instrument.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">{run.instrument.name}</h3>
                      <p className="text-xs text-gray-500 truncate">{run.instrument.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(run.status)}
                    {getStatusBadge(run.status)}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">As Of:</span>
                    <span>{run.asOfDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">PV:</span>
                    <span className="font-mono">
                      {run.status === "completed" ? `${run.pv.toLocaleString()} ${run.currency}` : "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Created:</span>
                    <span className="text-xs">{new Date(run.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                  <span className="text-xs text-gray-500">{run.createdBy}</span>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewRun(run.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {run.status === "completed" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadRun(run.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedRuns.length === filteredRuns.length && filteredRuns.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Instrument</TableHead>
                      <TableHead>As Of Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Present Value</TableHead>
                      <TableHead>Created By</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead className="w-12">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRuns.map((run) => (
                      <TableRow key={run.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedRuns.includes(run.id)}
                            onCheckedChange={() => handleSelectRun(run.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{run.instrument.icon}</span>
                            <div>
                              <div className="font-medium">{run.instrument.name}</div>
                              <div className="text-sm text-gray-500">{run.instrument.description}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{run.asOfDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(run.status)}
                            {getStatusBadge(run.status)}
                          </div>
                        </TableCell>
                        <TableCell>
                          {run.status === "completed" ? (
                            <span className="font-mono">
                              {run.pv.toLocaleString()} {run.currency}
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>{run.createdBy}</TableCell>
                        <TableCell>
                          {new Date(run.createdAt).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewRun(run.id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {run.status === "completed" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDownloadRun(run.id)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Create Run Dialog - Mobile Optimized */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-2xl mx-4">
          <DialogHeader>
            <DialogTitle>Create New Valuation Run</DialogTitle>
            <DialogDescription>
              Configure and start a new valuation calculation
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="instrument">Instrument Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select instrument" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="irs">Interest Rate Swap (IRS)</SelectItem>
                    <SelectItem value="ccs">Cross Currency Swap (CCS)</SelectItem>
                    <SelectItem value="cap">Interest Rate Cap</SelectItem>
                    <SelectItem value="swaption">Swaption</SelectItem>
                    <SelectItem value="fra">Forward Rate Agreement (FRA)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="asOfDate">As Of Date</Label>
                <Input
                  id="asOfDate"
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="marketData">Market Data Profile</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select market data" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="synthetic">Synthetic</SelectItem>
                  <SelectItem value="ecb">ECB</SelectItem>
                  <SelectItem value="fred">FRED</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="computeXva" />
              <Label htmlFor="computeXva">Compute XVA (CVA, DVA, FVA)</Label>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" onClick={() => setShowCreateDialog(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={() => setShowCreateDialog(false)} className="flex-1">
                Create Run
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
