"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  ChevronLeft,
  Server,
  Database,
  Key,
  Sliders,
  Clock,
  Cpu,
  ShieldCheck,
  Palette,
  Languages,
  Accessibility,
  Plug,
  Webhook,
  Cloud,
  Shield,
  Lock,
  ClipboardCheck,
  Save,
  Eye,
  Undo,
  Check,
  AlertTriangle,
  Info,
  Moon,
  Sun,
  Monitor,
  Archive,
  Download,
  RefreshCw,
  Upload,
  TestTube,
  Bell,
  Settings,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  List,
  Calculator,
  TrendingUp,
  Scale,
  Hourglass,
  Layers,
  FileText,
  Globe,
  Building,
  Users,
  EyeOff,
  Copy,
  ExternalLink,
  ChevronDown
} from "lucide-react"

interface EnvironmentSettings {
  currentEnvironment: string
  debugLevel: string
  rateLimiting: number
  cacheTTL: number
  enableMonitoring: boolean
  autoScaling: boolean
}

interface ValuationThresholds {
  day1PnLTolerance: number
  level2Threshold: number
  marketDataStaleness: number
  maxNotional: number
  cvaThreshold: number
  maxProcessingTime: number
  concurrentRunsLimit: number
  queueDepthLimit: number
  curveSmoothnessTolerance: number
  priceValidationSpread: number
}

interface ThemeSettings {
  interfaceTheme: string
  accentColor: string
  fontFamily: string
  fontSizeScale: string
  compactMode: boolean
  autoCollapseSidebar: boolean
  showTooltips: boolean
  animations: boolean
  numberFormat: string
  decimalPrecision: number
}

interface NotificationSettings {
  runCompletion: boolean
  runFailures: boolean
  ifrsReviews: boolean
  systemMaintenance: boolean
  emailAddress: string
  frequency: string
  includeAttachments: boolean
  slackNotifications: boolean
  teamsIntegration: boolean
  webhookUrls: boolean
  webhookUrl: string
}

interface DataManagement {
  valuationRunData: string
  auditLogs: string
  exportFiles: string
  currentUsage: number
  totalStorage: number
  autoCleanup: boolean
  compression: boolean
  backupFrequency: string
  backupLocation: string
  lastBackup: string
  encryptBackups: boolean
  realTimeSync: boolean
  crossRegionReplication: boolean
}

interface SecuritySettings {
  authenticationMethod: string
  multiFactorAuth: boolean
  sessionTimeout: number
  rememberMe: boolean
  defaultRole: string
  roleBasedAccess: boolean
  ipRestrictions: boolean
  activePermissions: string[]
}

