"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  LineChart, 
  Clock, 
  AlertTriangle, 
  Globe, 
  Search, 
  Bell, 
  HelpCircle, 
  User, 
  ChevronDown,
  Plus,
  Upload,
  RotateCcw,
  Filter,
  X,
  Grid3X3 as ThLarge,
  List,
  ArrowUpDown as Sort,
  ArrowDown as SortDown,
  Eye,
  PlusCircle,
  Download,
  RefreshCw as Sync,
  Bug,
  Redo,
  DollarSign,
  Euro,
  PoundSterling,
  JapaneseYen as Yen,
  CheckCircle,
  XCircle as TimesCircle,
  Info,
  Wrench as Tools,
  TrendingUp as ChartLine,
  ExternalLink,
  Bot as Robot,
  Minus,
  Send as PaperPlane,
  MessageCircle as Comment,
  Settings as Cogs
} from "lucide-react"

interface CurveData {
  id: string
  name: string
  code: string
  currency: string
  type: string
  lastUpdated: string
  status: 'active' | 'stale' | 'error' | 'building'
  nodes: number
  version: string
  icon: string
  iconColor: string
}

interface ValidationIssue {
  id: string
  title: string
  description: string
  timestamp: string
  curve: string
  severity: 'warning' | 'error' | 'info'
  affectedTenors?: string
  impact: string
  error?: string
}

interface ActivityItem {
  id: string
  type: 'bootstrap' | 'refresh' | 'warning' | 'export' | 'chat'
  title: string
  description: string
  timestamp: string
  curve?: string
  details?: string
  icon: string
  iconColor: string
}

const mockCurves: CurveData[] = [
  {
    id: '1',
    name: 'USD OIS',
    code: 'USD-OIS-SOFR',
    currency: 'USD',
    type: 'OIS',
    lastUpdated: '2 min ago',
    status: 'active',
    nodes: 47,
    version: 'v2.1.4',
    icon: 'DollarSign',
    iconColor: 'success'
  },
  {
    id: '2',
    name: 'EUR OIS',
    code: 'EUR-OIS-ESTR',
    currency: 'EUR',
    type: 'OIS',
    lastUpdated: '1 min ago',
    status: 'active',
    nodes: 45,
    version: 'v2.1.4',
    icon: 'Euro',
    iconColor: 'info'
  },
  {
    id: '3',
    name: 'GBP OIS',
    code: 'GBP-OIS-SONIA',
    currency: 'GBP',
    type: 'OIS',
    lastUpdated: '8 min ago',
    status: 'stale',
    nodes: 42,
    version: 'v2.1.3',
    icon: 'PoundSterling',
    iconColor: 'warning'
  },
  {
    id: '4',
    name: 'USD SOFR 3M',
    code: 'USD-SOFR-3M',
    currency: 'USD',
    type: 'SOFR',
    lastUpdated: '3 min ago',
    status: 'active',
    nodes: 38,
    version: 'v2.1.4',
    icon: 'DollarSign',
    iconColor: 'success'
  },
  {
    id: '5',
    name: 'JPY OIS',
    code: 'JPY-OIS-TONA',
    currency: 'JPY',
    type: 'OIS',
    lastUpdated: '15 min ago',
    status: 'error',
    nodes: 41,
    version: 'v2.1.2',
    icon: 'Yen',
    iconColor: 'danger'
  },
  {
    id: '6',
    name: 'EUR 6M EURIBOR',
    code: 'EUR-EURIBOR-6M',
    currency: 'EUR',
    type: 'EURIBOR',
    lastUpdated: '5 min ago',
    status: 'active',
    nodes: 36,
    version: 'v2.1.4',
    icon: 'Euro',
    iconColor: 'info'
  }
]

