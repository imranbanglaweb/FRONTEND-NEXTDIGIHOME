# 🚀 SEO Code Snippets - Ready to Use

## Copy & Paste Solutions for Each Page Type

---

## 1. ABOUT PAGE
**File: `/app/about/page.tsx`**

```typescript
import type { Metadata } from "next";
import { generatePageMetadata, StructuredData, generateOrganizationSchema } from "@/app/utils/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "About Next Digi Home | Premium Digital Products Marketplace",
  description: "Discover the story behind Next Digi Home. We're committed to providing premium digital products and templates to help entrepreneurs and businesses succeed.",
  keywords: [
    "about us",
    "digital products company",
    "premium templates",
    "business solutions",
    "digital marketplace"
  ],
  path: "/about",
});

export default function AboutPage() {
  const organizationSchema = generateOrganizationSchema();

  return (
    <main>
      <h1>About Next Digi Home</h1>
      
      <section>
        <h2>Our Mission</h2>
        <p>
          We're dedicated to providing premium, high-quality digital products that empower 
          entrepreneurs and businesses to succeed.
        </p>
      </section>

      <section>
        <h2>Why Choose Us?</h2>
        <ul>
          <li>10,000+ premium products curated by experts</li>
          <li>Instant download after purchase</li>
          <li>Lifetime customer support</li>
          <li>100% satisfaction guarantee</li>
          <li>Regular updates and new products</li>
        </ul>
      </section>

      <section>
        <h2>Our Values</h2>
        <ul>
          <li><strong>Quality:</strong> Every product meets our high standards</li>
          <li><strong>Innovation:</strong> We stay ahead of industry trends</li>
          <li><strong>Customer Focus:</strong> Your success is our success</li>
          <li><strong>Transparency:</strong> Clear pricing with no hidden fees</li>
        </ul>
      </section>

      <StructuredData data={organizationSchema} />
    </main>
  );
}
```

---

## 2. CONTACT PAGE
**File: `/app/contact/page.tsx`**

```typescript
import type { Metadata } from "next";
import { generatePageMetadata, StructuredData } from "@/app/utils/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact Us | Next Digi Home Support",
  description: "Get in touch with our support team. We're here to help with your questions about our premium digital products.",
  keywords: ["contact", "support", "customer service", "help", "inquiries"],
  path: "/contact",
});

// Contact/Organization Schema
function generateContactSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPoint",
    "telephone": "+8801918329829",
    "contactType": "Customer Support",
    "email": "info@nextdigihome.com",
    "areaServed": "Worldwide",
    "availableLanguage": ["en"]
  };
}

export default function ContactPage() {
  return (
    <main>
      <h1>Contact Us</h1>
      <p>Have questions? We'd love to hear from you. Get in touch with our support team.</p>

      <section>
        <h2>Get In Touch</h2>
        <div>
          <h3>Email</h3>
          <a href="mailto:info@nextdigihome.com">info@nextdigihome.com</a>
        </div>
        
        <div>
          <h3>Phone</h3>
          <a href="tel:+8801918329829">+880 1918 329829</a>
        </div>

        <div>
          <h3>Hours</h3>
          <p>Monday - Friday: 9:00 AM - 6:00 PM (BD Time)</p>
          <p>Saturday - Sunday: 10:00 AM - 4:00 PM (BD Time)</p>
        </div>
      </section>

      <section>
        <h2>Contact Form</h2>
        {/* Add your contact form here */}
        <form>
          <div>
            <label htmlFor="name">Name *</label>
            <input id="name" name="name" type="text" required />
          </div>
          
          <div>
            <label htmlFor="email">Email *</label>
            <input id="email" name="email" type="email" required />
          </div>
          
          <div>
            <label htmlFor="subject">Subject *</label>
            <input id="subject" name="subject" type="text" required />
          </div>
          
          <div>
            <label htmlFor="message">Message *</label>
            <textarea id="message" name="message" rows={5} required></textarea>
          </div>
          
          <button type="submit">Send Message</button>
        </form>
      </section>

      <StructuredData data={generateContactSchema()} />
    </main>
  );
}
```

