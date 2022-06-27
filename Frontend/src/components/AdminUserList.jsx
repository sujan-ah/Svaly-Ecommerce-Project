import React from 'react'
import { useEffect } from 'react'
import { Container,Row,Col,Table,Button } from 'react-bootstrap'
import AdminNavbar from './AdminNavbar'
import axios from 'axios'
import { useState } from 'react'

const AdminUserList = () => {                       /* class: 66 part-1 */ 
    const [userList, setUserlist] = useState([])
    // console.log(userList);

    useEffect(()=>{                                 /* class: 66 part-2 */ 
        async function userlist(){
            let {data} = await axios.get('/api/users/userlist')
            setUserlist(data);
        }
        userlist()
    },[])

    let handleUserDelete = async (id) =>{           /* class: 66 HW */
        let {data} = await axios.post(`/api/users/userlist/${id}`)
        console.log(data);
    }


    return (
        <Container>
            <Row>
                <Col lg={3}>
                    <AdminNavbar active="userList"/>
                </Col>

                <Col lg={9}>                             {/* class: 66 part-2 */} 
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Serial</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Position</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList.map((item,index)=>(
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.isVendor? 'vendor' : item.isAffiliate? 'affiliate': ''}</td>
                                    <td>
                                        <Button 
                                            variant="danger"
                                            onClick={()=> handleUserDelete(item._id)}
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