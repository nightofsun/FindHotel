import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import jwt_decode from 'jwt-decode';
import {Container,Button,Form,Col,Row,Modal,Card} from 'react-bootstrap';
import Pic from '../Picture/Capture.PNG'
import Icon from '../Picture/emtryImage.png'
import { useParams, Link } from 'react-router-dom'
import { FetchContext } from '../../FetchContext';

const initialValues = {
    Namehotel: '',
      District: '',
      Location: '',
      Bedtype: '',
      Price: '',
      Address: '',
      NearbyLocation:'',
      Shortdetail: '',
      Description:''
};
const textalert = ["คุณแน่ใจว่าจะกดส่ง", "คุณแน่ใจว่าจะเก็บข้อมูลไว้เพื่อนำกลับมาแก้ไข", "คุณแน่ใจว่าจะยกเลิก","คุณแน่ใจว่าคุณจบลบทิ้ง"]



function UpdateHotel() {
    const fetch = useContext(FetchContext);
    const auth = useContext(AuthContext);
    var { token } = auth.authState;
    var decoded = token ? jwt_decode(token) : null;
    var role = decoded ? decoded.role : "noLogin";
    const params = useParams()

    const [listHotel, setListhotel] = useState([])

    const imageToBase64 = require('image-to-base64');

    const [Input, setInput] = useState(initialValues)
    const [base64Img, setBase64img] = useState([])
    const [selectImg, setSelectImg] = useState([])

    const [Status, setStatus] = useState("");
    const [IndexTextalert, setIndexTextalert] = useState(0);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => { setShow(true); }
    let idfileIndex = 0;

    const Data = {
        "uniqueId": Input.uniqueId,
        "owner": decoded.id,
            "nameHotel": Input.Namehotel,
            "district": Input.District,
            "location": Input.Location.split(","),
            "bedType": Input.Bedtype,
            "price": Input.Price,
            "address": Input.Address,
            "nearbyLocation": Input.NearbyLocation,
            "shortDetail": Input.Shortdetail,
            "description":Input.Description,
            "images": base64Img,
            "status": Status


    }

    async function loadPic() {



        const res = await fetch.authAxios(`/owner/loadViewhotel/${params.id}`)
            .then(res=>res.data)
            .then(res => {
                
               
                initialValues.uniqueId = params.id
                initialValues.Namehotel = res[0].name
                initialValues.District = res[0].district
                initialValues.Location = res[0].location[0]+","+res[0].location[1]
                initialValues.Address = res[0].address
                initialValues.Bedtype = res[0].bedType
                initialValues.Shortdetail = res[0].shortDetail
                initialValues.NearbyLocation = res[0].nearbyLocation
                initialValues.Description = res[0].description
                initialValues.Price = res[0].price
               
                setStatus(res[0].status)
                const Base64 = res[0].images


                for (let index = 0; index < Base64.length; index++) {
                    delete Base64[index]._id;

                }
             
                setBase64img(res[0].images)

              

            })
   
    }


    useEffect(() => {

        loadPic();

    }, [])
      

    

    function onChange(event) {

        const { name, value } = event.target
    
        setInput({ ...Input, [name]: value });

    }


  

    const requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(Data),
    }

    function postData() {

      
        if(base64Img.length === 0){
            setBase64img({ idfile: idfileIndex, sourceBase64: '1234' })
        }else{

        }

        let data = fetch.authAxios('/owner/updateHotel', requestOption)

            .then(response => response.data)
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        
    }


    function onChange(event) {
  
        const { name, value } = event.target
        setInput({ ...Input, [name]: value });

    }


    function mySubmitHandler() {
        handleClose()
       
         postData();
        setSelectImg([])
        setBase64img([])
        setInput(initialValues)
        
    }



    const getBase64 = file => {
        return new Promise(resolve => {
            let fileInfo;
            let baseURL = "";
           
            let reader = new FileReader();

         
            reader.readAsDataURL(file);

           
            reader.onload = () => {
                
                baseURL = reader.result;
              
                resolve(baseURL);
            };
        
        });
    };

    const imgTobase64 = (file) => {

        for (let i = 0; i < file.length; i++) {
            const idfileIndex = Math.floor((Math.random() * 10000));
            getBase64(file[i])
                .then(result => {
                    file["base64"] = result;
                    setBase64img(prev => [...prev, { idfile: idfileIndex, sourceBase64: file.base64 }])

                })
                .catch(err => {
                    console.log(err);
                });
        }

    }

    const imageHandleChange = (e) => {

        if (e.target.files) {
        

            const Base64File = imgTobase64(e.target.files)
     


        }
    };


    const renderPhotos = (soureImg) => {

     
     
        return soureImg.map(photo => {
    
            return (
                <div>
                    <Card  style={{margin: '10px' }}>
    <Card.Img variant="top" src={photo.sourceBase64 || photo.soure} key={photo.idfile} style={{ width: 200, height: 200 }} />

    <Button variant="danger" onClick={() => removeImage(photo.idfile)}>delete</Button>
  </Card>

                   </div>
            )
        })
    }

    const removeImage = (idfile) => {

        setBase64img((oldState) => oldState.filter((item) => item.idfile !== idfile));
        
        setSelectImg((oldState) => oldState.filter((item) => item.idfile !== idfile));
   

    };

    function deletePost() {
        fetch(`/owner/deleteHotel/${params.id}`)
            .then(res => console.log(res))
    }

    function Action(Do){
        
        if(Do === textalert[0]){
        
             mySubmitHandler();
        }else if(Do === textalert[1]){
        
             mySubmitHandler();
        }else if(Do === textalert[2]){
        
        }else if(Do === textalert[3]){
        
             deletePost();
        }else{
            console.log("No");
        }

    }

    const Showalert = (props) => {

    
        return (
            <Modal {...props} >

                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>

                <Modal.Body>{props.text}</Modal.Body>

                <Modal.Footer>
               
                    <Button onClick={handleClose}>
                    ยกเลิก
                </Button>
               
                <Link to="/user">

                        <Button onClick={ ()=>{ Action(props.text)}}>
                       
                        ยืนยัน
                        
                    </Button>
                    </Link>


                  

                </Modal.Footer>

            </Modal>

        )
    }



   
    
    function deletePost() {
        fetch(`/owner/deleteHotel/${params.id}`)
            .then(res => console.log(res))
    }

    const magin = {
        marginBottom:'15px'
 }
   
    return (
        <div style={{margin: "5rem 0rem 0rem"}}>
            {(!decoded) && <Redirect to='/login' />}
                  {(role === "admin") && <Redirect to='/admin' />}
        
        <Container>
            <h1 style = {{textAlign:'center'}} >แก้ไขโรงแรม</h1>
            <Row>
                <div class="image-flex">
                                  {renderPhotos(base64Img)}
                <label >
                              <img style={{ marginTop:'40px' }} src={Pic} />
                              <input type="file" style={{ display: 'none' }} multiple name="images" id="file" onChange={imageHandleChange} />

                        </label> 
                </div>
 
            </Row>

           

            <Row>


                <Col>

                    <Form.Control style={magin} type="text" placeholder="ชื่อโรงแรม" value={Input.Namehotel} name="Namehotel" onChange={onChange} />

                    <Form.Control style={magin} as="select" onChange={onChange} name="Bedtype" value={Input.Bedtype} >
                        <option>ชนิดเตียง</option>
                        <option>เตียงเดี่ยว</option>
                        <option>เตียงคู่</option>
                    </Form.Control>

        



                </Col>

                <Col>
                <Form.Control style={magin} as="select" placeholder="อำเภอ" value={Input.District} name="District" onChange={onChange} >
                                    <option>อำเภอ</option>
                                    <option>เมืองลำปาง</option>
                                    <option>เกาะคา</option>
                                    <option>แม่ทะ</option>
                                    <option>เสริมงาม</option>
                                    <option>แม่เมาะ</option>
                                    <option>แจ้ห่ม</option>
                                    <option>สบปราบ</option>
                                    <option>เมืองปาน</option>
                                    <option>งาว</option>
                                    <option>เถิน</option>
                                    <option>วังเหนือ</option>
                                    <option>แม่พริก</option>


                              </Form.Control>

                              <Form.Control as="select" placeholder="สถานที่ใกล้เคียง" value={Input.NearbyLocation} name="NearbyLocation" onChange={onChange} >
                                    <option>สถานที่ใกล้เคียง</option>
                                    <option>วัดพระธาตุลำปางหลวง</option>
                                    <option>วัดพระเจดีย์ซาวหลัง</option>
                                    <option>อุทยานแห่งชาติดอยขุนตาล</option>
                                    <option>ถ้ำผาไท</option>
                                    <option>น้ำตกแจ้ซ้อน</option>
                                    <option>กาดกองต้า</option>
                                    <option>โรงไฟฟ้าแม่เมาะ</option>
                                    <option>วัดพระพุทธบาทปู่ผาแดง</option>
                                    <option>เขื่อนกิ่วลม</option>
                                    <option>หล่มภูเขียว</option>
                                  
                              </Form.Control>
                      </Col>
                <Col>
                    <Form.Control style={magin}  type="text" placeholder="ที่ตั้ง" value={Input.Location} name="Location" onChange={onChange} />

                    <Form.Control type="text" placeholder="ราคา" value={Input.Price} name="Price" onChange={onChange} />

                
                </Col>

            </Row>


            <Row>

                <Form.Control as="textarea" rows={3} placeholder="ที่อยู่" style={{ resize: "none" ,margin:'0px 15px 15px 15px' ,}} value={Input.Address} name="Address" onChange={onChange}  />
                <Form.Control as="textarea" rows={3} placeholder="คำอธิบายสั้นๆ" style={{ resize: "none" ,margin:'0px 15px 15px 15px' }} value={Input.Shortdetail} name="Shortdetail" onChange={onChange} />
                <Form.Control as="textarea" rows={3} placeholder="ข้อมูลเพิ่มเติม..." style={{ resize: "none" ,margin:'0px 15px 15px 15px' }} value={Input.Description} name="Description" onChange={onChange} />
            
            </Row>

            <div style = {{textAlign:'center'}}>
            <Button style={{marginRight:"10px"}} onClick={() => { handleShow(); setIndexTextalert(0); setStatus("wait") }}  > บันทึก </Button>
            <Button style={{marginRight:"10px"}} onClick={() => { handleShow(); setIndexTextalert(1); setStatus("edit") }}> เก็บไว้ </Button>
            <Button style={{marginRight:"10px"}} onClick={() => { handleShow(); setIndexTextalert(3) }}  > ลบทิ้ง </Button>
            <Button style={{marginRight:"10px"}} onClick={() => { handleShow(); setIndexTextalert(2) }}  > ยกเลิก </Button>
            
            </div>
            
            <Showalert show={show} onHide={handleClose} text={textalert[IndexTextalert]} />
            {/* <Button onClick={()=>{console.log(Data);}}>check data</Button> */}
             {/* <Button onClick={() => { console.log(Data); }}  > test </Button>   */}
        </Container>
        </div>
    )
}
export default UpdateHotel