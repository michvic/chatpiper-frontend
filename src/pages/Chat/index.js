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

function Chat(props) {
    const [chats, setChats] = useState([]);
    const [users, setUsers] = useState([]);
    const [nickname, setNickname] = useState('');
    const [newchat, setNewchat] = useState({username: '', text: '', date: '' });
    const history = useHistory();

    const [socket, setSocket] = useState(null);
    const [socketConnected, setSocketConnected] = useState(false);
    const [dt, setDt] = useState('');

    useEffect(() => {
        setSocket(io('http://localhost:4000'));
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.on('previousMessages', chats => {
            setChats(chats)
        })

        socket.on('receivedMessage', chat => {
            console.log(chat)
            chats.push(chat)
        })

        socket.on('connect', () => {
            setSocketConnected(socket.connected);
        });
        socket.on('disconnect', () => {
            setSocketConnected(socket.connected);
        });

        socket.on("getDate", data => {
            setDt(data);
        });

    }, [socket,chats]);

    const onChange = (e) => {
        e.persist();
        setNewchat({ ...newchat, [e.target.name]: e.target.value });
    }

    const submitMessage = (e) => {
        e.preventDefault();
        const chat = newchat;
        chat.username = nickname;
        chat.date = Moment(new Date()).format('DD/MM/YYYY HH:mm:ss');
        socket.emit('sendMessage', chat)
        setNewchat({ username: '', text: '', date: ''});
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
                                    {item.type === 'join' || item.type === 'exit' ?
                                        <div className="ChatStatus">
                                            <span className="ChatDate">{item.date}</span>
                                            <span className="ChatContentCenter">{item.text}</span>
                                        </div> :
                                        <div className="ChatMessage">
                                            <div className={`${item.username === nickname ? "RightBubble" : "LeftBubble"}`}>
                                                {item.username === nickname ?
                                                    <span className="MsgName">Me</span> : <span className="MsgName">{item.username}</span>
                                                }
                                                <span className="MsgDate"> at {item.date}</span>
                                                <p>{item.text}</p>
                                            </div>
                                        </div>
                                    }
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