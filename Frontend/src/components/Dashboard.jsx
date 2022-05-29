import React, { useEffect, useContext, useState } from 'react'
import { Store } from '../Store'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'; 
import { Row,Col,Nav,Form,Button } from 'react-bootstrap';
import axios from 'axios';


const Dashboard = () => {     {/* class: 60 part-2 */}
  let navigate = useNavigate()


  const [cat,setCat] = useState(false)

  const {state3} = useContext(Store)
  const {userInfo} = state3

  let {state} = useLocation()
  if(state){
    toast.success(state)
  }

  useEffect(() => {
    if(!userInfo){
      navigate('/signin')
    }
  }, [])

  let handleSubmit = async (e) =>{
    e.preventDefault()
    console.log("ami");
    let {data} = await axios.post('/products/storename',{
      id: state3.userInfo._id
    })
  }

  
  return (
    <Row>
      <Col lg={2}>
      <Nav defaultActiveKey="/home" className="flex-column">
        <Nav.Link>Create Product</Nav.Link>
        <Nav.Link onClick={()=> setCat(true)}>Create Catagory</Nav.Link>
        <Nav.Link>Sub Catagory</Nav.Link>
      </Nav>
      </Col>

      <Col lg={8}>
        {cat &&
          <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Catagory</Form.Label>
            <Form.Control type="text" placeholder="Product Catagory" />
          </Form.Group>
        
          <Button 
            variant="primary" 
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Form>
        }
      </Col>
    </Row>
  )
}

export default Dashboard