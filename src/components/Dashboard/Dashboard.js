import React, { useState } from 'react';
import {Box, Clock, Calendar,Button, Avatar, Text} from 'grommet';
import Layout from '../Layout/Layout';
import { Add } from 'grommet-icons';

export default function Dashboard(props) {
    const UserInfo = {
        name: "Pratik Sharma",
        url: "https://lh3.googleusercontent.com/ogw/ADGmqu85UDw9ZwTeLCiyiLJfQ3pvrxWsc8qwWzEGlt4k1w=s83-c-mo"
    }
    return (
    <Layout>
    <Box flex responsive direction="row-responsive" alignContent="between" gap="large" margin="large">
        <Box responsive justify="between" flex direction="row-responsive" gap="small" size="xsmall" background="light-1" height="fit-content"  round pad="large">
            <Avatar style={{textAlign: "center"}} size="xlarge" src={UserInfo.url} />

            <Box direction="column" justify="between" gap="xsmall">
            <Text size="xlarge" weight="bold" color="brand" textAlign="center">
               Hello, {UserInfo.name}
            </Text>
            <Box pad="large">
            <Button
            size="small" 
            color="neutral-1" 
            label="New Journal"
            icon={<Add/>} 
            tip="Add a new Journal"
            />
            </Box>
            
            </Box>
            
            
        </Box>
        <Box animation="slideRight" margin="large" flex >
            <Calendar
            size="small"
            daysOfWeek={true}
            date={(new Date()).toISOString()}
            onSelect={(date) => {
            }}
            />   
        </Box>

    </Box>
    </Layout>
    
        
    )

}
