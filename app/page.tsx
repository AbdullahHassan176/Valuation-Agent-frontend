'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PrintButton } from './_components/PrintButton'
import { AnimatedParticles } from './_components/AnimatedParticles'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
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
  Zap,
  Shield,
  Target,
  Activity,
  PieChart,
  LineChart,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronUp,
  ChevronLeft,
  Star,
  Heart,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Phone,
  Mail,
  Globe,
  Lock,
  Unlock,
  Key,
  Database,
  Server,
  Cloud,
  Wifi,
  WifiOff,
  Signal,
  Battery,
  BatteryLow,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Headphones,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Camera,
  Image,
  Film,
  Music,
  Radio,
  Tv,
  Gamepad2,
  Joystick,
  Mouse,
  Keyboard,
  HardDrive,
  Cpu,
  Disc,
  Usb,
  Bluetooth,
  Router,
  ToggleLeft,
  Network,
  Link,
  Link2,
  Unlink,
  Anchor,
  Compass,
  Map,
  MapPin,
  Navigation,
  Route,
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
    // Simulate starting a new run
    console.log('Starting new run:', { type: selectedRunType, config: runConfig })
    setShowNewRunDialog(false)
    setRunConfig({ notional: '', currency: 'USD', tenor: '5Y', fixedRate: '', floatingIndex: 'SOFR' })
    // Navigate to runs page or show success message
    router.push('/runs')
  }

  const handleStartRun = () => {
    // Simulate starting a new run
    console.log('Starting new run:', { type: selectedRunType, config: runConfig })
    setShowNewRunDialog(false)
    setRunConfig({ notional: '', currency: 'USD', tenor: '5Y', fixedRate: '', floatingIndex: 'SOFR' })
    // Navigate to runs page or show success message
    router.push('/runs')
  }

  const handleUpload = () => {
    // Simulate document upload
    console.log('Uploading document...')
    setShowUploadDialog(false)
    // Show success message or navigate to processing page
  }

  const handleUploadDocument = () => {
    // Simulate document upload
    console.log('Uploading document...')
    setShowUploadDialog(false)
    // Show success message or navigate to processing page
  }

  const handleChatSubmit = () => {
    if (chatMessage.trim()) {
      console.log('Chat message:', chatMessage)
      setChatMessage('')
      // Handle chat interaction
    }
  }

  const handleViewActivity = () => {
    router.push('/audit')
  }

  const handleViewDetailedReport = () => {
    router.push('/runs')
  }

  const handleGetRunStatus = () => {
    router.push('/runs')
  }

  const handleBumpSensitivity = () => {
    console.log('Bumping sensitivity +1bp')
    // Handle sensitivity bump
  }

  const handleFXSensitivity = () => {
    console.log('Applying FX sensitivity +1%')
    // Handle FX sensitivity
  }

  const handleExplainRun = () => {
    setShowChatDialog(true)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <AnimatedParticles />
      
      {/* Hero Section */}
      <section className="relative z-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-2xl mx-auto mb-6">
              <span className="text-white font-bold text-3xl">D</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white via-green-100 to-green-300 bg-clip-text text-transparent">
              Deloitte Valuation Platform
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Advanced Financial Risk Management & Compliance Platform for Interest Rate Swaps, 
              Cross-Currency Swaps, and Complex Derivative Instruments
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleNewRun}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Play className="w-5 h-5 mr-2" />
                Start New Valuation
              </Button>
              <Button 
                onClick={handleUpload}
                variant="outline"
                className="border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Documents
              </Button>
            </div>
          </div>
          
          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Advanced Analytics</h3>
              <p className="text-gray-400">Real-time risk metrics and comprehensive valuation analytics</p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">IFRS-13 Compliance</h3>
              <p className="text-gray-400">Automated compliance validation and audit trail generation</p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Bot className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Insights</h3>
              <p className="text-gray-400">Intelligent document analysis and automated risk assessment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Header with Deloitte Branding */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 px-8 py-8 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Deloitte Valuation Platform
              </h1>
              <p className="text-gray-300 text-lg">Advanced Financial Risk Management & Compliance</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-300">As of</div>
              <div className="text-lg font-medium text-white">{currentTime}</div>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                onClick={handleNewIRSRun}
                className="bg-green-600 hover:bg-green-700 text-black font-medium"
              >
                <Plus className="w-4 h-4 mr-2" />
                New IRS Run
              </Button>
              <Button 
                onClick={handleNewCCSRun}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                <ArrowLeftRight className="w-4 h-4 mr-2" />
                New CCS Run
              </Button>
              <Button 
                onClick={handleUploadContract}
                className="bg-gray-700 hover:bg-gray-600 text-white font-medium"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Contract
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Performance Indicators */}
      <section className="px-8 py-6 relative z-10">
        <h2 className="text-xl font-semibold text-white mb-6">Key Performance Indicators</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <Badge variant="secondary" className="text-xs">+12% vs last week</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-1">247</div>
              <div className="text-sm text-gray-300">Completed Runs</div>
              <div className="mt-3 text-xs text-gray-400">Last 30 days</div>
            </div>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <Badge variant="secondary" className="text-xs">Real-time</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-1">12</div>
              <div className="text-sm text-gray-300">Running</div>
              <div className="mt-3 text-xs text-gray-400">Active valuations</div>
            </div>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Hourglass className="w-6 h-6 text-orange-600" />
                </div>
                <Badge variant="secondary" className="text-xs">Priority queue</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-1">8</div>
              <div className="text-sm text-gray-300">Queued</div>
              <div className="mt-3 text-xs text-gray-400">Awaiting processing</div>
            </div>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <Badge variant="secondary" className="text-xs">Requires attention</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-1">3</div>
              <div className="text-sm text-gray-300">Failed</div>
              <div className="mt-3 text-xs text-gray-400">Last 24 hours</div>
            </div>
          </Card>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Run Status Distribution</h3>
                <Button variant="ghost" size="sm">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
              <div className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Chart visualization would go here</p>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Processing Time Trends</h3>
                <Button variant="ghost" size="sm">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
              <div className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <LineChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Chart visualization would go here</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-8 py-6 relative z-10">
        <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Play className="w-6 h-6 text-green-600" />
                </div>
                <Badge variant="secondary" className="text-xs">Avg. Processing Time: 3.1 min</Badge>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Start New Run</h3>
              <p className="text-gray-300 text-sm mb-4">Create a new valuation run for IRS or CCS instruments</p>
              <div className="flex space-x-2">
                <Button 
                  onClick={handleNewIRSRun}
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700 text-black"
                >
                  IRS Run
                </Button>
                <Button 
                  onClick={handleNewCCSRun}
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  CCS Run
                </Button>
              </div>
            </div>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Upload className="w-6 h-6 text-blue-600" />
                </div>
                <Badge variant="secondary" className="text-xs">Parsing Accuracy: 94.8%</Badge>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Contract Upload</h3>
              <p className="text-gray-300 text-sm mb-4">Upload and parse contract documents automatically</p>
              <div className="flex space-x-2">
                <Button 
                  onClick={handleUploadContract}
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Upload Document
                </Button>
                <Button 
                  onClick={handleViewActivity}
                  size="sm" 
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  View Activity
                </Button>
              </div>
            </div>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Bot className="w-6 h-6 text-purple-600" />
                </div>
                <Badge variant="secondary" className="text-xs">Available 24/7</Badge>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Valuation Assistant</h3>
              <p className="text-gray-300 text-sm mb-4">Get help with analysis, sensitivities, and IFRS-13 compliance</p>
              <div className="flex space-x-2">
                <Button 
                  onClick={handleExplainRun}
                  size="sm" 
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Ask Question
                </Button>
                <Button 
                  onClick={handleGetRunStatus}
                  size="sm" 
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Get Status
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="px-8 py-6 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
          <div className="flex space-x-2">
            <Button 
              onClick={handleViewActivity}
              variant="outline" 
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              View all activity
            </Button>
            <Select defaultValue="hourly">
              <SelectTrigger className="w-32 bg-gray-700 border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Reports</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-green-600" />
                    <div>
                      <div className="text-white font-medium">IRS_Valuation_Report.xlsx</div>
                      <div className="text-sm text-gray-400">VAL-2025-0118-001 • Generated: 5 min ago</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-600 text-white">IFRS-13 Approved</Badge>
                    <Button 
                      onClick={handleViewDetailedReport}
                      size="sm" 
                      variant="ghost"
                      className="text-gray-400 hover:text-white"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-blue-600" />
                    <div>
                      <div className="text-white font-medium">CCS_Analysis_Report.docx</div>
                      <div className="text-sm text-gray-400">VAL-2025-0118-002 • Generated: 12 min ago</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-yellow-600 text-white">Pending Review</Badge>
                    <Button 
                      onClick={handleViewDetailedReport}
                      size="sm" 
                      variant="ghost"
                      className="text-gray-400 hover:text-white"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-purple-600" />
                    <div>
                      <div className="text-white font-medium">Audit_Trail_Summary.pdf</div>
                      <div className="text-sm text-gray-400">Multiple Runs • Generated: 1 hour ago</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-600 text-white">Compliance Ready</Badge>
                    <Button 
                      onClick={handleViewDetailedReport}
                      size="sm" 
                      variant="ghost"
                      className="text-gray-400 hover:text-white"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">AI Interactions</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-600 bg-opacity-20 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium">Sensitivity Analysis Request</div>
                    <div className="text-sm text-gray-400">18 min ago • Generated +1bp parallel shift sensitivity for USD IRS portfolio</div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge className="bg-green-600 text-white text-xs">Completed</Badge>
                      <span className="text-xs text-gray-500">Run: VAL-2025-0118-001</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-600 bg-opacity-20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium">IFRS-13 Classification Query</div>
                    <div className="text-sm text-gray-400">32 min ago • Explained Level 2 vs Level 3 classification criteria for exotic derivatives</div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge className="bg-blue-600 text-white text-xs">Informational</Badge>
                      <span className="text-xs text-gray-500">User: Sarah Chen</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-600 bg-opacity-20 rounded-full flex items-center justify-center">
                    <Download className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium">Export Generation</div>
                    <div className="text-sm text-gray-400">1 hour ago • Created Excel export with detailed cashflow breakdown and sensitivities</div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge className="bg-green-600 text-white text-xs">Downloaded</Badge>
                      <span className="text-xs text-gray-500">Format: Excel</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleViewActivity}
                className="w-full mt-4 bg-gray-700 hover:bg-gray-600 text-white"
              >
                View Full Chat History →
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* System Alerts */}
      <section className="px-8 py-6 relative z-10">
        <h2 className="text-xl font-semibold text-white mb-6">System Alerts & Notifications</h2>
        
        <div className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-yellow-600 bg-opacity-20 rounded-full flex items-center justify-center">
                  <Bell className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">Scheduled Maintenance</h3>
                    <Badge className="bg-yellow-600 text-white">3 days ago</Badge>
                  </div>
                  <p className="text-gray-300 mb-2">System maintenance scheduled for Sunday, January 21, 2025 from 02:00-04:00 UTC. Valuation services will be temporarily unavailable.</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>Duration: 2 hours</span>
                    <span>•</span>
                    <span>Impact: Full system downtime</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-green-600 bg-opacity-20 rounded-full flex items-center justify-center">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">New Feature: Enhanced Sensitivity Analysis</h3>
                    <Badge className="bg-green-600 text-white">Yesterday</Badge>
                  </div>
                  <p className="text-gray-300 mb-2">We've added support for custom shock scenarios and parallel/non-parallel curve shifts. Try the new sensitivity builder in your next valuation run.</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>Version: 2.1.4</span>
                    <span>•</span>
                    <span>Released: Yesterday</span>
                    <Button 
                      onClick={handleViewDetailedReport}
                      size="sm" 
                      variant="ghost"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Learn more →
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-green-600 bg-opacity-20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">Data Feed Restored</h3>
                    <Badge className="bg-green-600 text-white">Resolved</Badge>
                  </div>
                  <p className="text-gray-300 mb-2">GBP OIS curve data feed has been restored. All pending runs using GBP instruments will resume automatically.</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>Affected runs: 3</span>
                    <span>•</span>
                    <span>Downtime: 8 minutes</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* New Run Dialog */}
      <Dialog open={showNewRunDialog} onOpenChange={setShowNewRunDialog}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Create New {selectedRunType} Run</DialogTitle>
            <DialogDescription>
              Configure the parameters for your new valuation run.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="notional" className="text-gray-300">Notional Amount</Label>
                <Input
                  id="notional"
                  value={runConfig.notional}
                  onChange={(e) => setRunConfig({...runConfig, notional: e.target.value})}
                  placeholder="10,000,000"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="currency" className="text-gray-300">Currency</Label>
                <Select value={runConfig.currency} onValueChange={(value) => setRunConfig({...runConfig, currency: value})}>
                  <SelectTrigger className="bg-gray-700 border-gray-600">
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
                <Label htmlFor="tenor" className="text-gray-300">Tenor</Label>
                <Select value={runConfig.tenor} onValueChange={(value) => setRunConfig({...runConfig, tenor: value})}>
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1Y">1 Year</SelectItem>
                    <SelectItem value="2Y">2 Years</SelectItem>
                    <SelectItem value="5Y">5 Years</SelectItem>
                    <SelectItem value="10Y">10 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="fixedRate" className="text-gray-300">Fixed Rate (%)</Label>
                <Input
                  id="fixedRate"
                  value={runConfig.fixedRate}
                  onChange={(e) => setRunConfig({...runConfig, fixedRate: e.target.value})}
                  placeholder="3.50"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="floatingIndex" className="text-gray-300">Floating Index</Label>
              <Select value={runConfig.floatingIndex} onValueChange={(value) => setRunConfig({...runConfig, floatingIndex: value})}>
                <SelectTrigger className="bg-gray-700 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SOFR">SOFR</SelectItem>
                  <SelectItem value="LIBOR">LIBOR</SelectItem>
                  <SelectItem value="EURIBOR">EURIBOR</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button 
                onClick={() => setShowNewRunDialog(false)}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleStartRun}
                className="bg-green-600 hover:bg-green-700 text-black"
              >
                Start Run
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Upload Contract Document</DialogTitle>
            <DialogDescription>
              Upload a contract document for automatic parsing and analysis.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-300 mb-2">Drop your contract file here or click to browse</p>
              <p className="text-sm text-gray-400">Supported formats: PDF, DOC, DOCX</p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button 
                onClick={() => setShowUploadDialog(false)}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleUploadDocument}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Upload Document
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Chat Dialog */}
      <Dialog open={showChatDialog} onOpenChange={setShowChatDialog}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Valuation Assistant</DialogTitle>
            <DialogDescription>
              Ask questions about valuations, sensitivities, or IFRS-13 compliance.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="h-64 bg-gray-700 rounded-lg p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-600 bg-opacity-20 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium">Valuation Assistant</div>
                    <div className="text-gray-300 text-sm">Hello! I can help you analyze runs, generate sensitivities, explain valuation methodologies, and export reports. What would you like to do?</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Input
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Ask about valuations, sensitivities, or IFRS-13..."
                className="bg-gray-700 border-gray-600 text-white"
                onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
              />
              <Button 
                onClick={handleChatSubmit}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex justify-end space-x-2">
              <Button 
                onClick={() => setShowChatDialog(false)}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}