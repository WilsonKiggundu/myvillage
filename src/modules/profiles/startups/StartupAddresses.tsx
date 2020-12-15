import React, {Fragment, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import {globalStyles} from "../../../theme/styles"
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import grey from "@material-ui/core/colors/grey";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import {IStartup} from "../../../interfaces/IStartup";
import {IAddress} from "../../../interfaces/IAddress";
import XDialog from "../../../components/dialogs/XDialog";
import UpdateAddressForm from "./forms/UpdateAddressForm";
import {CardHeader} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import {Alert} from "@material-ui/lab";

interface IProps {
    profile: IStartup
    canEdit: boolean
}

export default function StartupAddresses({canEdit, profile}: IProps) {
    const classes = globalStyles();
    const {addresses} = profile
    const [openAddAddressDialog, setOpenAddAddressDialog] = useState<boolean>(false)

    return (
        <Box mb={2}>
            <Card>
                <CardHeader
                    action={
                        canEdit ? (
                            <IconButton
                                onClick={() => setOpenAddAddressDialog(true)}
                                aria-label="settings">
                                <AddIcon/>
                            </IconButton>
                        ) : ""
                    }
                    title={"Addresses"}
                />
                <CardContent>
                    {addresses ?
                        addresses.map((address: IAddress, index: number) => (
                            <Box mb={2} key={index}>
                                <Grid spacing={1} container>
                                    <Grid item xs={12} sm={6}>
                                        <Typography component={"h6"} variant={"h6"}>
                                            Address Type
                                        </Typography>
                                        <Typography component={"div"} variant={"body2"}>
                                            {address.type}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Typography component={"h6"} variant={"h6"}>
                                            Country, City
                                        </Typography>
                                        <Typography component={"div"} variant={"body2"}>
                                            {address.country}, {address.city}
                                        </Typography>
                                    </Grid>

                                    {address.building ? <Grid item xs={12} sm={6}>
                                        <Typography component={"h6"} variant={"h6"}>
                                            Building
                                        </Typography>
                                        <Typography component={"div"} variant={"body2"}>
                                            {address.building} {address.floor}
                                        </Typography>
                                    </Grid> : ""}

                                    {address.street ? <Grid item xs={12} sm={6}>
                                        <Typography component={"h6"} variant={"h6"}>
                                            Street address
                                        </Typography>
                                        <Typography component={"div"} variant={"body2"}>
                                            {address.street}
                                        </Typography>
                                    </Grid> : ""}

                                    {address.postalCode ? <Grid item xs={12} sm={6}>
                                        <Typography component={"h6"} variant={"h6"}>
                                            Postal code
                                        </Typography>
                                        <Typography component={"div"} variant={"body2"}>
                                            {address.postalCode}
                                        </Typography>
                                    </Grid> : ""}

                                    <Grid item xs={12}>
                                        <Typography component={"h6"} variant={"h6"}>
                                            Address line
                                        </Typography>
                                        <Typography style={{whiteSpace: 'pre-line'}} component={"div"} variant={"body2"}>
                                            {address.addressLine}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Divider />
                            </Box>
                        )) : (
                            <Alert onClick={() => setOpenAddAddressDialog(true)}
                                   className={classes.clickable}
                                   color={"info"}
                                   icon={<AddIcon/>}>
                                Add your address so you can easily be found
                            </Alert>
                        )
                    }

                    <XDialog
                        open={openAddAddressDialog}
                        maxWidth={"md"}
                        title={"Add an address"}
                        onClose={() => setOpenAddAddressDialog(false)}>
                        <UpdateAddressForm
                            profile={profile}
                            onClose={() => setOpenAddAddressDialog(false)}/>
                    </XDialog>

                </CardContent>
            </Card>
        </Box>
    );
}