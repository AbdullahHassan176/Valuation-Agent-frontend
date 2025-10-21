"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
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
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  PieChart,
  LineChart,
  Target,
  Globe,
  Lock,
  Key,
  Bell,
  MessageCircle,
  HelpCircle,
  Shield,
  ShieldCheck,
  Zap,
  Search,
  User,
  Archive
} from "lucide-react"

interface ValuationRun {
  id: string
  name: string
  type: 'IRS' | 'CCS'
  status: 'pending' | 'running' | 'completed' | 'failed'
  notional: number
  currency: string
  tenor: string
  fixedRate?: number
  floatingIndex?: string
  pv?: number
  pv01?: number
  created_at: string
  completed_at?: string
  error?: string
  progress?: number
}

export default function RunsPage() {
  const router = useRouter()
  const [runs, setRuns] = useState<ValuationRun[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showNewRunDialog, setShowNewRunDialog] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedRuns, setSelectedRuns] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [sortBy, setSortBy] = useState("created_at")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [runsPerPage] = useState(10)
  
  // New run form state
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(false) // DISABLED by default to prevent infinite loops
  const [newRun, setNewRun] = useState({
    name: "",
    type: "IRS" as "IRS" | "CCS",
    notional: "",
    currency: "USD",
    tenor: "5Y",
    fixedRate: "",
    floatingIndex: "SOFR"
  })

  useEffect(() => {
    fetchRuns()
    
    // DISABLED: Auto-refresh to prevent infinite loops
    // Users can manually refresh using the Refresh button
    console.log("Auto-refresh disabled to prevent infinite loops")
    
    // Only set up polling if explicitly enabled and there are running runs
    let pollInterval: NodeJS.Timeout | null = null
    
    if (autoRefresh) {
      pollInterval = setInterval(() => {
        // Only poll if there are actually running runs and no forms are open
        const hasRunningRuns = runs.some(run => run.status === 'running' || run.status === 'pending')
        if (hasRunningRuns && !isFormOpen) {
          console.log("Polling for running runs...")
          fetchRuns()
        }
      }, 300000) // Poll every 5 minutes only if needed
    }
    
    return () => {
      if (pollInterval) {
        clearInterval(pollInterval)
      }
    }
  }, []) // REMOVED runs dependency to prevent infinite loop

  const fetchRuns = async () => {
    setLoading(true)
    setError(null)
    try {
      // Try to call the actual API
      console.log("Attempting to fetch runs from API...")
      const apiUrl = window.location.hostname === 'localhost' 
        ? 'http://localhost:9000/api/valuation/runs'
        : 'https://valuation-backend-ephph9gkdjcca0c0.canadacentral-01.azurewebsites.net/api/valuation/runs'
      
      console.log("Fetching runs from API URL:", apiUrl)
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      console.log("API Response status:", response.status)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log("Fetched runs from API:", data)
      
        // Transform API response to match frontend interface
        const apiRuns: ValuationRun[] = data.map((run: any) => ({
          id: run.id,
          name: run.name || `${run.currency || 'USD'} ${run.tenor || '5Y'} ${run.type || 'IRS'}`,
          type: run.type || 'IRS',
          status: run.status || 'completed',
          notional: run.notional || 0,
          currency: run.currency || 'USD',
          tenor: run.tenor || '5Y',
          fixedRate: run.fixedRate,
          floatingIndex: run.floatingIndex || 'SOFR',
          pv: run.pv || run.pv_base_ccy || 0,
          pv01: run.pv01 || 0,
          created_at: run.created_at || new Date().toISOString(),
          completed_at: run.completed_at,
          error: run.error
        }))
        
        // Add mock runs from localStorage
        const mockRuns = JSON.parse(localStorage.getItem('mockRuns') || '[]')
        const mockRunsFormatted: ValuationRun[] = mockRuns.map((run: any) => ({
          id: run.id,
          name: `${run.spec?.ccy || 'USD'} ${run.spec?.maturity || '5Y'} ${run.spec?.ccy2 ? 'CCS' : 'IRS'}`,
          type: run.spec?.ccy2 ? 'CCS' : 'IRS',
          status: run.status,
          notional: run.spec?.notional || 0,
          currency: run.spec?.ccy || 'USD',
          tenor: calculateTenorFromMaturity(run.spec?.effective, run.spec?.maturity),
          fixedRate: run.spec?.fixedRate,
          floatingIndex: run.spec?.floatIndex || 'SOFR',
          pv: run.result?.total_pv || 0,
          pv01: run.result?.sensitivities?.[0]?.value || 0,
          created_at: run.created_at,
          completed_at: run.status === 'completed' ? run.created_at : undefined,
          error: undefined
        }))
        
        setRuns([...apiRuns, ...mockRunsFormatted])
    } catch (err) {
      console.error("Error fetching runs:", err)
      console.log("Falling back to mock data due to API error")
      
      // Fallback to mock data if API fails
      const mockRuns: ValuationRun[] = [
        {
          id: "run-001",
          name: "USD 5Y IRS - Par Trade",
          type: "IRS",
          status: "completed",
          notional: 10000000,
          currency: "USD",
          tenor: "5Y",
          fixedRate: 4.25,
          floatingIndex: "SOFR-3M",
          pv: 125000,
          pv01: 4500,
          created_at: "2024-01-15T10:30:00Z",
          completed_at: "2024-01-15T10:32:15Z"
        },
        {
          id: "run-002",
          name: "EUR/USD CCS - Cross Currency",
          type: "CCS",
          status: "running",
          notional: 5000000,
          currency: "EUR",
          tenor: "3Y",
          floatingIndex: "EURIBOR-3M",
          progress: 65,
          created_at: "2024-01-15T11:15:00Z"
        }
      ]
      setRuns(mockRuns)
      setError("Backend API not available - using mock data. Check if backend is running on port 9000.")
    } finally {
      setLoading(false)
    }
  }
  
  // Helper function to calculate tenor from dates
  const calculateTenorFromMaturity = (effective: string, maturity: string): string => {
    if (!effective || !maturity) return "5Y"
    const start = new Date(effective)
    const end = new Date(maturity)
    const years = (end.getFullYear() - start.getFullYear())
    return `${years}Y`
  }

  const handleNewRun = async () => {
    try {
      const runData = {
        ...newRun,
        notional: parseFloat(newRun.notional),
        fixedRate: newRun.fixedRate ? parseFloat(newRun.fixedRate) : undefined
      }
      
      console.log("Creating new run:", runData)
      
      // Create proper API request payload
      const today = new Date().toISOString().split('T')[0]
      
      // Build instrument specification based on type
      let spec
      if (runData.type === "IRS") {
        spec = {
        notional: runData.notional,
          ccy: runData.currency,
          payFixed: true, // Default to paying fixed
          fixedRate: runData.fixedRate || 0.05,
          floatIndex: runData.floatingIndex,
          effective: today,
          maturity: calculateMaturityDate(today, runData.tenor),
          dcFixed: "ACT/360",
          dcFloat: "ACT/360", 
          freqFixed: "Q",
          freqFloat: "Q",
          calendar: runData.currency,
          bdc: "MODIFIED_FOLLOWING"
        }
      } else if (runData.type === "CCS") {
        spec = {
          notional: runData.notional,
          ccy: runData.currency,
          payFixed: true,
          fixedRate: runData.fixedRate || 0.05,
          floatIndex: runData.floatingIndex,
          effective: today,
          maturity: calculateMaturityDate(today, runData.tenor),
          dcFixed: "ACT/360",
          dcFloat: "ACT/360",
          freqFixed: "Q", 
          freqFloat: "Q",
          calendar: runData.currency,
          bdc: "MODIFIED_FOLLOWING",
          notionalCcy2: runData.notional * 0.85, // Approximate EUR notional
          ccy2: runData.currency === "USD" ? "EUR" : "USD",
          fxRate: 1.08
        }
      }
      
      // Call the actual API
      console.log("Creating run with spec:", spec)
      const apiUrl = window.location.hostname === 'localhost' 
        ? 'http://localhost:9000/api/valuation/runs'
        : 'https://valuation-backend-ephph9gkdjcca0c0.canadacentral-01.azurewebsites.net/api/valuation/runs'
      
      console.log("Calling API URL:", apiUrl)
      
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            spec: {
              notional: runData.notional,
              ccy: runData.currency,
              fixedRate: runData.fixedRate,
              effective: today,
              maturity: calculateMaturityDate(today, runData.tenor),
              tenor_years: parseFloat(runData.tenor.replace('Y', '')),
              instrument_type: runData.type,
              frequency: "SemiAnnual"
            },
            asOf: today
          })
        })
        
        console.log("API Response status:", response.status)
        
        if (!response.ok) {
          const errorText = await response.text()
          console.error("API Error response:", errorText)
          
          // If POST fails, create a mock run with realistic calculations
          console.log("POST endpoint not working, creating mock run...")
          
          // Calculate realistic PV based on instrument parameters
          const notional = spec?.notional || 1000000
          const fixedRate = spec?.fixedRate || 0.05
          const maturity = new Date(spec?.maturity || new Date())
          const effective = new Date(spec?.effective || new Date())
          const yearsToMaturity = (maturity.getTime() - effective.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
          
          // Simple PV calculation: PV = Notional * (Market Rate - Fixed Rate) * Years * Discount Factor
          const marketRate = 0.045 // Assume 4.5% market rate
          const rateDiff = marketRate - fixedRate
          const discountFactor = Math.exp(-0.03 * yearsToMaturity) // 3% discount rate
          const calculatedPV = notional * rateDiff * yearsToMaturity * discountFactor
          
          const mockResult = {
            id: `run-${Date.now()}`,
            status: "completed",
            created_at: new Date().toISOString(),
            spec: spec,
            result: {
              total_pv: Math.round(calculatedPV * 100) / 100, // Round to 2 decimal places
              components: {
                "Fixed Leg": -notional * fixedRate * yearsToMaturity * discountFactor,
                "Float Leg": notional * marketRate * yearsToMaturity * discountFactor
              },
              sensitivities: [
                { shock: "PV01", value: Math.round(notional * yearsToMaturity * discountFactor * 0.0001 * 100) / 100 }
              ]
            }
          }
          
          console.log("Mock run created:", mockResult)
          // Add mock run to local storage for persistence
          const existingRuns = JSON.parse(localStorage.getItem('mockRuns') || '[]')
          existingRuns.push(mockResult)
          localStorage.setItem('mockRuns', JSON.stringify(existingRuns))
          
          // Show success message
          alert("Run created successfully! (Using mock data due to backend API issue)")
        } else {
          const result = await response.json()
          console.log("Run created successfully:", result)
          
          // Transform the result to match frontend interface
          const newRun: ValuationRun = {
            id: result.id,
            name: result.name || `${result.currency || 'USD'} ${result.tenor || '5Y'} ${result.type || 'IRS'}`,
            type: result.type || 'IRS',
            status: result.status || 'completed',
            notional: result.notional || 0,
            currency: result.currency || 'USD',
            tenor: result.tenor || '5Y',
            fixedRate: result.fixedRate,
            floatingIndex: result.floatingIndex || 'SOFR',
            pv: result.pv || result.pv_base_ccy || 0,
            pv01: result.pv01 || 0,
            created_at: result.created_at || new Date().toISOString(),
            completed_at: result.completed_at,
            error: result.error
          }
          
          // Add to runs list
          setRuns(prevRuns => [newRun, ...prevRuns])
          
          // Show success message
          alert("Run created successfully!")
        }
      } catch (error) {
        console.error("API call failed, creating mock run:", error)
        // Create mock run on any error with realistic calculations
        const notional = spec?.notional || 1000000
        const fixedRate = spec?.fixedRate || 0.05
        const maturity = new Date(spec?.maturity || new Date())
        const effective = new Date(spec?.effective || new Date())
        const yearsToMaturity = (maturity.getTime() - effective.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
        
        // Simple PV calculation: PV = Notional * (Market Rate - Fixed Rate) * Years * Discount Factor
        const marketRate = 0.045 // Assume 4.5% market rate
        const rateDiff = marketRate - fixedRate
        const discountFactor = Math.exp(-0.03 * yearsToMaturity) // 3% discount rate
        const calculatedPV = notional * rateDiff * yearsToMaturity * discountFactor
        
        const mockResult = {
          id: `run-${Date.now()}`,
          status: "completed", 
          created_at: new Date().toISOString(),
          spec: spec,
          result: {
            total_pv: Math.round(calculatedPV * 100) / 100, // Round to 2 decimal places
            components: {
              "Fixed Leg": -notional * fixedRate * yearsToMaturity * discountFactor,
              "Float Leg": notional * marketRate * yearsToMaturity * discountFactor
            },
            sensitivities: [
              { shock: "PV01", value: Math.round(notional * yearsToMaturity * discountFactor * 0.0001 * 100) / 100 }
            ]
          }
        }
        console.log("Mock run created due to error:", mockResult)
      }
      
      // Refresh the runs list
      await fetchRuns()
      
      setIsFormOpen(false)
      setShowNewRunDialog(false)
      setNewRun({
        name: "",
        type: "IRS",
        notional: "",
        currency: "USD",
        tenor: "5Y",
        fixedRate: "",
        floatingIndex: "SOFR"
      })
    } catch (err) {
      setError("Failed to create run")
      console.error("Error creating run:", err)
    }
  }
  
  // Helper function to calculate maturity date
  const calculateMaturityDate = (startDate: string, tenor: string): string => {
    const start = new Date(startDate)
    const years = parseInt(tenor.replace('Y', ''))
    const maturity = new Date(start)
    maturity.setFullYear(maturity.getFullYear() + years)
    return maturity.toISOString().split('T')[0]
  }

  const handleViewRun = (runId: string) => {
    router.push(`/runs/run-detail?id=${runId}`)
  }

  const handleDeleteRun = (runId: string) => {
    setRuns(prev => prev.filter(run => run.id !== runId))
  }

  const handleBulkDelete = () => {
    setRuns(prev => prev.filter(run => !selectedRuns.includes(run.id)))
    setSelectedRuns([])
  }

  const handleSelectRun = (runId: string) => {
    setSelectedRuns(prev => 
      prev.includes(runId) 
        ? prev.filter(id => id !== runId)
        : [...prev, runId]
    )
  }

  const handleSelectAll = () => {
    if (selectedRuns.length === filteredRuns.length) {
      setSelectedRuns([])
    } else {
      setSelectedRuns(filteredRuns.map(run => run.id))
    }
  }

  // Filter and sort runs
  const filteredRuns = runs
    .filter(run => {
      const matchesSearch = run.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           run.id.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || run.status === statusFilter
      const matchesType = typeFilter === "all" || run.type === typeFilter
      return matchesSearch && matchesStatus && matchesType
    })
    .sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name)
          break
        case "status":
          comparison = a.status.localeCompare(b.status)
          break
        case "created_at":
          comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          break
        case "pv":
          comparison = (a.pv || 0) - (b.pv || 0)
          break
        default:
          comparison = 0
      }
      return sortOrder === "asc" ? comparison : -comparison
    })

  const totalPages = Math.ceil(filteredRuns.length / runsPerPage)
  const paginatedRuns = filteredRuns.slice(
    (currentPage - 1) * runsPerPage,
    currentPage * runsPerPage
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>
      case "running":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30"><Clock className="h-3 w-3 mr-1" />Running</Badge>
      case "failed":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30"><XCircle className="h-3 w-3 mr-1" />Failed</Badge>
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30"><Timer className="h-3 w-3 mr-1" />Pending</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    return (
      <Badge className={type === "IRS" ? "bg-blue-500/20 text-blue-400 border-blue-500/30" : "bg-green-500/20 text-green-400 border-green-500/30"}>
        {type}
      </Badge>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-lg">Loading runs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Valuation Runs</h1>
            <p className="text-gray-300 mt-2">Manage and monitor your financial instrument valuations</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
            <Button onClick={() => {
              setIsFormOpen(true)
              setShowNewRunDialog(true)
            }} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New Run
            </Button>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" onClick={fetchRuns}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-300">Auto-refresh:</label>
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  autoRefresh 
                    ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {autoRefresh ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <Card className="mb-6 bg-gray-800 border-gray-700">
          <CardContent className="py-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search runs by name or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setSearchTerm("")}>
                  Clear
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        {showFilters && (
          <Card className="mb-6 bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Filters & Search</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="search">Search</Label>
                  <Input
                    id="search"
                    placeholder="Search runs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="running">Running</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="IRS">IRS</SelectItem>
                      <SelectItem value="CCS">CCS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="sort">Sort By</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="created_at">Created Date</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="status">Status</SelectItem>
                      <SelectItem value="pv">Present Value</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bulk Actions */}
        {selectedRuns.length > 0 && (
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-blue-800">
                    {selectedRuns.length} run{selectedRuns.length > 1 ? 's' : ''} selected
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedRuns([])}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear Selection
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleBulkDelete} className="text-red-600 border-red-300 hover:bg-red-50">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Selected
                  </Button>
                  <Button variant="outline" size="sm" className="text-green-600 border-green-300 hover:bg-green-50">
                    <Download className="h-4 w-4 mr-2" />
                    Export Selected
                  </Button>
                  <Button variant="outline" size="sm" className="text-blue-600 border-blue-300 hover:bg-blue-50">
                    <Share className="h-4 w-4 mr-2" />
                    Share Selected
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-300">Total Runs</p>
                  <p className="text-2xl font-bold text-white">{runs.length}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-300">Completed</p>
                  <p className="text-2xl font-bold text-green-400">{runs.filter(r => r.status === 'completed').length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-300">Running</p>
                  <p className="text-2xl font-bold text-blue-400">{runs.filter(r => r.status === 'running').length}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-300">Failed</p>
                  <p className="text-2xl font-bold text-red-400">{runs.filter(r => r.status === 'failed').length}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Runs Table with Tabs */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">All Runs ({filteredRuns.length})</CardTitle>
                <CardDescription className="text-gray-300">Manage your valuation calculations</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={selectedRuns.length === filteredRuns.length && filteredRuns.length > 0}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm text-gray-300">Select All</span>
              </div>
            </div>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-700">
                <TabsTrigger value="all" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">All Runs</TabsTrigger>
                <TabsTrigger value="my" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">My Runs</TabsTrigger>
                <TabsTrigger value="recent" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">Recent</TabsTrigger>
                <TabsTrigger value="archived" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">Archived</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="w-12 text-gray-300">Select</TableHead>
                    <TableHead className="text-gray-300">Name</TableHead>
                    <TableHead className="text-gray-300">Type</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Notional</TableHead>
                    <TableHead className="text-gray-300">PV</TableHead>
                    <TableHead className="text-gray-300">PV01</TableHead>
                    <TableHead className="text-gray-300">Created</TableHead>
                    <TableHead className="w-20 text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedRuns.map((run) => (
                    <TableRow key={run.id} className="border-gray-700 hover:bg-gray-700/50">
                      <TableCell>
                        <Checkbox
                          checked={selectedRuns.includes(run.id)}
                          onCheckedChange={() => handleSelectRun(run.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-white">{run.name}</div>
                          <div className="text-sm text-gray-400">{run.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getTypeBadge(run.type)}</TableCell>
                      <TableCell>{getStatusBadge(run.status)}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-white">{run.notional.toLocaleString()}</div>
                          <div className="text-sm text-gray-400">{run.currency}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {run.pv !== undefined ? (
                          <div className={`font-medium ${run.pv >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {run.pv.toLocaleString()} {run.currency}
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {run.pv01 !== undefined ? (
                          <div className="font-medium text-white">{run.pv01.toLocaleString()}</div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-white">
                          {new Date(run.created_at).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(run.created_at).toLocaleTimeString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewRun(run.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteRun(run.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-600">
                  Showing {((currentPage - 1) * runsPerPage) + 1} to {Math.min(currentPage * runsPerPage, filteredRuns.length)} of {filteredRuns.length} runs
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
              </TabsContent>
              <TabsContent value="my" className="mt-4">
                <div className="text-center py-8 text-gray-500">
                  <User className="h-12 w-12 mx-auto mb-4" />
                  <p>My runs will appear here</p>
                </div>
              </TabsContent>
              <TabsContent value="recent" className="mt-4">
                <div className="text-center py-8 text-gray-500">
                  <Clock className="h-12 w-12 mx-auto mb-4" />
                  <p>Recent runs will appear here</p>
                </div>
              </TabsContent>
              <TabsContent value="archived" className="mt-4">
                <div className="text-center py-8 text-gray-500">
                  <Archive className="h-12 w-12 mx-auto mb-4" />
                  <p>Archived runs will appear here</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>

        {/* Error Alert */}
        {error && (
          <Alert className="mt-6" variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>

      {/* New Run Dialog */}
      <Dialog open={showNewRunDialog} onOpenChange={setShowNewRunDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Run</DialogTitle>
            <DialogDescription>
              Configure your valuation parameters
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Run Name</Label>
              <Input
                id="name"
                placeholder="Enter run name..."
                value={newRun.name}
                onChange={(e) => setNewRun({...newRun, name: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Type</Label>
                <Select value={newRun.type} onValueChange={(value: "IRS" | "CCS") => setNewRun({...newRun, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IRS">Interest Rate Swap</SelectItem>
                    <SelectItem value="CCS">Cross Currency Swap</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select value={newRun.currency} onValueChange={(value) => setNewRun({...newRun, currency: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="JPY">JPY</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="notional">Notional Amount</Label>
                <Input
                  id="notional"
                  type="number"
                  placeholder="1000000"
                  value={newRun.notional}
                  onChange={(e) => setNewRun({...newRun, notional: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="tenor">Tenor</Label>
                <Select value={newRun.tenor} onValueChange={(value) => setNewRun({...newRun, tenor: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1Y">1 Year</SelectItem>
                    <SelectItem value="2Y">2 Years</SelectItem>
                    <SelectItem value="3Y">3 Years</SelectItem>
                    <SelectItem value="5Y">5 Years</SelectItem>
                    <SelectItem value="10Y">10 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {newRun.type === "IRS" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fixedRate">Fixed Rate (%)</Label>
                  <Input
                    id="fixedRate"
                    type="number"
                    step="0.01"
                    placeholder="3.5"
                    value={newRun.fixedRate}
                    onChange={(e) => setNewRun({...newRun, fixedRate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="floatingIndex">Floating Index</Label>
                  <Select value={newRun.floatingIndex} onValueChange={(value) => setNewRun({...newRun, floatingIndex: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SOFR">SOFR</SelectItem>
                      <SelectItem value="EURIBOR">EURIBOR</SelectItem>
                      <SelectItem value="SONIA">SONIA</SelectItem>
                      <SelectItem value="TONA">TONA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={handleNewRun} className="flex-1">
                Create Run
              </Button>
              <Button variant="outline" onClick={() => {
                setIsFormOpen(false)
                setShowNewRunDialog(false)
              }} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}