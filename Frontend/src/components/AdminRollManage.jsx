import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { Container,Row,Col,Tab,Tabs,Form,Button } from 'react-bootstrap'
import AdminNavbar from './AdminNavbar'


const AdminRollManage = () => {
  const [name,setName] = useState('')

  let rolelist = []

  let handleProductUpload = () =>{
    if(rolelist.indexOf("productUpload") !== -1){
      rolelist.splice(rolelist.indexOf("productUpload"))
      console.log("ache", rolelist);
    }else{
      rolelist.push("productUpload")
      console.log("nai", rolelist);
    }
  }

  let handleCatagoryUpload = () =>{
    if(rolelist.indexOf("catagoryUpload") !== -1){
      rolelist.splice(rolelist.indexOf("catagoryUpload"), 1)
      console.log("ache", rolelist);
    }else{
      rolelist.push("catagoryUpload")
      console.log("nai", rolelist);
    }
  }

  let handleBrandUpload = () =>{
    if(rolelist.indexOf("brandUpload") !== -1){
      rolelist.splice(rolelist.indexOf("brandUpload"), 1)
      console.log("ache", rolelist);
    }else{
      rolelist.push("brandUpload")
      console.log("nai", rolelist);
    }
  }

  let handleBlog = () =>{
    if(rolelist.indexOf("blog") !== -1){
      rolelist.splice(rolelist.indexOf("blog"), 1)
      console.log(rolelist);
    }else{
      rolelist.push("blog")
      console.log(rolelist);
    }
  }

  let handleProApprove = () =>{
    if(rolelist.indexOf("productApprove") !== -1){
      rolelist.splice(rolelist.indexOf("productApprove"),1)
      console.log(rolelist);
    }else{
      rolelist.push("productApprove")
      console.log(rolelist);
    }
  }
  



  return (
    <Container>
        <Row>
            <Col lg={3}>
                <AdminNavbar active='rolemanage' />
            </Col>

            <Col lg={9}>
              <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="rolelist" title="Role List">
                  Sujan
                </Tab>
                <Tab eventKey="asignrole" title="Asign Role">
                  Surobi
                </Tab>

                <Tab eventKey="createrole" title="Create Role">
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Create Role</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Create Role"
                        onChange={(e)=> setName(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Check 
                      type="checkbox"
                      id="checkbox"
                      label="Product Upload"
                      onChange={handleProductUpload}
                    />
                    <Form.Check 
                      type="checkbox"
                      id="checkbox"
                      label="Catagory Upload"
                      onChange={handleCatagoryUpload}
                    />
                    <Form.Check 
                      type="checkbox"
                      id="checkbox"
                      label="Brand Upload"
                      onChange={handleBrandUpload}
                    />
                    <Form.Check 
                      type="checkbox"
                      id="checkbox"
                      label="Blog"
                      onChange={handleBlog}
                    />
                    <Form.Check 
                      type="checkbox"
                      id="checkbox"
                      label="Product Approve"
                      onChange={handleProApprove}
                    />

                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                </Tab>
              </Tabs>
            </Col>
        </Row>
    </Container>
  )
}

export default AdminRollManage