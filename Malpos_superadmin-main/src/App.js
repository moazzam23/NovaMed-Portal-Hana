import { ThemeProvider } from "./context/Themes";
import { LoaderProvider } from "./context/Preloader";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Documentation, ChangeLog, Error } from "./pages/supports";
import {
  Avatars,
  Alerts,
  Buttons,
  Charts,
  Tables,
  Fields,
  Headings,
  Colors,
} from "./pages/blocks";
import {
  Ecommerce,
  Analytics,
  CRM,
  ForgotPassword,
  Register,
  Login,
  UserList,
  UserProfile,
  MyAccount,
  ProductList,
  ProductView,
  ProductUpload,
  InvoiceList,
  InvoiceDetails,
  OrderList,
  Message,
  Notification,
  BlankPage,
  Settings,
} from "./pages/master";
import Preparation from "./pages/master/Preparation";
import Ingredients from "./pages/master/Ingredients";
import IngredientsDetails from "./components/Tabs/IngredientsDetails";
import Categories from "./pages/master/Categories";
import Station from "./pages/master/Station";
import AuthProvider from "./context/Auth";

import PreparationView from "./pages/master/PreparationView";

import Rearrangement from "./pages/master/Rearrangement";
import Constructure from "./pages/master/Constructure";
import ConstructureEdit from "./pages/master/ConstructureEdit";
import ConstructureProduct from "./pages/master/ConstructureProduct";
import ConstructureDish from "./pages/master/ConstrucureDish";
import ManageModifier from "./pages/master/ManageModifier";
import ManageModifierEdit from "./pages/master/ManageModifierEdit";
import ManageModifierDuplicate from "./pages/master/ManageModifierDuplicate";
import Receipt from "./pages/master/Receipt";
import ReceiptEdit from "./pages/master/ReceiptEdit";
import Clients from "./pages/master/Clients";
import ClientCreate from "./pages/master/ClientCreate";
import AdminDashboard from "./pages/master/AdminDashboard";
import AdminTransaction from "./pages/master/AdminTransaction";
import Brands from "./pages/master/Brands";
import CreateBrand from "./pages/master/CreateBrand";
import Users from "./pages/master/Users";
import UserCreate from "./pages/master/UserCreate";
import Branches from "./pages/master/Branches";
import CreateBranch from "./pages/master/CreateBranches";
import Roles from "./pages/master/Roles";

