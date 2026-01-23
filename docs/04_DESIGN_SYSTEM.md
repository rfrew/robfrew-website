# ROBFREW.COM - DESIGN SYSTEM

Complete visual design specifications for implementation in Next.js with Tailwind CSS.

---

## DESIGN PHILOSOPHY

**Core Principles:**
- Clean and minimal
- Bold typography and hierarchy
- Strategic use of white space
- Black & white color palette
- Responsive and accessible
- Fast and performant

**Target Aesthetic:**
Modern, professional, confidentâ€”showcasing technical depth without overwhelming complexity.

---

## COLOR PALETTE

### Primary Colors

```css
/* Black */
--color-black: #000000;

/* White */
--color-white: #FFFFFF;
```

### Gray Scale (for hierarchy and subtle differentiation)

```css
/* Backgrounds */
--color-gray-50: #FAFAFA;
--color-gray-100: #F5F5F5;
--color-gray-200: #E5E5E5;

/* Borders */
--color-gray-300: #D4D4D4;
--color-gray-400: #A3A3A3;

/* Text */
--color-gray-500: #737373;
--color-gray-600: #525252;
--color-gray-700: #404040;
--color-gray-800: #262626;
--color-gray-900: #171717;
```

### Tailwind CSS Classes

```
bg-black          #000000
bg-white          #FFFFFF
bg-gray-50        #FAFAFA
bg-gray-100       #F5F5F5
bg-gray-200       #E5E5E5

text-black        #000000
text-white        #FFFFFF
text-gray-600     #525252
text-gray-700     #404040
text-gray-900     #171717

border-gray-200   #E5E5E5
border-gray-300   #D4D4D4
```

### Usage Guidelines

