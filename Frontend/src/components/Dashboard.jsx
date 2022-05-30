import React, { useEffect, useContext, useState } from 'react'
import { Store } from '../Store'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'; 
import { Row,Col,Nav,Form,Button } from 'react-bootstrap';
import axios from 'axios';


const Dashboard = () => {     {/* class: 60 part-2 */}
  let navigate = useNavigate()


  const [cat,setCat] = useState(false)
  const [pro,setPro] = useState(false)
  const [name,setName] = useState('')
  const [storename,setStorename] = useState('')

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
      id: state3.userInfo._id,
      name: name,
    })
    console.log(data);
  }

  let handleCat = () =>{
    setCat(true)
    setPro(false)
  }
  let handlePro = () =>{
    setCat(false)
    setPro(true)
  }

  useEffect(()=>{
    async function Store(){
      let {data} = await axios.get(`/products/storename/${userInfo._id}`)
      setStorename(data[0].name);
      console.log(data);
    }
    Store()
  },[])
  
  let handleProductSubmit = () =>{
    
  }

  
  return (
    <Row>
      <Col lg={2}>
      <Nav defaultActiveKey="/home" className="flex-column">
        <Nav.Link onClick={handlePro}>
          Create Product
        </Nav.Link>

        <Nav.Link 
          onClick={handleCat}
        >
          Create Catagory
        </Nav.Link>

        <Nav.Link>Sub Catagory</Nav.Link>
      </Nav>
      </Col>

      <Col lg={8}>
        {cat &&
          <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Store Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Product Catagory" 
              onChange={(e)=> setName(e.target.value)}
            />
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

        {pro &&
          <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Product Name" 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Image</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Product Image" 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Price</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="Product Price" 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Product Description" 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Slug</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Product Slug" 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Stock</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="Product Stock" 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Catagory</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Product Catagory" 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Cupon</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Product Cupon" 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Discount</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="Product Discount" 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Totalsale</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="Product Totalsale" 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Store Name</Form.Label>
            <Form.Control placeholder="Disabled input" disabled value={storename}/>
          </Form.Group>
        


          <Button 
            variant="primary" 
            type="submit"
            onClick={handleProductSubmit}
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