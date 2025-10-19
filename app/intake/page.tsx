"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Upload, 
  FileText, 
  Eye, 
  Trash2, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Info, 
  Bot, 
  Send, 
  Download, 
  Copy, 
  Code, 
  Play, 
  Save, 
  ArrowLeft, 
  ChevronRight, 
  DollarSign,
  Percent,
  LineChart,
  Calendar,
  CalendarCheck,
  RotateCcw,
  Shield,
  Calculator,
  Lightbulb,
  AlertTriangle as ExclamationTriangle,
  CheckCircle2,
  XCircle,
  AlertCircle,
  History,
  Cog,
  Bot as Robot,
  Minus,
  Plus,
  User,
  FileEdit
} from "lucide-react"

interface UploadedFile {
  id: string
  name: string
  size: string
  type: string
  status: 'processed' | 'processing' | 'failed'
  uploadedAt: string
  confidence?: number
}

interface ExtractedField {
  id: string
  name: string
  value: string
  description: string
  sourceLocation: string
  confidence: number
  status: 'approved' | 'review' | 'override_required'
  icon: string
}

interface ValidationResult {
  name: string
  status: 'passed' | 'warning' | 'error'
  description: string
  details: string
}

interface ProcessingStep {
  id: string
  name: string
  description: string
  status: 'completed' | 'current' | 'pending'
  timestamp: string
  details?: string
}

