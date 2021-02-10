import React from 'react';
import {Card, CardHeader, CardFooter, Button} from 'grommet';
import {Google} from 'grommet-icons';
import { useHistory } from 'react-router-dom';

export  const Login = (props) => {
    const history = useHistory();
    const HandleClick = () => {
        history.push('/dashboard');
    }
    return (
        <Card  height="" width="medium" background="light-1">
                <CardHeader pad="medium" >Login to start Your journal</CardHeader>
            <CardFooter flex  pad={{horizontal: "small"}} background="light-2">   
                <Button
                alignSelf="center"
                label="Login to google"
                icon={<Google color="red" />}
                margin="small"
                hoverIndicator
                onClick={HandleClick}
            />
            </CardFooter>
        </Card>
    )
}