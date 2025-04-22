import React from 'react';
import { ChevronRight, CheckCircle, Clock, Calendar, BarChart2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="ml-2 text-xl font-bold text-blue-900">TaskFlow</span>
              </div>
            </div>
            <div className="flex items-center">
              <a href="/login" className="px-3 py-2 text-blue-700 hover:text-blue-900">Log In</a>
              <a href="/signin" className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <h1 className="text-4xl font-extrabold text-blue-900 sm:text-5xl md:text-6xl">
                Streamline Your Business Tasks
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                TaskFlow helps business owners and retail managers organize, track, and optimize their daily operations with ease.
              </p>
              <div className="mt-10 flex space-x-4">
                <a href="/signin" className="flex items-center px-8 py-3 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition duration-150">
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5" />
                </a>
                <a href="/login" className="flex items-center px-8 py-3 border border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-50 transition duration-150">
                  Log In
                </a>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-6">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="bg-blue-700 p-4">
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                    <div className="ml-2 h-3 w-3 bg-yellow-500 rounded-full"></div>
                    <div className="ml-2 h-3 w-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-blue-900">Task Dashboard</h3>
                    <div className="text-blue-600 text-sm font-medium">Today</div>
                  </div>
                  <div className="space-y-4">
                    {[
                      { title: "Review inventory reports", status: "Completed", icon: BarChart2 },
                      { title: "Staff scheduling for next week", status: "In Progress", icon: Calendar },
                      { title: "Vendor payment approvals", status: "Upcoming", icon: Clock }
                    ].map((task, index) => (
                      <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                        <div className="p-2 bg-blue-100 rounded-md">
                          <task.icon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-4 flex-1">
                          <p className="text-sm font-medium text-blue-900">{task.title}</p>
                          <p className="text-xs text-blue-600">{task.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-blue-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Designed for Business Efficiency</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: CheckCircle,
                title: "Task Management",
                description: "Organize and prioritize tasks for your entire team."
              },
              {
                icon: Clock,
                title: "Time Tracking",
                description: "Monitor progress and optimize resource allocation."
              },
              {
                icon: BarChart2,
                title: "Performance Analytics",
                description: "Gain insights to improve business operations."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-blue-700 rounded-lg p-6 text-center">
                <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">{feature.title}</h3>
                <p className="text-blue-100">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Ready to optimize your business workflow?</h2>
          <p className="text-lg text-gray-600 mb-8">Join thousands of business owners who have transformed their operations.</p>
          <div className="flex justify-center space-x-4">
            <a href="/signin" className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition duration-150">
              Get Started
            </a>
            <a href="/login" className="px-8 py-3 border border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-50 transition duration-150">
              Log In
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-blue-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <div className="h-8 w-8 bg-white rounded-md flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                </div>
                <span className="ml-2 text-xl font-bold text-white">TaskFlow</span>
              </div>
              <p className="mt-4 text-sm">Empowering businesses to achieve more.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Product</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-sm hover:text-white">Features</a></li>
                <li><a href="#" className="text-sm hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-sm hover:text-white">Testimonials</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-sm hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-sm hover:text-white">Guides</a></li>
                <li><a href="#" className="text-sm hover:text-white">API Documentation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-sm hover:text-white">About Us</a></li>
                <li><a href="#" className="text-sm hover:text-white">Contact</a></li>
                <li><a href="#" className="text-sm hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-blue-800 pt-8 text-sm text-center">
            &copy; {new Date().getFullYear()} TaskFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}