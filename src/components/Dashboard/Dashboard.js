import React, { useState, useContext } from 'react';

import { AuthContext} from '../../contexts/AuthContext/AuthContext';
import {GlobalContext} from '../../contexts/GlobalContext/globalcontext';

import {Box, Clock, Calendar,Button, Avatar, Text, Heading, } from 'grommet';
import Layout from '../Layout/Layout';
import { Add,BladesHorizontal } from 'grommet-icons';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';





//query for adding Journal
const ADD_JOURNAL = gql`
    mutation AddJournal($googleId: String!) {
        addJournal(googleId:$googleId ) {
            id
            googleId
            createdAt
        }
    }
`

export default function Dashboard(props) {

    const {UserLogOut} = useContext(AuthContext);
    const {addJournal} = useContext(GlobalContext);

    const user = JSON.parse(localStorage.getItem('user'))

    const userAccount = user?.googleId
    const history = useHistory();
    console.log(user)
    
    const [
        updateJournal,
        {loading: mutationLoading,
        error: mutationError,
        data: mutationData}
    ] = useMutation(ADD_JOURNAL, {
        onCompleted: (data) => {
            console.log('This is thee data', data)
            if(data) {
                history.push('/editor/' + data?.addJournal.id)
            }
        }
    });

    const AddJournal =  () => {
        updateJournal({
            variables: {
                googleId: userAccount
            }
        })
    }
    return (
    <Layout>
    <Box flex responsive direction="row-responsive" alignContent="between" gap="large" margin="large">
        <Box responsive margin={{left: "large"}} justify="between" flex direction="row-responsive" gap="small" size="xsmall" background="light-1" height="fit-content"  round pad="large">
            <Avatar style={{textAlign: "center"}} size="xlarge" src={user.imageUrl} />

            <Box direction="column" justify="between" gap="xsmall">
            <Text size="xlarge" weight="bold" color="brand" textAlign="center">
               Hello, {user.name}
            </Text>
            <Box pad="large">
            <Button
            size="small" 
            color="neutral-1" 
            label="New Journal"
            icon={ <Add/>  } 
            tip="Add a new Journal"
            onClick={AddJournal}
            />
            </Box>
           
            </Box>
        </Box>
        <Box direction="column" justify="center" width="large" align="center"  animation="slideRight"  round="small" background="light-1" flex elevation="small" >
            <Text size="large" margin="small" color="neutral-4"> Calendar</Text>
            <Clock  type="digital" hourLimit= "12" /> 
            <Calendar
            size="small"
            daysOfWeek={true}
            background="brand"
            date={(new Date()).toISOString()}
            onSelect={(date) => {
                alert(date)
            }}
            />   
        </Box>

    </Box>
    </Layout>
    
        
    )

}
