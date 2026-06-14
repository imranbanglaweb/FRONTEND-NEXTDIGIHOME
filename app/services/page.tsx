'use client';

import Link from "next/link";
import { CogIcon, ShieldCheckIcon, StarIcon, CheckCircleIcon, ArrowLeftIcon, SparklesIcon } from "@heroicons/react/24/outline";

export default function ServicesPage() {
  const services = [
    {
      id: 1,
      title: "Web Development",
      description: "Custom web applications and websites built with modern technologies. Responsive, fast, and user-friendly.",
      features: ["React/Next.js", "Tailwind CSS", "API Integration", "SEO Optimized"],
      icon: "🌐",
      gradient: "from-[#00d4aa] to-[#00b894]",
      price: "Custom"
    },
    {
      id: 2,
      title: "E-commerce Solutions",
      description: "Complete e-commerce platforms with payment integration, inventory management, and analytics.",
      features: ["Shopping Cart", "Payment Gateway", "Inventory System", "Order Management"],
      icon: "🛒",
      gradient: "from-[#8b5cf6] to-[#6d28d9]",
      price: "Custom"
    },
    {
      id: 3,
      title: "Digital Marketing",
      description: "Boost your online presence with our comprehensive digital marketing services.",
      features: ["Social Media Marketing", "SEO", "Content Marketing", "PPC Campaigns"],
      icon: "📱",
      gradient: "from-[#ff6b6b] to-[#ee5a6f]",
      price: "Custom"
    },
    {
      id: 4,
      title: "Design Services",
      description: "Professional UI/UX design and branding that sets your business apart.",
      features: ["UI/UX Design", "Logo Design", "Brand Identity", "Mockups"],
      icon: "🎨",
      gradient: "from-[#ffa726] to-[#ff9800]",
      price: "Custom"
    },
    {
      id: 5,
      title: "Automation Tools",
      description: "Streamline your business with custom automation tools and workflows.",
      features: ["Workflow Automation", "Data Processing", "Integration", "Maintenance"],
      icon: "⚙️",
      gradient: "from-[#26c6da] to-[#00bcd4]",
      price: "Custom"
    },
    {
      id: 6,
      title: "Consulting & Support",
      description: "Expert advice and ongoing support to help your business succeed online.",
      features: ["Strategy Planning", "Technical Support", "Training", "24/7 Assistance"],
      icon: "💡",
      gradient: "from-[#ab47bc] to-[#9c27b0]",
      price: "Custom"
    }
  ];

  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "150+", label: "Happy Clients" },
    { number: "10+", label: "Years Experience" },
    { number: "99%", label: "Client Satisfaction" }
  ];

  return (
    <div className="min-h-screen bg-[#0f0f12]">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,212,170,0.08)_0%,rgba(8,8,8,0)_50%)]" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00d4aa] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-float" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#8b5cf6] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-[#00d4aa] rounded-full mix-blend-screen filter blur-[120px] opacity-15 animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-[#8b5cf6] rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-float" style={{ animationDelay: '6s' }} />
      </div>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00d4aa]/5 via-transparent to-[#8b5cf6]/5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-[#00d4aa] hover:text-[#00d4aa]/80 mb-8 transition">
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Home
          </Link>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2a2a30] bg-[#1a1a1f]/50 mb-6">
              <SparklesIcon className="w-5 h-5 text-[#00d4aa]" />
              <span className="text-sm text-[#737373]">Premium Digital Solutions</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="block text-[#fafafa]">Elevate Your</span>
              <span className="block gradient-text bg-gradient-to-r from-[#00d4aa] via-[#8b5cf6] to-[#ff6b6b] bg-clip-text">Business to New Heights</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#737373] max-w-4xl mx-auto leading-relaxed">
              Comprehensive digital solutions engineered to transform your business. From cutting-edge development to strategic marketing, we deliver excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-[#1a1a1f] to-[#0f0f12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center p-6 bg-[#0f0f12]/50 border border-[#2a2a30] rounded-lg backdrop-blur-sm">
                <div className="text-4xl md:text-5xl font-bold gradient-text bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] bg-clip-text mb-2">
                  {stat.number}
                </div>
                <p className="text-[#737373] font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-24 lg:py-32 bg-[#0f0f12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#fafafa] mb-4">
              Enterprise-Grade Services
            </h2>
            <p className="text-xl text-[#737373] max-w-2xl mx-auto">
              Each service is crafted with precision and backed by our expert team
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="group relative p-5 sm:p-8 bg-[#1a1a1f] border border-[#2a2a30] rounded-2xl hover:border-[#00d4aa]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#00d4aa]/10 overflow-hidden"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-linear-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Top accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`text-5xl`}>{service.icon}</div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${service.gradient} text-[#0f0f12]`}>
                      {service.price}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#fafafa] mb-3 group-hover:translate-x-1 transition-transform duration-300">{service.title}</h3>
                  <p className="text-[#737373] mb-8 leading-relaxed">{service.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-[#737373] group/item">
                        <CheckCircleIcon className={`w-5 h-5 bg-gradient-to-r ${service.gradient} text-transparent bg-clip-text flex-shrink-0`} />
                        <span className="group-hover/item:text-[#fafafa] transition-colors duration-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r ${service.gradient} text-[#0f0f12] font-semibold hover:opacity-90 transition-all duration-300 transform group-hover:scale-105`}>
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-r from-[#00d4aa]/10 via-transparent to-[#8b5cf6]/10 border-y border-[#2a2a30]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#fafafa] mb-16">
            Why Partner With Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#00d4aa] to-[#00b894] flex items-center justify-center mx-auto mb-6">
                <StarIcon className="w-8 h-8 text-[#0f0f12]" />
              </div>
              <h3 className="text-2xl font-bold text-[#fafafa] mb-3">Proven Excellence</h3>
              <p className="text-[#737373]">Years of expertise delivering world-class solutions to industry leaders and innovative startups.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#8b5cf6] to-[#6d28d9] flex items-center justify-center mx-auto mb-6">
                <ShieldCheckIcon className="w-8 h-8 text-[#0f0f12]" />
              </div>
              <h3 className="text-2xl font-bold text-[#fafafa] mb-3">Total Security</h3>
              <p className="text-[#737373]">Enterprise-grade security protocols ensuring your data and business are always protected.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#ff6b6b] to-[#ee5a6f] flex items-center justify-center mx-auto mb-6">
                <CogIcon className="w-8 h-8 text-[#0f0f12]" />
              </div>
              <h3 className="text-2xl font-bold text-[#fafafa] mb-3">24/7 Support</h3>
              <p className="text-[#737373]">Dedicated support team available round the clock to assist you with any needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-[#0f0f12] to-[#1a1a1f] overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2a2a30] bg-[#1a1a1f]/50 mb-8">
            <SparklesIcon className="w-5 h-5 text-[#00d4aa]" />
            <span className="text-sm text-[#737373]">Limited Time Offer</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#fafafa] mb-8 leading-tight">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl md:text-2xl text-[#737373] mb-12 leading-relaxed max-w-3xl mx-auto">
            Get started with our premium services today. Our team of experts is ready to help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#00d4aa] to-[#00b894] text-[#0f0f12] rounded-lg font-bold hover:shadow-lg hover:shadow-[#00d4aa]/50 transition-all duration-300 transform hover:scale-105"
            >
              Schedule Consultation
            </Link>
            <Link
              href="/products"
              className="inline-block px-8 py-4 border border-[#00d4aa] text-[#00d4aa] rounded-lg font-bold hover:bg-[#00d4aa]/10 transition-all duration-300"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-5 right-5 bg-[#00d4aa] text-[#0f0f12] p-3 rounded-full shadow-lg hover:bg-[#00b894] transition"
      >
        ↑
      </button>
    </div>
  );
}
