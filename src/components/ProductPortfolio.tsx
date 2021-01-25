import {AccordionDetails, Box, createStyles, makeStyles, Theme} from "@material-ui/core";
import React, {useState} from "react";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import {globalStyles} from "../theme/styles";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import CardHeader from "@material-ui/core/CardHeader";
import XDialog from "./dialogs/XDialog";
import AddStartupProduct from "../modules/profiles/startups/forms/AddStartupProduct";
import {IStartup} from "../interfaces/IStartup";
import {IProduct} from "../interfaces/IProduct";
import Divider from "@material-ui/core/Divider";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../data/coreSelectors";
import {startupProductsSelector, startupSelector} from "../modules/profiles/startups/redux/startupsSelectors";
import {PleaseWait} from "./PleaseWait";
import {Alert} from "@material-ui/lab";
import {deleteStartupProduct} from "../modules/profiles/startups/redux/startupsActions";

interface IProps {
    title: string
    startup: IStartup
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

const ProductPortfolio = ({startup, ...props}: IProps) => {

    const classes = globalStyles()
    const dispatch = useDispatch()
    const styles = useStyles()
    const [openAddProduct, setOpenAddProduct] = useState<boolean>(false)
    const [selectedProduct, setSelectedProduct] = useState<IProduct | undefined>(undefined)
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const user = useSelector(userSelector)
    const products = useSelector((state) => startupProductsSelector(state, startup.id))
    const canEdit = startup.roles?.some((role: any) => role.personId === user?.profile.sub) ?? false

    const handleEdit = (product: IProduct) => {
        setSelectedProduct(product)
        setOpenAddProduct(true)
    }
    const handleDelete = (product: IProduct) => {
        dispatch(deleteStartupProduct({
            productId: product.id,
            businessId: product.businessId
        }))
    }

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    // if (profile.loading.products) return <PleaseWait label={"Loading products..."} />
    // if (profile.errors.products) return <Alert color={"error"}>{profile.errors.products}</Alert>

    return (
        <Box mb={2}>
            <Card>
                <CardHeader
                    title={props.title}
                    action={canEdit ? (
                        <IconButton onClick={() => setOpenAddProduct(true)}>
                            <AddIcon/>
                        </IconButton>
                    ) : ""}
                />
                <Divider/>
                <CardContent>
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
                                                    color={"secondary"}
                                                    className={clsx(classes.flat)}
                                                    size={"small"}
                                                    onClick={() => handleEdit(product)}>Edit</Button>

                                            <Button variant={"outlined"}
                                                    color={"default"}
                                                    style={{marginLeft: 10}}
                                                    className={clsx(classes.flat)}
                                                    size={"small"}
                                                    onClick={() => handleDelete(product)}>Delete</Button>

                                        </Box>
                                    </Grid> : ""}
                                </Grid>

                            </AccordionDetails>
                        </Accordion>
                    )) : (
                        <Typography component={"small"}>No products found</Typography>
                    )}

                </CardContent>
            </Card>

            <XDialog title={"Add a product"}
                     open={openAddProduct}
                     onClose={() => setOpenAddProduct(false)}>
                <AddStartupProduct onClose={() => setOpenAddProduct(false)} product={selectedProduct}
                                   profile={startup}/>
            </XDialog>

        </Box>
    )
}

export default ProductPortfolio