import { useState,useReducer,useEffect,useContext } from 'react';
import { useParams,Link } from "react-router-dom";
import {Container,Card,Col,Row,ListGroup,Badge,Button,Alert,Form } from 'react-bootstrap';
import axios from 'axios'
import Rating from './Rating';
import ReactImageZoom from 'react-image-zoom';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import Slider from "react-slick";  /* Class-50 */
import { FaArrowLeft,FaArrowRight } from 'react-icons/fa';


function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return {...state, loading:true};
    case 'FETCH_SUCCESS':
      return {...state, loading:false, product:action.payload};
    case 'FETCH_FAILS':
      return {...state, loading:false, error:action.payload};
    default:
      return true
  }
}

const ProductDetails = () => {

  const {state3} = useContext(Store)
  const {userInfo} = state3

  /* Class-50 */
  var settings = {  /* Slick Settings */
    dots: false,  /* true-> false for dot delete  */
    // arrows: false,  /* arrows-> false for arrows delete  */
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <FaArrowLeft />,
    nextArrow: <FaArrowRight/>
  };
  /* Class-50 */

  let params = useParams();
  // console.log(params);

  const [relatedproduct, setRelatedproduct] = useState([]) /* class-49(dadu) */
  const [cuponText, setCuponText] = useState("") /* Class-50 */
  const [errcupon, setErrcupon] = useState("") /* Class-50 */
  const [afterdiscountprice, setAfterdiscountprice] = useState("") /* Class-50 */


  const [{loading,product,error}, dispatch] = useReducer(reducer,{
    loading: false,
    product: {},
    error: '',
  });

  useEffect(async()=>{
    dispatch({type: 'FETCH_REQUEST'})
    try{
      let nam;
      if(userInfo){
        if(userInfo.isAffiliate){
          nam = userInfo.name
        }
      }
      let product = await axios.get(`/products/${params.slug}?name=${nam}`)
      console.log(product);
      dispatch({type: 'FETCH_SUCCESS', payload: product.data})

      /* class-49(dadu) */
      let relatedproduct = await axios.get("/products")
      let filterItem = relatedproduct.data.filter((item)=> 
      item.catagory == product.data.catagory && item.name !== product.data.name)
      
      setRelatedproduct(filterItem)
      /* class-49(dadu) */

      
    }catch(err){
      dispatch({type: 'FETCH_FAILS', payload: err.message})
    }
  },[params.slug])

  const {state, dispatch: ctxDispatch} = useContext(Store)

  const {cart} = state /* class 46 */

  let handleAddToCart = async () =>{
    // console.log(product._id)

    /* class 46 */
    const existingItem = cart.cartItems.find((item)=>item._id === product._id)
    console.log(existingItem);
    const quantity = existingItem ? existingItem.quantity + 1 : 1
    console.log(quantity);
    
    const {data} = await axios.get(`/cartproduct/${product._id}`) 
    console.log(data);
    if(data.instock < quantity){
      window.alert(`${product.name} out of stock`)
      return
    }
    /* class 46 */   
    ctxDispatch({
      type: 'CART_ADD_ITEMS',
      payload: 
      {...product,
        price: afterdiscountprice /* Class-50 */
        ? afterdiscountprice
        : product.price, 
        quantity,
      }
    })
  }

  /* Class-50 */
  let handleCuponText = (e) =>{
    setCuponText(e.target.value);
  }

  let handleCupon = () =>{
    console.log(product)
    // console.log(cuponText)
    if(product.cupon !== ""){
      if(product.cupon == cuponText){
        // console.log((product.price * product.discount) / 100 );
        let discountprice = (product.price * product.discount) / 100
        let afterdiscountprice = product.price - discountprice
        
        if(afterdiscountprice < product.discountlimit){
          setErrcupon("For This price Discount not Applicable")
        }else{
          setAfterdiscountprice(afterdiscountprice);
        }
        
      }else{
        setErrcupon("Wrong Cupon Code");
      }
    }else{
      setErrcupon("not allow any cupon for this product")
    }
  }
  /* Class-50 */
  


  const props = {width: 400, height: 400,zoomPosition: "right", zoomWidth: 400, img: product.img};
  
  return(
    <Container>
      <Helmet>
        <title>
          {product.name}
        </title>
      </Helmet>

      <Row className='mt-3'>
        {product ?
          <>
            <Col lg={6}>
              {/* <img src={product.img} alt={product.name} /> */}
              {product.img &&
                <ReactImageZoom {...props} />
              }
            </Col>

            <Col lg={3}>
            <Card style={{ width: '18rem' }}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h1>
                    {product.name} 
                  </h1>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating 
                    rating={product.rating} 
                    numberofrating={product.numberofrating} 
                  />
                </ListGroup.Item>

                <ListGroup.Item>
                  {product.instock>0 ?
                    <h6>
                    Stock <Badge bg="success">{product.instock}</Badge>
                    </h6>
                    :
                    <h6>
                      Stock <Badge bg="danger">{product.instock}</Badge>
                    </h6>
                  }

                  <h4>{product.price}</h4>
                </ListGroup.Item>

                <ListGroup.Item>
                  <div                              /* class: 61 part-2 */
                    dangerouslySetInnerHTML={{__html: product.description}}
                  />
                </ListGroup.Item>
              </ListGroup>
            </Card>
            </Col>

            <Col lg={3}>
            <ListGroup >
              <ListGroup.Item>
                {/* Class-50 */}
                <h5>
                  {afterdiscountprice
                  ?
                    <>
                      <h3>
                        Price: {''} 
                        <del>
                          ${product.price}
                        </del>
                        {' '}
                        ${afterdiscountprice}
                      </h3>
                    </>
                  :
                    <h3> 
                      Price: $
                      {product.price}
                    </h3>
                  }
                </h5>

                
                {/* Class-50 */}

              </ListGroup.Item>
              
              <ListGroup.Item>
                {/* Class-50 */}
                <Form.Control   
                  onChange={handleCuponText}
                  type="text" 
                  placeholder="Enter email" 
                />

                <Form.Text className="text-muted">
                  {errcupon}
                </Form.Text>
                <br/>

                <Button
                  onClick={handleCupon}
                  variant="info">
                  Apply
                </Button>
                </ListGroup.Item>

                <ListGroup.Item>
                {product.instock == 0
                ?
                  <Button
                    onClick={handleAddToCart}
                    variant="info">
                    Add to cart
                  </Button>
                :
                  <Link to={"/cartpage"}>
                    <Button
                      className='w-100'
                      onClick={handleAddToCart}
                      variant="info">
                      Add to cart
                    </Button>
                  </Link>
                }
                </ListGroup.Item>

                {/* Class-50 */}
               
              
            </ListGroup>
            </Col>
          </>
          :
          <Alert className='text-center mt-5' variant={"danger"}>
            Product not found pls try another product
          </Alert>
        }
      </Row>

      {/* class-49(dadu) */}
      <Row>
        <h2 className='mt-5'>
          Related Product
        </h2>

        {relatedproduct.length > 0
        ?
          <Slider {...settings}>
            {relatedproduct.map((item)=>(
              /* Class-50 */
              <Card className='p-2' style={{ width: '18rem' }}> 
                <Card.Img style={{ height: 300 }} variant="top" src={item.img} />
                <Card.Body>
                  <Link to={`/products/${item.slug}`}>
                    <Card.Title>
                      {item.name}
                    </Card.Title>
                  </Link>
                  <Card.Text>
                  <div                              /* class: 61 part-2 */
                    dangerouslySetInnerHTML={{__html: item.description}}
                  />
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body> 
              </Card>
              /* Class-50 */
            ))}
          </Slider>
        :
          <Alert 
            variant="danger"
            >
            No Related product found
          </Alert>
        }
      </Row>
      {/* class-49(dadu) */}
    </Container>
  ) 
};

export default ProductDetails;