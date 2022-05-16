// import React, { useState,useContext,useEffect } from 'react'
// import { Container, Form, Button, Alert } from 'react-bootstrap'
// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import axios from "axios"
// import {Store} from '../Store.js'
// import { toast } from 'react-toastify'; 


// const Signup = () => {    /* video no: 38 */
//     const navigate = useNavigate() 

//     let {search} = useLocation()
//     let redirectUrl = new URLSearchParams(search).get('redirect')
//     let redirect = redirectUrl ? redirectUrl : '/'

//     let [name, setName] = useState("") 
//     let [email, setEmail] = useState("") 
//     let [password, setPassword] = useState("")
//     let [cpassword, setCpassword] = useState("")
    
//     const {state3, dispatch3} = useContext(Store)
//     const {userInfo} = state3 

//     let handleSubmit = async (e) =>{ 
//         e.preventDefault()
//         try{
//             const {data} = await axios.post("api/users/signup", {
//                 name,
//                 email,
//                 password,
//             })
//             navigate('/signin', {state: "Please Login"})
//         }catch(err){
//             toast.error("Invalid email or password")
//         }
//     }


//     useEffect(() => {
//         if(userInfo){
//             navigate(redirect)
//         }
//     }, [])
    
//   return ( 
//     <Container className='w-25 border mt-5 p-3'>
//         <Alert varriant='primary' className='text-center'>
//             <h1>Sign Up</h1>
//         </Alert>
//         <Form onSubmit={handleSubmit}>
//             <Form.Label htmlFor="inputPassword5">Name</Form.Label>
//             <Form.Control
//                 type="name"
//                 id="Write Your Name"
//                 onChange={(e)=> setName(e.target.value)}
//             />
//             <Form.Label htmlFor="inputPassword5">Email</Form.Label>
//             <Form.Control
//                 type="email"
//                 id="Write Your Email"
//                 onChange={(e)=> setEmail(e.target.value)}
//             />
//             <Form.Label htmlFor="inputPassword5">Password</Form.Label>
//             <Form.Control
//                 type="password"
//                 id="Your Password"
//                 onChange={(e)=> setPassword(e.target.value)}
//             />
//             <Form.Label htmlFor="inputPassword5">Confirm Password</Form.Label>
//             <Form.Control
//                 type="password"
//                 id="Confirm Password"
//                 onChange={(e)=> setCpassword(e.target.value)}
//             />
//         </Form>
//         <Button 
//             className='mt-3 mb-3'
//             variant="primary"
//             onClick={handleSubmit}
//             >
//             Signup
//         </Button>
//         <br/>
//         <Form.Text id="passwordHelpBlock" muted>
//             Already Have an Account? {' '}
//             <Link to={`/signin?redirect=${redirect}`}>
//                 Login
//             </Link>
//         </Form.Text>
//     </Container>
//   )
// }

// export default Signup



import React, { useState,useContext,useEffect } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from "axios"
import {Store} from '../Store.js'
import { toast } from 'react-toastify'; 


const Signup = () => {
    const navigate = useNavigate() /* video no: 32 UserInfo */ 
    

    let {search} = useLocation()
    console.log(search);
    let redirectUrl = new URLSearchParams(search).get('redirect')
    console.log(redirectUrl);
    let redirect = redirectUrl ? redirectUrl : '/'
    console.log(redirect);

    
    /* video no: 32 UserInfo */ 
    let [name, setName] = useState("") 
    let [email, setEmail] = useState("") 
    let [password, setPassword] = useState("")
    let [cpassword, setCpassword] = useState("")
    
    const {state3, dispatch3} = useContext(Store)
    /* video no: 32 UserInfo */ 

    const {userInfo} = state3 /* video no: 33 */

    let handleSubmit = async (e) =>{  /* video no: 32 UserInfo */ 
        e.preventDefault()
        try{
            const {data} = await axios.post("api/users/signup", {
                name,
                email,
                password,
            })
            navigate('/signin', {state: "Please login"})
        }catch(err){
            toast.error("Invalid email or password") /* video no: 33 */
        }
    }


    /* video no: 33 */
    useEffect(() => {
        if(userInfo){
            navigate('redirect')
        }
    }, [])
    /* video no: 33 */
    

  return ( /* video no: 32 UserInfo */ 
    <Container className='w-25 border mt-5 p-3'>
        <Alert varriant='primary' className='text-center'>
            <h1>Sign Up</h1>
        </Alert>
        <Form onSubmit={handleSubmit}>
            <Form.Label htmlFor="inputPassword5">Name</Form.Label>
            <Form.Control
                type="name"
                id="Write Your Name"
                onChange={(e)=> setName(e.target.value)}
            />
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
            <Form.Label htmlFor="inputPassword5">Confirm Password</Form.Label>
            <Form.Control
                type="password"
                id="Confirm Password"
                onChange={(e)=> setCpassword(e.target.value)}
            />
        </Form>
        <Button 
            className='mt-3 mb-3'
            variant="primary"
            onClick={handleSubmit}
            >
            Signup
        </Button>
        <br/>
        <Form.Text id="passwordHelpBlock" muted>
            Already Have an Account? {' '}
            <Link to={`/signin?redirect=${redirect}`}>
                Login
            </Link>
        </Form.Text>
    </Container>
  )
}

export default Signup