---

## 3. SERVICES PAGE
**File: `/app/services/page.tsx`**

```typescript
import type { Metadata } from "next";
import { generatePageMetadata, StructuredData } from "@/app/utils/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Our Services | Premium Digital Products & Solutions",
  description: "Explore our range of services including custom templates, consulting, and business solutions for digital product creation.",
  keywords: [
    "services",
    "digital products",
    "custom templates",
    "consulting",
    "business solutions"
  ],
  path: "/services",
});

// Service Schema
function generateServicesSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Next Digi Home",
    "service": [
      {
        "@type": "Service",
        "name": "Premium Templates",
        "description": "High-quality, professionally designed templates for various industries"
      },
      {
        "@type": "Service",
        "name": "UI Kit Library",
        "description": "Comprehensive UI component kits for designers and developers"
      },
      {
        "@type": "Service",
        "name": "Business Tools",
        "description": "Essential tools and resources for business growth"
      },
      {
        "@type": "Service",
        "name": "Graphic Assets",
        "description": "Professional graphic design resources and assets"
      }
    ]
  };
}

export default function ServicesPage() {
  const services = [
    {
      title: "Premium Templates",
      description: "High-quality templates for web, mobile, and print",
      features: ["Fully customizable", "Professional design", "Instant download"]
    },
    {
      title: "UI Kit Library",
      description: "Component libraries for designers and developers",
      features: ["Modern components", "Design system included", "Developer-friendly"]
    },
    {
      title: "Business Tools",
      description: "Essential tools to streamline your business",
      features: ["Easy to use", "Regular updates", "24/7 support"]
    },
    {
      title: "Graphic Assets",
      description: "Professional graphics and design resources",
      features: ["High resolution", "Commercial license", "Royalty-free"]
    }
  ];

  return (
    <main>
      <h1>Our Services</h1>
      <p>Comprehensive solutions for your digital product needs</p>

      <section>
        <h2>What We Offer</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <article key={index}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul>
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>Why Choose Our Services?</h2>
        <ul>
          <li>Industry-leading quality and expertise</li>
          <li>Affordable pricing with transparent costs</li>
          <li>Dedicated customer support team</li>
          <li>Continuous updates and improvements</li>
          <li>Money-back satisfaction guarantee</li>
        </ul>
      </section>

      <StructuredData data={generateServicesSchema()} />
    </main>
  );
}
```

---

## 4. PRIVACY POLICY PAGE
**File: `/app/privacy/page.tsx`**

```typescript
import type { Metadata } from "next";
import { generatePageMetadata } from "@/app/utils/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Privacy Policy | Next Digi Home",
  description: "Read our privacy policy to understand how we collect, use, and protect your personal information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main>
      <h1>Privacy Policy</h1>
      <p><strong>Last Updated:</strong> June 2, 2026</p>

      <section>
        <h2>1. Introduction</h2>
        <p>
          At Next Digi Home ("we" or "our"), we are committed to protecting your privacy. 
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <p>We may collect information about you in a variety of ways:</p>
        <ul>
          <li><strong>Personal Data:</strong> Name, email address, phone number, billing address</li>
          <li><strong>Payment Information:</strong> Credit card details (processed securely)</li>
          <li><strong>Usage Data:</strong> Pages visited, time spent, browser type, IP address</li>
          <li><strong>Cookies:</strong> Via cookies and similar tracking technologies</li>
        </ul>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>To process and fulfill your orders</li>
          <li>To send transactional emails and notifications</li>
          <li>To improve our website and services</li>
          <li>To comply with legal obligations</li>
          <li>To prevent fraud and ensure security</li>
        </ul>
      </section>

      <section>
        <h2>4. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your 
          personal data against unauthorized access, alteration, disclosure, or destruction.
        </p>
      </section>

      <section>
        <h2>5. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your data</li>
          <li>Opt-out of marketing communications</li>
          <li>Data portability</li>
        </ul>
      </section>

      <section>
        <h2>6. Contact Us</h2>
        <p>
          For privacy-related questions, please contact us at{" "}
          <a href="mailto:privacy@nextdigihome.com">privacy@nextdigihome.com</a>
        </p>
      </section>
    </main>
  );
}
```

