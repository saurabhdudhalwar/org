import { lazy } from "react";

import { Route, Routes } from "react-router-dom";

import AddToList from "../../user/screens/list/AddToList";
import ListItemList from "../../user/screens/list/ListItemList";
import AdminCard from "../common/AdminCard";
import SetClinics from "../screens/setClinics/SetClinics";
import SetRooms from "../screens/setRooms/SetRooms";
import SiteAdmin from "../screens/siteAdmin/SiteAdmin";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<AdminCard />}>
        <Route path="/siteAdmin" element={<SiteAdmin />} />
        <Route path="/setClinics" element={<SetClinics />} />
        <Route path="/listItemList" element={<ListItemList />} />
        <Route path="/setRooms" element={<SetRooms />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
