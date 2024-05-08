import isAuth, { userType } from './src/lib/isAuth';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#008080",
        "blue": "#08A045" /*(
          isAuth() ? 
            (userType() === "recruiter" ? "#3756ED" : "#EE4B2B")
          : ("#08A045")
        )*/
      }
    },
  },
  plugins: [],
}