export default function IntakePage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: '1',
      name: 'IRS_Master_Agreement.pdf',
      size: '2.4 MB',
      type: 'pdf',
      status: 'processed',
      uploadedAt: '3 minutes ago',
      confidence: 98
    },
    {
      id: '2',
      name: 'CCS_Schedule_Addendum.docx',
      size: '1.8 MB',
      type: 'docx',
      status: 'processing',
      uploadedAt: '5 minutes ago'
    }
  ])

  const [extractedFields, setExtractedFields] = useState<ExtractedField[]>([
    {
      id: '1',
      name: 'Notional Amount',
      value: 'USD 10,000,000',
      description: 'Ten Million US Dollars',
      sourceLocation: 'Page 2, Section 1.1',
      confidence: 98,
      status: 'approved',
      icon: 'DollarSign'
    },
    {
      id: '2',
      name: 'Fixed Rate',
      value: '3.50%',
      description: 'Three and a half percent per annum',
      sourceLocation: 'Page 2, Section 1.2',
      confidence: 96,
      status: 'approved',
      icon: 'Percent'
    },
    {
      id: '3',
      name: 'Floating Rate Index',
      value: 'USD-SOFR-3M',
      description: 'Secured Overnight Financing Rate',
      sourceLocation: 'Page 2, Section 1.3',
      confidence: 87,
      status: 'review',
      icon: 'LineChart'
    },
    {
      id: '4',
      name: 'Effective Date',
      value: '2025-01-02',
      description: 'January 2nd, 2025',
      sourceLocation: 'Page 1, Header',
      confidence: 99,
      status: 'approved',
      icon: 'Calendar'
    },
    {
      id: '5',
      name: 'Maturity Date',
      value: '2030-01-02',
      description: '5 Year Term',
      sourceLocation: 'Page 1, Section 2.1',
      confidence: 95,
      status: 'approved',
      icon: 'CalendarCheck'
    },
    {
      id: '6',
      name: 'Payment Frequency',
      value: 'Quarterly',
      description: 'Every 3 months',
      sourceLocation: 'Page 3, Section 3.2',
      confidence: 78,
      status: 'review',
      icon: 'RotateCcw'
    },
    {
      id: '7',
      name: 'Day Count Convention',
      value: 'ACT/360',
      description: 'Actual/360 for floating leg',
      sourceLocation: 'Page 4, Definitions',
      confidence: 65,
      status: 'override_required',
      icon: 'Calculator'
    },
    {
      id: '8',
      name: 'CSA Agreement',
      value: 'ISDA 2016 CSA',
      description: 'Credit Support Annex',
      sourceLocation: 'Page 8, Annex A',
      confidence: 82,
      status: 'review',
      icon: 'Shield'
    }
  ])

  const [validationResults, setValidationResults] = useState<ValidationResult[]>([
    {
      name: 'Data Consistency',
      status: 'passed',
      description: 'All fields validated',
      details: 'Date Logic: ✓ Valid, Rate Ranges: ✓ Valid, Currency Match: ✓ Valid'
    },
    {
      name: 'Market Standards',
      status: 'warning',
      description: 'Minor deviations found',
      details: 'ISDA Standards: ⚠ Review, Conventions: ✓ Valid, Frequencies: ✓ Valid'
    },
    {
      name: 'Risk Assessment',
      status: 'passed',
      description: 'Preliminary analysis',
      details: 'Credit Risk: Medium, Market Risk: Low, Complexity: Standard'
    }
  ])

  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([
    {
      id: '1',
      name: 'Document Upload Completed',
      description: 'IRS_Master_Agreement.pdf (2.4 MB) successfully uploaded and queued for processing',
      status: 'completed',
      timestamp: '2025-01-18 08:15:23 UTC',
      details: 'User: Alex Johnson, File Hash: sha256:a1b2c3d4..., Processing ID: PROC-2025-0118-001'
    },
    {
      id: '2',
      name: 'AI Extraction Engine Started',
      description: 'Document analysis initiated using enhanced NLP model v2.3.1',
      status: 'completed',
      timestamp: '2025-01-18 08:15:45 UTC',
      details: 'Engine: ContractParser-v2.3.1, Pages Processed: 12, Processing Time: 2.1 minutes'
    },
    {
      id: '3',
      name: 'Field Extraction Completed',
      description: 'Successfully extracted 8 core fields with average confidence score of 89%',
      status: 'completed',
      timestamp: '2025-01-18 08:17:52 UTC',
      details: 'Fields Extracted: 8/10, High Confidence: 5, Medium Confidence: 2, Low Confidence: 1'
    },
    {
      id: '4',
      name: 'Validation Checks Executed',
      description: 'Market standards validation completed with 1 warning flagged for review',
      status: 'completed',
      timestamp: '2025-01-18 08:18:15 UTC',
      details: 'Checks Passed: 7/8, Warnings: 1, Errors: 0'
    },
    {
      id: '5',
      name: 'JSON Specification Generated',
      description: 'Trade specification JSON created and ready for valuation engine consumption',
      status: 'completed',
      timestamp: '2025-01-18 08:18:33 UTC',
      details: 'Format: ISDA CDM v2.57, Size: 2.1 KB, Status: Ready'
    }
  ])

  const [isChatOpen, setIsChatOpen] = useState(true)
  const [chatMessages, setChatMessages] = useState<Array<{
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
  }>>([
    {
      id: '1',
      role: 'assistant',
      content: "I've analyzed your IRS contract and extracted 8 key fields. I can help you:\n\n• Review and validate extracted terms\n• Suggest market-standard corrections\n• Complete missing required fields\n• Compare with similar contracts",
      timestamp: new Date()
    },
    {
      id: '2',
      role: 'user',
      content: 'Why is the day count convention flagged as low confidence?',
      timestamp: new Date()
    },
    {
      id: '3',
      role: 'assistant',
      content: "The day count convention (ACT/360) has low confidence (65%) because:\n\n• It was found in a footnote rather than main terms\n• Market standard for USD fixed legs is typically 30/360\n• The text was partially obscured in the scan\n\nI recommend reviewing the source document or selecting the market standard 30/360.",
      timestamp: new Date()
    }
  ])
  const [chatInput, setChatInput] = useState("")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processed': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'processing': return <Clock className="w-4 h-4 text-yellow-600" />
      case 'failed': return <XCircle className="w-4 h-4 text-red-600" />
      default: return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved': return <Badge className="bg-green-600 text-white">Approved</Badge>
      case 'review': return <Badge className="bg-yellow-600 text-white">Review</Badge>
      case 'override_required': return <Badge className="bg-red-600 text-white">Override Required</Badge>
      default: return <Badge className="bg-gray-600 text-white">Pending</Badge>
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600'
    if (confidence >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getConfidenceDot = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-600'
    if (confidence >= 70) return 'bg-yellow-600'
    return 'bg-red-600'
  }

  const getFieldIcon = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      DollarSign,
      Percent,
      LineChart,
      Calendar,
      CalendarCheck,
      RotateCcw,
      Calculator,
      Shield
    }
    const IconComponent = iconMap[iconName] || FileText
    return <IconComponent className="w-4 h-4 text-green-600" />
  }

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: chatInput,
      timestamp: new Date()
    }

    setChatMessages(prev => [...prev, userMessage])
    setChatInput("")

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: "I can help you with contract analysis, field validation, and market standard recommendations. What would you like to know?",
        timestamp: new Date()
      }
      setChatMessages(prev => [...prev, assistantMessage])
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header with Progress Steps */}
      <section className="bg-gray-800 border-b border-gray-700 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-4 mb-2">
              <h1 className="text-2xl font-semibold text-white">Contract Upload & Parsing</h1>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-medium">1</div>
                <div className="w-8 h-0.5 bg-green-600"></div>
                <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-medium">2</div>
                <div className="w-8 h-0.5 bg-green-600"></div>
                <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-black text-xs font-medium">3</div>
                <div className="w-8 h-0.5 bg-gray-600"></div>
                <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-gray-300 text-xs font-medium">4</div>
                <div className="w-8 h-0.5 bg-gray-600"></div>
                <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-gray-300 text-xs font-medium">5</div>
              </div>
            </div>
            <p className="text-gray-300">Extract and validate contract terms for automated valuation setup</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-300">Processing Status</div>
              <div className="text-lg font-medium text-green-600">Extraction Complete</div>
            </div>
            
            <Button className="bg-gray-700 hover:bg-gray-600 text-white font-medium">
              <History className="w-4 h-4 mr-2" />
              View History
            </Button>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* File Upload Zone */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white">Document Upload</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-600 rounded-xl p-12 text-center hover:border-green-600 hover:bg-green-600 hover:bg-opacity-5 transition-all cursor-pointer">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                      <Upload className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-2">Drag and drop your contract here</h3>
                      <p className="text-gray-300 text-sm mb-4">or click to browse files</p>
                      <div className="text-xs text-gray-400 space-y-1">
                        <div>Supported formats: PDF, DOC, DOCX</div>
                        <div>Maximum file size: 15MB</div>
                        <div>Multiple files supported</div>
                      </div>
                    </div>
                    <Button className="bg-green-600 hover:bg-green-700 text-black font-medium">
                      <Plus className="w-4 h-4 mr-2" />
                      Select Files
                    </Button>
                  </div>
                </div>
                
                {/* Uploaded Files List */}
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-white mb-4">Uploaded Documents</h3>
                  <div className="space-y-3">
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            file.type === 'pdf' ? 'bg-red-600 bg-opacity-20' : 'bg-blue-600 bg-opacity-20'
                          }`}>
                            {file.type === 'pdf' ? (
                              <FileText className="w-5 h-5 text-red-600" />
                            ) : (
                              <FileText className="w-5 h-5 text-blue-600" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{file.name}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-300">
                              <span>{file.size}</span>
                              <span>Uploaded {file.uploadedAt}</span>
                              <span className={
                                file.status === 'processed' ? 'text-green-600' :
                                file.status === 'processing' ? 'text-yellow-600' : 'text-red-600'
                              }>
                                {file.status === 'processed' ? '✓ Processed' :
                                 file.status === 'processing' ? '⏳ Processing' : '✗ Failed'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-300 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Processing Statistics */}
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">Processing Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Total Documents</span>
                  <span className="text-white font-medium">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Successfully Parsed</span>
                  <span className="text-green-600 font-medium">1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">In Progress</span>
                  <span className="text-yellow-600 font-medium">1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Failed</span>
                  <span className="text-red-600 font-medium">0</span>
                </div>
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">Success Rate</span>
                    <span className="text-green-600 font-medium">94.8%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '94.8%'}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">Parsing Capabilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  'Trade Details',
                  'Notional Amounts',
                  'Interest Rates',
                  'Payment Frequencies',
                  'Day Count Conventions',
                  'CSA Terms'
                ].map((capability, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-sm text-gray-300">{capability}</span>
                  </div>
                ))}
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  <span className="text-sm text-gray-300">Complex Structures</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Extracted Fields Validation */}
      <section className="px-8 py-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-white">Extracted Contract Terms</CardTitle>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-green-600 rounded-full"></span>
                  <span className="text-sm text-gray-300">High Confidence</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-yellow-600 rounded-full"></span>
                  <span className="text-sm text-gray-300">Medium Confidence</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-red-600 rounded-full"></span>
                  <span className="text-sm text-gray-300">Low Confidence</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Field</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Extracted Value</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Source Location</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Confidence</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {extractedFields.map((field) => (
                    <tr key={field.id} className="hover:bg-gray-750">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          {getFieldIcon(field.icon)}
                          <span className="text-white font-medium">{field.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-white">{field.value}</div>
                        <div className="text-xs text-gray-300">{field.description}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-300">{field.sourceLocation}</div>
                        <div className="text-xs text-gray-400">Line 15-16</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${getConfidenceDot(field.confidence)}`}></div>
                          <span className={`text-sm font-medium ${getConfidenceColor(field.confidence)}`}>
                            {field.confidence}%
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(field.status)}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-300 hover:text-green-600">
                            <FileEdit className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button className="bg-green-600 hover:bg-green-700 text-black font-medium">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Approve All High Confidence
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  <Eye className="w-4 h-4 mr-2" />
                  Review All
                </Button>
              </div>
              
              <div className="text-sm text-gray-300">
                <span className="text-green-600">5 approved</span> • 
                <span className="text-yellow-600">2 pending review</span> • 
                <span className="text-red-600">1 requires override</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Field Override and Manual Entry */}
      <section className="px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Field Override Form */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-white">Manual Field Override</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="block text-sm font-medium text-gray-300 mb-2">Field to Override</Label>
                <Select>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Day Count Convention" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day_count">Day Count Convention</SelectItem>
                    <SelectItem value="payment_freq">Payment Frequency</SelectItem>
                    <SelectItem value="floating_index">Floating Rate Index</SelectItem>
                    <SelectItem value="csa">CSA Agreement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="block text-sm font-medium text-gray-300 mb-2">Current Extracted Value</Label>
                <div className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-300">
                  ACT/360 (Confidence: 65%)
                </div>
              </div>
              
              <div>
                <Label className="block text-sm font-medium text-gray-300 mb-2">Override Value</Label>
                <Select>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="ACT/360" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="act_360">ACT/360</SelectItem>
                    <SelectItem value="act_365">ACT/365</SelectItem>
                    <SelectItem value="30_360">30/360</SelectItem>
                    <SelectItem value="30e_360">30E/360</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="block text-sm font-medium text-gray-300 mb-2">Reason for Override</Label>
                <Textarea 
                  className="bg-gray-700 border-gray-600 text-white h-20 resize-none"
                  placeholder="Explain why this field requires manual override..."
                />
              </div>
              
              <div className="flex items-center space-x-3">
                <Button className="bg-green-600 hover:bg-green-700 text-black font-medium">
                  Apply Override
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Missing Fields Alert */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-white">Missing Required Fields</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-yellow-600 bg-opacity-10 border-yellow-600">
                <ExclamationTriangle className="w-4 h-4 text-yellow-600" />
                <AlertDescription>
                  <div className="text-yellow-600 font-medium mb-2">Business Day Convention</div>
                  <p className="text-sm text-gray-300 mb-3">This field was not found in the contract and is required for accurate valuation.</p>
                  <Select>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select Convention" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="following">Following</SelectItem>
                      <SelectItem value="mod_following">Modified Following</SelectItem>
                      <SelectItem value="preceding">Preceding</SelectItem>
                      <SelectItem value="mod_preceding">Modified Preceding</SelectItem>
                    </SelectContent>
                  </Select>
                </AlertDescription>
              </Alert>
              
              <Alert className="bg-blue-600 bg-opacity-10 border-blue-600">
                <Info className="w-4 h-4 text-blue-600" />
                <AlertDescription>
                  <div className="text-blue-600 font-medium mb-2">Holiday Calendar</div>
                  <p className="text-sm text-gray-300 mb-3">Holiday calendar reference was partially extracted but needs confirmation.</p>
                  <Select>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select Calendar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usny">US New York</SelectItem>
                      <SelectItem value="gblo">UK London</SelectItem>
                      <SelectItem value="euta">EU Target</SelectItem>
                      <SelectItem value="jpto">Japan Tokyo</SelectItem>
                    </SelectContent>
                  </Select>
                </AlertDescription>
              </Alert>
              
              <Alert className="bg-red-600 bg-opacity-10 border-red-600">
                <XCircle className="w-4 h-4 text-red-600" />
                <AlertDescription>
                  <div className="text-red-600 font-medium mb-2">Reset Frequency</div>
                  <p className="text-sm text-gray-300 mb-3">Floating rate reset frequency could not be determined from the contract.</p>
                  <Select>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select Frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1m">Monthly</SelectItem>
                      <SelectItem value="3m">Quarterly</SelectItem>
                      <SelectItem value="6m">Semi-Annual</SelectItem>
                      <SelectItem value="12m">Annual</SelectItem>
                    </SelectContent>
                  </Select>
                </AlertDescription>
              </Alert>
              
              <div className="pt-4 border-t border-gray-700">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-300">Completion Status</span>
                  <span className="text-yellow-600">75% Complete</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{width: '75%'}}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Validation and Quality Checks */}
      <section className="px-8 py-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white">Validation & Quality Checks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {validationResults.map((result, index) => (
                <Card key={index} className="bg-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        result.status === 'passed' ? 'bg-green-600 bg-opacity-20' :
                        result.status === 'warning' ? 'bg-yellow-600 bg-opacity-20' :
                        'bg-red-600 bg-opacity-20'
                      }`}>
                        {result.status === 'passed' ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : result.status === 'warning' ? (
                          <ExclamationTriangle className="w-5 h-5 text-yellow-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{result.name}</h4>
                        <p className="text-xs text-gray-300">{result.description}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      {result.details.split(', ').map((detail, i) => (
                        <div key={i} className="flex justify-between">
                          <span className="text-gray-300">{detail.split(':')[0]}:</span>
                          <span className={
                            detail.includes('✓') ? 'text-green-600' :
                            detail.includes('⚠') ? 'text-yellow-600' : 'text-white'
                          }>
                            {detail.split(':')[1]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Detailed Validation Results */}
            <Card className="bg-gray-700">
              <CardContent className="p-4">
                <h3 className="text-lg font-medium text-white mb-4">Detailed Validation Results</h3>
                
                <div className="space-y-3">
                  <Alert className="bg-green-600 bg-opacity-10 border-green-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <AlertDescription>
                      <div className="text-green-600 font-medium text-sm">Date Validation Passed</div>
                      <p className="text-gray-300 text-xs mt-1">Effective date (2025-01-02) is before maturity date (2030-01-02). Term length: 5 years.</p>
                    </AlertDescription>
                  </Alert>
                  
                  <Alert className="bg-green-600 bg-opacity-10 border-green-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <AlertDescription>
                      <div className="text-green-600 font-medium text-sm">Rate Validation Passed</div>
                      <p className="text-gray-300 text-xs mt-1">Fixed rate (3.50%) is within reasonable market range for 5Y USD IRS.</p>
                    </AlertDescription>
                  </Alert>
                  
                  <Alert className="bg-yellow-600 bg-opacity-10 border-yellow-600">
                    <ExclamationTriangle className="w-4 h-4 text-yellow-600" />
                    <AlertDescription>
                      <div className="text-yellow-600 font-medium text-sm">Convention Mismatch Warning</div>
                      <p className="text-gray-300 text-xs mt-1">Day count convention (ACT/360) is non-standard for USD fixed leg. Consider 30/360 or ACT/365.</p>
                    </AlertDescription>
                  </Alert>
                  
                  <Alert className="bg-blue-600 bg-opacity-10 border-blue-600">
                    <Info className="w-4 h-4 text-blue-600" />
                    <AlertDescription>
                      <div className="text-blue-600 font-medium text-sm">CSA Information</div>
                      <p className="text-gray-300 text-xs mt-1">ISDA 2016 CSA detected. XVA calculations will be enabled for this trade.</p>
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </section>

      {/* JSON Preview and Export */}
      <section className="px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Generated JSON Specification */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-white">Generated Trade Specification</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                    <Code className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto">
                <pre className="text-gray-300"><code>{`{
  "tradeId": "IRS-2025-0118-001",
  "tradeDate": "2025-01-18",
  "effectiveDate": "2025-01-02",
  "maturityDate": "2030-01-02",
  "notional": {
    "amount": 10000000,
    "currency": "USD"
  },
  "fixedLeg": {
    "payReceive": "Pay",
    "rate": 0.035,
    "dayCountConvention": "ACT/360",
    "paymentFrequency": "3M",
    "businessDayConvention": "ModFollowing",
    "calendar": "USNY"
  },
  "floatingLeg": {
    "payReceive": "Receive",
    "index": "USD-SOFR-3M",
    "spread": 0.0,
    "dayCountConvention": "ACT/360",
    "paymentFrequency": "3M",
    "resetFrequency": "3M",
    "businessDayConvention": "ModFollowing",
    "calendar": "USNY"
  },
  "csa": {
    "agreement": "ISDA-2016-CSA",
    "threshold": 0,
    "minimumTransferAmount": 250000,
    "currency": "USD"
  },
  "confidence": {
    "overall": 89,
    "fields": {
      "notional": 98,
      "fixedRate": 96,
      "floatingIndex": 87,
      "effectiveDate": 99,
      "maturityDate": 95,
      "paymentFrequency": 78,
      "dayCountConvention": 65,
      "csa": 82
    }
  },
  "validationStatus": "PASSED_WITH_WARNINGS",
  "extractedFrom": "IRS_Master_Agreement.pdf"
}`}</code></pre>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-300">Validation:</span>
                  <span className="text-yellow-600">Passed with warnings</span>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-300">Overall Confidence:</span>
                  <span className="text-yellow-600 font-medium">89%</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Next Steps and Actions */}
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">Required Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-600 bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-yellow-600 text-xs font-medium">1</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium text-sm">Review Low Confidence Fields</h4>
                    <p className="text-gray-300 text-xs mt-1">Day count convention and payment frequency require manual verification</p>
                    <Button variant="link" className="mt-2 text-xs text-green-600 hover:text-opacity-80 p-0 h-auto">
                      Review Fields →
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-600 bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-600 text-xs font-medium">2</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium text-sm">Complete Missing Fields</h4>
                    <p className="text-gray-300 text-xs mt-1">Business day convention and holiday calendar must be specified</p>
                    <Button variant="link" className="mt-2 text-xs text-green-600 hover:text-opacity-80 p-0 h-auto">
                      Complete Fields →
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-xs font-medium">3</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium text-sm">Validate Market Standards</h4>
                    <p className="text-gray-300 text-xs mt-1">Confirm ISDA conventions alignment for USD IRS</p>
                    <Button variant="link" className="mt-2 text-xs text-green-600 hover:text-opacity-80 p-0 h-auto">
                      Validate Standards →
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">Processing Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-black font-medium">
                  <Play className="w-4 h-4 mr-2" />
                  Create Valuation Run
                </Button>
                
                <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save as Template
                </Button>
                
                <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                  <Download className="w-4 h-4 mr-2" />
                  Export Specification
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Processing History and Audit Trail */}
      <section className="px-8 py-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white">Processing History & Audit Trail</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {processingSteps.map((step) => (
                <div key={step.id} className="flex items-start space-x-4 p-4 bg-gray-700 rounded-lg">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    step.status === 'completed' ? 'bg-green-600 bg-opacity-20' :
                    step.status === 'current' ? 'bg-blue-600 bg-opacity-20' :
                    'bg-gray-600 bg-opacity-20'
                  }`}>
                    {step.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : step.status === 'current' ? (
                      <Cog className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Clock className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{step.name}</h4>
                      <span className="text-xs text-gray-300">{step.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{step.description}</p>
                    {step.details && (
                      <div className="flex items-center space-x-4 text-xs text-gray-400">
                        {step.details.split(', ').map((detail, i) => (
                          <span key={i}>{detail}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-300">
                Total Processing Time: <span className="text-white font-medium">3.2 minutes</span>
              </div>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                <Download className="w-4 h-4 mr-2" />
                Export Audit Log
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* AI Assistance and Recommendations */}
      <section className="px-8 py-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Recommendations */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Robot className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-white">AI Recommendations</CardTitle>
                  <CardDescription className="text-sm text-gray-300">Smart suggestions for field corrections</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-green-600 bg-opacity-10 border-green-600">
                <Lightbulb className="w-4 h-4 text-green-600" />
                <AlertDescription>
                  <div className="text-green-600 font-medium text-sm mb-2">Day Count Convention Suggestion</div>
                  <p className="text-gray-300 text-xs mb-3">Based on market standards, USD fixed legs typically use 30/360 day count convention rather than ACT/360.</p>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-black text-xs">
                      Apply Suggestion
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 text-xs">
                      Keep Original
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
              
              <Alert className="bg-blue-600 bg-opacity-10 border-blue-600">
                <Info className="w-4 h-4 text-blue-600" />
                <AlertDescription>
                  <div className="text-blue-600 font-medium text-sm mb-2">Business Day Convention</div>
                  <p className="text-gray-300 text-xs mb-3">For USD SOFR-based swaps, "Modified Following" is the standard business day convention.</p>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
                      Apply Standard
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 text-xs">
                      Manual Select
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
              
              <Alert className="bg-yellow-600 bg-opacity-10 border-yellow-600">
                <ExclamationTriangle className="w-4 h-4 text-yellow-600" />
                <AlertDescription>
                  <div className="text-yellow-600 font-medium text-sm mb-2">Reset Frequency Validation</div>
                  <p className="text-gray-300 text-xs mb-3">Payment frequency and reset frequency should typically match for standard IRS. Consider setting reset to quarterly.</p>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-white text-xs">
                      Align Frequencies
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 text-xs">
                      Keep Different
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
          
          {/* Similar Contracts Analysis */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-white">Similar Contracts Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'USD 5Y IRS - Client ABC', match: '95%', rate: '3.25%', dayCount: '30/360', freq: 'Semi-Annual', bdc: 'ModFollowing' },
                { name: 'USD 7Y IRS - Client XYZ', match: '87%', rate: '3.75%', dayCount: '30/360', freq: 'Quarterly', bdc: 'ModFollowing' },
                { name: 'USD 3Y IRS - Client DEF', match: '82%', rate: '2.95%', dayCount: 'ACT/360', freq: 'Quarterly', bdc: 'Following' }
              ].map((contract, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-medium text-sm">{contract.name}</h4>
                    <span className="text-xs text-gray-300">{contract.match} match</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-gray-300">Fixed Rate:</span>
                      <span className="text-white ml-2">{contract.rate}</span>
                    </div>
                    <div>
                      <span className="text-gray-300">Day Count:</span>
                      <span className="text-white ml-2">{contract.dayCount}</span>
                    </div>
                    <div>
                      <span className="text-gray-300">Frequency:</span>
                      <span className="text-white ml-2">{contract.freq}</span>
                    </div>
                    <div>
                      <span className="text-gray-300">BDC:</span>
                      <span className="text-white ml-2">{contract.bdc}</span>
                    </div>
                  </div>
                  <Button variant="link" className="mt-3 text-xs text-green-600 hover:text-opacity-80 p-0 h-auto">
                    Compare Fields →
                  </Button>
                </div>
              ))}
              
              <div className="mt-6 pt-4 border-t border-gray-700">
                <div className="text-sm text-gray-300 mb-2">Market Analysis Summary</div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Most Common Day Count (Fixed):</span>
                    <span className="text-white">30/360 (78%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Most Common BDC:</span>
                    <span className="text-white">ModFollowing (92%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Average Fixed Rate (5Y):</span>
                    <span className="text-white">3.42%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Chat Agent Panel */}
      {isChatOpen && (
        <div className="fixed right-4 top-24 bottom-4 w-96 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-40 flex flex-col">
          <div className="p-4 border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-600 bg-opacity-20 rounded-full flex items-center justify-center">
                <Robot className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="text-white font-medium">Contract Assistant</h3>
                <span className="text-xs text-green-600">Online</span>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsChatOpen(false)}
              className="text-gray-300 hover:text-white"
            >
              <Minus className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {chatMessages.map((message) => (
              <div key={message.id} className={`flex items-start space-x-3 ${
                message.role === 'user' ? 'justify-end' : ''
              }`}>
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 bg-green-600 bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Robot className="w-4 h-4 text-green-600" />
                  </div>
                )}
                <div className={`flex-1 rounded-lg p-3 max-w-xs ${
                  message.role === 'user' 
                    ? 'bg-green-600 bg-opacity-20' 
                    : 'bg-gray-700'
                }`}>
                  <p className="text-sm text-white whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 bg-blue-600 bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-gray-700">
            <div className="flex flex-wrap gap-2 mb-3">
              <Button size="sm" variant="outline" className="text-xs">
                Fix Low Confidence
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                Apply Standards
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                Complete Missing
              </Button>
            </div>
            
            <form onSubmit={handleChatSubmit} className="relative">
              <input
                type="text"
                placeholder="Ask about contract terms..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <Button 
                type="submit"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-opacity-80"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Chat Toggle Button */}
      {!isChatOpen && (
        <Button
          onClick={() => setIsChatOpen(true)}
          className="fixed right-4 bottom-4 bg-green-600 hover:bg-green-700 text-black font-medium rounded-full w-14 h-14 shadow-lg"
        >
          <Robot className="w-6 h-6" />
        </Button>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-64 right-0 bg-gray-800 border-t border-gray-700 p-4 z-30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Upload
            </Button>
            
            <div className="text-sm text-gray-300">
              Step 3 of 5: Contract Parsing & Validation
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-300">
              <span className="text-green-600">5 approved</span> • 
              <span className="text-yellow-600">2 pending review</span> • 
              <span className="text-red-600">1 requires override</span>
            </div>
            
            <Button className="bg-green-600 hover:bg-green-700 text-black font-medium">
              <ChevronRight className="w-4 h-4 mr-2" />
              Continue to Validation
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}