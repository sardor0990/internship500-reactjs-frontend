/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			rotate: ['hover'],
		},
		fontFamily: {
			sans: ['sans', 'Mulish'],
			serif: ['serif', 'Vollkorn'],
			inter: ['Inter', 'sans-serif'],
		},
	},
	plugins: [require('tailwind-scrollbar')],
	corePlugins: {
		preflight: false,
	},
};
