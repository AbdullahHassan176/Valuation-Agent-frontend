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
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
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
  ShieldCheck,
  Flag as FlagIcon,
  Cog,
  ArrowUp,
  ArrowDown,
  Minus,
  Bot,
  Send,
  History,
  Save
} from "lucide-react"

interface PolicyDocument {
  id: string
  name: string
  code: string
  framework: string
  version: string
  effectiveDate: string
  expiryDate: string
  status: "active" | "expiring" | "under_review"
  compliance: number
  icon: string
  iconColor: string
}

interface ComplianceRun {
  id: string
  name: string
  description: string
  status: "compliant" | "partial" | "non_compliant" | "in_progress"
  policiesPassed: number
  totalPolicies: number
  lastUpdated: string
}

interface KnowledgeSource {
  name: string
  description: string
  documents: number
  lastUpdated: string
  chunks: number
  status: "indexed" | "updating"
  icon: string
  iconColor: string
}

interface PolicyGate {
  id: string
  name: string
  description: string
  status: "active" | "warning" | "violations"
  triggerCondition: string
  checkType: string
  successRate: number
  rules: string
  icon: string
  iconColor: string
}

interface PendingApproval {
  id: string
  title: string
  description: string
  priority: "high" | "medium" | "low"
  assignedTo: string
  dueDate: string
  runId?: string
  runDescription?: string
  icon: string
  iconColor: string
}

interface GovernanceEvent {
  id: string
  title: string
  description: string
  timestamp: string
  runId?: string
  gate?: string
  action?: string
  approver?: string
  decision?: string
  policy?: string
  version?: string
  updatedBy?: string
  limitType?: string
  breach?: string
  status?: string
  icon: string
  iconColor: string
}

