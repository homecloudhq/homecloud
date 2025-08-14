"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Search,
  Plus,
  Server,
  Play,
  Square,
  RotateCcw,
  Settings,
  RefreshCw,
  Monitor,
  HardDrive,
  Cpu,
} from "lucide-react"

interface EC2ServicePageProps {
  onBack: () => void
}

export function EC2ServicePage({ onBack }: EC2ServicePageProps) {
  const instances = [
    {
      id: "i-1234567890abcdef0",
      name: "Web Server 1",
      type: "t3.medium",
      state: "running",
      az: "ap-northeast-1a",
      publicIp: "54.123.45.67",
      privateIp: "10.0.1.15",
      launched: "2024-01-15 10:30",
    },
    {
      id: "i-0987654321fedcba0",
      name: "Database Server",
      type: "r5.large",
      state: "stopped",
      az: "ap-northeast-1b",
      publicIp: "-",
      privateIp: "10.0.2.20",
      launched: "2024-01-10 14:20",
    },
    {
      id: "i-abcdef1234567890",
      name: "Load Balancer",
      type: "t3.small",
      state: "running",
      az: "ap-northeast-1c",
      publicIp: "52.198.76.54",
      privateIp: "10.0.3.10",
      launched: "2024-01-20 09:15",
    },
  ]

  const getStateColor = (state: string) => {
    switch (state) {
      case "running":
        return "bg-green-100 text-green-800"
      case "stopped":
        return "bg-red-100 text-red-800"
      case "pending":
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
              <Server className="w-6 h-6 text-orange-600" />
              <h1 className="text-2xl font-normal text-gray-900">EC2</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-1" />
              Refresh
            </Button>
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-1" />
              Launch instance
            </Button>
          </div>
        </div>
      </div>

      {/* EC2 Dashboard */}
      <div className="p-6 max-w-7xl mx-auto">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Plus className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm">Launch instance</h3>
              <p className="text-xs text-gray-500 mt-1">Create a new EC2 instance</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <HardDrive className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm">Create volume</h3>
              <p className="text-xs text-gray-500 mt-1">Create EBS volume</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Monitor className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm">View metrics</h3>
              <p className="text-xs text-gray-500 mt-1">Monitor performance</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Settings className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm">Security groups</h3>
              <p className="text-xs text-gray-500 mt-1">Manage firewall rules</p>
            </CardContent>
          </Card>
        </div>

        {/* Instances List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Instances</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Search instances" className="pl-10 w-64" />
                </div>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="w-4 h-4 mr-1" />
                  Launch instance
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Instance ID</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Instance type</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Instance state</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Availability Zone</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Public IPv4</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {instances.map((instance, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="text-blue-600 hover:underline cursor-pointer font-mono text-sm">
                          {instance.id}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium">{instance.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{instance.type}</td>
                      <td className="py-3 px-4">
                        <Badge className={`${getStateColor(instance.state)} border-0`}>{instance.state}</Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{instance.az}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{instance.publicIp}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {instance.state === "running" ? (
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

        {/* Resource Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Cpu className="w-5 h-5 text-blue-600" />
                Instance Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Running instances</span>
                  <span className="font-medium text-green-600">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Stopped instances</span>
                  <span className="font-medium text-red-600">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total instances</span>
                  <span className="font-medium">3</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-purple-600" />
                Storage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">EBS volumes</span>
                  <span className="font-medium">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total storage</span>
                  <span className="font-medium">250 GB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Snapshots</span>
                  <span className="font-medium">12</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Monitor className="w-5 h-5 text-green-600" />
                Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">CPU utilization</span>
                  <span className="font-medium">23%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Network in</span>
                  <span className="font-medium">1.2 MB/s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Network out</span>
                  <span className="font-medium">0.8 MB/s</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
