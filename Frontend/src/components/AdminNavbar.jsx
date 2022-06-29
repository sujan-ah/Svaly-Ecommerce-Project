import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const AdminNavbar = (props) => {
  return (
    <ListGroup as="ul">
      <ListGroup.Item as="li" active={props.active == 'userlist' ? true : false}>
        <Link to='/adminUserList'
            style={{color: `${props.active == 'userlist' ? 'white' : 'black'}`}}
        >
            User List
        </Link>
       
      </ListGroup.Item>

      <ListGroup.Item as="li">Product List</ListGroup.Item>
      <ListGroup.Item as="li">Product Upoload</ListGroup.Item>
      <ListGroup.Item as="li">Catagory Upoload</ListGroup.Item>
      <ListGroup.Item as="li">Brand Upoload</ListGroup.Item>
      <ListGroup.Item as="li">Blog</ListGroup.Item>
      <ListGroup.Item as="li">Product Approve</ListGroup.Item>

      <ListGroup.Item as="li" active={props.active == 'rolemanage' ? true : false}>
        <Link to='/adminRoleManage'
          style={{color: `${props.active == 'rolemanage' ? 'white' : 'black'}`}}
        >
          Role Assign
        </Link>
    
      </ListGroup.Item>
    </ListGroup>
  )
}

export default AdminNavbar