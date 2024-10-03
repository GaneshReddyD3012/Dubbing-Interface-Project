
1. **First, create a new directory and initialize the project**
```bash
mkdir dubbing-interface
cd dubbing-interface
npm init -y
```

2. **Install dependencies**
```bash
npm install react react-dom next @shadcn/ui lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

3. **Now, let's create all the necessary files with their content:**

a. **Create `tailwind.config.js`**
```bash
touch tailwind.config.js
```
Add this content to `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
	],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

b. **Create the pages directory and files**
```bash
mkdir -p src/pages
touch src/pages/_app.js
touch src/pages/index.js
```

Add this content to `src/pages/_app.js`:
```javascript
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

c. **Create the styles directory and file**
```bash
mkdir -p src/styles
touch src/styles/globals.css
```

Add this content to `src/styles/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

d. **Create `next.config.js`**
```bash
touch next.config.js
```

Add this content to `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
```

e. **Update `package.json`**
Replace the "scripts" section in your package.json with:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

f. **Add the main component code to `src/pages/index.js`**
Copy the entire React component code from our previous artifact into this file.

4. **Initialize git and connect to GitHub**
```bash
git init
git remote add origin https://github.com/yourusername/dubbing-interface.git
```

5. **Add and commit files**
```bash
git add .
git commit -m "Initial commit"
git push -u origin main
```

**File Structure**
After following these steps, your project structure should look like this:
```
dubbing-interface/
├── node_modules/
├── src/
│   ├── pages/
│   │   ├── _app.js
│   │   └── index.js
│   └── styles/
│       └── globals.css
├── .gitignore
├── next.config.js
├── package.json
├── package-lock.json
├── postcss.config.js
└── tailwind.config.js
```

**To run the project:**
```bash
npm run dev
```

**Common Issues and Solutions:**

1. If you get module not found errors:
   - Make sure all dependencies are installed correctly
   - Try deleting `node_modules` and `package-lock.json` and run `npm install` again

2. If styles aren't applying:
   - Verify that your `tailwind.config.js` content array includes all necessary paths
   - Make sure `globals.css` is imported in `_app.js`

3. If the page is blank:
   - Check the browser console for errors
   - Verify that the component in `index.js` is exported correctly

Would you like me to:
1. Provide a script that automates all of these steps?
2. Explain how to set up any specific feature in more detail?
3. Show how to troubleshoot specific issues?
