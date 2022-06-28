import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const AdminNavbar = () => {
  return (
    <ListGroup>
        <ListGroup.Item>
            <Link to="adminuserlist">
                User List
            </Link>
        </ListGroup.Item>

        <ListGroup.Item>Product List</ListGroup.Item>
        <ListGroup.Item>Product Upload</ListGroup.Item>
        <ListGroup.Item>Catagory Upload</ListGroup.Item>
        <ListGroup.Item>Brand Upload</ListGroup.Item>
        <ListGroup.Item>Blog</ListGroup.Item>
        <ListGroup.Item>Product Approve</ListGroup.Item>
        <ListGroup.Item>Role Asign</ListGroup.Item>
    </ListGroup>
  )
}

export default AdminNavbar