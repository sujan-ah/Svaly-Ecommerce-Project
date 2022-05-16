import React, { useState,useContext,useEffect } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from "axios"
import {Store} from '../Store.js'
import { toast } from 'react-toastify'; 


const Login = () => {
    const navigate = useNavigate() /* video no: 32 UserInfo */ 
    
    let {search, state} = useLocation()
    console.log(search);

    if(state){
        toast.success(state)
    }

    let redirectUrl = new URLSearchParams(search).get('redirect')
    console.log(redirectUrl);
    let redirect = redirectUrl ? redirectUrl : '/'
    console.log(redirect);

    
    /* video no: 32 UserInfo */ 
    let [email, setEmail] = useState("") 
    let [password, setPassword] = useState("")
    
    const {state3, dispatch3} = useContext(Store)
    /* video no: 32 UserInfo */ 

    const {userInfo} = state3 /* video no: 33 */

    let handleSubmit = async (e) =>{  /* video no: 32 UserInfo */ 
        e.preventDefault()
        try{
            const {data} = await axios.post("api/users/signin", {
                email,
                password,
            })
            dispatch3({type: "USER_SIGNIN", payload: data})
            // console.log(data);
            localStorage.setItem('userInfo',JSON.stringify(data))
            navigate(redirect || "/")
        }catch(err){
            toast.error("Invalid email or password") /* video no: 33 */
        }
    }

    /* video no: 33 */
    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [])
    /* video no: 33 */
    

  return ( /* video no: 32 UserInfo */ 
    <Container className='w-25 border mt-5 p-3'>
        <Alert varriant='primary' className='text-center'>
            <h1>Login</h1>
        </Alert>
        <Form onSubmit={handleSubmit}>
            <Form.Label htmlFor="inputPassword5">Email</Form.Label>
            <Form.Control
                type="email"
                id="Write Your Email"
                onChange={(e)=> setEmail(e.target.value)}
            />
            <Form.Label htmlFor="inputPassword5">Password</Form.Label>
            <Form.Control
                type="password"
                id="Your Password"
                onChange={(e)=> setPassword(e.target.value)}
            />
        </Form>
        <Button 
            className='mt-3 mb-3'
            variant="primary"
            onClick={handleSubmit}
            >
            Signin
        </Button>
        <br/>
        <Form.Text id="passwordHelpBlock" muted>
            Don't Have an Account? {' '}
            <Link to={`/signup?redirect=${redirect}`}>
                Create Account
            </Link>
        </Form.Text>
    </Container>
  )
}

export default Login




