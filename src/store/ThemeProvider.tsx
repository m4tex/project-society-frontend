import {ThemeProvider} from "styled-components";
import {useState} from "react";
import Theme from '../types/Theme'

const data = {
    theme: 'custom',
    themeColors: []
}

const lightModeColors = [
    '#FFFFFF',
    '#FFFFFF',
    '#6F6F6F',
    '#DEDEDE',
    '#000000',
    '#4F46E5',
    '#FB0000'
]

const THEMES = [new Theme(...lightModeColors),]

function ThemeProviderComponent(props : {children: JSX.Element[] | JSX.Element}) {
    const [theme, setTheme] = useState<Theme>({
        ...THEMES[0],
        setTheme: setThemeHandler
    })

    function setThemeHandler(index: number) {
        setTheme({...THEMES[index], setTheme: setThemeHandler});
    }

    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    );
}

export default ThemeProviderComponent;