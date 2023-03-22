import { Fragment, memo, useCallback, useEffect, useState } from "react";
import * as sdgAPI from "../api/dashboard/sdg";
import { useLocation } from "react-router-dom";
import { Grid, Toolbar, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { SdgCard } from "../components";

const Categorie = memo(() => {
  const { state } = useLocation();
  const { categorie } = state;

  const [sdgs, setSDGs] = useState([]);
  const getSDGsByCategorie = useCallback(async () => {
    try {
      const data = await sdgAPI.getByCat(categorie.id);
      setSDGs(data);
    } catch (error) {
      console.error(error);
    }
  }, [categorie, setSDGs]);

  useEffect(() => {
    getSDGsByCategorie();
  }, [getSDGsByCategorie]);

  return (
    <Fragment>
      <Toolbar disableGutters>
        <Typography variant={"h4"} component={"h2"} sx={{ flexGrow: 1, fontWeight: "bold", marginY: 4 }} noWrap>
          Gekozen categorie: {categorie.naam}
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
        {sdgs
          .sort((sdg1, sdg2) => sdg1.NUMMERING - sdg2.NUMMERING)
          .map(sdg => {
            return (
              <Grid item xs={1} key={sdg.ID}>
                <SdgCard id={sdg.ID} naam={sdg.NAAM} nummering={sdg.NUMMERING} url={sdg.URLICOON} />
              </Grid>
            );
          })}
      </Grid>
    </Fragment>
  );
});

export default Categorie;
