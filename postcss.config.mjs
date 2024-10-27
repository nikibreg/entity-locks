/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {
      content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
     
        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
      ],
    },
  },
};

export default config;
