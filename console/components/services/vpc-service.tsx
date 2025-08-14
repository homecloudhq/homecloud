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
  Shield,
  Network,
  Router,
  Lock,
  Settings,
  RefreshCw,
} from "lucide-react"

interface VPCServicePageProps {
  onBack: () => void
}

export function VPCServicePage({ onBack }: VPCServicePageProps) {
  const vpcs = [
    {
      id: "vpc-1234567890abcdef0",
      name: "Production VPC",
      cidr: "10.0.0.0/16",
      state: "available",
      subnets: 4,
      routeTables: 2,
      igw: "Yes",
    },
    {
      id: "vpc-0987654321fedcba0",
      name: "Development VPC",
      cidr: "172.16.0.0/16",
      state: "available",
      subnets: 2,
      routeTables: 1,
      igw: "Yes",
    },
    {
      id: "vpc-abcdef1234567890",
      name: "Testing VPC",
      cidr: "192.168.0.0/16",
      state: "available",
      subnets: 3,
      routeTables: 1,
      igw: "No",
    },
  ]

  const subnets = [
    {
      id: "subnet-1a2b3c4d",
      name: "Public Subnet 1",
      vpc: "Production VPC",
      cidr: "10.0.1.0/24",
      az: "ap-northeast-1a",
      type: "Public",
    },
    {
      id: "subnet-5e6f7g8h",
      name: "Private Subnet 1",
      vpc: "Production VPC",
      cidr: "10.0.2.0/24",
      az: "ap-northeast-1b",
      type: "Private",
    },
    {
      id: "subnet-9i0j1k2l",
      name: "Public Subnet 2",
      vpc: "Development VPC",
      cidr: "172.16.1.0/24",
      az: "ap-northeast-1a",
      type: "Public",
    },
  ]

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
              <Shield className="w-6 h-6 text-purple-600" />
              <h1 className="text-2xl font-normal text-gray-900">VPC</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-1" />
              Refresh
            </Button>
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-1" />
              Create VPC
            </Button>
          </div>
        </div>
      </div>

      {/* VPC Dashboard */}
      <div className="p-6 max-w-7xl mx-auto">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Plus className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm">Create VPC</h3>
              <p className="text-xs text-gray-500 mt-1">Create a new VPC</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Network className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm">Create subnet</h3>
              <p className="text-xs text-gray-500 mt-1">Add subnet to VPC</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Router className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm">Route tables</h3>
              <p className="text-xs text-gray-500 mt-1">Manage routing</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Lock className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm">Security groups</h3>
              <p className="text-xs text-gray-500 mt-1">Configure firewall</p>
            </CardContent>
          </Card>
        </div>

        {/* VPCs List */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Your VPCs</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Search VPCs" className="pl-10 w-64" />
                </div>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="w-4 h-4 mr-1" />
                  Create VPC
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">VPC ID</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">IPv4 CIDR</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">State</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Subnets</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Internet Gateway</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vpcs.map((vpc, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="text-blue-600 hover:underline cursor-pointer font-mono text-sm">{vpc.id}</span>
                      </td>
                      <td className="py-3 px-4 font-medium">{vpc.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-600 font-mono">{vpc.cidr}</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-100 text-green-800 border-0">{vpc.state}</Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{vpc.subnets}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{vpc.igw}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
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

        {/* Subnets List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Subnets</CardTitle>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                <Plus className="w-4 h-4 mr-1" />
                Create subnet
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Subnet ID</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">VPC</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">IPv4 CIDR</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Availability Zone</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {subnets.map((subnet, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="text-blue-600 hover:underline cursor-pointer font-mono text-sm">
                          {subnet.id}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium">{subnet.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{subnet.vpc}</td>
                      <td className="py-3 px-4 text-sm text-gray-600 font-mono">{subnet.cidr}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{subnet.az}</td>
                      <td className="py-3 px-4">
                        <Badge
                          className={
                            subnet.type === "Public"
                              ? "bg-blue-100 text-blue-800 border-0"
                              : "bg-gray-100 text-gray-800 border-0"
                          }
                        >
                          {subnet.type}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Network Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                VPC Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total VPCs</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total subnets</span>
                  <span className="font-medium">9</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Internet gateways</span>
                  <span className="font-medium">2</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Lock className="w-5 h-5 text-red-600" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Security groups</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Network ACLs</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">NAT gateways</span>
                  <span className="font-medium">2</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Router className="w-5 h-5 text-green-600" />
                Routing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Route tables</span>
                  <span className="font-medium">4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">VPC endpoints</span>
                  <span className="font-medium">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Peering connections</span>
                  <span className="font-medium">0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
