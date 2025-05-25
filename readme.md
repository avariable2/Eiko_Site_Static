# Eiko Static Site

A lightweight, static landing page template for Eiko, featuring smooth GSAP animations and Tailwind CSS with prefixed utility classes for easy differentiation and customization.

---

## Demo

Live demo available at: [https://eiko-example.com](https://eiko-example.com)

---

## Features

- **GSAP Animations**: Scroll-triggered and timeline-based animations for engaging user experiences
- **Tailwind CSS**: Utility-first styling with `tw-` prefix to avoid class name conflicts
- **Responsive Design**: Mobile-first layout that adapts seamlessly across screen sizes
- **Static Hosting Ready**: Preconfigured for deployment on platforms like Heroku and Netlify

---

## Getting Started

### Prerequisites

- Node.js v14 or higher
- npm or Yarn

### Installation

```bash
git clone https://github.com/avariable2/eiko-site-static.git
cd eiko-site-static
npm install
````

---

## Development

Include the Tailwind runtime stylesheet in `public/index.html`:

```html
<link rel="stylesheet" href="tailwind-runtime.css" />
```

Start Tailwind watcher and server:

```bash
npm run start:tailwind
npm start
```

---

## Production Build

```bash
npm run build:tailwind
npm run build && npm start
```

---

## Deployment

* **Heroku**: Uses `Procfile` for the Node.js server
* **Netlify**: Drop the `public` folder and include `static.json`

---

## File Structure

```text
eiko-site-static/
├── .well-known/          # Security & SEO configs
├── node_modules/
├── public/               # HTML, CSS, JS, and images
├── Procfile
├── package.json
├── package-lock.json
├── README.md
├── server.js
└── static.json
```

---

## License

The GSAP library is used under its own license. Remaining code is MIT-licensed; see `LICENSE`.
