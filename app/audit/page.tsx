"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  List, 
  UserCheck, 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  FileText,
  Settings,
  Eye,
  Edit,
  Plus,
  Trash2,
  Download,
  Upload,
  RefreshCw,
  Bell,
  Users,
  Lock,
  Unlock,
  Book,
  Calculator,
  Building,
  Flag,
  ExternalLink,
  Search,
  Filter,
  MoreHorizontal,
  ArrowRight,
  Check,
  Circle,
  ExclamationTriangle,
  Shield,
  User,
  Robot,
  ChevronLeft,
  ChevronRight,
  Copy,
  Info,
  Cog,
  X,
  Undo,
  Save,
  RotateCcw,
  Bot,
  Send,
  History,
  Scale,
  ClipboardList,
  ChevronDown,
  ArrowUpDown,
  SortAsc,
  SortDesc
} from "lucide-react"

interface AuditEntry {
  id: string
  timestamp: string
  module: string
  action: string
  entityId: string
  user: string
  userAvatar: string
  source: string
  status: "success" | "failed" | "warning"
  moduleColor: string
  actionColor: string
  statusColor: string
}

interface AuditStats {
  totalEvents: number
  uniqueUsers: number
  criticalEvents: number
  successRate: number
}

interface SecurityEvent {
  type: string
  description: string
  status: "success" | "warning" | "info"
  value: string
  icon: string
  iconColor: string
}

interface ComplianceEvent {
  type: string
  description: string
  status: "success" | "warning" | "info"
  value: string
  icon: string
  iconColor: string
}

interface TimelineEvent {
  id: string
  title: string
  description: string
  timestamp: string
  user: string
  details: string[]
  color: string
}

