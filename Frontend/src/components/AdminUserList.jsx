import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { Container,Row,Col,Table,Button } from 'react-bootstrap'
import AdminNavbar from './AdminNavbar'


const AdminUserList = () => {
    const [userAll,setUserAll] = useState([])

    useEffect(()=>{
        async function User(){
            let {data} = await axios.get('/api/users/adminuser')
            setUserAll(data);
        }
        User()
    },[])


  return (
    <Container>
        <Row>
            <Col lg={3}>
                <AdminNavbar active='userlist' />
            </Col>

            <Col lg={9}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Serial</th>
                    <th>User Name</th>
                    <th>User Email</th>
                    <th>User Position</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userAll.map((item,index)=>(
                        <tr>
                        <td>{index+1}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>
                            {item.isVendor ? "vendor" : ""}
                            {' '}
                            {item.isAffiliate ? "affiliate" : ""}
                        </td>
                        <td>
                            <Button 
                                variant="danger"
                                
                            >
                                Delete
                            </Button>
                        </td>
                        </tr>
                    ))}
                    
                </tbody>
            </Table>
            </Col>
        </Row>
    </Container>
  )
}

export default AdminUserList