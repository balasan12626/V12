import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

interface ApiTestProps {
  className?: string;
}

const ApiTest: React.FC<ApiTestProps> = ({ className = '' }) => {
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testApiConnection = async () => {
    setConnectionStatus('testing');
    setError(null);
    setApiResponse(null);

    try {
      // Test the health endpoint
      const response = await apiService.healthCheck();
      setApiResponse(response);
      setConnectionStatus('success');
    } catch (err: any) {
      setError(err.message || 'Failed to connect to API');
      setConnectionStatus('error');
    }
  };

  const testBlogsEndpoint = async () => {
    setConnectionStatus('testing');
    setError(null);
    setApiResponse(null);

    try {
      // Test the blogs endpoint
      const response = await apiService.getAllBlogs();
      setApiResponse(response);
      setConnectionStatus('success');
    } catch (err: any) {
      setError(err.message || 'Failed to fetch blogs');
      setConnectionStatus('error');
    }
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      case 'testing':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'success':
        return '✅ Connected';
      case 'error':
        return '❌ Failed';
      case 'testing':
        return '🔄 Testing...';
      default:
        return '⚪ Not tested';
    }
  };

  return (
    <div className={`p-6 bg-white rounded-lg shadow-md ${className}`}>
      <h2 className="text-2xl font-bold mb-4">API Connection Test</h2>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">
          API URL: <code className="bg-gray-100 px-2 py-1 rounded">{import.meta.env.VITE_API_URL || 'http://localhost:8000'}</code>
        </p>
        <p className={`font-semibold ${getStatusColor()}`}>
          Status: {getStatusText()}
        </p>
      </div>

      <div className="space-x-4 mb-4">
        <button
          onClick={testApiConnection}
          disabled={connectionStatus === 'testing'}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Test Health Check
        </button>
        <button
          onClick={testBlogsEndpoint}
          disabled={connectionStatus === 'testing'}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          Test Blogs API
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <h3 className="font-bold">Error:</h3>
          <p>{error}</p>
        </div>
      )}

      {apiResponse && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          <h3 className="font-bold">API Response:</h3>
          <pre className="text-sm mt-2 overflow-x-auto">
            {JSON.stringify(apiResponse, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ApiTest; 