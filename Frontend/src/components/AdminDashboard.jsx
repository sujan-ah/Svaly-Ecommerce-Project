import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import AdminNavbar from './AdminNavbar'


const AdminDashboard = () => {
  return (
    <Container>
        <Row>
            <Col lg={3}>
              <AdminNavbar/>
            </Col>

            <Col lg={9}>
              <h1>Welcome To Admin Dashboard. You Have The Super Power To Controll Everything.</h1> 
            </Col>
        </Row>
    </Container>
  )
}

export default AdminDashboard