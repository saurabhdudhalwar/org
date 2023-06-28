import React, { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import Geocode from "react-geocode";

import * as Common from "../../../common/CommonComponentsIndex";
import { GOOGLE_API_KEY } from "../../../config";
import t from "../assets/translationFiles/serviceAppointmentTranslation";

interface Props {
  handleAppointmentLocationCancel: any;
  handlePatientLocationCancel: any;
  appointmentLocation: any;
  address: any;
}
const AppointmentLocationPopup: React.FC<Props> = (props) => {
  const [location, setLocation] = useState<any>({
    lat: 51.5072,
    lng: 0.1275,
  });

  Geocode.setApiKey(GOOGLE_API_KEY);
  useEffect(() => {
    if (props.address !== undefined && props.address !== "") {
      Geocode.fromAddress(props.address).then(
        (response: any) => {
          const LatLng = response.results[0].geometry.location;
          // console.log(LatLng);
          setLocation(LatLng);
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }, [props.address]);
  return (
    <Mui.Backdrop open>
      <Common.CellmaPopup
        title={
          props.appointmentLocation ? t("clinicLocation") : t("patientLocation")
        }
        fullScreen
        handleCancel={() => {
          props.handleAppointmentLocationCancel();
          props.handlePatientLocationCancel();
        }}
      >
        <Mui.Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <GoogleMap
            mapContainerStyle={styles.mapContainerStyle}
            center={{
              lat:
                props.address.latitude !== undefined &&
                props.address.latitude !== ""
                  ? props.address.latitude
                  : location.lat,
              lng:
                props.address.longitude !== undefined &&
                props.address.longitude !== ""
                  ? props.address.longitude
                  : location.lng,
            }}
            zoom={12}
          >
            <MarkerF
              title="My Location"
              position={{
                lat: props.address.latitude
                  ? props.address.latitude
                  : location.lat,
                lng: props.address.longitude
                  ? props.address.longitude
                  : location.lng,
              }}
            />
          </GoogleMap>
        </Mui.Grid>
      </Common.CellmaPopup>
    </Mui.Backdrop>
  );
};

export default AppointmentLocationPopup;

export const styles = {
  mapContainerStyle: {
    width: "100%",
    height: "500px",
  },
};
