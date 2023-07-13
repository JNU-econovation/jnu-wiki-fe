import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { styled } from 'styled-components';

const Layout = () => {
    return (
        <>
            <Header></Header>
            <Sidebar></Sidebar>
        </>
    );
};

export default Layout;