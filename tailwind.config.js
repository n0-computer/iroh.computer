module.exports = {
  content: [
      './templates/**/*.html',
      './static/js/**/*.js',
  ],
 darkMode: 'class', // or 'media' or 'class'
 theme: {
   extend: {
    backgroundImage: {
      'iroh-kv-1': "url('/img/kv/iroh-kv-1.png')",
      'iroh-kv-2': "url('/img/kv/iroh-kv-2.png')",
      'iroh-kv-3': "url('/img/kv/iroh-kv-3.png')",
      'iroh-kv-4': "url('/img/kv/iroh-kv-4.png')",
    },
    colors: {
     'n0pink': {
        100: '#FFF4F3',
        200: '#FFE9E6',
        300: '#FFD2CC',
        400: '#FFBCB3',
        500: '#FFAC9C',
        600: '#E2847D',
        700: '#CC6E66',
        800: '#AF584F',
        900: '#99463D',
     },
     'irohGray': {
        50 : "#FAFAFA",
        100 : "#F8F8F8",
        200 : "#E4E4E7",
        300 : "#D4D4D8",
        400 : "#A1A1AA",
        500 : "#71717A",
        600 : "#52525B",
        700 : "#3B3B3B",
        800 : "#27272A",
        900 : "#18181B",
        1000 : "#0E0E0F",
     },
     'irohPurple': {
        500: "#7C7CFF",
     }
    },
    fontFamily: {
      'space': ['Space Grotesk', 'sans-serif'], 
      'space-mono': ['Space Mono', 'sans-serif'] 
    },
   },
 },
 variants: {
   extend: {},
 },
 plugins: [],
}