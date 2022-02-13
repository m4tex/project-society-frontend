import ThemeProvider from "./store/ThemeProvider";
import {createGlobalStyle} from "styled-components";
import Theme from "./types/Theme";

const BackgroundThemeStyle = createGlobalStyle`
  body {
    background-color: ${(props:{theme: Theme}) => props.theme.backgroundColor};
  }
`

function App() {
    return (
        <ThemeProvider>
            <BackgroundThemeStyle />
        </ThemeProvider>
    );
}

export default App;
