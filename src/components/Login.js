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

function Login() {
    const history = useHistory();
    const [creds, setCreds] = useState({ nickname: '' });
    const [showLoading, setShowLoading] = useState(false);

    const onChange = (e) => {
        e.persist();
        setCreds({...creds, [e.target.name]: e.target.value});
    }

    const login = (e) => {
        e.preventDefault();
        setShowLoading(true);
        alert('not implemented')
        history.push('/chat');
    };

    return (
        <div>
            {showLoading &&
                <Spinner color="primary" />
            }
            <Jumbotron>
                <Form onSubmit={login}>
                    <FormGroup>
                        <Label>Username</Label>
                        <Input type="text" name="nickname" id="nickname" placeholder="Enter Your Username" value={creds.nickname} onChange={onChange} />
                        <Label>Password</Label>
                        <Input type="text" name="nickname" id="nickname" placeholder="Enter Your Password" value={creds.nickname} onChange={onChange} />
                    </FormGroup>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </Jumbotron>
        </div>
    );
}

export default Login;