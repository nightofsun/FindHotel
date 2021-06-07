import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Card, Container, ListGroup, Form, Navbar, Nav, Table, Modal, ModalBody, FormGroup, Image, Spinner, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import hotel from './hotellist';
//import pic from './test1.jpg'
const HotelContent = ({ match }) => {
    var page = match.params.page;

    if (match.params.page == null) {
        page = 1;
        //console.log("123")
    }
    const [hotel, setHotel] = useState([]);
    const filterTag = match.params
    //console.log(filterTag);
    useEffect(() => {
        fetch(`/hotel/filter/${filterTag.district}/${filterTag.bed}/${filterTag.lowprice}/${filterTag.highprice}/${filterTag.landmark}/${filterTag.searchkey}/${page}`)
            .then(res => res.json())
            .then(res => {
                setHotel(res);
                //console.log(res);
            });
    }, [hotel]);

    const [searchKeyword, setSearchKeyword] = useState('');
    const onChang = (e) => {
        //console.log(e);
        setSearchKeyword(e);
    }
    let temp = searchKeyword;
    var test = '';
    const hotellist = () => {
        //console.log(hotel[0].list)
        let hoteldata = hotel[0].list.map(item => {
            return (
                <Col style={{ margin: '0.5em 0.1em 0.5em'}}>
                    <Link to={`/detail/${item._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                        <Card style={{ width: '18rem', boxShadow: "5px 5px 5px #888888", WebkitBoxShadow: "5px 5px 5px #888888", MozBoxShadow: "5px 5px 5px #888888" }}>
                            <Image variant="top" src={`${item.images[0]}`} style={{ height: "11rem" }} />
                            <Card.Body>
                                <Card.Title style={{height: "3rem" }}>{item.name}</Card.Title>
                                <Card.Text style={{height: "5rem" }}>{item.address}</Card.Text>
                                <Card.Text style={{height: "2rem" }}>{item.shortDetail}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            )
        })
        return hoteldata;
    }
    const search = () => {
        if (searchKeyword === '') {
            return `/homepage/filter/${match.params.district}/${match.params.bed}/${match.params.lowprice}/${match.params.highprice}/${match.params.landmark}/-/1`;
        }
        else {
            return `/homepage/filter/${match.params.district}/${match.params.bed}/${match.params.lowprice}/${match.params.highprice}/${match.params.landmark}/${searchKeyword}/1`;
        }
    }
    const filter = () => {
        //console.log("filter")
        return `/filter/${match.params.district}/${match.params.bed}/${match.params.lowprice}/${match.params.highprice}/${match.params.landmark}/${match.params.searchkey}`
    }
    const nextPage = () => {
        //console.log("Next");
        return `/homepage/filter/${match.params.district}/${match.params.bed}/${match.params.lowprice}/${match.params.highprice}/${match.params.landmark}/${match.params.searchkey}/${parseInt(page) + 1}`;
    }
    const preventPage = () => {
        return `/homepage/filter/${match.params.district}/${match.params.bed}/${match.params.lowprice}/${match.params.highprice}/${match.params.landmark}/${match.params.searchkey}/${parseInt(page) - 1}`
    }
    const lastPage = () => {
        return `/homepage/filter/${match.params.district}/${match.params.bed}/${match.params.lowprice}/${match.params.highprice}/${match.params.landmark}/${match.params.searchkey}/${hotel[0].totalPage}`
    }
    const firstPage = () => {
        return `/homepage/filter/${match.params.district}/${match.params.bed}/${match.params.lowprice}/${match.params.highprice}/${match.params.landmark}/${match.params.searchkey}/1`
    }
    const showHotel = () => {
        return (
            <>
                <Container style={{ margin: "auto" }} >
                    <Row style={{ blockSize: "2em" }}>

                    </Row>
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <div style={{ display: "grid", gridTemplateColumns: "auto 100px 100px", alignItems:"center"}}>
                                <FormControl type="text" value={temp} placeholder='ค้นหา...' onChange={(e) => onChang(e.target.value)} />
                                <Link to={search()} style={{ margin: "0.5em" }}>
                                    <Button variant="success" onClick={() => setSearchKeyword('')} style={{width: "100px",margin:"0.5rem"}}>ค้นหา</Button>
                                </Link>
                                <Link to={filter()} style={{ margin: "0.5em" }}>
                                    <Button variant="success" style={{width: "100px",margin:"0.5rem"}}>ตัวกรอง</Button>
                                </Link>

                            </div>

                        </Col>
                    </Row>
                    <Row style={{ margin: "0.5em" }}>
                        <Col>
                            <h1>รายชื่อโรงแรม</h1>
                        </Col>
                        <Col style={{ margin: "1.5em 0em 0em" }}>
                            <div className="d-flex justify-content-end">
                                <h4>หน้าที่ {page} จาก {hotel[0].totalPage} หน้า</h4>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ margin: "0.5em" }}>
                        {(hotel && hotel.length > 0) ? hotellist() : <h2>Loading...</h2>}
                    </Row>
                    <Row >
                        <div className="d-flex justify-content-end" style={{ margin: "0.5em 0em 2em" }}>
                            <Link to={firstPage()}>
                                {(parseInt(page) === 1 || hotel[0].totalPage === 0) ? null : <Button variant="outline-success">หน้าแรก</Button>}

                            </Link>
                            <Link to={preventPage()}>
                                {(parseInt(page) === 1 || hotel[0].totalPage === 0) ? null : <Button variant="outline-success">ก่อนหน้า</Button>}
                            </Link>
                            <Link to={nextPage()}>
                                {(parseInt(page) === hotel[0].totalPage || hotel[0].totalPage === 0 || parseInt(page) >= hotel[0].totalPage) ? null : <Button variant="outline-success">ต่อไป</Button>}
                            </Link>
                            <Link to={lastPage()}>
                                {(parseInt(page) === hotel[0].totalPage || hotel[0].totalPage === 0 || parseInt(page) >= hotel[0].totalPage) ? null : <Button variant="outline-success">สุดท้าย</Button>}

                            </Link>
                        </div>

                    </Row>
                </Container>





            </>

        )
    }
    return (
        <>
            {(hotel && hotel.length > 0) ? <div>{showHotel()}</div> : <h1>Load</h1>}
        </>
    )
}
export default HotelContent;