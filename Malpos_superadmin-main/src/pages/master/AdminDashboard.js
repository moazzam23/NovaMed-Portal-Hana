import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import LineChart from "../../components/charts/LineChart";
import { Box } from "../../components/elements";
import MyLineChart from "../../components/charts/MyLineChart";
import ClientRequest from "../../components/ClientRequest";
import data from "../../data/clientsRequestData.json";
import internalData from "../../data/internalTasksData.json";
import InternalTaskList from "../../components/internalTaskList/InternalTaskList";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PieChartStatus from "../../components/charts/PieChartStatus";
import BarChartDocumentsPerUser from "../../components/charts/BarChartDocumentsPerUser";
import BarChartApprovalsByRole from "../../components/charts/BarChartApprovalsByRole";
import LineChartDocumentsOverTime from "../../components/charts/LineChartDocumentsOverTimes";
import StackedBarChartApprovalStatus from "../../components/charts/StackedBarChartApprovalStatus";
import { BASE_URL } from "../../apis/NodeApiUrl";
import PieChartRoles from "../../components/charts/PieChartRoles ";
import { motion } from "framer-motion";
import SapPostStatusChart from "../../components/charts/SapPostStatusChart";


export default function AdminDashboard() {
  const companyDB = localStorage.getItem("companyDB");
  const [showModal, setShowModal] = useState(false);
const [pendingCount, setPendingCount] = useState(0);
const navigate = useNavigate();

  //   const data = [
  //     { name: "Jan", value: 400 },
  //     { name: "Feb", value: 300 },
  //     { name: "Mar", value: 500 },
  //     { name: "Apr", value: 200 },
  //     { name: "May", value: 600 },
  //     { name: "Jun", value: 450 },
  //   ];

  const fetchPendingApprovalsAndShowPopup = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const res = await axios.get(`${BASE_URL}/users/${userId}/pending-approvals?CompanyDB=${companyDB}`);
      
      const count = res.data?.count || res.data?.pendingApprovals?.length || 0;
  
      if (count > 0) {
        setPendingCount(count);
        setShowModal(true);
      }
    } catch (err) {
      console.error("Failed to fetch pending approvals:", err);
    }
  };

  useEffect(() => {
    const justLoggedIn = sessionStorage.getItem("justLoggedIn");
    if (justLoggedIn === "true") {
      fetchPendingApprovalsAndShowPopup();
      sessionStorage.removeItem("justLoggedIn"); 
    }
  }, []);

  return (
    <div>
      <PageLayout >
        <Row  >
          <Col md={12} >
            <Row>
              
              <Col md={4}>
              <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >

              <CardLayout>
{/* <h5 className="text-center mb-3">Inventory Request Documents Status</h5> */}
              <PieChartStatus/>
              </CardLayout>
    </motion.div>
              </Col>
<Col md={4}>
              <CardLayout>
              <PieChartRoles/>
              </CardLayout>
              </Col>

          <Col md={4}>
              <CardLayout>
              <SapPostStatusChart/>
              </CardLayout>
              </Col>

              <Col md={6} >
                  <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
              <CardLayout>
              <BarChartDocumentsPerUser/>
              </CardLayout>
      </motion.div> 
              </Col>

              <Col md={6}>
              <CardLayout>
              <BarChartApprovalsByRole/>
              </CardLayout>
              </Col>
              
              <Col md={12} >
              <CardLayout>
              <LineChartDocumentsOverTime/>

              </CardLayout>
              </Col>
              {/* <Col md={6} >
              <CardLayout>
              <StackedBarChartApprovalStatus/>

              </CardLayout>
              </Col> */}
              
              {/* <Col md={12}>
                <CardLayout>
                  <ClientRequest title="Client Requests" />
                </CardLayout>
              </Col>
              <Col md={12}>
                <CardLayout>
                  <InternalTaskList
                    title={internalData?.clients.title}
                    dotsMenu={internalData?.clients.dotsMenu}
                    table={internalData?.clients.table}
                  />
                </CardLayout>
              </Col> */}
              {/* <Col md={4} >
                               <CardLayout>
                               <Box className='expricing-box'>
                                    <h6 className='m-sub'>Monthly Subcribtion Payment</h6>
                                </Box>
                                <hr/>
                                <Box className={'f-12'}>
                               <MyLineChart data={data} dataKey="value" lineColor="#8884d8" />
                               </Box>
                              </CardLayout>
                              <CardLayout>
                              <h6 className='brand-stat'>Bands Statatics (2)</h6>
                                <Box className={'brand-stat-2'}>
                                    <Box>
                                        <span>Average</span> 1393.2
                                    </Box>
                                    <Box>
                                        <span>Total</span> 1393.254334645
                                    </Box>
                                </Box>
                              </CardLayout>
                              <CardLayout>
                              <h6 className='brand-stat'>Price</h6>
                              <Box className={'f-12'}>
                              70m<br/>
                              445346645.500
                              </Box>       
                              </CardLayout>
                              <CardLayout>
                              <h6 className='brand-stat'>Count</h6>
                              <Box className={'f-12'}>
                              1<br/>
                              1145346645.500
                              </Box>  
                                
                              </CardLayout>
                            </Col>
                            <Col md={4}>
                                <CardLayout>
                                <Box className='expricing-box'>
                                    <h6 className='expricing'>Expricing</h6>
                                </Box>
                                <hr/>
                                <Box className={'expricing-details'}>
                                <Box className={'expricing-details-items'}>
                                    #Brand
                                </Box>
                                <Box className={'expricing-details-items'}>
                                    Expired
                                </Box>
                                <Box className={'expricing-details-items'}>
                                    Monthly
                                </Box>
                                <Box className={'expricing-details-items'}>
                                    Total
                                </Box>
                                </Box>
                                </CardLayout>
                            </Col>
                            <Col md={4}>
                            <CardLayout>
                                <Box className='expricing-box'>
                                    <h6 className='expired'>Expired</h6>
                                </Box>
                                <hr/>
                                <Box className={'expricing-details'}>
                                <Box className={'expricing-details-items'}>
                                    #Brand
                                </Box>
                                <Box className={'expricing-details-items'}>
                                    Expired
                                </Box>
                                <Box className={'expricing-details-items'}>
                                    Monthly
                                </Box>
                                <Box className={'expricing-details-items'}>
                                    Total
                                </Box>
                                </Box>
                                </CardLayout>
                            </Col> */}
            </Row>
          </Col>
        </Row>
      </PageLayout>
      {showModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3>Procced Approvals</h3>
            <p>{pendingCount} document(s) pending for your approval.</p>
            <button
              style={styles.button}
              onClick={() => {
                setShowModal(false);
                navigate("/pending-approvals");
              }}
            >
              Move to Approve
            </button>
            <button
              style={styles.cancelButton}
              onClick={() => {
                setShowModal(false);
                // navigate("/dashboard"); // Or just close if already there
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "400px",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "15px 20px",
    marginTop: "15px",
    marginRight: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  cancelButton: {
    backgroundColor: "#6c757d",
    color: "#fff",
    padding: "15px",
    marginTop: "15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

