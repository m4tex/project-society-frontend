import ThemeProvider from "./store/ThemeProvider";
import Theme from "./types/Theme";
import {createGlobalStyle} from "styled-components";

import {Routes, Route} from "react-router-dom";
import SchedulePage from "./pages/SchedulePage";
import HomePage from "./pages/HomePage";
import ClassroomPage from "./pages/ClassroomPage";
import OverviewPage from "./pages/OverviewPage";
import PomodoroPage from "./pages/tools-pages/PomodoroPage";
import LearnPage from "./pages/tools-pages/LearnPage";
import Layout from "./components/layout/Layout";

const BackgroundThemeStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  body {
    background-color: ${(props: { theme: Theme }) => props.theme.backgroundColor};
  }
`

function App() {
    return (
        <ThemeProvider>
            <BackgroundThemeStyle/>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<SchedulePage/>}/>
                    <Route path='home' element={<HomePage />}/>
                    <Route path='classroom' element={<ClassroomPage />}/>
                    <Route path='overview' element={<OverviewPage />}/>
                    <Route path='pomodoro' element={<PomodoroPage />}/>
                    <Route path='learn' element={<LearnPage />}/>
                </Route>
            </Routes>
        </ThemeProvider>
    );
}

export default App;
