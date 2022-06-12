import React, { useContext, useState,useReducer,useEffect } from 'react'
import { Container,Form,Button, } from 'react-bootstrap'
import axios from 'axios'
import { Store } from '../Store'
import { useNavigate,useParams,Link } from 'react-router-dom'
import { PayPalButtons,usePayPalScriptReducer } from "@paypal/react-paypal-js";
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



const VertualCard = () => {                     /* class: 62 */

    const [{loading,error,order,successPay,loadingPay},dispatch] = useReducer(reducer,{
        loading: false,
        order: {},
        error: '',
        successPay:false,  /* vedio: 49 Payment part */
        loadingPay:false, /* vedio: 49 Payment part */
    })
    // console.log(order.amount);
    

    /* class: 62 */
    const { state3 } = useContext(Store)
    const { userInfo } = state3

    const [amount,setAmount] = useState('')

    let handlePayment = async (e) => {
        e.preventDefault()
        let {data} = await axios.post(`/api/users/vertualcart/${userInfo._id}`,{
            amount: amount,
            owner: userInfo._id,
        })
        console.log(data);
    }
    /* class: 62 */

    // ==========================================
    const [{isPending},paypalDispatch] = usePayPalScriptReducer()

    function createOrder(data,action){
        return action.order
        .create({
            purchase_units:[
                {
                    amount: {value: order.amount}
                }
            ]
        })
        // .then((orderID)=>{
        //     return orderID
        // })
    }
    function onApprove(data,action){
        return action.order.capture()
        .then(async function(details){
            try{
                dispatch({type: 'PAYPAL_REQUEST'})
                const {data} = await axios.put(`/api/users/vertualcartpaypal/${userInfo._id}/pay`,details,{
                    headers: {
                        authorization: `Bearer ${userInfo.token}`
                    }
                })
                console.log(data);
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

    useEffect(()=>{ 
        const fetchOrder = async () =>{
            try{
                dispatch({type: 'FETCH_REQUEST'})
                const {data} = await axios.get(`/api/users/vertualcartpaypal/${userInfo._id}`,
                    {
                        headers: {authorization: `Bearer ${userInfo.token}`}
                    }
                )
                dispatch({type: 'FETCH_SUCCESS',payload:data[0]})
                // console.log(data[0]);
            }catch(err){
                dispatch({type: 'FETCH_FAIL',payload: err})
            }
        }
        fetchOrder()
        // const fetchOrder = async () =>{
        //     try{
        //         dispatch({type: 'FETCH_REQUEST'})
        //         const {data} = await axios.get(`/api/users/vertualcartpaypal/${userInfo._id}`,
        //             {
        //                 headers: {authorization: `Bearer ${userInfo.token}`}
        //             }
        //         )
        //         dispatch({type: 'FETCH_SUCCESS',payload:data[0]})
        //         // console.log(data[0]);
        //     }catch(err){
        //         dispatch({type: 'FETCH_FAIL',payload: err})
        //     }
        // }
        // fetchOrder()
        
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
    },[userInfo,paypalDispatch])
    // ==========================================


    



  return (
    <Container>                 {/* class: 62 */} 
        <Form>          
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Diposit Amount</Form.Label>
                <Form.Control 
                    type="number" 
                    placeholder="Amount" 
                    onChange={(e)=> setAmount(e.target.value)}
                />
            </Form.Group>
            {/* <Button 
                variant="primary" 
                type="submit"
                // onClick={handlePayment}
            >
                Paypal
            </Button> */}

            {isPending
                ?
                    <h1>Loading.....</h1>
                :
                <PayPalButtons 
                    // onClick={handlePayment}
                    createOrder={createOrder} 
                    onApprove={onApprove}
                    onError={onError}
                >
                </PayPalButtons>
            }
            
        </Form>
    </Container>
  )
}

export default VertualCard