"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  FileText, 
  Download, 
  Eye, 
  BarChart3,
  TrendingUp,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Percent,
  Calculator,
  BookOpen,
  ExternalLink,
  Filter,
  Search,
  RefreshCw,
  Plus,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Share,
  Edit,
  Save,
  X,
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
  PieChart,
  LineChart,
  Target,
  Globe,
  Lock,
  Key,
  Bell,
  MessageCircle,
  HelpCircle,
  ShieldCheck,
  Zap,
  User,
  Archive,
  Timer,
  Upload,
  Copy,
  Send,
  ArrowRight,
  ArrowLeftRight,
  Redo,
  Bot,
  Minus,
  Info,
  AlertCircle,
  XCircle,
  Pause,
  Settings
} from "lucide-react"

interface Report {
  id: string
  title: string
  type: 'valuation' | 'cva' | 'portfolio' | 'analytics'
  status: 'completed' | 'running' | 'available'
  description: string
  lastUpdated: string
  size: string
  icon: React.ReactNode
  color: string
  url: string
  runId?: string
  instrumentType?: string
  currency?: string
  notional?: number
  pv?: number
  created_at: string
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedReports, setSelectedReports] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [sortBy, setSortBy] = useState("created_at")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [reportsPerPage] = useState(10)

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    setLoading(true)
    setError(null)
    try {
      // Simulate loading reports
      const mockReports: Report[] = [
        {
          id: "run-001-valuation",
          title: "USD 5Y IRS - Valuation Report",
          type: "valuation",
          status: "completed",
          description: "Comprehensive valuation analysis for USD 5Y Interest Rate Swap",
          lastUpdated: "2025-10-21",
          size: "2.1 KB",
          icon: <DollarSign className="h-5 w-5" />,
          color: "bg-blue-500",
          url: "/reports/run-001-USD-5Y-IRS-Report.html",
          runId: "run-001",
          instrumentType: "IRS",
          currency: "USD",
          notional: 10000000,
          pv: 125000,
          created_at: "2025-10-21T10:30:00Z"
        },
        {
          id: "run-001-cva",
          title: "USD 5Y IRS - CVA Analysis",
          type: "cva",
          status: "completed",
          description: "Bilateral CVA analysis with credit risk and sensitivity analysis",
          lastUpdated: "2025-10-21",
          size: "4.2 KB",
          icon: <Shield className="h-5 w-5" />,
          color: "bg-red-500",
          url: "/reports/run-001-USD-5Y-IRS-CVA-Analysis.html",
          runId: "run-001",
          instrumentType: "IRS",
          currency: "USD",
          notional: 10000000,
          pv: 125000,
          created_at: "2025-10-21T10:35:00Z"
        },
        {
          id: "run-002-valuation",
          title: "EUR/USD CCS - Valuation Report",
          type: "valuation",
          status: "running",
          description: "Multi-currency valuation analysis for Cross Currency Swap",
          lastUpdated: "2025-10-21",
          size: "1.8 KB",
          icon: <TrendingUp className="h-5 w-5" />,
          color: "bg-green-500",
          url: "/reports/run-002-EUR-USD-CCS-Report.html",
          runId: "run-002",
          instrumentType: "CCS",
          currency: "EUR",
          notional: 5000000,
          pv: 85000,
          created_at: "2025-10-21T11:15:00Z"
        },
        {
          id: "run-002-cva",
          title: "EUR/USD CCS - CVA Analysis",
          type: "cva",
          status: "running",
          description: "Multi-currency CVA analysis with FX risk and correlation analysis",
          lastUpdated: "2025-10-21",
          size: "3.9 KB",
          icon: <Calculator className="h-5 w-5" />,
          color: "bg-purple-500",
          url: "/reports/run-002-EUR-USD-CCS-CVA-Analysis.html",
          runId: "run-002",
          instrumentType: "CCS",
          currency: "EUR",
          notional: 5000000,
          pv: 85000,
          created_at: "2025-10-21T11:20:00Z"
        },
        {
          id: "portfolio-summary",
          title: "Portfolio Summary Report",
          type: "portfolio",
          status: "completed",
          description: "Overall portfolio analysis with risk metrics and performance",
          lastUpdated: "2025-10-21",
          size: "2.5 KB",
          icon: <BarChart3 className="h-5 w-5" />,
          color: "bg-indigo-500",
          url: "/reports/Portfolio-Summary-Report.html",
          created_at: "2025-10-21T12:00:00Z"
        },
        {
          id: "portfolio-cva",
          title: "Portfolio CVA Analytics",
          type: "analytics",
          status: "completed",
          description: "Comprehensive portfolio CVA analytics with stress testing",
          lastUpdated: "2025-10-21",
          size: "3.7 KB",
          icon: <BookOpen className="h-5 w-5" />,
          color: "bg-orange-500",
          url: "/reports/Portfolio-CVA-Analytics.html",
          created_at: "2025-10-21T12:15:00Z"
        },
        {
          id: "advanced-analytics",
          title: "Advanced Risk Analytics",
          type: "analytics",
          status: "completed",
          description: "Advanced risk analytics with stress testing and regulatory analysis",
          lastUpdated: "2025-10-21",
          size: "4.1 KB",
          icon: <AlertTriangle className="h-5 w-5" />,
          color: "bg-yellow-500",
          url: "/reports/Advanced-Risk-Analytics.html",
          created_at: "2025-10-21T12:30:00Z"
        }
      ]
      
      setReports(mockReports)
    } catch (err) {
      console.error("Error fetching reports:", err)
      setError("Failed to load reports")
    } finally {
      setLoading(false)
    }
  }

  const handleViewReport = (reportId: string) => {
    const report = reports.find(r => r.id === reportId)
    if (report) {
      window.open(report.url, '_blank')
    }
  }

  const handleDeleteReport = (reportId: string) => {
    setReports(prev => prev.filter(report => report.id !== reportId))
  }

  const handleBulkDelete = () => {
    setReports(prev => prev.filter(report => !selectedReports.includes(report.id)))
    setSelectedReports([])
  }

  const handleSelectReport = (reportId: string) => {
    setSelectedReports(prev => 
      prev.includes(reportId) 
        ? prev.filter(id => id !== reportId)
        : [...prev, reportId]
    )
  }

  const handleSelectAll = () => {
    if (selectedReports.length === filteredReports.length) {
      setSelectedReports([])
    } else {
      setSelectedReports(filteredReports.map(report => report.id))
    }
  }

  // Filter and sort reports
  const filteredReports = reports
    .filter(report => {
      const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           report.id.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || report.status === statusFilter
      const matchesType = typeFilter === "all" || report.type === typeFilter
      return matchesSearch && matchesStatus && matchesType
    })
    .sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case "title":
          comparison = a.title.localeCompare(b.title)
          break
        case "status":
          comparison = a.status.localeCompare(b.status)
          break
        case "created_at":
          comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          break
        case "type":
          comparison = a.type.localeCompare(b.type)
          break
        default:
          comparison = 0
      }
      return sortOrder === "asc" ? comparison : -comparison
    })

  const totalPages = Math.ceil(filteredReports.length / reportsPerPage)
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * reportsPerPage,
    currentPage * reportsPerPage
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>
      case "running":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30"><Clock className="h-3 w-3 mr-1" />Running</Badge>
      case "available":
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30"><FileText className="h-3 w-3 mr-1" />Available</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "valuation":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Valuation</Badge>
      case "cva":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">CVA Analysis</Badge>
      case "portfolio":
        return <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30">Portfolio</Badge>
      case "analytics":
        return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Analytics</Badge>
      default:
        return <Badge variant="secondary">{type}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-lg">Loading reports...</p>
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
            <h1 className="text-3xl font-bold text-white">Valuation Reports</h1>
            <p className="text-gray-300 mt-2">Comprehensive CVA analysis and risk analytics for your portfolio</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" onClick={fetchReports}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
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
                    placeholder="Search reports by title or ID..."
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
                    placeholder="Search reports..."
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
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="running">Running</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
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
                      <SelectItem value="valuation">Valuation</SelectItem>
                      <SelectItem value="cva">CVA Analysis</SelectItem>
                      <SelectItem value="portfolio">Portfolio</SelectItem>
                      <SelectItem value="analytics">Analytics</SelectItem>
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
                      <SelectItem value="title">Title</SelectItem>
                      <SelectItem value="status">Status</SelectItem>
                      <SelectItem value="type">Type</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bulk Actions */}
        {selectedReports.length > 0 && (
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-blue-800">
                    {selectedReports.length} report{selectedReports.length > 1 ? 's' : ''} selected
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedReports([])}
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
                  <p className="text-sm text-gray-300">Total Reports</p>
                  <p className="text-2xl font-bold text-white">{reports.length}</p>
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
                  <p className="text-2xl font-bold text-green-400">{reports.filter(r => r.status === 'completed').length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-300">CVA Reports</p>
                  <p className="text-2xl font-bold text-red-400">{reports.filter(r => r.type === 'cva').length}</p>
                </div>
                <Shield className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-300">Analytics</p>
                  <p className="text-2xl font-bold text-orange-400">{reports.filter(r => r.type === 'analytics').length}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports Table with Tabs */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">All Reports ({filteredReports.length})</CardTitle>
                <CardDescription className="text-gray-300">Comprehensive CVA analysis and risk analytics</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={selectedReports.length === filteredReports.length && filteredReports.length > 0}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm text-gray-300">Select All</span>
              </div>
            </div>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-700">
                <TabsTrigger value="all" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">All Reports</TabsTrigger>
                <TabsTrigger value="valuation" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">Valuation</TabsTrigger>
                <TabsTrigger value="cva" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">CVA Analysis</TabsTrigger>
                <TabsTrigger value="analytics" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">Analytics</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-700">
                          <TableHead className="w-12 text-gray-300">Select</TableHead>
                          <TableHead className="text-gray-300">Title</TableHead>
                          <TableHead className="text-gray-300">Type</TableHead>
                          <TableHead className="text-gray-300">Status</TableHead>
                          <TableHead className="text-gray-300">Run ID</TableHead>
                          <TableHead className="text-gray-300">Size</TableHead>
                          <TableHead className="text-gray-300">Last Updated</TableHead>
                          <TableHead className="w-20 text-gray-300">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedReports.map((report) => (
                          <TableRow key={report.id} className="border-gray-700 hover:bg-gray-700/50">
                            <TableCell>
                              <Checkbox
                                checked={selectedReports.includes(report.id)}
                                onCheckedChange={() => handleSelectReport(report.id)}
                              />
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium text-white">{report.title}</div>
                                <div className="text-sm text-gray-400">{report.description}</div>
                              </div>
                            </TableCell>
                            <TableCell>{getTypeBadge(report.type)}</TableCell>
                            <TableCell>{getStatusBadge(report.status)}</TableCell>
                            <TableCell>
                              {report.runId ? (
                                <div className="text-sm text-white">{report.runId}</div>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="text-sm text-white">{report.size}</div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm text-white">
                                {new Date(report.lastUpdated).toLocaleDateString()}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleViewReport(report.id)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => window.open(report.url, '_blank')}
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteReport(report.id)}
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
                        Showing {((currentPage - 1) * reportsPerPage) + 1} to {Math.min(currentPage * reportsPerPage, filteredReports.length)} of {filteredReports.length} reports
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
              <TabsContent value="valuation" className="mt-4">
                <div className="text-center py-8 text-gray-500">
                  <DollarSign className="h-12 w-12 mx-auto mb-4" />
                  <p>Valuation reports will appear here</p>
                </div>
              </TabsContent>
              <TabsContent value="cva" className="mt-4">
                <div className="text-center py-8 text-gray-500">
                  <Shield className="h-12 w-12 mx-auto mb-4" />
                  <p>CVA analysis reports will appear here</p>
                </div>
              </TabsContent>
              <TabsContent value="analytics" className="mt-4">
                <div className="text-center py-8 text-gray-500">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                  <p>Analytics reports will appear here</p>
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
    </div>
  )
}