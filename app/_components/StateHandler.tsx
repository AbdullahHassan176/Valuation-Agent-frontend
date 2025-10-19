'use client'

import { useSearchParams } from 'next/navigation'
import { Loading } from './states/Loading'
import { Error } from './states/Error'
import { Empty } from './states/Empty'

interface StateHandlerProps {
  children: React.ReactNode
}

export function StateHandler({ children }: StateHandlerProps) {
  const searchParams = useSearchParams()
  
  const isLoading = searchParams.get('loading') === '1'
  const isError = searchParams.get('error') === '1'
  const isEmpty = searchParams.get('empty') === '1'
  
  if (isLoading) {
    return <Loading message="Loading data..." />
  }
  
  if (isError) {
    return (
      <Error 
        title="Failed to load data"
        message="There was an error loading the requested data. Please try again."
        onRetry={() => window.location.reload()}
      />
    )
  }
  
  if (isEmpty) {
    return (
      <Empty 
        title="No data available"
        message="There are no items to display at the moment."
        actionLabel="Create New"
        onAction={() => console.log('Create new item')}
      />
    )
  }
  
  return <>{children}</>
}
