import {Box} from "@material-ui/core";
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

interface IProps {
    canEdit: boolean
    title: string
    profile: IStartup
}

const ProductPortfolio = ({canEdit, profile, ...props}: IProps) => {

    const classes = globalStyles()
    const [overlayState, setOverlayState] = useState(false)
    const [openAddProduct, setOpenAddProduct] = useState<boolean>(false)
    const [products, setProducts] = useState<IProduct[]>([])
    const businessId = profile.id

    useEffect(() => {
        const url = makeUrl("Profiles", Endpoints.business.product)

        get(url, {businessId}, (products) => {
            setProducts([...products])
            console.log({...products})
        }, err => {
            Toast.error(err.toString())
        })
    }, [businessId])

    const handleClick = (image: any) => {
        setOverlayState(!overlayState)
    }

    return (
        <Box mb={2}>
            <Box mt={6} mb={2}>

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

            <Grid container spacing={2}>
                {products ? products.map((product: IProduct, index: number) => (
                    <Grid key={index} item xs={12} lg={6}>

                        <Card>
                            <CardHeader
                                title={product.name}
                                subheader={
                                    <small>{"Uploaded " + formatDistanceToNow(new Date(product.dateCreated)) + " ago"}</small>
                                }
                            />
                            <CardContent>

                                <Typography style={{whiteSpace: 'pre-line'}} variant="body2" component="div">
                                    {product.description}
                                </Typography>

                                <Box mt={3}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <img className={classes.clickable}
                                                 onClick={() => handleClick(product)}
                                                 style={{width: '100%', height: 'auto'}}
                                                 src={"https://shop.motivug.org/wp-content/uploads/2020/10/MoTIV-product-122-1-2048x1365.jpg"}
                                                 alt={product.name}/>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <img className={classes.clickable}
                                                 onClick={() => handleClick(product)}
                                                 style={{width: '100%', height: 'auto'}}
                                                 src={"https://shop.motivug.org/wp-content/uploads/2020/10/MoTIV-product-123-2048x1365.jpg"}
                                                 alt={product.name}/>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <img className={classes.clickable}
                                                 onClick={() => handleClick(product)}
                                                 style={{width: '100%', height: 'auto'}}
                                                 src={"https://shop.motivug.org/wp-content/uploads/2020/10/MoTIV-product-123-2048x1365.jpg"}
                                                 alt={product.name}/>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <img className={classes.clickable}
                                                 onClick={() => handleClick(product)}
                                                 style={{width: '100%', height: 'auto'}}
                                                 src={"https://shop.motivug.org/wp-content/uploads/2020/10/MoTIV-product-123-2048x1365.jpg"}
                                                 alt={product.name}/>
                                        </Grid>
                                    </Grid>
                                </Box>

                            </CardContent>
                        </Card>

                    </Grid>
                )) : (
                    <Typography component={"small"}>No products found</Typography>
                )}
            </Grid>

            <XDialog title={"Add a product"}
                     open={openAddProduct}
                     onClose={() => setOpenAddProduct(false)}>
                <AddStartupProduct profile={profile}/>
            </XDialog>

            {/*<Overlay open={overlayState} items={props.items}/>*/}
        </Box>
    )
}

export default ProductPortfolio