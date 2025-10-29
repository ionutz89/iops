# Quick Setup Guide

## 1. Install Dependencies

```bash
npm install
```

## 2. Create Environment File

Create a `.env.local` file in the root directory with:

```bash
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_form_id_here
```

**To get your Formspree Form ID:**
1. Go to https://formspree.io
2. Sign up (free tier: 50 submissions/month)
3. Create a new form
4. Copy the form ID (looks like: `xwpejxyz`)
5. Paste it in your `.env.local` file

## 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 4. Test Everything

- ✅ All sections load
- ✅ Animations work smoothly
- ✅ ROI calculator calculates
- ✅ Contact form submits
- ✅ Dark/light mode toggle
- ✅ Mobile responsive

## 5. Build for Production

```bash
npm run build
```

This creates a static export in the `out/` directory ready for Cloudflare Pages.

## Common Issues

### "Formspree ID not configured"
- Make sure `.env.local` exists
- Check the variable name: `NEXT_PUBLIC_FORMSPREE_ID`
- Restart the dev server after creating `.env.local`

### Build errors
- Delete `.next` folder and `node_modules`
- Run `npm install` again
- Try `npm run build` again

### Contact form not submitting
- Verify your Formspree form ID is correct
- Check browser console for errors
- Make sure you're online

## Next Steps

1. Customize content in `components/sections/*.tsx`
2. Update colors in `tailwind.config.ts`
3. Add your branding/logo
4. Deploy to Cloudflare Pages (see DEPLOYMENT.md)

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

