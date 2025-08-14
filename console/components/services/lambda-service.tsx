"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Search,
  Plus,
  MoreHorizontal,
  Zap,
  Play,
  Settings,
  RefreshCw,
  Code,
  Clock,
  Activity,
  FileText,
} from "lucide-react"

interface LambdaServicePageProps {
  onBack: () => void
}

export function LambdaServicePage({ onBack }: LambdaServicePageProps) {
  const functions = [
    {
      name: "user-authentication",
      runtime: "Node.js 18.x",
      status: "Active",
      lastModified: "2024-01-15 14:30",
      timeout: "30s",
      memory: "256 MB",
      invocations: "1,247",
    },
    {
      name: "image-processor",
      runtime: "Python 3.11",
      status: "Active",
      lastModified: "2024-01-12 09:15",
      timeout: "5m",
      memory: "1024 MB",
      invocations: "89",
    },
    {
      name: "data-sync",
      runtime: "Node.js 18.x",
      status: "Inactive",
      lastModified: "2024-01-08 16:45",
      timeout: "15m",
      memory: "512 MB",
      invocations: "0",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Inactive":
        return "bg-gray-100 text-gray-800"
      case "Failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <>
      {/* Service Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Console Home
            </Button>
            <div className="h-6 w-px bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-600" />
              <h1 className="text-2xl font-normal text-gray-900">Lambda</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-1" />
              Refresh
            </Button>
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-1" />
              Create function
            </Button>
          </div>
        </div>
      </div>

      {/* Lambda Dashboard */}
      <div className="p-6 max-w-7xl mx-auto">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Plus className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm">Create function</h3>
              <p className="text-xs text-gray-500 mt-1">Build serverless function</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Code className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm">Browse blueprints</h3>
              <p className="text-xs text-gray-500 mt-1">Use pre-built templates</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Activity className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm">View metrics</h3>
              <p className="text-xs text-gray-500 mt-1">Monitor performance</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Settings className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm">Layers</h3>
              <p className="text-xs text-gray-500 mt-1">Manage shared code</p>
            </CardContent>
          </Card>
        </div>

        {/* Functions List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Functions</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Search functions" className="pl-10 w-64" />
                </div>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="w-4 h-4 mr-1" />
                  Create function
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Function name</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Runtime</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Last modified</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Memory</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Invocations</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {functions.map((func, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="text-blue-600 hover:underline cursor-pointer font-medium">{func.name}</span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{func.runtime}</td>
                      <td className="py-3 px-4">
                        <Badge className={`${getStatusColor(func.status)} border-0`}>{func.status}</Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{func.lastModified}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{func.memory}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{func.invocations}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                            <Play className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Settings className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Lambda Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                Function Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total functions</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active functions</span>
                  <span className="font-medium text-green-600">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total invocations</span>
                  <span className="font-medium">1,336</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Avg duration</span>
                  <span className="font-medium">245ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Error rate</span>
                  <span className="font-medium">0.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Throttles</span>
                  <span className="font-medium">0</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Layers</span>
                  <span className="font-medium">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Event sources</span>
                  <span className="font-medium">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Destinations</span>
                  <span className="font-medium">1</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