export default function SettingsPage() {
  const [selectedSection, setSelectedSection] = useState("thresholds")
  const [environmentSettings, setEnvironmentSettings] = useState<EnvironmentSettings>({
    currentEnvironment: "dev",
    debugLevel: "info",
    rateLimiting: 100,
    cacheTTL: 300,
    enableMonitoring: true,
    autoScaling: false
  })

  const [valuationThresholds, setValuationThresholds] = useState<ValuationThresholds>({
    day1PnLTolerance: 0.5,
    level2Threshold: 10,
    marketDataStaleness: 15,
    maxNotional: 1000000000,
    cvaThreshold: 10000000,
    maxProcessingTime: 600,
    concurrentRunsLimit: 25,
    queueDepthLimit: 100,
    curveSmoothnessTolerance: 5,
    priceValidationSpread: 2.5
  })

  const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
    interfaceTheme: "dark",
    accentColor: "green",
    fontFamily: "inter",
    fontSizeScale: "medium",
    compactMode: false,
    autoCollapseSidebar: true,
    showTooltips: true,
    animations: true,
    numberFormat: "us",
    decimalPrecision: 4
  })

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    runCompletion: true,
    runFailures: true,
    ifrsReviews: true,
    systemMaintenance: false,
    emailAddress: "alex.johnson@company.com",
    frequency: "immediate",
    includeAttachments: false,
    slackNotifications: false,
    teamsIntegration: false,
    webhookUrls: true,
    webhookUrl: "https://api.company.com/webhook"
  })

  const [dataManagement, setDataManagement] = useState<DataManagement>({
    valuationRunData: "180",
    auditLogs: "2555",
    exportFiles: "90",
    currentUsage: 2.4,
    totalStorage: 5.0,
    autoCleanup: true,
    compression: true,
    backupFrequency: "daily",
    backupLocation: "s3",
    lastBackup: "2 hours ago",
    encryptBackups: true,
    realTimeSync: true,
    crossRegionReplication: false
  })

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    authenticationMethod: "saml",
    multiFactorAuth: true,
    sessionTimeout: 30,
    rememberMe: false,
    defaultRole: "analyst",
    roleBasedAccess: true,
    ipRestrictions: false,
    activePermissions: ["View Runs", "Create Instruments", "Export Data", "View Audit Logs"]
  })

  const handleSave = () => {
    // Save logic here
    console.log("Saving settings...")
  }

  const handleReset = () => {
    // Reset logic here
    console.log("Resetting to defaults...")
  }

  const handlePreview = () => {
    // Preview logic here
    console.log("Previewing changes...")
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case "info":
        return <Info className="w-4 h-4 text-blue-600" />
      default:
        return <CheckCircle className="w-4 h-4 text-green-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Settings Secondary Navigation */}
      <div className="fixed left-64 top-16 bottom-0 w-80 bg-gray-800 border-r border-gray-700 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-xl font-semibold text-white">Configuration Settings</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide mb-4">Environment Management</h3>
              <nav className="space-y-1">
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white">
                  <Server className="w-5 h-5 mr-3" />
                  Environment Setup
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white">
                  <Database className="w-5 h-5 mr-3" />
                  Data Sources
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white">
                  <Key className="w-5 h-5 mr-3" />
                  API Configuration
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </Button>
              </nav>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide mb-4">System Parameters</h3>
              <nav className="space-y-1">
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${selectedSection === "thresholds" ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`}
                  onClick={() => setSelectedSection("thresholds")}
                >
                  <Sliders className="w-5 h-5 mr-3" />
                  Thresholds & Limits
                  <div className="ml-auto w-2 h-2 bg-green-600 rounded-full"></div>
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white">
                  <Clock className="w-5 h-5 mr-3" />
                  Processing Timeouts
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white">
                  <Cpu className="w-5 h-5 mr-3" />
                  Resource Allocation
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white">
                  <ShieldCheck className="w-5 h-5 mr-3" />
                  Validation Rules
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </Button>
              </nav>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide mb-4">User Interface</h3>
              <nav className="space-y-1">
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white">
                  <Palette className="w-5 h-5 mr-3" />
                  Theme & Appearance
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white">
                  <Languages className="w-5 h-5 mr-3" />
                  Localization
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white">
                  <Accessibility className="w-5 h-5 mr-3" />
                  Accessibility
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </Button>
              </nav>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide mb-4">Integration</h3>
              <nav className="space-y-1">
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white">
                  <Plug className="w-5 h-5 mr-3" />
                  External Systems
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white">
                  <Webhook className="w-5 h-5 mr-3" />
                  Webhooks
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white">
                  <Cloud className="w-5 h-5 mr-3" />
                  Cloud Services
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </Button>
              </nav>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide mb-4">Security & Compliance</h3>
              <nav className="space-y-1">
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white">
                  <Shield className="w-5 h-5 mr-3" />
                  Authentication
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white">
                  <Lock className="w-5 h-5 mr-3" />
                  Encryption Settings
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white">
                  <ClipboardCheck className="w-5 h-5 mr-3" />
                  Audit Configuration
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main Configuration Content */}
      <main className="ml-[624px] pt-16 min-h-screen bg-gray-900">
        
        {/* Configuration Header */}
        <section className="bg-gray-800 border-b border-gray-700 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-white mb-2">Thresholds & Limits Configuration</h1>
              <p className="text-gray-300">Manage system parameters, validation thresholds, and processing limits</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button className="bg-gray-700 hover:bg-gray-600 text-white">
                <Undo className="w-4 h-4 mr-2" />
                Reset to Defaults
              </Button>
              <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
                <Eye className="w-4 h-4 mr-2" />
                Preview Changes
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-black font-medium">
                <Save className="w-4 h-4 mr-2" />
                Save Configuration
              </Button>
            </div>
          </div>
        </section>

        {/* Environment Configuration */}
        <section className="px-8 py-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold text-white mb-2">Environment Settings</CardTitle>
                  <CardDescription className="text-gray-300">Configure environment-specific parameters and behaviors</CardDescription>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-yellow-600 text-white">DEV</Badge>
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="block text-sm font-medium text-gray-300 mb-2">Current Environment</Label>
                    <Select value={environmentSettings.currentEnvironment} onValueChange={(value) => setEnvironmentSettings({...environmentSettings, currentEnvironment: value})}>
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dev">Development</SelectItem>
                        <SelectItem value="test">Test</SelectItem>
                        <SelectItem value="staging">Staging</SelectItem>
                        <SelectItem value="prod">Production</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-gray-300 mb-2">Debug Level</Label>
                    <Select value={environmentSettings.debugLevel} onValueChange={(value) => setEnvironmentSettings({...environmentSettings, debugLevel: value})}>
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="error">Error Only</SelectItem>
                        <SelectItem value="warn">Warning</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="debug">Debug</SelectItem>
                        <SelectItem value="trace">Trace</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label className="block text-sm font-medium text-gray-300 mb-2">Rate Limiting</Label>
                    <div className="flex items-center space-x-3">
                      <Input 
                        type="number" 
                        value={environmentSettings.rateLimiting}
                        onChange={(e) => setEnvironmentSettings({...environmentSettings, rateLimiting: parseInt(e.target.value)})}
                        className="flex-1 bg-gray-700 border-gray-600 text-white"
                      />
                      <span className="text-gray-300 text-sm">req/min</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-gray-300 mb-2">Cache TTL</Label>
                    <div className="flex items-center space-x-3">
                      <Input 
                        type="number" 
                        value={environmentSettings.cacheTTL}
                        onChange={(e) => setEnvironmentSettings({...environmentSettings, cacheTTL: parseInt(e.target.value)})}
                        className="flex-1 bg-gray-700 border-gray-600 text-white"
                      />
                      <span className="text-gray-300 text-sm">seconds</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-gray-300">Enable Monitoring</Label>
                    <Switch 
                      checked={environmentSettings.enableMonitoring}
                      onCheckedChange={(checked) => setEnvironmentSettings({...environmentSettings, enableMonitoring: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-gray-300">Auto-scaling</Label>
                    <Switch 
                      checked={environmentSettings.autoScaling}
                      onCheckedChange={(checked) => setEnvironmentSettings({...environmentSettings, autoScaling: checked})}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Valuation Thresholds */}
        <section className="px-8 py-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold text-white mb-2">Valuation Thresholds</CardTitle>
                  <CardDescription className="text-gray-300">Configure IFRS-13 compliance thresholds and validation limits</CardDescription>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Info className="w-4 h-4 mr-2" />
                  Documentation
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">IFRS-13 Parameters</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label className="block text-sm font-medium text-gray-300 mb-2">Day-1 P&L Tolerance</Label>
                        <div className="flex items-center space-x-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <Input 
                                type="number" 
                                value={valuationThresholds.day1PnLTolerance}
                                onChange={(e) => setValuationThresholds({...valuationThresholds, day1PnLTolerance: parseFloat(e.target.value)})}
                                step="0.1"
                                className="flex-1 bg-gray-700 border-gray-600 text-white"
                              />
                              <span className="text-gray-300 text-sm">%</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">Threshold for Day-1 P&L recognition flags</p>
                          </div>
                          <div className="w-16 h-12 bg-green-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                            <Check className="w-5 h-5 text-green-600" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="block text-sm font-medium text-gray-300 mb-2">Level 2/3 Classification Threshold</Label>
                        <div className="flex items-center space-x-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <Input 
                                type="number" 
                                value={valuationThresholds.level2Threshold}
                                onChange={(e) => setValuationThresholds({...valuationThresholds, level2Threshold: parseInt(e.target.value)})}
                                className="flex-1 bg-gray-700 border-gray-600 text-white"
                              />
                              <span className="text-gray-300 text-sm">%</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">Unobservable input impact threshold</p>
                          </div>
                          <div className="w-16 h-12 bg-yellow-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-yellow-600" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="block text-sm font-medium text-gray-300 mb-2">Market Data Staleness Limit</Label>
                        <div className="flex items-center space-x-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <Input 
                                type="number" 
                                value={valuationThresholds.marketDataStaleness}
                                onChange={(e) => setValuationThresholds({...valuationThresholds, marketDataStaleness: parseInt(e.target.value)})}
                                step="5"
                                className="flex-1 bg-gray-700 border-gray-600 text-white"
                              />
                              <span className="text-gray-300 text-sm">minutes</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">Maximum age for market data to be considered fresh</p>
                          </div>
                          <div className="w-16 h-12 bg-blue-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                            <Clock className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Risk Parameters</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label className="block text-sm font-medium text-gray-300 mb-2">Maximum Notional (Single Trade)</Label>
                        <div className="flex items-center space-x-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <Input 
                                type="number" 
                                value={valuationThresholds.maxNotional}
                                onChange={(e) => setValuationThresholds({...valuationThresholds, maxNotional: parseInt(e.target.value)})}
                                className="flex-1 bg-gray-700 border-gray-600 text-white"
                              />
                              <span className="text-gray-300 text-sm">USD</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">1 Billion USD equivalent maximum</p>
                          </div>
                          <div className="w-16 h-12 bg-red-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                            <Shield className="w-5 h-5 text-red-600" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="block text-sm font-medium text-gray-300 mb-2">CVA Calculation Threshold</Label>
                        <div className="flex items-center space-x-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <Input 
                                type="number" 
                                value={valuationThresholds.cvaThreshold}
                                onChange={(e) => setValuationThresholds({...valuationThresholds, cvaThreshold: parseInt(e.target.value)})}
                                className="flex-1 bg-gray-700 border-gray-600 text-white"
                              />
                              <span className="text-gray-300 text-sm">USD</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">Minimum exposure for mandatory CVA calculation</p>
                          </div>
                          <div className="w-16 h-12 bg-green-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                            <Calculator className="w-5 h-5 text-green-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Processing Limits</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label className="block text-sm font-medium text-gray-300 mb-2">Maximum Processing Time</Label>
                        <div className="flex items-center space-x-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <Input 
                                type="number" 
                                value={valuationThresholds.maxProcessingTime}
                                onChange={(e) => setValuationThresholds({...valuationThresholds, maxProcessingTime: parseInt(e.target.value)})}
                                className="flex-1 bg-gray-700 border-gray-600 text-white"
                              />
                              <span className="text-gray-300 text-sm">seconds</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">10 minutes timeout for valuation runs</p>
                          </div>
                          <div className="w-16 h-12 bg-yellow-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                            <Hourglass className="w-5 h-5 text-yellow-600" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="block text-sm font-medium text-gray-300 mb-2">Concurrent Runs Limit</Label>
                        <div className="flex items-center space-x-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <Input 
                                type="number" 
                                value={valuationThresholds.concurrentRunsLimit}
                                onChange={(e) => setValuationThresholds({...valuationThresholds, concurrentRunsLimit: parseInt(e.target.value)})}
                                className="flex-1 bg-gray-700 border-gray-600 text-white"
                              />
                              <span className="text-gray-300 text-sm">runs</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">Maximum simultaneous valuation processes</p>
                          </div>
                          <div className="w-16 h-12 bg-blue-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                            <Layers className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="block text-sm font-medium text-gray-300 mb-2">Queue Depth Limit</Label>
                        <div className="flex items-center space-x-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <Input 
                                type="number" 
                                value={valuationThresholds.queueDepthLimit}
                                onChange={(e) => setValuationThresholds({...valuationThresholds, queueDepthLimit: parseInt(e.target.value)})}
                                className="flex-1 bg-gray-700 border-gray-600 text-white"
                              />
                              <span className="text-gray-300 text-sm">jobs</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">Maximum queued valuation jobs</p>
                          </div>
                          <div className="w-16 h-12 bg-green-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                            <List className="w-5 h-5 text-green-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Data Quality Checks</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label className="block text-sm font-medium text-gray-300 mb-2">Curve Smoothness Tolerance</Label>
                        <div className="flex items-center space-x-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <Input 
                                type="number" 
                                value={valuationThresholds.curveSmoothnessTolerance}
                                onChange={(e) => setValuationThresholds({...valuationThresholds, curveSmoothnessTolerance: parseFloat(e.target.value)})}
                                step="0.5"
                                className="flex-1 bg-gray-700 border-gray-600 text-white"
                              />
                              <span className="text-gray-300 text-sm">bp</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">Maximum allowed curve discontinuity</p>
                          </div>
                          <div className="w-16 h-12 bg-yellow-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-yellow-600" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="block text-sm font-medium text-gray-300 mb-2">Price Validation Spread</Label>
                        <div className="flex items-center space-x-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <Input 
                                type="number" 
                                value={valuationThresholds.priceValidationSpread}
                                onChange={(e) => setValuationThresholds({...valuationThresholds, priceValidationSpread: parseFloat(e.target.value)})}
                                step="0.1"
                                className="flex-1 bg-gray-700 border-gray-600 text-white"
                              />
                              <span className="text-gray-300 text-sm">%</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">Maximum bid-offer spread for validation</p>
                          </div>
                          <div className="w-16 h-12 bg-green-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                            <Scale className="w-5 h-5 text-green-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Theme Configuration */}
        <section className="px-8 py-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold text-white mb-2">Theme & Appearance</CardTitle>
                  <CardDescription className="text-gray-300">Customize the visual appearance and user interface preferences</CardDescription>
                </div>
                <Button className="bg-gray-700 hover:bg-gray-600 text-white">
                  <Eye className="w-4 h-4 mr-2" />
                  Live Preview
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Color Scheme</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label className="block text-sm font-medium text-gray-300 mb-3">Interface Theme</Label>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="relative">
                            <input type="radio" name="theme" id="dark-theme" className="sr-only peer" checked={themeSettings.interfaceTheme === "dark"} onChange={() => setThemeSettings({...themeSettings, interfaceTheme: "dark"})} />
                            <label htmlFor="dark-theme" className="flex items-center justify-center h-20 bg-gray-900 border-2 border-green-600 rounded-lg cursor-pointer peer-checked:border-green-600">
                              <div className="text-center">
                                <Moon className="w-5 h-5 text-white mb-1" />
                                <div className="text-sm text-white">Dark</div>
                              </div>
                            </label>
                          </div>
                          
                          <div className="relative">
                            <input type="radio" name="theme" id="light-theme" className="sr-only peer" checked={themeSettings.interfaceTheme === "light"} onChange={() => setThemeSettings({...themeSettings, interfaceTheme: "light"})} />
                            <label htmlFor="light-theme" className="flex items-center justify-center h-20 bg-gray-100 border-2 border-gray-600 rounded-lg cursor-pointer peer-checked:border-green-600">
                              <div className="text-center">
                                <Sun className="w-5 h-5 text-gray-900 mb-1" />
                                <div className="text-sm text-gray-900">Light</div>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="block text-sm font-medium text-gray-300 mb-3">Accent Color</Label>
                        <div className="grid grid-cols-4 gap-3">
                          <div className="relative">
                            <input type="radio" name="accent" id="green-accent" className="sr-only peer" checked={themeSettings.accentColor === "green"} onChange={() => setThemeSettings({...themeSettings, accentColor: "green"})} />
                            <label htmlFor="green-accent" className="block w-full h-12 bg-green-600 rounded-lg cursor-pointer border-2 border-transparent peer-checked:border-white"></label>
                          </div>
                          <div className="relative">
                            <input type="radio" name="accent" id="blue-accent" className="sr-only peer" checked={themeSettings.accentColor === "blue"} onChange={() => setThemeSettings({...themeSettings, accentColor: "blue"})} />
                            <label htmlFor="blue-accent" className="block w-full h-12 bg-blue-600 rounded-lg cursor-pointer border-2 border-transparent peer-checked:border-white"></label>
                          </div>
                          <div className="relative">
                            <input type="radio" name="accent" id="orange-accent" className="sr-only peer" checked={themeSettings.accentColor === "orange"} onChange={() => setThemeSettings({...themeSettings, accentColor: "orange"})} />
                            <label htmlFor="orange-accent" className="block w-full h-12 bg-yellow-600 rounded-lg cursor-pointer border-2 border-transparent peer-checked:border-white"></label>
                          </div>
                          <div className="relative">
                            <input type="radio" name="accent" id="purple-accent" className="sr-only peer" checked={themeSettings.accentColor === "purple"} onChange={() => setThemeSettings({...themeSettings, accentColor: "purple"})} />
                            <label htmlFor="purple-accent" className="block w-full h-12 bg-purple-600 rounded-lg cursor-pointer border-2 border-transparent peer-checked:border-white"></label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Typography</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label className="block text-sm font-medium text-gray-300 mb-2">Font Family</Label>
                        <Select value={themeSettings.fontFamily} onValueChange={(value) => setThemeSettings({...themeSettings, fontFamily: value})}>
                          <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="inter">Inter (Recommended)</SelectItem>
                            <SelectItem value="system">System Default</SelectItem>
                            <SelectItem value="helvetica">Helvetica Neue</SelectItem>
                            <SelectItem value="arial">Arial</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="block text-sm font-medium text-gray-300 mb-2">Font Size Scale</Label>
                        <Select value={themeSettings.fontSizeScale} onValueChange={(value) => setThemeSettings({...themeSettings, fontSizeScale: value})}>
                          <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Small</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="large">Large</SelectItem>
                            <SelectItem value="extra-large">Extra Large</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Layout Preferences</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium text-gray-300">Compact Mode</Label>
                          <p className="text-xs text-gray-400">Reduce spacing and padding for denser layouts</p>
                        </div>
                        <Switch 
                          checked={themeSettings.compactMode}
                          onCheckedChange={(checked) => setThemeSettings({...themeSettings, compactMode: checked})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium text-gray-300">Auto-collapse Sidebar</Label>
                          <p className="text-xs text-gray-400">Automatically collapse navigation on smaller screens</p>
                        </div>
                        <Switch 
                          checked={themeSettings.autoCollapseSidebar}
                          onCheckedChange={(checked) => setThemeSettings({...themeSettings, autoCollapseSidebar: checked})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium text-gray-300">Show Tooltips</Label>
                          <p className="text-xs text-gray-400">Display helpful tooltips on hover</p>
                        </div>
                        <Switch 
                          checked={themeSettings.showTooltips}
                          onCheckedChange={(checked) => setThemeSettings({...themeSettings, showTooltips: checked})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium text-gray-300">Animations</Label>
                          <p className="text-xs text-gray-400">Enable smooth transitions and animations</p>
                        </div>
                        <Switch 
                          checked={themeSettings.animations}
                          onCheckedChange={(checked) => setThemeSettings({...themeSettings, animations: checked})}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Data Display</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label className="block text-sm font-medium text-gray-300 mb-2">Number Format</Label>
                        <Select value={themeSettings.numberFormat} onValueChange={(value) => setThemeSettings({...themeSettings, numberFormat: value})}>
                          <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us">US Format (1,234.56)</SelectItem>
                            <SelectItem value="eu">European Format (1.234,56)</SelectItem>
                            <SelectItem value="uk">UK Format (1,234.56)</SelectItem>
                            <SelectItem value="scientific">Scientific (1.23E+3)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="block text-sm font-medium text-gray-300 mb-2">Decimal Precision</Label>
                        <div className="flex items-center space-x-3">
                          <Slider
                            value={[themeSettings.decimalPrecision]}
                            onValueChange={(value) => setThemeSettings({...themeSettings, decimalPrecision: value[0]})}
                            max={8}
                            min={2}
                            step={1}
                            className="flex-1"
                          />
                          <span className="text-white text-sm w-8">{themeSettings.decimalPrecision}</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Number of decimal places to display</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Notification Preferences */}
        <section className="px-8 py-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold text-white mb-2">Notification Settings</CardTitle>
                  <CardDescription className="text-gray-300">Configure system alerts, email notifications, and communication preferences</CardDescription>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <TestTube className="w-4 h-4 mr-2" />
                  Test Notifications
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">System Alerts</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <Label className="text-sm font-medium text-gray-300">Run Completion</Label>
                        <p className="text-xs text-gray-400">Notify when valuation runs complete</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.runCompletion}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, runCompletion: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <Label className="text-sm font-medium text-gray-300">Run Failures</Label>
                        <p className="text-xs text-gray-400">Immediate notification for failed runs</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.runFailures}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, runFailures: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <Label className="text-sm font-medium text-gray-300">IFRS-13 Reviews</Label>
                        <p className="text-xs text-gray-400">Alert for pending compliance reviews</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.ifrsReviews}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, ifrsReviews: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <Label className="text-sm font-medium text-gray-300">System Maintenance</Label>
                        <p className="text-xs text-gray-400">Scheduled maintenance notifications</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.systemMaintenance}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, systemMaintenance: checked})}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Email Notifications</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="block text-sm font-medium text-gray-300 mb-2">Email Address</Label>
                      <Input 
                        type="email" 
                        value={notificationSettings.emailAddress}
                        onChange={(e) => setNotificationSettings({...notificationSettings, emailAddress: e.target.value})}
                        className="w-full bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    
                    <div>
                      <Label className="block text-sm font-medium text-gray-300 mb-2">Frequency</Label>
                      <Select value={notificationSettings.frequency} onValueChange={(value) => setNotificationSettings({...notificationSettings, frequency: value})}>
                        <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate</SelectItem>
                          <SelectItem value="hourly">Hourly Digest</SelectItem>
                          <SelectItem value="daily">Daily Summary</SelectItem>
                          <SelectItem value="weekly">Weekly Report</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <Label className="text-sm font-medium text-gray-300">Include Attachments</Label>
                        <p className="text-xs text-gray-400">Attach reports and logs to emails</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.includeAttachments}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, includeAttachments: checked})}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Integration Alerts</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <Label className="text-sm font-medium text-gray-300">Slack Notifications</Label>
                        <p className="text-xs text-gray-400">Send alerts to Slack channels</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.slackNotifications}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, slackNotifications: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <Label className="text-sm font-medium text-gray-300">Teams Integration</Label>
                        <p className="text-xs text-gray-400">Microsoft Teams notifications</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.teamsIntegration}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, teamsIntegration: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <Label className="text-sm font-medium text-gray-300">Webhook URLs</Label>
                        <p className="text-xs text-gray-400">Custom webhook endpoints</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.webhookUrls}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, webhookUrls: checked})}
                      />
                    </div>
                    
                    <div className="mt-3">
                      <Input 
                        type="url" 
                        placeholder="https://api.company.com/webhook" 
                        value={notificationSettings.webhookUrl}
                        onChange={(e) => setNotificationSettings({...notificationSettings, webhookUrl: e.target.value})}
                        className="w-full bg-gray-700 border-gray-600 text-white text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Data Management Configuration */}
        <section className="px-8 py-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold text-white mb-2">Data Management</CardTitle>
                  <CardDescription className="text-gray-300">Configure data retention, backup policies, and storage preferences</CardDescription>
                </div>
                <div className="flex items-center space-x-3">
                  <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
                    <Database className="w-4 h-4 mr-2" />
                    Check Storage
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Sync Now
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Retention Policies</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label className="block text-sm font-medium text-gray-300 mb-2">Valuation Run Data</Label>
                        <div className="flex items-center space-x-4">
                          <div className="flex-1">
                            <Select value={dataManagement.valuationRunData} onValueChange={(value) => setDataManagement({...dataManagement, valuationRunData: value})}>
                              <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="30">30 days</SelectItem>
                                <SelectItem value="90">90 days</SelectItem>
                                <SelectItem value="180">180 days</SelectItem>
                                <SelectItem value="365">1 year</SelectItem>
                                <SelectItem value="1095">3 years</SelectItem>
                                <SelectItem value="permanent">Permanent</SelectItem>
                              </SelectContent>
                            </Select>
                            <p className="text-xs text-gray-400 mt-1">How long to keep completed run data</p>
                          </div>
                          <div className="w-16 h-12 bg-blue-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                            <Archive className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="block text-sm font-medium text-gray-300 mb-2">Audit Logs</Label>
                        <div className="flex items-center space-x-4">
                          <div className="flex-1">
                            <Select value={dataManagement.auditLogs} onValueChange={(value) => setDataManagement({...dataManagement, auditLogs: value})}>
                              <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="365">1 year</SelectItem>
                                <SelectItem value="1095">3 years</SelectItem>
                                <SelectItem value="2555">7 years</SelectItem>
                                <SelectItem value="permanent">Permanent</SelectItem>
                              </SelectContent>
                            </Select>
                            <p className="text-xs text-gray-400 mt-1">Regulatory compliance requirement</p>
                          </div>
                          <div className="w-16 h-12 bg-green-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                            <ClipboardCheck className="w-5 h-5 text-green-600" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="block text-sm font-medium text-gray-300 mb-2">Export Files</Label>
                        <div className="flex items-center space-x-4">
                          <div className="flex-1">
                            <Select value={dataManagement.exportFiles} onValueChange={(value) => setDataManagement({...dataManagement, exportFiles: value})}>
                              <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="30">30 days</SelectItem>
                                <SelectItem value="90">90 days</SelectItem>
                                <SelectItem value="180">180 days</SelectItem>
                                <SelectItem value="365">1 year</SelectItem>
                              </SelectContent>
                            </Select>
                            <p className="text-xs text-gray-400 mt-1">Generated Excel/PDF/Word files</p>
                          </div>
                          <div className="w-16 h-12 bg-yellow-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                            <Download className="w-5 h-5 text-yellow-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Storage Configuration</h3>
                    
                    <div className="space-y-4">
                      <div className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-300">Current Usage</span>
                          <span className="text-white font-medium">{dataManagement.currentUsage} TB / {dataManagement.totalStorage} TB</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{width: `${(dataManagement.currentUsage / dataManagement.totalStorage) * 100}%`}}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>{Math.round((dataManagement.currentUsage / dataManagement.totalStorage) * 100)}% utilized</span>
                          <span>{dataManagement.totalStorage - dataManagement.currentUsage} TB remaining</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <Label className="text-sm font-medium text-gray-300">Auto-cleanup</Label>
                          <p className="text-xs text-gray-400">Automatically remove expired data</p>
                        </div>
                        <Switch 
                          checked={dataManagement.autoCleanup}
                          onCheckedChange={(checked) => setDataManagement({...dataManagement, autoCleanup: checked})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <Label className="text-sm font-medium text-gray-300">Compression</Label>
                          <p className="text-xs text-gray-400">Compress archived data to save space</p>
                        </div>
                        <Switch 
                          checked={dataManagement.compression}
                          onCheckedChange={(checked) => setDataManagement({...dataManagement, compression: checked})}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Backup Settings</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label className="block text-sm font-medium text-gray-300 mb-2">Backup Frequency</Label>
                        <Select value={dataManagement.backupFrequency} onValueChange={(value) => setDataManagement({...dataManagement, backupFrequency: value})}>
                          <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="block text-sm font-medium text-gray-300 mb-2">Backup Location</Label>
                        <Select value={dataManagement.backupLocation} onValueChange={(value) => setDataManagement({...dataManagement, backupLocation: value})}>
                          <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="local">Local Storage</SelectItem>
                            <SelectItem value="s3">AWS S3</SelectItem>
                            <SelectItem value="azure">Azure Blob</SelectItem>
                            <SelectItem value="gcp">Google Cloud</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-300">Last Backup</span>
                          <span className="text-green-600 text-sm">{dataManagement.lastBackup}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          <span className="text-xs text-gray-400">Backup completed successfully</span>
                        </div>
                        <div className="mt-2 text-xs text-gray-400">
                          Size: 847 MB • Files: 12,543 • Duration: 4m 32s
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <Label className="text-sm font-medium text-gray-300">Encrypt Backups</Label>
                          <p className="text-xs text-gray-400">AES-256 encryption for backup files</p>
                        </div>
                        <Switch 
                          checked={dataManagement.encryptBackups}
                          onCheckedChange={(checked) => setDataManagement({...dataManagement, encryptBackups: checked})}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Data Synchronization</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <Label className="text-sm font-medium text-gray-300">Real-time Sync</Label>
                          <p className="text-xs text-gray-400">Sync data changes immediately</p>
                        </div>
                        <Switch 
                          checked={dataManagement.realTimeSync}
                          onCheckedChange={(checked) => setDataManagement({...dataManagement, realTimeSync: checked})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <Label className="text-sm font-medium text-gray-300">Cross-Region Replication</Label>
                          <p className="text-xs text-gray-400">Replicate to multiple regions</p>
                        </div>
                        <Switch 
                          checked={dataManagement.crossRegionReplication}
                          onCheckedChange={(checked) => setDataManagement({...dataManagement, crossRegionReplication: checked})}
                        />
                      </div>
                      
                      <div className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-300">Sync Status</span>
                          <span className="text-green-600 text-sm">All systems in sync</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-400">Primary DB</span>
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                              <span className="text-green-600">Online</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-400">Backup DB</span>
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                              <span className="text-green-600">Synced</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-400">Cache Layer</span>
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                              <span className="text-green-600">Active</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Security Configuration */}
        <section className="px-8 py-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold text-white mb-2">Security & Access Control</CardTitle>
                  <CardDescription className="text-gray-300">Configure authentication, authorization, and security policies</CardDescription>
                </div>
                <div className="flex items-center space-x-3">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Shield className="w-4 h-4 mr-2" />
                    Security Scan
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <Key className="w-4 h-4 mr-2" />
                    Rotate Keys
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Authentication</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="block text-sm font-medium text-gray-300 mb-2">Authentication Method</Label>
                      <Select value={securitySettings.authenticationMethod} onValueChange={(value) => setSecuritySettings({...securitySettings, authenticationMethod: value})}>
                        <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="local">Local Authentication</SelectItem>
                          <SelectItem value="ldap">LDAP/Active Directory</SelectItem>
                          <SelectItem value="saml">SAML 2.0</SelectItem>
                          <SelectItem value="oauth">OAuth 2.0</SelectItem>
                          <SelectItem value="oidc">OpenID Connect</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <Label className="text-sm font-medium text-gray-300">Multi-Factor Authentication</Label>
                        <p className="text-xs text-gray-400">Require MFA for all users</p>
                      </div>
                      <Switch 
                        checked={securitySettings.multiFactorAuth}
                        onCheckedChange={(checked) => setSecuritySettings({...securitySettings, multiFactorAuth: checked})}
                      />
                    </div>
                    
                    <div>
                      <Label className="block text-sm font-medium text-gray-300 mb-2">Session Timeout</Label>
                      <div className="flex items-center space-x-3">
                        <Input 
                          type="number" 
                          value={securitySettings.sessionTimeout}
                          onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
                          className="flex-1 bg-gray-700 border-gray-600 text-white"
                        />
                        <span className="text-gray-300 text-sm">minutes</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <Label className="text-sm font-medium text-gray-300">Remember Me</Label>
                        <p className="text-xs text-gray-400">Allow persistent login sessions</p>
                      </div>
                      <Switch 
                        checked={securitySettings.rememberMe}
                        onCheckedChange={(checked) => setSecuritySettings({...securitySettings, rememberMe: checked})}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Access Control</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="block text-sm font-medium text-gray-300 mb-2">Default Role</Label>
                      <Select value={securitySettings.defaultRole} onValueChange={(value) => setSecuritySettings({...securitySettings, defaultRole: value})}>
                        <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="viewer">Viewer</SelectItem>
                          <SelectItem value="analyst">Analyst</SelectItem>
                          <SelectItem value="senior">Senior Analyst</SelectItem>
                          <SelectItem value="admin">Administrator</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <Label className="text-sm font-medium text-gray-300">Role-Based Access</Label>
                        <p className="text-xs text-gray-400">Enforce RBAC permissions</p>
                      </div>
                      <Switch 
                        checked={securitySettings.roleBasedAccess}
                        onCheckedChange={(checked) => setSecuritySettings({...securitySettings, roleBasedAccess: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <Label className="text-sm font-medium text-gray-300">IP Restrictions</Label>
                        <p className="text-xs text-gray-400">Limit access by IP address</p>
                      </div>
                      <Switch 
                        checked={securitySettings.ipRestrictions}
                        onCheckedChange={(checked) => setSecuritySettings({...securitySettings, ipRestrictions: checked})}
                      />
                    </div>
                    
                    <div className="bg-gray-700 rounded-lg p-3">
                      <div className="text-sm font-medium text-gray-300 mb-2">Active Permissions</div>
                      <div className="space-y-1 text-xs">
                        {securitySettings.activePermissions.map((permission, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-gray-400">{permission}</span>
                            <CheckCircle className="w-3 h-3 text-green-600" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Security Policies</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-300">Password Policy</span>
                        <span className="text-green-600 text-sm">Active</span>
                      </div>
                      <div className="space-y-1 text-xs text-gray-400">
                        <div>• Minimum 12 characters</div>
                        <div>• Must contain uppercase, lowercase, numbers</div>
                        <div>• Special characters required</div>
                        <div>• 90-day expiration</div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-300">API Security</span>
                        <span className="text-green-600 text-sm">Enforced</span>
                      </div>
                      <div className="space-y-1 text-xs text-gray-400">
                        <div>• Rate limiting: 100 req/min</div>
                        <div>• API key rotation: 30 days</div>
                        <div>• Request size limit: 10MB</div>
                        <div>• PII sanitization enabled</div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-300">Audit Logging</span>
                        <span className="text-green-600 text-sm">Complete</span>
                      </div>
                      <div className="space-y-1 text-xs text-gray-400">
                        <div>• All actions logged</div>
                        <div>• 7-year retention</div>
                        <div>• Immutable audit trail</div>
                        <div>• Real-time monitoring</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}