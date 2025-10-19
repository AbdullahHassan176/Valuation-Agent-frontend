"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { 
  Percent, 
  ArrowLeftRight, 
  BarChart3, 
  Info, 
  Lock, 
  TrendingUp, 
  Shield, 
  Settings, 
  Save, 
  Play, 
  Calendar, 
  DollarSign, 
  Copy, 
  Download, 
  Eye, 
  CheckCircle, 
  AlertTriangle, 
  ShieldCheck, 
  Scale, 
  RefreshCw, 
  Upload as FileImport, 
  Code, 
  Wand2, 
  CheckCircle2 as CheckDouble, 
  Bot, 
  Minus, 
  Send, 
  MoreHorizontal,
  MoreHorizontal as EllipsisHorizontal
} from "lucide-react"

interface InstrumentTemplate {
  id: string
  name: string
  description: string
  type: 'IRS' | 'CCS' | 'EXOTIC'
  created: string
  used: number
  successRate: string
  icon: string
  iconColor: string
}

interface MarketRate {
  currency: string
  index: string
  rate: string
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
  timestamp: string
}

interface DataSource {
  name: string
  status: 'online' | 'delayed' | 'offline'
  lag: string
  type: string
}

const mockTemplates: InstrumentTemplate[] = [
  {
    id: '1',
    name: 'USD IRS Standard',
    description: '5Y Pay Fixed vs SOFR',
    type: 'IRS',
    created: 'Jan 15, 2025',
    used: 12,
    successRate: '100%',
    icon: 'Percent',
    iconColor: 'brand'
  },
  {
    id: '2',
    name: 'USD/EUR CCS',
    description: 'Constant Notional',
    type: 'CCS',
    created: 'Jan 12, 2025',
    used: 8,
    successRate: '87.5%',
    icon: 'ArrowLeftRight',
    iconColor: 'info'
  },
  {
    id: '3',
    name: 'GBP IRS SONIA',
    description: '10Y with Step-up',
    type: 'IRS',
    created: 'Jan 10, 2025',
    used: 3,
    successRate: '100%',
    icon: 'Percent',
    iconColor: 'warning'
  }
]

const mockMarketRates: MarketRate[] = [
  {
    currency: 'USD',
    index: 'USD SOFR 3M',
    rate: '5.32%',
    change: '+0.02%',
    changeType: 'positive',
    timestamp: 'As of 08:20 UTC'
  },
  {
    currency: 'EUR',
    index: 'EUR €STR 3M',
    rate: '3.65%',
    change: '-0.01%',
    changeType: 'negative',
    timestamp: 'As of 08:20 UTC'
  },
  {
    currency: 'GBP',
    index: 'GBP SONIA 3M',
    rate: '4.75%',
    change: '0.00%',
    changeType: 'neutral',
    timestamp: 'As of 08:20 UTC'
  }
]

const mockDataSources: DataSource[] = [
  {
    name: 'Bloomberg',
    status: 'online',
    lag: '2s',
    type: 'Primary data feed'
  },
  {
    name: 'Refinitiv',
    status: 'online',
    lag: '5s',
    type: 'Secondary source'
  },
  {
    name: 'MarketAxess',
    status: 'delayed',
    lag: '15m',
    type: 'Credit data'
  }
]

