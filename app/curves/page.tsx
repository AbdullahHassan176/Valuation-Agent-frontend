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
  }
]

export default function CurvesPage() {
  const [selectedCurrency, setSelectedCurrency] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
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
                    <SelectItem value="all">All Currencies</SelectItem>
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
                    <SelectItem value="all">All Types</SelectItem>
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
                    <SelectItem value="all">All Status</SelectItem>
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
                <span className="text-sm text-gray-300">Showing 3 curves</span>
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
              Showing 1-3 of 3 curves
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled className="bg-gray-700 text-gray-300">
                Previous
              </Button>
              <Button size="sm" className="bg-green-500 text-black">1</Button>
              <Button variant="outline" size="sm" className="bg-gray-700 text-white hover:bg-gray-600">
                Next
              </Button>
            </div>
          </div>
        </Card>
      </section>

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