/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          bg: '#FAF7EF',         // warm eggshell canvas
          card: '#FFFFFF',       // crisp white for cards
          primary: '#256D45',    // deep agricultural green
          primaryDark: '#1B5233',
          primaryLight: '#E8F3EB',
          accent: '#D98E04',     // gold/turmeric
          accentLight: '#FDF4E2',
          red: '#B23A2E',        // chili red for alerts/reject
          redLight: '#FDECEB',
          ink: '#22281F',        // charcoal ink for high readability
          muted: '#616A5D',      // muted green-grey
          border: '#E6E0D2',     // soft organic border
          sand: '#F3EFE3'        // contrast background tint
        }
      },
      fontFamily: {
        headline: ['"Zilla Slab"', 'Georgia', 'serif'],
        body: ['"Work Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(34, 40, 31, 0.05)',
        'elevated': '0 8px 24px rgba(37, 109, 69, 0.08)',
        'modal': '0 20px 40px rgba(34, 40, 31, 0.16)'
      },
      minHeight: {
        'tap': '56px'
      },
      minWidth: {
        'tap': '56px'
      }
    },
  },
  plugins: [],
}
