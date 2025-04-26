/** @type {import('tailwindcss').Config} */
export const content = ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"];
export const presets = [require("nativewind/preset")];
export const theme = {
    extend: {
        colors: {
            primary: '#FF0000',
            grayCustom: 'rgba(102, 102, 102, 1)',
            grayLightCustom: 'rgba(149, 148, 148, 1)',
        },
        fontFamily: {
            viga: ['Viga']
        },
        boxShadow: {
            cardBoxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'
        },
        border: {
            grayLightCustom: 'rgba(149, 148, 148, 1)',
        }
    },
};
export const plugins = [];