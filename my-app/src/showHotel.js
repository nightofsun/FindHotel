import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const ShowHotel = ({hotel,page})=>{
    const [searchKeyword, setSearchKeyword] = useState('');
    const onChang = (e) => {
        //console.log(e);
        setSearchKeyword(e);
    }
    let temp = searchKeyword;
    var test = '';
    const hotellist = () => {
        let hoteldata = hotel.list.map(item => {
            return (
                <Link to={`/detail/${item._id}`}>
                    <div key={item.key}>
                        <img srcSet={`data:image/jpeg;base64,${item.images[0]}`} sizes="(max-width: 120px)" className="imgShow" />
                        <div className="name">{item.name}</div>
                        <div className="address">{item.address}</div>
                        <div className="shortDetail">{item.shortDetail}</div>
                    </div>
                </Link>
            )
        })
        return hoteldata;
    }
    const search = () => {
        console.log(hotel);
    }
    const filter = () => {
        console.log('gofilter');
    }
    const nextPage = () => {
        console.log("Next");
        return `/home/${parseInt(page) + 1}`;
    }
    const preventPage = () => {
        return `/home/${parseInt(page) - 1}`
    }
    const lastPage = () => {
        return `/home/${hotel.totalPage}`
    }
    const firstPage = () => {
        return "/home/1"
    }
    const showHotel = () => {
        return (
            <>
                <input type="text" value={temp} placeholder='Plese pass keyword!!' onChange={(e) => onChang(e.target.value)} />
                <button id='btnSearch' onClick={() => search()}>ค้นหา</button>
                <button id='btnFilter' onClick={() => filter()}>ตัวกรอง</button>
                <h1>รายชื่อโรงแรม</h1>
                <h2>หน้าที่ {page} จาก {hotel.totalPage} หน้า</h2>
                <div className="hotelList">{hotellist()}</div>
                <Link to={firstPage()}>
                    {parseInt(page) === 1 ? null : <button id='btnFirst'>หน้าแรก</button>}

                </Link>
                <Link to={preventPage()}>
                    {parseInt(page) === 1 ? null : <button id='btnPrevent' >ก่อนหน้า</button>}
                </Link>

                <Link to={nextPage()}>
                    {parseInt(page) === hotel.totalPage ? null : <button id='btnNext' >ต่อไป</button>}
                </Link>
                <Link to={lastPage()}>
                    {parseInt(page) === hotel.totalPage ? null : <button id='btnLast' >สุดท้าย</button>}

                </Link>

            </>
        )
    }
    return(
        <>
        {(hotel.totalPage>0)?showHotel():<h1>Loading....</h1>}
        </>
    )
}
export default ShowHotel;