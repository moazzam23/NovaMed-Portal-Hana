import React, { useState, useEffect } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "../../layouts/PageLayout";
import { CardLayout } from "../../components/cards";
import SelectField from "../../components/fields/SelectField";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCirclePlus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { LabelField } from "../../components/fields";
import MultiSelectField from "../../components/fields/MultiSelectField";
import { BASE_URL } from "../../apis/NodeApiUrl";

export default function CreateWorkFlowTemplate() {
  const navigate = useNavigate();
  const companyDB = localStorage.getItem("companyDB");

  const [roles, setRoles] = useState([]);
  const [workflowName, setWorkflowName] = useState("");
  const [steps, setSteps] = useState([]);
  const [docId, setDocId] = useState("");  
  const [creators, setCreators] = useState([]);

  const documentTypes = [
    { label: "Inventory Request", value: "Inventory Request" },
    { label: "Good Issue", value: "Good Issue" },

  ];

  const actionTypes = [
    { label: "Approve", value: "approve" },
    { label: "Review", value: "review" },
    { label: "Reject", value: "reject" },
  ];

  useEffect(() => {
    fetchRoles();
  }, []);

  // const fetchRoles = async () => {
  //   try {
  //     const res = await axios.get(`${BASE_URL}/api/Users?companyDB=${companyDB}`);
  //     const formattedRoles = res.data.map((role) => ({
  //       label: role.NAME,
  //       value: role.ID, 
  //     }));
  //     console.log(formattedRoles)
  //     setRoles(formattedRoles);
  //   } catch (error) {
  //     console.error("User fetch error:", error);
  //     toast.error("Failed to load user");
  //   }
  // };
const fetchRoles = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/Users?companyDB=${companyDB}`);
      const formattedRoles = Array.isArray(res.data)
        ? res.data.map((role) => ({
            label: role.NAME,
            value: role.ID,
          }))
        : [];
      console.log("Fetched roles:", formattedRoles);
      setRoles(formattedRoles);
    } catch (error) {
      console.error("User fetch error:", error);
      toast.error("Failed to load roles");
    }
  };
  
  const addStep = () => {
    setSteps([
      ...steps,
      { stepOrder: steps.length + 1, roleNames: [], condition: "", actionType: "approve" ,noOfApproval:"",noOfRejection:""},
    ]);
  };

  const deleteStep = (index) => {
    if (steps.length === 1) return; 
    const newSteps = steps.filter((_, i) => i !== index);
    const updatedSteps = newSteps.map((step, idx) => ({ ...step, stepOrder: idx + 1 }));
    setSteps(updatedSteps);
  };

  const updateStep = (index, field, value) => {
    const newSteps = [...steps];
    newSteps[index][field] = value;
    setSteps(newSteps);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!docId) {
      toast.error("Please select a Document Type");
      return;
    }
  
    if (!workflowName) {
      toast.error("Please enter workflow name");
      return;
    }
  
    if (steps.length === 0) {
      toast.error("Please add at least one workflow step");
      return;
    }
  
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      if (step.noOfApproval <= 0) {
        toast.error(`Step ${i + 1}: Approvals must be greater than 0`);
        return;
      }
      if (step.noOfRejection <= 0) {
        toast.error(`Step ${i + 1}: Rejections must be greater than 0`);
        return;
      }
    }
    
    console.log("SKDKSS",steps)

    try {
      const templatePayload = { docId, workflowName,creators: creators, };
      const templateRes = await axios.post(
        `${BASE_URL}/api/workflow-templates?CompanyDB=${companyDB}`,
        templatePayload
      );
  
      const workflowId = templateRes.data.workflowId;
  
      if (!workflowId) {
        toast.error("Failed to get workflow ID from template creation");
        return;
      }
   const stepsPayload = {
        workflowId,
        steps: steps.map((step) => ({
          stepOrder: step.stepOrder,
          roleNames: step.roleNames,
          condition: step.condition,
          noOfApproval:step.noOfApproval,
          noOfRejection:step.noOfRejection,
          actionType: step.actionType,
        })),
      };
  
      await axios.post(
        `${BASE_URL}/api/workflow-steps?CompanyDB=${companyDB}`,
        stepsPayload
      );
  
    toast.success("Workflow template and steps created successfully");
    navigate("/viewworkflows")
      setDocId("");
      setWorkflowName("");
      setCreators([]);
      setSteps([]);
  } catch (error) {
      console.error("Submit error:", error);
      toast.error("Failed to create workflow template and steps");
    }
  };
  
  console.log(creators)

  return (
    <PageLayout>
      <form onSubmit={handleSubmit}>
        <Row>
          <CardLayout>
            {/* <Col md={12} className="mb-4">
              <h3>Create Workflow Template</h3>
            </Col> */}
<Col md={12} style={{marginBottom:"30px"}} >
                  <h2 style={{textAlign:"left" ,fontWeight:"400",fontSize:"30px"}}>Approval Template</h2>
              </Col>
            {/* Document Type Dropdown */}
            <Row>
              <Col md={12}>
              <div className="main-doc"> <FontAwesomeIcon icon={faPlus}/> Approval Stage</div>
              </Col>

            <Col md={4}>
            <SelectField
    label="Document Type"
    className="form-control"
    options={documentTypes}
    value={docId}              // selected document type value
    onChange={(e) => setDocId(e.target.value)}  // update state when changed
  />
            </Col>
          <Col md={4}>
                  <LabelField
                  label={"Workflow Name"}
                  type="text"
                  className="form-control"
                  value={workflowName}
                  onChange={(e) => setWorkflowName(e.target.value)}
                  placeholder="Enter workflow name"
                  />
               </Col>

               <Col md={4}>
               <MultiSelectField
  style={{ marginTop: "-25px" }}
  options={roles}
  title="Creator(s)"
  // value={roles.filter(role => creators.includes(role.value))}
  // onChange={(selected) => {
  //   const selectedValues = Array.isArray(selected)
  //     console.log(selected)
  //     console.log(creators)
  //     console.log(roles)
  //     console.log(selectedValues)
  //   setCreators(selectedValues);
  // }}
  value={roles.filter((role) => creators.includes(role.value))} // must pass full objects
        onChange={(selectedIds) => {
          setCreators(selectedIds); // selectedIds = [1, 2, ...]
        }}
  className="form-control "
  placeholder="Select creator roles"
/>
                        </Col>
           
                      </Row>
           <hr style={{height:"3px",marginTop:"30px" }}/>
           <Col md={12} className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4 mt-3">
               <h4  >Approval Steps</h4>
               <button
                 type="button"
                 className="premium-btn premium-filter"
                 onClick={addStep}
               >
                 <FontAwesomeIcon icon={faPlus} /> Add Row
               </button>
             </div>
              {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button type="button" className="btn btn-secondary mb-4" onClick={addStep}>
                  <FontAwesomeIcon icon={faPlus} /> Add Step
                </button>
              </div> */}
          <div className="p-2 pb-3" style={{border:"1px solid grey", borderRadius:"15px"}}>

              <Table>
                <thead className="thead text-center  custom-table-header" style={{ fontSize: "13px" }}>
                  <tr>
                    <th style={{borderRight:"1px solid white"}}  >Approver</th>
                    <th style={{borderRight:"1px solid white"}} >Approval Required</th>
                    <th style={{borderRight:"1px solid white"}} >Rejection Required</th>
                    <th style={{borderRight:"1px solid white"}}>Action Required</th>
                    <th >Delete</th>
                  </tr>
                </thead>
                <tbody >
                  {steps.map((step, index) => (
                    <tr key={index}>
                      <td  >
                        <div  style={{ marginTop: "-25px" }}>

             <MultiSelectField
  // title="Role(s)" // optional title if you want to show one
  style={{ marginTop: "-5px" }}
  options={roles}
  value={roles.filter((role) =>
    Array.isArray(step.roleNames) ? step.roleNames.includes(role.value) : false
  )}
  onChange={(selectedValues) => {
    updateStep(index, "roleNames", selectedValues);
  }}
/>
  </div>

                      </td>
                      <td>
                      <input
  type="number"
  className="form-control"
  min="1"
  value={step.noOfApproval}
  onChange={(e) => updateStep(index, "noOfApproval", parseInt(e.target.value) || 0)}
/>


                      </td>
                      <td>
                      <input
  type="number"
  className="form-control"
  min="1"
  value={step.noOfRejection}
  onChange={(e) => updateStep(index, "noOfRejection", parseInt(e.target.value) || 0)}
/>


                      </td>
                      <td>
                        <select
                        style={{marginLeft:"0px"}}
                          className="form-control"
                          value={step.actionType}
                          onChange={(e) => updateStep(index, "actionType", e.target.value)}
                        >
                          {actionTypes.map((action) => (
                            <option key={action.value} value={action.value}>
                              {action.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="text-center">
                        <button
                        style={{fontSize:"15px",marginTop:"-10px"}}
                          type="button"
                          className="btn btn-link text-danger"
                          onClick={() => deleteStep(index)}
                          disabled={steps.length === 1}
                        >
                          <FontAwesomeIcon icon={faTrash}  />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              </div>
            </Col>

            <Col md={12} className="mt-3">
              <button type="submit" className="premium-btn premium-create">
                <FontAwesomeIcon icon={faCirclePlus}/> Create Template
              </button>

              <Link to="/viewWorkflows" className="ms-2" >
              <button
                        style={{
                          color: "white",
                        }}
                        className="premium-btn premium-filter"
                      >
                        <FontAwesomeIcon icon={faCircleArrowLeft}/>
                        Back
                      </button>
              </Link>
            </Col>
          </CardLayout>
        </Row>
      </form>
    </PageLayout>
  );
}