---

## 5. TERMS & CONDITIONS PAGE
**File: `/app/terms/page.tsx`**

```typescript
import type { Metadata } from "next";
import { generatePageMetadata } from "@/app/utils/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Terms & Conditions | Next Digi Home",
  description: "Review our terms and conditions for using Next Digi Home's services and digital products.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main>
      <h1>Terms & Conditions</h1>
      <p><strong>Last Updated:</strong> June 2, 2026</p>

      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using this website, you accept and agree to be bound by the terms 
          and provision of this agreement.
        </p>
      </section>

      <section>
        <h2>2. Use License</h2>
        <p>
          Permission is granted to temporarily download one copy of the materials (including 
          information and software) from Next Digi Home for personal, non-commercial transitory 
          viewing only.
        </p>
      </section>

      <section>
        <h2>3. Disclaimer</h2>
        <p>
          The materials on Next Digi Home are provided "as is". We make no warranties, expressed 
          or implied, and hereby disclaim and negate all other warranties including, without 
          limitation, implied warranties or conditions of merchantability, fitness for a 
          particular purpose, or non-infringement of intellectual property.
        </p>
      </section>

      <section>
        <h2>4. Limitations</h2>
        <p>
          In no event shall Next Digi Home or its suppliers be liable for any damages 
          (including, without limitation, damages for loss of data or profit, or due to 
          business interruption) arising out of the use or inability to use this website.
        </p>
      </section>

      <section>
        <h2>5. Contact Information</h2>
        <p>
          If you have any questions about these Terms and Conditions, please contact us at{" "}
          <a href="mailto:legal@nextdigihome.com">legal@nextdigihome.com</a>
        </p>
      </section>
    </main>
  );
}
```

---

## 6. HOMEPAGE ENHANCEMENT
**Update: `/app/page.tsx` - Add Schema**

```typescript
import { StructuredData } from "@/app/utils/seo";

// Add this in your page component
function generateHomepageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://nextdigihome.com",
    "name": "Next Digi Home | Premium Digital Products",
    "description": "Discover 10,000+ premium digital products including templates, UI kits, and business tools.",
    "url": "https://nextdigihome.com",
    "image": "https://nextdigihome.com/og-image.svg",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://nextdigihome.com/products?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export default function Home() {
  return (
    <main>
      {/* Your homepage content */}
      <StructuredData data={generateHomepageSchema()} />
    </main>
  );
}
```

---

## 7. SIGNIN/SIGNUP PAGES (No Indexing)
**File: `/app/signin/page.tsx`**

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Next Digi Home",
  robots: {
    index: false, // Prevent indexing
    follow: false,
  },
};

// Your signin page component
```

**File: `/app/signup/page.tsx`**

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Next Digi Home",
  robots: {
    index: false, // Prevent indexing
    follow: false,
  },
};

// Your signup page component
```

---

## 8. 404 ERROR PAGE
**File: `/app/404.tsx` (if not exists)**

```typescript
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | Next Digi Home",
  robots: {
    index: false,
  },
};

export default function NotFound() {
  return (
    <main style={{ textAlign: "center", padding: "50px 20px" }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <Link href="/">Go Back Home</Link>
    </main>
  );
}
```

---

## ✅ How to Use These Snippets

1. Copy the entire code block for your page
2. Replace the file contents with the snippet
3. Update the content/descriptions as needed
4. Add your actual component logic
5. Test with Schema Validator
6. Deploy and monitor in Google Search Console

---

## 🔍 Validation Tools

After implementing each page:
1. **Schema Validator**: https://validator.schema.org
2. **OpenGraph**: https://www.opengraph.xyz
3. **Mobile Test**: https://search.google.com/test/mobile-friendly

---

Good luck! 🚀
