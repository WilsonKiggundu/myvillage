import {AccordionDetails, Box, createStyles, makeStyles, Theme} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Overlay from "./Overlay";
import {globalStyles} from "../theme/styles";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import CardHeader from "@material-ui/core/CardHeader";
import XDialog from "./dialogs/XDialog";
import AddStartupProduct from "../modules/profiles/startups/forms/AddStartupProduct";
import {IStartup} from "../interfaces/IStartup";
import CardMedia from "@material-ui/core/CardMedia";
import {IProduct} from "../interfaces/IProduct";
import {get, makeUrl} from "../utils/ajax";
import {Endpoints} from "../services/Endpoints";
import Toast from "../utils/Toast";
import {format, formatDistanceToNow} from "date-fns";
import {Add} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import Divider from "@material-ui/core/Divider";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import Button from "@material-ui/core/Button";
import clsx from "clsx";

interface IProps {
    canEdit: boolean
    title: string
    profile: IStartup
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '100%',
            fontWeight: 'bold',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
    }),
);

const ProductPortfolio = ({canEdit, profile, ...props}: IProps) => {

    const classes = globalStyles()
    const styles = useStyles()
    const [openAddProduct, setOpenAddProduct] = useState<boolean>(false)
    const [selectedProduct, setSelectedProduct] = useState<IProduct | undefined>(undefined)
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const {products} = profile
    const businessId = profile.id

    const handleEdit = (product: IProduct) => {
        setSelectedProduct(product)
        setOpenAddProduct(true)
    }

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box mb={2}>
            <Box mt={6}>

                <Grid container>
                    <Grid item xs={6}>
                        <Typography component={"div"} variant={"h6"}>{props.title}</Typography>
                    </Grid>
                    {canEdit ? (
                        <Grid item xs={6} style={{textAlign: "right"}}>
                            <IconButton onClick={() => setOpenAddProduct(true)}>
                                <AddIcon/>
                            </IconButton>
                        </Grid>
                    ) : ""}
                </Grid>
            </Box>

            <Box>
                {products ? products.map((product: IProduct, index: number) => (
                    <Accordion key={product.id} expanded={expanded === product.id}
                               onChange={handleChange(product.id)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography className={styles.heading}>{product.name}</Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography style={{whiteSpace: 'pre-line'}} variant="body2" component="div">
                                        {product.description}
                                    </Typography>
                                </Grid>
                                {canEdit ? <Grid item xs={12}>
                                    <Box mt={2}>
                                        <Button variant={"contained"}
                                                color={"default"}
                                                className={clsx(classes.flat)}
                                                size={"small"}
                                                onClick={() => handleEdit(product)}>Edit</Button>
                                    </Box>
                                </Grid> : ""}
                            </Grid>

                        </AccordionDetails>
                    </Accordion>
                )) : (
                    <Typography component={"small"}>No products found</Typography>
                )}
            </Box>

            <XDialog title={"Add a product"}
                     open={openAddProduct}
                     onClose={() => setOpenAddProduct(false)}>
                <AddStartupProduct onClose={() => setOpenAddProduct(false)} product={selectedProduct} profile={profile}/>
            </XDialog>

        </Box>
    )
}

export default ProductPortfolio