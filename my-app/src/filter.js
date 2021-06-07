import React, { useState } from 'react';
import { Button, Row, Col, Card, Container, ListGroup, Form, Navbar, Nav, Table, Modal, ModalBody, FormGroup, Image, Spinner, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImgLandMark from './picture/ImageFilter.js';
import { Link, useHistory } from 'react-router-dom';
const Filter = ({ match }) => {
    console.log(match.params.searchKey)
    const land = () => {
        let buttonState = [];
        console.log(match.params.landmark)
        let tmp = ["วัดพระธาตุลำปางหลวง", "วัดพระเจดีย์ซาวหลัง", "อุทยานแห่งชาติดอยขุนตาล", "ถ้ำผาไทย", "น้ำตกแจ้ซ้อน", "กาดกองต้า", "โรงไฟฟ้าแม่เมาะ", "วัดพระพุทธบาทปู่ผาแดง", "เขื่อนกิ่วลม", "หล่มภูเขียว", "ทั้งหมด"];
        for (let i = 0; i < tmp.length; i++) {
            if (tmp[i] === match.params.landmark) {
                buttonState.push('info');
            }
            else {
                buttonState.push('success');
            }
        }
        return buttonState;

    }
    const [district, setDistrict] = useState(match.params.district);
    const [bed, setBed] = useState(match.params.bed);
    const [lowprice, setLowprice] = useState(match.params.lowPrice);
    const [highprice, setHighprice] = useState(match.params.highPrice);
    const [landMark, setLandMark] = useState(match.params.landmark);
    const [landMarkState, setLandState] = useState(land());
    const history = useHistory();

    const enter = () => {
        console.log(landMark)
        return `/homepage/filter/${district}/${bed}/${lowprice}/${highprice}/${landMark}/${match.params.searchKey}/1`
    }
    const choseLandMark = (nameLandmark, num) => {
        setLandMark(nameLandmark);
        let tmp = [];
        for (let i = 0; i < landMarkState.length; i++) {
            if (i === num) {
                tmp.push('info');
            }
            else {
                tmp.push('success');
            }
        }
        console.log(tmp)
        setLandState(tmp);
    }
    return (
        <>
            <Container>
                <Row style={{ blockSize: "1em" }}>

                </Row>
                <Row>
                    <Col className="d-flex justify-content-start" style={{ margin: "1em 0em 0.5em" }}>
                        <h1 style={{ fontWeight: "bold" }}>ตัวกรอง</h1>
                    </Col>
                </Row>
                <Row>

                    <Col style={{ margin: "0em 0em 0em" }}>
                        <h2 style={{ color: "#117cbb" }}>อำเภอ</h2>
                    </Col>
                    <Col>
                        <DropdownButton
                            as={ButtonGroup}
                            key='district'
                            id='dropdown-district'
                            variant='success'
                            title={district}
                            className="w-100 p-auto"
                        >
                            <Dropdown.Item onClick={() => setDistrict('ทั้งหมด')}>-</Dropdown.Item>
                            <Dropdown.Item onClick={() => setDistrict('เมืองลำปาง')}>เมืองลำปาง</Dropdown.Item>
                            <Dropdown.Item onClick={() => setDistrict('ห้างฉัตร')}>ห้างฉัตร</Dropdown.Item>
                            <Dropdown.Item onClick={() => setDistrict('วังเหนือ')}>วังเหนือ</Dropdown.Item>
                            <Dropdown.Item onClick={() => setDistrict('เมืองปาน')}>เมืองปาน</Dropdown.Item>
                            <Dropdown.Item onClick={() => setDistrict('แจ้ห่ม')}>แจ้ห่ม</Dropdown.Item>
                            <Dropdown.Item onClick={() => setDistrict('งาว')}>งาว</Dropdown.Item>
                            <Dropdown.Item onClick={() => setDistrict('แม่เมาะ')}>แม่เมาะ</Dropdown.Item>
                            <Dropdown.Item onClick={() => setDistrict('แม่ทะ')}>แม่ทะ</Dropdown.Item>
                            <Dropdown.Item onClick={() => setDistrict('เกาะคา')}>เกาะคา</Dropdown.Item>
                            <Dropdown.Item onClick={() => setDistrict('สบปราบ')}>สบปราบ</Dropdown.Item>
                            <Dropdown.Item onClick={() => setDistrict('เสริมงาม')}>เสริมงาม</Dropdown.Item>
                            <Dropdown.Item onClick={() => setDistrict('เถิน')}>เถิน</Dropdown.Item>
                            <Dropdown.Item onClick={() => setDistrict('แม่พริก')}>แม่พริก</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                    <Col>
                        <h2 style={{ color: "#117cbb" }}>เตียง</h2>
                    </Col>
                    <Col>
                        <DropdownButton
                            as={ButtonGroup}
                            key='bed'
                            id='dropdown-bed'
                            variant='success'
                            title={bed}
                            className="w-100 p-auto"
                        >
                            <Dropdown.Item onClick={() => setBed('ทั้งหมด')}>-</Dropdown.Item>
                            <Dropdown.Item onClick={() => setBed('เตียงเดี่ยว')}>เตียงเดี่ยว</Dropdown.Item>
                            <Dropdown.Item onClick={() => setBed('เตียงคู่')}>เตียงคู่</Dropdown.Item>

                        </DropdownButton>
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <h2 style={{ color: "#117cbb" }}>ราคาต่อคืน</h2>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <h2>ต่ำสุด</h2>
                    </Col>
                    <Col>
                        <Form.Control type='text' value={lowprice} onChange={(event) => setLowprice(event.target.value)} />
                    </Col>
                    <Col>
                        <h2>บาท</h2>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <h2>สูงสุด</h2>
                    </Col>
                    <Col>
                        <Form.Control type='text' value={highprice} onChange={(event) => setHighprice(event.target.value)} />
                    </Col>
                    <Col>
                        <h2>บาท</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2 style={{ color: "#117cbb" }}>สถานที่ใกล้เคียง</h2>
                    </Col>
                    <Col className="d-flex justify-content-end" style={{ margin: "0em 10% 0em" }}>
                        <Button variant={landMarkState[10]} onClick={() => choseLandMark("ทั้งหมด", 10)}>ทั้งหมด</Button>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <div className="buttonlist" style={{ margin: "0em 4em 0em" }}>
                            <Button variant={landMarkState[0]} onClick={() => choseLandMark("วัดพระธาตุลำปางหลวง", 0)} style={{ margin: "0.5em 0.1em 0.5em" }}>
                                <img src={ImgLandMark[0]} style={{ height: "10rem", width: "12rem" }}></img>
                                <div>วัดพระธาตุลำปางหลวง</div>
                            </Button>
                            <Button variant={landMarkState[1]} onClick={() => choseLandMark("วัดพระเจดีย์ซาวหลัง", 1)} style={{ margin: "0.5em 0.1em 0.5em" }}>
                                <img src={ImgLandMark[1]} style={{ height: "10rem", width: "12rem" }}></img>
                                <div>วัดพระเจดีย์ซาวหลัง</div>
                            </Button>
                            <Button variant={landMarkState[2]} onClick={() => choseLandMark("อุทยานแห่งชาติดอยขุนตาล", 2)} style={{ margin: "0.5em 0.1em 0.5em" }}>
                                <img src={ImgLandMark[2]} style={{ height: "10rem", width: "12rem" }}></img>
                                <div>อุทยานแห่งชาติดอยขุนตาล</div>
                            </Button>
                            <Button variant={landMarkState[3]} onClick={() => choseLandMark("ถ้ำผาไทย", 3)} style={{ margin: "0.5em 0.1em 0.5em" }}>
                                <img src={ImgLandMark[3]} style={{ height: "10rem", width: "12rem" }}></img>
                                <div>ถ้ำผาไทย</div>
                            </Button>
                            <Button variant={landMarkState[4]} onClick={() => choseLandMark("น้ำตกแจ้ซ้อน", 4)} style={{ margin: "0.5em 0.1em 0.5em" }}>
                                <img src={ImgLandMark[4]} style={{ height: "10rem", width: "12rem" }}></img>
                                <div>น้ำตกแจ้ซ้อน</div>
                            </Button>
                            <Button variant={landMarkState[5]} onClick={() => choseLandMark("กาดกองต้า", 5)} style={{ margin: "0.5em 0.1em 0.5em" }}>
                                <img src={ImgLandMark[5]} style={{ height: "10rem", width: "12rem" }}></img>
                                <div>กาดกองต้า</div>
                            </Button>
                            <Button variant={landMarkState[6]} onClick={() => choseLandMark("โรงไฟฟ้าแม่เมาะ", 6)} style={{ margin: "0.5em 0.1em 0.5em" }}>
                                <img src={ImgLandMark[6]} style={{ height: "10rem", width: "12rem" }}></img>
                                <div>โรงไฟฟ้าแม่เมาะ</div>
                            </Button>
                            <Button variant={landMarkState[7]} onClick={() => choseLandMark("วัดพระพุทธบาทปู่ผาแดง", 7)} style={{ margin: "0.5em 0.1em 0.5em" }}>
                                <img src={ImgLandMark[7]} style={{ height: "10rem", width: "12rem" }}></img>
                                <div>วัดพระพุทธบาทปู่ผาแดง</div>
                            </Button>
                            <Button variant={landMarkState[8]} onClick={() => choseLandMark("เขื่อนกิ่วลม", 8)} style={{ margin: "0.5em 0.1em 0.5em" }}>
                                <img src={ImgLandMark[8]} style={{ height: "10rem", width: "12rem" }}></img>
                                <div>เขื่อนกิ่วลม</div>
                            </Button>
                            <Button variant={landMarkState[9]} onClick={() => choseLandMark("หล่มภูเขียว", 9)} style={{ margin: "0.5em 0.1em 0.5em" }}>
                                <img src={ImgLandMark[9]} style={{ height: "10rem", width: "12rem" }}></img>
                                <div>หล่มภูเขียว</div>
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-end" style={{ margin: "1em 4em 15em" }}>
                        <div style={{ margin: "0em 0.5em 0em" }}>
                            <Link to={enter()}>
                                <Button variant='success'>ตกลง</Button>

                            </Link>
                        </div>
                        <div style={{ margin: "0em 0.5em 0em" }}>
                            <Button variant='danger' onClick={() => history.goBack()}>ยกเลิก</Button>

                        </div>
                    </Col>
                </Row>
            </Container>
            <div>
                <div>

                </div>
                <div>

                </div>
                <div>
                    <div>
                    </div>
                    <div>
                    </div>
                </div>
                <div>


                </div>
                <div>

                </div>
            </div>
        </>
    )





}

export default Filter;