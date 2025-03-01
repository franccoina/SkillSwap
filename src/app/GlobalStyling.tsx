'use client';
import { createGlobalStyle } from "styled-components";
import { Urbanist, Baskervville } from "next/font/google";
import { IGlobalTheme } from "../models/globalTheme.model";

const urbanist = Urbanist({ 
    subsets: ["latin"], 
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] 
});

const baskervville = Baskervville({
    weight: '400',
    subsets: ['latin'],
    style: 'normal'
});

// Configuramos nuestro Global Theme
export const GlobalTheme: IGlobalTheme = {
    colors: {
        bgNavbar:'#222222',
        bgBanner: 'rgba(0, 0, 0, 0.1)',
        bgMainOpacity:'#00000050',
        bgSidebar: '#ffffff',
        bgNotFound: '#F5F5F5',
        bgPrimary: '#FFFFFF',                                   
        bgSecondary: '#222222',  
        bgTertiary: '#F5F5F5',  
        bgOrange: '#F4F3EE',      
        bgGray: '#777777', 
        bgGrey: '#222222',          
        textSecondary: '#222222', 
        textPrimary: '#FFFFFF',
        textDark: '#555555',    
        textSidebar: '#555555',  
        textBlack: '#00000025',  
        textWhite: '#FFFFFF',            
        textTertiary: '#00000050',
        textPurple: '#965AC6',
        textOrange: '#DC7D2F',
        textOrange2: '#D13B00',
        textOrangeO: '#EA242450',
        textBlueLight: '#2D68FF',
        textBlueDark: '#093A98',
        textYellow: '#F0AC27',
        textGreen: '#34DD0A',
        textRed: '#891E1E',
        textBlue:'#1E6F8960',
        textBrown: '#A3761E60', 
        textPink: '#EFC7C5', 
        borderLogobar: '#DDDDDD', 
        borderNavs: '#333333', 
        borderAuthLeft: '#FFFFFF', 
        borderAuthRight: '#F0AC27', 
        gradientText: 'linear-gradient(90deg, #F0AC27 0%,  #DC7D2F 60%, #D13B00 100% )', 
        gradientPrimary: 'linear-gradient(90deg, #F0AC27 0%,  #DC7D2F 60%, #D13B00 100% )', 
        gradientSecondary: 'linear-gradient(270deg, #F0AC2799 20%,  #DC7D2F99 80%, #D13B0099 100% )', 
        gradientTertiary:  'linear-gradient(270deg, #F0AC2799 20%,  #DC7D2F99 80%, #D13B0099 100% )',
        backgroundPink: 'linear-gradient(90deg, #7D93FF 0%, #F093C0 85%, #EFC7C5 100%)',
        backgroundGreen: 'linear-gradient(90deg, #B6CB65 0%, #37A879 52%, #4A54AE66 100%)',
    }
};

export const GlobalDarkTheme: IGlobalTheme = {
    colors: {
        bgNavbar:'#222222',
        bgBanner: 'rgba(255, 255, 255, 0.1)',
        bgMainOpacity:'#FFFFFF16',
        bgSidebar: '#ffffff',
        bgNotFound: '#303030',
        bgPrimary: '#222222',   
        bgSecondary: '#FFFFFF', 
        bgTertiary: '#222222', 
        bgOrange: '#F4F3EE',      
        bgGray: '#777777',   
        bgGrey: '#222222',   
        textPrimary: '#222222',            
        textSecondary: '#FFFFFF',
        textDark: '#CCCBCB', 
        textSidebar: '#555555',                          
        textBlack: '#00000020',
        textPink: '#EFC7C5',
        textWhite: '#FFFFFF',      
        textTertiary: '#00000050',
        textPurple: '#965AC6',
        textOrange: '#DC7D2F',
        textOrange2: '#D13B00',
        textOrangeO: '#EA242450',
        textBlueLight: '#2D68FF',
        textBlueDark: '#093A98',
        textYellow: '#F0AC27',
        textGreen: '#34DD0A',
        textRed: '#891E1E60',
        textBlue:'#1E6F8960',
        textBrown: '#A3761E60',  
        borderAuthLeft: '#FFFFFF', 
        borderAuthRight: '#FFFFFF',  
        borderLogobar: '#333333',  
        borderNavs: '#333333',  
        gradientText: 'linear-gradient(90deg, #F0AC27 0%,  #DC7D2F 60%, #D13B00 100% )', 
        gradientPrimary: 'linear-gradient(90deg, #F0AC27 0%,  #DC7D2F 60%, #D13B00 100% )', 
        gradientSecondary: 'linear-gradient(270deg, #F0AC2799 20%,  #DC7D2F99 80%, #D13B0099 100% )', 
        gradientTertiary: 'linear-gradient(90deg, #EEEEEE 0%,  #CCCCCC 60%, #999999 100% )', 
        backgroundPink: 'linear-gradient(90deg, #7D93FF 0%, #F093C0 85%, #EFC7C5 100%)',
        backgroundGreen: 'linear-gradient(90deg, #B6CB65 0%, #37A879 52%, #4A54AE 100%)',
    }
};

// Global styling para elementos HTML importantes
export const GlobalStyle = createGlobalStyle`

html {
    background-color: ${({ theme }) => theme.colors.bgPrimary};
    width: 100vw !important;
    overflow-x: hidden;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

*,
*::before,
*::after{
    font-family: ${urbanist.style.fontFamily};
    box-sizing: inherit;
}

body {
    min-height: 100vh;
    width: 100% !important;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
}

h1, h2, h3, h4, h5, h6 {
    font-weight: bolder;
}

p {
    color: ${({ theme }) => theme.colors.bgPrimary};
    line-height: 1.5;
    font-weight: 300;
    margin: 0;
    hyphens: auto;
    word-wrap: break-word;
    overflow-wrap: break-word;
} */

.gradient-bg-primary {
    background-color: ${({ theme }) => theme.colors.gradientPrimary};
}

.gradient-bg-secondary {
    background-color: ${({ theme }) => theme.colors.gradientSecondary};
}
input, select, textarea, button {
    font-family: ${urbanist.style.fontFamily};
}

span{
    font-family: ${baskervville.style.fontFamily};
    font-style: italic;
    font-weight: normal;
}
`;


