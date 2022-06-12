import axios from 'axios';
import { useEffect,useState } from 'react';
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

const AffiliateLink = () => {           /* class: 63 part-1 */
    const [product,setProduct] = useState([])

    useEffect(()=>{
        async function Pro(){
            let {data} = await axios.get('/products')
            setProduct(data);
        }
        Pro()
    })


  return (
    <Container>
        <Table striped bordered hover>
        <thead>
            <tr>
            <th>Serial</th>
            <th>Name</th>
            <th>Price</th>
            <th>Link</th>
            </tr>
        </thead>
        <tbody>
            {product.map((item,index)=>(
                <tr>
                <td>{index+1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>Copy Link</td>
                </tr>
            ))}
        </tbody>
        </Table>
    </Container>
    
  )
}

export default AffiliateLink