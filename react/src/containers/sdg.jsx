import { Fragment, memo, useCallback, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as subSDGAPI from "../api/dashboard/subsdg";
import { Grid, Toolbar, Typography } from "@mui/material";
import { SubSDGCard } from "../components";

const Sdg = memo(() => {
  const { state } = useLocation();
  const { sdg } = state;

  const [subSDGs, setSubSDGs] = useState([]);
  const getSubSDGsBySDG = useCallback(async () => {
    try {
      const data = await subSDGAPI.getBySdg(sdg.id);
      setSubSDGs(data);
    } catch (error) {
      console.error(error);
    }
  }, [sdg, setSubSDGs]);

  useLayoutEffect(() => {
    getSubSDGsBySDG();
  }, [getSubSDGsBySDG]);

  return (
    <Fragment>
      <Toolbar disableGutters>
        <Typography variant={"h4"} component={"h2"} sx={{ flexGrow: 1, fontWeight: "bold", marginY: 4 }} noWrap>
          Gekozen SDG: {sdg.naam}
        </Typography>
      </Toolbar>
      <Grid
        container
        spacing={2}
        columns={{
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
        }}>
        {subSDGs.map(subSDG => {
          return (
            <Grid item xs={1} key={subSDG.ID}>
              <SubSDGCard
                id={subSDG.ID}
                beschrijving={subSDG.BESCHRIJVING}
                nummering={subSDG.NUMMERING}
                url={subSDG.URLICOON}
              />
            </Grid>
          );
        })}
      </Grid>
    </Fragment>
  );
});

export default Sdg;
