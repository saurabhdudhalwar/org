export interface IProfileDetails {
  title?: string;
  givenName: string;
  middleName?: string;
  familyName: string;
  sex?: string;
  born?: Date | null;
  mobile?: string;
  email?: string;
}

export interface IAddress {
  numberRoad: string;
  town: string;
  district: string;
  county: string;
  postcode: string;
  country: string;
}
