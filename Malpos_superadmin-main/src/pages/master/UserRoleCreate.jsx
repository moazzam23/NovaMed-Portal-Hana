import { Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import { CardLayout } from "../../components/cards";
import { LabelField } from "../../components/fields";
import MultiSelectField from "../../components/fields/MultiSelectField";
import SelectField from "../../components/fields/SelectField";
import PageLayout from "../../layouts/PageLayout";
import axiosInstance from "../../apis";
import { BASE_URL } from "../../apis/NodeApiUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

export default function UserRoleCreate() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    ROLE_ID: "",
    PERMISSION: [],
  });

  const navigate = useNavigate();
  const roleid = localStorage.getItem("userroleid");
  const companyDB = localStorage.getItem("companyDB");

  const permissionOptions = [
    { label: "Inventory Request Documents", value: "inventory_request" },
    { label: "Stock Issue Documents", value: "good-issue" },
    { label: "View Roles", value: "roles" },
    { label: "Manager Users", value: "user" },
    { label: "Manager Customer", value: "customer-detail" },
    { label: "Permissions", value: "view-user-roles" },
    { label: "Email Configuration", value: "email-config" },
    { label: "Email Template Group", value: "email-templates" },
    { label: "Email Approval Template", value: "email-approval" },
    { label: "Email Approval Report", value: "email-approval-view" },
    { label: "Pending Email Approval", value: "email-approval-pending" },
    { label: "Document Sequence", value: "doc-seq" },
    { label: "View Pending Approvals", value: "pending-approvals" },
    { label: "View Documents", value: "viewdocuments" },
    { label: "View Approvals", value: "view-approvals" },
    { label: "View Workflows", value: "viewWorkflows" },
    { label: "AdminWorkspace", value: "Admin" },
  ];

  const getRoles = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/roles?companyDB=${companyDB}`
      );
      const formattedData = response.data.map((r) => ({
        label: `${r.ID} - ${r.NAME}`,
        value: r.ID,
      }));
      setRoles(formattedData);
    } catch (error) {
      console.log("Error fetching roles", error);
    }
  };

  const getUserRoleData = async (id) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/roles/${id}/permissions?companyDB=${companyDB}`
      );
      if (res.data) {
        setFormData({
          ROLE_ID: res.data.roleId,
          PERMISSION: res.data.permissions,
        });
      }
    } catch (error) {
      console.error("Error fetching role data", error);
      toast.error("Failed to load role permissions");
    }
  };

  useEffect(() => {
    getRoles();
    if (roleid) {
      getUserRoleData(roleid);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePermissionChange = (selectedOptions) => {
    const values = selectedOptions.map((option) =>
      typeof option === "string" ? option : option.value
    );
    setFormData({ ...formData, PERMISSION: values });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ROLE_ID: formData.ROLE_ID,
      PERMISSION: formData.PERMISSION.join(","),
    };

    try {
      if (roleid) {
        // Update existing role permissions
        await axios.put(
          `${BASE_URL}/api/roles/${roleid}/permissions?companyDB=${companyDB}`,
          {
            permissions: formData.PERMISSION,
          }
        );
        toast.success("User permission updated successfully");
        localStorage.removeItem("userroleid");
      } else {
        // Create new role permissions
        await axios.post(
          `${BASE_URL}/api/roles/${formData.ROLE_ID}/permissions?companyDB=${companyDB}`,
          {
            permissions: formData.PERMISSION,
          }
        );
        toast.success("User permission created successfully");
      }

      resetForm();
      navigate("/view-user-roles");
    } catch (error) {
      localStorage.removeItem("userroleid");
      console.error(error);
      toast.error("Error creating/updating permissions");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      ROLE_ID: "",
      PERMISSION: [],
    });
  };

  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              {/* <h3></h3> */}
              <h3
                style={{
                  textAlign: "left",
                  fontSize: "30px",
                  fontWeight: "400",
                }}
              >
                {roleid ? "Edit" : "Create"} User Permissions
              </h3>
            </CardLayout>
          </Col>
          <Col md={12}>
            <form onSubmit={handleSubmit}>
              <CardLayout>
                <Row>
                  <Col md={5}>
                    <SelectField
                      label="Select Role"
                      name="ROLE_ID"
                      options={roles}
                      value={formData.ROLE_ID}
                      onChange={handleChange}
                      disabled={!!roleid} // disable dropdown in edit
                    />
                  </Col>

                  <Col md={5} style={{ marginTop: "30px" }}>
                    <MultiSelectField
                      title="Permissions"
                      name="PERMISSION"
                      // className="mt-4"
                      options={permissionOptions}
                      value={permissionOptions.filter((option) =>
                        formData.PERMISSION.includes(option.value)
                      )}
                      onChange={handlePermissionChange}
                    />
                  </Col>

                  <Col md={12}>
                    <button
                      className="premium-btn premium-create"
                      type="submit"
                      disabled={loading}
                    >
                      <FontAwesomeIcon icon={faCirclePlus} />
                      {loading ? "Saving..." : roleid ? "Update" : "Create"}
                    </button>

                    <Link to="/view-user-roles" className="ms-2">
                      <button
                        className="premium-btn premium-filter "
                        type="button"
                      >
                        <FontAwesomeIcon icon={faArrowAltCircleLeft} />
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
