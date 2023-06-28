import { lazy } from "react";

import { Route, Routes } from "react-router-dom";

import UserCard from "../common/UserCard";
import AddUserWizard from "../screens/AddUserWizard/AddUserWizard";
import AddUserWizardCustomizable from "../screens/customizeViewAddUserWizard/AddUserWizardCustomizable";
import HpDiary from "../screens/hpDiary/HpDiary";
import AddToList from "../screens/list/AddToList";
import ListItemList from "../screens/list/ListItemList";
import SetHpDiary from "../screens/setHpDiary/SetHpDiary";

const UserSearch = lazy(() => import("../screens/userSearch/UserSearch"));

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<UserCard />}>
        <Route path="/userSearch" element={<UserSearch />} />
        <Route path="/setHPDiary" element={<SetHpDiary />} />
        <Route path="/hpDiary" element={<HpDiary />} />
        <Route path="/addUserWizard" element={<AddUserWizard />} />
        <Route
          path="/addUserWizardCustom"
          element={<AddUserWizardCustomizable />}
        />
        <Route path="/listItemList" element={<ListItemList />} />
        <Route path="/addToList" element={<AddToList />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
