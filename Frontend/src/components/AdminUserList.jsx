import React from 'react'
import { Container,Row,Col,ListGroup } from 'react-bootstrap'
import AdminNavbar from './AdminNavbar'


const AdminUserList = () => {
  return (
    <Container>
        <Row>
            <Col lg={3}>
                <AdminNavbar active="userlist" />
            </Col>

            <Col lg={9}>
                
            </Col>
        </Row>
    </Container>
  )
}

export default AdminUserList