**Black (#000000):**
- Primary text on white backgrounds
- Section headers
- Navigation text
- Footer background

**White (#FFFFFF):**
- Page backgrounds (primary)
- Text on black backgrounds
- Card backgrounds

**Gray-50/100 (#FAFAFA / #F5F5F5):**
- Alternate section backgrounds
- Card hover states
- Input field backgrounds

**Gray-600/700 (#525252 / #404040):**
- Secondary text
- Captions
- Meta information

**Gray-200/300 (#E5E5E5 / #D4D4D4):**
- Borders
- Dividers
- Subtle separators

---

## TYPOGRAPHY

### Font Family

**Primary Font:** Inter (Google Fonts)
**Fallback:** -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif

**Google Fonts Import:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

**Tailwind Config:**
```javascript
fontFamily: {
  sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
}
```

### Type Scale

**Display (Hero Headlines):**
- Desktop: 64px (4rem) / Line Height: 1.1 / Weight: 800 (Extra Bold)
- Tablet: 56px (3.5rem) / Line Height: 1.1 / Weight: 800
- Mobile: 40px (2.5rem) / Line Height: 1.1 / Weight: 800
- Tailwind: `text-6xl md:text-7xl lg:text-8xl font-extrabold`

**H1 (Page Titles):**
- Desktop: 48px (3rem) / Line Height: 1.2 / Weight: 700 (Bold)
- Tablet: 40px (2.5rem) / Line Height: 1.2 / Weight: 700
- Mobile: 32px (2rem) / Line Height: 1.2 / Weight: 700
- Tailwind: `text-4xl md:text-5xl lg:text-6xl font-bold`

**H2 (Section Headers):**
- Desktop: 36px (2.25rem) / Line Height: 1.3 / Weight: 700
- Tablet: 32px (2rem) / Line Height: 1.3 / Weight: 700
- Mobile: 28px (1.75rem) / Line Height: 1.3 / Weight: 700
- Tailwind: `text-3xl md:text-4xl lg:text-5xl font-bold`

**H3 (Subsection Headers):**
- Desktop: 24px (1.5rem) / Line Height: 1.4 / Weight: 600 (Semibold)
- Tablet: 22px (1.375rem) / Line Height: 1.4 / Weight: 600
- Mobile: 20px (1.25rem) / Line Height: 1.4 / Weight: 600
- Tailwind: `text-xl md:text-2xl lg:text-3xl font-semibold`

**H4 (Card Titles):**
- All sizes: 20px (1.25rem) / Line Height: 1.4 / Weight: 600
- Tailwind: `text-xl font-semibold`

**Body Large:**
- All sizes: 18px (1.125rem) / Line Height: 1.6 / Weight: 400 (Regular)
- Tailwind: `text-lg leading-relaxed`

**Body Regular:**
- All sizes: 16px (1rem) / Line Height: 1.6 / Weight: 400
- Tailwind: `text-base leading-relaxed`

**Body Small:**
- All sizes: 14px (0.875rem) / Line Height: 1.5 / Weight: 400
- Tailwind: `text-sm`

**Caption:**
- All sizes: 12px (0.75rem) / Line Height: 1.4 / Weight: 500 (Medium)
- Tailwind: `text-xs font-medium`

### Typography Examples

```html
<!-- Display / Hero -->
<h1 class="text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight">
  I turn complex technical challenges into executable programs
</h1>

<!-- Page Title -->
<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold">
  About Me
</h1>

<!-- Section Header -->
<h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
  Featured Projects
</h2>

<!-- Subsection Header -->
<h3 class="text-xl md:text-2xl lg:text-3xl font-semibold mb-4">
  My Approach
</h3>

<!-- Body Text -->
<p class="text-base leading-relaxed text-gray-700">
  I'm a problem solver passionate about unblocking technical challenges.
</p>

<!-- Caption / Meta -->
<span class="text-xs font-medium text-gray-600 uppercase tracking-wide">
  June 2022 â€“ Present
</span>
```

---

## SPACING SYSTEM

### Base Unit: 8px (0.5rem)

**Tailwind Spacing Scale:**
```
0   = 0px
1   = 4px (0.25rem)
2   = 8px (0.5rem)
3   = 12px (0.75rem)
4   = 16px (1rem)
6   = 24px (1.5rem)
8   = 32px (2rem)
12  = 48px (3rem)
16  = 64px (4rem)
24  = 96px (6rem)
32  = 128px (8rem)
```

### Component Spacing

**Section Padding (Vertical):**
- Desktop: 96px (py-24)
- Tablet: 64px (py-16)
- Mobile: 48px (py-12)

**Section Padding (Horizontal):**
- All sizes: Container with padding
- `container mx-auto px-4 md:px-6 lg:px-8`

**Element Margins:**
- Between sections: 64px (mb-16) on desktop, 48px (mb-12) on mobile
- Between components: 32px (mb-8)
- Between related elements: 16px (mb-4)
- Between text blocks: 24px (mb-6)

**Card Padding:**
- Desktop: 32px (p-8)
- Mobile: 24px (p-6)

**Button Padding:**
- Vertical: 12px (py-3)
- Horizontal: 24px (px-6)

---

## LAYOUT & GRID

### Container

**Max Width:** 1280px (max-w-7xl)
**Padding:** 16px mobile, 24px tablet, 32px desktop

```html
<div class="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
  <!-- Content -->
</div>
```

### Grid System

**12-Column Grid:**
```html
<!-- 3 equal columns on desktop, 1 on mobile -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>

<!-- 4 equal columns -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  <!-- Cards -->
</div>

<!-- 2 columns with different widths -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
  <div class="lg:col-span-4">Sidebar</div>
  <div class="lg:col-span-8">Main Content</div>
</div>
```

### Flexbox Patterns

**Horizontal Center:**
```html
<div class="flex items-center justify-center">
```

**Space Between:**
```html
<div class="flex items-center justify-between">
```

**Vertical Stack with Gap:**
```html
<div class="flex flex-col gap-4">
```

---

## COMPONENTS

### Buttons

**Primary Button:**
```html
<button class="bg-black text-white px-6 py-3 rounded-none font-semibold hover:bg-gray-900 transition-colors duration-200">
  Button Text
</button>
```

**Secondary Button (Outline):**
```html
<button class="border-2 border-black text-black px-6 py-3 rounded-none font-semibold hover:bg-black hover:text-white transition-colors duration-200">
  Button Text
</button>
```

**Large Button:**
```html
<button class="bg-black text-white px-8 py-4 text-lg rounded-none font-semibold hover:bg-gray-900 transition-colors duration-200">
  Get in Touch
</button>
```

### Cards

**Project Card:**
```html
<div class="bg-white border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
  <!-- Image if available -->
  <div class="aspect-video bg-gray-100 mb-4"></div>
  
  <!-- Title -->
  <h3 class="text-xl font-semibold mb-2">Project Title</h3>
  
  <!-- Description -->
  <p class="text-gray-700 mb-4">Brief description...</p>
  
  <!-- Tags -->
  <div class="flex flex-wrap gap-2 mb-4">
    <span class="text-xs bg-gray-100 px-3 py-1">AWS</span>
    <span class="text-xs bg-gray-100 px-3 py-1">Data</span>
  </div>
  
  <!-- CTA -->
  <a href="#" class="text-black font-semibold hover:underline">
    Learn More â†’
  </a>
</div>
```

**Stat Card:**
```html
<div class="text-center p-8">
  <div class="text-5xl font-extrabold mb-2">9PB</div>
  <div class="text-gray-600 text-sm font-medium uppercase tracking-wide">
    Daily Data Processing
  </div>
</div>
```

### Forms

**Input Field:**
```html
<div class="mb-4">
  <label class="block text-sm font-semibold mb-2" for="name">
    Name *
  </label>
  <input 
    type="text" 
    id="name"
    class="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
    placeholder="Your name"
  />
</div>
```

**Textarea:**
```html
<div class="mb-4">
  <label class="block text-sm font-semibold mb-2" for="message">
    Message *
  </label>
  <textarea 
    id="message"
    rows="6"
    class="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors resize-none"
    placeholder="Your message"
  ></textarea>
</div>
```

### Navigation

**Desktop Header:**
```html
<header class="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
  <div class="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
    <div class="flex items-center justify-between h-20">
      <!-- Logo -->
      <a href="/" class="text-2xl font-bold">ROB FREW</a>
      
      <!-- Nav Links -->
      <nav class="hidden md:flex items-center gap-8">
        <a href="/" class="hover:text-gray-600 transition-colors">Home</a>
        <a href="/work" class="hover:text-gray-600 transition-colors">Work</a>
        <a href="/about" class="hover:text-gray-600 transition-colors">About</a>
        <a href="/skills" class="hover:text-gray-600 transition-colors">Skills</a>
        <a href="/resume" class="hover:text-gray-600 transition-colors">Resume</a>
      </nav>
      
      <!-- CTA Button -->
      <a href="/contact" class="hidden md:block bg-black text-white px-6 py-2 font-semibold hover:bg-gray-900 transition-colors">
        Contact
      </a>
      
      <!-- Mobile Menu Button -->
      <button class="md:hidden">
        <svg class="w-6 h-6"><!-- Hamburger icon --></svg>
      </button>
    </div>
  </div>
</header>
```

### Footer

```html
<footer class="bg-black text-white">
  <div class="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-16">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      <!-- About Column -->
      <div>
        <h3 class="text-xl font-bold mb-4">ROB FREW</h3>
        <p class="text-gray-400">
          Problem solver passionate about unblocking technical challenges.
        </p>
      </div>
      
      <!-- Links Column -->
      <div>
        <h4 class="text-sm font-semibold uppercase tracking-wide mb-4">
          Links
        </h4>
        <ul class="space-y-2">
          <li><a href="/" class="text-gray-400 hover:text-white transition-colors">Home</a></li>
          <li><a href="/work" class="text-gray-400 hover:text-white transition-colors">Work</a></li>
          <!-- More links -->
        </ul>
      </div>
      
      <!-- Connect Column -->
      <div>
        <h4 class="text-sm font-semibold uppercase tracking-wide mb-4">
          Connect
        </h4>
        <ul class="space-y-2 text-gray-400">
          <li>rob@robfrew.com</li>
          <li>309-751-7423</li>
          <li><a href="https://linkedin.com/in/frewrob" class="hover:text-white transition-colors">LinkedIn â†’</a></li>
        </ul>
      </div>
    </div>
    
    <!-- Copyright -->
    <div class="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
      Â© 2026 Rob Frew. All rights reserved. Built with Next.js
    </div>
  </div>
</footer>
```

---

## INTERACTIONS & ANIMATIONS

### Hover States

**Cards:**
```css
/* Shadow lift on hover */
.card {
  transition: box-shadow 0.2s ease;
}
.card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
```

**Buttons:**
```css
/* Background darken */
.btn-primary:hover {
  background-color: #171717; /* gray-900 */
}
```

**Links:**
```css
/* Underline fade-in */
.link {
  position: relative;
}
.link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: black;
  transition: width 0.3s ease;
}
.link:hover::after {
  width: 100%;
}
```

### Scroll Animations

**Fade In on Scroll:**
```javascript
// Using Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in');
    }
  });
});
```

**Stat Counter Animation:**
```javascript
// Count up animation for stats like "9PB", "$50M+", "965%"
// Triggered when element enters viewport
// Duration: 2 seconds
// Easing: ease-out
```

### Transition Durations

**Default:** 200ms (hover, click feedback)
**Slow:** 300ms (animations, larger movements)
**Very Slow:** 500ms (page transitions)

```css
/* Tailwind Classes */
transition-colors duration-200
transition-shadow duration-200
transition-all duration-300
```

---

## RESPONSIVE BREAKPOINTS

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'sm': '640px',   // Mobile landscape
      'md': '768px',   // Tablet
      'lg': '1024px',  // Desktop
      'xl': '1280px',  // Large desktop
      '2xl': '1536px', // Extra large
    }
  }
}
```

### Responsive Patterns

**Hide on Mobile:**
```html
<div class="hidden md:block">Desktop only</div>
```

**Show on Mobile Only:**
```html
<div class="block md:hidden">Mobile only</div>
```

**Responsive Flexbox:**
```html
<div class="flex flex-col md:flex-row gap-4">
  <!-- Stacks on mobile, row on desktop -->
</div>
```

**Responsive Grid:**
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- 1 column mobile, 2 tablet, 3 desktop -->
</div>
```

**Responsive Typography:**
```html
<h1 class="text-4xl md:text-5xl lg:text-6xl">
  <!-- Scales up on larger screens -->
</h1>
```

---

## ACCESSIBILITY

### Color Contrast

All text must meet WCAG AA standards (4.5:1 minimum):
- Black text on white: âœ… 21:1
- Gray-700 text on white: âœ… 10.7:1
- Gray-600 text on white: âœ… 7.1:1
- White text on black: âœ… 21:1

### Focus States

```css
/* Visible focus indicators */
.focusable:focus {
  outline: 2px solid black;
  outline-offset: 2px;
}

/* Or using ring utilities */
<button class="focus:ring-2 focus:ring-black focus:ring-offset-2">
```

### Semantic HTML

```html
<!-- Use proper heading hierarchy -->
<main>
  <h1>Page Title</h1>
  <section>
    <h2>Section Title</h2>
    <h3>Subsection</h3>
  </section>
</main>

<!-- Use semantic elements -->
<header>, <nav>, <main>, <article>, <section>, <aside>, <footer>
```

### ARIA Labels

```html
<!-- Screen reader text -->
<button aria-label="Close menu">
  <svg><!-- X icon --></svg>
</button>

<!-- Skip to content link -->
<a href="#main-content" class="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

---

## PERFORMANCE

### Image Optimization

```javascript
// Next.js Image component
import Image from 'next/image'

<Image
  src="/images/project.jpg"
  alt="Basin architecture diagram"
  width={800}
  height={600}
  quality={85}
  loading="lazy"
/>
```

### Font Loading

```javascript
// next/font optimization
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})
```

### Code Splitting

```javascript
// Dynamic imports for heavy components
import dynamic from 'next/dynamic'

const StatCounter = dynamic(() => import('@/components/StatCounter'), {
  loading: () => <p>Loading...</p>
})
```

---

## COMPONENT LIBRARY SUMMARY

Ready-to-use components:
1. Header (fixed, responsive)
2. Footer (3-column)
3. Hero Section
4. Project Card
5. Stat Counter
6. Skill Progress Bar
7. Timeline Item
8. Contact Form
9. Button (primary, secondary)
10. Input Fields
11. Navigation (desktop, mobile)

---

**END OF DESIGN SYSTEM**
