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
  Users,
  Key,
  FileText,
  RefreshCw,
  Settings,
  Lock,
  UserCheck,
} from "lucide-react"

interface IAMServicePageProps {
  onBack: () => void
}

export function IAMServicePage({ onBack }: IAMServicePageProps) {
  const users = [
    {
      name: "admin-user",
      groups: ["Administrators"],
      policies: 3,
      accessKeys: 1,
      lastActivity: "2024-01-15 14:30",
      mfa: true,
    },
    {
      name: "developer-john",
      groups: ["Developers"],
      policies: 2,
      accessKeys: 2,
      lastActivity: "2024-01-14 16:45",
      mfa: false,
    },
    {
      name: "readonly-user",
      groups: ["ReadOnly"],
      policies: 1,
      accessKeys: 0,
      lastActivity: "2024-01-10 09:20",
      mfa: true,
    },
  ]

  const roles = [
    { name: "EC2-S3-Access-Role", type: "Service Role", policies: 2, lastUsed: "2024-01-15" },
    { name: "Lambda-Execution-Role", type: "Service Role", policies: 1, lastUsed: "2024-01-14" },
    { name: "Cross-Account-Role", type: "Cross-account", policies: 3, lastUsed: "2024-01-12" },
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
              <Shield className="w-6 h-6 text-red-600" />
              <h1 className="text-2xl font-normal text-gray-900">IAM</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-1" />
              Refresh
            </Button>
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-1" />
              Create user
            </Button>
          </div>
        </div>
      </div>

      {/* IAM Dashboard */}
      <div className="p-6 max-w-7xl mx-auto">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm">Create user</h3>
              <p className="text-xs text-gray-500 mt-1">Add new IAM user</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm">Create role</h3>
              <p className="text-xs text-gray-500 mt-1">Define service permissions</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm">Create policy</h3>
              <p className="text-xs text-gray-500 mt-1">Define permissions</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <UserCheck className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm">Access analyzer</h3>
              <p className="text-xs text-gray-500 mt-1">Review permissions</p>
            </CardContent>
          </Card>
        </div>

        {/* Users List */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Users</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Search users" className="pl-10 w-64" />
                </div>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="w-4 h-4 mr-1" />
                  Create user
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">User name</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Groups</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Policies</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Access keys</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">MFA</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Last activity</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="text-blue-600 hover:underline cursor-pointer font-medium">{user.name}</span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{user.groups.join(", ")}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{user.policies}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{user.accessKeys}</td>
                      <td className="py-3 px-4">
                        <Badge
                          className={
                            user.mfa ? "bg-green-100 text-green-800 border-0" : "bg-red-100 text-red-800 border-0"
                          }
                        >
                          {user.mfa ? "Enabled" : "Disabled"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{user.lastActivity}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Key className="w-4 h-4" />
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

        {/* Roles List */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Roles</CardTitle>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                <Plus className="w-4 h-4 mr-1" />
                Create role
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Role name</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Policies</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Last used</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((role, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="text-blue-600 hover:underline cursor-pointer font-medium">{role.name}</span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{role.type}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{role.policies}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{role.lastUsed}</td>
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

        {/* IAM Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Users & Groups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total users</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Groups</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">MFA enabled</span>
                  <span className="font-medium text-green-600">2/3</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Roles & Policies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total roles</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Custom policies</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">AWS managed</span>
                  <span className="font-medium">12</span>
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
                  <span className="text-sm text-gray-600">Access keys</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Unused keys</span>
                  <span className="font-medium text-yellow-600">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Password policy</span>
                  <span className="font-medium text-green-600">Strong</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
