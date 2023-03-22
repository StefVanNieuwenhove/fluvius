import { Fragment, memo, useCallback, useState, useEffect, useContext } from "react";
import { Button, Grid, Toolbar, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { Edit } from "@mui/icons-material";
import { useSession } from "../context/AuthProvider";
import { CatTempByRolContext } from "../context/CatTempByRolContext";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { RolTemplateCard } from "../components";
import * as rolTemplateApi from "../api/dashboard/rolTemplate";
import * as catApi from "../api/dashboard/categorie";

const Categorieen = memo(() => {
  const templateContext = useContext(CatTempByRolContext);
  const [categorieen, setCategorieen] = useState([]);
  const [rol, setRol] = useState("Manager");
  const [isEmpty, setIsEmpty] = useState(false);
  const { ready } = useSession();
  const getCategorieen = useCallback(async () => {
    if (ready) {
      try {
        const data = await catApi.getAll();
        setCategorieen(data);
      } catch (error) {
        console.error(error);
      }
    }
  }, [ready]);

  const navigate = useNavigate();

  useEffect(() => {
    getCategorieen();
  }, [getCategorieen, rol]);

  const templateAanpassen = useCallback(async () => {
    const newTemplate = templateContext.getSelectedCats().join(",");
    if (newTemplate !== "") {
      try {
        const success = await rolTemplateApi.updateCatViewByRole(rol, newTemplate);
        if (success) navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else setIsEmpty(true);
  }, [templateContext, navigate, rol]);

  const handleChange = useCallback(event => {
    setRol(event.target.value);
  }, []);

  const annuleren = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <Fragment>
      <Toolbar disableGutters>
        <Typography variant={"h4"} component={"h2"} sx={{ flexGrow: 1, fontWeight: "bold", marginY: 4 }} noWrap>
          Categorieën aanpassen per rol
        </Typography>
        <Button startIcon={<ClearIcon />} variant={"contained"} sx={{ mr: 2 }} onClick={annuleren}>
          Annuleren
        </Button>
        <Button startIcon={<Edit />} variant={"contained"} onClick={templateAanpassen}>
          Aanpassen
        </Button>
      </Toolbar>
      <FormControl fullWidth sx={{ marginY: 3 }}>
        <InputLabel id="rolselect">Rol</InputLabel>
        <Select labelId="rolselect" id="rolselect-select" value={rol} label="Rol" onChange={handleChange}>
          <MenuItem value={"Gebruiker"}>Gebruiker</MenuItem>
          <MenuItem value={"Manager"}>Manager</MenuItem>
          <MenuItem value={"Directie"}>Directie</MenuItem>
        </Select>
      </FormControl>
      <Grid
        container
        spacing={2}
        columns={{
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
        }}>
        {categorieen.map(categorie => {
          return (
            <Grid item xs={1} key={categorie.ID}>
              <RolTemplateCard id={categorie.ID} naam={categorie.NAAM} url={categorie.URLICOON} />
            </Grid>
          );
        })}
      </Grid>
      {isEmpty && <Typography variant="h5">Gelieve minstens 1 categorie aan te duiden</Typography>}
    </Fragment>
  );
});

export default Categorieen;
