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
  Shield, 
  CreditCard, 
  Hand as HandCoins, 
  Building, 
  Info, 
  Lightbulb, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Download, 
  Plus, 
  Filter, 
  ExternalLink, 
  Edit, 
  ToggleLeft as ToggleOff, 
  ToggleRight as ToggleOn, 
  Book, 
  Calculator, 
  Users as HandshakeIcon, 
  LineChart as ChartLine, 
  ArrowUp, 
  ArrowDown, 
  Minus, 
  Bot, 
  Send, 
  History, 
  Save
} from "lucide-react"

interface XVAComponent {
  id: string
  name: string
  description: string
  icon: string
  iconColor: string
  enabled: boolean
  currentImpact: string
  activeTrades: number
  impactColor: string
}

interface Counterparty {
  name: string
  rating: string
  exposure: string
  ratingColor: string
}

interface LiabilityPosition {
  instrument: string
  notional: string
  dvaImpact: string
}

interface CSAAgreement {
  name: string
  type: string
  status: string
  threshold: string
  minTransfer: string
  currency: string
  haircut: string
}

interface AuditEntry {
  id: string
  title: string
  description: string
  timestamp: string
  user: string
  approvedBy?: string
  impact?: string
  icon: string
  iconColor: string
}

const mockXVAComponents: XVAComponent[] = [
  {
    id: 'cva',
    name: 'Credit Value Adjustment',
    description: 'Adjustment for counterparty credit risk in derivative valuations',
    icon: 'CreditCard',
    iconColor: 'info',
    enabled: true,
    currentImpact: '-$127,450',
    activeTrades: 247,
    impactColor: 'text-red-500'
  },
  {
    id: 'dva',
    name: 'Debit Value Adjustment',
    description: 'Adjustment for own credit risk on derivative liabilities',
    icon: 'HandCoins',
    iconColor: 'warning',
    enabled: true,
    currentImpact: '+$89,320',
    activeTrades: 156,
    impactColor: 'text-green-500'
  },
  {
    id: 'fva',
    name: 'Funding Value Adjustment',
    description: 'Adjustment for funding costs of uncollateralized exposures',
    icon: 'Building',
    iconColor: 'danger',
    enabled: false,
    currentImpact: 'Disabled',
    activeTrades: 0,
    impactColor: 'text-gray-500'
  }
]

const mockCounterparties: Counterparty[] = [
  {
    name: 'Goldman Sachs',
    rating: 'A+',
    exposure: '$12.5M',
    ratingColor: 'bg-green-500'
  },
  {
    name: 'JPMorgan Chase',
    rating: 'AA-',
    exposure: '$8.7M',
    ratingColor: 'bg-green-500'
  },
  {
    name: 'Deutsche Bank',
    rating: 'BBB+',
    exposure: '$15.2M',
    ratingColor: 'bg-yellow-500'
  }
]

const mockLiabilityPositions: LiabilityPosition[] = [
  {
    instrument: 'IRS_USD_001',
    notional: '$25.0M',
    dvaImpact: '+$32,150'
  },
  {
    instrument: 'CCS_EUR_003',
    notional: '€15.0M',
    dvaImpact: '+$28,670'
  },
  {
    instrument: 'IRS_GBP_007',
    notional: '£12.0M',
    dvaImpact: '+$28,500'
  }
]

const mockCSAAgreements: CSAAgreement[] = [
  {
    name: 'Goldman Sachs CSA',
    type: 'Bilateral, Daily Settlement',
    status: 'Active',
    threshold: '$5.0M',
    minTransfer: '$500K',
    currency: 'USD, EUR',
    haircut: '2%'
  },
  {
    name: 'JPMorgan CSA',
    type: 'Bilateral, Weekly Settlement',
    status: 'Active',
    threshold: '$10.0M',
    minTransfer: '$1.0M',
    currency: 'USD',
    haircut: '1.5%'
  },
  {
    name: 'Deutsche Bank',
    type: 'No CSA Agreement',
    status: 'Uncollateralized',
    threshold: '--',
    minTransfer: '--',
    currency: '--',
    haircut: '--'
  }
]

