import React, { useState, useEffect, useContext } from 'react'
import { Redirect, useParams, Link } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import jwt_decode from 'jwt-decode';
import Icon from '../Picture/emtryImage.png'
import '../App.css'
function VeiwHotel() {
    const auth = useContext(AuthContext);
    var { token } = auth.authState;
    var decoded = token ? jwt_decode(token) : null;
    var role = decoded ? decoded.role : "noLogin";
    const params = useParams()
    const [listHotel, setListhotel] = useState([])


    async function loadPic() {

        const res = await fetch(`/owner/loadViewhotel/${params.id}`);
        res.json()
            .then(res => setListhotel(res))

    }

    useEffect(() => {

        loadPic();

    }, [])

    function deletePost() {
        fetch(`/owner/deleteHotel/${params.id}`)
            .then(res => console.log(res))
    }

    function Picture(pic) {

        return pic.map(e => <div > <img key={e} srcSet={e.sourceBase64} width="150" height="130" style={{ margin: "6px" }} /></div>)
    }

    const hotellist = listHotel.map(item => {
        return (

            <div>
                <div key={item._id} style={{ display: "flex", flexdirection: "row", flexwrap: "wrap", }} >

                    {item.images.length === 0 ? <img srcSet={Icon} width="150" height="130" /> : Picture(item.images)}

                </div>
                <div className="name">{item.name}</div>
                <div className="address">{item.description}</div>
                <div className="shortDetail">{item.shortDetail}</div>
            </div>
        )
    })


    return (
        <div>

            {(!decoded) && <Redirect to='/login' />}
            {(role === "admin") && <Redirect to='/admin' />}
            {hotellist}

            <Link to={`/user/UpdateHotel/${params.id}`}>
                <button >updatePost</button>
            </Link>

            <Link to="/user">
                <button onClick={deletePost}>deletePost</button>
            </Link>



        </div>
    )
}

export default VeiwHotel
