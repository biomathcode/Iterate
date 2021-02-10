import React, { useState } from 'react';

import { Box,  Sidebar,Avatar, Nav, Button, Main } from 'grommet';
import {Chat, Help, StatusInfoSmall, Projects, Clock, Analytics, Configure,List, Close,} from 'grommet-icons';



const SidebarHeader = () => (
    <Avatar
      border={{ size: 'small', color: 'accent-2' }}
      background="white"
      flex={false}
    >
      SY
    </Avatar>
  );
  
const SidebarFooter = () => (
<Nav gap="small">
<Button icon={<Chat />} />
<Button icon={<Help />} />
</Nav>
);


const MainNavigation = () => (
    <Nav gap="small">
      <Button icon={<StatusInfoSmall />} />
      <Button icon={<Projects />} />
      <Button icon={<Clock />} />
      <Box pad="small" border={{ color: 'white', side: 'bottom' }} />
      <Box gap="small" pad={{ vertical: 'medium' }}>
        <Button icon={<Analytics />} />
        <Button icon={<Configure />} />
      </Box>
    </Nav>
  );

const Layout = ({children}) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open)
    return (
  <>
    <Box fill direction="row" height={{min: "100%"}} animation="fadeIn" >
      <Box margin="small">
      <Box elevation="small">
      <Button onClick={toggle} icon={!open ? <List/> : <Close/>}  style={{zIndex: "4"}}/>
      </Box>
      {open && 
        <Sidebar
        style={{zIndex: "1"}}
        elevation="small"
        background="light-2"
        header={<SidebarHeader/>}
        footer={<SidebarFooter/>}
        >
        <MainNavigation/>
    </Sidebar>
      }
      </Box>
        <Main  height={{min: '100%'}}>
            {children}
        </Main>   
    </Box>
  </>
    )
}

export default Layout;