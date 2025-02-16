import React, { useState } from "react"
import { Bell, User, Menu, HelpCircle, MessageSquare, X } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const AthleteNavbar: React.FC = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [feedbackText, setFeedbackText] = useState('')

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
    setIsNotificationOpen(false)
    setIsFeedbackOpen(false)
    setIsHelpOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleFeedbackSubmit = () => {
    if (feedbackText.trim()) {
      setFeedbackSubmitted(true)
      setTimeout(() => {
        setFeedbackSubmitted(false)
        setIsFeedbackOpen(false)
        setFeedbackText('')
      }, 2000)
    }
  }

  return (
    <header className="bg-white text-white py-4 px-6 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link 
            href="/athlete-dashboard" 
            className="text-2xl font-bold mr-6 text-indigo-600 font-['Orbitron'] tracking-wider transition-colors duration-300 hover:text-indigo-800"
          >
            ATHLETO
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-gray-600">
            {[
              { name: "BRANDS", href: "/athlete-dashboard" },
              { name: "OPPORTUNITIES", href: "/athlete-opportunities" },
              { name: "APPLIED", href: "/athlete-applied" },
              { name: "NEWS FEED", href: "/athlete-dashboard/newsfeed" }
            ].map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="hover:text-indigo-600 relative group transition-colors duration-300"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Notification Icon */}
          <div className="relative">
            <button
              className="text-gray-900 p-2 rounded-full transition-colors duration-200 relative"
              title="Notifications"
              onClick={() => {
                setIsNotificationOpen(!isNotificationOpen)
                setIsUserMenuOpen(false)
                setIsFeedbackOpen(false)
                setIsHelpOpen(false)
              }}
            >
              <Bell className="h-6 w-6 text-grey-900" />
              <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            {isNotificationOpen && (
              <Card className="absolute right-0 top-full mt-2 w-80 shadow-lg bg-gray-100 border-none">
                <CardHeader>
                  <CardTitle className="text-center text-black p-4 border-b border-gray-400 bg-gray-100">Notifications</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-black bg-gray-100 p-4">
                  No notifications yet
                </CardContent>
              </Card>
            )}
          </div>

          {/* Feedback Icon */}
          <div className="relative">
            <button
              className="text-gray-900 p-2 rounded-full transition-colors duration-200"
              title="Provide Feedback"
              onClick={() => {
                setIsFeedbackOpen(!isFeedbackOpen)
                setIsNotificationOpen(false)
                setIsUserMenuOpen(false)
                setIsHelpOpen(false)
              }}
            >
              <MessageSquare className="h-6 w-6" />
            </button>
            {isFeedbackOpen && (
              <Card className="absolute right-0 top-full mt-2 w-96 shadow-lg p-4   bg-gray-100 border-none">
                <CardHeader className="flex flex-row justify-between items-center text-black">
                  <CardTitle>Provide Feedback</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsFeedbackOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </CardHeader>
                <CardContent>
                  {!feedbackSubmitted ? (
                    <>
                      <Textarea 
                        placeholder="Share your thoughts..."
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        className="mb-4 text-black"
                      />
                      <Button 
                        variant="outline" 
                        className="w-full bg-indigo-600 text-white hover:bg-indigo-800"
                        onClick={handleFeedbackSubmit}
                      >
                        Submit Feedback
                      </Button>
                    </>
                  ) : (
                    <div className="text-green-600 text-center">
                      Your feedback has been submitted
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Help Icon */}
          <div className="relative">
            <button
              className="text-gray-900 p-2 rounded-full transition-colors duration-200"
              title="Help"
              onClick={() => {
                setIsHelpOpen(!isHelpOpen)
                setIsNotificationOpen(false)
                setIsUserMenuOpen(false)
                setIsFeedbackOpen(false)
              }}
            >
              <HelpCircle className="h-6 w-6" />
            </button>
            {isHelpOpen && (
              <Card className="absolute right-0 top-full mt-2 w-80 shadow-lg bg-gray-100 border-none text-black">
                <CardHeader>
                  <CardTitle>Help Center</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Link href="/faq" className="block hover:text-indigo-600">
                      Frequently Asked Questions
                    </Link>
                    <Link href="/support" className="block hover:text-indigo-600">
                      Contact Support
                    </Link>
                    <Link href="/guide" className="block hover:text-indigo-600">
                      User Guide
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              className="text-gray-900 p-2 rounded-full transition-colors duration-200 flex items-center gap-2"
              onClick={toggleUserMenu}
              title="User Menu"
            >
              <User className="h-7 w-7" />
            </button>
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48  rounded-md shadow-lg py-2 z-10 animate-fadeIn bg-gray-100 text-black">
                {[
                  { name: "Profile", href: "/athlete-profile" },
                  { name: "Settings", href: "/athlete-settings" },
                  { name: "Log out", href: "/logout", className: "text-red-500" }
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-2 hover:bg-gray-700 transition-colors duration-200 ${item.className || "text-black"}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-900 p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
            onClick={toggleMobileMenu}
            title="Mobile Menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="mt-4 md:hidden animate-fadeIn bg-white shadow-md">
          {[
            { name: "Brands", href: "/athlete-dashboard" },
            { name: "Opportunities", href: "/athlete-opportunities" },
            { name: "Applied", href: "/athlete-applied" },
            { name: "News Feed", href: "/athlete-dashboard/newsfeed" }
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block py-2 px-4 hover:bg-gray-100 transition-colors duration-200 text-gray-700"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}

export default AthleteNavbar 