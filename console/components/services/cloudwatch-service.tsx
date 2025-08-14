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
  BarChart3,
  Bell,
  AlertTriangle,
  Activity,
  RefreshCw,
  Eye,
  Settings,
} from "lucide-react"

interface CloudWatchServicePageProps {
  onBack: () => void
}

export function CloudWatchServicePage({ onBack }: CloudWatchServicePageProps) {
  const alarms = [
    {
      name: "High CPU Usage",
      status: "OK",
      metric: "EC2 CPU Utilization",
      threshold: "> 80%",
      state: "OK",
      updated: "2 hours ago",
    },
    {
      name: "Database Connections",
      status: "ALARM",
      metric: "RDS DatabaseConnections",
      threshold: "> 90",
      state: "ALARM",
      updated: "15 minutes ago",
    },
    {
      name: "Lambda Errors",
      status: "OK",
      metric: "Lambda Errors",
      threshold: "> 5",
      state: "OK",
      updated: "1 hour ago",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OK":
        return "bg-green-100 text-green-800"
      case "ALARM":
        return "bg-red-100 text-red-800"
      case "INSUFFICIENT_DATA":
        return "bg-yellow-100 text-yellow-800"
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
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-normal text-gray-900">CloudWatch</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-1" />
              Refresh
            </Button>
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-1" />
              Create alarm
            </Button>
          </div>
        </div>
      </div>

      {/* CloudWatch Dashboard */}
      <div className="p-6 max-w-7xl mx-auto">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Bell className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm">Create alarm</h3>
              <p className="text-xs text-gray-500 mt-1">Monitor metrics</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm">Create dashboard</h3>
              <p className="text-xs text-gray-500 mt-1">Visualize metrics</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Eye className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm">View logs</h3>
              <p className="text-xs text-gray-500 mt-1">Browse log groups</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Activity className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm">Insights</h3>
              <p className="text-xs text-gray-500 mt-1">Query and analyze</p>
            </CardContent>
          </Card>
        </div>

        {/* Alarms List */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Alarms</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Search alarms" className="pl-10 w-64" />
                </div>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="w-4 h-4 mr-1" />
                  Create alarm
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Alarm name</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Metric</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Threshold</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Updated</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {alarms.map((alarm, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="text-blue-600 hover:underline cursor-pointer font-medium">{alarm.name}</span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={`${getStatusColor(alarm.status)} border-0`}>{alarm.status}</Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{alarm.metric}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{alarm.threshold}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{alarm.updated}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
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

        {/* Monitoring Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Alarm Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total alarms</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">In alarm</span>
                  <span className="font-medium text-red-600">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">OK</span>
                  <span className="font-medium text-green-600">2</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Dashboards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Custom dashboards</span>
                  <span className="font-medium">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Widgets</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Automatic dashboards</span>
                  <span className="font-medium">5</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Eye className="w-5 h-5 text-green-600" />
                Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Log groups</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Log streams</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Stored data</span>
                  <span className="font-medium">2.1 GB</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
