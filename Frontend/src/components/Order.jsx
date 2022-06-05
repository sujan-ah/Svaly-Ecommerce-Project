import axios from 'axios'
import React, { useReducer,useContext, useEffect } from 'react'
import { PayPalButtons,usePayPalScriptReducer } from "@paypal/react-paypal-js";
import StripeCheckout from 'react-stripe-checkout';
import { useNavigate,useParams,Link } from 'react-router-dom'
import { Store } from '../Store'
import { Alert,Container,Card,Button, Row, Col,ListGroup } from 'react-bootstrap'
import { toast } from 'react-toastify';


function reducer(state,action){
    switch (action.type){
        case 'FETCH_REQUEST':
            return {...state,loading:true,error: ''}
        case 'FETCH_SUCCESS':
            return {...state,loading:false,order:action.payload}
        case 'FETCH_FAIL':
            return {...state,loading:false,error:action.payload}

        /* vedio: 49 Payment part */
        case 'PAY_REQUEST':
            return {...state,loadingPay: true}
        case 'PAY_SUCCESS':
            return {...state,loadingPay: false,successPay: true}
         case 'PAY_FAIL':
            return {...state,loadingPay: false,errorPay: action.payload}
        case 'PAY_RESET':
            return {...state,loadingPay: false,successPay: false}
        /* vedio: 49 Payment part */
        default:
            return state
    }
} 

