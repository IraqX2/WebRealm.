
# WebRealm - Premium Web Design Studio

A premium, high-value React application built with TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Modern UI/UX**: Premium design with a blue-dominant theme and smooth animations.
- **Cart System**: Working cart for service packages and add-ons (Monthly Modification & Custom Domains).
- **Gallery**: Filterable showcase for client projects with lightbox functionality.
- **Netlify Integration**: Fully ready for Netlify deployment with Netlify Forms for order handling.
- **Responsive**: Mobile, tablet, and desktop optimized.

## Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## Netlify Deployment

To ensure Netlify Forms works:
1. Build the project: `npm run build`.
2. Deploy the `dist` folder to Netlify.
3. Form notifications can be configured in the Netlify Dashboard under **Site Settings > Forms > Form notifications**.

## Customizing

- **Demos & Gallery**: Check `constants.tsx` to uncomment and add your own projects.
- **Pricing**: Update the `PACKAGES` array in `constants.tsx`.
- **Styling**: All styles are handled via Tailwind CSS classes in the TSX files.

## Credits

Created for premium digital transformation. Built with React 18, Framer Motion, and Tailwind CSS.
