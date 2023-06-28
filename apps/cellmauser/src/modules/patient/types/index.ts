import { IAddress, IProfileDetails } from "../../../types";

export interface IPatientSearch extends IProfileDetails {
  mpiNumber: string;
  barcode: string;
  card: string;
  postcode: string;
  mrnNumber: string;
  nhsNumber: string;
  hospitalRef: string;
  identificationId: string;
  patientNameInOtherLanguage: string;
  patientSeenInLastDays: string;
  includeDeceasedPatients: boolean;
  includeDeceasedService: boolean;
  soundex: boolean;
}

export interface IPatientDuplicateCheck extends IProfileDetails {
  nhsRefOptional: string;
  maidenNameOptional: string;
  identifier: string;
  uniqueIdentification: string;
  uniqueIdentificationId: string;
  photoIdentification: string;
  photoIdentificationId: string;
  issuingCountry: string;
  babyBornInHospital: string;
}

export interface IPatientDetails extends IProfileDetails {
  practisingReligion?: string;
  language: string;
  currentGender: string;
  townOfBirth: string;
  interpreterRequired?: string;
  maritalStatus: string;
  countyOfBirth: string;
  countryOfBirth: string;
  patientType: string;
  currentlyPregnant?: string;
  hospitalRef: string;
  maidenName: string;
  ethnicity: string;
  nationality: string;
  aKA?: string;
  nhsNo: string;
  occupation: string;
  regDisabled: any;
  identifier: string;
  religion: string;
  primaryDisability?: string;
  notes: string;
  patientNameInOtherLanguage?: string;
  sexualOrientation?: string;
  pregnant?: boolean;
  disability?: string;
  assistanceNeeded?: string;
  disabilityNote?: string;
  interpreterNeeded?: string;
  interpreterType?: string;
  pasId?: string;
  prisoner?: boolean;
  bloodType?: string;
  died?: string;
  restrictedRegistration?: string;
  patientWebAccess?: boolean;
  lockPatientWebAccount?: boolean;
  babyBornInHospital?: string;
}

export interface IPatientAddress extends IAddress {
  iSOCountryCode: string;
  iCAOCountryCode: string;
  phone: string;
  email: string;
  mobile: string;
  workPhone: string;
  fax: string;
  healthRegion: string;
  locationZone: string;
  lSOA: string;
  postcodeSearch: string;
  billingCorrespondence: string;
  tempNumberRoad: string;
  tempTown: string;
  tempDistrict: string;
  tempCounty: string;
  tempPostcode: string;
  tempCountry: string;
  tempISOCountryCode: string;
  tempICAOCountryCode: string;
  tempPhone: string;
  tempEmail: string;
  tempWorkPhone: string;
  tempFax: string;
  tempMobile: string;
  tempHealthRegion: string;
  tempLocationZone: string;
  tempLSOA: string;
  startDate: Date | null;
  endDate: Date | null;
  unknownNoFixedAbodeorOverseasVisitor?: string;
  notes?: string;
  tempNotes?: string;
}

export interface IPatientPipDetails extends IProfileDetails, IAddress {
  ethnicity: string;
  occupation: string;
  nextOfKin: string;
  familyAwareOfIllness: string;
  relationship: string;
  identifierType: string;
  identifierNumber: string;
  externalProfessional: string;
  professionalTitle: string;
  receivePatientLetter: string;
  receiveAppointmentLetters: string;
  partnerDetailsOnBirth: string;
  sendPatientTextEmail: boolean;
  isReferrer: boolean;
  notes: string;
  locale: string;
  phone: string;
  addEmail: string;
  addMobile: string;
  fax: string;
  partnerCare: boolean;
  partnerCareDate: Date | null;
  helpingPatient: boolean;
  helpingPatientDate: Date | null;
  photographed: boolean;
  photographedDate: Date | null;
  generalPublicity: boolean;
  generalPublicityDate: Date | null;
}

export interface IPatientGp extends IProfileDetails, IAddress {
  initial: string;
  gpCode: string;
  practiceCode: string;
  ccg: string;
  gmcCode: string;
  show: boolean;
  postcodeSearch: string;
  unknownNoFixedAbodeorOverseasVisitor: string;
  districtSearch: string;
  gpPhone: string;
  fax: string;
  workPhone: string;
}

export interface IFile {
  file: string;
}

export interface IPatientReferral {
  service: string;
  clinicType: string;
  serviceLocation: string;
  serviceType: string;
  sourceOfReferral: string;
  referringProfessional: string;
  preferredSexOfExaminer: string;
  modeOfReferral: string;
  methodOfArrival: string;
  timeOfArrival: Date | null;
  dateOfReferral: Date | null;
  timeOfReferral: Date | null;
  referralReason: string;
  patientType: string;
  consultant: string;
  referrerName: string;
  referralLetter: string;
  displayName: string;
  documentDescription: string;
  referralDocument: string;
  documentDisplayName: string;
  documentDescriptionNew: string;
  referralInvite: string;
  referralNotes: string;
}

export interface ITabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface IUnknownPatient {
  age: number;
  birthMonth: number;
  sex: string;
}

export interface IDeathPatient {
  searchImmediateCauseOfDeath?: string;
  searchImmediateDeathCode?: string;
  otherCauseOfDeathType: string;
  additionalNotes: string;
  dateOfDeath: Date | null;
  timeOfDeath: Date | null;
  ageAtDeath: string;
  markPatientDead: string;
}

export interface ILocalGpSearch {
  familyName: string;
  gpFullName?: string;
  gpCode: string;
  ccg: string;
  practiceName: string;
  towncity: string;
  postcode: string;
}

export interface INationalGpSearch {
  familyName: string;
  gpFullName?: string;
  gpCode: string;
  practiceName: string;
  buildingNumber: string;
  locality: string;
  town: string;
  postcode: string;
}

export interface IPatientBarcodeDetails {
  estName: string;
  patBarcode: number;
  patFullName: string;
  patientBarcode: string;
}

export interface IPatientPip {
  pipId: number;
  pipPatId: number;
  pipTitle: string;
  pipFirstname: string;
  pipSurname: string;
  pipRelationship: string;
  pipNextOfKin: string;
  pipFamilyAwareOfAllIllness: string;
  pipGender: string;
  pipIsPatientId: number;
}

export interface IExistingPatientDetails {
  patNameOtherLang: string;
  patNeedInterpreterAtAppointments: string;
  addEmail: string;
  addMobile: string;
  addPhone: string;
  kinTitle: string;
  kinFirstname: string;
  kinSurname: string;
  kinRelationship: string;
  kinPhone: string;
  kinEmail: string;
  kinMobile: string;
  postCodeSearch: string;
  addCompanyName: string;
  districtSearch: string;
  addAddress1: string;
  district: string;
  town: string;
  county: string;
  postcode: string;
  country: string;
  addHealthRegionEliId: string;
  egpTitle: string;
  egpInitials: string;
  egpSurname: string;
  egpFirstName: string;
  egpFullname: string;
  egpGpCode: string;
  egpAddPhone: string;
  egpPctCode: string;
  egpPctName: string;
  egpCcg: string;
  epgAddEmail: string;
  tempAddressEmail: string;
  tempAddressMobile: string;
  tempAddressPhone: string;
  tempAddressStartDate: Date | null;
  tempAddressEndDate: Date | null;
  tempAddBillingAddress: string;
  tempAddCompanyName: string;
  tempAddAddress1: string;
  tempAddAddress2: string;
  tempAddAddress3: string;
  tempAddAddress4: string;
  tempAddAddress5: string;
  tempAddAddress6: string;
  tempAddHealthRegionEliId: string;
}
