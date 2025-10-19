'use client'

import React from 'react'
import { Loader2, RefreshCw, Database, Calculator, Shield, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <Loader2 className={`animate-spin ${sizeClasses[size]} ${className}`} />
  )
}

interface LoadingCardProps {
  title?: string
  description?: string
  icon?: React.ReactNode
  showProgress?: boolean
  progress?: number
}

export const LoadingCard: React.FC<LoadingCardProps> = ({
  title = 'Loading...',
  description = 'Please wait while we process your request',
  icon,
  showProgress = false,
  progress = 0
}) => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6 text-center">
        <div className="mb-4">
          {icon || <LoadingSpinner size="lg" className="mx-auto text-green-600" />}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        {showProgress && (
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        )}
        
        <div className="flex items-center justify-center text-sm text-gray-500">
          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
          Processing...
        </div>
      </CardContent>
    </Card>
  )
}

interface ValuationLoadingProps {
  stage: 'intake' | 'data' | 'calculation' | 'risk' | 'compliance' | 'complete'
  progress?: number
}

export const ValuationLoading: React.FC<ValuationLoadingProps> = ({ 
  stage, 
  progress = 0 
}) => {
  const stages = {
    intake: {
      title: 'Processing Contract',
      description: 'Parsing and validating contract details',
      icon: <Database className="w-8 h-8 text-blue-600" />,
      color: 'blue'
    },
    data: {
      title: 'Sourcing Market Data',
      description: 'Retrieving current market data and curves',
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      color: 'green'
    },
    calculation: {
      title: 'Running Valuation',
      description: 'Calculating present value and sensitivities',
      icon: <Calculator className="w-8 h-8 text-purple-600" />,
      color: 'purple'
    },
    risk: {
      title: 'Risk Analytics',
      description: 'Computing XVA and risk metrics',
      icon: <Shield className="w-8 h-8 text-orange-600" />,
      color: 'orange'
    },
    compliance: {
      title: 'IFRS Classification',
      description: 'Determining fair value hierarchy level',
      icon: <Shield className="w-8 h-8 text-indigo-600" />,
      color: 'indigo'
    },
    complete: {
      title: 'Valuation Complete',
      description: 'All calculations finished successfully',
      icon: <RefreshCw className="w-8 h-8 text-green-600" />,
      color: 'green'
    }
  }

  const currentStage = stages[stage]

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              {currentStage.icon}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentStage.title}</h2>
            <p className="text-gray-600">{currentStage.description}</p>
          </div>

          <div className="space-y-4">
            {Object.entries(stages).map(([key, stageInfo]) => (
              <div key={key} className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  key === stage 
                    ? `bg-${stageInfo.color}-100 text-${stageInfo.color}-600` 
                    : key < stage 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-400'
                }`}>
                  {key < stage ? (
                    <RefreshCw className="w-4 h-4" />
                  ) : key === stage ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <div className="w-4 h-4 rounded-full bg-gray-300" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${
                    key <= stage ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {stageInfo.title}
                  </p>
                  <p className={`text-sm ${
                    key <= stage ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {stageInfo.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {progress > 0 && (
            <div className="mt-8">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`bg-${currentStage.color}-600 h-3 rounded-full transition-all duration-500`}
                  style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

interface SkeletonTableProps {
  rows?: number
  columns?: number
}

export const SkeletonTable: React.FC<SkeletonTableProps> = ({ 
  rows = 5, 
  columns = 4 
}) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex space-x-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton 
              key={colIndex} 
              className={`h-4 ${
                colIndex === 0 ? 'w-32' : 
                colIndex === 1 ? 'w-24' : 
                colIndex === 2 ? 'w-20' : 'w-16'
              }`} 
            />
          ))}
        </div>
      ))}
    </div>
  )
}

interface SkeletonCardProps {
  lines?: number
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ lines = 3 }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-3">
          <Skeleton className="h-4 w-3/4" />
          {Array.from({ length: lines - 1 }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Hook for managing loading states
export const useLoadingState = (initialState = false) => {
  const [isLoading, setIsLoading] = React.useState(initialState)
  const [loadingMessage, setLoadingMessage] = React.useState('')

  const startLoading = (message = 'Loading...') => {
    setIsLoading(true)
    setLoadingMessage(message)
  }

  const stopLoading = () => {
    setIsLoading(false)
    setLoadingMessage('')
  }

  const updateLoadingMessage = (message: string) => {
    setLoadingMessage(message)
  }

  return {
    isLoading,
    loadingMessage,
    startLoading,
    stopLoading,
    updateLoadingMessage
  }
}
