import React, { useState, useEffect } from "react";
import { Col, Row, Table } from "react-bootstrap";
import PageLayout from "../../layouts/PageLayout";
import { CardLayout } from "../../components/cards";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export default function ViewWorkflows() {
  const [workflows, setWorkflows] = useState([]);
  const [expandedWorkflows, setExpandedWorkflows] = useState([]);
  const [showModal, setShowModal] = useState(false);
const [selectedWorkflow, setSelectedWorkflow] = useState(null);
const [newStatus, setNewStatus] = useState(null);

  const companyDB = localStorage.getItem("companyDB");


  const [userMap, setUserMap] = useState({});

const fetchRoles = async () => {
  try {
    const res = await axios.get(`http://localhost:5000/api/Users?companyDB=${companyDB}`);
    const map = {};
    res.data.forEach(user => {
      map[user.ID] = user.NAME;
    });
    setUserMap(map);
  } catch (error) {
    console.error("Roles fetch error:", error);
    toast.error("Failed to load roles");
  }
};

  useEffect(() => {
    FetchWorkflows();
    fetchRoles();  
  }, []);

  const handleToggleClick = (workflow) => {
    setSelectedWorkflow(workflow.WORKFLOW_ID);
    setNewStatus(!workflow.IS_ACTIVE);
    setShowModal(true);
  };
  

  const toggleWorkflow = (workflowId) => {
    setExpandedWorkflows((prev) =>
      prev.includes(workflowId)
        ? prev.filter((id) => id !== workflowId)
        : [...prev, workflowId]
    );
  };


  const parseAndMapUsers = (jsonString) => {
    if (!jsonString) return [];
    try {
      const codes = JSON.parse(jsonString);
      return codes.map(code => userMap[code] || code); // fallback to code if not found
    } catch (err) {
      return [jsonString]; // not an array
    }
  };
  
 
  const FetchWorkflows = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/workflow-templates?CompanyDB=${companyDB}`
      );
      setWorkflows(res.data.workflows);
      console.log(res.data.workflows);
    } catch (error) {
      console.log("Workflow fetch error:", error);
    }
  };

  // Helper to safely parse JSON strings
  const parseJSON = (str) => {
    try {
      return JSON.parse(str);
    } catch {
      return null;
    }
  };

  const handleConfirmStatusChange = async () => {
    try {
      await axios.patch(
        `http://localhost:5000/api/workflow-templates/${selectedWorkflow}/active?CompanyDB=${companyDB}`,
        { isActive: newStatus }  // or false
      );
      
      toast.success("Workflow status updated");
      FetchWorkflows(); // Refresh list
    } catch (err) {
      console.error("Status update failed:", err);
      toast.error("Failed to update workflow status");
    } finally {
      setShowModal(false);
      setSelectedWorkflow(null);
    }
  };
  

  return (
    <PageLayout>
      <CardLayout>
        <Col md={12} className="mb-4">
        {/* <div style={{ marginBottom: "20px" , display:"flex", flexDirection:"row", justifyContent:"space-between" }}>

          <h5 >Workflow Mechanism</h5>
           <Col xs={12} sm={6} md={3} style={{paddingLeft:"15%" }} >
            <Link to="/workflow">
                                <button className="cus-btn" style={{padding:"13px 20px"}}>
                                  {" "}
                                  <FontAwesomeIcon icon={faPlus} /> 
                                  Create
                                </button>
                              </Link>
            </Col>
        </div>  */}
          <div style={{display:"flex" , flexDirection:"row" , justifyContent:"space-between",marginBottom:"30px"}}>
                                            
                                                        <h3 style={{textAlign:"left",fontSize:"30px",fontWeight:"400"}}>View Approval Setup</h3>
                                             <Link to="/workflow">
                                              <button className="premium-btn premium-create">
                                                <FontAwesomeIcon icon={faPlusCircle} /> Create Approvals
                                              </button>
                                            </Link>
                                                  </div>
          {/* <Table size="sm" className="mc-table" bordered>
            <thead className="mc-table-head primary">
              <tr className="text-center" style={{ fontSize: "13px", fontWeight: "bold" }}> */}
         
          <div className="p-2 pb-3" style={{border:"1px solid grey", borderRadius:"15px"}}>

                  <div className="premium-table-container">
  <div className="premium-table-wrapper">
    <table className="premium-table">
      <thead>

      {/* </thead> */}
      <tr>
                <th >Steps</th>
                <th>Originators</th>
                <th >Workflow Name</th>
                <th >Doc Type</th>
                <th >Active</th>
              </tr>
            </thead>
            <tbody>
              {workflows.map((wf) => (
                <React.Fragment key={wf.WORKFLOW_ID}>
                  <tr>
                    <td
                      onClick={() => toggleWorkflow(wf.WORKFLOW_ID)}
                      style={{ cursor: "pointer", fontWeight: "bold", textAlign: "center" }}
                    >
                      {expandedWorkflows.includes(wf.WORKFLOW_ID) ? "−" : "+"}
                    </td>
                    <td>
  {parseAndMapUsers(wf.ALLOWED_CREATORS).map((name, index) => (
    <div key={index}>{name}</div>
  ))}
</td>
                    <td>{wf.WORKFLOW_NAME}</td>
                    <td>{wf.DOC_TYPE_ID}</td>
                    {/* <td>{wf.IS_ACTIVE ? "Yes" : "No"}</td> */}
                    <td style={{ textAlign: "center" }}>
                    <input
  type="checkbox"
  checked={wf.IS_ACTIVE}
  onChange={() => handleToggleClick(wf)}
/>

</td>
                  </tr>

                  {expandedWorkflows.includes(wf.WORKFLOW_ID) && (
                    <tr style={{background:"darkgrey"}}>
                      <td colSpan={5}>
                        {/* <Table size="sm" bordered>
                          <thead className="mc-table-head primary"> */}
                       {/* <div className="p-2 pb-3" style={{border:"1px solid grey", borderRadius:"15px"}}> */}

                  <div className="premium-table-container" style={{border:"2px solid gray"}} >
  <div className="premium-table-wrapper">
    <table className="premium-table">
      <thead style={{textAlign:"left"}} >
                            <tr style={{ fontSize: "12px", fontWeight: "bold" }}>
                              <th style={{borderRight:"1px solid white"}} >Step Order</th>
                              <th >Approvers</th>
                              <th>Action Type</th>
                              {/* <th>Condition</th> */}
                              <th>No. of Approvals</th>
                              <th>No. of Rejections</th>
                            </tr>
                          </thead>
                          <tbody className="mc-table-body">
                            {wf.steps.map((step) => (
                              <tr key={step.STEP_ID}>
                                <td>{step.STEP_ORDER}</td>
                                <td>
  {parseAndMapUsers(step.ROLE_NAMES).map((name, index) => (
    <div key={index}>{name}</div>
  ))}
</td>

<td>{step.ACTION_TYPE?.toUpperCase()}</td>

                                {/* <td>{step.STEP_CONDITION || "—"}</td> */}
                                <td>{step.NO_OF_APPROVAL || "—"}</td>
                                <td>{step.NO_OF_REJECTION ?? "—"}</td>
                              </tr>
                            ))}
                          </tbody>
                          </table>
                          </div>
                          </div>
                        {/* </Table> */}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          {/* </Table> */}
          </table></div>
          </div>

</div>        </Col>
      </CardLayout>
      {showModal && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
    }}
  >
    <div
      style={{
        backgroundColor: "#fff",
        padding: "30px 25px",
        borderRadius: "12px",
        width: "400px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
        textAlign: "center",
        animation: "fadeIn 0.3s ease-in-out",
      }}
    >
      <h5 style={{ fontWeight: "bold", marginBottom: "10px" }}>
        Confirm Status Change
      </h5>
      <p style={{ marginBottom: "20px", fontSize: "16px" }}>
        Are you sure you want to{" "}
        <strong>{newStatus ? "Activate" : "Deactivate"}</strong> this workflow?
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <button className="btn btn-danger" onClick={handleConfirmStatusChange}>
          Yes, Confirm
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


    </PageLayout>
  );
}
