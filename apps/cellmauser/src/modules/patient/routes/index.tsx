import { lazy } from "react";

import { Route, Routes } from "react-router-dom";

import PatientCard from "../common/PatientCard";

const PatientList = lazy(() => import("../screens/patientSearch/PatientList"));

const FindPatientCustomizable = lazy(
  () => import("../screens/customizeView/FindPatientCustomizable")
);

const DuplicateCheck = lazy(
  () => import("../screens/duplicateCheck/DuplicateCheck")
);

const CreatePatientStepper = lazy(
  () => import("../screens/createPatient/CreatePatientStepper")
);

const SinglePageRegistration = lazy(
  () => import("../screens/createPatient/SinglePageRegistration")
);

const PatientDetailsTab = lazy(
  () => import("../screens/patientDetails/PatientDetailsTab")
);

const AddPipCustomizable = lazy(
  () => import("../screens/customizeViewCreatePatient/AddPipCustomizable")
);
const ExistingPatientDetails = lazy(
  () => import("../screens/existingPatientDetails/ExistingPatientDetails")
);
const AddDetailsCustomizable = lazy(
  () => import("../screens/customizeViewCreatePatient/AddDetailsCustomizable")
);
const Demographics = lazy(
  () => import("../screens/patientDemographics/Demographics")
);

const ContactTypeScreen = lazy(
  () => import("../screens/patientDemographics/ContactTypeScreen")
);

const DeathPatient = lazy(() => import("../screens/deathPatient/DeathPatient"));

const PatientRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<PatientCard />}>
        <Route path="/patientSearch" element={<PatientList />} />
        <Route path="/patientDuplicateCheck" element={<DuplicateCheck />} />
        <Route
          path="/patientSearchCustom"
          element={<FindPatientCustomizable />}
        />
        <Route path="/addPatient" element={<CreatePatientStepper />} />
        <Route
          path="/singlePageRegistration"
          element={<SinglePageRegistration />}
        />
        <Route path="/addPatientPipCustom" element={<AddPipCustomizable />} />
        <Route path="/editPatient" element={<PatientDetailsTab />} />
        <Route
          path="/confirmPatientDetails"
          element={<ExistingPatientDetails />}
        />
        <Route path="/demographics" element={<Demographics />} />
        <Route path="/addDetailsCustom" element={<AddDetailsCustomizable />} />
        <Route path="/contactTypeScreen" element={<ContactTypeScreen />} />
        <Route path="/deathPatient" element={<DeathPatient />} />
      </Route>
    </Routes>
  );
};

export default PatientRoutes;
