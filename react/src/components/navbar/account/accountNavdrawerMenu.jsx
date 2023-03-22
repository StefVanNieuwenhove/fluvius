import {Fragment, memo} from "react";
import {useLogout} from "../../../context/AuthProvider";
import {List, ListItemButton, ListItemText} from "@mui/material";


const accountNavdrawerMenu = memo(() => {
  const logout = useLogout();

  return <Fragment>
    <List>
      <ListItemButton onClick={logout}><ListItemText primary={"Logout"} /></ListItemButton>
      <ListItemButton onClick={undefined}><ListItemText primary={"Settings"} /></ListItemButton>
    </List>
  </Fragment>;
});

export default accountNavdrawerMenu;