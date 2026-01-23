# ROBFREW.COM - TECHNICAL SPECIFICATIONS

Next.js implementation guide with code structure, dependencies, and deployment instructions.

---

## TECHNOLOGY STACK

### Core Framework
- **Next.js 14+** (App Router)
- **React 18+**
- **TypeScript** (optional but recommended)
- **Tailwind CSS** for styling

### Additional Libraries
- **next/font** for font optimization
- **next/image** for image optimization
- **Framer Motion** (optional) for animations
- **React Hook Form** for contact form
- **Nodemailer** or **Resend** for email sending

### Development Tools
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety

### Hosting & Deployment
- **Vercel** (primary hosting platform)
- **Git** (GitHub, GitLab, or Bitbucket)
- **Domain**: robfrew.com (existing)

---

## PROJECT STRUCTURE

```
robfrew-website/
â”œâ”€â”€ public/
â”‚   â”œâ”€â”€ images/
â”‚   â”‚   â”œâ”€â”€ profile/
â”‚   â”‚   â”œâ”€â”€ logos/
â”‚   â”‚   â”œâ”€â”€ projects/
â”‚   â”‚   â””â”€â”€ og/
â”‚   â”œâ”€â”€ resumes/
â”‚   â”‚   â””â”€â”€ *.pdf
â”‚   â””â”€â”€ favicon/
â”‚       â””â”€â”€ *.ico, *.png
â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ app/
â”‚   â”‚   â”œâ”€â”€ layout.tsx
â”‚   â”‚   â”œâ”€â”€ page.tsx (Home)
â”‚   â”‚   â”œâ”€â”€ about/
â”‚   â”‚   â”‚   â””â”€â”€ page.tsx
â”‚   â”‚   â”œâ”€â”€ work/
â”‚   â”‚   â”‚   â”œâ”€â”€ page.tsx
â”‚   â”‚   â”‚   â””â”€â”€ [slug]/
â”‚   â”‚   â”‚       â””â”€â”€ page.tsx
â”‚   â”‚   â”œâ”€â”€ skills/
â”‚   â”‚   â”‚   â””â”€â”€ page.tsx
â”‚   â”‚   â”œâ”€â”€ resume/
â”‚   â”‚   â”‚   â””â”€â”€ page.tsx
â”‚   â”‚   â”œâ”€â”€ contact/
â”‚   â”‚   â”‚   â””â”€â”€ page.tsx
â”‚   â”‚   â””â”€â”€ api/
â”‚   â”‚       â””â”€â”€ contact/
â”‚   â”‚           â””â”€â”€ route.ts
â”‚   â”œâ”€â”€ components/
â”‚   â”‚   â”œâ”€â”€ layout/
â”‚   â”‚   â”‚   â”œâ”€â”€ Header.tsx
â”‚   â”‚   â”‚   â”œâ”€â”€ Footer.tsx
â”‚   â”‚   â”‚   â””â”€â”€ Container.tsx
â”‚   â”‚   â”œâ”€â”€ home/
â”‚   â”‚   â”‚   â”œâ”€â”€ Hero.tsx
â”‚   â”‚   â”‚   â”œâ”€â”€ StatCounter.tsx
â”‚   â”‚   â”‚   â”œâ”€â”€ FeaturedProjects.tsx
â”‚   â”‚   â”‚   â””â”€â”€ SkillsGrid.tsx
â”‚   â”‚   â”œâ”€â”€ work/
â”‚   â”‚   â”‚   â”œâ”€â”€ ProjectCard.tsx
â”‚   â”‚   â”‚   â”œâ”€â”€ ProjectFilter.tsx
â”‚   â”‚   â”‚   â””â”€â”€ ProjectDetail.tsx
â”‚   â”‚   â”œâ”€â”€ about/
â”‚   â”‚   â”‚   â””â”€â”€ Timeline.tsx
â”‚   â”‚   â”œâ”€â”€ skills/
â”‚   â”‚   â”‚   â””â”€â”€ SkillBar.tsx
â”‚   â”‚   â”œâ”€â”€ contact/
â”‚   â”‚   â”‚   â””â”€â”€ ContactForm.tsx
â”‚   â”‚   â””â”€â”€ ui/
â”‚   â”‚       â”œâ”€â”€ Button.tsx
â”‚   â”‚       â”œâ”€â”€ Card.tsx
â”‚   â”‚       â””â”€â”€ Input.tsx
â”‚   â”œâ”€â”€ data/
â”‚   â”‚   â”œâ”€â”€ projects.ts
â”‚   â”‚   â”œâ”€â”€ experience.ts
â”‚   â”‚   â””â”€â”€ skills.ts
â”‚   â”œâ”€â”€ lib/
â”‚   â”‚   â””â”€â”€ utils.ts
â”‚   â””â”€â”€ styles/
â”‚       â””â”€â”€ globals.css
â”œâ”€â”€ .env.local
â”œâ”€â”€ .eslintrc.json
â”œâ”€â”€ .gitignore
â”œâ”€â”€ next.config.js
â”œâ”€â”€ package.json
â”œâ”€â”€ postcss.config.js
â”œâ”€â”€ tailwind.config.ts
â”œâ”€â”€ tsconfig.json
â””â”€â”€ README.md
```

