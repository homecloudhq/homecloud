"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Search,
  Plus,
  Database,
  Play,
  Square,
  RotateCcw,
  Settings,
  RefreshCw,
  Activity,
  HardDrive,
} from "lucide-react"

interface RDSServicePageProps {
  onBack: () => void
}

export function RDSServicePage({ onBack }: RDSServicePageProps) {
  const databases = [
    {
      id: "myapp-prod-db",
      engine: "MySQL",
      version: "8.0.35",
      status: "available",
      instanceClass: "db.t3.medium",
      storage: "100 GB",
      endpoint: "myapp-prod-db.cluster-xyz.ap-northeast-1.rds.amazonaws.com",
      created: "2024-01-15",
    },
    {
      id: "analytics-db",
      engine: "PostgreSQL",
      version: "15.4",
      status: "stopped",
      instanceClass: "db.r5.large",
      storage: "500 GB",
      endpoint: "analytics-db.xyz.ap-northeast-1.rds.amazonaws.com",
      created: "2024-01-10",
    },
    {
      id: "cache-cluster",
      engine: "Redis",
      version: "7.0",
      status: "available",
      instanceClass: "cache.t3.micro",
      storage: "1 GB",
      endpoint: "cache-cluster.xyz.cache.amazonaws.com",
      created: "2024-01-20",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "stopped":
        return "bg-red-100 text-red-800"
      case "creating":
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
              <Database className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-normal text-gray-900">RDS</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-1" />
              Refresh
            </Button>
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-1" />
              Create database
            </Button>
          </div>
        </div>
      </div>

      {/* RDS Dashboard */}
      <div className="p-6 max-w-7xl mx-auto">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Plus className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm">Create database</h3>
              <p className="text-xs text-gray-500 mt-1">Launch new RDS instance</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <HardDrive className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm">Create snapshot</h3>
              <p className="text-xs text-gray-500 mt-1">Backup your database</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Activity className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm">Performance insights</h3>
              <p className="text-xs text-gray-500 mt-1">Monitor performance</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Settings className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm">Parameter groups</h3>
              <p className="text-xs text-gray-500 mt-1">Manage configurations</p>
            </CardContent>
          </Card>
        </div>

        {/* Databases List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Databases</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Search databases" className="pl-10 w-64" />
                </div>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="w-4 h-4 mr-1" />
                  Create database
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">DB identifier</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Engine</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Instance class</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Storage</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {databases.map((db, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="text-blue-600 hover:underline cursor-pointer font-medium">{db.id}</span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {db.engine} {db.version}
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={`${getStatusColor(db.status)} border-0`}>{db.status}</Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{db.instanceClass}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{db.storage}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {db.status === "available" ? (
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              <Square className="w-4 h-4" />
                            </Button>
                          ) : (
                            <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                              <Play className="w-4 h-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <RotateCcw className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Settings className="w-4 h-4" />
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

        {/* Database Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-600" />
                Database Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Running databases</span>
                  <span className="font-medium text-green-600">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Stopped databases</span>
                  <span className="font-medium text-red-600">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total storage</span>
                  <span className="font-medium">601 GB</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-green-600" />
                Backups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Automated backups</span>
                  <span className="font-medium">Enabled</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Manual snapshots</span>
                  <span className="font-medium">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Backup retention</span>
                  <span className="font-medium">7 days</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-600" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">CPU utilization</span>
                  <span className="font-medium">15%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Connections</span>
                  <span className="font-medium">12/100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Read IOPS</span>
                  <span className="font-medium">245/sec</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