export default function AuditPage() {
  const [selectedModule, setSelectedModule] = useState("all")
  const [selectedAction, setSelectedAction] = useState("all")
  const [selectedUser, setSelectedUser] = useState("all")
  const [selectedSource, setSelectedSource] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<AuditEntry | null>(null)
  const [startDate, setStartDate] = useState("2024-12-18")
  const [endDate, setEndDate] = useState("2025-01-18")

  // Mock data
  const auditStats: AuditStats = {
    totalEvents: 2847,
    uniqueUsers: 23,
    criticalEvents: 8,
    successRate: 99.7
  }

  const auditEntries: AuditEntry[] = [
    {
      id: "AUD-2025-0118-00001247",
      timestamp: "2025-01-18\n08:22:15",
      module: "Valuation Run",
      action: "Complete",
      entityId: "VAL-2025-0118-001",
      user: "Alex Johnson",
      userAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
      source: "Web Interface",
      status: "success",
      moduleColor: "success-600",
      actionColor: "success-600",
      statusColor: "success-600"
    },
    {
      id: "AUD-2025-0118-00001246",
      timestamp: "2025-01-18\n08:20:42",
      module: "Export Generation",
      action: "Generate",
      entityId: "EXP-2025-0118-001",
      user: "Alex Johnson",
      userAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
      source: "AI Agent",
      status: "success",
      moduleColor: "info-600",
      actionColor: "info-600",
      statusColor: "success-600"
    },
    {
      id: "AUD-2025-0118-00001245",
      timestamp: "2025-01-18\n08:18:33",
      module: "IFRS-13 Review",
      action: "Approve",
      entityId: "VAL-2025-0118-001",
      user: "Sarah Chen",
      userAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
      source: "Web Interface",
      status: "success",
      moduleColor: "warning-600",
      actionColor: "success-600",
      statusColor: "success-600"
    },
    {
      id: "AUD-2025-0118-00001244",
      timestamp: "2025-01-18\n08:15:21",
      module: "Sensitivity Analysis",
      action: "Execute",
      entityId: "VAL-2025-0118-001",
      user: "Alex Johnson",
      userAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
      source: "AI Agent",
      status: "success",
      moduleColor: "info-600",
      actionColor: "info-600",
      statusColor: "success-600"
    },
    {
      id: "AUD-2025-0118-00001243",
      timestamp: "2025-01-18\n08:12:45",
      module: "Valuation Run",
      action: "Failed",
      entityId: "VAL-2025-0118-002",
      user: "Mike Rodriguez",
      userAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
      source: "Web Interface",
      status: "failed",
      moduleColor: "danger-600",
      actionColor: "danger-600",
      statusColor: "danger-600"
    },
    {
      id: "AUD-2025-0118-00001242",
      timestamp: "2025-01-18\n08:10:18",
      module: "Instrument Creation",
      action: "Create",
      entityId: "IRS-USD-10M-001",
      user: "Alex Johnson",
      userAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
      source: "Web Interface",
      status: "success",
      moduleColor: "brand-green",
      actionColor: "success-600",
      statusColor: "success-600"
    },
    {
      id: "AUD-2025-0118-00001241",
      timestamp: "2025-01-18\n08:08:52",
      module: "User Authentication",
      action: "Login",
      entityId: "N/A",
      user: "Alex Johnson",
      userAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
      source: "Web Interface",
      status: "success",
      moduleColor: "info-600",
      actionColor: "success-600",
      statusColor: "success-600"
    },
    {
      id: "AUD-2025-0118-00001240",
      timestamp: "2025-01-18\n08:05:33",
      module: "Data Management",
      action: "Update",
      entityId: "CURVE-USD-OIS",
      user: "System Automated",
      userAvatar: "",
      source: "Batch Process",
      status: "success",
      moduleColor: "warning-600",
      actionColor: "info-600",
      statusColor: "success-600"
    }
  ]

  const securityEvents: SecurityEvent[] = [
    {
      type: "Authentication",
      description: "All login attempts successful",
      status: "success",
      value: "100%",
      icon: "ShieldCheck",
      iconColor: "success-600"
    },
    {
      type: "Data Encryption",
      description: "All data encrypted in transit/rest",
      status: "success",
      value: "✓",
      icon: "Lock",
      iconColor: "success-600"
    },
    {
      type: "Access Control",
      description: "Role-based permissions enforced",
      status: "info",
      value: "✓",
      icon: "User",
      iconColor: "info-600"
    },
    {
      type: "Failed Access Attempts",
      description: "2 blocked attempts (last 24h)",
      status: "warning",
      value: "2",
      icon: "AlertTriangle",
      iconColor: "warning-600"
    }
  ]

  const complianceEvents: ComplianceEvent[] = [
    {
      type: "IFRS-13 Compliance",
      description: "All valuations properly classified",
      status: "success",
      value: "✓",
      icon: "Scale",
      iconColor: "success-600"
    },
    {
      type: "Audit Trail Completeness",
      description: "All events logged and traceable",
      status: "success",
      value: "100%",
      icon: "ClipboardList",
      iconColor: "success-600"
    },
    {
      type: "Documentation",
      description: "All runs have complete documentation",
      status: "success",
      value: "✓",
      icon: "FileText",
      iconColor: "success-600"
    },
    {
      type: "Data Retention",
      description: "7-year retention policy active",
      status: "info",
      value: "✓",
      icon: "Clock",
      iconColor: "info-600"
    }
  ]

  const timelineEvents: TimelineEvent[] = [
    {
      id: "1",
      title: "Valuation Run Completed",
      description: "VAL-2025-0118-001 successfully completed with Level 2 IFRS-13 classification",
      timestamp: "08:22:15",
      user: "Alex Johnson",
      details: ["User: Alex Johnson", "Duration: 2.3 min", "PV: $127,450.23"],
      color: "success-600"
    },
    {
      id: "2",
      title: "Export Generated",
      description: "Excel report with sensitivities generated via AI Agent",
      timestamp: "08:20:42",
      user: "Alex Johnson",
      details: ["User: Alex Johnson", "Format: Excel", "Size: 2.4 MB"],
      color: "info-600"
    },
    {
      id: "3",
      title: "IFRS-13 Review Approved",
      description: "Level 2 classification approved by Senior Analyst",
      timestamp: "08:18:33",
      user: "Sarah Chen",
      details: ["User: Sarah Chen", "Level: 2", "Rationale: Observable inputs"],
      color: "warning-600"
    },
    {
      id: "4",
      title: "Sensitivity Analysis Executed",
      description: "+1bp parallel shift requested via AI Assistant",
      timestamp: "08:15:21",
      user: "Alex Johnson",
      details: ["User: Alex Johnson", "Source: AI Agent", "Result: $892.15 delta"],
      color: "brand-green"
    },
    {
      id: "5",
      title: "Valuation Run Failed",
      description: "VAL-2025-0118-002 failed due to missing curve data",
      timestamp: "08:12:45",
      user: "Mike Rodriguez",
      details: ["User: Mike Rodriguez", "Error: CURVE_NOT_FOUND", "Currency: CHF"],
      color: "danger-600"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-success-600 bg-opacity-20 text-success-600"
      case "failed":
        return "bg-danger-600 bg-opacity-20 text-danger-600"
      case "warning":
        return "bg-warning-600 bg-opacity-20 text-warning-600"
      case "info":
        return "bg-info-600 bg-opacity-20 text-info-600"
      default:
        return "bg-gray-600 bg-opacity-20 text-gray-300"
    }
  }

  const getModuleColor = (color: string) => {
    switch (color) {
      case "success-600":
        return "bg-success-600"
      case "info-600":
        return "bg-info-600"
      case "warning-600":
        return "bg-warning-600"
      case "danger-600":
        return "bg-danger-600"
      case "brand-green":
        return "bg-green-600"
      default:
        return "bg-gray-600"
    }
  }

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      ShieldCheck,
      Lock,
      User,
      AlertTriangle,
      Scale,
      ClipboardList,
      FileText,
      Clock
    }
    return icons[iconName] || FileText
  }

  const handleViewEntry = (entry: AuditEntry) => {
    setSelectedEntry(entry)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedEntry(null)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Page Header */}
      <section className="bg-gray-800 border-b border-gray-700 px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <nav className="flex items-center space-x-2 text-sm">
            <span className="text-gray-300 hover:text-green-600 transition-colors cursor-pointer">Dashboard</span>
            <ChevronRight className="w-3 h-3 text-gray-500" />
            <span className="text-gray-300 hover:text-green-600 transition-colors cursor-pointer">Governance</span>
            <ChevronRight className="w-3 h-3 text-gray-500" />
            <span className="text-white font-medium">Audit Trail</span>
          </nav>
          
          <div className="flex items-center space-x-3">
            <Button className="bg-gray-700 hover:bg-gray-600 text-white">
              <Info className="w-4 h-4 mr-2" />
              Help
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-black font-medium">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Audit Trail</h1>
            <p className="text-gray-300">Comprehensive log of user actions, system events, and valuation changes</p>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-300">Last Updated</div>
            <div className="text-lg font-medium text-white">2025-01-18 08:22:15 UTC</div>
          </div>
        </div>
      </section>

      {/* Information Alert */}
      <section className="px-8 py-4">
        <Alert className="bg-blue-600 bg-opacity-10 border-blue-600">
          <Info className="w-4 h-4" />
          <AlertDescription className="text-white">
            The default data displayed shows the most recent 12 months. Use the filters below to refine your search by date range, user, action type, or run ID.
          </AlertDescription>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-500">
            <X className="w-4 h-4" />
          </Button>
        </Alert>
      </section>

      {/* Audit Statistics */}
      <section className="px-8 py-6">
        <h2 className="text-xl font-semibold text-white mb-6">Audit Statistics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <List className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs text-gray-300 bg-gray-700 px-2 py-1 rounded">Last 30 days</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{auditStats.totalEvents.toLocaleString()}</div>
              <div className="text-sm text-gray-300">Total Events</div>
              <div className="mt-3 text-xs text-gray-400">All audit entries</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-xs text-gray-300 bg-gray-700 px-2 py-1 rounded">Active users</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{auditStats.uniqueUsers}</div>
              <div className="text-sm text-gray-300">Unique Users</div>
              <div className="mt-3 text-xs text-gray-400">With activity</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                </div>
                <span className="text-xs text-gray-300 bg-gray-700 px-2 py-1 rounded">Requires attention</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{auditStats.criticalEvents}</div>
              <div className="text-sm text-gray-300">Critical Events</div>
              <div className="mt-3 text-xs text-gray-400">Failed operations</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-xs text-gray-300 bg-gray-700 px-2 py-1 rounded">Compliance</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{auditStats.successRate}%</div>
              <div className="text-sm text-gray-300">Success Rate</div>
              <div className="mt-3 text-xs text-gray-400">Operations completed</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Advanced Filter Controls */}
      <section className="px-8 py-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-white flex items-center">
                <Filter className="w-5 h-5 mr-3 text-green-600" />
                Advanced Filters
              </CardTitle>
              <div className="flex items-center space-x-3">
                <Button className="bg-gray-700 hover:bg-gray-600 text-white">
                  <Undo className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 text-black font-medium">
                  <Save className="w-4 h-4 mr-2" />
                  Save Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <Label className="block text-sm font-medium text-gray-300 mb-2">Date Range</Label>
                <div className="space-y-2">
                  <Input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-gray-700 border-gray-600 text-white"
                  />
                  <Input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
              
              <div>
                <Label className="block text-sm font-medium text-gray-300 mb-2">Module</Label>
                <Select value={selectedModule} onValueChange={setSelectedModule}>
                  <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="All Modules" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Modules</SelectItem>
                    <SelectItem value="valuation">Valuation Runs</SelectItem>
                    <SelectItem value="ifrs">IFRS-13 Review</SelectItem>
                    <SelectItem value="export">Export Generation</SelectItem>
                    <SelectItem value="user">User Management</SelectItem>
                    <SelectItem value="system">System Configuration</SelectItem>
                    <SelectItem value="data">Data Management</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="block text-sm font-medium text-gray-300 mb-2">Action Type</Label>
                <Select value={selectedAction} onValueChange={setSelectedAction}>
                  <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="All Actions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Actions</SelectItem>
                    <SelectItem value="create">Create</SelectItem>
                    <SelectItem value="update">Update</SelectItem>
                    <SelectItem value="delete">Delete</SelectItem>
                    <SelectItem value="view">View</SelectItem>
                    <SelectItem value="export">Export</SelectItem>
                    <SelectItem value="approve">Approve</SelectItem>
                    <SelectItem value="reject">Reject</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="block text-sm font-medium text-gray-300 mb-2">User</Label>
                <Select value={selectedUser} onValueChange={setSelectedUser}>
                  <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="All Users" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="alex">Alex Johnson</SelectItem>
                    <SelectItem value="sarah">Sarah Chen</SelectItem>
                    <SelectItem value="mike">Mike Rodriguez</SelectItem>
                    <SelectItem value="emma">Emma Thompson</SelectItem>
                    <SelectItem value="david">David Kim</SelectItem>
                    <SelectItem value="system">System Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <Label className="block text-sm font-medium text-gray-300 mb-2">Run ID / Entity ID</Label>
                <Input 
                  type="text" 
                  placeholder="VAL-2025-0118-001 or entity identifier" 
                  className="w-full bg-gray-700 border-gray-600 text-white"
                />
              </div>
              
              <div>
                <Label className="block text-sm font-medium text-gray-300 mb-2">Source</Label>
                <Select value={selectedSource} onValueChange={setSelectedSource}>
                  <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="All Sources" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="web">Web Interface</SelectItem>
                    <SelectItem value="api">API</SelectItem>
                    <SelectItem value="batch">Batch Process</SelectItem>
                    <SelectItem value="ai">AI Agent</SelectItem>
                    <SelectItem value="system">System Automated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-700">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-300">Quick Filters:</span>
                <Button variant="outline" size="sm" className="bg-gray-700 text-gray-300 text-xs hover:bg-green-600 hover:text-black">Today</Button>
                <Button variant="outline" size="sm" className="bg-gray-700 text-gray-300 text-xs hover:bg-green-600 hover:text-black">This Week</Button>
                <Button variant="outline" size="sm" className="bg-gray-700 text-gray-300 text-xs hover:bg-green-600 hover:text-black">Failed Only</Button>
                <Button variant="outline" size="sm" className="bg-gray-700 text-gray-300 text-xs hover:bg-green-600 hover:text-black">IFRS Events</Button>
              </div>
              
              <div className="text-sm text-gray-300">
                <span className="font-medium text-white">1,247</span> results found
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Audit Trail Table */}
      <section className="px-8 py-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-white">Audit Entries</CardTitle>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-300">Show:</span>
                  <Select defaultValue="25">
                    <SelectTrigger className="w-20 bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-gray-300">per page</span>
                </div>
                
                <div className="relative">
                  <Input 
                    type="text" 
                    placeholder="Search audit entries..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white pl-9 w-64"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-300" />
                </div>
                
                <Button variant="ghost" size="sm">
                  <RefreshCw className="w-4 h-4 text-gray-300 hover:text-white" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-700">
                  <TableRow>
                    <TableHead className="text-gray-300 cursor-pointer hover:text-white">
                      <div className="flex items-center space-x-2">
                        <span>Timestamp</span>
                        <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </TableHead>
                    <TableHead className="text-gray-300 cursor-pointer hover:text-white">
                      <div className="flex items-center space-x-2">
                        <span>Module</span>
                        <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </TableHead>
                    <TableHead className="text-gray-300 cursor-pointer hover:text-white">
                      <div className="flex items-center space-x-2">
                        <span>Action</span>
                        <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </TableHead>
                    <TableHead className="text-gray-300 cursor-pointer hover:text-white">
                      <div className="flex items-center space-x-2">
                        <span>Entity ID</span>
                        <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </TableHead>
                    <TableHead className="text-gray-300 cursor-pointer hover:text-white">
                      <div className="flex items-center space-x-2">
                        <span>User</span>
                        <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </TableHead>
                    <TableHead className="text-gray-300 cursor-pointer hover:text-white">
                      <div className="flex items-center space-x-2">
                        <span>Source</span>
                        <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </TableHead>
                    <TableHead className="text-gray-300 cursor-pointer hover:text-white">
                      <div className="flex items-center space-x-2">
                        <span>Status</span>
                        <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditEntries.map((entry) => (
                    <TableRow key={entry.id} className="hover:bg-gray-750">
                      <TableCell className="text-sm text-white font-mono">
                        {entry.timestamp.split('\n').map((line, index) => (
                          <div key={index}>{line}</div>
                        ))}
                      </TableCell>
                      <TableCell className="text-sm">
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${getModuleColor(entry.moduleColor)}`}></div>
                          <span className="text-white">{entry.module}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        <Badge className={getStatusColor(entry.actionColor)}>
                          {entry.action}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        <span className="text-green-600 font-mono">{entry.entityId}</span>
                      </TableCell>
                      <TableCell className="text-sm">
                        <div className="flex items-center space-x-2">
                          {entry.userAvatar ? (
                            <img src={entry.userAvatar} alt="User" className="w-6 h-6 rounded-full" />
                          ) : (
                            <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                              <Bot className="w-3 h-3 text-gray-300" />
                            </div>
                          )}
                          <span className="text-white">{entry.user}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-300">{entry.source}</TableCell>
                      <TableCell className="text-sm">
                        <Badge className={getStatusColor(entry.statusColor)}>
                          {entry.status === "success" ? "Success" : 
                           entry.status === "failed" ? "Failed" : "Warning"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center space-x-3">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewEntry(entry)}
                            className="text-green-600 hover:text-green-500"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="p-6 border-t border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-300">
                Showing <span className="text-white font-medium">1-25</span> of <span className="text-white font-medium">1,247</span> entries
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white" disabled>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="bg-green-600 text-black">1</Button>
                <Button variant="outline" size="sm" className="bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white">2</Button>
                <Button variant="outline" size="sm" className="bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white">3</Button>
                <span className="px-2 text-gray-300">...</span>
                <Button variant="outline" size="sm" className="bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white">50</Button>
                <Button variant="outline" size="sm" className="bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Event Timeline Visualization */}
      <section className="px-8 py-6">
        <h2 className="text-xl font-semibold text-white mb-6">Recent Event Timeline</h2>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-600"></div>
              
              <div className="space-y-6">
                {timelineEvents.map((event) => (
                  <div key={event.id} className="flex items-start space-x-4">
                    <div className={`relative z-10 w-4 h-4 rounded-full border-2 border-gray-800 ${getModuleColor(event.color)}`}></div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium">{event.title}</h4>
                        <span className="text-xs text-gray-300">{event.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-300 mb-2">{event.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-400">
                        {event.details.map((detail, index) => (
                          <span key={index}>{detail}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Compliance Summary */}
      <section className="px-8 py-6">
        <h2 className="text-xl font-semibold text-white mb-6">Compliance & Security Summary</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-white">Security Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityEvents.map((event, index) => {
                  const IconComponent = getIcon(event.icon)
                  return (
                    <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${
                      event.status === "success" ? "bg-green-600 bg-opacity-10 border-green-600" :
                      event.status === "warning" ? "bg-yellow-600 bg-opacity-10 border-yellow-600" :
                      "bg-blue-600 bg-opacity-10 border-blue-600"
                    }`}>
                      <div className="flex items-center space-x-3">
                        <IconComponent className={`w-5 h-5 ${
                          event.status === "success" ? "text-green-600" :
                          event.status === "warning" ? "text-yellow-600" :
                          "text-blue-600"
                        }`} />
                        <div>
                          <div className="text-white font-medium text-sm">{event.type}</div>
                          <div className="text-xs text-gray-300">{event.description}</div>
                        </div>
                      </div>
                      <div className={`font-bold ${
                        event.status === "success" ? "text-green-600" :
                        event.status === "warning" ? "text-yellow-600" :
                        "text-blue-600"
                      }`}>{event.value}</div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-white">Regulatory Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceEvents.map((event, index) => {
                  const IconComponent = getIcon(event.icon)
                  return (
                    <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${
                      event.status === "success" ? "bg-green-600 bg-opacity-10 border-green-600" :
                      event.status === "warning" ? "bg-yellow-600 bg-opacity-10 border-yellow-600" :
                      "bg-blue-600 bg-opacity-10 border-blue-600"
                    }`}>
                      <div className="flex items-center space-x-3">
                        <IconComponent className={`w-5 h-5 ${
                          event.status === "success" ? "text-green-600" :
                          event.status === "warning" ? "text-yellow-600" :
                          "text-blue-600"
                        }`} />
                        <div>
                          <div className="text-white font-medium text-sm">{event.type}</div>
                          <div className="text-xs text-gray-300">{event.description}</div>
                        </div>
                      </div>
                      <div className={`font-bold ${
                        event.status === "success" ? "text-green-600" :
                        event.status === "warning" ? "text-yellow-600" :
                        "text-blue-600"
                      }`}>{event.value}</div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Export and Reporting Options */}
      <section className="px-8 py-6 pb-8">
        <h2 className="text-xl font-semibold text-white mb-6">Export & Reporting</h2>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-white font-medium mb-2">CSV Export</h3>
                <p className="text-sm text-gray-300 mb-4">Export filtered audit entries to CSV format for analysis</p>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Download CSV
                </Button>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-white font-medium mb-2">Compliance Report</h3>
                <p className="text-sm text-gray-300 mb-4">Generate comprehensive compliance and audit report</p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate PDF
                </Button>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-600 bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-white font-medium mb-2">Analytics Dashboard</h3>
                <p className="text-sm text-gray-300 mb-4">View detailed analytics and trends from audit data</p>
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-300 flex items-center">
                  <Info className="w-4 h-4 mr-2 text-blue-600" />
                  Audit data is automatically archived after 7 years per regulatory requirements
                </div>
                <Button className="bg-gray-700 hover:bg-gray-600 text-white">
                  <Cog className="w-4 h-4 mr-2" />
                  Configure Retention
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Audit Detail Modal */}
      {showModal && selectedEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="p-6 border-b border-gray-700 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Audit Entry Details</h2>
              <Button variant="ghost" size="sm" onClick={handleCloseModal}>
                <X className="w-5 h-5 text-gray-300 hover:text-white" />
              </Button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <Label className="block text-sm font-medium text-gray-300 mb-1">Event ID</Label>
                    <div className="text-white font-mono">{selectedEntry.id}</div>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-gray-300 mb-1">Timestamp</Label>
                    <div className="text-white">2025-01-18 08:22:15.847 UTC</div>
                  </div>
                
                  <div>
                    <Label className="block text-sm font-medium text-gray-300 mb-1">Module</Label>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getModuleColor(selectedEntry.moduleColor)}`}></div>
                      <span className="text-white">{selectedEntry.module}</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-gray-300 mb-1">Action</Label>
                    <Badge className={getStatusColor(selectedEntry.actionColor)}>
                      {selectedEntry.action}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label className="block text-sm font-medium text-gray-300 mb-1">Entity ID</Label>
                    <div className="text-green-600 font-mono">{selectedEntry.entityId}</div>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-gray-300 mb-1">User</Label>
                    <div className="flex items-center space-x-2">
                      {selectedEntry.userAvatar ? (
                        <img src={selectedEntry.userAvatar} alt="User" className="w-8 h-8 rounded-full" />
                      ) : (
                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-gray-300" />
                        </div>
                      )}
                      <div>
                        <div className="text-white">{selectedEntry.user}</div>
                        <div className="text-xs text-gray-300">alex.johnson@company.com</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-gray-300 mb-1">Source</Label>
                    <div className="text-white">{selectedEntry.source}</div>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-gray-300 mb-1">IP Address</Label>
                    <div className="text-gray-300 font-mono">192.168.1.100</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Event Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label className="block text-sm font-medium text-gray-300 mb-2">Description</Label>
                    <p className="text-white text-sm">Successfully completed valuation run for USD 10,000,000 Interest Rate Swap with IFRS-13 Level 2 classification. All sensitivity analyses and documentation generated.</p>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-gray-300 mb-2">Previous State</Label>
                    <div className="bg-gray-600 rounded p-3 font-mono text-sm text-gray-200">
                      {`{
  "status": "RUNNING",
  "progress": 85,
  "stage": "SENSITIVITY_ANALYSIS"
}`}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-gray-300 mb-2">Current State</Label>
                    <div className="bg-gray-600 rounded p-3 font-mono text-sm text-gray-200">
                      {`{
  "status": "COMPLETED",
  "progress": 100,
  "stage": "FINISHED",
  "present_value": 127450.23,
  "currency": "USD",
  "ifrs_level": 2,
  "completion_time": "2025-01-18T08:22:15.847Z"
}`}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-gray-300 mb-2">Additional Metadata</Label>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-300">Processing Time:</span>
                        <span className="text-white ml-2">2.3 minutes</span>
                      </div>
                      <div>
                        <span className="text-gray-300">Model Version:</span>
                        <span className="text-white ml-2">v2.1.4</span>
                      </div>
                      <div>
                        <span className="text-gray-300">Data Hash:</span>
                        <span className="text-green-600 ml-2 font-mono">a1b2c3d4e5f6</span>
                      </div>
                      <div>
                        <span className="text-gray-300">Risk Engine:</span>
                        <span className="text-white ml-2">Hull-White 1F</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button className="bg-green-600 hover:bg-green-700 text-black font-medium">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Run Details
                  </Button>
                  <Button className="bg-gray-700 hover:bg-gray-600 text-white">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Event ID
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button className="bg-gray-700 hover:bg-gray-600 text-white">
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                  <Button className="bg-gray-700 hover:bg-gray-600 text-white">
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}