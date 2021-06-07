import React, { useState } from 'react'

import Mainpage from './Main_component/Mainpage'
import VeiwHotel from './Main_component/VeiwHotel'

import { BrowserRouter, Route, Link, Switch, useParams } from 'react-router-dom'
import './App.css'

import Newinput from './Main_component/Newinput'
import NewUpdateHotel from './Main_component/NewUpdateHotel'
import { Button } from 'react-bootstrap'

function App() {

  const [posts, setPost] = useState([]);



  const Notfound = () => <div> NotFound Page</div>
  return (

    <BrowserRouter>
      


      


        <Switch>


          <Route exact path="/">
            <Mainpage />

            <Link to="/insertHotel">
              <Button>เพิ่มโรงแรม</Button>

            </Link>


          </Route>

          <Route exact path="/insertHotel">
           
            <Newinput />


          </Route>

          <Route path="/UpdateHotel/:id"   >
         
            <NewUpdateHotel />
          </Route>

          <Route path="/VeiwHotel/:id"   >
            <VeiwHotel />
          </Route>


          <Route  >
            <Notfound />
          </Route>

        </Switch>


      

    </BrowserRouter>

  );
}

export default App;
