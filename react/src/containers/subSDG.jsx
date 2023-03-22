import { Fragment, memo, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as mvoAPI from "../api/dashboard/mvoDoelstelling";
import { Grid, Toolbar, Typography } from "@mui/material";
import { MvoCard } from "../components";

const SubSDG = memo(() => {
  const { state } = useLocation();
  const { subSDG } = state;

  const [mvos, setMVOs] = useState([]);
  const getMVOsBySubSDG = useCallback(async () => {
    try {
      const data = await mvoAPI.getBySubSDG(subSDG.id);
      setMVOs(data);
    } catch (error) {
      console.log(error);
    }
  }, [subSDG, setMVOs]);


  useEffect(() => {
    getMVOsBySubSDG();
  }, [getMVOsBySubSDG]);

  return (
    <Fragment>
      <Toolbar disableGutters>
        <Typography variant={"h4"} component={"h2"} sx={{ flexGrow: 1, fontWeight: "bold", marginY: 4 }} noWrap>
          sub SDG: {subSDG.beschrijving}
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
        {mvos.map(mvo => {
          return (
            <Grid item xs={1} key={mvo.ID}>
              <MvoCard
                id={mvo.ID}
                naam={mvo.NAAM}
                waarde={undefined /*TODO Moet nog berekent worden aan de hand van DS's*/}
                doelwaarde={mvo.DOELWAARDE}
                url={mvo.ICOON}
              />
            </Grid>
          );
        })}
      </Grid>
    </Fragment>
  );
});

export default SubSDG;
