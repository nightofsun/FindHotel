import React, { useState, useEffect, useContext } from 'react'
import { Button, Row, Col, Card, Container, ListGroup, Form, Navbar, Nav, Table, Modal, ModalBody, FormGroup, Image, Spinner, ModalDialog } from 'react-bootstrap';
import axios from 'axios';
import logo from './logohotel4.png'
import successImg from './picture/success.png'
import failImg from './picture/fail.png'
// import bcrypt, { hash } from 'bcryptjs'
import { Redirect } from 'react-router-dom';
import { AuthContext } from './AuthContext';
function Login() {
    const authContext = useContext(AuthContext);

    const [data, setdata] = useState({ id: '', pass: ''})
    const [popup, setpopup] = useState('')
    const [loginStatus, setLoginStatus] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);

    const send = () => {
        async function regis() {
            const dataUser = data;

            try {
                const { data } = await axios.post('/user/signin', { id: dataUser.id, password: dataUser.pass });
                let { user } = data;
                console.log(user);
                let context = {
                    token: user.token,
                    id: user.id,
                    expriseAt: new Date().getTime() + user.expriseIn
                }
                authContext.setAuthState(context);
                setShow2(true);
                setpopup("Have");

            } catch (error) {
                console.log(error);
                setShow1(true);
                setpopup("DontHave");
            }

        }
        regis();
    }

    function g() {
        //console.log(popup)

        if (popup === "DontHave") {
            return (
                <Modal
                    size="md"
                    show={show1}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header >
                        <Modal.Title>แจ้งเตือน</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="d-flex justify-content-center">
                        <Image src={failImg} style={{ height: "10rem", width: "10rem" }} />

                    </Modal.Body>

                    <p style={{ textAlign: "center" }}>เข้าสู่ระบบล้มเหลว กรุณาตรวจสอบ UserName และ Password</p>
                    <Button variant="success" size="md" onClick={() => { setShow1(false) }}>ตกลง</Button>
                </Modal>
            )
        }
        else if (popup === "Have") {
            return (
                <Modal
                    size="md"
                    show={show2}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header >
                        <Modal.Title>แจ้งเตือน</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="d-flex justify-content-center">
                        <Image src={successImg} style={{ height: "10rem", width: "10rem" }} />

                    </Modal.Body>
                    <p style={{ textAlign: "center" }}>เข้าสู่ระบบสำเร็จ</p>
                    <Button variant="success" size="lg" onClick={() => { setShow2(false);setLoginStatus(true) }}>ตกลง</Button>
                </Modal>
            )
        }
        else {
            return (<div></div>)
        }
    }





    return (
        <div>
            {(loginStatus) && <Redirect to='/user' />}
            <div>
                {g()}
            </div>

            <Form >
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <Image src={logo} fluid />
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col md={4}>
                            <Form.Group >
                                <Form.Label>UserName</Form.Label>
                                <Form.Control type="text" placeholder="EnterUsername" value={data.id} onChange={e => setdata({ ...data, id: e.target.value })} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col md={4}>
                            <Form.Group >
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={data.pass} onChange={e => setdata({ ...data, pass: e.target.value })} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="d-flex justify-content-center" style={{ margin: "10px" }}>
                        <Col className="d-flex justify-content-end" md={4}>
                            <Button variant="success" onClick={send}>เข้าสู่ระบบ</Button>
                        </Col>
                    </Row>



                </Container>
            </Form>
        </div>
    )
}

export default Login