export default function InstrumentsPage() {
  const [selectedInstrument, setSelectedInstrument] = useState('IRS')
  const [payFixed, setPayFixed] = useState(true)
  const [csaEnabled, setCsaEnabled] = useState(true)
  const [showChat, setShowChat] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-500'
      case 'delayed': return 'text-yellow-500'
      case 'offline': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      case 'delayed': return <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
      case 'offline': return <div className="w-2 h-2 bg-red-500 rounded-full"></div>
      default: return <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
    }
  }

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'positive': return 'text-green-500'
      case 'negative': return 'text-red-500'
      case 'neutral': return 'text-gray-300'
      default: return 'text-gray-300'
    }
  }

  const getCurrencyIcon = (currency: string) => {
    const iconProps = "w-8 h-8 rounded-lg flex items-center justify-center"
    switch (currency) {
      case 'USD': return <div className={`${iconProps} bg-green-500 bg-opacity-20`}><span className="text-green-500 text-xs font-bold">USD</span></div>
      case 'EUR': return <div className={`${iconProps} bg-blue-500 bg-opacity-20`}><span className="text-blue-500 text-xs font-bold">EUR</span></div>
      case 'GBP': return <div className={`${iconProps} bg-yellow-500 bg-opacity-20`}><span className="text-yellow-500 text-xs font-bold">GBP</span></div>
      default: return <div className={`${iconProps} bg-gray-500 bg-opacity-20`}><span className="text-gray-500 text-xs font-bold">{currency}</span></div>
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <section className="bg-gray-800 border-b border-gray-700 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl font-semibold text-white">Financial Instruments</h1>
              <span className="px-3 py-1 bg-green-500 bg-opacity-20 text-green-500 text-sm font-medium rounded-full">Form Builder</span>
            </div>
            <p className="text-gray-300">Create and configure IRS and CCS instruments with JSON preview functionality</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-300">As of</div>
              <div className="text-lg font-medium text-white">2025-01-18 08:26 UTC</div>
            </div>
            
            <div className="flex space-x-2">
              <Button className="bg-gray-700 hover:bg-gray-600 text-white">
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button className="bg-green-500 hover:bg-green-600 text-black">
                <Play className="w-4 h-4 mr-2" />
                Start Valuation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Instrument Type Selection */}
      <section className="px-8 py-6 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-6">Select Instrument Type</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className={`bg-gray-800 border-2 ${selectedInstrument === 'IRS' ? 'border-green-500' : 'border-gray-700'} cursor-pointer group`}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-green-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Percent className="w-8 h-8 text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Interest Rate Swap</h3>
                  <p className="text-sm text-gray-300">Fixed vs Floating Rate</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex justify-between">
                  <span>Complexity:</span>
                  <span className="text-green-500">Standard</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Time:</span>
                  <span className="text-white">~2.3 min</span>
                </div>
                <div className="flex justify-between">
                  <span>IFRS-13 Level:</span>
                  <span className="text-yellow-500">Typically Level 2</span>
                </div>
              </div>
              {selectedInstrument === 'IRS' && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <span className="inline-flex items-center px-2 py-1 bg-green-500 bg-opacity-20 text-green-500 text-xs font-medium rounded">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Selected
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border border-gray-700 hover:border-blue-500 cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <ArrowLeftRight className="w-8 h-8 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Cross Currency Swap</h3>
                  <p className="text-sm text-gray-300">Multi-Currency Exchange</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex justify-between">
                  <span>Complexity:</span>
                  <span className="text-yellow-500">Advanced</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Time:</span>
                  <span className="text-white">~3.1 min</span>
                </div>
                <div className="flex justify-between">
                  <span>IFRS-13 Level:</span>
                  <span className="text-yellow-500">Level 2-3</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border border-gray-700 hover:border-yellow-500 cursor-pointer group opacity-60">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-yellow-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Exotic Derivatives</h3>
                  <p className="text-sm text-gray-300">Complex Structures</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex justify-between">
                  <span>Complexity:</span>
                  <span className="text-red-500">Expert</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Time:</span>
                  <span className="text-white">~8.5 min</span>
                </div>
                <div className="flex justify-between">
                  <span>IFRS-13 Level:</span>
                  <span className="text-red-500">Typically Level 3</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="inline-flex items-center px-2 py-1 bg-gray-700 text-gray-300 text-xs font-medium rounded">
                  Coming Soon
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* IRS Form Configuration */}
      <section className="px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Fields */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Basic Information */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                    <Info className="w-5 h-5 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Basic Information</h3>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="block text-sm font-medium text-white mb-2">
                      Instrument ID <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      className="w-full bg-gray-700 border-gray-600 text-white"
                      placeholder="IRS-2025-001"
                      defaultValue="IRS-2025-0118-001"
                    />
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-white mb-2">
                      Trade Date <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input 
                        className="w-full bg-gray-700 border-gray-600 text-white pl-10"
                        type="date"
                        defaultValue="2025-01-18"
                      />
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-white mb-2">
                      Effective Date <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input 
                        className="w-full bg-gray-700 border-gray-600 text-white pl-10"
                        type="date"
                        defaultValue="2025-01-20"
                      />
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-white mb-2">
                      Maturity Date <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input 
                        className="w-full bg-gray-700 border-gray-600 text-white pl-10"
                        type="date"
                        defaultValue="2030-01-20"
                      />
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-white mb-2">
                      Notional Amount <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input 
                        className="w-full bg-gray-700 border-gray-600 text-white pr-16"
                        defaultValue="10,000,000"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">USD</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-white mb-2">
                      Currency <span className="text-red-500">*</span>
                    </Label>
                    <Select defaultValue="USD">
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                        <SelectItem value="CHF">CHF - Swiss Franc</SelectItem>
                        <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fixed Leg Configuration */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                      <Lock className="w-5 h-5 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Fixed Leg Configuration</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-300">Pay Fixed?</span>
                    <Switch checked={payFixed} onCheckedChange={setPayFixed} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="block text-sm font-medium text-white mb-2">
                      Fixed Rate <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input 
                        className="w-full bg-gray-700 border-gray-600 text-white pr-12"
                        defaultValue="3.50"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">%</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-white mb-2">
                      Payment Frequency <span className="text-red-500">*</span>
                    </Label>
                    <Select defaultValue="SA">
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SA">Semi-Annual</SelectItem>
                        <SelectItem value="A">Annual</SelectItem>
                        <SelectItem value="Q">Quarterly</SelectItem>
                        <SelectItem value="M">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-white mb-2">
                      Day Count Convention <span className="text-red-500">*</span>
                    </Label>
                    <Select defaultValue="30E/360">
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30E/360">30E/360</SelectItem>
                        <SelectItem value="ACT/360">ACT/360</SelectItem>
                        <SelectItem value="ACT/365F">ACT/365F</SelectItem>
                        <SelectItem value="30/360">30/360</SelectItem>
                        <SelectItem value="ACT/ACT">ACT/ACT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-white mb-2">
                      Business Day Convention <span className="text-red-500">*</span>
                    </Label>
                    <Select defaultValue="ModFollowing">
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ModFollowing">Modified Following</SelectItem>
                        <SelectItem value="Following">Following</SelectItem>
                        <SelectItem value="Preceding">Preceding</SelectItem>
                        <SelectItem value="ModPreceding">Modified Preceding</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label className="block text-sm font-medium text-white mb-2">
                      Calendar <span className="text-red-500">*</span>
                    </Label>
                    <Select defaultValue="USNY">
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USNY">USNY - US New York</SelectItem>
                        <SelectItem value="EUTA">EUTA - TARGET</SelectItem>
                        <SelectItem value="GBLO">GBLO - London</SelectItem>
                        <SelectItem value="JPTO">JPTO - Tokyo</SelectItem>
                        <SelectItem value="CHZU">CHZU - Zurich</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Floating Leg Configuration */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-yellow-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Floating Leg Configuration</h3>
                  </div>
                  <span className="px-3 py-1 bg-yellow-500 bg-opacity-20 text-yellow-500 text-sm font-medium rounded-full">Receive Floating</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="block text-sm font-medium text-white mb-2">
                      Reference Index <span className="text-red-500">*</span>
                    </Label>
                    <Select defaultValue="SOFR">
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SOFR">SOFR - Secured Overnight Financing Rate</SelectItem>
                        <SelectItem value="ESTR">€STR - Euro Short-Term Rate</SelectItem>
                        <SelectItem value="SONIA">SONIA - Sterling Overnight Index Average</SelectItem>
                        <SelectItem value="TONAR">TONAR - Tokyo Overnight Average Rate</SelectItem>
                        <SelectItem value="SARON">SARON - Swiss Average Rate Overnight</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-white mb-2">
                      Index Tenor <span className="text-red-500">*</span>
                    </Label>
                    <Select defaultValue="3M">
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3M">3 Months</SelectItem>
                        <SelectItem value="1M">1 Month</SelectItem>
                        <SelectItem value="6M">6 Months</SelectItem>
                        <SelectItem value="12M">12 Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-white mb-2">
                      Spread (bps) <span className="text-gray-400">(optional)</span>
                    </Label>
                    <div className="relative">
                      <Input 
                        className="w-full bg-gray-700 border-gray-600 text-white pr-16"
                        defaultValue="0.00"
                        placeholder="0.00"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">bps</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-white mb-2">
                      Payment Frequency <span className="text-red-500">*</span>
                    </Label>
                    <Select defaultValue="Q">
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Q">Quarterly</SelectItem>
                        <SelectItem value="SA">Semi-Annual</SelectItem>
                        <SelectItem value="A">Annual</SelectItem>
                        <SelectItem value="M">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-white mb-2">
                      Day Count Convention <span className="text-red-500">*</span>
                    </Label>
                    <Select defaultValue="ACT/360">
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ACT/360">ACT/360</SelectItem>
                        <SelectItem value="ACT/365F">ACT/365F</SelectItem>
                        <SelectItem value="30E/360">30E/360</SelectItem>
                        <SelectItem value="30/360">30/360</SelectItem>
                        <SelectItem value="ACT/ACT">ACT/ACT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-white mb-2">
                      Business Day Convention <span className="text-red-500">*</span>
                    </Label>
                    <Select defaultValue="ModFollowing">
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ModFollowing">Modified Following</SelectItem>
                        <SelectItem value="Following">Following</SelectItem>
                        <SelectItem value="Preceding">Preceding</SelectItem>
                        <SelectItem value="ModPreceding">Modified Preceding</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Credit Support Annex (CSA) */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Credit Support Annex (CSA)</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-300">Enable CSA</span>
                    <Switch checked={csaEnabled} onCheckedChange={setCsaEnabled} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="block text-sm font-medium text-white mb-2">
                      Threshold Amount
                    </Label>
                    <div className="relative">
                      <Input 
                        className="w-full bg-gray-700 border-gray-600 text-white pr-16"
                        defaultValue="1,000,000"
                        placeholder="0"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">USD</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-white mb-2">
                      Minimum Transfer Amount
                    </Label>
                    <div className="relative">
                      <Input 
                        className="w-full bg-gray-700 border-gray-600 text-white pr-16"
                        defaultValue="500,000"
                        placeholder="0"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">USD</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-white mb-2">
                      Collateral Call Frequency
                    </Label>
                    <Select defaultValue="Daily">
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Daily">Daily</SelectItem>
                        <SelectItem value="Weekly">Weekly</SelectItem>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-white mb-2">
                      Collateral Currency
                    </Label>
                    <Select defaultValue="USD">
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Advanced Settings */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Advanced Settings</h3>
                  <span className="px-2 py-1 bg-red-500 bg-opacity-20 text-red-500 text-xs font-medium rounded">Optional</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="block text-sm font-medium text-white mb-2">
                      Valuation Method
                    </Label>
                    <Select defaultValue="DCF">
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DCF">Discounted Cash Flow</SelectItem>
                        <SelectItem value="HW1F">Hull-White 1-Factor</SelectItem>
                        <SelectItem value="HW2F">Hull-White 2-Factor</SelectItem>
                        <SelectItem value="LMM">LIBOR Market Model</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-white mb-2">
                      Curve Data Source
                    </Label>
                    <Select defaultValue="Bloomberg">
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bloomberg">Bloomberg</SelectItem>
                        <SelectItem value="Refinitiv">Refinitiv</SelectItem>
                        <SelectItem value="MarketAxess">MarketAxess</SelectItem>
                        <SelectItem value="Internal">Internal Curves</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-white mb-2">
                      Monte Carlo Paths
                    </Label>
                    <Select defaultValue="10000">
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10000">10,000</SelectItem>
                        <SelectItem value="50000">50,000</SelectItem>
                        <SelectItem value="100000">100,000</SelectItem>
                        <SelectItem value="500000">500,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-white mb-2">
                      Random Seed (Reproducibility)
                    </Label>
                    <Input 
                      className="w-full bg-gray-700 border-gray-600 text-white"
                      defaultValue="12345"
                      placeholder="Leave empty for random"
                    />
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-blue-500 mt-1" />
                    <div className="text-sm text-gray-300">
                      <p className="font-medium text-white mb-1">Advanced Configuration Notes:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• DCF method recommended for standard IRS with observable market data</li>
                        <li>• Hull-White models provide more accurate pricing for exotic features</li>
                        <li>• Higher Monte Carlo paths increase accuracy but require more processing time</li>
                        <li>• Set random seed for reproducible results across runs</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* JSON Preview and Actions */}
          <div className="space-y-6">
            
            {/* Form Summary */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <h3 className="text-lg font-semibold text-white">Form Summary</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Instrument Type:</span>
                  <span className="text-white font-medium">Interest Rate Swap</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Notional:</span>
                  <span className="text-white font-medium">USD 10,000,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Term:</span>
                  <span className="text-white font-medium">5 Years</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Fixed Rate:</span>
                  <span className="text-white font-medium">3.50%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Floating Index:</span>
                  <span className="text-white font-medium">SOFR 3M</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">CSA Enabled:</span>
                  <span className="text-green-500 font-medium">Yes</span>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-300">Form Complete</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Validation Status */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <h3 className="text-lg font-semibold text-white">Validation Status</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-300">Required fields complete</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-300">Date validation passed</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-300">Currency consistency verified</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-300">Day count conventions valid</span>
                </div>
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-gray-300">CSA threshold high (review recommended)</span>
                </div>
              </CardContent>
            </Card>

            {/* JSON Preview */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">JSON Preview</h3>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" className="bg-gray-700 hover:bg-gray-600 text-white">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button size="sm" className="bg-gray-700 hover:bg-gray-600 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm font-mono text-gray-300"><code>{`{
  "instrumentType": "IRS",
  "instrumentId": "IRS-2025-0118-001",
  "tradeDate": "2025-01-18",
  "effectiveDate": "2025-01-20",
  "maturityDate": "2030-01-20",
  "notional": {
    "amount": 10000000,
    "currency": "USD"
  },
  "fixedLeg": {
    "payFixed": true,
    "rate": 0.035,
    "frequency": "SA",
    "dayCount": "30E/360",
    "businessDayConvention": "ModFollowing",
    "calendar": "USNY"
  },
  "floatingLeg": {
    "index": "SOFR",
    "tenor": "3M",
    "spread": 0.0,
    "frequency": "Q",
    "dayCount": "ACT/360",
    "businessDayConvention": "ModFollowing"
  },
  "csa": {
    "enabled": true,
    "threshold": 1000000,
    "minimumTransferAmount": 500000,
    "frequency": "Daily",
    "currency": "USD"
  },
  "advancedSettings": {
    "valuationMethod": "DCF",
    "curveSource": "Bloomberg",
    "monteCarloePaths": 10000,
    "randomSeed": 12345
  },
  "metadata": {
    "createdBy": "Alex Johnson",
    "createdAt": "2025-01-18T08:26:16Z",
    "version": "1.0"
  }
}`}</code></pre>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button className="w-full bg-green-500 hover:bg-green-600 text-black">
                <Play className="w-4 h-4 mr-2" />
                Start Valuation Run
              </Button>
              
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                <Save className="w-4 h-4 mr-2" />
                Save as Template
              </Button>
              
              <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white">
                <Eye className="w-4 h-4 mr-2" />
                Preview Cashflows
              </Button>
            </div>

            {/* Estimated Processing */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <h3 className="text-lg font-semibold text-white">Processing Estimate</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Estimated Time:</span>
                  <span className="text-white font-medium">2.3 minutes</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Complexity Score:</span>
                  <span className="text-green-500 font-medium">Standard (2/5)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Expected IFRS-13:</span>
                  <span className="text-yellow-500 font-medium">Level 2</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Queue Position:</span>
                  <span className="text-white font-medium">#3</span>
                </div>
                
                <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Info className="w-4 h-4 text-blue-500" />
                    <span className="text-xs text-gray-300">Standard IRS with observable inputs. Processing should complete within estimated timeframe.</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Templates */}
      <section className="px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Recent Templates</h2>
          <Button className="bg-gray-700 hover:bg-gray-600 text-white">
            <Eye className="w-4 h-4 mr-2" />
            View All Templates
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTemplates.map((template) => (
            <Card key={template.id} className="bg-gray-800 border-gray-700 hover:border-green-500 transition-colors cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${
                      template.iconColor === 'brand' ? 'bg-green-500' : 
                      template.iconColor === 'info' ? 'bg-blue-500' : 
                      'bg-yellow-500'
                    } bg-opacity-20 rounded-lg flex items-center justify-center`}>
                      {template.icon === 'Percent' && <Percent className="w-6 h-6 text-green-500" />}
                      {template.icon === 'ArrowLeftRight' && <ArrowLeftRight className="w-6 h-6 text-blue-500" />}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{template.name}</h3>
                      <p className="text-xs text-gray-300">{template.description}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                    <EllipsisHorizontal className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Created:</span>
                    <span className="text-white">{template.created}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Used:</span>
                    <span className="text-white">{template.used} times</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Success Rate:</span>
                    <span className="text-green-500">{template.successRate}</span>
                  </div>
                </div>
                
                <Button className={`w-full mt-4 ${
                  template.iconColor === 'brand' ? 'bg-green-500 bg-opacity-20 text-green-500 hover:bg-opacity-30' :
                  template.iconColor === 'info' ? 'bg-blue-500 bg-opacity-20 text-blue-500 hover:bg-opacity-30' :
                  'bg-yellow-500 bg-opacity-20 text-yellow-500 hover:bg-opacity-30'
                }`}>
                  Use Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Form Builder Tools */}
      <section className="px-8 py-6">
        <h2 className="text-xl font-semibold text-white mb-6">Form Builder Tools</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800 border-gray-700 hover:border-green-500 transition-colors cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-500 bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-30 transition-colors">
                <FileImport className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Import from Excel</h3>
              <p className="text-sm text-gray-300 mb-4">Upload instrument data from Excel spreadsheets</p>
              <div className="text-center">
                <span className="text-xs text-gray-400">Supports .xlsx, .xls formats</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-30 transition-colors">
                <Code className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">JSON Import</h3>
              <p className="text-sm text-gray-300 mb-4">Import instrument specifications from JSON</p>
              <div className="text-center">
                <span className="text-xs text-gray-400">Schema validation included</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700 hover:border-yellow-500 transition-colors cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-yellow-500 bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-30 transition-colors">
                <Wand2 className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">AI Assistant</h3>
              <p className="text-sm text-gray-300 mb-4">Get help with form configuration</p>
              <div className="text-center">
                <span className="text-xs text-gray-400">Natural language input</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700 hover:border-green-500 transition-colors cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-500 bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-30 transition-colors">
                <CheckDouble className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Bulk Validation</h3>
              <p className="text-sm text-gray-300 mb-4">Validate multiple instruments at once</p>
              <div className="text-center">
                <span className="text-xs text-gray-400">Batch processing ready</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Market Data Integration */}
      <section className="px-8 py-6">
        <h2 className="text-xl font-semibold text-white mb-6">Market Data Integration</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <h3 className="text-lg font-semibold text-white">Current Market Rates</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockMarketRates.map((rate, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getCurrencyIcon(rate.currency)}
                    <div>
                      <div className="text-white font-medium">{rate.index}</div>
                      <div className="text-xs text-gray-300">{rate.timestamp}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">{rate.rate}</div>
                    <div className={`text-xs ${getChangeColor(rate.changeType)}`}>{rate.change}</div>
                  </div>
                </div>
              ))}
              
              <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Rates
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <h3 className="text-lg font-semibold text-white">Data Source Status</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockDataSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(source.status)}
                    <div>
                      <div className="text-white font-medium">{source.name}</div>
                      <div className="text-xs text-gray-300">{source.type}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm ${getStatusColor(source.status)}`}>
                      {source.status.charAt(0).toUpperCase() + source.status.slice(1)}
                    </div>
                    <div className="text-xs text-gray-300">Lag: {source.lag}</div>
                  </div>
                </div>
              ))}
              
              <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Info className="w-4 h-4 text-blue-500" />
                  <span className="text-xs text-gray-300">All critical curves are up-to-date and ready for valuation processing.</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Compliance and Risk Checks */}
      <section className="px-8 py-6 pb-8">
        <h2 className="text-xl font-semibold text-white mb-6">Compliance & Risk Checks</h2>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">IFRS-13 Compliance</h3>
                <p className="text-sm text-gray-300 mb-4">Automatic fair value hierarchy classification and documentation</p>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-500">Ready</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Scale className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Regulatory Limits</h3>
                <p className="text-sm text-gray-300 mb-4">Automated checks against position and exposure limits</p>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-500">Passed</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Credit Risk</h3>
                <p className="text-sm text-gray-300 mb-4">Counterparty exposure and CSA threshold validation</p>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs text-yellow-500">Review Required</span>
                </div>
              </div>
            </div>
            
            <Alert className="mt-6 bg-yellow-500 bg-opacity-10 border-yellow-500">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              <div>
                <h4 className="text-yellow-500 font-semibold mb-1">Credit Risk Alert</h4>
                <p className="text-sm text-white mb-2">CSA threshold of $1M USD exceeds recommended maximum of $500K for this counterparty rating.</p>
                <Button variant="link" className="text-xs text-yellow-500 hover:text-opacity-80 p-0 h-auto">
                  Review Counterparty Limits →
                </Button>
              </div>
            </Alert>
          </CardContent>
        </Card>
      </section>

      {/* Chat Panel */}
      {showChat && (
        <div className="fixed right-4 top-24 bottom-4 w-96 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-40 flex flex-col">
          <div className="p-4 border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <h3 className="text-white font-medium">Form Assistant</h3>
                <span className="text-xs text-green-500">Ready to help</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowChat(false)}>
              <Minus className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex-1 bg-gray-700 rounded-lg p-3">
                <p className="text-sm text-white">I can help you configure your IRS form:</p>
                <ul className="text-xs text-gray-300 mt-2 space-y-1">
                  <li>• Validate field inputs and relationships</li>
                  <li>• Suggest market-standard conventions</li>
                  <li>• Explain day count and frequency options</li>
                  <li>• Review CSA and collateral settings</li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-end">
              <div className="bg-green-500 bg-opacity-20 rounded-lg p-3 max-w-xs">
                <p className="text-sm text-white">What's the difference between 30E/360 and ACT/360?</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex-1 bg-gray-700 rounded-lg p-3">
                <p className="text-sm text-white mb-2">Great question! Here's the key difference:</p>
                <div className="text-xs text-gray-300 space-y-2">
                  <p><strong className="text-white">30E/360:</strong> Assumes each month has 30 days, year has 360 days. More predictable cashflows.</p>
                  <p><strong className="text-white">ACT/360:</strong> Uses actual days in period, 360-day year. More accurate but variable cashflows.</p>
                  <p className="text-blue-500">💡 For USD fixed legs, 30E/360 is market standard.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-700">
            <div className="flex flex-wrap gap-2 mb-3">
              <Button size="sm" className="bg-gray-700 text-xs text-white hover:bg-gray-600">
                Validate Form
              </Button>
              <Button size="sm" className="bg-gray-700 text-xs text-white hover:bg-gray-600">
                Market Rates
              </Button>
              <Button size="sm" className="bg-gray-700 text-xs text-white hover:bg-gray-600">
                CSA Help
              </Button>
            </div>
            
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Ask about form configuration..." 
                className="w-full bg-gray-700 border-gray-600 text-sm pr-10"
              />
              <Button size="sm" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 hover:text-opacity-80">
                <Send className="w-4 h-4" />
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
        <Bot className="w-4 h-4 mr-2" />
        {showChat ? 'Close Chat' : 'Open Chat'}
      </Button>
    </div>
  )
}