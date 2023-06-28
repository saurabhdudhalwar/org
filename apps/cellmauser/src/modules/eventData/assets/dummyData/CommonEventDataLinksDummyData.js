export const LINKS_MENU_ITEMS = [
  {
    name: "addAppointment",
    roles: [
      "cancelledPatientAppointmentScreen",
      "scheduledPatientAppointmentScreen",
      "attendedPatientAppointmentScreen",
      "dnaPatientAppointmentScreen",
      "wnsPatientAppointmentScreen",
    ],
    src: "AddAppointment",
  },
  {
    name: "addProvisionalAppointment",
    src: "Alert",
    roles: ["provisionalAppointments", "scheduledPatientAppointmentScreen"],
    onClick: "onClick",
  },
  {
    name: "alert",
    src: "Alert",
    roles: ["serviceAppointmentsReminder"],
  },
  {
    name: "appointments",
    src: "Appointments",
    roles: [
      "serviceAppointmentsScreen",
      "provisionalAppointments",
      "roomDiary",
    ],
  },
  {
    name: "appointmentReminder",
    src: "AppointmentReminder",
    roles: ["serviceAppointmentsScreen", "roomDiary"],
  },
  {
    name: "assessment",
    src: "Assessment",
    roles: [
      "cancelledPatientAppointmentScreen",
      "scheduledPatientAppointmentScreen",
    ],
  },
  {
    name: "attended",
    src: "Attended",
    roles: [
      "cancelledPatientAppointmentScreen",
      "scheduledPatientAppointmentScreen",
      "attendedPatientAppointmentScreen",
      "dnaPatientAppointmentScreen",
      "wnsPatientAppointmentScreen",
    ],
  },
  {
    name: "bookAppointments",
    src: "BookAppointments",
    roles: [
      "serviceAppointmentsScreen",
      "provisionalAppointments",
      "roomDiary",
    ],
  },
  {
    name: "cancel",
    src: "Cancel",
    roles: [
      "scheduledPatientAppointmentScreen",
      "cancelledPatientAppointmentScreen",
    ],
  },
  {
    name: "communication",
    src: "Communication",
    roles: [
      "attendedPatientAppointmentScreen",
      "dnaPatientAppointmentScreen",
      "wnsPatientAppointmentScreen",
      "serviceAppointmentsReminder",
    ],
  },
  {
    name: "consent",
    src: "Consent",
    roles: ["scheduledPatientAppointmentScreen"],
  },
  {
    name: "details",
    src: "Details",
    roles: ["servicePatientAppointmentScreen", "provisionalAppointments"],
  },
  {
    name: "didNotAttended",
    src: "DidNotAttended",
    roles: [
      "cancelledPatientAppointmentScreen",
      "scheduledPatientAppointmentScreen",
      "attendedPatientAppointmentScreen",
      "dnaPatientAppointmentScreen",
      "wnsPatientAppointmentScreen",
    ],
  },
  {
    name: "dietetics",
    src: "Dietetics",
    roles: [
      "serviceAppointmentsScreen",
      "provisionalAppointments",
      "roomDiary",
    ],
  },
  {
    name: "finance",
    src: "Finance",
    roles: [
      "serviceAppointmentsScreen",
      "provisionalAppointments",
      "roomDiary",
    ],
  },
  {
    name: "history",
    src: "History",
    roles: [
      "cancelledPatientAppointmentScreen",
      "scheduledPatientAppointmentScreen",
      "attendedPatientAppointmentScreen",
      "dnaPatientAppointmentScreen",
      "wnsPatientAppointmentScreen",
    ],
  },
  {
    name: "hpDiary",
    src: "HPDiary",
    roles: ["provisionalAppointments"],
  },
  {
    name: "infusions",
    src: "Infusion",
    roles: ["serviceAppointmentsScreen", "roomDiary"],
  },
  {
    name: "letters",
    src: "Letter",
    roles: [
      "scheduledPatientAppointmentScreen",
      "attendedPatientAppointmentScreen",
      "dnaPatientAppointmentScreen",
      "wnsPatientAppointmentScreen",
    ],
  },
  {
    name: "patientAdd",
    src: "PatientAdd",
    roles: [
      "serviceAppointmentsScreen",
      "provisionalAppointments",
      "roomDiary",
    ],
  },
  {
    name: "ptRtt",
    src: "PtRTT",
    roles: [
      "scheduledPatientAppointmentScreen",
      "attendedPatientAppointmentScreen",
      "dnaPatientAppointmentScreen",
      "wnsPatientAppointmentScreen",
    ],
    labelTooltip: "patientReferralToTreatmentTime",
  },
  {
    name: "pipLabel",
    src: "PIPLabel",
    roles: [
      "scheduledPatientAppointmentScreen",
      "attendedPatientAppointmentScreen",
      "dnaPatientAppointmentScreen",
      "wnsPatientAppointmentScreen",
    ],
    labelTooltip: "patientInterestedParties",
  },
  {
    name: "porter",
    src: "Porter",
    roles: ["servicePatientAppointmentScreen"],
  },

  {
    name: "referral",
    src: "Referrals",
    roles: [
      "scheduledPatientAppointmentScreen",
      "attendedPatientAppointmentScreen",
      "dnaPatientAppointmentScreen",
      "wnsPatientAppointmentScreen",
    ],
  },
  {
    name: "refresh",
    src: "Refresh",
    roles: [
      "scheduledPatientAppointmentScreen",
      "attendedPatientAppointmentScreen",
      "dnaPatientAppointmentScreen",
      "wnsPatientAppointmentScreen",
      "serviceAppointmentsScreen",
      "provisionalAppointments",
    ],
  },
  {
    name: "reminder",
    src: "Reminder",
    roles: ["servicePatientAppointmentScreen", "provisionalAppointments"],
  },
  {
    name: "roomManagement",
    src: "RoomManagement",
    roles: [
      "serviceAppointmentsScreen",
      "provisionalAppointments",
      "roomDiary",
    ],
    navigationType: "newWindow",
  },
  {
    name: "rooms",
    src: "Room",
    roles: ["serviceAppointmentsScreen", "roomDiary"],
    onClick: "onClick",
  },
  {
    name: "schedule",
    src: "Schedule",
    roles: [
      "cancelledPatientAppointmentScreen",
      "scheduledPatientAppointmentScreen",
      "attendedPatientAppointmentScreen",
      "dnaPatientAppointmentScreen",
      "wnsPatientAppointmentScreen",
    ],
  },
  {
    name: "service",
    src: "Service",
    roles: ["serviceAppointmentsScreen", "roomDiary"],
  },
  {
    name: "serviceAppointments",
    src: "ServiceAppointment",
    roles: [
      "serviceAppointmentsScreen",
      "scheduledPatientAppointmentScreen",
      "attendedPatientAppointmentScreen",
      "dnaPatientAppointmentScreen",
      "wnsPatientAppointmentScreen",
      "provisionalAppointments",
    ],
  },
  {
    name: "summary",
    src: "Summary",
    roles: [
      "serviceAppointmentsScreen",
      "provisionalAppointments",
      "roomDiary",
    ],
  },
  {
    name: "textAndEmail",
    src: "TextAndEmail",
    roles: ["serviceAppointmentsReminder"],
  },
  {
    name: "waitedNotSeen",
    src: "WaitedNotSeenAppointments",
    roles: [
      "cancelledPatientAppointmentScreen",
      "scheduledPatientAppointmentScreen",
    ],
  },
  {
    name: "worklist",
    src: "Worklist",
    roles: [
      "serviceAppointmentsScreen",
      "provisionalAppointments",
      "roomDiary",
    ],
  },
];

export const TEST = [];
