import { Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link,useNavigate } from "react-router-dom";

import { CardLayout } from "../../components/cards";
import { LabelField } from "../../components/fields";
import MultiSelectField from "../../components/fields/MultiSelectField";
import SelectField from "../../components/fields/SelectField";
import PageLayout from "../../layouts/PageLayout";
import axiosInstance from "../../apis";
import { BASE_URL } from "../../apis/NodeApiUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export default function RoleCreate() {

  useEffect(()=>{

    if(RoleId)
      getRoleData(RoleId)

  },[])
 
const navigate = useNavigate();
const companyDB = localStorage.getItem("companyDB");
const RoleId = localStorage.getItem("updateroleId");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getRoleData = async (RoleId) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/roles/${RoleId}?companyDB=${companyDB}`);
      
      console.log(res)
      if (res.data) {
        const first = res.data; // assuming single role per form edit
        console.log(first)
        setFormData({
          // ROLE_ID: first.ROLE_ID,
          name: first.NAME,
          description: first.DESCRIPTION,
        });
      }
  
    } catch (error) {
      console.error("Failed to fetch  role data:", error);
      toast.error("Error loading  role data");
    }
  };

  // const handleCheckChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     is_active: e.target.checked,
  //   });
  // };

  
  const handleSubmit = async (e) => {
    // const updatedFormData = {
    //     ...formData
    // }
    const payload = {
      name: formData.name,
      description: formData.description,
    };
    e.preventDefault();

   
    try {
        //  const  response = await axios.post(`http://localhost:5000/api/roles?CompanyDB=${companyDB}`, updatedFormData);
        //   console.log(response.data);
        //   toast.success("Role created successfully", {
        //     autoClose: 4000,
        //   });
        //   navigate("/roles")
        //   resetForm();
        if (RoleId) {
          // Edit mode
          await axios.put(`${BASE_URL}/api/roles/${RoleId}?companyDB=${companyDB}`, payload, // matches your backend structure
          );
          toast.success(" Role updated successfully");
          localStorage.removeItem("updateroleId"); 
          resetForm();
navigate("/roles");
        } else {
          // Create mode
          await axios.post(`${BASE_URL}/api/roles?companyDB=${companyDB}`, payload);
          toast.success(" Role created successfully");
          resetForm();
          navigate("/roles");
        }
        
      } catch (error) {
        localStorage.removeItem("updateroleId"); 
        toast.error("Error creating/updating Role", error);
      }
  };


  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
    });
  };

  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              {/* <h3>Create Role</h3> */}
               <h3 style={{textAlign:"left",fontSize:"30px",fontWeight:"400"}}>Create Roles</h3>
            </CardLayout>
          </Col>
          <Col md={12}>
            <form onSubmit={handleSubmit}>
              <CardLayout>
                <Row>
                  <Col md={4}>
                    <LabelField
                      label="Role Name"
                      style={{border:"1px solid grey", borderRadius:"15px"}}
                      name="name"
                      type="text"
                      placeholder="Enter role name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={5}>
                    <LabelField
                      label="Description"
                      style={{border:"1px solid grey", borderRadius:"15px",width:"100%"}}
                      name="description"
                      type="text"
                      placeholder="Enter description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={12}>
                    <button className="premium-btn premium-create" type="submit">
                     <FontAwesomeIcon icon={faPlusCircle} /> Create
                    </button>
                    <Link to="/roles" className="ms-3">
                      <button
                        style={{
                          // backgroundColor: "#F07632",
                          color: "white",
                          // borderColor: "#F07632",
                        }}
                        className="premium-btn premium-filter "
                      >
                        <FontAwesomeIcon icon={faArrowAltCircleLeft}/>
                        Back
                      </button>
                    </Link>
                  </Col>
                </Row>
              </CardLayout>
            </form>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}