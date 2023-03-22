import {Fragment, memo, useCallback} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Card, CardActionArea, CardContent, CardHeader, CardMedia, LinearProgress, Typography} from "@mui/material";
import {ChevronRight} from "@mui/icons-material";


const subMVOCard = memo(({id, naam, waarde, doelwaarde = 0, url}) => {
    waarde = waarde === undefined ? Math.floor(Math.random() * doelwaarde) + 1 : waarde;

    const navigate = useNavigate();
    const {state} = useLocation();
    const {categorie, sdg, subSDG, mvo} = state;

    const handleOpenSubMVO = useCallback(() => {
        navigate("/submvo", {
            state: {
                categorie,
                sdg,
                subSDG,
                mvo,
                subMVO: {id, naam, waarde, doelwaarde, url},
            },
        });
    }, [navigate, categorie, sdg, subSDG, mvo, id, naam, waarde, doelwaarde, url]);

    return <Fragment>
        <Card>
            <CardActionArea onClick={handleOpenSubMVO}>
                {url && <CardMedia
                    component={"img"}
                    src={url}
                    alt={"Icoon voor de sub MVO " + naam}
                    loading={"lazy"}
                    sx={{padding: 2}}
                />}
                <CardHeader title={naam} action={<ChevronRight fontSize={"large"}/>}/>
                <CardContent>
                    <Typography variant={"body1"}>
                        Vooruitgang:
                    </Typography>
                    <LinearProgress variant={"determinate"} value={doelwaarde !== 0 && ((waarde / doelwaarde) * 100)}
                                    color={(doelwaarde !== 0 && ((waarde / doelwaarde) * 100)) > 80 ? "success" : (doelwaarde !== 0 && ((waarde / doelwaarde) * 100)) > 30 ? "warning" : "error"}/>
                </CardContent>
            </CardActionArea>
        </Card>
    </Fragment>;
});

export default subMVOCard;