import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { Box, Sidebar, Avatar, Nav, Button, Main } from "grommet";
import {
  Analytics,
  Configure,
  List,
  Close,
  Dashboard,
  Edit
} from "grommet-icons";

const user = JSON.parse(localStorage.getItem('user'))

const SidebarHeader = () => (
  <Avatar
    border={{ size: "medium", color: "accent-1" }}
    background="white"
    flex={false}
    src={user.imageUrl}
  />
);

const SidebarFooter = () => (
  <Nav gap="small">
  </Nav>
);

const MainNavigation = () => {
  const history = useHistory();
  return (
    <Nav gap="small">
    <Button icon={<Dashboard />} onClick={() => history.push("/dashboard")} />
    <Button icon={<Edit />} onClick={() => history.push('/Editor')}/>
    <Box pad="small" border={{ color: "white", side: "bottom" }} />
    <Box gap="small" pad={{ vertical: "medium" }}>
      <Button icon={<Analytics />} onClick={() => history.push('/analysis')} /> 
      <Button icon={<Configure />} onClick={() => history.push('/wordbank')}/>
    </Box>
  </Nav>

  )
  
}

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);
  return (
    <>
      <Box fill direction="row" height={{ min: "100%" }} animation="fadeIn" >
        <Box margin="small" >
          <Box elevation="small" style={{zIndex: 1}} >
            <Button
              onClickCapture={toggle}
              icon={!open ? <List /> : <Close />}
              
            />
          </Box>
          {open && (
            <Sidebar
              margin={{top: "large"}}
              style={{ zIndex: "1" }}
              background="light-2"
              header={<SidebarHeader />}
              footer={<SidebarFooter />}
            >
              <MainNavigation />
            </Sidebar>
          )}
        </Box>
        <Main margin={{left: "small"}} height={{ min: "100%" }}>{children}</Main>
      </Box>
    </>
  );
};

export default Layout;