const mockAuditEntries: AuditEntry[] = [
  {
    id: '1',
    title: 'CVA Recovery Rate Updated',
    description: 'Recovery rate for senior unsecured debt changed from 65% to 60%',
    timestamp: '2 hours ago',
    user: 'Alex Johnson',
    approvedBy: 'Risk Committee',
    impact: '+$5,230 CVA',
    icon: 'Edit',
    iconColor: 'info'
  },
  {
    id: '2',
    title: 'New CSA Agreement Added',
    description: 'JPMorgan CSA agreement activated with $10M threshold and weekly settlement',
    timestamp: '1 day ago',
    user: 'Sarah Chen',
    approvedBy: 'Legal Review',
    impact: '-$15,670 CVA',
    icon: 'Plus',
    iconColor: 'success'
  },
  {
    id: '3',
    title: 'DVA P&L Recognition Disabled',
    description: 'DVA gains/losses excluded from P&L per accounting policy update',
    timestamp: '3 days ago',
    user: 'Mike Rodriguez',
    approvedBy: 'ACC-2025-001',
    impact: 'P&L neutral',
    icon: 'ToggleOff',
    iconColor: 'warning'
  },
  {
    id: '4',
    title: 'Credit Rating Downgrade',
    description: 'Deutsche Bank rating downgraded from A- to BBB+, PD curve updated automatically',
    timestamp: '1 week ago',
    user: 'S&P Rating Agency',
    approvedBy: 'Auto Update',
    impact: '+$8,920 CVA',
    icon: 'AlertTriangle',
    iconColor: 'danger'
  }
]

