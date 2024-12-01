/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    fontFamily: {
      title: ['font-righteous', "sans-serif"],
      main: ['font-josefin', "sans-serif"]
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'pink': '#F8B8ED',
        'black': '#313131',
        'verylight-gray': '#f0f0f0',
        'light-gray': '#D0D0D0',
        'gray': '#828282',
        'dark-gray': '#585858',
        'turqoise': '#7bccce',
        'green': '#57c24f',
        'white': '#ffffff'
      },
      boxShadow: {
        'big': '0.5rem 0.5rem 0 0 black'
      },
      fontFamily: {
        'jo-li': 'Josefin-Light',
        'jo-md': 'Josefin-Medium',
        'rg': 'Righteous'
      }
    },
  },
  plugins: [],
}

