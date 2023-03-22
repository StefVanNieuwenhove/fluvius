import { Fragment, memo, useCallback, useState } from "react";
import {
  AppBar,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Close, Menu } from "@mui/icons-material";
import { AccountNavbarMenu, AccountNavdrawerMenu } from "./account";
import { BreadcrumbsNavbar, BreadcrumbsNavdrawer } from "./breadcrumbs";
import fluvius_logo from "../../images/fluvius_logo_white.png";

const navbar = memo(() => {
  const companyName = (
    <img
      src={fluvius_logo}
      alt="logo"
      style={{ maxHeight: 50, alignSelf: "end" }}
    />
  );

  const isSmartphone = useMediaQuery("only screen and (max-width:750px)");

  const [isOpenedNavDrawer, setOpenedNavDrawer] = useState(false);
  const toggleNavDrawer = useCallback(() => {
    setOpenedNavDrawer(!isOpenedNavDrawer);
  }, [isOpenedNavDrawer, setOpenedNavDrawer]);

  return (
    <Fragment>
      <AppBar
        position={"sticky"}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          borderRadius: "16px",
        }}
      >
        <Toolbar>
          <Typography noWrap sx={{ flexGrow: 1 }}>
            {companyName}
          </Typography>
          {!!isSmartphone && (
            <IconButton
              edge={"end"}
              color={"inherit"}
              onClick={toggleNavDrawer}
            >
              {isOpenedNavDrawer ? <Close /> : <Menu />}
            </IconButton>
          )}
          {!isSmartphone && (
            <Fragment>
              <BreadcrumbsNavbar />
              <Divider
                orientation="vertical"
                variant="middle"
                color={"white"}
                flexItem
                sx={{ marginX: 1 }}
              />
              <AccountNavbarMenu />
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        open={isSmartphone && isOpenedNavDrawer}
        onClose={() => {
          setOpenedNavDrawer(false);
        }}
        anchor={"right"}
        keepMounted
      >
        <Toolbar sx={{ marginTop: 2 }}>
          <Typography
            variant={"h6"}
            noWrap
            component={"span"}
            sx={{ flexGrow: 1 }}
          >
            {companyName}
          </Typography>
          <Collapse orientation={"horizontal"} in={isSmartphone}>
            <IconButton
              edge={"end"}
              color={"inherit"}
              onClick={toggleNavDrawer}
            >
              {isOpenedNavDrawer ? <Close /> : <Menu />}
            </IconButton>
          </Collapse>
        </Toolbar>
        <BreadcrumbsNavdrawer />
        <Divider />
        <AccountNavdrawerMenu />
      </Drawer>
    </Fragment>
  );
});

export default navbar;