export default function GovernancePage() {
  const [selectedFramework, setSelectedFramework] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedTimeframe, setSelectedTimeframe] = useState("30D")
  const [selectedEventType, setSelectedEventType] = useState("all")

  // Mock data
  const policyDocuments: PolicyDocument[] = [
    {
      id: "1",
      name: "Fair Value Measurement Policy",
      code: "FVM-001-2024",
      framework: "IFRS-13",
      version: "v2.1",
      effectiveDate: "2024-01-01",
      expiryDate: "2025-12-31",
      status: "active",
      compliance: 98,
      icon: "FileText",
      iconColor: "info-600"
    },
    {
      id: "2",
      name: "Risk Management Framework",
      code: "RMF-003-2024",
      framework: "Basel III",
      version: "v1.8",
      effectiveDate: "2024-03-15",
      expiryDate: "2025-03-14",
      status: "expiring",
      compliance: 87,
      icon: "Shield",
      iconColor: "warning-600"
    },
    {
      id: "3",
      name: "Stress Testing Methodology",
      code: "STM-007-2024",
      framework: "CCAR",
      version: "v3.2",
      effectiveDate: "2024-06-01",
      expiryDate: "2026-05-31",
      status: "active",
      compliance: 95,
      icon: "TrendingUp",
      iconColor: "success-600"
    },
    {
      id: "4",
      name: "Model Validation Standards",
      code: "MVS-012-2024",
      framework: "Internal Risk",
      version: "v1.5",
      effectiveDate: "2024-09-01",
      expiryDate: "2025-02-28",
      status: "under_review",
      compliance: 72,
      icon: "AlertTriangle",
      iconColor: "danger-600"
    },
    {
      id: "5",
      name: "Valuation Methodology Guide",
      code: "VMG-004-2024",
      framework: "IFRS-13",
      version: "v4.0",
      effectiveDate: "2024-11-01",
      expiryDate: "2025-10-31",
      status: "active",
      compliance: 100,
      icon: "Calculator",
      iconColor: "info-600"
    }
  ]

  const complianceRuns: ComplianceRun[] = [
    {
      id: "VAL-2025-0118-001",
      name: "VAL-2025-0118-001",
      description: "IRS USD 10M • Level 2 • Completed",
      status: "compliant",
      policiesPassed: 5,
      totalPolicies: 5,
      lastUpdated: "2025-01-18 08:15"
    },
    {
      id: "VAL-2025-0118-002",
      name: "VAL-2025-0118-002",
      description: "CCS EUR/USD 9.2M • Level 3 • Pending Review",
      status: "partial",
      policiesPassed: 4,
      totalPolicies: 5,
      lastUpdated: "2025-01-18 08:20"
    },
    {
      id: "VAL-2025-0118-003",
      name: "VAL-2025-0118-003",
      description: "IRS GBP 5M • Level 2 • Completed",
      status: "compliant",
      policiesPassed: 5,
      totalPolicies: 5,
      lastUpdated: "2025-01-18 08:25"
    },
    {
      id: "VAL-2025-0118-004",
      name: "VAL-2025-0118-004",
      description: "CCS CHF/USD 8.5M • Level 3 • Failed",
      status: "non_compliant",
      policiesPassed: 2,
      totalPolicies: 5,
      lastUpdated: "2025-01-18 08:30"
    },
    {
      id: "VAL-2025-0118-005",
      name: "VAL-2025-0118-005",
      description: "IRS JPY 1B • Level 2 • Running",
      status: "in_progress",
      policiesPassed: 0,
      totalPolicies: 5,
      lastUpdated: "2025-01-18 08:35"
    }
  ]

  const knowledgeSources: KnowledgeSource[] = [
    {
      name: "IFRS-13 Standard Text",
      description: "Official IASB publication",
      documents: 47,
      lastUpdated: "2024-12-15",
      chunks: 1247,
      status: "indexed",
      icon: "Book",
      iconColor: "info-600"
    },
    {
      name: "Basel III Framework",
      description: "BIS regulatory guidelines",
      documents: 23,
      lastUpdated: "2024-11-30",
      chunks: 892,
      status: "indexed",
      icon: "Building",
      iconColor: "warning-600"
    },
    {
      name: "Internal Risk Policies",
      description: "Company-specific guidelines",
      documents: 31,
      lastUpdated: "2025-01-15",
      chunks: 643,
      status: "updating",
      icon: "Building",
      iconColor: "gray-600"
    },
    {
      name: "Federal Reserve Guidance",
      description: "CCAR and stress testing",
      documents: 18,
      lastUpdated: "2024-10-22",
      chunks: 456,
      status: "indexed",
      icon: "Flag",
      iconColor: "success-600"
    }
  ]

  const policyGates: PolicyGate[] = [
    {
      id: "1",
      name: "IFRS-13 Level Classification Gate",
      description: "Validates fair value hierarchy classification and documentation",
      status: "active",
      triggerCondition: "All valuation runs",
      checkType: "Pre-export validation",
      successRate: 96.8,
      rules: "Level 3 instruments require rationale documentation • Observable inputs must be referenced • Principal market identification required",
      icon: "ShieldCheck",
      iconColor: "success-600"
    },
    {
      id: "2",
      name: "Model Validation Gate",
      description: "Ensures approved models are used for exotic derivatives",
      status: "warning",
      triggerCondition: "Exotic derivatives",
      checkType: "Pre-calculation validation",
      successRate: 87.3,
      rules: "Model must be in approved registry • Validation date within 12 months • Calibration parameters within tolerance",
      icon: "Calculator",
      iconColor: "warning-600"
    },
    {
      id: "3",
      name: "Market Data Quality Gate",
      description: "Validates freshness and quality of market data inputs",
      status: "active",
      triggerCondition: "All runs using market data",
      checkType: "Real-time validation",
      successRate: 99.1,
      rules: "Data age < 1 hour • Source reliability score > 0.95 • No missing critical rates • Volatility within historical ranges",
      icon: "TrendingUp",
      iconColor: "info-600"
    },
    {
      id: "4",
      name: "Risk Limit Compliance Gate",
      description: "Checks portfolio exposure against defined risk limits",
      status: "violations",
      triggerCondition: "Portfolio aggregation",
      checkType: "Post-calculation validation",
      successRate: 78.4,
      rules: "VaR within board limits • Concentration limits not exceeded • Sector exposure balanced • Counterparty limits compliant",
      icon: "AlertTriangle",
      iconColor: "danger-600"
    }
  ]

  const pendingApprovals: PendingApproval[] = [
    {
      id: "1",
      title: "Level 3 Classification Review",
      description: "Cross-currency swap flagged for Level 3 due to unobservable correlation parameters. Requires senior risk officer approval and rationale documentation.",
      priority: "high",
      assignedTo: "Sarah Chen",
      dueDate: "Jan 20, 2025",
      runId: "VAL-2025-0118-002",
      runDescription: "CCS EUR/USD 9.2M",
      icon: "AlertTriangle",
      iconColor: "warning-600"
    },
    {
      id: "2",
      title: "Model Override Request",
      description: "Request to use alternative pricing model for structured product due to calibration issues with standard approach. Requires model validation team review.",
      priority: "medium",
      assignedTo: "Mike Rodriguez",
      dueDate: "Jan 22, 2025",
      icon: "Calculator",
      iconColor: "info-600"
    },
    {
      id: "3",
      title: "Policy Document Update",
      description: "Annual review and update of fair value measurement policy to incorporate latest regulatory guidance and market practices.",
      priority: "low",
      assignedTo: "Alex Johnson",
      dueDate: "Jan 30, 2025",
      icon: "FileText",
      iconColor: "gray-600"
    }
  ]

  const governanceEvents: GovernanceEvent[] = [
    {
      id: "1",
      title: "Policy Gate Failure",
      description: "IFRS-13 Level 3 gate failed for VAL-2025-0118-004 due to missing rationale documentation",
      timestamp: "8 minutes ago",
      runId: "VAL-2025-0118-004",
      gate: "IFRS-13 Classification",
      action: "Export blocked",
      icon: "AlertTriangle",
      iconColor: "danger-600"
    },
    {
      id: "2",
      title: "Approval Completed",
      description: "Level 3 classification approved for VAL-2025-0118-002 by Senior Risk Officer Sarah Chen",
      timestamp: "15 minutes ago",
      runId: "VAL-2025-0118-002",
      approver: "Sarah Chen",
      decision: "Approved with conditions",
      icon: "CheckCircle",
      iconColor: "success-600"
    },
    {
      id: "3",
      title: "Policy Update",
      description: "Fair Value Measurement Policy v2.1 updated to include new exotic derivative classification guidelines",
      timestamp: "2 hours ago",
      policy: "FVM-001-2024",
      version: "v2.1 → v2.2",
      updatedBy: "Alex Johnson",
      icon: "FileText",
      iconColor: "info-600"
    },
    {
      id: "4",
      title: "Risk Limit Breach",
      description: "Portfolio VaR exceeded daily limit by 2.3% triggering automatic risk review process",
      timestamp: "4 hours ago",
      limitType: "Daily VaR",
      breach: "+2.3%",
      status: "Under review",
      icon: "Shield",
      iconColor: "warning-600"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "compliant":
        return "bg-success-600 bg-opacity-20 text-success-600"
      case "expiring":
      case "partial":
      case "warning":
        return "bg-warning-600 bg-opacity-20 text-warning-600"
      case "under_review":
      case "in_progress":
        return "bg-info-600 bg-opacity-20 text-info-600"
      case "non_compliant":
      case "violations":
        return "bg-danger-600 bg-opacity-20 text-danger-600"
      default:
        return "bg-gray-600 bg-opacity-20 text-gray-300"
    }
  }

  const getFrameworkColor = (framework: string) => {
    switch (framework) {
      case "IFRS-13":
        return "bg-info-600 bg-opacity-20 text-info-600"
      case "Basel III":
        return "bg-warning-600 bg-opacity-20 text-warning-600"
      case "CCAR":
        return "bg-success-600 bg-opacity-20 text-success-600"
      case "Internal Risk":
        return "bg-gray-600 bg-opacity-20 text-gray-300"
      default:
        return "bg-gray-600 bg-opacity-20 text-gray-300"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-warning-600 bg-opacity-20 text-warning-600"
      case "medium":
        return "bg-info-600 bg-opacity-20 text-info-600"
      case "low":
        return "bg-gray-600 bg-opacity-20 text-gray-300"
      default:
        return "bg-gray-600 bg-opacity-20 text-gray-300"
    }
  }

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      FileText,
      Shield,
      TrendingUp,
      AlertTriangle,
      Calculator,
      Book,
      Building,
      Flag,
      ShieldCheck
    }
    return icons[iconName] || FileText
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <section className="bg-gray-800 border-b border-gray-700 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-2">Governance & Policy Management</h1>
            <p className="text-gray-300">Manage policy documents, compliance status, and governance requirements across all valuation runs</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-300">Last Policy Update</div>
              <div className="text-lg font-medium text-white">2025-01-15 14:30 UTC</div>
            </div>
            
            <div className="flex space-x-2">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Policy
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Status
              </Button>
              <Button className="bg-gray-700 hover:bg-gray-600 text-white">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Governance Overview */}
      <section className="px-8 py-6">
        <h2 className="text-xl font-semibold text-white mb-6">Governance Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-xs text-gray-300 bg-gray-700 px-2 py-1 rounded">98.2% compliance</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">187</div>
              <div className="text-sm text-gray-300">Compliant Runs</div>
              <div className="mt-3 text-xs text-gray-400">Out of 192 total runs</div>
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
              <div className="text-3xl font-bold text-white mb-1">5</div>
              <div className="text-sm text-gray-300">Policy Violations</div>
              <div className="mt-3 text-xs text-gray-400">Pending remediation</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs text-gray-300 bg-gray-700 px-2 py-1 rounded">Active policies</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">24</div>
              <div className="text-sm text-gray-300">Policy Documents</div>
              <div className="mt-3 text-xs text-gray-400">Across all frameworks</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-red-600" />
                </div>
                <span className="text-xs text-gray-300 bg-gray-700 px-2 py-1 rounded">Expiring soon</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">3</div>
              <div className="text-sm text-gray-300">Expiring Policies</div>
              <div className="mt-3 text-xs text-gray-400">Within 30 days</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Compliance Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-white">Compliance Trends</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="bg-gray-700 text-gray-300">7D</Button>
                  <Button variant="outline" size="sm" className="bg-green-600 text-white">30D</Button>
                  <Button variant="outline" size="sm" className="bg-gray-700 text-gray-300">90D</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div id="compliance-chart" className="h-64 bg-gray-700 rounded flex items-center justify-center">
                <span className="text-gray-400">Chart placeholder</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-white">Policy Framework Distribution</CardTitle>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4 text-gray-300" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div id="framework-chart" className="h-64 bg-gray-700 rounded flex items-center justify-center">
                <span className="text-gray-400">Chart placeholder</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Active Policy Documents */}
      <section className="px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Active Policy Documents</h2>
          <div className="flex items-center space-x-3">
            <Select value={selectedFramework} onValueChange={setSelectedFramework}>
              <SelectTrigger className="w-48 bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="All Frameworks" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Frameworks</SelectItem>
                <SelectItem value="IFRS-13">IFRS-13</SelectItem>
                <SelectItem value="Basel III">Basel III</SelectItem>
                <SelectItem value="CCAR">CCAR</SelectItem>
                <SelectItem value="Internal Risk">Internal Risk</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48 bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expiring">Expiring</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-gray-700 hover:bg-gray-600 text-white">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
        
        <Card className="bg-gray-800 border-gray-700">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-700">
                <TableRow>
                  <TableHead className="text-gray-300">Policy Document</TableHead>
                  <TableHead className="text-gray-300">Framework</TableHead>
                  <TableHead className="text-gray-300">Version</TableHead>
                  <TableHead className="text-gray-300">Effective Date</TableHead>
                  <TableHead className="text-gray-300">Expiry Date</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Compliance</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {policyDocuments.map((doc) => {
                  const IconComponent = getIcon(doc.icon)
                  return (
                    <TableRow key={doc.id} className="hover:bg-gray-750">
                      <TableCell>
                        <div className="flex items-center">
                          <div className={`w-10 h-10 bg-${doc.iconColor} bg-opacity-20 rounded-lg flex items-center justify-center mr-3`}>
                            <IconComponent className={`w-5 h-5 text-${doc.iconColor}`} />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{doc.name}</div>
                            <div className="text-xs text-gray-300">{doc.code}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getFrameworkColor(doc.framework)}>
                          {doc.framework}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-white">{doc.version}</TableCell>
                      <TableCell className="text-sm text-gray-300">{doc.effectiveDate}</TableCell>
                      <TableCell className="text-sm text-gray-300">{doc.expiryDate}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(doc.status)}>
                          {doc.status === "active" ? "Active" : 
                           doc.status === "expiring" ? "Expiring Soon" : "Under Review"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-700 rounded-full h-2 mr-2">
                            <div 
                              className={`h-2 rounded-full ${
                                doc.compliance >= 95 ? "bg-green-600" :
                                doc.compliance >= 80 ? "bg-yellow-600" : "bg-red-600"
                              }`}
                              style={{ width: `${doc.compliance}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-300">{doc.compliance}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4 text-gray-300 hover:text-white" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4 text-gray-300 hover:text-white" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4 text-gray-300 hover:text-white" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
          
          <div className="px-6 py-4 border-t border-gray-700 bg-gray-800">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Showing 5 of 24 policies</span>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="bg-gray-700 text-gray-300">Previous</Button>
                <Button variant="outline" size="sm" className="bg-green-600 text-white">1</Button>
                <Button variant="outline" size="sm" className="text-gray-300">2</Button>
                <Button variant="outline" size="sm" className="text-gray-300">3</Button>
                <Button variant="outline" size="sm" className="bg-gray-700 text-gray-300">Next</Button>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Policy Compliance Status */}
      <section className="px-8 py-6">
        <h2 className="text-xl font-semibold text-white mb-6">Policy Compliance Status Across Runs</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-white">Compliance Status by Run</CardTitle>
                  <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                    <SelectTrigger className="w-48 bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Last 30 Days" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7D">Last 7 Days</SelectItem>
                      <SelectItem value="30D">Last 30 Days</SelectItem>
                      <SelectItem value="90D">Last 90 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceRuns.map((run) => (
                    <div key={run.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          run.status === "compliant" ? "bg-green-600" :
                          run.status === "partial" ? "bg-yellow-600" :
                          run.status === "non_compliant" ? "bg-red-600" : "bg-blue-600"
                        }`}></div>
                        <div>
                          <div className="text-sm font-medium text-white">{run.name}</div>
                          <div className="text-xs text-gray-300">{run.description}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className={`text-sm font-medium ${
                            run.status === "compliant" ? "text-green-600" :
                            run.status === "partial" ? "text-yellow-600" :
                            run.status === "non_compliant" ? "text-red-600" : "text-blue-600"
                          }`}>
                            {run.status === "compliant" ? "Compliant" :
                             run.status === "partial" ? "Partial Compliance" :
                             run.status === "non_compliant" ? "Non-Compliant" : "In Progress"}
                          </div>
                          <div className="text-xs text-gray-300">
                            {run.status === "in_progress" ? "Checking policies..." : `${run.policiesPassed}/${run.totalPolicies} policies passed`}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-4 h-4 text-gray-300 hover:text-white" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button variant="link" className="text-green-600 hover:text-green-500">
                    View All Runs <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">Policy Violation Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <span className="text-sm text-gray-300">IFRS-13 Level 3 Documentation</span>
                    </div>
                    <span className="text-sm text-red-600 font-medium">3</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                      <span className="text-sm text-gray-300">Model Validation Requirements</span>
                    </div>
                    <span className="text-sm text-yellow-600 font-medium">2</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm text-gray-300">Risk Disclosure Standards</span>
                    </div>
                    <span className="text-sm text-blue-600 font-medium">1</span>
                  </div>
                </div>
                
                <Button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Review Violations
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">Remediation Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="text-white font-medium mb-1">High Priority</div>
                    <div className="text-xs text-gray-300">Update Level 3 rationale documentation</div>
                    <div className="text-xs text-red-600 mt-1">Due: 2025-01-20</div>
                  </div>
                  
                  <div className="text-sm">
                    <div className="text-white font-medium mb-1">Medium Priority</div>
                    <div className="text-xs text-gray-300">Validate exotic derivative models</div>
                    <div className="text-xs text-yellow-600 mt-1">Due: 2025-01-25</div>
                  </div>
                  
                  <div className="text-sm">
                    <div className="text-white font-medium mb-1">Low Priority</div>
                    <div className="text-xs text-gray-300">Enhance risk disclosure reports</div>
                    <div className="text-xs text-blue-600 mt-1">Due: 2025-01-30</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* RAG Knowledge Base Integration */}
      <section className="px-8 py-6">
        <h2 className="text-xl font-semibold text-white mb-6">RAG Knowledge Base & Policy Sources</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-white">Knowledge Base Sources</CardTitle>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Update Index
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {knowledgeSources.map((source, index) => {
                  const IconComponent = getIcon(source.icon)
                  return (
                    <div key={index} className="border border-gray-700 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 bg-${source.iconColor} bg-opacity-20 rounded-lg flex items-center justify-center`}>
                            <IconComponent className={`w-5 h-5 text-${source.iconColor}`} />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{source.name}</h4>
                            <p className="text-xs text-gray-300">{source.description}</p>
                          </div>
                        </div>
                        <Badge className={source.status === "indexed" ? "bg-green-600 bg-opacity-20 text-green-600" : "bg-yellow-600 bg-opacity-20 text-yellow-600"}>
                          {source.status === "indexed" ? "Indexed" : "Updating"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-xs text-gray-400">
                        <div>Documents: {source.documents}</div>
                        <div>Last Updated: {source.lastUpdated}</div>
                        <div>Chunks: {source.chunks}</div>
                        <div>Embeddings: {source.status === "indexed" ? "Current" : "In Progress"}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-white">AI Agent Policy Queries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-white font-medium text-sm">IFRS-13 Level 3 Classification</h4>
                    <span className="text-xs text-gray-400">2 min ago</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">"What are the requirements for Level 3 fair value measurements under IFRS-13?"</p>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-600 bg-opacity-20 text-green-600">Answered</Badge>
                    <span className="text-xs text-gray-400">Sources: IFRS-13 §86-90</span>
                  </div>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-white font-medium text-sm">Basel III CVA Requirements</h4>
                    <span className="text-xs text-gray-400">8 min ago</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">"How should CVA be calculated for derivatives under Basel III framework?"</p>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-600 bg-opacity-20 text-green-600">Answered</Badge>
                    <span className="text-xs text-gray-400">Sources: Basel III §CR7.1-7.8</span>
                  </div>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-white font-medium text-sm">Model Validation Standards</h4>
                    <span className="text-xs text-gray-400">15 min ago</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">"What documentation is required for exotic derivative model validation?"</p>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-600 bg-opacity-20 text-green-600">Answered</Badge>
                    <span className="text-xs text-gray-400">Sources: Internal MVS-012</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-700 pt-4">
                <h4 className="text-white font-medium mb-3">Query Knowledge Base</h4>
                <div className="relative">
                  <Input 
                    placeholder="Ask about policies, regulations, or requirements..." 
                    className="w-full bg-gray-700 border-gray-600 text-white pr-12"
                  />
                  <Button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-500" variant="ghost" size="sm">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Button variant="outline" size="sm" className="bg-gray-700 text-white text-xs">Level 3 Requirements</Button>
                  <Button variant="outline" size="sm" className="bg-gray-700 text-white text-xs">CVA Calculation</Button>
                  <Button variant="outline" size="sm" className="bg-gray-700 text-white text-xs">Model Validation</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Policy Gate Checks */}
      <section className="px-8 py-6">
        <h2 className="text-xl font-semibold text-white mb-6">Policy Gate Checks & Automated Controls</h2>
        
        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-white">Automated Gate Configuration</CardTitle>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Gate
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-700">
              {policyGates.map((gate) => {
                const IconComponent = getIcon(gate.icon)
                return (
                  <div key={gate.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 bg-${gate.iconColor} bg-opacity-20 rounded-lg flex items-center justify-center`}>
                          <IconComponent className={`w-6 h-6 text-${gate.iconColor}`} />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">{gate.name}</h4>
                          <p className="text-sm text-gray-300">{gate.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(gate.status)}>
                          {gate.status === "active" ? "Active" : 
                           gate.status === "warning" ? "Warning" : "Violations"}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Cog className="w-4 h-4 text-gray-300 hover:text-white" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-gray-700 rounded-lg p-3">
                        <div className="text-xs text-gray-300 mb-1">Trigger Condition</div>
                        <div className="text-sm text-white">{gate.triggerCondition}</div>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-3">
                        <div className="text-xs text-gray-300 mb-1">Check Type</div>
                        <div className="text-sm text-white">{gate.checkType}</div>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-3">
                        <div className="text-xs text-gray-300 mb-1">Success Rate</div>
                        <div className={`text-sm ${
                          gate.successRate >= 95 ? "text-green-600" :
                          gate.successRate >= 80 ? "text-yellow-600" : "text-red-600"
                        }`}>{gate.successRate}%</div>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-400">
                      <strong>Validation Rules:</strong> {gate.rules}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Governance Workflow & Approvals */}
      <section className="px-8 py-6">
        <h2 className="text-xl font-semibold text-white mb-6">Governance Workflow & Approval Process</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-white">Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApprovals.map((approval) => {
                  const IconComponent = getIcon(approval.icon)
                  return (
                    <div key={approval.id} className={`border rounded-lg p-4 ${
                      approval.priority === "high" ? "border-yellow-600 bg-yellow-600 bg-opacity-5" :
                      approval.priority === "medium" ? "border-blue-600 bg-blue-600 bg-opacity-5" :
                      "border-gray-600 bg-gray-700 bg-opacity-50"
                    }`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 bg-${approval.iconColor} bg-opacity-20 rounded-lg flex items-center justify-center`}>
                            <IconComponent className={`w-5 h-5 text-${approval.iconColor}`} />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{approval.title}</h4>
                            {approval.runId && (
                              <p className="text-xs text-gray-300">{approval.runId} • {approval.runDescription}</p>
                            )}
                          </div>
                        </div>
                        <Badge className={getPriorityColor(approval.priority)}>
                          {approval.priority === "high" ? "High Priority" :
                           approval.priority === "medium" ? "Medium Priority" : "Low Priority"}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-300 mb-4">{approval.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                          <span>Assigned to: {approval.assignedTo}</span>
                          <span>•</span>
                          <span>Due: {approval.dueDate}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs">
                            Approve
                          </Button>
                          <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white text-xs">
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              
              <Button variant="link" className="w-full mt-6 text-center text-sm text-green-600 hover:text-green-500">
                View All Pending Approvals <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-white">Approval Workflow Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-600"></div>
                  
                  <div className="relative flex items-start space-x-4 pb-6">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white text-sm" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Initial Validation</h4>
                      <p className="text-sm text-gray-300">Automated policy gates completed</p>
                      <span className="text-xs text-gray-400">Completed: 2025-01-18 08:15</span>
                    </div>
                  </div>
                  
                  <div className="relative flex items-start space-x-4 pb-6">
                    <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                      <Clock className="w-4 h-4 text-white text-sm" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Risk Review</h4>
                      <p className="text-sm text-gray-300">Senior risk officer assessment in progress</p>
                      <span className="text-xs text-gray-400">Started: 2025-01-18 08:20</span>
                    </div>
                  </div>
                  
                  <div className="relative flex items-start space-x-4 pb-6">
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                      <Circle className="w-4 h-4 text-white text-xs" />
                    </div>
                    <div>
                      <h4 className="text-gray-300 font-medium">Model Validation</h4>
                      <p className="text-sm text-gray-400">Pending risk review completion</p>
                      <span className="text-xs text-gray-400">Estimated: 2025-01-18 10:00</span>
                    </div>
                  </div>
                  
                  <div className="relative flex items-start space-x-4 pb-6">
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                      <Circle className="w-4 h-4 text-white text-xs" />
                    </div>
                    <div>
                      <h4 className="text-gray-300 font-medium">Final Approval</h4>
                      <p className="text-sm text-gray-400">Chief Risk Officer sign-off required</p>
                      <span className="text-xs text-gray-400">Estimated: 2025-01-18 14:00</span>
                    </div>
                  </div>
                  
                  <div className="relative flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                      <Circle className="w-4 h-4 text-white text-xs" />
                    </div>
                    <div>
                      <h4 className="text-gray-300 font-medium">Export Enabled</h4>
                      <p className="text-sm text-gray-400">Documentation ready for distribution</p>
                      <span className="text-xs text-gray-400">Estimated: 2025-01-18 14:30</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                <h4 className="text-white font-medium mb-2">Current Bottlenecks</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Level 3 Reviews:</span>
                    <span className="text-yellow-600">3 pending</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Model Validations:</span>
                    <span className="text-blue-600">2 in progress</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Policy Updates:</span>
                    <span className="text-gray-300">1 scheduled</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Compliance Reporting & Audit Trail */}
      <section className="px-8 py-6 pb-8">
        <h2 className="text-xl font-semibold text-white mb-6">Compliance Reporting & Audit Trail</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-white">Recent Governance Events</CardTitle>
                  <Select value={selectedEventType} onValueChange={setSelectedEventType}>
                    <SelectTrigger className="w-48 bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="All Events" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Events</SelectItem>
                      <SelectItem value="violations">Policy Violations</SelectItem>
                      <SelectItem value="approvals">Approvals</SelectItem>
                      <SelectItem value="gates">Gate Failures</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {governanceEvents.map((event) => {
                    const IconComponent = getIcon(event.icon)
                    return (
                      <div key={event.id} className="flex items-start space-x-4 p-4 bg-gray-700 rounded-lg">
                        <div className={`w-10 h-10 bg-${event.iconColor} bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className={`w-5 h-5 text-${event.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-white font-medium">{event.title}</h4>
                            <span className="text-xs text-gray-300">{event.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-300 mb-3">{event.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-400">
                            {event.runId && (
                              <>
                                <span>Run ID: <span className="text-green-600 font-mono">{event.runId}</span></span>
                                {event.gate && <span>Gate: {event.gate}</span>}
                                {event.action && <span>Action: {event.action}</span>}
                              </>
                            )}
                            {event.approver && (
                              <>
                                <span>Approver: {event.approver}</span>
                                {event.decision && <span>Decision: {event.decision}</span>}
                              </>
                            )}
                            {event.policy && (
                              <>
                                <span>Policy: <span className="text-green-600 font-mono">{event.policy}</span></span>
                                {event.version && <span>Version: {event.version}</span>}
                                {event.updatedBy && <span>Updated by: {event.updatedBy}</span>}
                              </>
                            )}
                            {event.limitType && (
                              <>
                                <span>Limit Type: {event.limitType}</span>
                                {event.breach && <span>Breach: {event.breach}</span>}
                                {event.status && <span>Status: {event.status}</span>}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                
                <Button variant="link" className="w-full mt-6 text-center text-sm text-green-600 hover:text-green-500">
                  View Complete Audit Log <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">Compliance Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-650 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-red-600" />
                      <div>
                        <div className="text-sm font-medium text-white">IFRS-13 Monthly Report</div>
                        <div className="text-xs text-gray-300">December 2024</div>
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-gray-300 hover:text-white" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-650 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="text-sm font-medium text-white">Policy Compliance Matrix</div>
                        <div className="text-xs text-gray-300">Q4 2024</div>
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-gray-300 hover:text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}