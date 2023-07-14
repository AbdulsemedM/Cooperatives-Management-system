/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        "76": "19rem",
        "86":"22rem",
        "100":"28rem",
        "120":"32rem",
        "130":"36rem"
      },
      height: {
        '100':'28rem',
        '110':'34rem',
        '120':'37rem',
        '130':"43rem"
      },
    },
  },
  plugins: [],
};
