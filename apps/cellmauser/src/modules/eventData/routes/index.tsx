import { Route, Routes } from "react-router-dom";

import AppointmentWithPrint from "../common/AppointmentWithPrint";
import EventDataCard from "../common/EventDataCard";
import PatientList from "../screens/eventDataPatientSearch/PatientList";
import AddProvisionalAppointmentPopup from "../screens/serviceAppointments/AddProvisionalAppointmentPopup";
import ProvisionalAppointment from "../screens/serviceAppointments/ProvisionalAppointment";
import RoomBooking from "../screens/serviceAppointments/RoomBooking";
import RoomDiary from "../screens/serviceAppointments/RoomDiary";
import ServiceAppointments from "../screens/serviceAppointments/ServiceAppointments";
import ServiceAppointmentsReminder from "../screens/serviceAppointments/ServiceAppointmentsReminder";
import AddAndEditPatientAppointment from "../screens/serviceBookAppointment/AddAndEditPatientAppointment";
import AttendedPatientAppointments from "../screens/serviceBookAppointment/AttendedPatientAppointments";
import CancelledPatientAppointments from "../screens/serviceBookAppointment/CancelledPatientAppointments";
import DidNotAttendedPatientAppointments from "../screens/serviceBookAppointment/DidNotAttendedPatientAppointments";
import { ScheduledPatientAppointments } from "../screens/serviceBookAppointment/ScheduledPatientAppointments";
import ServiceBookAppointment from "../screens/serviceBookAppointment/ServiceBookAppointment";
import WaitedNotSeenPatientAppointments from "../screens/serviceBookAppointment/WaitedNotSeenPatientAppointments";
import ServiceHPAppointments from "../screens/serviceHPAppointments/ServiceHPAppointments";

const EventDataRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<EventDataCard />}>
        <Route path="/patientSearch" element={<PatientList />} />
        <Route
          path="/serviceBookAppointment"
          element={<ServiceBookAppointment />}
        />
        <Route
          path="/scheduledPatientAppointments"
          element={<ScheduledPatientAppointments />}
        />
        <Route path="/serviceAppointments" element={<ServiceAppointments />} />
        <Route
          path="/serviceHPAppointments"
          element={<ServiceHPAppointments />}
        />
        <Route
          path="/addAndEditPatientAppointment"
          element={<AddAndEditPatientAppointment />}
        />
        <Route
          path="/cancelledPatientAppointments"
          element={<CancelledPatientAppointments />}
        />
        <Route
          path="/waitedNotSeenPatientAppointments"
          element={<WaitedNotSeenPatientAppointments />}
        />
        <Route
          path="/attendedPatientAppointments"
          element={<AttendedPatientAppointments />}
        />
        <Route
          path="/didNotAttendedPatientAppointments"
          element={<DidNotAttendedPatientAppointments />}
        />
        <Route
          path="/serviceAppointmentsReminder"
          element={<ServiceAppointmentsReminder />}
        />
        <Route
          path="/provisionalAppointment"
          element={<ProvisionalAppointment />}
        />
        <Route path="/roomBooking" element={<RoomBooking />} />
        <Route path="/roomDiary" element={<RoomDiary />} />
      </Route>
    </Routes>
  );
};

export default EventDataRoutes;
