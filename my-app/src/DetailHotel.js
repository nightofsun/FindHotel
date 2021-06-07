import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Row, Col, Card, Container, ListGroup, Form, Navbar, Nav, Table, Modal, ModalBody, FormGroup, Image, Spinner,Carousel } from 'react-bootstrap';

//import detail from './testDetail';
const DetailHotel = ({ match }) => {
    let history = useHistory();
    const [detail, setDetail] = useState([]);
    useEffect(() => {
        fetch('/hotel/detail/' + match.params.id)
            .then(res => res.json())
            .then(res => {
                setDetail(res)
            });
    }, []);
    const imgList = () =>{
        let list = detail[0].images.map(img =>{
            return (
                <Carousel.Item interval={3000}>
                    <img src={img} style={{ height: "25rem", width: "40rem" }} />
                </Carousel.Item>
            )
        })
        return list;
    }
    const showDetail = () => {
        console.log(detail)
        return (
            <>
                <Container>
                    <Row style={{ blockSize: "1.5em" }}>

                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center" >
                            <h1>
                                {`โรงแรม ${detail[0].name}`}
                            </h1>
                        </Col>

                    </Row>
                    <Row className="justify-content-center">
                        <Col md={6}>
                        <Carousel style={{boxShadow: "5px 5px 5px #888888", WebkitBoxShadow: "5px 5px 5px #888888", MozBoxShadow: "5px 5px 5px #888888" }}>{imgList()}</Carousel>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center" style={{ margin: "0.5em 0em 0.5em" }}>
                            <h2>รูปภาพ</h2>
                        </Col>

                    </Row>
                    <Row>
                        <Col style={{ margin: "0.5em 0.5em 0.5em 0em", background: "#ffffff" }}>
                            {detail[0].owner}
                        </Col>
                        <Col style={{ margin: "0.5em 0.5em 0.5em", background: "#ffffff" }}>
                            {detail[0].district}
                        </Col>
                        <Col style={{ margin: "0.5em 0em 0.5em 0.5em", background: "#ffffff" }}>
                            {detail[0].location[0] + "," + detail[0].location[1]}
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ margin: "0.5em 0.5em 0.5em 0em", background: "#ffffff" }}>
                            {detail[0].bedType}
                        </Col>
                        <Col style={{ margin: "0.5em 0.5em 0.5em", background: "#ffffff" }}>
                            {"ใกล้กับ" + detail[0].landMark}
                        </Col>
                        <Col style={{ margin: "0.5em 0em 0.5em 0.5em", background: "#ffffff" }}>
                            {detail[0].price} บาทต่อคืน
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-start" style={{ margin: "0.5em 0em 0.5em", background: "#ffffff" }}>
                            ที่อยู่ {detail[0].address}
                        </Col>

                    </Row>
                    <Row>
                        <Col style={{ margin: "0.5em 0em 0.5em", background: "#ffffff" }}>
                            {detail[0].description}
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center" style={{ margin: "0.5em 0em 10em" }}>
                            <Button variant="success" onClick={() => history.goBack()} className="w-20 p-auto" >กลับ</Button>

                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
    return (
        <>
            {(detail && detail.length > 0) ? <div>{showDetail()}</div> : <h1>Loading...</h1>}
        </>
    )


}
export default DetailHotel;