---

## INITIAL SETUP

### 1. Create Next.js Project

```bash
npx create-next-app@latest robfrew-website
```

**Configuration options:**
- TypeScript? â†’ Yes
- ESLint? â†’ Yes
- Tailwind CSS? â†’ Yes
- src/ directory? â†’ Yes
- App Router? â†’ Yes
- Import alias? â†’ Yes (@/*)

### 2. Install Dependencies

```bash
cd robfrew-website

# Core dependencies
npm install react-hook-form
npm install framer-motion
npm install @react-email/components

# Development dependencies
npm install -D @types/node @types/react @types/react-dom
```

### 3. Environment Variables

Create `.env.local`:

```bash
# Email configuration (for contact form)
RESEND_API_KEY=your_resend_api_key
EMAIL_TO=rob@robfrew.com
EMAIL_FROM=website@robfrew.com

# Site URL
NEXT_PUBLIC_SITE_URL=https://robfrew.com
```

---

## CONFIGURATION FILES

### tailwind.config.ts

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#FFFFFF',
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

### next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  // Enable static export if needed
  // output: 'export',
}

module.exports = nextConfig
```

---

## KEY COMPONENTS

### Layout Component (src/app/layout.tsx)

```typescript
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: 'Rob Frew | Senior Technical Program Manager',
  description: 'Senior TPM with 15+ years building platforms at scale. Managed Amazon\'s 9PB-daily security data lake, delivered $50M+ impact.',
  openGraph: {
    title: 'Rob Frew | Senior Technical Program Manager',
    description: 'Senior TPM with 15+ years building platforms at scale.',
    url: 'https://robfrew.com',
    siteName: 'Rob Frew',
    images: [
      {
        url: '/images/og/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-white text-black antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

### Header Component (src/components/layout/Header.tsx)

```typescript
'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold hover:text-gray-700 transition-colors">
            ROB FREW
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-gray-600 transition-colors">
              Home
            </Link>
            <Link href="/work" className="hover:text-gray-600 transition-colors">
              Work
            </Link>
            <Link href="/about" className="hover:text-gray-600 transition-colors">
              About
            </Link>
            <Link href="/skills" className="hover:text-gray-600 transition-colors">
              Skills
            </Link>
            <Link href="/resume" className="hover:text-gray-600 transition-colors">
              Resume
            </Link>
          </nav>

          {/* CTA Button */}
          <Link
            href="/contact"
            className="hidden md:block bg-black text-white px-6 py-2 font-semibold hover:bg-gray-900 transition-colors"
          >
            Contact
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <Link href="/" className="block py-2 hover:text-gray-600">Home</Link>
            <Link href="/work" className="block py-2 hover:text-gray-600">Work</Link>
            <Link href="/about" className="block py-2 hover:text-gray-600">About</Link>
            <Link href="/skills" className="block py-2 hover:text-gray-600">Skills</Link>
            <Link href="/resume" className="block py-2 hover:text-gray-600">Resume</Link>
            <Link href="/contact" className="block py-2 hover:text-gray-600">Contact</Link>
          </nav>
        )}
      </div>
    </header>
  )
}
```

### StatCounter Component (src/components/home/StatCounter.tsx)

```typescript
'use client'

import { useEffect, useRef, useState } from 'react'

interface StatCounterProps {
  end: string
  label: string
  duration?: number
}

