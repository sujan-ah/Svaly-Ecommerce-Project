import axios from 'axios'
import React, { useContext } from 'react'
import { useState } from 'react'
import { Container,Form,Button } from 'react-bootstrap'
import { Store } from '../Store'

const Affiliate = () => {
    const [agree,setAgree] = useState(false)

    const {state3, dispatch3} = useContext(Store)
    const {userInfo} = state3

    let handleAgree = () =>{
        setAgree(!agree)
    }
    let handleAffiliate = async () =>{
        let {data} = await axios.put(`/api/users/affiliate/${userInfo._id}`)
        console.log(data);
        dispatch3({
            type: "USER_SIGNIN",
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    }


  return (
    <Container>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro beatae ut officia sed omnis excepturi illum unde, aspernatur molestias id, error explicabo doloribus, accusantium voluptatem possimus eveniet reprehenderit asperiores alias!</p>
        <Form.Check 
            type={'checkbox'}
            label={`default ${'Accept the agreement'}`}
            onChange={handleAgree}
        />
        {agree
        ?
            <Button 
                variant="primary"
                onClick={handleAffiliate}
            >
                Primary
            </Button>

        :
            <Button 
                variant="primary"
                disabled
            >
                Primary
            </Button>
        }
       
    </Container>
  )
}

export default Affiliate