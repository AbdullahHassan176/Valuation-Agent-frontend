"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
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
  ExternalLink,
  Plus,
  Loader2,
  FileDown,
  Share,
  Mail,
  Printer,
  Image,
  PieChart,
  LineChart,
  Activity,
  Target,
  Zap
} from "lucide-react"

interface ReportConfig {
  id: string
  name: string
  type: 'valuation' | 'cva' | 'portfolio' | 'analytics'
  format: 'html' | 'pdf' | 'both'
  includeCharts: boolean
  includeInsights: boolean
  includeRiskMetrics: boolean
  includeRegulatory: boolean
  runIds: string[]
}

export default function GenerateReportsPage() {
  const [selectedReports, setSelectedReports] = useState<string[]>([])
  const [reportConfig, setReportConfig] = useState<ReportConfig>({
    id: '',
    name: '',
    type: 'valuation',
    format: 'html',
    includeCharts: true,
    includeInsights: true,
    includeRiskMetrics: true,
    includeRegulatory: true,
    runIds: []
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedReports, setGeneratedReports] = useState<any[]>([])

  const availableRuns = [
    { id: 'run-001', name: 'USD 5Y IRS', type: 'IRS', currency: 'USD', notional: 10000000, pv: 125000 },
    { id: 'run-002', name: 'EUR/USD CCS', type: 'CCS', currency: 'EUR', notional: 5000000, pv: 85000 }
  ]

  const handleGenerateReport = async () => {
    setIsGenerating(true)
    
    try {
      // Call backend API to generate report
      const apiUrl = window.location.hostname === 'localhost' 
        ? 'http://localhost:8000/api/reports/generate'
        : 'https://valuation-backend-api-cadmfqgxgzawa7fp.canadacentral-01.azurewebsites.net/api/reports/generate'
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: reportConfig.type,
          format: reportConfig.format,
          runIds: selectedReports,
          includeCharts: reportConfig.includeCharts,
          includeInsights: reportConfig.includeInsights,
          includeRiskMetrics: reportConfig.includeRiskMetrics,
          includeRegulatory: reportConfig.includeRegulatory
        })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      
      if (result.success) {
        const newReport = {
          id: result.report_id,
          name: reportConfig.name || `${reportConfig.type} Report`,
          type: reportConfig.type,
          format: reportConfig.format,
          status: 'completed',
          createdAt: new Date().toISOString(),
          downloadUrl: result.download_url,
          previewUrl: result.preview_url,
          filename: result.filename
        }
        
        setGeneratedReports(prev => [newReport, ...prev])
        
        // Download the generated report
        await downloadGeneratedReport(result.download_url, result.filename)
      } else {
        throw new Error(result.error || 'Failed to generate report')
      }
      
    } catch (error) {
      console.error('Error generating report:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      alert(`Failed to generate report: ${errorMessage}`)
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadGeneratedReport = async (downloadUrl: string, filename: string) => {
    try {
      const apiUrl = window.location.hostname === 'localhost' 
        ? `http://localhost:8000${downloadUrl}`
        : `https://valuation-backend-api-cadmfqgxgzawa7fp.canadacentral-01.azurewebsites.net${downloadUrl}`
      
      const response = await fetch(apiUrl)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      
      // Create blob and download
      const blob = new Blob([result.content], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
    } catch (error) {
      console.error('Error downloading report:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      alert(`Failed to download report: ${errorMessage}`)
    }
  }

  const generateReportHTML = (report: any, config: ReportConfig) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${report.name} - Valuation Report</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: #f8f9fa;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 2.5em;
            font-weight: 300;
        }
        .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
            font-size: 1.2em;
        }
        .section {
            background: white;
            padding: 25px;
            margin-bottom: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .section h2 {
            color: #2c3e50;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .metric-card {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #3498db;
        }
        .metric-value {
            font-size: 2em;
            font-weight: bold;
            color: #2c3e50;
        }
        .metric-label {
            color: #7f8c8d;
            font-size: 0.9em;
            margin-top: 5px;
        }
        .chart-container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .insights {
            background: #e8f5e8;
            border-left: 4px solid #27ae60;
            padding: 20px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
        }
        .risk-alert {
            background: #fdf2e9;
            border-left: 4px solid #e67e22;
            padding: 20px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding: 20px;
            background: #2c3e50;
            color: white;
            border-radius: 8px;
        }
        .badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8em;
            font-weight: bold;
            margin: 2px;
        }
        .badge-success { background: #27ae60; color: white; }
        .badge-warning { background: #f39c12; color: white; }
        .badge-danger { background: #e74c3c; color: white; }
        .badge-info { background: #3498db; color: white; }
    </style>
</head>
<body>
    <div class="header">
        <h1>${report.name}</h1>
        <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
    </div>

    <div class="section">
        <h2>📊 Executive Summary</h2>
        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-value">$125,000</div>
                <div class="metric-label">Total Present Value</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">$4,500</div>
                <div class="metric-label">PV01 Sensitivity</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">2.5%</div>
                <div class="metric-label">Credit Spread</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">$15,200</div>
                <div class="metric-label">CVA Charge</div>
            </div>
        </div>
    </div>

    ${config.includeCharts ? `
    <div class="section">
        <h2>📈 Risk Analytics</h2>
        <div class="chart-container">
            <canvas id="riskChart" width="400" height="200"></canvas>
        </div>
        <div class="chart-container">
            <canvas id="sensitivityChart" width="400" height="200"></canvas>
        </div>
    </div>
    ` : ''}

    ${config.includeInsights ? `
    <div class="insights">
        <h3>💡 Key Insights</h3>
        <ul>
            <li><strong>Interest Rate Risk:</strong> The portfolio shows moderate sensitivity to interest rate changes with a PV01 of $4,500</li>
            <li><strong>Credit Risk:</strong> CVA analysis indicates $15,200 in credit valuation adjustment</li>
            <li><strong>Market Conditions:</strong> Current market volatility suggests increased hedging requirements</li>
            <li><strong>Regulatory Impact:</strong> IFRS-13 compliance requires additional documentation</li>
        </ul>
    </div>
    ` : ''}

    ${config.includeRiskMetrics ? `
    <div class="section">
        <h2>⚠️ Risk Metrics</h2>
        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-value">95%</div>
                <div class="metric-label">Value at Risk (1-day)</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">$8,500</div>
                <div class="metric-label">Expected Shortfall</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">1.2</div>
                <div class="metric-label">Stress Test Ratio</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">$12,300</div>
                <div class="metric-label">Regulatory Capital</div>
            </div>
        </div>
    </div>
    ` : ''}

    ${config.includeRegulatory ? `
    <div class="section">
        <h2>📋 Regulatory Compliance</h2>
        <div class="risk-alert">
            <h3>IFRS-13 Compliance Status</h3>
            <p><span class="badge badge-success">✓ Level 1 Inputs</span> <span class="badge badge-warning">⚠ Level 2 Inputs</span> <span class="badge badge-danger">✗ Level 3 Inputs</span></p>
            <p>Portfolio valuation meets IFRS-13 requirements with appropriate input hierarchy and documentation.</p>
        </div>
    </div>
    ` : ''}

    <div class="footer">
        <p>Generated by Valuation Agent Platform | ${new Date().toLocaleDateString()}</p>
        <p>This report contains confidential financial information. Distribution is restricted.</p>
    </div>

    <script>
        // Risk Analytics Chart
        const riskCtx = document.getElementById('riskChart').getContext('2d');
        new Chart(riskCtx, {
            type: 'line',
            data: {
                labels: ['1M', '3M', '6M', '1Y', '2Y', '5Y'],
                datasets: [{
                    label: 'Interest Rate Risk',
                    data: [120, 150, 180, 200, 220, 250],
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    tension: 0.4
                }, {
                    label: 'Credit Risk',
                    data: [80, 90, 100, 110, 120, 130],
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Risk Exposure Over Time'
                    }
                }
            }
        });

        // Sensitivity Chart
        const sensitivityCtx = document.getElementById('sensitivityChart').getContext('2d');
        new Chart(sensitivityCtx, {
            type: 'bar',
            data: {
                labels: ['-100bp', '-50bp', '0bp', '+50bp', '+100bp'],
                datasets: [{
                    label: 'PV Impact',
                    data: [-4500, -2250, 0, 2250, 4500],
                    backgroundColor: '#2ecc71'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Interest Rate Sensitivity Analysis'
                    }
                }
            }
        });
    </script>
</body>
</html>
    `
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Generate Reports</h1>
            <p className="text-gray-300 mt-2">Create professional HTML/PDF reports with embedded graphs and insights</p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <Button variant="outline" className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <FileText className="h-4 w-4 mr-2" />
              Templates
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Report Configuration */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Report Configuration</CardTitle>
                <CardDescription className="text-gray-300">
                  Configure your report settings and select runs to include
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="reportName" className="text-white">Report Name</Label>
                    <Input
                      id="reportName"
                      placeholder="Enter report name..."
                      value={reportConfig.name}
                      onChange={(e) => setReportConfig({...reportConfig, name: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reportType" className="text-white">Report Type</Label>
                    <Select value={reportConfig.type} onValueChange={(value: any) => setReportConfig({...reportConfig, type: value})}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="valuation">Valuation Report</SelectItem>
                        <SelectItem value="cva">CVA Analysis</SelectItem>
                        <SelectItem value="portfolio">Portfolio Summary</SelectItem>
                        <SelectItem value="analytics">Risk Analytics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="reportFormat" className="text-white">Output Format</Label>
                  <Select value={reportConfig.format} onValueChange={(value: any) => setReportConfig({...reportConfig, format: value})}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="html">HTML (Interactive)</SelectItem>
                      <SelectItem value="pdf">PDF (Print-ready)</SelectItem>
                      <SelectItem value="both">Both Formats</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-white">Include in Report</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includeCharts"
                        checked={reportConfig.includeCharts}
                        onCheckedChange={(checked) => setReportConfig({...reportConfig, includeCharts: !!checked})}
                      />
                      <Label htmlFor="includeCharts" className="text-white">Interactive Charts</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includeInsights"
                        checked={reportConfig.includeInsights}
                        onCheckedChange={(checked) => setReportConfig({...reportConfig, includeInsights: !!checked})}
                      />
                      <Label htmlFor="includeInsights" className="text-white">Key Insights</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includeRiskMetrics"
                        checked={reportConfig.includeRiskMetrics}
                        onCheckedChange={(checked) => setReportConfig({...reportConfig, includeRiskMetrics: !!checked})}
                      />
                      <Label htmlFor="includeRiskMetrics" className="text-white">Risk Metrics</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includeRegulatory"
                        checked={reportConfig.includeRegulatory}
                        onCheckedChange={(checked) => setReportConfig({...reportConfig, includeRegulatory: !!checked})}
                      />
                      <Label htmlFor="includeRegulatory" className="text-white">Regulatory Info</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-white">Select Runs to Include</Label>
                  <div className="space-y-2 mt-2">
                    {availableRuns.map((run) => (
                      <div key={run.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={run.id}
                          checked={selectedReports.includes(run.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedReports([...selectedReports, run.id])
                            } else {
                              setSelectedReports(selectedReports.filter(id => id !== run.id))
                            }
                          }}
                        />
                        <Label htmlFor={run.id} className="text-white">
                          {run.name} - {run.type} ({run.currency} {run.notional.toLocaleString()})
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleGenerateReport}
                  disabled={isGenerating || selectedReports.length === 0}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating Report...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Report
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Generated Reports */}
          <div>
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Generated Reports</CardTitle>
                <CardDescription className="text-gray-300">
                  Your recently generated reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generatedReports.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <FileText className="h-12 w-12 mx-auto mb-4" />
                    <p>No reports generated yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {generatedReports.map((report) => (
                      <div key={report.id} className="bg-gray-700 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white font-medium">{report.name}</h4>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {report.status}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">
                          {report.type} • {report.format.toUpperCase()} • {new Date(report.createdAt).toLocaleDateString()}
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                          <Button size="sm" className="flex-1">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
