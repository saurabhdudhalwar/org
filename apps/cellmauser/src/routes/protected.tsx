import { lazy } from "react";

import { Navigate } from "react-router-dom";

import CellmaUnderConstruction from "../common/CellmaUnderConstruction";
import Accessibility from "../modules/authentication/common/Accessibility";
import LearnMore from "../modules/authentication/common/LearnMore";
import Login from "../modules/authentication/routes";
import AppointmentHistoryPopup from "../modules/eventData/common/AppointmentHistoryPopup";
import AppointmentSlipPrint from "../modules/eventData/common/AppointmentSlipPrint";
import AppointmentWithPrint from "../modules/eventData/common/AppointmentWithPrint";
import PatientLabelPrint from "../modules/eventData/common/PatientLabelPrint";
import RoomManagement from "../modules/eventData/common/RoomManagement";
import PrintServiceAppointmentsTable from "../modules/eventData/screens/serviceAppointments/PrintServiceAppointmentsTable";
import ViewReferralDocuments from "../modules/referral/screens/addReferral/ViewReferralDocuments";

const CellmaDashboardLayout = lazy(
  () => import("../modules/authentication/common/CellmaDashboardLayout")
);

const Home = lazy(() => import("../modules/authentication/screens/Home"));

const PatientRoutes = lazy(() => import("../modules/patient/routes"));

const UserRoutes = lazy(() => import("../modules/user/routes"));

const EventDataRoutes = lazy(() => import("../modules/eventData/routes"));

const ReferralRoutes = lazy(() => import("../modules/referral/routes"));
const AdminRoutes = lazy(() => import("../modules/admin/routes"));

const protectedRoutes = [
  {
    element: <CellmaDashboardLayout />,
    children: [
      { path: "/cellmaUser/home", element: <Home /> },
      { path: "/cellmaUser/patient/*", element: <PatientRoutes /> },
      { path: "/cellmaUser/user/*", element: <UserRoutes /> },
      { path: "/cellmaUser/eventData/*", element: <EventDataRoutes /> },
      { path: "/cellmaUser/referral/*", element: <ReferralRoutes /> },
      { path: "/cellmaUser/admin/*", element: <AdminRoutes /> },
    ],
  },
  { path: "/cellmaUser/learnMore", element: <LearnMore /> },
  { path: "/cellmaUser/accessibility", element: <Accessibility /> },
  {
    path: "/cellmaUser/appointmentWithPrint",
    element: <AppointmentWithPrint />,
  },
  {
    path: "/cellmaUser/appointmentSlipPrint",
    element: <AppointmentSlipPrint />,
  },
  {
    path: "/cellmaUser/patientLabelPrint",
    element: <PatientLabelPrint />,
  },
  {
    path: "/cellmaUser/roomManagement",
    element: <RoomManagement />,
  },
  {
    path: "/cellmaUser/printServiceAppointmentsTable",
    element: <PrintServiceAppointmentsTable />,
  },
  {
    path: "/cellmaUser/appointmentHistoryPopup",
    element: <AppointmentHistoryPopup />,
  },
  {
    path: "/cellmaUser/viewReferralDocument",
    element: <ViewReferralDocuments />,
  },

  { path: "/", element: <Navigate replace to="/cellmaUser/login" /> },
  { path: "/cellmaUser/login", element: <Login /> },
];

export default protectedRoutes;
