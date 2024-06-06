module.exports = {
    content: ["./src/**/*.{html,js}", "./public/*.html"],
    theme: {
      extend: {},
      themes: ["light", "dark", "cupcake"],
    },
    plugins: [
      require('daisyui'),
    ],
  };