const mockValidationIssues: ValidationIssue[] = [
  {
    id: '1',
    title: 'GBP OIS Data Gap',
    description: 'Missing market data for 5Y-7Y tenor range. Curve interpolation may be unreliable.',
    timestamp: '8 min ago',
    curve: 'GBP-OIS-SONIA',
    severity: 'warning',
    affectedTenors: '5Y, 6Y, 7Y',
    impact: 'Medium'
  },
  {
    id: '2',
    title: 'JPY OIS Build Failed',
    description: 'Curve construction failed due to negative rates causing numerical instability in bootstrap process.',
    timestamp: '15 min ago',
    curve: 'JPY-OIS-TONA',
    severity: 'error',
    impact: 'High',
    error: 'BOOTSTRAP_FAILED'
  },
  {
    id: '3',
    title: 'CHF Forward Curve Outlier',
    description: 'Unusual spike detected in 3M forward rate at 2Y tenor. May indicate data quality issue.',
    timestamp: '22 min ago',
    curve: 'CHF-LIBOR-3M',
    severity: 'info',
    impact: 'Low'
  }
]

const mockActivity: ActivityItem[] = [
  {
    id: '1',
    type: 'bootstrap',
    title: 'New Curve Bootstrapped',
    description: 'USD OIS curve successfully built with 47 market data points',
    timestamp: '2 minutes ago',
    curve: 'USD-OIS-SOFR',
    details: 'Build Time: 1.23s, Status: Active',
    icon: 'PlusCircle',
    iconColor: 'success'
  },
  {
    id: '2',
    type: 'refresh',
    title: 'Curve Data Refreshed',
    description: 'EUR OIS curve updated with latest market rates from Bloomberg',
    timestamp: '5 minutes ago',
    curve: 'EUR-OIS-ESTR',
    details: 'Source: Bloomberg, Changes: 3 nodes',
    icon: 'Sync',
    iconColor: 'warning'
  },
  {
    id: '3',
    type: 'warning',
    title: 'Validation Warning',
    description: 'GBP OIS curve flagged for data gap in 5Y-7Y tenor range',
    timestamp: '8 minutes ago',
    curve: 'GBP-OIS-SONIA',
    details: 'Issue: Missing Data, Impact: Medium',
    icon: 'AlertTriangle',
    iconColor: 'danger'
  },
  {
    id: '4',
    type: 'export',
    title: 'Curve Export Completed',
    description: 'USD SOFR 3M curve exported to CSV format with all node data',
    timestamp: '12 minutes ago',
    curve: 'USD-SOFR-3M',
    details: 'Format: CSV, Size: 4.2 KB',
    icon: 'Download',
    iconColor: 'info'
  },
  {
    id: '5',
    type: 'chat',
    title: 'AI Assistant Query',
    description: 'User requested explanation of curve interpolation methods via chat agent',
    timestamp: '18 minutes ago',
    details: 'Topic: Interpolation, User: Alex Johnson, Response: Educational',
    icon: 'Robot',
    iconColor: 'brand'
  }
]

const mockCurveNodes = [
  { tenor: '1M', maturity: '2025-02-18', marketRate: '4.325', zeroRate: '4.325', forwardRate: '4.325', discountFactor: '0.99638', source: 'Market' },
  { tenor: '3M', maturity: '2025-04-18', marketRate: '4.287', zeroRate: '4.287', forwardRate: '4.268', discountFactor: '0.98934', source: 'Market' },
  { tenor: '6M', maturity: '2025-07-18', marketRate: '4.195', zeroRate: '4.195', forwardRate: '4.103', discountFactor: '0.97912', source: 'Market' },
  { tenor: '1Y', maturity: '2026-01-18', marketRate: '3.875', zeroRate: '3.875', forwardRate: '3.554', discountFactor: '0.96234', source: 'Market' },
  { tenor: '2Y', maturity: '2027-01-18', marketRate: '3.625', zeroRate: '3.625', forwardRate: '3.375', discountFactor: '0.92876', source: 'Market' },
  { tenor: '5Y', maturity: '2030-01-18', marketRate: '3.450', zeroRate: '3.450', forwardRate: '3.389', discountFactor: '0.84012', source: 'Market' },
  { tenor: '10Y', maturity: '2035-01-18', marketRate: '3.675', zeroRate: '3.675', forwardRate: '3.901', discountFactor: '0.69234', source: 'Market' },
  { tenor: '30Y', maturity: '2055-01-18', marketRate: '3.825', zeroRate: '3.825', forwardRate: '3.975', discountFactor: '0.32456', source: 'Extrapolated' }
]

