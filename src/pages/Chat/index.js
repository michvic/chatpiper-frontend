
import React, { useState, useEffect } from 'react';
import {
    useHistory,
    useParams
} from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardSubtitle,
    Button,
    Form,
    InputGroup,
    Input,
    InputGroupAddon
} from 'reactstrap';

import ScrollToBottom from 'react-scroll-to-bottom';
import "./style.css";

import Moment from 'moment';
import io from 'socket.io-client'

import { useSelector, useDispatch } from "react-redux";


import api from '../../service/api'

function Chat(props) {
    const [chats, setChats] = useState([]);
    const [users, setUsers] = useState([]);
    const [nickname, setNickname] = useState('');
    const [newchat, setNewchat] = useState({ username: '', text: '', date: '' });
    const history = useHistory();

    const [socket, setSocket] = useState(null);

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);

    useEffect(() => {
        setSocket(io('http://localhost:4000'));
    }, []);

    useEffect(() => {
        
        api.get('/messages')
        .then((response) => {
            setChats(response.data.messages)
        }) 
    },[])
    useEffect( () => {
        if (!socket) return;
        setNickname(user.username)
        socket.on('fetchMessage', () => {
            api.get('/messages')
            .then(response => {
                setChats(response.data.messages)
            })
        })
    });

    const onChange = (e) => {
        e.persist();
        setNewchat({ ...newchat, [e.target.name]: e.target.value });
    }

    const submitMessage = async (e) => {
        e.preventDefault();

        socket.emit('newMessage',)
        await api.post('/messages', {
            userId: user.id,
            text: newchat.text,
            username: nickname,
            date: Moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
        })
        setNewchat({ username: '', text: '', date: '' });
    };

    return (
        <div className="Container">
            <Container>
                <Row>
                    <Col xs="4">
                        <div>
                            <Card className="UsersCard">
                                <CardBody>
                                    <CardSubtitle>
                                        <Button variant="primary" type="button" onClick={() => { }}>
                                            Exit Chat
                                        </Button>
                                    </CardSubtitle>
                                </CardBody>
                            </Card>
                            {users.map((item, idx) => (
                                <Card key={idx} className="UsersCard">
                                    <CardBody>
                                        <CardSubtitle>{item.username}</CardSubtitle>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    </Col>
                    <Col xs="8">
                        <ScrollToBottom className="ChatContent">
                            {chats.map((item, idx) => (
                                <div key={idx} className="MessageBox">

                                    <div className="ChatMessage">
                                        <div className={`${item.username === nickname ? "RightBubble" : "LeftBubble"}`}>
                                            {item.username === nickname ?
                                                <span className="MsgName">Me</span> : <span className="MsgName">{item.username}</span>
                                            }
                                            <span className="MsgDate"> at {item.date}</span>
                                            <p>{item.text}</p>
                                        </div>
                                    </div>
                            
                                </div>
                            ))}
                        </ScrollToBottom>
                        <footer className="StickyFooter">
                            <Form className="MessageForm" onSubmit={submitMessage}>
                                <InputGroup>
                                    <Input type="text" name="text" id="text" placeholder="Enter message here" value={newchat.text} onChange={onChange} />
                                    <InputGroupAddon addonType="append">
                                        <Button variant="primary" type="submit">Send</Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </Form>
                        </footer>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Chat;