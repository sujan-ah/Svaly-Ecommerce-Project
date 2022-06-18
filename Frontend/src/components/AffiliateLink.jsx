import axios from 'axios';
import { useEffect,useState,useContext } from 'react';
import { Container,Table } from 'react-bootstrap';
import {Store} from '../Store'


const AffiliateLink = () => {           /* class: 63 part-1 */
    const [product,setProduct] = useState([])

    const {state3} = useContext(Store)
    const {userInfo} = state3


    useEffect(()=>{
        async function Pro(){
            let {data} = await axios.get(`/products/affiliat/info/${userInfo._id}`)
            setProduct(data);
            console.log(data);
        }
        Pro()
    },[])

  return (
    <Container>
        <Table striped bordered hover>
        <thead>
            <tr>
            <th>Serial</th>
            <th>Amount</th>
            </tr>
        </thead>
        <tbody>
            {product.map((item,index)=>(
                <tr>
                <td>{index+1}</td>
                <td>{item.amount}</td>
                </tr>
            ))}
        </tbody>
        </Table>
    </Container>
    
  )
}

export default AffiliateLink