export default function StatCounter({ end, label, duration = 2000 }: StatCounterProps) {
  const [count, setCount] = useState('0')
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          animateCount()
          setHasAnimated(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  const animateCount = () => {
    // Extract numeric value and suffix
    const match = end.match(/^([\d.]+)(.*)$/)
    if (!match) {
      setCount(end)
      return
    }

    const numericValue = parseFloat(match[1])
    const suffix = match[2]
    const startTime = Date.now()

    const updateCount = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const current = numericValue * easeOutQuart

      setCount(current.toFixed(1).replace(/\.0$/, '') + suffix)

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      }
    }

    requestAnimationFrame(updateCount)
  }

  return (
    <div ref={ref} className="text-center p-8">
      <div className="text-5xl font-extrabold mb-2">{count}</div>
      <div className="text-gray-600 text-sm font-medium uppercase tracking-wide">
        {label}
      </div>
    </div>
  )
}
```

### Contact Form Component (src/components/contact/ContactForm.tsx)

```typescript
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  name: string
  email: string
  company?: string
  role?: string
  message: string
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          {...register('name', { required: 'Name is required' })}
          className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
          placeholder="Your name"
        />
        {errors.name && (
          <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
          placeholder="your.email@example.com"
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className="block text-sm font-semibold mb-2">
          Company
        </label>
        <input
          type="text"
          id="company"
          {...register('company')}
          className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
          placeholder="Your company"
        />
      </div>

      {/* Role */}
      <div>
        <label htmlFor="role" className="block text-sm font-semibold mb-2">
          Opportunity/Role
        </label>
        <input
          type="text"
          id="role"
          {...register('role')}
          className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
          placeholder="Role you're hiring for"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold mb-2">
          Message *
        </label>
        <textarea
          id="message"
          rows={6}
          {...register('message', { required: 'Message is required' })}
          className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors resize-none"
          placeholder="Your message"
        />
        {errors.message && (
          <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-black text-white px-6 py-3 font-semibold hover:bg-gray-900 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <p className="text-green-600 text-center">
          Thanks for reaching out! I'll get back to you within 24 hours.
        </p>
      )}
      {submitStatus === 'error' && (
        <p className="text-red-600 text-center">
          Oops! Something went wrong. Please try emailing me directly at rob@robfrew.com
        </p>
      )}
    </form>
  )
}
```

### Contact API Route (src/app/api/contact/route.ts)

```typescript
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, email, company, role, message } = data

    // TODO: Implement email sending
    // Option 1: Use Resend (recommended)
    // Option 2: Use Nodemailer
    // Option 3: Store in database and send later

    // Example with Resend:
    /*
    import { Resend } from 'resend'
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.EMAIL_TO!,
      subject: `New contact from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Role:</strong> ${role || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })
    */

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
```

---

## DATA STRUCTURES

### Projects Data (src/data/projects.ts)

```typescript
export interface Project {
  id: string
  slug: string
  title: string
  company: 'Amazon' | 'NuORDER' | 'Kibo' | 'John Deere' | 'PFG'
  category: 'Platform Engineering' | 'Cost Optimization' | 'Product Management' | 'Process Improvement'
  shortDescription: string
  longDescription: string
  challenge: string
  approach: string
  impact: string[]
  technologies: string[]
  metrics: {
    label: string
    value: string
  }[]
  images?: string[]
  featured: boolean
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'basin-amazon-security-data-lake',
    title: 'Basin: Amazon Security\'s Data Lake',
    company: 'Amazon',
    category: 'Platform Engineering',
    shortDescription: 'Platform processing 9PB daily from 350,000+ sources supporting ML workloads and security analytics.',
    longDescription: '...',
    challenge: '...',
    approach: '...',
    impact: ['$24.9M annual savings', '965% YoY growth managed', '99.9% SLA maintained'],
    technologies: ['AWS', 'S3', 'Lambda', 'Data Pipelines', 'Microservices'],
    metrics: [
      { label: 'Daily Processing', value: '9PB' },
      { label: 'Data Sources', value: '350,000+' },
      { label: 'YoY Growth', value: '965%' },
      { label: 'SLA', value: '99.9%' },
    ],
    featured: true,
  },
  // Add more projects...
]
```

---

## DEPLOYMENT

### Vercel Deployment

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/robfrew-website.git
git push -u origin main
```

2. **Connect to Vercel:**
- Go to vercel.com
- Click "New Project"
- Import your GitHub repository
- Configure: Framework Preset = Next.js
- Add environment variables from .env.local
- Deploy

3. **Configure Custom Domain:**
- In Vercel project settings â†’ Domains
- Add "robfrew.com"
- Follow DNS configuration instructions
- Update DNS records with your domain registrar

### DNS Configuration

Add these records to your domain registrar:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## PERFORMANCE OPTIMIZATION

### Image Optimization
- Use Next.js Image component
- Serve WebP/AVIF formats
- Lazy load images below the fold
- Compress images before upload

### Code Splitting
- Dynamic imports for heavy components
- Route-based code splitting (automatic with App Router)

### Caching
- Static generation for all pages except contact form
- Edge caching via Vercel

### Lighthouse Targets
- Performance: 90+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

---

## TESTING

### Manual Testing Checklist
- [ ] All pages load correctly
- [ ] Navigation works (desktop & mobile)
- [ ] Contact form submits successfully
- [ ] Resume downloads work
- [ ] Images load and are optimized
- [ ] Responsive on mobile, tablet, desktop
- [ ] Accessibility (keyboard navigation, screen readers)
- [ ] Links work (internal and external)
- [ ] SEO meta tags present

### Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

---

## MAINTENANCE

### Regular Updates
- Keep Next.js and dependencies updated
- Monitor Vercel analytics
- Check contact form submissions
- Update resume files as needed
- Add new projects to work section

### Monitoring
- Vercel Analytics (built-in)
- Google Search Console (optional)
- Contact form submissions

---

## SECURITY

### Environment Variables
- Never commit .env.local to Git
- Store sensitive keys in Vercel environment variables
- Use different keys for development/production

### Contact Form
- Rate limiting on API route
- Input validation and sanitization
- CAPTCHA (optional, if spam becomes issue)

---

**END OF TECHNICAL SPECIFICATIONS**
