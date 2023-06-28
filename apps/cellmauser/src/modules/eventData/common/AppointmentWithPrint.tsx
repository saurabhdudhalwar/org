import * as Mui from "@mui/material";

const AppointmentWithPrint = () => {
  return (
    <Mui.Grid container padding={3} spacing={3}>
      <Mui.Grid item container>
        <Mui.Grid item xs={12} justifyContent="flex-start">
          <Mui.Typography variant="subtitle1">DUMMY DATA</Mui.Typography>
        </Mui.Grid>
      </Mui.Grid>
      <Mui.Grid item container>
        <Mui.Grid item xs={3} justifyContent="flex-start">
          <Mui.Typography variant="h5">12/8/2022 7:41 PM</Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={9} justifyContent="flex-end">
          <Mui.Typography variant="h5">
            https://cellmademo.com/cellmaWEB/PrintAppointmentNotesSheet.do
          </Mui.Typography>
        </Mui.Grid>
      </Mui.Grid>
      <Mui.Grid item container>
        <Mui.Grid item xs={5}>
          <Mui.Typography variant="h4">Name : Riomed Amel</Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={4}>
          <Mui.Typography variant="h4">DOB : 28/06/1996</Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={3}>
          <Mui.Typography variant="h4">Gender : Female</Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={5}>
          <Mui.Typography variant="h4">Barcode No : 2727</Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={4}>
          <Mui.Typography variant="h4">Est Id : 1</Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={3}>
          <Mui.Typography variant="h4">Identifier No : 1001</Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={5}>
          <Mui.Typography variant="h4">Hospital Ref : 212</Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={4}>
          <Mui.Typography variant="h4">Sent : 01/02/2023</Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={3}>
          <Mui.Typography variant="h4">Received : 06/02/2023</Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={5}>
          <Mui.Typography variant="h4">
            Clinic Name : GUM/SRH Service
          </Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={4}>
          <Mui.Typography variant="h4">Category : Letters</Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={3}>
          <Mui.Typography variant="h4">Specialty : Doctor</Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={5}>
          <Mui.Typography variant="h4">
            Display Name : Appointment Details
          </Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={4}>
          <Mui.Typography variant="h4">From : Emma Hooper</Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={3}>
          <Mui.Typography variant="h4">To : Sam Hooper</Mui.Typography>
        </Mui.Grid>
      </Mui.Grid>
      <Mui.Grid item xs={12}>
        <Mui.Divider sx={{ my: "20px" }} />
      </Mui.Grid>
    </Mui.Grid>
  );
};
export default AppointmentWithPrint;
