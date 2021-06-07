import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import jwt_decode from 'jwt-decode';
import { Link, Route } from 'react-router-dom'
import Icon from '../Picture/emtryImage.png'
import '../App.css'
import { Card, Button, CardImg } from 'react-bootstrap'
import { FetchContext } from '../../FetchContext';

function Mainpage() {
    const fetch = useContext(FetchContext);
    const auth = useContext(AuthContext);
    var { token } = auth.authState;
    var decoded = token ? jwt_decode(token) : null;
    var role = decoded ? decoded.role : "noLogin";
    const [listHotel, setListhotel] = useState([])



    useEffect(() => {
        fetch.authAxios('/owner/loadPicture/'+decoded.id)
        .then(res => { setListhotel(res.data) })
        .then(() => { console.log(listHotel) })
        
    }, [listHotel])

    const styleStatus = (status) => {

        if (status === 'public') {
            return { color: "white", backgroundColor: "#12B42B", textAlign: 'center' }
        }
        else if (status === 'wait') {
            return { color: "white", backgroundColor: "#EAB405", textAlign: 'center' }
        }
        else if (status === 'edit') {
            return { color: "white", backgroundColor: "#0D8ECC", textAlign: 'center' }
        }
        else {
            return { color: "white", backgroundColor: "red", textAlign: 'center' }

        }

    }

    const hotellist = listHotel.map(item => {
        console.log(item);
        return (



            <Card style={{ margin: "10px", width: '15rem' }} >
                <Card.Header style={styleStatus(item.status)}>{item.status}</Card.Header>

                <Link to={`/user/UpdateHotel/${item._id}`}>
                    <Card.Img variant="top" src={item.images.length === 0 ? Icon : item.images[0].sourceBase64} height="130" />
                </Link>

                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                    {"ที่อยู่ : " + item.address}

                </Card.Text>
                <Card.Text>
                    {"คำอธิบาย : " + item.shortDetail}
                </Card.Text>

            </Card>
        )
    })

    return (
        <div style={{margin: "5rem 0rem 0rem"}}>
            {(!decoded) && <Redirect to='/login' />}
            {(role === "admin") && <Redirect to='/admin' />}

            <div className="d-flex align-content-end flex-wrap bd-highlight example-parent" >
                {hotellist}





            </div>
            <Link to="/user/insertHotel">
                <Button>เพิ่มโรงแรม</Button>

            </Link>




        </div>
    )
}

export default Mainpage