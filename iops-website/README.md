# IOPS Pro - AI-Powered DevOps Automation Website

A modern, professional consultancy website built with Next.js 14, showcasing AI-powered DevOps automation services.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Beautiful UI**: shadcn/ui components with dark/light mode support
- **Smooth Animations**: Framer Motion for engaging user experience
- **Interactive ROI Calculator**: Real-time calculations with industry benchmarks
- **Contact Integration**: Formspree for seamless form submissions
- **Static Export**: Optimized for Cloudflare Pages deployment
- **SEO Optimized**: Comprehensive metadata and OpenGraph tags
- **Responsive Design**: Mobile-first approach for all screen sizes

## 📋 Prerequisites

- Node.js 18+ and npm
- A [Formspree](https://formspree.io) account (free tier available)

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd iops-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env.local` file in the root directory:
   ```bash
   NEXT_PUBLIC_FORMSPREE_ID=your_formspree_form_id_here
   ```

   To get your Formspree form ID:
   - Sign up at [formspree.io](https://formspree.io)
   - Create a new form
   - Copy the form ID (looks like `xwpejxyz`)
   - Add it to your `.env.local` file

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build for Production

Build the static site:
```bash
npm run build
```

This creates an optimized static export in the `out/` directory.

## 🌐 Deployment to Cloudflare Pages

### Option 1: Using Cloudflare Dashboard

1. **Build the site:**
   ```bash
   npm run build
   ```

2. **Deploy via dashboard:**
   - Go to [Cloudflare Pages](https://pages.cloudflare.com)
   - Click "Create a project"
   - Connect your Git repository
   - Configure build settings:
     - Build command: `npm run build`
     - Build output directory: `out`
   - Add environment variable: `NEXT_PUBLIC_FORMSPREE_ID`
   - Deploy!

### Option 2: Using Wrangler CLI

1. **Install Wrangler:**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare:**
   ```bash
   wrangler login
   ```

3. **Deploy:**
   ```bash
   npm run build
   wrangler pages deploy out --project-name=iops-pro
   ```

## 📁 Project Structure

```
iops-website/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Main landing page
│   └── globals.css         # Global styles and Tailwind
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── sections/           # Page sections
│   │   ├── hero.tsx
│   │   ├── services.tsx
│   │   ├── roi-calculator.tsx
│   │   ├── tech-stack.tsx
│   │   ├── case-studies.tsx
│   │   ├── process-timeline.tsx
│   │   ├── pricing.tsx
│   │   └── contact-form.tsx
│   ├── theme-toggle.tsx
│   └── floating-code-elements.tsx
├── lib/
│   ├── utils.ts            # Utility functions
│   └── roi-calculations.ts # ROI calculator logic
├── public/
│   └── _headers            # Cloudflare security headers
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind configuration
└── components.json         # shadcn/ui configuration
```

## 🎨 Customization

### Colors and Theme

Edit `tailwind.config.ts` to customize the color palette. The current theme uses:
- Primary: Slate with blue accents
- Accent: Electric Blue and Cyan
- Dark mode by default

### Content

All section content is in `components/sections/*.tsx`. Edit these files to update:
- Services descriptions
- Case study details
- Pricing tiers
- Process timeline
- Tech stack

### ROI Calculator

The calculator uses realistic industry benchmarks defined in `lib/roi-calculations.ts`:
- Average DevOps hourly rate: $70/hr
- Average incident cost: $5,000
- Time saved: 70%
- Incident reduction: 90%

## 📧 Formspree Configuration

The contact form uses Formspree for email notifications. Features:
- Email notifications to your inbox
- Auto-response emails to submitters
- Spam protection
- Submission storage
- Free tier: 50 submissions/month

### Formspree Setup:

1. Create an account at [formspree.io](https://formspree.io)
2. Create a new form
3. Configure email notifications (optional)
4. Configure auto-response (optional)
5. Add integrations if needed (Slack, Google Sheets, etc.)
6. Copy the form ID to your `.env.local`

Reference: [Formspree Documentation](https://formspree.io)

## 🔒 Security

The site includes security headers in `public/_headers`:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: geolocation=(), microphone=(), camera=()
- Content-Security-Policy with strict rules

## ⚡ Performance

Optimizations included:
- Static site generation
- Image optimization (unoptimized for static export)
- Font subsetting
- Lazy loading for components
- Tree-shaking for minimal bundle size
- Target Lighthouse score: 95+

## 🧪 Testing

Run the development server and test:
- All sections load correctly
- Animations work smoothly
- Forms submit successfully
- Responsive design on mobile/tablet/desktop
- Dark/light mode toggle
- ROI calculator calculations

## 📄 License

Copyright © 2025 IOPS Pro. All rights reserved.

## 🤝 Support

For issues or questions about the website:
- Check the [Next.js documentation](https://nextjs.org/docs)
- Review [shadcn/ui documentation](https://ui.shadcn.com)
- Check [Formspree documentation](https://formspree.io)

## 🚀 Next Steps

1. **Add your Formspree form ID** to environment variables
2. **Customize content** in section components
3. **Add your branding** (logo, colors, images)
4. **Test thoroughly** on different devices
5. **Deploy to Cloudflare Pages**
6. **Set up custom domain** (iops.pro)
7. **Configure DNS** in Cloudflare

---

Built with ❤️ using Next.js 14, shadcn/ui, and Tailwind CSS
