import React, { useState, useEffect } from "react";
import { Col, Row, Table } from "react-bootstrap";
import PageLayout from "../../layouts/PageLayout";
import { CardLayout } from "../../components/cards";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../../apis/NodeApiUrl";

export default function EmailApprovalTemplate() {
  const [workflows, setWorkflows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [newStatus, setNewStatus] = useState(null);

  const companyDB = localStorage.getItem("companyDB");

  useEffect(() => {
    FetchEmailApproval();
  }, []);

  const handleToggleClick = (workflow) => {
    setSelectedWorkflow(workflow.ID);
    setNewStatus(workflow.STATUS !== "ACTIVE");
    setShowModal(true);
  };

  const FetchEmailApproval = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/email-approval?companyDB=${companyDB}`
      );
      setWorkflows(res.data);
      console.log(res.data.workflows);
    } catch (error) {
      console.log("Workflow fetch error:", error);
    }
  };

  const handleConfirmStatusChange = async () => {
    try {
      await axios.patch(
        `${BASE_URL}/api/email-approval/${selectedWorkflow}/status?companyDB=${companyDB}`,
        { status: newStatus ? "ACTIVE" : "INACTIVE" }
      );

      toast.success("Workflow status updated");
      FetchEmailApproval(); // Refresh
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "30px",
            }}
          >
            <h3
              style={{ textAlign: "left", fontSize: "30px", fontWeight: "400" }}
            >
              View Approval Setup
            </h3>
            <Link to="/email-template-approval">
              <button className="premium-btn premium-create">
                <FontAwesomeIcon icon={faPlusCircle} /> Create Approvals
              </button>
            </Link>
          </div>
          <div
            className="p-2 pb-3"
            style={{ border: "1px solid grey", borderRadius: "15px" }}
          >
            <div className="premium-table-container">
              <div className="premium-table-wrapper">
                <table className="premium-table">
                  <thead>
                    {/* </thead> */}
                    <tr>
                      <th>ID</th>
                      <th>Email Template Type</th>
                      <th>Approvers</th>
                      <th>Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workflows.map((wf) => (
                      <React.Fragment key={wf.ID}>
                        <tr>
                          <td
                            style={{
                              cursor: "pointer",
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            {wf.ID}
                          </td>
                          <td>{wf.TEMPLATE_NAME}</td>
                          <td>
                            {wf.APPROVERS && wf.APPROVERS.length > 0 ? (
                              wf.APPROVERS.map((approver, idx) => (
                                <div key={idx}>
                                  {approver.name || approver.NAME}
                                </div>
                              ))
                            ) : (
                              <em>No Approvers</em>
                            )}
                          </td>

                          <td style={{ textAlign: "center" }}>
                            <input
                              type="checkbox"
                              checked={wf.STATUS === "ACTIVE"}
                              onChange={() => handleToggleClick(wf)}
                            />
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>{" "}
        </Col>
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
              <strong>{newStatus ? "Activate" : "Deactivate"}</strong> this
              workflow?
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <button
                className="btn btn-danger"
                onClick={handleConfirmStatusChange}
              >
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
