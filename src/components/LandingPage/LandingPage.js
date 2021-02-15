import React, { useState } from 'react';
import {Box, Heading,Stack, Button, Layer } from 'grommet';
import { Close, Iteration } from 'grommet-icons';
import {ReactComponent as Man} from '../../assets/HappyMan.svg';
import {ReactComponent as Laptop} from '../../assets/Asset2.svg';
import {Login} from '../LoginCard/Login';
const LandingPage = ({resposiveSize}) => {
    const [show, setShow] = useState();
    return(
        <Box 
        responsive
        direction="row-responsive" 
        animation="fadeIn" 
        justify="center" 
        gap="large" 
        align="start"
        >
            {show && (
        <Layer
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
        >
          <Button icon={<Close/>} onClick={() => setShow(false)} />
            <Login/>
          
        </Layer>
      )}
            <Stack anchor="bottom-right" >
                <Box width={resposiveSize}>
                    <Man />
                </Box>
                <Box width="200px" pad={{bottom: "30px"}} >
                    <Laptop size="small"/>
                </Box>
            </Stack>
            <Box flex direction="column" >
                <Box direction="row">
                    <Heading color="brand">
                        Iterate
                    </Heading>
                    <Iteration size="25px" color="black"/>
                </Box>
                <Box>
                    <Heading color="black" level="2" size="medium" style={{textDecoration: "underline", textDecorationColor: "greenyellow"}}>
                        Made for Journaling
                    </Heading>
                    <Button brand label="Get Started"  onClick={() => setShow(true)}/>
                </Box>
                
            </Box>
        </Box>
    )
}



export default LandingPage;