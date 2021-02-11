import { useState, useContext } from "react";
import { Box, Button, Heading, Grommet, ResponsiveContext, Text, Nav, Anchor, grommet} from "grommet";
import { Close, Iteration,  Moon, Sun, List, Facebook, Instagram, Linkedin, Medium, Twitter } from "grommet-icons";
import AppHeader from "./components/AppHeader";
import AppSidebar from "./components/AppSidebar";
import theme from "./theme";
import Dashboard from "./components/Dashboard/Dashboard";
import LandingPage from "./components/LandingPage/LandingPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import MarkdownEditor from "./components/Editor/Editor";

//contexts
import {AuthProvider} from './contexts/AuthContext/AuthContext';
import { GlobalProvider, GlobalContext} from './contexts/GlobalContext/globalcontext';

import {ApolloProvider} from '@apollo/client';
import {client} from './contexts/ApolloClient';

const About = () => (
  <Box responsive>
    <Heading>
      TODO:  About Page
    </Heading>
  </Box>
)
  

const Contact = () => (
  <Box>
    <Heading>
      TODO:  This is the Contact Page
    </Heading>
  </Box>
)
const PrivacyPage = () => (
  <Box>
    <Heading>
      TODO: PrivacyPage
    </Heading>
  </Box>
)


function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const {isLoggedIn} = useContext(GlobalContext)
  return (
    <Grommet theme={theme} themeMode={darkMode? "dark": "light"} full>
      <Router>
  <ApolloProvider client={client}>
  <AuthProvider>
    <GlobalProvider>
      <ResponsiveContext.Consumer>
        {(size) => (
          <Box fill >
            <AppHeader >
              <Heading brand level="3" gap="small" margin={{left: "large"}}>
                <Iteration size="medium" color="black"/>
                <Text size="medium" color="black" margin={{left: "xsmall"}}>
                  Iterate
                </Text>
              </Heading>
              <Box direction="row" margin={{left: "large"}}>
                <Button 
                  icon={!darkMode? <Sun/>: <Moon/>}
                  onClick={() => setDarkMode(!darkMode)}
                />
                <Button
                  icon={!showSidebar? <List />: <Close/>}
                  onClick={() => setShowSidebar(!showSidebar)}
                />
              </Box>
              
            </AppHeader>
            <Box direction="row" flex overflow={{ horizontal: "hidden" }}>
              <Box flex align="center" justify="center" margin={{bottom: "medium"}} 
              >
              <Switch>
                <Route exact path="/">
                  <LandingPage resposiveSize={size}/>
                </Route>
                <Route path="/About">
                  <About/>
                </Route>
                <Route path="/Contact">
                  <Contact/>
                </Route>
                <Route path="/Privacy">
                  <PrivacyPage/>
                </Route>
                <Route path="/Dashboard">
                  <Dashboard/>
                </Route>
                <Route path="/Editor/:id">
                  <MarkdownEditor/>
                </Route>
            </Switch>
                  
              </Box>
              
              <AppSidebar
                size={size}
                showSidebar={showSidebar}
                onClose={() => setShowSidebar(false)}
              >
              
                <Nav direction="column">
                  <Anchor href={isLoggedIn? "/" : "/dashboard"} label={isLoggedIn? "Home": "Dashboard"} />
                  <Anchor href="/About" label="About" />
                  <Anchor href="/Contact" label="Contact" />
                  <Anchor href="/Privacy" label="Privacy Policy" />
                  <Text color="black-4">Follow Us on</Text>
                  <Box direction="row">
                    <Anchor icon={<Facebook/>} href="/" />
                    <Anchor icon={<Instagram/>} href="/"/>
                    <Anchor icon={<Linkedin/>} href="/" />
                  </Box>
                  <Box direction="row" justify="center">
                    <Anchor icon={<Medium/>} href="/" />
                    <Anchor icon={<Twitter/>} href="/" />
                  </Box>
                </Nav>                 
              </AppSidebar>
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer> 
      </GlobalProvider>
    </AuthProvider>
  </ApolloProvider>   
      </Router>

    </Grommet>
  );
}

export default App;
