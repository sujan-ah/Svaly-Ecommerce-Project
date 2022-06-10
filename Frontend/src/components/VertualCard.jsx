import React, { useContext, useState } from 'react'
import { Container,Form,Button, } from 'react-bootstrap'
import axios from 'axios'
import { Store } from '../Store'



const VertualCard = () => {                     /* class: 62 */

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



  return (
    <Container>                 {/* class: 62 */} 
        <Form>          
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Amount</Form.Label>
                <Form.Control 
                    type="number" 
                    placeholder="Amount" 
                    onChange={(e)=> setAmount(e.target.value)}
                />
            </Form.Group>
            <Button 
                variant="primary" 
                type="submit"
                onClick={handlePayment}
            >
                Paypal
            </Button>
        </Form>
    </Container>
  )
}

export default VertualCard