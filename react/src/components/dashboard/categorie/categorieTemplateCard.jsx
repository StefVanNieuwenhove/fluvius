import {
  Fragment,
  memo,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";
import { Card, CardHeader, CardMedia, Checkbox } from "@mui/material";
import { CatTempByUserContext } from "../../../context/CatTempByUserContext";

const categorieTemplateCard = memo(({ id, naam, url }) => {
  const templateContext = useContext(CatTempByUserContext);
  const [notChecked, setNotChecked] = useState(false);

  const handleCheck = useCallback(() => {
    setNotChecked(!notChecked);

    if (!templateContext.catTempByUserContext.includes(id) && !notChecked)
      templateContext.addCat(id);

    if (notChecked && templateContext.catTempByUserContext.includes(id))
      templateContext.removeCat(id);
  }, [notChecked, templateContext, id]);

  useEffect(() => {
    if (templateContext.catTempByUserContext.includes(id)) {
      setNotChecked(true);
    }
  }, [notChecked]);

  return (
    <Fragment>
      <Card>
        {url && (
          <CardMedia
            component={"img"}
            src={url}
            alt={"Icoon voor de categorie " + naam}
            loading={"lazy"}
            sx={{ padding: 2 }}
          />
        )}
        <CardHeader
          title={naam}
          action={
            <Checkbox
              checked={notChecked}
              onClick={handleCheck}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
        />
      </Card>
    </Fragment>
  );
});

export default categorieTemplateCard;