export default function XVAPage() {
  const [cvaEnabled, setCvaEnabled] = useState(true)
  const [dvaEnabled, setDvaEnabled] = useState(true)
  const [fvaEnabled, setFvaEnabled] = useState(false)
  const [dvaPnlEnabled, setDvaPnlEnabled] = useState(true)
  const [showChat, setShowChat] = useState(false)

  const getIconComponent = (iconName: string, className: string) => {
    const icons: { [key: string]: any } = {
      'CreditCard': CreditCard,
      'HandCoins': HandCoins,
      'Building': Building,
      'Edit': Edit,
      'Plus': Plus,
      'ToggleOff': ToggleOff,
      'AlertTriangle': AlertTriangle
    }
    const IconComponent = icons[iconName] || Info
    return <IconComponent className={className} />
  }

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'info': return 'bg-blue-500 bg-opacity-20 text-blue-500'
      case 'warning': return 'bg-yellow-500 bg-opacity-20 text-yellow-500'
      case 'danger': return 'bg-red-500 bg-opacity-20 text-red-500'
      case 'success': return 'bg-green-500 bg-opacity-20 text-green-500'
      default: return 'bg-gray-500 bg-opacity-20 text-gray-500'
    }
  }

  const getRatingColor = (rating: string) => {
    if (rating.includes('A+') || rating.includes('AA')) return 'bg-green-500 bg-opacity-20 text-green-500'
    if (rating.includes('BBB')) return 'bg-yellow-500 bg-opacity-20 text-yellow-500'
    return 'bg-red-500 bg-opacity-20 text-red-500'
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <section className="bg-gray-800 border-b border-gray-700 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl font-semibold text-white">XVA Configuration</h1>
              <Info className="w-5 h-5 text-gray-400 cursor-help" />
            </div>
            <p className="text-gray-300">Manage XVA calculations for enhanced risk management and regulatory compliance</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right text-sm">
              <div className="text-gray-300">Last Updated</div>
              <div className="text-white font-medium">2025-01-18 08:22 UTC</div>
            </div>
            
            <div className="flex space-x-2">
              <Button className="bg-gray-700 hover:bg-gray-600 text-white">
                <History className="w-4 h-4 mr-2" />
                View History
              </Button>
              <Button className="bg-green-500 hover:bg-green-600 text-black">
                <Save className="w-4 h-4 mr-2" />
                Save Configuration
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* XVA Components Overview */}
      <section className="px-8 py-6">
        <h2 className="text-xl font-semibold text-white mb-6">XVA Components Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {mockXVAComponents.map((component) => (
            <Card key={component.id} className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${getColorClasses(component.iconColor)} rounded-lg flex items-center justify-center`}>
                    {getIconComponent(component.icon, "w-6 h-6")}
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-300 mr-2">{component.id.toUpperCase()}</span>
                    <Switch 
                      checked={component.enabled} 
                      onCheckedChange={(checked) => {
                        if (component.id === 'cva') setCvaEnabled(checked)
                        if (component.id === 'dva') setDvaEnabled(checked)
                        if (component.id === 'fva') setFvaEnabled(checked)
                      }}
                    />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{component.name}</h3>
                <p className="text-sm text-gray-300 mb-4">{component.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Current Impact:</span>
                    <span className={component.impactColor}>{component.currentImpact}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Active Trades:</span>
                    <span className="text-white">{component.activeTrades}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Alert className="bg-blue-500 bg-opacity-10 border-blue-500">
          <Lightbulb className="w-5 h-5 text-blue-500" />
          <div className="flex-1">
            <h3 className="text-blue-500 font-semibold mb-2">XVA Configuration Guide</h3>
            <p className="text-white text-sm mb-3">Enable CVA and DVA for comprehensive counterparty risk assessment. FVA is typically applied to uncollateralized exposures and requires additional funding curve data.</p>
            <Button variant="link" className="text-blue-500 text-sm hover:text-opacity-80 p-0 h-auto">
              Learn more about XVA methodologies <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </Alert>
      </section>

      {/* CVA Configuration */}
      <section className="px-8 py-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Credit Value Adjustment (CVA)</h2>
                  <p className="text-sm text-gray-300">Configure counterparty credit risk parameters</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-green-500 bg-green-500 bg-opacity-20 px-3 py-1 rounded-full">Active</span>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <Label className="block text-sm font-medium text-white mb-3">Probability of Default (PD) Source</Label>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="radio" name="pd-source" value="cds" className="w-4 h-4 text-green-500 bg-gray-700 border-gray-600 focus:ring-green-500 focus:ring-2" defaultChecked />
                      <div className="flex-1">
                        <div className="text-white font-medium">CDS Spreads</div>
                        <div className="text-xs text-gray-400">Market-implied probability from credit default swaps</div>
                      </div>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="radio" name="pd-source" value="rating" className="w-4 h-4 text-green-500 bg-gray-700 border-gray-600 focus:ring-green-500 focus:ring-2" />
                      <div className="flex-1">
                        <div className="text-white font-medium">Credit Rating Matrix</div>
                        <div className="text-xs text-gray-400">Historical default rates by rating agency</div>
                      </div>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="radio" name="pd-source" value="custom" className="w-4 h-4 text-green-500 bg-gray-700 border-gray-600 focus:ring-green-500 focus:ring-2" />
                      <div className="flex-1">
                        <div className="text-white font-medium">Custom PD Curve</div>
                        <div className="text-xs text-gray-400">User-defined probability term structure</div>
                      </div>
                    </label>
                  </div>
                </div>
                
                <div>
                  <Label className="block text-sm font-medium text-white mb-2">Loss Given Default (LGD)</Label>
                  <div className="flex items-center space-x-4">
                    <Input 
                      type="number" 
                      defaultValue={40} 
                      min={0} 
                      max={100} 
                      step={5}
                      className="flex-1 bg-gray-700 border-gray-600 text-white"
                    />
                    <span className="text-gray-300">%</span>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <Info className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Percentage of exposure lost upon counterparty default</p>
                </div>
                
                <div>
                  <Label className="block text-sm font-medium text-white mb-2">Recovery Rate Assumption</Label>
                  <Select defaultValue="senior-unsecured">
                    <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="senior-secured">Senior Secured (70%)</SelectItem>
                      <SelectItem value="senior-unsecured">Senior Unsecured (60%)</SelectItem>
                      <SelectItem value="subordinated">Subordinated (40%)</SelectItem>
                      <SelectItem value="equity">Equity (10%)</SelectItem>
                      <SelectItem value="custom">Custom Rate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="block text-sm font-medium text-white mb-2">Discount Curve</Label>
                  <Select defaultValue="funding">
                    <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="risk-free">Risk-Free Rate (OIS)</SelectItem>
                      <SelectItem value="funding">Funding Curve</SelectItem>
                      <SelectItem value="libor">LIBOR/SOFR</SelectItem>
                      <SelectItem value="custom">Custom Curve</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="block text-sm font-medium text-white">Counterparty Exposures</Label>
                    <Button className="text-green-500 text-sm hover:text-opacity-80">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Counterparty
                    </Button>
                  </div>
                  <div className="bg-gray-700 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-600">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Entity</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Rating</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Exposure</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-600">
                        {mockCounterparties.map((counterparty, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3 text-sm text-white">{counterparty.name}</td>
                            <td className="px-4 py-3 text-sm text-white">
                              <span className={`px-2 py-1 ${getRatingColor(counterparty.rating)} rounded text-xs`}>
                                {counterparty.rating}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-white font-mono">{counterparty.exposure}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div>
                  <Label className="block text-sm font-medium text-white mb-2">Calculation Method</Label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="radio" name="cva-method" value="monte-carlo" className="w-4 h-4 text-green-500 bg-gray-700 border-gray-600 focus:ring-green-500 focus:ring-2" defaultChecked />
                      <span className="text-white">Monte Carlo Simulation</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="radio" name="cva-method" value="analytical" className="w-4 h-4 text-green-500 bg-gray-700 border-gray-600 focus:ring-green-500 focus:ring-2" />
                      <span className="text-white">Analytical Approximation</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-white mb-3">CVA Calculation Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Total Counterparty Exposure:</span>
                      <span className="text-white font-mono">$36.4M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Weighted Average PD (1Y):</span>
                      <span className="text-white font-mono">0.75%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Expected CVA Impact:</span>
                      <span className="text-red-500 font-mono">-$127,450</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* DVA Configuration */}
      <section className="px-8 py-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <HandCoins className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Debit Value Adjustment (DVA)</h2>
                  <p className="text-sm text-gray-300">Configure own credit risk parameters for liability positions</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-green-500 bg-green-500 bg-opacity-20 px-3 py-1 rounded-full">Active</span>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <Label className="block text-sm font-medium text-white mb-2">Own Credit Spread Source</Label>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="radio" name="dva-source" value="own-cds" className="w-4 h-4 text-green-500 bg-gray-700 border-gray-600 focus:ring-green-500 focus:ring-2" defaultChecked />
                      <div className="flex-1">
                        <div className="text-white font-medium">Own CDS Spreads</div>
                        <div className="text-xs text-gray-400">Market quotes on institution's credit default swaps</div>
                      </div>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="radio" name="dva-source" value="bond-spreads" className="w-4 h-4 text-green-500 bg-gray-700 border-gray-600 focus:ring-green-500 focus:ring-2" />
                      <div className="flex-1">
                        <div className="text-white font-medium">Bond Spreads</div>
                        <div className="text-xs text-gray-400">Credit spreads from issued bonds</div>
                      </div>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="radio" name="dva-source" value="proxy" className="w-4 h-4 text-green-500 bg-gray-700 border-gray-600 focus:ring-green-500 focus:ring-2" />
                      <div className="flex-1">
                        <div className="text-white font-medium">Peer Proxy</div>
                        <div className="text-xs text-gray-400">Spreads from similar institutions</div>
                      </div>
                    </label>
                  </div>
                </div>
                
                <div>
                  <Label className="block text-sm font-medium text-white mb-2">Institution Credit Rating</Label>
                  <div className="flex items-center space-x-4">
                    <Select defaultValue="aa+">
                      <SelectTrigger className="flex-1 bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aaa">AAA</SelectItem>
                        <SelectItem value="aa+">AA+</SelectItem>
                        <SelectItem value="aa">AA</SelectItem>
                        <SelectItem value="aa-">AA-</SelectItem>
                        <SelectItem value="a+">A+</SelectItem>
                        <SelectItem value="a">A</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="text-sm text-gray-300">
                      <div className="text-xs text-gray-400">Current Rating</div>
                      <div className="text-green-500 font-medium">AA+</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="block text-sm font-medium text-white mb-2">DVA Recovery Rate</Label>
                  <div className="flex items-center space-x-4">
                    <Input 
                      type="number" 
                      defaultValue={60} 
                      min={0} 
                      max={100} 
                      step={5}
                      className="flex-1 bg-gray-700 border-gray-600 text-white"
                    />
                    <span className="text-gray-300">%</span>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <Info className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Expected recovery rate for senior unsecured debt</p>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="block text-sm font-medium text-white">Include DVA in P&L</Label>
                    <Switch checked={dvaPnlEnabled} onCheckedChange={setDvaPnlEnabled} />
                  </div>
                  <p className="text-xs text-gray-400">Include DVA gains/losses in profit and loss calculations</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="block text-sm font-medium text-white">Liability Positions</Label>
                    <Button className="text-green-500 text-sm hover:text-opacity-80">
                      <Filter className="w-4 h-4 mr-1" />
                      Filter
                    </Button>
                  </div>
                  <div className="bg-gray-700 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-600">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Instrument</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Notional</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">DVA Impact</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-600">
                        {mockLiabilityPositions.map((position, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3 text-sm text-white">{position.instrument}</td>
                            <td className="px-4 py-3 text-sm text-white font-mono">{position.notional}</td>
                            <td className="px-4 py-3 text-sm text-green-500 font-mono">{position.dvaImpact}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div>
                  <Label className="block text-sm font-medium text-white mb-2">DVA Hedge Strategy</Label>
                  <Select defaultValue="partial">
                    <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Hedging</SelectItem>
                      <SelectItem value="partial">Partial Hedge (50%)</SelectItem>
                      <SelectItem value="full">Full Hedge (100%)</SelectItem>
                      <SelectItem value="dynamic">Dynamic Hedge</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-400 mt-1">Strategy for hedging DVA exposure through credit instruments</p>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-white mb-3">DVA Calculation Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Total Liability Exposure:</span>
                      <span className="text-white font-mono">$52.0M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Own Credit Spread (5Y):</span>
                      <span className="text-white font-mono">45 bps</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">DVA Benefit:</span>
                      <span className="text-green-500 font-mono">+$89,320</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FVA Configuration */}
      <section className="px-8 py-6">
        <Card className={`bg-gray-800 border-gray-700 ${!fvaEnabled ? 'opacity-75' : ''}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Building className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Funding Value Adjustment (FVA)</h2>
                  <p className="text-sm text-gray-300">Configure funding costs for uncollateralized positions</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`text-sm ${fvaEnabled ? 'text-green-500 bg-green-500 bg-opacity-20' : 'text-gray-500 bg-gray-600'} px-3 py-1 rounded-full`}>
                  {fvaEnabled ? 'Active' : 'Disabled'}
                </span>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {!fvaEnabled ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ToggleOff className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">FVA Currently Disabled</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">Enable FVA to account for funding costs of uncollateralized derivative positions. Requires funding curve configuration.</p>
                
                <div className="flex justify-center space-x-4">
                  <Button 
                    className="bg-green-500 hover:bg-green-600 text-black"
                    onClick={() => setFvaEnabled(true)}
                  >
                    <ToggleOn className="w-4 h-4 mr-2" />
                    Enable FVA
                  </Button>
                  <Button className="bg-gray-700 hover:bg-gray-600 text-white">
                    <Book className="w-4 h-4 mr-2" />
                    Learn More
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <ChartLine className="w-6 h-6 text-blue-500" />
                    </div>
                    <h4 className="text-white font-medium mb-2">Funding Curves</h4>
                    <p className="text-sm text-gray-400">Set up institutional funding cost curves by currency and tenor</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-500 bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <HandshakeIcon className="w-6 h-6 text-yellow-500" />
                    </div>
                    <h4 className="text-white font-medium mb-2">Collateral Rules</h4>
                    <p className="text-sm text-gray-400">Define collateral agreements and uncollateralized exposures</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500 bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Calculator className="w-6 h-6 text-green-500" />
                    </div>
                    <h4 className="text-white font-medium mb-2">FVA Methodology</h4>
                    <p className="text-sm text-gray-400">Choose between bilateral and unilateral FVA calculation approaches</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* CSA Management */}
      <section className="px-8 py-6">
        <h2 className="text-xl font-semibold text-white mb-6">Credit Support Annex (CSA) Management</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Active CSA Agreements</h3>
                <Button className="bg-green-500 hover:bg-green-600 text-black text-sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add CSA
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockCSAAgreements.map((csa, index) => (
                <div key={index} className={`bg-gray-700 rounded-lg p-4 ${csa.status === 'Uncollateralized' ? 'border border-yellow-500' : ''}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 ${csa.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'} bg-opacity-20 rounded-lg flex items-center justify-center`}>
                        {csa.status === 'Active' ? (
                          <Shield className="w-4 h-4 text-green-500" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{csa.name}</h4>
                        <p className="text-xs text-gray-400">{csa.type}</p>
                      </div>
                    </div>
                    <span className={`text-xs ${csa.status === 'Active' ? 'text-green-500 bg-green-500 bg-opacity-20' : 'text-yellow-500 bg-yellow-500 bg-opacity-20'} px-2 py-1 rounded`}>
                      {csa.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Threshold:</span>
                      <span className="text-white ml-2">{csa.threshold}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Min Transfer:</span>
                      <span className="text-white ml-2">{csa.minTransfer}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Currency:</span>
                      <span className="text-white ml-2">{csa.currency}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Haircut:</span>
                      <span className="text-white ml-2">{csa.haircut}</span>
                    </div>
                  </div>
                  {csa.status === 'Uncollateralized' && (
                    <p className="text-sm text-gray-300 mt-3">Exposure: $15.2M - Consider negotiating CSA to reduce XVA impact</p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <h3 className="text-lg font-semibold text-white">Collateral Optimization</h3>
            </CardHeader>
            <CardContent className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div>
                  <h4 className="text-white font-medium">Total Collateral Posted</h4>
                  <p className="text-2xl font-bold text-white">$127.5M</p>
                </div>
                <div className="w-12 h-12 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <ArrowUp className="w-6 h-6 text-blue-500" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div>
                  <h4 className="text-white font-medium">Total Collateral Received</h4>
                  <p className="text-2xl font-bold text-white">$89.2M</p>
                </div>
                <div className="w-12 h-12 bg-green-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <ArrowDown className="w-6 h-6 text-green-500" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div>
                  <h4 className="text-white font-medium">Net Collateral Position</h4>
                  <p className="text-2xl font-bold text-red-500">-$38.3M</p>
                </div>
                <div className="w-12 h-12 bg-red-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Minus className="w-6 h-6 text-red-500" />
                </div>
              </div>
            </CardContent>
            
            <div className="border-t border-gray-700 pt-4">
              <h4 className="text-white font-medium mb-3">Optimization Opportunities</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Lightbulb className="w-4 h-4 text-yellow-500" />
                  <span className="text-gray-300">Negotiate lower threshold with Deutsche Bank</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lightbulb className="w-4 h-4 text-yellow-500" />
                  <span className="text-gray-300">Consider tri-party collateral management</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lightbulb className="w-4 h-4 text-yellow-500" />
                  <span className="text-gray-300">Evaluate cross-currency collateral posting</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* XVA Analytics */}
      <section className="px-8 py-6">
        <h2 className="text-xl font-semibold text-white mb-6">XVA Analytics & Sensitivities</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">XVA Sensitivity Analysis</h3>
                <div className="flex space-x-2">
                  <Button size="sm" className="bg-gray-700 text-white text-xs hover:bg-gray-600">1bp</Button>
                  <Button size="sm" className="bg-green-500 text-black text-xs">10bp</Button>
                  <Button size="sm" className="bg-gray-700 text-white text-xs hover:bg-gray-600">100bp</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-medium">Credit Spread Sensitivity</h4>
                  <span className="text-xs text-blue-500 bg-blue-500 bg-opacity-20 px-2 py-1 rounded">+10bp</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">CVA Impact:</span>
                    <span className="text-red-500">-$12,745</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">DVA Impact:</span>
                    <span className="text-green-500">+$8,932</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-white">Net XVA Change:</span>
                    <span className="text-red-500">-$3,813</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-medium">Interest Rate Sensitivity</h4>
                  <span className="text-xs text-blue-500 bg-blue-500 bg-opacity-20 px-2 py-1 rounded">+10bp</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">CVA Impact:</span>
                    <span className="text-green-500">+$2,157</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">DVA Impact:</span>
                    <span className="text-red-500">-$1,892</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-white">Net XVA Change:</span>
                    <span className="text-green-500">+$265</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-medium">FX Rate Sensitivity</h4>
                  <span className="text-xs text-blue-500 bg-blue-500 bg-opacity-20 px-2 py-1 rounded">+1%</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">EUR/USD Impact:</span>
                    <span className="text-red-500">-$1,456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">GBP/USD Impact:</span>
                    <span className="text-green-500">+$892</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-white">Net FX Impact:</span>
                    <span className="text-red-500">-$564</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">XVA Attribution</h3>
                <Button className="text-green-500 text-sm hover:text-opacity-80">
                  <Download className="w-4 h-4 mr-1" />
                  Export Report
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">Credit Value Adjustment</span>
                  <span className="text-sm text-red-500 font-mono">-$127,450</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{width: '58.5%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">Debit Value Adjustment</span>
                  <span className="text-sm text-green-500 font-mono">+$89,320</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '41%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">Funding Value Adjustment</span>
                  <span className="text-sm text-gray-500 font-mono">$0</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gray-600 h-2 rounded-full" style={{width: '0%'}}></div>
                </div>
              </div>
              
              <div className="border-t border-gray-700 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-white">Net XVA Impact</span>
                  <span className="text-lg font-bold text-red-500 font-mono">-$38,130</span>
                </div>
              </div>
            </CardContent>
            
            <div className="mt-6 p-4 bg-gray-700 rounded-lg">
              <h4 className="text-sm font-medium text-white mb-2">Key Drivers</h4>
              <ul className="text-xs text-gray-300 space-y-1">
                <li>• Large uncollateralized exposure to Deutsche Bank</li>
                <li>• Concentration in financial sector counterparties</li>
                <li>• Net liability position benefits from DVA</li>
                <li>• FVA disabled - potential additional cost if enabled</li>
              </ul>
            </div>
          </Card>
        </div>
      </section>

      {/* Validation Controls */}
      <section className="px-8 py-6">
        <h2 className="text-xl font-semibold text-white mb-6">Validation & Controls</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold text-white">Data Quality Checks</h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Market Data Freshness</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-500">Pass</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Curve Consistency</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-500">Pass</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Credit Rating Validity</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs text-yellow-500">Warning</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">CSA Completeness</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-500">Pass</span>
                </div>
              </div>
              
              <Button className="w-full mt-4 bg-gray-700 text-white text-sm hover:bg-gray-600">
                Run Full Validation
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                </div>
                <h3 className="text-lg font-semibold text-white">Risk Limits</h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">CVA Concentration</span>
                  <span className="text-white">78%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{width: '78%'}}></div>
                </div>
                <div className="text-xs text-gray-400 mt-1">Limit: 80%</div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">Single Name Exposure</span>
                  <span className="text-white">42%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '42%'}}></div>
                </div>
                <div className="text-xs text-gray-400 mt-1">Limit: 50%</div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">DVA P&L Volatility</span>
                  <span className="text-white">15%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '15%'}}></div>
                </div>
                <div className="text-xs text-gray-400 mt-1">Limit: 25%</div>
              </div>
              
              <Button className="w-full mt-4 bg-yellow-500 text-white text-sm hover:bg-opacity-90">
                Review Breaches
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-white">Calculation Schedule</h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">CVA Calculation</span>
                <span className="text-xs text-green-500 bg-green-500 bg-opacity-20 px-2 py-1 rounded">Daily</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">DVA Calculation</span>
                <span className="text-xs text-green-500 bg-green-500 bg-opacity-20 px-2 py-1 rounded">Daily</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Sensitivity Analysis</span>
                <span className="text-xs text-blue-500 bg-blue-500 bg-opacity-20 px-2 py-1 rounded">Weekly</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Full Revaluation</span>
                <span className="text-xs text-yellow-500 bg-yellow-500 bg-opacity-20 px-2 py-1 rounded">Monthly</span>
              </div>
            </CardContent>
            
            <div className="text-sm text-gray-300 mb-3">
              <div className="flex justify-between">
                <span>Next Run:</span>
                <span className="text-white">Tomorrow 06:00 UTC</span>
              </div>
            </div>
            
            <Button className="w-full bg-blue-500 text-white text-sm hover:bg-opacity-90">
              Modify Schedule
            </Button>
          </Card>
        </div>
      </section>

      {/* Configuration History */}
      <section className="px-8 py-6 pb-8">
        <h2 className="text-xl font-semibold text-white mb-6">Configuration History & Audit Trail</h2>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Recent Configuration Changes</h3>
              <div className="flex items-center space-x-3">
                <Select defaultValue="all">
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Changes</SelectItem>
                    <SelectItem value="cva">CVA Changes</SelectItem>
                    <SelectItem value="dva">DVA Changes</SelectItem>
                    <SelectItem value="csa">CSA Updates</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-gray-700 hover:bg-gray-600 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="divide-y divide-gray-700">
            {mockAuditEntries.map((entry) => (
              <div key={entry.id} className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 ${getColorClasses(entry.iconColor)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    {getIconComponent(entry.icon, "w-5 h-5")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{entry.title}</h4>
                      <span className="text-xs text-gray-300">{entry.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-3">{entry.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      <span>User: <span className="text-green-500">{entry.user}</span></span>
                      {entry.approvedBy && (
                        <span>Approved by: <span className="text-green-500">{entry.approvedBy}</span></span>
                      )}
                      {entry.impact && (
                        <span>Impact: <span className={entry.impact.includes('+') ? 'text-green-500' : entry.impact.includes('-') ? 'text-red-500' : 'text-gray-400'}>{entry.impact}</span></span>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
          
          <div className="p-4 border-t border-gray-700 bg-gray-800">
            <Button className="w-full text-center text-sm text-gray-300 hover:text-white">
              View Complete Audit Trail <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
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
                <h3 className="text-white font-medium">XVA Assistant</h3>
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
                <Bot className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex-1 bg-gray-700 rounded-lg p-3">
                <p className="text-sm text-white">Hello! I can help you with XVA configuration:</p>
                <ul className="text-xs text-gray-300 mt-2 space-y-1">
                  <li>• Optimize CSA thresholds</li>
                  <li>• Calculate sensitivity scenarios</li>
                  <li>• Explain XVA methodologies</li>
                  <li>• Review risk limit breaches</li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-end">
              <div className="bg-green-500 bg-opacity-20 rounded-lg p-3 max-w-xs">
                <p className="text-sm text-white">What's the impact of enabling FVA on our current portfolio?</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex-1 bg-gray-700 rounded-lg p-3">
                <p className="text-sm text-white mb-2">Based on your current uncollateralized exposures:</p>
                <div className="bg-gray-600 rounded p-2 text-xs font-mono text-gray-200 mb-2">
                  Estimated FVA Impact: -$45,200<br />
                  Primary Driver: Deutsche Bank exposure<br />
                  Funding Spread: 85 bps
                </div>
                <p className="text-xs text-gray-300">This would increase your total XVA to -$83,330. Consider negotiating CSA first.</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-700">
            <div className="flex flex-wrap gap-2 mb-3">
              <Button size="sm" className="bg-gray-700 text-xs text-white hover:bg-gray-600">
                CVA Analysis
              </Button>
              <Button size="sm" className="bg-gray-700 text-xs text-white hover:bg-gray-600">
                Enable FVA
              </Button>
              <Button size="sm" className="bg-gray-700 text-xs text-white hover:bg-gray-600">
                CSA Optimizer
              </Button>
            </div>
            
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Ask about XVA configurations..." 
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