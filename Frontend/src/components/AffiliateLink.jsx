import axios from 'axios'
import { useEffect,useState } from 'react'
import { Container,Table } from 'react-bootstrap'

const AffiliateLink = () => {
    const [pro, setPro] = useState([])

    useEffect(()=>{
        async function pro(){
            let {data} = await axios.get('/products')
            setPro(data);
        }
        pro()
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
                    {pro.map((item,index)=>(
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