"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
  ExternalLink
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
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
        url: "https://github.com/AbdullahHassan176/Valuation-Agent-frontend/blob/main/run-001-USD-5Y-IRS-Report.md"
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
        url: "https://github.com/AbdullahHassan176/Valuation-Agent-frontend/blob/main/run-001-USD-5Y-IRS-CVA-Analysis.md"
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
        url: "https://github.com/AbdullahHassan176/Valuation-Agent-frontend/blob/main/run-002-EUR-USD-CCS-Report.md"
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
        url: "https://github.com/AbdullahHassan176/Valuation-Agent-frontend/blob/main/run-002-EUR-USD-CCS-CVA-Analysis.md"
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
        url: "https://github.com/AbdullahHassan176/Valuation-Agent-frontend/blob/main/Portfolio-Summary-Report.md"
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
        url: "https://github.com/AbdullahHassan176/Valuation-Agent-frontend/blob/main/Portfolio-CVA-Analytics.md"
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
        url: "https://github.com/AbdullahHassan176/Valuation-Agent-frontend/blob/main/Advanced-Risk-Analytics.md"
      }
    ]
    
    setReports(mockReports)
    setLoading(false)
  }, [])

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
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
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
          <div className="flex gap-3 mt-4 sm:mt-0">
            <Button variant="outline" className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <FileText className="h-4 w-4 mr-2" />
              Generate New Report
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <Card key={report.id} className="bg-gray-800 border-gray-700 hover:bg-gray-700/50 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${report.color}`}>
                      {report.icon}
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{report.title}</CardTitle>
                      <CardDescription className="text-gray-400">
                        {getTypeBadge(report.type)} {getStatusBadge(report.status)}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-4">{report.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <span>Last updated: {report.lastUpdated}</span>
                  <span>{report.size}</span>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                    onClick={() => window.open(report.url, '_blank')}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                    onClick={() => window.open(report.url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Instructions */}
        <Card className="mt-8 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">How to View Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                <div>
                  <p className="text-white font-medium">Click "View" or "Open" on any report card above</p>
                  <p className="text-gray-400 text-sm">This will open the report in a new tab on GitHub</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                <div>
                  <p className="text-white font-medium">View the formatted markdown report</p>
                  <p className="text-gray-400 text-sm">GitHub will display the report with proper formatting</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                <div>
                  <p className="text-white font-medium">Download or print the report</p>
                  <p className="text-gray-400 text-sm">Use GitHub's download/print options for offline viewing</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
