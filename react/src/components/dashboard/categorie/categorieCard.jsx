import {Fragment, memo, useCallback} from "react";
import {Card, CardActionArea, CardHeader, CardMedia} from "@mui/material";
import {ChevronRight} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";


const categorieCard = memo(({
                              id,
                              naam,
                              url,
                            }) => {
  const navigate = useNavigate();

  const handleOpenCategorie = useCallback(() => {
    navigate("/categorie", {
      state: {
        categorie: {
          id,
          naam,
          url,
        },
      },
    });
  }, [navigate, id, naam, url]);

  return <Fragment>
    <Card>
      <CardActionArea onClick={handleOpenCategorie}>
        {
            url &&
            <CardMedia
                component={"img"}
                src={url}
                alt={"Icoon voor de categorie " + naam}
                loading={"lazy"}
                sx={{padding: 2}}
            />
        }
        <CardHeader title={naam} action={<ChevronRight fontSize={"large"} />} />
      </CardActionArea>
    </Card>
  </Fragment>;
});

export default categorieCard;