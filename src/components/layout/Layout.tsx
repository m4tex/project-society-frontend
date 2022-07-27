import React from 'react';
import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";

const MainContent = styled.main`
  display: inline-block;
  margin-top: 65px;
  width: 100%;
`

function Layout() {
    return (
        <>
            <Header />
            <MainContent>
                <Outlet/>
            </MainContent>
        </>
    )
}

export default Layout;