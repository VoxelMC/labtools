/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                dark: {
                    50: '#f2f2fb',
                    100: '#e7e8f8',
                    200: '#d4d5f1',
                    300: '#b9b9e8',
                    400: '#a19cdd',
                    500: '#9084d0',
                    600: '#7e6bc0',
                    700: '#6d5aa8',
                    800: '#594a89',
                    900: '#4b416e',
                    950: '#1d192a',
                },
            },
        },
    },
    plugins: [],
};
