import React, { useEffect, useContext, useState } from 'react'
import { Store } from '../Store'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'; 
import { Row,Col,Nav,Form,Button,Modal,Tab } from 'react-bootstrap';
import axios from 'axios';
import EditorConvertToHTML from './Editor.jsx' /* class: 61 part-1 */
import Storename from './Storename';


const Dashboard = () => {     {/* class: 60 part-2 */}
  let navigate = useNavigate()

  const [cat,setCat] = useState(false)
  const [pro,setPro] = useState(false)
  const [storename,setStorename] = useState('')

  /* class: 61 part-1 */
  const [name,setName] = useState('') 
  const [image,setImage] = useState('')
  const [price,setPrice] = useState('')
  const [description,setDescription] = useState('')
  const [slug,setSlug] = useState('')
  const [stock,setStock] = useState('')
  const [catagory,setCatagory] = useState('')
  const [cupon,setCupon] = useState('')
  const [discount,setDiscount] = useState('')
  const [total,setTotal] = useState('')
  /* class: 61 part-1 */



  /* nije korchi */
  const {state3} = useContext(Store)
  const {userInfo} = state3

  // let {state} = useLocation()
  // if(state){
  //   toast.success(state)
  // }
  useEffect(() => {  
    if(!userInfo){
      navigate('/signin')
    }
  }, [])
  /* nije korchi */



  let handleCat = () =>{
    setCat(true)
    setPro(false)
  }
  let handlePro = () =>{
    setPro(true)
    setCat(false)
  }

  useEffect(()=>{
    async function Store(){
      let {data} = await axios.get(`/products/storename/${userInfo._id}`)
      setStorename(data[0].name);
    }
    Store()
  },[])
  let handleProductSubmit = async (e) =>{       /* class: 61 part-1 */
    e.preventDefault()
    let {data} = await axios.post('/products',{   /* class: 61 part-2 */
      name: name,
      image: image,
      price: price,
      description: localStorage.getItem('text'),
      slug: slug,
      stock: stock,
      catagory: catagory,
      cupon: cupon,
      discount: discount,
      total: total,  
      owner: state3.userInfo._id,
    })
    console.log(data);
  }  

  // useEffect(()=>{                   /* class: 61 part-2 */
  //   async function Store(){
  //     let {data} = await axios.get(`/products/cat`)
  //     setStorename(data[0].name);
  //     // console.log(data);
  //   }
  //   Store()
  // },[])


  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col lg={2}>
          <Nav variant="pills" className="flex-column mt-3">
            <Nav.Item>
              <Nav.Link onClick={handlePro} eventKey="first">
                <h4>Create Product</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={handleCat} eventKey="second">
                <h4>Create Catagory</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third">
                <h4>Sub Catagory</h4>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>

        <Col lg={8}>
          {pro &&
            <Form className='mt-3' style={{fontSize: 15, fontWeight: 700}}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                onChange={(e)=>setName(e.target.value)}
                type="text" 
                placeholder="Product Name" 
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Image</Form.Label>
              <Form.Control 
                onChange={(e)=>setImage(e.target.value)}
                type="text" 
                placeholder="Product Image" 
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Price</Form.Label>
              <Form.Control 
                onChange={(e)=>setPrice(e.target.value)}
                type="number" 
                placeholder="Product Price" 
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Description</Form.Label>
              <EditorConvertToHTML onChange={(e)=>setDescription(localStorage.getItem('text'))}/>   {/* class: 61 part-1 */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Slug</Form.Label>
              <Form.Control 
                onChange={(e)=>setSlug(e.target.value)}
                type="text" 
                placeholder="Product Slug" 
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Stock</Form.Label>
              <Form.Control 
                onChange={(e)=>setStock(e.target.value)}
                type="number" 
                placeholder="Product Stock" 
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Catagory</Form.Label>
              <Form.Control 
                onChange={(e)=>setCatagory(e.target.value)}
                type="text" 
                placeholder="Product Catagory" 
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Cupon</Form.Label>
              <Form.Control 
                onChange={(e)=>setCupon(e.target.value)}
                type="text" 
                placeholder="Product Cupon" 
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Discount</Form.Label>
              <Form.Control 
                onChange={(e)=>setDiscount(e.target.value)}
                type="number" 
                placeholder="Product Discount" 
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Totalsale</Form.Label>
              <Form.Control 
                onChange={(e)=>setTotal(e.target.value)}
                type="number" 
                placeholder="Product Totalsale" 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Store Name</Form.Label>
              <Form.Control 
                placeholder="Disabled input" 
                disabled 
                value={storename}
              />

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
          {cat &&
            <Storename/>
          }
        </Col>
      </Row>
    </Tab.Container>
  )
}

export default Dashboard