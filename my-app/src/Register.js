import React, { useState, useEffect, useContext } from 'react'
import { Button, Row, Col, Card, Container, ListGroup, Form, Navbar, Nav, Table, Modal, ModalBody, FormGroup, Image, Spinner, ModalDialog } from 'react-bootstrap';
import axios from 'axios';
import logo from './logohotel4.png'
import successImg from './picture/success.png'
import failImg from './picture/fail.png'
import { Redirect } from 'react-router-dom';
// import bcrypt, { hash } from 'bcryptjs'
function Register() {
    const [data, setdata] = useState({ id: '', pass: '', confirmpass: '' })
    const [popup, setpopup] = useState('')
    const [registerStatus, setRegisterStatus] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);

    const send = () => {
        async function regis() {
            const dataUser = data;
            if (data.pass === data.confirmpass) {
                try {
                    const { data } = await axios.post('/user/register', { id: dataUser.id, password: dataUser.pass });
                    let { user } = data;
                    console.log(user)
                    setShow2(true)
                    setpopup("DontHave")

                } catch (error) {
                    console.log(error);
                    setShow1(true)
                    setpopup("Have")
                }
            }
        }
        regis();
    }

    function g() {
        console.log(popup)

        if (popup === "Have") {
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

                    <p style={{ textAlign: "center" }}>มีบัญชีนี้อยู่ในระบบอยู่แล้ว</p>
                    <Button variant="success" size="md" onClick={() => { setShow1(false) }}>ตกลง</Button>
                </Modal>
            )
        }
        else if (popup === "DontHave") {
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
                    <p style={{ textAlign: "center" }}>สมัครสมาชิกสำเร็จ</p>
                    <Button variant="success" size="lg" onClick={() => { setShow2(false); setRegisterStatus(true) }}>ตกลง</Button>
                </Modal>
            )
        }
        else {
            return (<div></div>)
        }
    }





    return (
        <div>
            {(registerStatus) && <Redirect to='/login' />}
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

                    <Row className="justify-content-center">
                        <Col md={4}>
                            <Form.Group >
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password" value={data.confirmpass} onChange={e => setdata({ ...data, confirmpass: e.target.value })} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="d-flex justify-content-center" style={{ margin: "10px" }}>
                        <Col className="d-flex justify-content-end" md={4}>
                            <Button variant="success" onClick={send}>สมัครสมาชิก</Button>
                        </Col>
                    </Row>



                </Container>
            </Form>
        </div>
    )
}

export default Register