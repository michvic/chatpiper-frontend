import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    Jumbotron,
    Spinner,
    Form,
    Button,
    FormGroup, 
    Label, 
    Input
} from 'reactstrap';

import "./style.css";

import {signin} from '../../service/auth'
import api from '../../service/api'

import {login} from '../../store/actions'

function Login() {
    const history = useHistory();
    const [creds, setCreds] = useState({ username: '', password:'' });
    const [showLoading, setShowLoading] = useState(false);

    const dispatch = useDispatch();
    
    const onChange = (e) => {
        e.persist();
        setCreds({...creds, [e.target.name]: e.target.value});
    }

    const subimitLogin = async (e) => {
        try {
            e.preventDefault();
            setShowLoading(true);
            const {data} = await api.post('/singin', creds)
            signin(data.token);
            dispatch(login({id:data.id, username: data.username}))
    
            history.push('/chat');
        } catch ({response}) {
            alert(response.data.error)
            setShowLoading(false)
            // history.push("/login");
            // window.location.reload();
        }
    };

    return (
        <div>
           <div className='conteiner'>
               <h1>Welcome ChatPipe</h1>
           </div>
            <Jumbotron className='conteiner'>
                <Form onSubmit={subimitLogin}>
                    <FormGroup>
                        <Label>Username</Label>
                        <Input type="text" name="username" id="username" placeholder="Enter Your Username" value={creds.username} onChange={onChange} />
                        <Label>Password</Label>
                        <Input type="password" name="password" id="password" placeholder="Enter Your Password" value={creds.password} onChange={onChange} />
                    </FormGroup>
                    <Button variant="primary" type="submit" disabled={showLoading}>
                        {showLoading ? <Spinner  color="primary" /> : "Login"}
                    </Button>
                   
                </Form>
            </Jumbotron>
        </div>
    );
}

export default Login;