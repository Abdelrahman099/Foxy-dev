import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import CalltoCation from './CalltoCation';
const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  margin-top: 80px; /* Header height */
  padding-bottom: 2rem;
`;

const Layout = () => {
  return (
    <LayoutContainer>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <CalltoCation />
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