import RequireAuth from "./Guard/RequireAuth";
import RoleCreate from "./pages/master/RoleCreate";
import CreateClientRequest from "./components/clientRequestTable/CreateClientRequest";
import CreateInternalTask from "./components/internalTaskList/CreateInternalTask";
import OrderCreate from "./pages/master/OrderCreate";
import InventoryMove from "./pages/master/InventoryMove";
import PendingGoodIssue from "./pages/master/PendingGoodIssue";
import UserRoleCreate from "./pages/master/UserRoleCreate";
import UserRoles from "./pages/master/UserRoles";
import CreateWorkFlowTemplate from "./pages/WorkFlow/CreateWorkFlowTemplate";
import PendingApprovals from "./pages/WorkFlow/PendingApprovals";
import ViewAllDocuments from "./pages/WorkFlow/UserApprovedDocuments";
import ViewWorkflows from "./pages/WorkFlow/ViewWorkflows";
import DocumentUserWise from "./pages/WorkFlow/DocumentsUserWise";
import ViewAllDocumentsAdmin from "./pages/WorkFlow/ViewAllDocumentsAdmin";
import ViewAllPostedGoodIssue from "./pages/master/ViewAllPostedGoodIssue";
import ViewInventoryRequestDocuments from "./pages/master/ViewInventoryRequestDocuments";
import ViewAllPostedGoodIssueUserWise from "./pages/master/ViewAllPostedGoodIssueUserWise";
import ViewInventoryRequestDocumentsUserWise from "./pages/master/ViewInventoryRequestDocumentsUserWise";
import InventoryTransferRequestDocuments from "./pages/WorkFlow/InventoryTransferRequestDocuments";
import AllInventoryTransferRequestDocuments from "./pages/WorkFlow/AllInventoryTransferRequestDocuments";
import AllUserApprovedDocuments from "./pages/WorkFlow/AllUserApprovedDocuments";
import EmailReceipientCreate from "./pages/AdministrationSetup/EmailReceipientCreate";
import EmailSetupCreate from "./pages/AdministrationSetup/EmailSenderCreate";
import EmailSenderList from "./pages/AdministrationSetup/EmailSender";
import EmailSenderCreate from "./pages/AdministrationSetup/EmailSenderCreate";
import EmailTabs from "./pages/AdministrationSetup/EmailTabs";
import DocumentSequenceList from "./pages/AdministrationSetup/DocumentSequence";
import DocumentSequenceCreate from "./pages/AdministrationSetup/DocumentSequenceCreate";
import Usersp from "./pages/AdministrationSetup/Users";
import UserCreatep from "./pages/AdministrationSetup/UserCreate";
import DraggableTable from "./pages/master/DragDocTable";
import PendingGoodIssueWithModel from "./pages/master/PendingGoodissueWithModel";
import ViewSingleGoodIssuePerPage from "./pages/WorkFlow/ViewSingleGoodIssuePerPage";
import PageLayout from "./layouts/PageLayout";
import InventoryMoveDuplicate from "./pages/master/InventoryMoveDuplicate";
import Customers from "./pages/AdministrationSetup/Customers";
import EmailTemplateCreate from "./pages/AdministrationSetup/CreateEmailTemplate";
import EmailTemplate from "./pages/AdministrationSetup/EmailTemplate";
import CustomerEmailTemplateAssign from "./pages/AdministrationSetup/CustomerEmailTemplateAssign";
import EmailApprovalTemplateCreate from "./pages/AdministrationSetup/EmailApprovalTemplateCreate";
import EmailApprovalTemplate from "./pages/AdministrationSetup/EmailApprovalTemplate";
import EmailSendingCreate from "./pages/AdministrationSetup/EmailSendingTemplate";
import EmailApprovalView from "./pages/AdministrationSetup/EmailApprovalView";
import EmailApprovalDecision from "./pages/AdministrationSetup/EmailApprovalDecision";
import DocumentLogs from "./pages/WorkFlow/DocumentLogs";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ToastContainer />
        <LoaderProvider>
          <BrowserRouter>
            <Routes>
              {/* master Pages */}
              {
                /* <Route path="/ecommerce" element={<AdminDashboard />} />*/
                <Route path="/analytics" element={<AdminDashboard />} />
              }

              <Route path="/create-user" element={<UserCreatep />} />
              <Route
                path="/create-doc-seq"
                element={<DocumentSequenceCreate />}
              />
              <Route path="/doc-seq" element={<DocumentSequenceList />} />
              <Route path="/email-config" element={<EmailTabs />} />
              <Route
                path="/email-config-create"
                element={<EmailReceipientCreate />}
              />
              <Route path="/email-setup" element={<EmailSenderList />} />
              <Route
                path="/email-setup-create"
                element={<EmailSenderCreate />}
              />
              <Route path="/user" element={<Usersp />} />

              <Route path="/crm" element={<CRM />} />
              <Route path="/login" element={<Login />} />
              <Route path="/workflow" element={<CreateWorkFlowTemplate />} />
              {/* <Route path="/pending-approvals" element={<PendingApprovals />} /> */}
              <Route
                path="/pending-approvals"
                element={
                  <PageLayout>
                    {" "}
                    <PendingApprovals />{" "}
                  </PageLayout>
                }
              />
              <Route path="/view-approvals" element={<ViewAllDocuments />} />
              <Route path="/viewworkflows" element={<ViewWorkflows />} />
              {/* <Route path="/viewDocuments" element={<DocumentUserWise />} /> */}
              <Route
                path="/viewDocuments"
                element={
                  <PageLayout>
                    <DocumentUserWise />
                  </PageLayout>
                }
              />
              <Route
                path="/email-template-create"
                element={<EmailTemplateCreate />}
              />
              <Route
                path="/email-template-approval"
                element={<EmailApprovalTemplateCreate />}
              />
              <Route
                path="/email-approval"
                element={<EmailApprovalTemplate />}
              />
              <Route path="/email-sending" element={<EmailSendingCreate />} />
              <Route
                path="/email-approval-view"
                element={<EmailApprovalView />}
              />
              <Route
                path="/email-approval-pending"
                element={<EmailApprovalDecision />}
              />
              <Route
                path="/document-logs"
                element={<DocumentLogs />}
              />
              <Route
                path="/email-template-assign"
                element={<CustomerEmailTemplateAssign />}
              />
              <Route path="/email-templates" element={<EmailTemplate />} />
              <Route path="/customer-detail" element={<Customers />} />
              <Route
                path="/inventory_request"
                element={<InventoryTransferRequestDocuments />}
              />
              <Route path="/allDocuments" element={<ViewAllDocumentsAdmin />} />
              <Route
                path="/All-Approvals"
                element={<AllUserApprovedDocuments />}
              />
              <Route
                path="/good-issue-document"
                element={<ViewAllPostedGoodIssue />}
              />
              <Route
                path="/inventory-transfer-document"
                element={<ViewInventoryRequestDocuments />}
              />
              <Route
                path="/inventory_request_documents"
                element={<AllInventoryTransferRequestDocuments />}
              />
              <Route
                path="/good_issue_document_user"
                element={<ViewAllPostedGoodIssueUserWise />}
              />
              <Route
                path="/Good-Issue"
                element={<ViewSingleGoodIssuePerPage />}
              />
              <Route
                path="/inventory_transfer_document"
                element={<ViewInventoryRequestDocumentsUserWise />}
              />
              <Route path="/drag" element={<DraggableTable />} />
              {/* <Route path="/register" element={<Register />} /> */}
              {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
              <Route path="/user-list" element={<UserList />} />
              <Route path="/user-profile" element={<UserProfile />} />
              <Route path="/my-account" element={<MyAccount />} />
              <Route path="/inventory" element={<InventoryMove />} />
              <Route path="/good-issue" element={<PendingGoodIssue />} />
              <Route
                path="/Duplicate-Inventory-Request"
                element={<InventoryMoveDuplicate />}
              />
              {/* <Route path="/create-good-issue" element={<PendingGoodIssueWithModel />} /> */}
              <Route
                path="/create-good-issue"
                element={
                  <PageLayout>
                    <PendingGoodIssueWithModel />
                  </PageLayout>
                }
              />

              <Route path="/product-list" element={<ProductList />} />
              <Route path="/product-view" element={<ProductView />} />
              {/* <Route path="/product-view/:id" element={<ProductView />} /> */}
              {/* <Route path="/preparation-view" element={<PreparationView />} />
              <Route path="/product-upload" element={<ProductUpload />} />
              <Route path="/invoice-list" element={<InvoiceList />} />
              <Route path="/invoice-details" element={<InvoiceDetails />} /> */}
              <Route path="/order-list" element={<OrderList />} />
              <Route path="/message" element={<Message />} />
              {/*<Route path="/notification" element={<Notification />} />
              <Route path="/settings" element={<Settings />} />
               <Route path="/blank-page" element={<BlankPage />} /> */}
              {/* Blocks Pages */}
              {/* sk-admin main pages */}
              {/* <Route path="/dashboard" element={<AdminDashboard />} /> */}
              <Route
                path="/dashboard"
                element={
                  // <RequireAuth>
                  <AdminDashboard />
                  // </RequireAuth>
                }
              />
              <Route
                path="/roles"
                element={
                  // <RequireAuth>
                  <Roles />
                  // </RequireAuth>
                }
              />
              <Route
                path="/users"
                element={
                  // <RequireAuth>
                  <Users />
                  // </RequireAuth>
                }
              />
              <Route
                path="/create-branch"
                element={
                  // <RequireAuth>
                  <CreateBranch />
                  // </RequireAuth>
                }
              />

              <Route
                path="/users-create"
                element={
                  // <RequireAuth>
                  <UserCreate />
                  // </RequireAuth>
                }
              />

              <Route
                path="/view-user-roles"
                element={
                  // <RequireAuth>
                  <UserRoles />
                  // </RequireAuth>
                }
              />
              <Route
                path="/create-user-role"
                element={
                  // <RequireAuth>
                  <UserRoleCreate />
                  // </RequireAuth>
                }
              />
              <Route
                path="/roles-create"
                element={
                  // <RequireAuth>
                  <RoleCreate />
                  // </RequireAuth>
                }
              />

              <Route
                path="/clients"
                element={
                  // <RequireAuth>
                  <Clients />
                  // </RequireAuth>
                }
              />
              <Route
                path="/client-create"
                element={
                  // <RequireAuth>
                  <ClientCreate />
                  // </RequireAuth>
                }
              />
              <Route
                path="/transaction"
                element={
                  // <RequireAuth>
                  <AdminTransaction />
                  // </RequireAuth>
                }
              />
              <Route
                path="/order"
                element={
                  // <RequireAuth>
                  <OrderCreate />
                  // </RequireAuth>
                }
              />
              <Route
                path="/brands"
                element={
                  // <RequireAuth>
                  <Brands />
                  // </RequireAuth>
                }
              />
              <Route
                path="/create-brand"
                element={
                  // <RequireAuth>
                  <CreateBrand />
                  // </RequireAuth>
                }
              />
              <Route
                path="/branches"
                element={
                  // <RequireAuth>
                  <Branches />
                  // </RequireAuth>
                }
              />
              <Route
                path="/create-client-request"
                element={
                  // <RequireAuth>
                  <CreateClientRequest />
                  // </RequireAuth>
                }
              />
              <Route
                path="/create-internal-task"
                element={
                  // <RequireAuth>
                  <CreateInternalTask />
                  // </RequireAuth>
                }
              />
              {/* 
              <Route path="/buttons" element={<Buttons />} />
              <Route path="/avatars" element={<Avatars />} />
              <Route path="/colors" element={<Colors />} />
              <Route path="/charts" element={<Charts />} />
              <Route path="/tables" element={<Tables />} />
              <Route path="/fields" element={<Fields />} />
              <Route path="/alerts" element={<Alerts />} /> */}
              {/* Custom Pages */}
              <Route path="/preparation" element={<Preparation />} />
              <Route path="/ingredient" element={<Ingredients />} />

              {/* <Route
                path="/ingredient-details"
                element={<IngredientsDetails />}
              /> */}
              {/* 
              <Route path="/categories" element={<Categories />} />
              <Route path="/station" element={<Station />} /> */}
              {/* fix donr */}
              {/* <Route path="/rearrangement" element={<Rearrangement />} />
              <Route path="/constructure" element={<Constructure />} /> */}
              {/* constructure edit page */}
              {/* <Route path="/constructure-edit" element={<ConstructureEdit />} /> */}
              {/* constructure page edit option having first option product, page product here it is ..  */}

              <Route
                path="/constructure-product"
                element={<ConstructureProduct />}
              />
              {/* constructure page edit option having secound option dish, here it is the dish page .. */}
              {/* <Route path="/constructure-dish" element={<ConstructureDish />} /> */}

              {/* modifier page  */}
              {/* <Route path="/manage-modifier" element={<ManageModifier />} /> */}
              {/* page for edit when user click on edit  */}
              {/* <Route
                path="/manage-modifier-edit"
                element={<ManageModifierEdit />}
              /> */}
              {/* page for duplicta when user click on duplicta  */}
              {/* <Route
                path="/manage-modifier-duplicate"
                element={<ManageModifierDuplicate />}
              /> */}
              {/* receipt ffix bugs*/}
              <Route path="/receipt" element={<Receipt />} />
              <Route path="/receipt-edit" element={<ReceiptEdit />} />

              {/* Supports Pages */}
              <Route path="*" element={<Error />} />
              <Route path="/" element={<Login />} />
              {/* <Route path="/documentation" element={<Documentation />} />
              <Route path="/changelog" element={<ChangeLog />} /> */}
            </Routes>
          </BrowserRouter>
        </LoaderProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
