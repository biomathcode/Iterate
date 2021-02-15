import React, { useState, useContext } from 'react';

import { AuthContext} from '../../contexts/AuthContext/AuthContext';
import {GlobalContext} from '../../contexts/GlobalContext/globalcontext';

import {useParams} from 'react-router-dom';

import {Box, Clock, Calendar,Button, Avatar, Text, Heading, } from 'grommet';
import Layout from '../Layout/Layout';
import { Add,BladesHorizontal } from 'grommet-icons';
import { useHistory } from 'react-router-dom';
import { gql, useMutation, useQuery } from '@apollo/client';
import './Dashboard.css';

import * as dayjs from 'dayjs';

//getting the query
const GET_JOURNAL_BY_USER = gql`
  query getJournalByUser($googleId: String!){
      journalsByuser(googleId: $googleId) {
        createdAt,
        completed,
        id
      } 
  }
`




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

export default function Dashboard() {

    // const [refresh, setRefresh] = useState(false);
    const {UserLogOut} = useContext(AuthContext);
    const {addJournal} = useContext(GlobalContext);

    const user = JSON.parse(localStorage.getItem('user'))

    const userAccount = user?.googleId

    const { loading, error, data, refetch } = useQuery(GET_JOURNAL_BY_USER, {
        variables: {
          googleId: userAccount}
      });

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
    const authResult = new URLSearchParams(window.location.search); 
    const refresh = authResult.get('refresh')
    if(refresh) {
        refetch();      
    }
    return (
    <Layout>
    <Box flex responsive  direction="row-responsive" alignContent="around" gap="large" pad="small">
        <Box  height="small" justify="around" flex direction="row-responsive" gap="small"  background="light-1" round pad="large">
        <Box responsive size="small" direction="row" justify="around" gap="small">
            <Avatar size="medium"  src={user.imageUrl} />
            <Text size="large" weight="bold" color="brand" textAlign="center">
               Hello, {user.name}
            </Text>
        </Box>
        <Box direction="column" justify="between" gap="xsmall" margin={{top: 'small'}} pad="large">
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
        <Box className="dashcontainer" background="light-1">
            {data && data.journalsByuser.map((journal, index) => {
                const date = journal.createdAt
                return (
                    <Box key={journal.id}>
                        <Box onClick={() => {history.push('/editor/' + journal.id)}}  className={journal.completed ? "complete" : "incomplete"}></Box>
                        <Text size="small">{dayjs(date).format("DD,MMM")}</Text>
                    </Box>
                )
            })}
        </Box>

    </Box>
    </Layout>
    
        
    )

}
