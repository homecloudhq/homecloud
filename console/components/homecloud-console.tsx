"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  Bell,
  HelpCircle,
  Settings,
  User,
  ChevronDown,
  Cloud,
  Plus,
  MoreHorizontal,
  Database,
  Server,
  Shield,
  Zap,
  BarChart3,
  ExternalLink,
  Network,
  Users,
} from "lucide-react"

import { S3ServicePage } from "./services/s3-service"
import { EC2ServicePage } from "./services/ec2-service"
import { VPCServicePage } from "./services/vpc-service"
import { RDSServicePage } from "./services/rds-service"
import { LambdaServicePage } from "./services/lambda-service"
import { CloudWatchServicePage } from "./services/cloudwatch-service"
import { IAMServicePage } from "./services/iam-service"

export function HomecloudConsole() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentView, setCurrentView] = useState<string>("home")

  const accountData = {
    accountId: "123456789012",
    accountName: "Production Account",
    userName: "john.smith@company.com",
    region: "us-east-1",
    regionName: "US East (N. Virginia)",
    organizationId: "o-abc123def456",
    billingCurrency: "USD",
  }

  const recentlyVisited = [
    { name: "S3", icon: Database, color: "bg-green-500", id: "s3" },
    { name: "VPC", icon: Shield, color: "bg-purple-500", id: "vpc" },
    { name: "EC2", icon: Server, color: "bg-orange-500", id: "ec2" },
    { name: "RDS", icon: Database, color: "bg-blue-500", id: "rds" },
    { name: "Lambda", icon: Zap, color: "bg-yellow-500", id: "lambda" },
    { name: "CloudWatch", icon: BarChart3, color: "bg-indigo-500", id: "cloudwatch" },
    { name: "IAM", icon: Users, color: "bg-red-500", id: "iam" },
  ]

  const serviceCategories = [
    {
      category: "Compute",
      services: [
        { name: "EC2", description: "Virtual Servers in the Cloud", id: "ec2", icon: Server },
        { name: "Lambda", description: "Run Code without Thinking about Servers", id: "lambda", icon: Zap },
      ],
    },
    {
      category: "Storage",
      services: [{ name: "S3", description: "Scalable Storage in the Cloud", id: "s3", icon: Database }],
    },
    {
      category: "Database",
      services: [{ name: "RDS", description: "Managed Relational Database Service", id: "rds", icon: Database }],
    },
    {
      category: "Networking & Content Delivery",
      services: [{ name: "VPC", description: "Isolated Cloud Resources", id: "vpc", icon: Network }],
    },
    {
      category: "Management & Governance",
      services: [
        { name: "CloudWatch", description: "Monitoring and Observability", id: "cloudwatch", icon: BarChart3 },
      ],
    },
    {
      category: "Security, Identity, & Compliance",
      services: [{ name: "IAM", description: "Identity and Access Management", id: "iam", icon: Users }],
    },
  ]

  const handleServiceClick = (serviceId: string) => {
    setCurrentView(serviceId)
  }

  const handleBackToHome = () => {
    setCurrentView("home")
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case "s3":
        return <S3ServicePage onBack={handleBackToHome} />
      case "ec2":
        return <EC2ServicePage onBack={handleBackToHome} />
      case "vpc":
        return <VPCServicePage onBack={handleBackToHome} />
      case "rds":
        return <RDSServicePage onBack={handleBackToHome} />
      case "lambda":
        return <LambdaServicePage onBack={handleBackToHome} />
      case "cloudwatch":
        return <CloudWatchServicePage onBack={handleBackToHome} />
      case "iam":
        return <IAMServicePage onBack={handleBackToHome} />
      default:
        return renderDashboard()
    }
  }

  const renderDashboard = () => (
    <>
      {/* Console Home Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-normal text-gray-900">Console Home</h1>
            <Badge variant="secondary" className="text-xs">
              beta
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              Reset to default layout
            </Button>
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-1" />
              Add widgets
            </Button>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Recently visited */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-gray-400"></div>
                <CardTitle className="text-base font-medium">Recently visited</CardTitle>
                <Badge variant="secondary" className="text-xs">
                  info
                </Badge>
              </div>
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </CardHeader>
            <CardContent className="space-y-3">
              {recentlyVisited.slice(0, 4).map((service, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                  onClick={() => handleServiceClick(service.id)}
                >
                  <div className={`w-6 h-6 ${service.color} rounded flex items-center justify-center`}>
                    <service.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-blue-600 hover:underline">{service.name}</span>
                </div>
              ))}
              <div className="pt-2 border-t">
                <Button variant="link" className="text-blue-600 text-sm p-0 h-auto">
                  View all services
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Applications */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-gray-400"></div>
                <CardTitle className="text-base font-medium">Applications (3)</CardTitle>
                <Badge variant="secondary" className="text-xs">
                  info
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs">
                  Create application
                </Button>
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                  <div>
                    <div className="text-sm font-medium text-blue-600">web-app-prod</div>
                    <div className="text-xs text-gray-500">Running • 3 resources</div>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                    Healthy
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                  <div>
                    <div className="text-sm font-medium text-blue-600">api-service</div>
                    <div className="text-xs text-gray-500">Running • 5 resources</div>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                    Healthy
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                  <div>
                    <div className="text-sm font-medium text-blue-600">data-pipeline</div>
                    <div className="text-xs text-gray-500">Stopped • 2 resources</div>
                  </div>
                  <Badge variant="outline" className="text-gray-500 border-gray-300 text-xs">
                    Stopped
                  </Badge>
                </div>
              </div>
              <div className="pt-2 border-t mt-4">
                <Button variant="link" className="text-blue-600 text-sm p-0 h-auto">
                  Go to myApplications
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Start */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-gray-400"></div>
                <CardTitle className="text-base font-medium">Quick Start</CardTitle>
              </div>
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Server className="w-8 h-8 text-blue-500 mt-1" />
                <div>
                  <h4 className="font-medium text-blue-600 hover:underline cursor-pointer">Launch a virtual server</h4>
                  <p className="text-xs text-gray-600 mt-1">Get started with EC2 instances for your applications.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Database className="w-8 h-8 text-blue-500 mt-1" />
                <div>
                  <h4 className="font-medium text-blue-600 hover:underline cursor-pointer">Store and retrieve data</h4>
                  <p className="text-xs text-gray-600 mt-1">Use S3 for scalable object storage solutions.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-gray-400"></div>
                <CardTitle className="text-base font-medium">System Health</CardTitle>
                <Badge variant="secondary" className="text-xs">
                  info
                </Badge>
              </div>
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Open issues</span>
                  <span className="text-sm text-gray-500">Past 7 days</span>
                </div>
                <div className="text-2xl font-bold text-green-600">0</div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Scheduled maintenance</span>
                  <span className="text-sm text-gray-500">Upcoming</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">1</div>
                <p className="text-xs text-gray-500 mt-1">Network upgrade - Dec 15, 2024</p>
              </div>
              <div className="pt-2 border-t">
                <Button variant="link" className="text-blue-600 text-sm p-0 h-auto">
                  View system status
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Cost and usage */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-gray-400"></div>
                <CardTitle className="text-base font-medium">Cost and usage</CardTitle>
                <Badge variant="secondary" className="text-xs">
                  info
                </Badge>
              </div>
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">This month</span>
                    <span className="text-sm text-gray-500">Dec 2024</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">$247.83</div>
                  <p className="text-xs text-green-600">↓ 12% from last month</p>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Forecasted</span>
                    <span className="text-sm text-gray-500">End of month</span>
                  </div>
                  <div className="text-lg font-medium text-gray-700">$312.45</div>
                </div>
                <div className="pt-2 border-t">
                  <Button variant="link" className="text-blue-600 text-sm p-0 h-auto">
                    Go to Billing Dashboard
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Overview */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-gray-400"></div>
                <CardTitle className="text-base font-medium">Security Overview</CardTitle>
                <Badge variant="secondary" className="text-xs">
                  info
                </Badge>
              </div>
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Security alerts</span>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  All clear
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active policies</span>
                <span className="text-sm font-medium">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">MFA enabled users</span>
                <span className="text-sm font-medium">8/10</span>
              </div>
              <div className="pt-2 border-t">
                <Button variant="link" className="text-blue-600 text-sm p-0 h-auto">
                  Go to Security Center
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-gray-900 text-white">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Cloud className="w-6 h-6 text-orange-500" />
              <span className="text-lg font-medium">homecloud</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
                  <div className="flex items-center gap-1 text-sm">
                    <div className="w-3 h-3 grid grid-cols-3 gap-px">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="w-1 h-1 bg-white rounded-sm"></div>
                      ))}
                    </div>
                    <span className="ml-1">Services</span>
                    <ChevronDown className="w-3 h-3" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 max-h-96 overflow-y-auto" align="start">
                <DropdownMenuLabel className="text-sm font-medium">All services</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {serviceCategories.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <DropdownMenuLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2 py-1">
                      {category.category}
                    </DropdownMenuLabel>
                    {category.services.map((service, serviceIndex) => (
                      <DropdownMenuItem
                        key={serviceIndex}
                        className="flex items-start gap-3 p-3 cursor-pointer hover:bg-gray-50"
                        onClick={() => handleServiceClick(service.id)}
                      >
                        <service.icon className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900">{service.name}</div>
                          <div className="text-xs text-gray-500 truncate">{service.description}</div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                    {categoryIndex < serviceCategories.length - 1 && <DropdownMenuSeparator />}
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-80 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">[Alt+S]</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
            <HelpCircle className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
            <Settings className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
                  <div className="flex items-center gap-1 text-sm">
                    <span>{accountData.regionName}</span>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Select Region</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>US East (N. Virginia) - us-east-1</DropdownMenuItem>
                <DropdownMenuItem>US West (Oregon) - us-west-2</DropdownMenuItem>
                <DropdownMenuItem>Europe (Ireland) - eu-west-1</DropdownMenuItem>
                <DropdownMenuItem>Asia Pacific (Tokyo) - ap-northeast-1</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
                  <div className="flex items-center gap-1 text-sm">
                    <span>{accountData.accountName}</span>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>Account Information</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="px-2 py-1 text-xs">
                  <div className="font-medium">{accountData.accountName}</div>
                  <div className="text-gray-500">Account ID: {accountData.accountId}</div>
                  <div className="text-gray-500">User: {accountData.userName}</div>
                  <div className="text-gray-500">Organization: {accountData.organizationId}</div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Switch Account</DropdownMenuItem>
                <DropdownMenuItem>Account Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <User className="w-5 h-5 text-gray-300" />
          </div>
        </div>
      </div>

      {renderCurrentView()}
    </div>
  )
}
