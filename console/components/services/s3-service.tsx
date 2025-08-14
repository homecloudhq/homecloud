"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  Search,
  Plus,
  Database,
  Folder,
  FileText,
  Download,
  Upload,
  Trash2,
  Settings,
  RefreshCw,
} from "lucide-react"

interface S3ServicePageProps {
  onBack: () => void
}

export function S3ServicePage({ onBack }: S3ServicePageProps) {
  const buckets = [
    { name: "my-app-assets", region: "ap-northeast-1", created: "2024-01-15", objects: 1247, size: "2.3 GB" },
    { name: "backup-storage", region: "ap-northeast-1", created: "2024-02-01", objects: 89, size: "456 MB" },
    { name: "logs-archive", region: "ap-northeast-1", created: "2024-01-20", objects: 3421, size: "8.7 GB" },
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
              <Database className="w-6 h-6 text-green-600" />
              <h1 className="text-2xl font-normal text-gray-900">S3</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-1" />
              Refresh
            </Button>
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-1" />
              Create bucket
            </Button>
          </div>
        </div>
      </div>

      {/* S3 Dashboard */}
      <div className="p-6 max-w-7xl mx-auto">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm">Upload files</h3>
              <p className="text-xs text-gray-500 mt-1">Upload files to S3</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Plus className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm">Create bucket</h3>
              <p className="text-xs text-gray-500 mt-1">Create a new S3 bucket</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Settings className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm">Bucket policies</h3>
              <p className="text-xs text-gray-500 mt-1">Manage access policies</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <FileText className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm">Access logs</h3>
              <p className="text-xs text-gray-500 mt-1">View access logs</p>
            </CardContent>
          </Card>
        </div>

        {/* Buckets List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Buckets</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Search buckets" className="pl-10 w-64" />
                </div>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="w-4 h-4 mr-1" />
                  Create bucket
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Region</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Date created</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Objects</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Size</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {buckets.map((bucket, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Folder className="w-4 h-4 text-blue-600" />
                          <span className="text-blue-600 hover:underline cursor-pointer font-medium">
                            {bucket.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{bucket.region}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{bucket.created}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{bucket.objects.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{bucket.size}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Settings className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
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

        {/* Storage Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Storage usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total storage</span>
                  <span className="font-medium">11.5 GB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Number of objects</span>
                  <span className="font-medium">4,757</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Number of buckets</span>
                  <span className="font-medium">3</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Recent activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Uploaded 15 files to my-app-assets</span>
                  <span className="text-gray-400 ml-auto">2h ago</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">Created bucket backup-storage</span>
                  <span className="text-gray-400 ml-auto">1d ago</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-600">Updated bucket policy for logs-archive</span>
                  <span className="text-gray-400 ml-auto">3d ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
