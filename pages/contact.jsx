"use client"

import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa"
import { useState } from "react"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const contactInfo = {
    email: "contact@example.com",
    phone: "+1 (234) 567-8900",
    social: {
      linkedin: "https://linkedin.com/in/yourprofile",
      github: "https://github.com/yourusername",
      twitter: "https://twitter.com/yourhandle",
    },
    address: "123 Business Street, City, State 12345",
    officeHours: {
      weekdays: "9:00 AM - 6:00 PM",
      saturday: "10:00 AM - 2:00 PM",
      sunday: "Closed",
    },
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log(formData)
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-foreground mb-4">Get in Touch</h1>
        <p className="text-center text-muted-foreground mb-12 text-lg">
          We'd love to hear from you. Please fill out the form below or reach out through any of our channels.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-card rounded-lg shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-card-foreground mb-6">Contact Info</h2>

              {/* Contact Cards */}
              <div className="space-y-4">
                {/* Email Card */}
                <div className="flex items-center p-3 bg-muted rounded-lg">
                  <div className="bg-primary p-2 rounded-full">
                    <FaEnvelope className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-card-foreground">Email</h3>
                    <a href={`mailto:${contactInfo.email}`} className="text-primary hover:opacity-80 text-sm">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="flex items-center p-3 bg-muted rounded-lg">
                  <div className="bg-primary p-2 rounded-full">
                    <FaPhone className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-card-foreground">Phone</h3>
                    <a href={`tel:${contactInfo.phone}`} className="text-primary hover:opacity-80 text-sm">
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                {/* Address Card */}
                <div className="flex items-center p-3 bg-muted rounded-lg">
                  <div className="bg-primary p-2 rounded-full">
                    <FaMapMarkerAlt className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-card-foreground">Address</h3>
                    <p className="text-muted-foreground text-sm">{contactInfo.address}</p>
                  </div>
                </div>

                {/* Office Hours Card */}
                <div className="flex items-center p-3 bg-muted rounded-lg">
                  <div className="bg-primary p-2 rounded-full">
                    <FaClock className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-card-foreground">Office Hours</h3>
                    <p className="text-muted-foreground text-sm">
                      Mon-Fri: {contactInfo.officeHours.weekdays}
                      <br />
                      Sat: {contactInfo.officeHours.saturday}
                      <br />
                      Sun: {contactInfo.officeHours.sunday}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media Section */}
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-card-foreground mb-4">Connect With Us</h2>
                <div className="flex space-x-4">
                  <a
                    href={contactInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-primary text-primary-foreground rounded-full hover:opacity-80 transition-colors"
                  >
                    <FaLinkedin className="w-6 h-6" />
                  </a>
                  <a
                    href={contactInfo.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-card-foreground text-card rounded-full hover:opacity-80 transition-colors"
                  >
                    <FaGithub className="w-6 h-6" />
                  </a>
                  <a
                    href={contactInfo.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-primary text-primary-foreground rounded-full hover:opacity-80 transition-colors"
                  >
                    <FaTwitter className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-card rounded-lg shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-card-foreground mb-4">Location</h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1234.5678!2d-123.4567!3d12.3456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDIwJzQ0LjIiTiAxMjPCsDI3JzI0LjEiVw!5e0!3m2!1sen!2sus!4v1234567890"
                  className="w-full h-64 rounded-lg"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="bg-card rounded-lg shadow-xl p-8">
              <h2 className="text-2xl font-semibold text-card-foreground mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-card-foreground">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1 block w-full rounded-md border-input bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-card-foreground">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1 block w-full rounded-md border-input bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-card-foreground">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="mt-1 block w-full rounded-md border-input bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-card-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-1 block w-full rounded-md border-input bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"
                    required
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-md hover:opacity-80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact

