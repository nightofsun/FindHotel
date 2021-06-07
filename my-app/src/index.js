import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Redirect, Route } from 'react-router-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import Hotel from './hotel';
import Filter from './filter';
// import User from './src/App';
import Admin from './Admin';
import Register from './Register';
import Mainpage from './src/Main_component/Mainpage'
import { Button, Row, Col, Card, Container, ListGroup, Form, Navbar, Nav, Table, Modal, ModalBody, FormGroup, Image, Spinner } from 'react-bootstrap';
import logo from './logohotel3.png'
import DetailHotel from './DetailHotel';
import Newinput from './src/Main_component/Newinput';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewUpdateHotel from './src/Main_component/NewUpdateHotel'
import jwt_decode from 'jwt-decode';
import { AuthContext, AuthProvider } from './AuthContext.js'
import { FetchProvider } from './FetchContext';
// import App from './src/App'

const App = () => {
  const auth = useContext(AuthContext);
  var { token } = auth.authState;
  var decoded = token ? jwt_decode(token) : null;
  const defPath = ()=>{
    return <Redirect to='/homepage/filter/ทั้งหมด/ทั้งหมด/10/10000/ทั้งหมด/-/1' />
  }

  return (
    <div style={{ background: "#ebebeb" }}>
      <Navbar bg="dark" variant="dark" fixed="top" expand="lg" style={{boxShadow: "0 10px 10px -5px #888888", WebkitBoxShadow: "0 10px 10px -5px #888888", MozBoxShadow: "0 10px 10px -5px #888888" }}>
        <Navbar.Brand href="/homepage/filter/ทั้งหมด/ทั้งหมด/10/10000/ทั้งหมด/-/1" style={{ margin: "0rem 0.5rem 0rem" }}>
          <img src={logo} width="50px" height="40px" className="d-inline-block align-top" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/homepage/filter/ทั้งหมด/ทั้งหมด/10/10000/ทั้งหมด/-/1" style={{ fontSize: "20px", color: '#ffffff' }}>หาที่พักในลำปาง</Nav.Link>
          </Nav>
          {decoded ? <Nav style={{ margin: "0rem 0.5rem 0rem" }}>
            <Nav.Link href={(decoded.role === 'user') ? "/user" : "/admin"} style={{ color: '#ffffff' }}>{decoded.id}</Nav.Link>
            <Nav.Link href="/login" style={{ color: '#ffffff' }} onClick={() => auth.logout()}>ออกจากระบบ</Nav.Link>

          </Nav> : <Nav style={{ margin: "0rem 0.5rem 0rem" }}>
            <Nav.Link href="/register" style={{ color: '#ffffff' }}>สมัครสมาชิก</Nav.Link>
            <Nav.Link href="/login" style={{ color: '#ffffff' }}>เข้าสู่ระบบ</Nav.Link>


          </Nav>}

        </Navbar.Collapse>
      </Navbar>


      <div style={{ margin: "65px 0em 0em" }}>
        <Route exact path="/" component={defPath} />
        <Route exact path="/home/:page" component={defPath} />
        <Route path="/homepage/filter/:district/:bed/:lowprice/:highprice/:landmark/:searchkey/:page" component={Hotel} />
        <Route path="/filter/:district/:bed/:lowPrice/:highPrice/:landmark/:searchKey" component={Filter} />
        <Route path="/detail/:id" component={DetailHotel} />
        <Route path="/admin" component={Admin} />
        <Route exact path="/user" component={Mainpage} />
        <Route exact path="/user/insertHotel" component={Newinput} />
        <Route exact path="/user/UpdateHotel/:id" component={NewUpdateHotel} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </div>
    </div>
  )
};
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FetchProvider>
          <App />
        </FetchProvider>
      </AuthProvider>

    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
