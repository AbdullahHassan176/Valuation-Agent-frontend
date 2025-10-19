"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  Eye, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Bell,
  Shield,
  User,
  Database,
  Settings,
  FileText,
  Lock,
  Unlock,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Calendar,
  Users,
  Activity,
  PieChart
} from "lucide-react"

interface AuditEvent {
  id: string
  timestamp: string
  user: string
  action: string
  category: "authentication" | "data" | "system" | "security" | "compliance" | "admin"
  severity: "info" | "warning" | "error" | "critical"
  ipAddress: string
  userAgent: string
  resource: string
  details: string
  outcome: "success" | "failure" | "partial"
  sessionId: string
}

interface AuditStats {
  totalEvents: number
  criticalEvents: number
  failedLogins: number
  dataExports: number
  systemChanges: number
  last24Hours: number
  lastWeek: number
}

interface UserActivity {
  user: string
  lastActivity: string
  eventCount: number
  riskLevel: "low" | "medium" | "high"
  location: string
  device: string
}

export default function AuditLogPage() {
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>([
    {
      id: "1",
      timestamp: "2024-01-15T10:30:00Z",
      user: "john.doe@company.com",
      action: "User Login",
      category: "authentication",
      severity: "info",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      resource: "/api/v1/auth/login",
      details: "Successful login from corporate network",
      outcome: "success",
      sessionId: "sess_abc123"
    },
    {
      id: "2",
      timestamp: "2024-01-15T10:25:00Z",
      user: "jane.smith@company.com",
      action: "Data Export",
      category: "data",
      severity: "warning",
      ipAddress: "192.168.1.101",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      resource: "/api/v1/portfolio/export",
      details: "Exported sensitive portfolio data (1,250 records)",
      outcome: "success",
      sessionId: "sess_def456"
    },
    {
      id: "3",
      timestamp: "2024-01-15T10:20:00Z",
      user: "admin@company.com",
      action: "Policy Update",
      category: "system",
      severity: "info",
      ipAddress: "192.168.1.102",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      resource: "/api/v1/policies/update",
      details: "Updated risk management policy v2.1",
      outcome: "success",
      sessionId: "sess_ghi789"
    },
    {
      id: "4",
      timestamp: "2024-01-15T10:15:00Z",
      user: "system",
      action: "Failed Login Attempt",
      category: "security",
      severity: "error",
      ipAddress: "203.0.113.45",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      resource: "/api/v1/auth/login",
      details: "Multiple failed login attempts from external IP",
      outcome: "failure",
      sessionId: "sess_jkl012"
    },
    {
      id: "5",
      timestamp: "2024-01-15T10:10:00Z",
      user: "mike.wilson@company.com",
      action: "Database Query",
      category: "data",
      severity: "info",
      ipAddress: "192.168.1.103",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      resource: "/api/v1/analytics/query",
      details: "Executed complex portfolio analysis query",
      outcome: "success",
      sessionId: "sess_mno345"
    },
    {
      id: "6",
      timestamp: "2024-01-15T10:05:00Z",
      user: "sarah.jones@company.com",
      action: "Permission Change",
      category: "admin",
      severity: "warning",
      ipAddress: "192.168.1.104",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      resource: "/api/v1/users/permissions",
      details: "Modified user permissions for risk_analyst role",
      outcome: "success",
      sessionId: "sess_pqr678"
    },
    {
      id: "7",
      timestamp: "2024-01-15T10:00:00Z",
      user: "system",
      action: "Compliance Check Failed",
      category: "compliance",
      severity: "critical",
      ipAddress: "192.168.1.105",
      userAgent: "System/1.0",
      resource: "/api/v1/compliance/check",
      details: "SOX controls validation failed - missing documentation",
      outcome: "failure",
      sessionId: "sess_stu901"
    },
    {
      id: "8",
      timestamp: "2024-01-15T09:55:00Z",
      user: "david.brown@company.com",
      action: "File Upload",
      category: "data",
      severity: "info",
      ipAddress: "192.168.1.106",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      resource: "/api/v1/documents/upload",
      details: "Uploaded financial report (PDF, 2.3MB)",
      outcome: "success",
      sessionId: "sess_vwx234"
    }
  ])

  const [userActivities, setUserActivities] = useState<UserActivity[]>([
    {
      user: "john.doe@company.com",
      lastActivity: "2024-01-15T10:30:00Z",
      eventCount: 15,
      riskLevel: "low",
      location: "New York, NY",
      device: "Windows 10 - Chrome"
    },
    {
      user: "jane.smith@company.com",
      lastActivity: "2024-01-15T10:25:00Z",
      eventCount: 8,
      riskLevel: "medium",
      location: "London, UK",
      device: "macOS - Safari"
    },
    {
      user: "mike.wilson@company.com",
      lastActivity: "2024-01-15T10:10:00Z",
      eventCount: 23,
      riskLevel: "low",
      location: "Tokyo, Japan",
      device: "Windows 11 - Edge"
    },
    {
      user: "sarah.jones@company.com",
      lastActivity: "2024-01-15T10:05:00Z",
      eventCount: 5,
      riskLevel: "high",
      location: "Sydney, Australia",
      device: "macOS - Chrome"
    }
  ])

  const [stats, setStats] = useState<AuditStats>({
    totalEvents: 1247,
    criticalEvents: 3,
    failedLogins: 12,
    dataExports: 8,
    systemChanges: 15,
    last24Hours: 156,
    lastWeek: 892
  })

  const [selectedTab, setSelectedTab] = useState<"events" | "users" | "analytics" | "settings">("events")
  const [filters, setFilters] = useState({
    category: "all",
    severity: "all",
    user: "",
    dateRange: "24h"
  })
  const [searchTerm, setSearchTerm] = useState("")

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "info": return "bg-blue-100 text-blue-800"
      case "warning": return "bg-yellow-100 text-yellow-800"
      case "error": return "bg-orange-100 text-orange-800"
      case "critical": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "info": return <Bell className="w-4 h-4 text-blue-500" />
      case "warning": return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case "error": return <XCircle className="w-4 h-4 text-orange-500" />
      case "critical": return <AlertTriangle className="w-4 h-4 text-red-600" />
      default: return <Bell className="w-4 h-4 text-gray-500" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "authentication": return "bg-green-100 text-green-800"
      case "data": return "bg-blue-100 text-blue-800"
      case "system": return "bg-purple-100 text-purple-800"
      case "security": return "bg-red-100 text-red-800"
      case "compliance": return "bg-orange-100 text-orange-800"
      case "admin": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "authentication": return <User className="w-4 h-4" />
      case "data": return <Database className="w-4 h-4" />
      case "system": return <Settings className="w-4 h-4" />
      case "security": return <Shield className="w-4 h-4" />
      case "compliance": return <FileText className="w-4 h-4" />
      case "admin": return <Users className="w-4 h-4" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case "success": return "bg-green-100 text-green-800"
      case "failure": return "bg-red-100 text-red-800"
      case "partial": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getOutcomeIcon = (outcome: string) => {
    switch (outcome) {
      case "success": return <CheckCircle className="w-4 h-4 text-green-500" />
      case "failure": return <XCircle className="w-4 h-4 text-red-500" />
      case "partial": return <Clock className="w-4 h-4 text-yellow-500" />
      default: return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "low": return "bg-green-100 text-green-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "high": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  const formatRelativeTime = (timestamp: string) => {
    const now = new Date()
    const eventTime = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - eventTime.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  const filteredEvents = auditEvents.filter(event => {
    const matchesCategory = filters.category === "all" || event.category === filters.category
    const matchesSeverity = filters.severity === "all" || event.severity === filters.severity
    const matchesUser = !filters.user || event.user.toLowerCase().includes(filters.user.toLowerCase())
    const matchesSearch = !searchTerm || 
      event.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.user.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesCategory && matchesSeverity && matchesUser && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header">
        <div className="breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <span>Audit Log</span>
        </div>
        <h1>Audit Log</h1>
        <p>System activity and audit trail</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEvents}</div>
            <p className="text-xs text-muted-foreground">
              Last 24h: {stats.last24Hours}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Critical Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.criticalEvents}</div>
            <p className="text-xs text-muted-foreground">
              Require attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Failed Logins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.failedLogins}</div>
            <p className="text-xs text-muted-foreground">
              Security events
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Data Exports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.dataExports}</div>
            <p className="text-xs text-muted-foreground">
              Sensitive data
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={(value: any) => setSelectedTab(value)} className="space-y-4">
        <TabsList>
          <TabsTrigger value="events">Audit Events</TabsTrigger>
          <TabsTrigger value="users">User Activity</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Audit Events Tab */}
        <TabsContent value="events" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters & Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Search events..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={filters.category} onValueChange={(value) => setFilters({...filters, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="authentication">Authentication</SelectItem>
                      <SelectItem value="data">Data</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="compliance">Compliance</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="severity">Severity</Label>
                  <Select value={filters.severity} onValueChange={(value) => setFilters({...filters, severity: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severities</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateRange">Date Range</Label>
                  <Select value={filters.dateRange} onValueChange={(value) => setFilters({...filters, dateRange: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1h">Last Hour</SelectItem>
                      <SelectItem value="24h">Last 24 Hours</SelectItem>
                      <SelectItem value="7d">Last 7 Days</SelectItem>
                      <SelectItem value="30d">Last 30 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Events Table */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Audit Events ({filteredEvents.length})</CardTitle>
                  <CardDescription>System activity and security events</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Outcome</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{formatTimestamp(event.timestamp)}</p>
                          <p className="text-sm text-gray-500">{formatRelativeTime(event.timestamp)}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{event.user}</TableCell>
                      <TableCell className="font-medium">{event.action}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(event.category)}
                          <Badge className={getCategoryColor(event.category)}>
                            {event.category}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getSeverityIcon(event.severity)}
                          <Badge className={getSeverityColor(event.severity)}>
                            {event.severity}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getOutcomeIcon(event.outcome)}
                          <Badge className={getOutcomeColor(event.outcome)}>
                            {event.outcome}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{event.ipAddress}</TableCell>
                      <TableCell className="max-w-xs truncate">{event.details}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Activity Tab */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Activity Summary</CardTitle>
              <CardDescription>Monitor user behavior and risk levels</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead>Event Count</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userActivities.map((activity, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{activity.user}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{formatTimestamp(activity.lastActivity)}</p>
                          <p className="text-sm text-gray-500">{formatRelativeTime(activity.lastActivity)}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4" />
                          <span className="font-bold">{activity.eventCount}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRiskLevelColor(activity.riskLevel)}>
                          {activity.riskLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>{activity.location}</TableCell>
                      <TableCell className="max-w-xs truncate">{activity.device}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <User className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Event Trends
                </CardTitle>
                <CardDescription>Audit event patterns over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Events (24h)</span>
                    <span className="text-2xl font-bold">{stats.last24Hours}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Critical Events</span>
                    <span className="text-xl font-bold text-red-600">{stats.criticalEvents}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Failed Logins</span>
                    <span className="text-xl font-bold text-orange-600">{stats.failedLogins}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Data Exports</span>
                    <span className="text-xl font-bold text-blue-600">{stats.dataExports}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Category Distribution
                </CardTitle>
                <CardDescription>Event breakdown by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["authentication", "data", "system", "security", "compliance", "admin"].map((category) => {
                    const count = auditEvents.filter(e => e.category === category).length
                    const percentage = Math.round((count / auditEvents.length) * 100)
                    return (
                      <div key={category} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(category)}
                          <span className="text-sm font-medium capitalize">{category}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">{percentage}%</span>
                          <span className="font-bold">{count}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audit Configuration</CardTitle>
              <CardDescription>Configure audit logging and retention policies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="retention">Retention Period</Label>
                    <Select defaultValue="1y">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30d">30 Days</SelectItem>
                        <SelectItem value="90d">90 Days</SelectItem>
                        <SelectItem value="1y">1 Year</SelectItem>
                        <SelectItem value="3y">3 Years</SelectItem>
                        <SelectItem value="7y">7 Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logLevel">Log Level</Label>
                    <Select defaultValue="info">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="debug">Debug</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alerts">Alert Thresholds</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="criticalThreshold">Critical Events</Label>
                      <Input id="criticalThreshold" type="number" placeholder="5" />
                    </div>
                    <div>
                      <Label htmlFor="failedLoginThreshold">Failed Logins</Label>
                      <Input id="failedLoginThreshold" type="number" placeholder="10" />
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button>
                    <Settings className="w-4 h-4 mr-2" />
                    Save Configuration
                  </Button>
                  <Button variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset to Defaults
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}