import React, { useState, useEffect, useCallback, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from './AuthContext';
import { FetchContext } from './FetchContext';
import jwt_decode from 'jwt-decode';
import { Button, Row, Col, Card, Container, ListGroup, Form, Navbar, Nav, Table, Modal, ModalBody, FormGroup, Image, Spinner } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
const Admin = () => {
    const auth = useContext(AuthContext);
    const fetch = useContext(FetchContext);
    var { token } = auth.authState;
    var decoded = token ? jwt_decode(token) : null;
    var role = decoded ? decoded.role : "noLogin";
    const [data, setdata] = useState({})
    const [datapopup, setdatapopup] = useState({})
    const [show, setshow] = useState(false)
    const [image, setimage] = useState({});

    useEffect(() => {
        fetch.authAxios('/admin/getAllData')
            .then(res => { setdata(res.data) })
    }, [data])

    function whenClick(num_id_for_popup) {

        const json_num_id_for_popup = { id: num_id_for_popup }
        //console.log(jsonnum)

        fetch.authAxios('/admin/popup', {
            method: 'POST',
            data: json_num_id_for_popup,
        })
        // .then(res=>console.log(res));
        .then(res => { setdatapopup(res.data[0]); setimage(res.data[0].images) })
        setshow(true)
    }

    function Accept(num_id_for_accept) {
        console.log(num_id_for_accept)
        const json_num_id_for_accept = { id: num_id_for_accept }
        fetch.authAxios('/admin/accept', {
            method: 'POST',
            data: json_num_id_for_accept,
        })
    }
    function Deny(num_id_for_deny) {
        console.log(num_id_for_deny)
        const json_num_id_for_deny = { id: num_id_for_deny }
        fetch.authAxios('/admin/del', {
            method: 'POST',
            data: json_num_id_for_deny,
        })
    }
    let MapData = () => {
        return (
            <div style={{ margin: "1rem 1rem 1rem" }}>
                <Table striped bordered hover style={{ textAlign: "center" }}>
                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>โรงแรม</th>
                            <th>ชื่อผู้ใช้</th>
                            <th>ยกเลิก / ยอมรับ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((data_map_table) => (

                            <tr key={data_map_table.id} >

                                <td scope="row" data-label="ลำดับ" >
                                    <div onClick={() => { whenClick(data_map_table._id) }}>{data_map_table._id}</div>
                                </td>

                                <td scope="row" data-label="โรงแรม">
                                    <div onClick={() => { whenClick(data_map_table._id) }}>{data_map_table.name}</div>
                                </td>

                                <td scope="row" data-label="ชื่อผู้ใช้">
                                    <div onClick={() => { whenClick(data_map_table._id) }}>{data_map_table.owner}</div>
                                </td>
                                <td scope="row" data-label="ยกเลิก / ยอมรับ">
                                    <div ><Button variant="danger" onClick={() => { Deny(data_map_table._id) }}>Deny</Button> <Button variant="success" onClick={() => { Accept(data_map_table._id) }}>Accept</Button></div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </Table >
            </div>

        )
    }

    function Map_Image_To_Popup() {
        return (
            <div>
                {(image && image.length > 0) ?

                    <div>

                        {image.map((tod) => (

                            <img src={`${tod}`} style={{ margin: '0.5rem', width: '300px', height: "200px" }} class="img-fluid" />

                        ))}

                    </div>

                    : <div><h></h></div>
                }
            </div>
        )
    }

    function Popup() {
        // console.log(datapopup)
        return (
            <Modal
                size="xl"
                show={show}
                onHide={() => { setshow(false) }}
                dialogClassName="modal-90w"
                aria-labelledby="example-modal-sizes-title-xl"
            >
                <Modal.Body className="show-grid">
                    <Container fluid style={{ textAlign: "center" }}>

                        <Form style={{ backgroundColor: "#F3F3F3" }}>

                            <Row>
                                <Col style={{ fontSize: "30px" }}>{datapopup.name}</Col>
                            </Row>

                            <Row>
                                <Col>
                                    {Map_Image_To_Popup()}
                                </Col>
                            </Row>

                            <Row>
                                <Col style={{ fontSize: "20px" }}>รูปภาพ</Col>
                            </Row>

                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Form.Label>Hotel Name</Form.Label>
                                        <Form.Control value={datapopup.name} className="list" style={{ textAlign: "center" }}></Form.Control>
                                    </FormGroup>
                                </Col>

                                <Col>
                                    <FormGroup>
                                        <Form.Label>District</Form.Label>
                                        <Form.Control value={datapopup.district} className="list" style={{ textAlign: "center" }}></Form.Control>
                                    </FormGroup>
                                </Col>

                                <Col>
                                    <FormGroup>
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control value={datapopup.location} className="list" style={{ textAlign: "center" }}></Form.Control>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Form.Label>Bed Type</Form.Label>
                                        <Form.Control value={datapopup.bedType} className="list" style={{ textAlign: "center" }}></Form.Control>
                                    </FormGroup>
                                </Col>

                                <Col>
                                    <FormGroup>
                                        <Form.Label>Nearby Location</Form.Label>
                                        <Form.Control value={datapopup.landMark} className="list" style={{ textAlign: "center" }}></Form.Control>
                                    </FormGroup>
                                </Col>

                                <Col>
                                    <FormGroup>
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control value={datapopup.price} className="list" style={{ textAlign: "center" }}></Form.Control>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Form.Label>Other</Form.Label>
                                        <textarea value={datapopup.description} class="form-control" rows="7"  ></textarea>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button variant="success" size="lg" onClick={() => { setshow(false) }}>กลับ</Button>
                        </Form>
                    </Container>
                </Modal.Body>

            </Modal>
        )
    }
    return (
        <div>
             {(!decoded) && <Redirect to='/login' />}
            {(role === "user") && <Redirect to='/user' />}
            <div>
                <div>{Popup()}</div>
                {(data && data.length > 0) ?
                    MapData()
                    :
                    <div>
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                }
            </div>
        </div>
    )
}

export default Admin
