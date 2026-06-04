import React from 'react'
import Navbar from '../shared/Navbar'
import {  Briefcase, FileText, TrendingUp, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'

const Dashboard = () => {
  const stats = [
    {
      title: "Total Jobs",
      value: "24",
      change: "+3 this week",
      icon: Briefcase,
      color: "bg-indigo-50 text-indigo-600"
    },
    {
      title: "Total User",
      value: "1,240",
      change: "+120 this month",
      icon: Users,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Applications",
      value: "385",
      change: "+56 this week",
      icon: FileText,
      color: "bg-yellow-50 text-yellow-600"
    },
    {
      title: "Hired",
      value: "18",
      change: "+4 this month",
      icon: TrendingUp,
      color: "bg-purple-50 text-purple-600",
    },
  ]


  const recentApplications = [
    {
      name: "Rahul Sharma",
      job: "Frontend Developer",
      company: "TechCorp",
      date: "24 May 2026",
      status: "pending",
    },
    {
      name: "Priya Verma",
      job: "UI/UX Designer",
      company: "DesignHub",
      date: "23 May 2026",
      status: "accepted",
    },
    {
      name: "Amit Singh",
      job: "Backend Developer",
      company: "Infosys",
      date: "22 May 2026",
      status: "rejected",
    },
    {
      name: "Sneha Gupta",
      job: "Data Analyst",
      company: "Analytics Co",
      date: "21 May 2026",
      status: "pending",
    },
    {
      name: "Rohan Mehta",
      job: "DevOps Engineer",
      company: "CloudBase",
      date: "20 May 2026",
      status: "accepted",
    },
  ];

  const statusConfig = {
    pending: { label: "Pending", className: "bg-yellow-50 text-yellow-600 border-yellow-200" },
    accepted: { label: "Accepted", className: "bg-green-50 text-green-600 border-green-200" },
    rejected: { label: "Rejected", className: "bg-red-50 text-red-500 border-red-200" },
  };


  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />
      <div className='p-6'>
        <div className='max-w-7xl mx-auto'>
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-gray-900'>Dashboard</h1>
            <p className='text-sm text-gray-800 mt-1'>Welcome back, Admin</p>
          </div>

          {/* {state} */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
            {stats.map((stat, index) => (
              <Card key={index} className="border border-gray-100 shadow-sm hover:shadow-md transition">
                <CardContent className="p-5">
                  <div className='flex items-center justify-between mb-3'>
                    <p className='text-sm font-medium text-gray-900'>{stat.title}</p>
                    <div className={`p-2 rounded-xl ${stat.color}`}>
                      <stat.icon size={18} />
                    </div>
                  </div>

                  <p className='text-2xl font-bold text-gray-600'>{stat.value}</p>
                  <p className='text-xs text-gray-600 mt-1'>{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border border-gray-100 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold text-gray-800">
                Recent Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='overflow-x-auto'>
                <table className='w-full text-sm'>
                  <thead>
                    <tr className='border-b border-t-gray-200'>
                      <th className='text-left py-3 px-2 text-xs font-semibold text-gray-600'>Applicant</th>
                      <th className='text-left py-3 px-2 text-xs font-semibold text-gray-600'>Job</th>
                      <th className='text-left py-3 px-2 text-xs font-semibold text-gray-600'>Company</th>
                      <th className='text-left py-3 px-2 text-xs font-semibold text-gray-600'>Date</th>
                      <th className='text-left py-3 px-2 text-xs font-semibold text-gray-600'>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentApplications.map((app, index) => (
                      <tr key={index} className='border-b border-gray-50 hover:bg-gray-50 transition'>
                        <td className='py-3 px-2 font-medium text-gray-800'>{app.name}</td>
                        <td className='py-3 px-2 font-gray-500'>{app.job}</td>
                        <td className='py-3 px-2 font-gray-500'>{app.company}</td>
                        <td className='py-3 px-2 font-gray-400'>{app.date}</td>
                        <td className='py-3 px-2'>
                          <Badge variant="outline"
                            className={`text-xs capitalize ${statusConfig[app.status].className}`}
                          >
                            {statusConfig[app.status].label}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}

export default Dashboard;