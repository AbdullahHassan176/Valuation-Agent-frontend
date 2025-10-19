"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Users, 
  FileText,
  RefreshCw,
  ExternalLink,
  Activity,
  Target,
  Shield,
  Database,
  AlertCircle,
  Info
} from "lucide-react"

interface MetricsSummary {
  total: number
  ok: number
  abstain: number
  avg_confidence: number
  top_standards: Array<{standard: string, count: number}>
  last_24h: number
}

interface TimeSeriesData {
  ts: string
  total: number
  ok: number
  abstain: number
  avg_confidence: number
}

interface TopicMetrics {
  topics: Array<{
    topic: string
    total: number
    ok: number
    abstain: number
    avg_confidence: number
  }>
}

interface ConfidenceDistribution {
  distribution: {
    low: number
    medium: number
    high: number
  }
}

interface RecentActivity {
  timestamp: string
  endpoint: string
  status: string
  confidence: number
  topic: string
  standard: string
  user_id: string
}

export default function MetricsPage() {
  const [metricsSummary, setMetricsSummary] = useState<MetricsSummary | null>(null)
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([])
  const [topicMetrics, setTopicMetrics] = useState<TopicMetrics | null>(null)
  const [confidenceDistribution, setConfidenceDistribution] = useState<ConfidenceDistribution | null>(null)
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMetrics = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch all metrics in parallel
      const [summaryRes, timeseriesRes, topicsRes, confidenceRes, activityRes] = await Promise.all([
        fetch('/api/v1/metrics/summary'),
        fetch('/api/v1/metrics/timeseries?window=daily'),
        fetch('/api/v1/metrics/topics'),
        fetch('/api/v1/metrics/confidence-distribution'),
        fetch('/api/v1/metrics/recent-activity?limit=10')
      ])

      if (!summaryRes.ok) throw new Error('Failed to fetch summary metrics')
      if (!timeseriesRes.ok) throw new Error('Failed to fetch timeseries data')
      if (!topicsRes.ok) throw new Error('Failed to fetch topic metrics')
      if (!confidenceRes.ok) throw new Error('Failed to fetch confidence distribution')
      if (!activityRes.ok) throw new Error('Failed to fetch recent activity')

      const [summary, timeseries, topics, confidence, activity] = await Promise.all([
        summaryRes.json(),
        timeseriesRes.json(),
        topicsRes.json(),
        confidenceRes.json(),
        activityRes.json()
      ])

      setMetricsSummary(summary)
      setTimeSeriesData(timeseries)
      setTopicMetrics(topics)
      setConfidenceDistribution(confidence)
      setRecentActivity(activity)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch metrics')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMetrics()
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchMetrics, 30000)
    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'OK':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'ABSTAIN':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      default:
        return <AlertCircle className="w-4 h-4 text-red-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'OK':
        return <Badge className="bg-green-600 text-white">OK</Badge>
      case 'ABSTAIN':
        return <Badge className="bg-yellow-600 text-white">ABSTAIN</Badge>
      default:
        return <Badge className="bg-red-600 text-white">ERROR</Badge>
    }
  }

  const formatConfidence = (confidence: number) => {
    return `${Math.round(confidence * 100)}%`
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading metrics...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Error loading metrics: {error}
            <Button 
              onClick={fetchMetrics} 
              className="ml-4"
              size="sm"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Metrics</h1>
          <p className="text-gray-600">Monitor system performance and usage analytics</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button onClick={fetchMetrics} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            <ExternalLink className="w-4 h-4 mr-2" />
            View Audit Log
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      {metricsSummary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Queries</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metricsSummary.total.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +{metricsSummary.last_24h} in last 24h
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metricsSummary.total > 0 ? Math.round((metricsSummary.ok / metricsSummary.total) * 100) : 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                {metricsSummary.ok} successful responses
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Abstention Rate</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metricsSummary.total > 0 ? Math.round((metricsSummary.abstain / metricsSummary.total) * 100) : 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                {metricsSummary.abstain} abstained responses
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Confidence</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatConfidence(metricsSummary.avg_confidence)}
              </div>
              <p className="text-xs text-muted-foreground">
                Across all responses
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time Series Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Activity</CardTitle>
            <CardDescription>OK vs ABSTAIN responses over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Chart visualization would go here</p>
                <p className="text-sm text-gray-400">
                  {timeSeriesData.length} data points available
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Standards */}
        <Card>
          <CardHeader>
            <CardTitle>Top Standards</CardTitle>
            <CardDescription>Most frequently queried IFRS standards</CardDescription>
          </CardHeader>
          <CardContent>
            {metricsSummary?.top_standards && metricsSummary.top_standards.length > 0 ? (
              <div className="space-y-3">
                {metricsSummary.top_standards.map((standard, index) => (
                  <div key={standard.standard} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline">{index + 1}</Badge>
                      <span className="font-medium">{standard.standard}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{standard.count}</div>
                      <div className="text-xs text-gray-500">queries</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p>No standards data available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Topic Metrics and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Topic Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Topic Performance</CardTitle>
            <CardDescription>Success rates by topic</CardDescription>
          </CardHeader>
          <CardContent>
            {topicMetrics?.topics && topicMetrics.topics.length > 0 ? (
              <div className="space-y-4">
                {topicMetrics.topics.slice(0, 5).map((topic) => (
                  <div key={topic.topic} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium capitalize">{topic.topic}</span>
                      <div className="text-sm text-gray-500">
                        {topic.total} queries
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span>{topic.ok}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <AlertTriangle className="w-3 h-3 text-yellow-600" />
                        <span>{topic.abstain}</span>
                      </div>
                      <div className="text-gray-500">
                        {formatConfidence(topic.avg_confidence)}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${topic.total > 0 ? (topic.ok / topic.total) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Activity className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p>No topic data available</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system interactions</CardDescription>
          </CardHeader>
          <CardContent>
            {recentActivity.length > 0 ? (
              <div className="space-y-3">
                {recentActivity.slice(0, 5).map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                    {getStatusIcon(activity.status)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{activity.endpoint}</span>
                        {getStatusBadge(activity.status)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {activity.topic && <span>{activity.topic} • </span>}
                        {activity.confidence && <span>{formatConfidence(activity.confidence)} • </span>}
                        {formatTimestamp(activity.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Clock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p>No recent activity</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Confidence Distribution */}
      {confidenceDistribution && (
        <Card>
          <CardHeader>
            <CardTitle>Confidence Distribution</CardTitle>
            <CardDescription>Distribution of confidence scores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {confidenceDistribution.distribution.low}
                </div>
                <div className="text-sm text-red-600">Low Confidence</div>
                <div className="text-xs text-gray-500">&lt; 30%</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {confidenceDistribution.distribution.medium}
                </div>
                <div className="text-sm text-yellow-600">Medium Confidence</div>
                <div className="text-xs text-gray-500">30% - 70%</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {confidenceDistribution.distribution.high}
                </div>
                <div className="text-sm text-green-600">High Confidence</div>
                <div className="text-xs text-gray-500">&gt; 70%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Low Confidence Alert */}
      {metricsSummary && metricsSummary.abstain > 0 && (
        <Alert className="border-yellow-200 bg-yellow-50">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <div className="flex items-center justify-between">
              <div>
                <strong>Low Confidence Responses Detected</strong>
                <p className="text-sm mt-1">
                  {metricsSummary.abstain} responses were abstained due to low confidence. 
                  Consider reviewing these cases for potential improvements.
                </p>
              </div>
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                Review Cases
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
