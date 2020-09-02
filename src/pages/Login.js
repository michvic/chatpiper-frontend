import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import {
    Jumbotron,
    Spinner,
    Form,
    Button,
    FormGroup, 
    Label, 
    Input
} from 'reactstrap';

import {signin} from '../utils/auth'
import api from '../utils/api'

function Login() {
    const history = useHistory();
    const [creds, setCreds] = useState({ username: '', password:'' });
    const [showLoading, setShowLoading] = useState(false);

    const onChange = (e) => {
        e.persist();
        setCreds({...creds, [e.target.name]: e.target.value});
    }

    const login = async (e) => {
        e.preventDefault();
        setShowLoading(true);
        const {data} = await api.post('/users', creds)
        signin(data.token);
        console.log(data)
        alert(data.message)
        history.push('/chat');
    };

    return (
        <div>
           
            <Jumbotron>
                <Form onSubmit={login}>
                    <FormGroup>
                        <Label>Username</Label>
                        <Input type="text" name="username" id="username" placeholder="Enter Your Username" value={creds.username} onChange={onChange} />
                        <Label>Password</Label>
                        <Input type="password" name="password" id="password" placeholder="Enter Your Password" value={creds.password} onChange={onChange} />
                    </FormGroup>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
                {showLoading &&
                <Spinner color="primary" />
            }
            </Jumbotron>
        </div>
    );
}

export default Login;