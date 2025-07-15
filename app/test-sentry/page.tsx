'use client'

import { useState } from 'react'

export default function TestSentry() {
  const [errorType, setErrorType] = useState('')

  const throwError = (type: string) => {
    setErrorType(type)
    
    switch(type) {
      case 'reference':
        // @ts-ignore
        nonExistentFunction()
        break
      case 'type':
        // @ts-ignore
        null.toString()
        break
      case 'promise':
        Promise.reject(new Error('Unhandled promise rejection'))
        break
      case 'custom':
        throw new Error('Custom error from test page')
      default:
        break
    }
  }

  // Esta página solo estará disponible en desarrollo
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Test Sentry Integration</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Throw Test Errors</h2>
          <p className="text-gray-600 mb-4">
            Click any button to throw an error and verify Sentry is capturing it.
          </p>
          
          <div className="space-x-4">
            <button
              onClick={() => throwError('reference')}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Reference Error
            </button>
            
            <button
              onClick={() => throwError('type')}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Type Error
            </button>
            
            <button
              onClick={() => throwError('promise')}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Promise Rejection
            </button>
            
            <button
              onClick={() => throwError('custom')}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Custom Error
            </button>
          </div>
        </div>
        
        {errorType && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">
              Error type "{errorType}" was thrown. Check your Sentry dashboard!
            </p>
          </div>
        )}
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
          <h3 className="font-semibold text-blue-900 mb-2">How to verify:</h3>
          <ol className="list-decimal list-inside text-blue-700 space-y-1">
            <li>Click any error button above</li>
            <li>Go to your Sentry dashboard</li>
            <li>You should see the error appear within seconds</li>
            <li>Check that source maps are working (you'll see the actual code)</li>
          </ol>
        </div>
      </div>
    </div>
  )
}