'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PrintButton } from './_components/PrintButton'
import { AnimatedParticles } from './_components/AnimatedParticles'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  CheckCircle, 
  Clock, 
  Hourglass, 
  AlertTriangle,
  Plus,
  ArrowLeftRight,
  Upload,
  Bell,
  Search,
  User,
  ChevronDown,
  Filter,
  Download,
  ExternalLink,
  Bot,
  MessageCircle,
  Bug,
  XCircle,
  CheckCircle2,
  Info,
  AlertCircle,
  FileText,
  Calendar,
  DollarSign,
  TrendingUp,
  BarChart3,
  Settings,
  Play,
  Pause,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Copy,
  Share,
  Send,
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
  ShieldCheck
} from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState('')
  const [showNewRunDialog, setShowNewRunDialog] = useState(false)
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [showChatDialog, setShowChatDialog] = useState(false)
  const [chatMessage, setChatMessage] = useState('')
  const [selectedRunType, setSelectedRunType] = useState('')
  const [runConfig, setRunConfig] = useState({
    notional: '',
    currency: 'USD',
    tenor: '5Y',
    fixedRate: '',
    floatingIndex: 'SOFR'
  })

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC')
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleNewIRSRun = () => {
    setSelectedRunType('IRS')
    setShowNewRunDialog(true)
  }

  const handleNewCCSRun = () => {
    setSelectedRunType('CCS')
    setShowNewRunDialog(true)
  }

  const handleUploadContract = () => {
    setShowUploadDialog(true)
  }

  const handleNewRun = () => {
    console.log('Starting new run:', { type: selectedRunType, config: runConfig })
    setShowNewRunDialog(false)
    setRunConfig({ notional: '', currency: 'USD', tenor: '5Y', fixedRate: '', floatingIndex: 'SOFR' })
    router.push('/runs')
  }

  const handleStartRun = () => {
    console.log('Starting new run:', { type: selectedRunType, config: runConfig })
    setShowNewRunDialog(false)
    setRunConfig({ notional: '', currency: 'USD', tenor: '5Y', fixedRate: '', floatingIndex: 'SOFR' })
    router.push('/runs')
  }

  const handleUpload = () => {
    console.log('Uploading contract')
    setShowUploadDialog(false)
    router.push('/intake')
  }

  const handleChat = () => {
    setShowChatDialog(true)
  }

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      console.log('Sending message:', chatMessage)
      setChatMessage('')
      setShowChatDialog(false)
    }
  }

  // Mock data for comprehensive dashboard
  const recentRuns = [
    { id: 'run-001', name: 'USD 5Y IRS', status: 'completed', pv: 125000, currency: 'USD', time: '2 min ago' },
    { id: 'run-002', name: 'EUR/USD CCS', status: 'running', pv: 0, currency: 'USD', time: '5 min ago' },
    { id: 'run-003', name: 'GBP 3Y IRS', status: 'failed', pv: 0, currency: 'GBP', time: '10 min ago' }
  ]

  const systemStatus = {
    totalRuns: 1247,
    activeRuns: 3,
    completedToday: 45,
    systemHealth: 'excellent'
  }

  const marketData = {
    usdOis: { rate: 4.25, change: 0.02 },
    eurOis: { rate: 3.15, change: -0.01 },
    gbpOis: { rate: 4.85, change: 0.03 },
    fxUsdEur: { rate: 1.0850, change: 0.0015 }
  }

  const alerts = [
    { id: 1, type: 'warning', message: 'Market data update required for EUR curves', time: '5 min ago' },
    { id: 2, type: 'info', message: 'New IFRS-13 compliance update available', time: '1 hour ago' },
    { id: 3, type: 'success', message: 'Backup completed successfully', time: '2 hours ago' }
  ]

  const quickActions = [
    { name: 'New IRS Run', icon: ArrowLeftRight, color: 'blue', action: handleNewIRSRun },
    { name: 'New CCS Run', icon: ArrowLeftRight, color: 'green', action: handleNewCCSRun },
    { name: 'Upload Contract', icon: Upload, color: 'purple', action: handleUploadContract },
    { name: 'Market Data', icon: TrendingUp, color: 'orange', action: () => router.push('/curves') },
    { name: 'Analytics', icon: BarChart3, color: 'red', action: () => router.push('/runs') },
    { name: 'Settings', icon: Settings, color: 'gray', action: () => router.push('/settings') }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedParticles />
      
      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="text-center py-8 sm:py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-2xl">VA</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Deloitte Valuation Platform
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
              Advanced Financial Risk Management & Compliance Platform
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button 
                onClick={handleNewIRSRun}
                size="lg"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
              >
                <Plus className="h-5 w-5 mr-2" />
                New IRS Run
              </Button>
              <Button 
                onClick={handleNewCCSRun}
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3"
              >
                <ArrowLeftRight className="h-5 w-5 mr-2" />
                New CCS Run
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {quickActions.map((action, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer" onClick={action.action}>
                <CardContent className="p-4 text-center">
                  <action.icon className={`h-8 w-8 text-${action.color}-400 mx-auto mb-2`} />
                  <h3 className="text-sm font-semibold text-white mb-1">{action.name}</h3>
                  <p className="text-xs text-gray-300">Quick access</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-300">Total Runs</p>
                    <p className="text-2xl font-bold text-white">{systemStatus.totalRuns.toLocaleString()}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-300">Active Runs</p>
                    <p className="text-2xl font-bold text-white">{systemStatus.activeRuns}</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-300">Completed Today</p>
                    <p className="text-2xl font-bold text-white">{systemStatus.completedToday}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-300">System Health</p>
                  <p className="text-lg font-bold text-green-400 capitalize">{systemStatus.systemHealth}</p>
                </div>
                <ShieldCheck className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Runs */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-white">Recent Runs</CardTitle>
              <CardDescription className="text-gray-300">Latest valuation calculations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentRuns.map((run) => (
                  <div key={run.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{run.name}</p>
                      <p className="text-xs text-gray-400">{run.time}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {run.status === 'completed' && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {run.pv > 0 ? `${run.pv.toLocaleString()} ${run.currency}` : 'Completed'}
                        </Badge>
                      )}
                      {run.status === 'running' && (
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                          <Clock className="h-3 w-3 mr-1" />
                          Running
                        </Badge>
                      )}
                      {run.status === 'failed' && (
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                          <XCircle className="h-3 w-3 mr-1" />
                          Failed
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button 
                  onClick={() => router.push('/runs')}
                  variant="outline" 
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  View All Runs
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Market Data */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Market Data</CardTitle>
              <CardDescription className="text-gray-300">Current rates and spreads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">USD OIS</span>
                  <div className="text-right">
                    <span className="text-white font-medium">{marketData.usdOis.rate}%</span>
                    <span className="text-green-400 text-xs ml-2">+{marketData.usdOis.change}bp</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">EUR OIS</span>
                  <div className="text-right">
                    <span className="text-white font-medium">{marketData.eurOis.rate}%</span>
                    <span className="text-red-400 text-xs ml-2">{marketData.eurOis.change}bp</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">GBP OIS</span>
                  <div className="text-right">
                    <span className="text-white font-medium">{marketData.gbpOis.rate}%</span>
                    <span className="text-green-400 text-xs ml-2">+{marketData.gbpOis.change}bp</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">USD/EUR</span>
                  <div className="text-right">
                    <span className="text-white font-medium">{marketData.fxUsdEur.rate}</span>
                    <span className="text-green-400 text-xs ml-2">+{marketData.fxUsdEur.change}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Button 
                  onClick={() => router.push('/curves')}
                  variant="outline" 
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  View Curves
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mt-6">
          <CardHeader>
            <CardTitle className="text-white">System Alerts</CardTitle>
            <CardDescription className="text-gray-300">Recent notifications and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.type === 'warning' ? 'bg-yellow-400' :
                    alert.type === 'info' ? 'bg-blue-400' :
                    'bg-green-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white">{alert.message}</p>
                    <p className="text-xs text-gray-400">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    {/* New Run Dialog */}
    <Dialog open={showNewRunDialog} onOpenChange={setShowNewRunDialog}>
      <DialogContent className="sm:max-w-md mx-4">
        <DialogHeader>
          <DialogTitle>New {selectedRunType} Run</DialogTitle>
          <DialogDescription>
            Configure your {selectedRunType} valuation parameters
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="notional">Notional</Label>
              <Input
                id="notional"
                placeholder="1000000"
                value={runConfig.notional}
                onChange={(e) => setRunConfig({...runConfig, notional: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select value={runConfig.currency} onValueChange={(value) => setRunConfig({...runConfig, currency: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tenor">Tenor</Label>
              <Select value={runConfig.tenor} onValueChange={(value) => setRunConfig({...runConfig, tenor: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1Y">1Y</SelectItem>
                  <SelectItem value="3Y">3Y</SelectItem>
                  <SelectItem value="5Y">5Y</SelectItem>
                  <SelectItem value="10Y">10Y</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="fixedRate">Fixed Rate (%)</Label>
              <Input
                id="fixedRate"
                placeholder="3.5"
                value={runConfig.fixedRate}
                onChange={(e) => setRunConfig({...runConfig, fixedRate: e.target.value})}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleNewRun} className="flex-1">
              Start Run
            </Button>
            <Button variant="outline" onClick={() => setShowNewRunDialog(false)} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    {/* Upload Dialog */}
    <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
      <DialogContent className="sm:max-w-md mx-4">
        <DialogHeader>
          <DialogTitle>Upload Contract</DialogTitle>
          <DialogDescription>
            Upload your financial contract for analysis
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600 mb-2">Drag and drop your contract here</p>
            <p className="text-xs text-gray-500">or click to browse</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleUpload} className="flex-1">
              Upload
            </Button>
            <Button variant="outline" onClick={() => setShowUploadDialog(false)} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    {/* Chat Dialog */}
    <Dialog open={showChatDialog} onOpenChange={setShowChatDialog}>
      <DialogContent className="sm:max-w-md mx-4">
        <DialogHeader>
          <DialogTitle>Chat Assistant</DialogTitle>
          <DialogDescription>
            Ask questions about your valuations
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="chatMessage">Message</Label>
            <Input
              id="chatMessage"
              placeholder="Ask about your valuation..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleSendMessage} className="flex-1">
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
            <Button variant="outline" onClick={() => setShowChatDialog(false)} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </div>
  )
}