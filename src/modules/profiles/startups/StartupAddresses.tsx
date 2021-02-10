import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import {globalStyles} from "../../../theme/styles"
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
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
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete"
import {getAddressTypeLabel} from "../../../utils/enumHelpers";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../../../data/coreSelectors";
import {white} from "../../../theme/custom-colors";
import {deleteStartupAddress} from "./redux/startupsActions";

interface IProps {
    startup: IStartup
}

export default function StartupAddresses({startup}: IProps) {
    const classes = globalStyles()
    const dispatch = useDispatch()
    const {addresses} = startup
    const [openAddAddressDialog, setOpenAddAddressDialog] = useState<boolean>(false)
    const [selected, setSelected] = useState<IAddress>(Object.create({}))

    const user = useSelector(userSelector)
    const canEdit = startup.roles?.some((role: any) => role.personId === user?.profile.sub) ?? false


    const handleEdit = (address: IAddress) => {
        setSelected(address)
        setOpenAddAddressDialog(true)
    }

    return (
        <Box mb={2}>
            <Card>
                <CardHeader
                    action={
                        canEdit ? (
                            <IconButton
                                onClick={() => setOpenAddAddressDialog(true)}
                                aria-label="settings">
                                <AddIcon style={{color: white}}/>
                            </IconButton>
                        ) : ""
                    }
                    title={"Addresses"}
                />
            </Card>

            <Box mt={2} mb={2}>
                {addresses?.length ?
                    <Grid container spacing={2}>
                        {
                            addresses.map((address: IAddress, index: number) => (
                                <Grid style={{position: 'relative'}} item xs={12} md={6} lg={4} key={index}>
                                    <Card>
                                        <CardHeader
                                            action={
                                                canEdit ? (
                                                    <>
                                                        <IconButton onClick={() => handleEdit(address)}>
                                                            <EditIcon/>
                                                        </IconButton>
                                                        <IconButton onClick={() => dispatch(deleteStartupAddress({
                                                            businessId: address.businessId,
                                                            addressId: address.id
                                                        }))}>
                                                            <DeleteIcon/>
                                                        </IconButton>
                                                    </>
                                                ) : ""
                                            }
                                            title={
                                            <Typography>{getAddressTypeLabel(address.type)}</Typography>
                                        } />

                                        <Divider />

                                        <CardContent>

                                            <Grid spacing={2} container>
                                                <Grid item xs={12}>
                                                    <strong>Country, City</strong><br/>
                                                    <Typography>
                                                        {address.country}, {address.city}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid spacing={2} container>
                                                <Grid item xs={12}>
                                                    <strong>Building, Floor</strong><br/>
                                                    <Typography>
                                                        {address.building || '--'}, {address.floor || '--'}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid spacing={2} container>
                                                <Grid item xs={12}>
                                                    <strong>Street address</strong><br/>
                                                    <Typography>
                                                        {address.street || '--'}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid spacing={2} container>
                                                <Grid item xs={12}>
                                                    <strong>Postal code</strong><br/>
                                                    <Typography>
                                                        {address.postalCode || '--'}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid spacing={2} container>
                                                <Grid item xs={12}>
                                                    <strong>Address line</strong><br/>
                                                    <Typography style={{whiteSpace: 'pre-line'}}>
                                                        {address.addressLine || '--'}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        }
                    </Grid> : <Alert onClick={() => setOpenAddAddressDialog(true)}
                                     className={classes.clickable}
                                     color={"info"}
                                     icon={<AddIcon/>}>
                        Add your address so you can easily be found
                    </Alert>
                }

                <XDialog
                    open={openAddAddressDialog}
                    maxWidth={"sm"}
                    title={"Add an address"}
                    onClose={() => setOpenAddAddressDialog(false)}>
                    <UpdateAddressForm
                        profile={startup}
                        address={selected}
                        onClose={() => setOpenAddAddressDialog(false)}/>
                </XDialog>

            </Box>
        </Box>
    );
}