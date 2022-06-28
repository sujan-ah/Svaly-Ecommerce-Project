import React from 'react';
import {Container,Card,Col,Row,Button,Spinner,Modal,Badge,Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios'
import { useState,useReducer,useEffect,useContext } from 'react';
import Rating from './Rating';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import { AiFillHeart } from 'react-icons/ai';

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


const ProductPage = () => {
    const [lgShow, setLgShow] = useState(false);    /* video no: 23 Modal use*/
    const [details, setDetails] = useState([])      /* "" */
    const [searchmatch, setsearchmatch] = useState("") /* video: 51 */

    const [ratingInfo, setRatingInfo] = useState('')
    const [number, setNum] = useState('')
    
    const [{loading,product,error}, dispatch] = useReducer(reducer,{
        loading: false,
        product: [],
        error: '',
    });

    // console.log(product);


    useEffect(async()=>{
        dispatch({type: 'FETCH_REQUEST'})
        try{
            let product = await axios.get("/products")
            console.log(product.data);
            dispatch({type: 'FETCH_SUCCESS', payload: product.data})
        }catch(err){
            dispatch({type: 'FETCH_FAILS', payload: err.message})
        }
    },[])

    // useEffect(()=>{                             /* HW class: 63 */
    //     {product.map(async(item)=>{
    //         let {data} = await axios.get(`/products/rating/information/${item._id}`)
    //         console.log(data);
    //     })}
    // })

    let handleDetails = async (pro) =>{  /* video no: 23 Modal use*/
        setLgShow(true)
        let productDetails = await axios.get(`/products/${pro}`)
        setDetails(productDetails.data);
    }

    /* video no: 16 cpy from pro.details*/
    const {state, dispatch: ctxDispatch, state3, dispatch2} = useContext(Store)
    const {cart} = state 
    const {userInfo} = state3       /* class: 63 part-1 */

    let handleAddToCart = async (product) =>{
        console.log('ami');
        const existingItem = cart.cartItems.find((item)=>item._id === product._id)
        const quantity = existingItem ? existingItem.quantity + 1 : 1
        
        // const {data} = await axios.get(`/cartproduct/${product._id}`)
        // console.log(data); 
        // if(data.instock < quantity){
        //   window.alert(`${product.name} out of stock`)
        //   return
        // }
       
        ctxDispatch({
          type: 'CART_ADD_ITEMS',
          payload: {...product, quantity}
        })
    }
    /* video no: 16 cpy from pro.details*/

    /* video no: 24 Wishlist*/
    let handleAddToWishList = (product) =>{
        dispatch2({
          type: "WISHLIST_ADD_ITEMS",
          payload: {...product}
        })
    }
    /* video no: 24 Wishlist*/

    /* video no: 18 cpy from cartPage */
    const {cart: {cartItems}} = state

    let updateCart = (item,quantity)=>{ 
        ctxDispatch({
          type: 'CART_ADD_ITEMS', 
          payload: {...item,quantity}
        })
      }
        
      let handleRemoveItem = (item)=>{    
        ctxDispatch({
          type: 'CART_REMOVE_ITEMS',
          payload: item 
        })
    }
    /* video no: 18 cpy from cartPage */

    /* video: 51 */
    let handleSearch = (e) =>{
        setsearchmatch(e.target.value);
    }
    /* video: 51 */


  return (
    <>
        <Container>
            <Helmet>
                <title>
                    Product Page
                </title>
            </Helmet>
            <Form.Control 
                onChange={handleSearch}
                type="email" 
                placeholder="name@example.com" 
            />
            <Row >
                {loading ? 
                    <div className='loading'>
                        <Spinner animation="border" variant="info" />
                    </div>
                    :
                    /* video: 51 */
                    product.filter((item)=>{  
                        if(searchmatch == ""){ 
                            return item
                        }else if(item.name.toLowerCase().includes(searchmatch.toLocaleLowerCase())){
                            return item
                        }
                    })
                    /* video: 51 */
                    .map((item)=>(
                        <Col lg={3}> 
                            <Card style={{height: 700}}>
                            <Card.Img variant="top" src={item.img} />
                            <Card.Body className='py-0'
                                style={{height: 40}}
                            >
                                <Card.Title>
                                    {userInfo
                                    ?
                                        userInfo.isAffiliate

                                        ?
                                            <Link to={`/products/${item.slug}?id=${userInfo._id}`}>
                                                {item.name} {' '}
                                                {item.totalsale > 60
                                                ?
                                                    <Badge bg="warning">
                                                        Best Seller
                                                    </Badge>
                                                :
                                                    ""
                                                }
                                            </Link>
                                        :
                                            <Link to={`/products/${item.slug}`}>
                                                {item.name} {' '}
                                                {item.totalsale > 60
                                                ?
                                                    <Badge bg="warning">
                                                        Best Seller
                                                    </Badge>
                                                :
                                                    ""
                                                }
                                            </Link>
                                        
                                      
                                       
                                    :
                                        <Link to={`/products/${item.slug}`}>
                                            {item.name} {' '}
                                            {item.totalsale > 60
                                            ?
                                                <Badge bg="warning">
                                                    Best Seller
                                                </Badge>
                                            :
                                                ""
                                            }
                                        </Link>
                                    }
                                </Card.Title>

                                <Card.Text>
                                    {item.rating ?
                                        <Rating 
                                            rating={item.rating.rating} 
                                            // numberofrating={number} 
                                        />
                                        :
                                        <Rating 
                                            rating={item.rating} 
                                            // numberofrating={number} 
                                        />
                                    }
                                </Card.Text>
                            
                                <Card.Text className='py-0'>
                                    <h6>{item.price}</h6>
                                </Card.Text>
                            </Card.Body>
                                
                            <Card.Body className='py-0' style={{marginTop: 100}}>
                                {/* video no: 18 cpy from cartPage */}

                                {cartItems.map(items=>(
                                    items._id == item._id
                                    ?
                                        <>
                                            <Button 
                                                onClick={()=> updateCart(item,items.quantity+1)} 
                                                disabled={items.quantity == item.instock} 
                                                variant="success"
                                                >
                                                +
                                            </Button>

                                            <span>{items.quantity}</span>

                                            <Button 
                                                onClick={()=> updateCart(item,items.quantity-1)} 
                                                disabled={items.quantity === 1} 
                                                variant="success"
                                                >
                                                -
                                            </Button>

                                            <Button 
                                                className='ms-2'
                                                onClick={()=>handleRemoveItem(item)}
                                                variant="danger">
                                                Remove from Cart
                                            </Button>
                                        </>
                                    
                                    :
                                    ""
                                ))}
                                {/* video no: 18 cpy from cartPage */}

                                {/* <br/> video no: 18 */}

                                {/* video no: 19 */ }
                                {item.instock == 0
                                ?
                                    <>
                                        <Button 
                                            className='mt-1'
                                            variant="danger"
                                            >
                                            Out of Stock
                                        </Button>
                                        <Button     /* video no: 23 Modal use*/
                                            className='mt-1 ms-1'
                                            onClick={()=> handleDetails(item.slug)}
                                            variant="info"
                                            >
                                            Details
                                        </Button>
                                        <Button     /* video no: 24 Wishlist*/
                                            className='mt-1 ms-1'
                                          
                                            onClick={()=> handleAddToWishList(item)}
                                            variant="info"
                                            >
                                            <AiFillHeart/>
                                        </Button>
                                    </>
                                    
                                :
                                    <>
                                        <Button 
                                            className='mt-1 ' /* video no: 18 */
                                            
                                            onClick={()=> handleAddToCart(item)} /* video no: 16 cpy from pro.details*/
                                            variant="info"
                                            >
                                            Add to Card
                                        </Button>
                                        <Button     /* video no: 23 Modal use*/
                                            className='mt-1 ms-1'
                                            onClick={()=> handleDetails(item.slug)}
                                            variant="info"
                                            >
                                            Details
                                        </Button>
                                        <Button     /* video no: 24 Wishlist*/
                                            className='mt-1 ms-1'
                                          
                                            onClick={()=> handleAddToWishList(item)}
                                            variant="info"
                                            >
                                            <AiFillHeart/>
                                        </Button>

                                    </>
                                    
                                }
                                { /* video no: 19 */ }
                            </Card.Body>
                            </Card>
                        </Col>
                    )) 
                }
            </Row>
            
            <Modal  /* video no: 23 Modal use*/
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Product Details
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {details 
                    ?
                        <Card>
                            <Row>
                                <Col lg={4}>
                                    <Card.Img variant="top" src={details.img} />
                                </Col>

                                <Col lg={8}>
                                    <Card.Body>
                                        <Card.Title>
                                            {details.name}
                                        </Card.Title>
                                        <Card.Text>
                                            {details.description}
                                        </Card.Text>
                                        <Card.Text>
                                            <h4>${details.price}</h4>
                                        </Card.Text>
                                        {details.instock == 0
                                        ?
                                            <Button 
                                                variant="danger"
                                                >
                                                Out of Stock
                                            </Button>
                                        :
                                            <Button 
                                                onClick={()=> handleAddToCart(details)}
                                                variant="info"
                                                >
                                                Add to Card
                                            </Button>
                                        }
                                    </Card.Body>
                                </Col>
                            </Row>
                            
                            
                        </Card>
                    :
                        <h1>
                            Products not available
                        </h1>
                    }
                </Modal.Body>
            </Modal>
        </Container>
    </>
  )
  
};

export default ProductPage;