const Order = () =>{   /*Vedio - 47 */  

    const [{loading,error,order,successPay,loadingPay},dispatch] = useReducer(reducer,{
        loading: false,
        order: {},
        error: '',
        successPay:false,  /* vedio: 49 Payment part */
        loadingPay:false, /* vedio: 49 Payment part */
    })
    // console.log(order);

    const {state3} = useContext(Store)
    const {userInfo} = state3

    const params = useParams()
    const {id: orderID} = params
    const navigate = useNavigate()
    
    /* vedio: 49 Payment part */
    const [{isPending},paypalDispatch] = usePayPalScriptReducer() 

    function createOrder(data,action){
        return action.order
        .create({
            purchase_units:[
                {
                    amount: {value: order.totalPrice}
                }
            ]
        }).then((orderID)=>{
            return orderID
        })
    }
    function onApprove(data,action){
        return action.order.capture().then(async function(details){
            try{
                dispatch({type: 'PAYPAL_REQUEST'})
                const {data} = await axios.put(`/api/orders/${order._id}/pay`,details,{
                    headers: {
                        authorization: `Bearer ${userInfo.token}`
                    }
                })
                dispatch({type: 'PAY_SUCCESS', payload: data})
                toast.success("Order Is Paid")
            }catch(err){
                dispatch({type: 'PAY_FAIL', payload: err.message})
                toast.error(err.message)
            }
        })
    }
    function onError(err){
        toast.error(err.message)
    }
    /* vedio: 49 Payment part */

    useEffect(()=>{ 
        if(!order._id || successPay || (order._id && order._id !== orderID)){
            const fetchOrder = async () =>{
                try{
                    dispatch({type: 'FETCH_REQUEST'})
                    const {data} = await axios.get(`/api/orders/${orderID}`,
                        {
                            headers: {authorization: `Bearer ${userInfo.token}`}
                        }
                    )
                    dispatch({type: 'FETCH_SUCCESS',payload:data})
                    // console.log(data);
                }catch(err){
                    dispatch({type: 'FETCH_FAIL',payload: err})
                }
            }
            fetchOrder()

            /* vedio: 49 Payment part */
            if(successPay){
                dispatch({type: 'PAY_RESET'})
            }
        }else{ 
            const loadPaypalScript = async ()=>{
                const {data: clientId} = await axios.get("/api/keys/paypal",{
                    headers: {authorization: `Bearer ${userInfo.token}`}
                })
                paypalDispatch({
                    type: 'resetOptions',
                    value:{
                        'client-id': clientId,
                        currency: 'USD',
                    }
                })
                paypalDispatch({
                    type: 'setLoadingStatus',
                    value:'pending',
                })
            }
            loadPaypalScript()
        }
        /* vedio: 49 Payment part */
    },[order,userInfo,orderID,navigate,paypalDispatch,successPay])

    {/* vedio: 51 Strip */ }
    let handleToken = async (token) =>{
        try{
            dispatch({type: 'FETCH_REQUEST'})
            const {data} = await axios.get(`/api/orders/${orderID}`,{
                    headers: {
                        authorization: `Bearer ${userInfo.token}`
                    }
                }
            )
            dispatch({type: 'FETCH_SUCCESS',payload:data})
            toast.success("Order Is Paid")
            
        }catch(err){
            dispatch({type: 'FETCH_FAIL',payload:err.message})
            toast.error(err.message)
        }
    }
    {/* vedio: 51 Strip */ }


    return (
        loading
        ?
            <h1>loading.....</h1> 
        :
            error
        ?
            <Alert variant='danger'>
                <p>{error}</p>
            </Alert>
        :
        <Container>
            <h1>Order {orderID} </h1>
            <Row>
                <Col lg={8}>
                    <Card>
                    <Card.Body>
                    <Card.Title>Shipping</Card.Title>
                    <Card.Text>
                        <b>Name</b> {order.shippingaddress && order.shippingaddress.fullname} <br/>
                        <b>Address</b> {order.shippingaddress && order.shippingaddress.address} <br/>
                        <b>Address</b> {order.shippingaddress && order.shippingaddress.address},{order.shippingaddress && order.shippingaddress.city},{order.shippingaddress && order.shippingaddress.country} <br/>
                    </Card.Text>
                    </Card.Body>
                    </Card>

                    <Card>
                    <Card.Body>
                    <Card.Title>Payment</Card.Title>
                    <Card.Text>
                        <b>Method</b> {order.paymentMethod} <br/>
                    </Card.Text>
                    </Card.Body>
                    </Card>

                    <Card>
                    <Card.Body>
                    <Card.Title>Items</Card.Title>
                    <Card.Text>
                        <ListGroup>
                        {order.orderItems && order.orderItems.map(item=>(
                            <ListGroup.Item>
                                <Row>
                                    <Col lg={6}>
                                        <img style={{width: 24}} src={item.img} />
                                        <Link to={`/product/${item.slug}`} >
                                            {item.name}
                                        </Link>
                                    </Col>
                                    <Col lg={3}>
                                        {item.quantity}
                                    </Col>
                                    <Col lg={3}>
                                        {item.price}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                        </ListGroup>
                    </Card.Text>
                    </Card.Body>
                    </Card>
                </Col>
                
                <Col lg={4}>
                    <h3>Order Summary</h3>  
                    <Row>
                        <Col>Items</Col>
                        <Col>${order.totalPrice}</Col>
                    </Row>      
                    <Row>
                        <Col>Shipping</Col>
                        <Col>${order.shippingPrice}</Col>
                    </Row>      
                    <Row>
                        <Col>Taxs</Col>
                        <Col>${order.taxPrice}</Col>
                    </Row> 

                    {/* vedio: 49 Payment part */}   
                    <Row>
                        {!order.isPaid && isPending
                            ?
                                <h1>Loading.....</h1>
                            :
                            <Col>
                                {order.paymentMethod == "Paypal" &&
                                    <PayPalButtons 
                                        createOrder={createOrder} 
                                        onApprove={onApprove}
                                        onError={onError}
                                    >
                                    </PayPalButtons>
                                }

                                {/* vedio: 51 Strip */ }
                                {order.paymentMethod == "Strip" &&
                                    <StripeCheckout   /*from react-strip-checkout npm */
                                        token={handleToken}
                                        stripeKey="pk_test_51KqEV4FJsEFR1GLcPx9Rj60EpliAKMBgw91qOYizCpgaWqhMiJAKHEDWz4nwvfiEZJfw0bA37Yy3IGau1bn4Y5L600RTYRgbcA"
                                        panelLabel='Payment'
                                        currency='USD'
                                        amount={order.totalPrice*100}
                                    />
                                }
                                {/* vedio: 51 Strip */ }
                            </Col>
                        }
                        {loadingPay && <h1>payment loading</h1>}
                    </Row>   
                      {/* vedio: 49 Payment part */}  
                </Col>
            </Row>
        </Container>
    )
}

export default Order