export default function CurvesPage() {
  const [selectedCurrency, setSelectedCurrency] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [asOfDate, setAsOfDate] = useState("2025-01-18")
  const [showChat, setShowChat] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
      case 'stale': return <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
      case 'error': return <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
      case 'building': return <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
      default: return <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-500'
      case 'stale': return 'text-yellow-500'
      case 'error': return 'text-red-500'
      case 'building': return 'text-blue-500'
      default: return 'text-gray-500'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'OIS': return 'bg-green-500 bg-opacity-20 text-green-500'
      case 'SOFR': return 'bg-blue-500 bg-opacity-20 text-blue-500'
      case 'EURIBOR': return 'bg-yellow-500 bg-opacity-20 text-yellow-500'
      default: return 'bg-gray-500 bg-opacity-20 text-gray-500'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'warning': return 'bg-yellow-500 bg-opacity-10 border-yellow-500'
      case 'error': return 'bg-red-500 bg-opacity-10 border-red-500'
      case 'info': return 'bg-blue-500 bg-opacity-10 border-blue-500'
      default: return 'bg-gray-500 bg-opacity-10 border-gray-500'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'error': return <TimesCircle className="w-5 h-5 text-red-500" />
      case 'info': return <Info className="w-5 h-5 text-blue-500" />
      default: return <Info className="w-5 h-5 text-gray-500" />
    }
  }

  const getActivityIcon = (type: string, color: string) => {
    const iconProps = "w-5 h-5"
    switch (type) {
      case 'bootstrap': return <PlusCircle className={`${iconProps} text-green-500`} />
      case 'refresh': return <Sync className={`${iconProps} text-yellow-500`} />
      case 'warning': return <AlertTriangle className={`${iconProps} text-red-500`} />
      case 'export': return <Download className={`${iconProps} text-blue-500`} />
      case 'chat': return <Robot className={`${iconProps} text-green-500`} />
      default: return <Info className={`${iconProps} text-gray-500`} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <section className="bg-gray-800 border-b border-gray-700 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-2">Curves Catalog</h1>
            <p className="text-gray-300">Manage and bootstrap yield curves for valuation models</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-300">As of</div>
              <div className="text-lg font-medium text-white">2025-01-18 08:22 UTC</div>
            </div>
            
            <div className="flex space-x-2">
              <Button className="bg-green-500 hover:bg-green-600 text-black">
                <Plus className="w-4 h-4 mr-2" />
                Bootstrap Curve
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                <Upload className="w-4 h-4 mr-2" />
                Import Data
              </Button>
              <Button className="bg-gray-700 hover:bg-gray-600 text-white">
                <RotateCcw className="w-4 h-4 mr-2" />
                Refresh All
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Curve Statistics */}
      <section className="px-8 py-6">
        <h2 className="text-xl font-semibold text-white mb-6">Curve Statistics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <LineChart className="w-6 h-6 text-green-500" />
                </div>
                <span className="text-xs text-gray-300 bg-gray-700 px-2 py-1 rounded">Active</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">142</div>
              <div className="text-sm text-gray-300">Total Curves</div>
              <div className="mt-3 text-xs text-gray-400">Across all currencies</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-500" />
                </div>
                <span className="text-xs text-gray-300 bg-gray-700 px-2 py-1 rounded">Live</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">98.7%</div>
              <div className="text-sm text-gray-300">Fresh Data</div>
              <div className="mt-3 text-xs text-gray-400">Updated within 5 min</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-yellow-500" />
                </div>
                <span className="text-xs text-yellow-500 bg-yellow-500 bg-opacity-20 px-2 py-1 rounded">Attention</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">3</div>
              <div className="text-sm text-gray-300">Validation Issues</div>
              <div className="mt-3 text-xs text-gray-400">Requires review</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-green-500" />
                </div>
                <span className="text-xs text-gray-300 bg-gray-700 px-2 py-1 rounded">Supported</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">12</div>
              <div className="text-sm text-gray-300">Currencies</div>
              <div className="mt-3 text-xs text-gray-400">Major & emerging markets</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Filters */}
      <section className="px-8 py-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-3">
                <Label className="text-sm font-medium text-gray-300">Currency:</Label>
                <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                  <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="All Currencies" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Currencies</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="JPY">JPY</SelectItem>
                    <SelectItem value="CHF">CHF</SelectItem>
                    <SelectItem value="CAD">CAD</SelectItem>
                    <SelectItem value="AUD">AUD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-3">
                <Label className="text-sm font-medium text-gray-300">Curve Type:</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    <SelectItem value="OIS">OIS</SelectItem>
                    <SelectItem value="LIBOR">LIBOR</SelectItem>
                    <SelectItem value="SOFR">SOFR</SelectItem>
                    <SelectItem value="ESTR">€STR</SelectItem>
                    <SelectItem value="SONIA">SONIA</SelectItem>
                    <SelectItem value="GOVT">Government</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-3">
                <Label className="text-sm font-medium text-gray-300">Status:</Label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="stale">Stale</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="building">Building</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-3">
                <Label className="text-sm font-medium text-gray-300">As of Date:</Label>
                <Input 
                  type="date" 
                  value={asOfDate}
                  onChange={(e) => setAsOfDate(e.target.value)}
                  className="w-40 bg-gray-700 border-gray-600 text-white"
                />
              </div>
              
              <div className="ml-auto flex space-x-2">
                <Button className="bg-gray-700 hover:bg-gray-600 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  Apply Filters
                </Button>
                <Button className="bg-gray-600 hover:bg-gray-500 text-gray-300">
                  <X className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Curves Catalog Table */}
      <section className="px-8 py-6">
        <Card className="bg-gray-800 border-gray-700 overflow-hidden">
          <CardHeader className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Available Curves</h3>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-300">Showing 142 curves</span>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={viewMode === 'grid' ? 'bg-green-500 text-black' : 'bg-gray-700 text-gray-300'}
                  >
                    <ThLarge className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={viewMode === 'list' ? 'bg-green-500 text-black' : 'bg-gray-700 text-gray-300'}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    <div className="flex items-center space-x-1 cursor-pointer hover:text-white">
                      <span>Curve Name</span>
                      <Sort className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    <div className="flex items-center space-x-1 cursor-pointer hover:text-white">
                      <span>Currency</span>
                      <Sort className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    <div className="flex items-center space-x-1 cursor-pointer hover:text-white">
                      <span>Type</span>
                      <Sort className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    <div className="flex items-center space-x-1 cursor-pointer hover:text-white">
                      <span>Last Updated</span>
                      <SortDown className="w-3 h-3 text-green-500" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nodes</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Version</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {mockCurves.map((curve) => (
                  <tr key={curve.id} className="hover:bg-gray-750 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 ${curve.iconColor === 'success' ? 'bg-green-500' : curve.iconColor === 'info' ? 'bg-blue-500' : curve.iconColor === 'warning' ? 'bg-yellow-500' : 'bg-red-500'} bg-opacity-20 rounded-lg flex items-center justify-center mr-3`}>
                          {curve.icon === 'DollarSign' && <DollarSign className="w-5 h-5 text-green-500" />}
                          {curve.icon === 'Euro' && <Euro className="w-5 h-5 text-blue-500" />}
                          {curve.icon === 'PoundSterling' && <PoundSterling className="w-5 h-5 text-yellow-500" />}
                          {curve.icon === 'Yen' && <Yen className="w-5 h-5 text-red-500" />}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{curve.name}</div>
                          <div className="text-xs text-gray-400 font-mono">{curve.code}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-white">{curve.currency}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(curve.type)}`}>
                        {curve.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">{curve.lastUpdated}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {getStatusIcon(curve.status)}
                        <span className={`text-sm ${getStatusColor(curve.status)}`}>
                          {curve.status.charAt(0).toUpperCase() + curve.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-white">{curve.nodes}</td>
                    <td className="px-6 py-4 text-sm text-gray-300 font-mono">{curve.version}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-green-500">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-blue-500">
                          <PlusCircle className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-yellow-500">
                          <Download className="w-4 h-4" />
                        </Button>
                        {curve.status === 'stale' && (
                          <Button variant="ghost" size="sm" className="text-gray-300 hover:text-yellow-500">
                            <Sync className="w-4 h-4" />
                          </Button>
                        )}
                        {curve.status === 'error' && (
                          <>
                            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-red-500">
                              <Bug className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-blue-500">
                              <Redo className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-gray-700 flex items-center justify-between">
            <div className="text-sm text-gray-300">
              Showing 1-10 of 142 curves
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled className="bg-gray-700 text-gray-300">
                Previous
              </Button>
              <Button size="sm" className="bg-green-500 text-black">1</Button>
              <Button variant="outline" size="sm" className="text-gray-300 hover:bg-gray-700">2</Button>
              <Button variant="outline" size="sm" className="text-gray-300 hover:bg-gray-700">3</Button>
              <span className="px-3 py-1 text-gray-300">...</span>
              <Button variant="outline" size="sm" className="text-gray-300 hover:bg-gray-700">15</Button>
              <Button variant="outline" size="sm" className="bg-gray-700 text-white hover:bg-gray-600">
                Next
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Validation Issues */}
      <section className="px-8 py-6">
        <h2 className="text-xl font-semibold text-white mb-6">Validation Issues</h2>
        
        <div className="space-y-4">
          {mockValidationIssues.map((issue) => (
            <Alert key={issue.id} className={`${getSeverityColor(issue.severity)} border`}>
              <div className="flex items-start space-x-4">
                <div className={`w-10 h-10 ${issue.severity === 'warning' ? 'bg-yellow-500' : issue.severity === 'error' ? 'bg-red-500' : 'bg-blue-500'} bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0`}>
                  {getSeverityIcon(issue.severity)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`font-semibold ${issue.severity === 'warning' ? 'text-yellow-500' : issue.severity === 'error' ? 'text-red-500' : 'text-blue-500'}`}>
                      {issue.title}
                    </h3>
                    <span className="text-xs text-gray-300 bg-gray-700 px-2 py-1 rounded">{issue.timestamp}</span>
                  </div>
                  <p className="text-white text-sm mb-3">{issue.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-300">
                    <span>Curve: <span className="text-green-500 font-mono">{issue.curve}</span></span>
                    {issue.affectedTenors && <span>Affected Tenors: {issue.affectedTenors}</span>}
                    {issue.error && <span>Error: {issue.error}</span>}
                    <span>Impact: {issue.impact}</span>
                  </div>
                  <div className="flex items-center space-x-3 mt-4">
                    {issue.severity === 'warning' && (
                      <>
                        <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                          <Tools className="w-4 h-4 mr-2" />
                          Auto-Remediate
                        </Button>
                        <Button className="bg-gray-700 hover:bg-gray-600 text-white">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </>
                    )}
                    {issue.severity === 'error' && (
                      <>
                        <Button className="bg-red-500 hover:bg-red-600 text-white">
                          <Redo className="w-4 h-4 mr-2" />
                          Retry Build
                        </Button>
                        <Button className="bg-gray-700 hover:bg-gray-600 text-white">
                          <Bug className="w-4 h-4 mr-2" />
                          Debug
                        </Button>
                      </>
                    )}
                    {issue.severity === 'info' && (
                      <>
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                          <ChartLine className="w-4 h-4 mr-2" />
                          Investigate
                        </Button>
                        <Button className="bg-gray-700 hover:bg-gray-600 text-white">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark Reviewed
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Alert>
          ))}
        </div>
      </section>

      {/* Featured Curve */}
      <section className="px-8 py-6">
        <h2 className="text-xl font-semibold text-white mb-6">Featured Curve: USD OIS</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Curve Visualization</h3>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" className="text-xs bg-gray-700 text-gray-300">Zero Rates</Button>
                  <Button size="sm" className="text-xs bg-green-500 text-black">Forward Rates</Button>
                  <Button size="sm" variant="outline" className="text-xs bg-gray-700 text-gray-300">Discount Factors</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div id="curve-chart" className="h-80 bg-gray-700 rounded-lg flex items-center justify-center">
                <p className="text-gray-400">Chart placeholder - Highcharts integration needed</p>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <h3 className="text-lg font-semibold text-white">Curve Metadata</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Curve ID:</span>
                  <span className="text-white font-mono">USD-OIS-SOFR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Currency:</span>
                  <span className="text-white">USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Index:</span>
                  <span className="text-white">SOFR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Day Count:</span>
                  <span className="text-white">ACT/360</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Calendar:</span>
                  <span className="text-white">USNY</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Business Day Convention:</span>
                  <span className="text-white">Modified Following</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Interpolation:</span>
                  <span className="text-white">Log-Linear</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Extrapolation:</span>
                  <span className="text-white">Flat Forward</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <h3 className="text-lg font-semibold text-white">Build Information</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Last Built:</span>
                  <span className="text-white">2025-01-18 08:20:15 UTC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Build Time:</span>
                  <span className="text-white">1.23 seconds</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Data Source:</span>
                  <span className="text-white">Bloomberg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Version:</span>
                  <span className="text-white font-mono">v2.1.4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Hash:</span>
                  <span className="text-white font-mono text-xs">a7f8d9e2...</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Curve Nodes Data Table */}
      <section className="px-8 py-6">
        <Card className="bg-gray-800 border-gray-700 overflow-hidden">
          <CardHeader className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">USD OIS Curve Nodes</h3>
              <div className="flex items-center space-x-3">
                <Button className="bg-gray-700 hover:bg-gray-600 text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
                <Button className="bg-green-500 hover:bg-green-600 text-black">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Node
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tenor</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Maturity Date</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Market Rate (%)</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Zero Rate (%)</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Forward Rate (%)</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Discount Factor</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {mockCurveNodes.map((node, index) => (
                  <tr key={index} className="hover:bg-gray-750 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-white">{node.tenor}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{node.maturity}</td>
                    <td className="px-6 py-4 text-sm text-white font-mono">{node.marketRate}</td>
                    <td className="px-6 py-4 text-sm text-white font-mono">{node.zeroRate}</td>
                    <td className="px-6 py-4 text-sm text-white font-mono">{node.forwardRate}</td>
                    <td className="px-6 py-4 text-sm text-white font-mono">{node.discountFactor}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        node.source === 'Market' 
                          ? 'bg-green-500 bg-opacity-20 text-green-500' 
                          : 'bg-blue-500 bg-opacity-20 text-blue-500'
                      }`}>
                        {node.source}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* Bootstrap Options */}
      <section className="px-8 py-6">
        <h2 className="text-xl font-semibold text-white mb-6">Bootstrap New Curve</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <h3 className="text-lg font-semibold text-white">Source Profiles</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border border-gray-600 rounded-lg p-4 hover:border-green-500 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-medium">Bloomberg Market Data</h4>
                  <span className="px-2 py-1 bg-green-500 bg-opacity-20 text-green-500 text-xs rounded-full">Live</span>
                </div>
                <p className="text-sm text-gray-300 mb-3">Real-time market rates from Bloomberg terminal with full tenor coverage</p>
                <div className="flex items-center space-x-4 text-xs text-gray-400">
                  <span>Update Frequency: Real-time</span>
                  <span>Coverage: 1M-50Y</span>
                  <span>Quality: High</span>
                </div>
              </div>
              
              <div className="border border-gray-600 rounded-lg p-4 hover:border-green-500 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-medium">Refinitiv Eikon</h4>
                  <span className="px-2 py-1 bg-green-500 bg-opacity-20 text-green-500 text-xs rounded-full">Live</span>
                </div>
                <p className="text-sm text-gray-300 mb-3">Market data from Refinitiv with comprehensive global coverage</p>
                <div className="flex items-center space-x-4 text-xs text-gray-400">
                  <span>Update Frequency: 1 min</span>
                  <span>Coverage: 1W-30Y</span>
                  <span>Quality: High</span>
                </div>
              </div>
              
              <div className="border border-gray-600 rounded-lg p-4 hover:border-green-500 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-medium">Manual Input</h4>
                  <span className="px-2 py-1 bg-yellow-500 bg-opacity-20 text-yellow-500 text-xs rounded-full">Static</span>
                </div>
                <p className="text-sm text-gray-300 mb-3">Custom rates entered manually for testing or historical scenarios</p>
                <div className="flex items-center space-x-4 text-xs text-gray-400">
                  <span>Update Frequency: Manual</span>
                  <span>Coverage: Custom</span>
                  <span>Quality: User Defined</span>
                </div>
              </div>
              
              <div className="border border-gray-600 rounded-lg p-4 hover:border-green-500 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-medium">CSV Upload</h4>
                  <span className="px-2 py-1 bg-blue-500 bg-opacity-20 text-blue-500 text-xs rounded-full">File</span>
                </div>
                <p className="text-sm text-gray-300 mb-3">Import curve data from CSV file with predefined format</p>
                <div className="flex items-center space-x-4 text-xs text-gray-400">
                  <span>Update Frequency: On-demand</span>
                  <span>Coverage: File dependent</span>
                  <span>Quality: Validated</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <h3 className="text-lg font-semibold text-white">Quick Bootstrap</h3>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label className="block text-sm font-medium text-gray-300 mb-2">Currency</Label>
                  <Select>
                    <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="USD" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="JPY">JPY</SelectItem>
                      <SelectItem value="CHF">CHF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="block text-sm font-medium text-gray-300 mb-2">Curve Type</Label>
                  <Select>
                    <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="OIS" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="OIS">OIS</SelectItem>
                      <SelectItem value="SOFR">SOFR</SelectItem>
                      <SelectItem value="LIBOR">LIBOR</SelectItem>
                      <SelectItem value="Government">Government</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="block text-sm font-medium text-gray-300 mb-2">Index/Tenor</Label>
                  <Select>
                    <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Overnight" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Overnight">Overnight</SelectItem>
                      <SelectItem value="1M">1M</SelectItem>
                      <SelectItem value="3M">3M</SelectItem>
                      <SelectItem value="6M">6M</SelectItem>
                      <SelectItem value="12M">12M</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="block text-sm font-medium text-gray-300 mb-2">Data Source</Label>
                  <Select>
                    <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Bloomberg" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bloomberg">Bloomberg</SelectItem>
                      <SelectItem value="Refinitiv">Refinitiv</SelectItem>
                      <SelectItem value="Manual">Manual</SelectItem>
                      <SelectItem value="CSV">CSV Upload</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="block text-sm font-medium text-gray-300 mb-2">As of Date</Label>
                  <Input 
                    type="date" 
                    value="2025-01-18"
                    className="w-full bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="block text-sm font-medium text-gray-300 mb-2">Day Count</Label>
                    <Select>
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="ACT/360" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ACT/360">ACT/360</SelectItem>
                        <SelectItem value="ACT/365">ACT/365</SelectItem>
                        <SelectItem value="30E/360">30E/360</SelectItem>
                        <SelectItem value="ACT/ACT">ACT/ACT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-gray-300 mb-2">Calendar</Label>
                    <Select>
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="USNY" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USNY">USNY</SelectItem>
                        <SelectItem value="GBLO">GBLO</SelectItem>
                        <SelectItem value="EUTA">EUTA</SelectItem>
                        <SelectItem value="JPTO">JPTO</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-black">
                    <Cogs className="w-4 h-4 mr-2" />
                    Bootstrap Curve
                  </Button>
                </div>
              </form>
              
              <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Info className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-white">Estimated Build Time</span>
                </div>
                <p className="text-xs text-gray-300">Based on selected options: 2-5 seconds</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="px-8 py-6 pb-8">
        <h2 className="text-xl font-semibold text-white mb-6">Recent Curve Activity</h2>
        
        <Card className="bg-gray-800 border-gray-700 overflow-hidden">
          <div className="divide-y divide-gray-700">
            {mockActivity.map((activity) => (
              <div key={activity.id} className="p-6 hover:bg-gray-750 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 ${
                    activity.iconColor === 'success' ? 'bg-green-500' : 
                    activity.iconColor === 'warning' ? 'bg-yellow-500' : 
                    activity.iconColor === 'danger' ? 'bg-red-500' : 
                    activity.iconColor === 'info' ? 'bg-blue-500' : 
                    'bg-green-500'
                  } bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    {getActivityIcon(activity.type, activity.iconColor)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{activity.title}</h4>
                      <span className="text-xs text-gray-300">{activity.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-3">{activity.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      {activity.curve && <span>Curve: <span className="text-green-500 font-mono">{activity.curve}</span></span>}
                      <span>{activity.details}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Chat Panel */}
      {showChat && (
        <div className="fixed right-4 top-24 bottom-4 w-96 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-40 flex flex-col">
          <div className="p-4 border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center">
                <Robot className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <h3 className="text-white font-medium">Curve Assistant</h3>
                <span className="text-xs text-green-500">Online</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowChat(false)}>
              <Minus className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                <Robot className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex-1 bg-gray-700 rounded-lg p-3">
                <p className="text-sm text-white">Hello! I'm your curve specialist. I can help you:</p>
                <ul className="text-xs text-gray-300 mt-2 space-y-1">
                  <li>• Bootstrap new curves from market data</li>
                  <li>• Explain curve construction methodologies</li>
                  <li>• Analyze curve validation issues</li>
                  <li>• Export curve data in various formats</li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-end">
              <div className="bg-green-500 bg-opacity-20 rounded-lg p-3 max-w-xs">
                <p className="text-sm text-white">What's the difference between log-linear and cubic spline interpolation?</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                <Robot className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex-1 bg-gray-700 rounded-lg p-3">
                <p className="text-sm text-white mb-2">Great question! Here are the key differences:</p>
                <div className="text-xs text-gray-300 space-y-2">
                  <div><strong>Log-Linear:</strong> Interpolates on log(discount factors), ensuring positive forward rates</div>
                  <div><strong>Cubic Spline:</strong> Smoother curves but can produce negative forwards in inverted environments</div>
                </div>
                <p className="text-xs text-gray-300 mt-2">For OIS curves, we typically use log-linear to avoid negative rate issues.</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-700">
            <div className="flex flex-wrap gap-2 mb-3">
              <Button size="sm" className="bg-gray-700 text-xs text-white hover:bg-gray-600">
                Bootstrap USD
              </Button>
              <Button size="sm" className="bg-gray-700 text-xs text-white hover:bg-gray-600">
                Validate Curves
              </Button>
              <Button size="sm" className="bg-gray-700 text-xs text-white hover:bg-gray-600">
                Export Data
              </Button>
            </div>
            
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Ask about curves, interpolation, or bootstrapping..." 
                className="w-full bg-gray-700 border-gray-600 text-sm pr-10"
              />
              <Button size="sm" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 hover:text-opacity-80">
                <PaperPlane className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Toggle Button */}
      <Button 
        onClick={() => setShowChat(!showChat)}
        className="fixed right-4 bottom-4 bg-green-500 hover:bg-green-600 text-black"
      >
        <Robot className="w-4 h-4 mr-2" />
        {showChat ? 'Close Chat' : 'Open Chat'}
      </Button>
    </div>
  )
}