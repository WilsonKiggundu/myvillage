import XForm from "../../../../../components/forms/XForm";
import {FormikHelpers} from "formik";
import React, {useEffect, useState} from "react";
import * as yup from "yup"
import {useDispatch} from "react-redux";
import {get, getAsync, makeUrl} from "../../../../../utils/ajax";
import {Grid} from "@material-ui/core";
import {IPerson} from "../../IPerson";
import {IOption} from "../../../../../components/inputs/inputHelpers";
import {Endpoints} from "../../../../../services/Endpoints";
import Chip from "@material-ui/core/Chip";
import {getProfile} from "../../../../../services/User";
import XSelectInputCreatable from "../../../../../components/inputs/XSelectInputCreatable";
import {reqArray} from "../../../../../data/validations";
import {editPersonInterests} from "../../redux/peopleActions";

interface IProps {
    person: IPerson
    onClose?: () => any
}

const schema = yup.object().shape(
    {
        interests: reqArray
    }
)


const UpdateInterestsForm = ({onClose, person}: IProps) => {
    const dispatch = useDispatch()

    const {interests} = person
    const [interestsLookup, setInterestsLookup] = useState<any>([])

    useEffect(() => {

        (async () => {
            const lookupUrl = makeUrl("Profiles", Endpoints.lookup.interest)
            const response: any = await getAsync(lookupUrl, {});

            if (response.status === 200){
                let lookupInterests = response.body.map((m: any) => ({id: m.id, name: m.category}))

                const lookupInterestsFiltered: any = []
                lookupInterests.forEach((el: any) => {
                    const exists = interests?.some((i: any) => i.categoryId === el.id)
                    if (!exists) {
                        lookupInterestsFiltered.push(el)
                    }
                })

                setInterestsLookup(lookupInterestsFiltered)
            }

        })();

    }, [interests])

    const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {

        const {interests} = values

        dispatch(editPersonInterests({interests, personId: person.id}))

        actions.resetForm()
        if (onClose) {
            onClose()
        }

    }


    return (
        <XForm
            debug={false}
            schema={schema}
            onSubmit={handleSubmit}>
            <Grid spacing={2} container>
                <XSelectInputCreatable
                    variant={"outlined"}
                    name={"interests"}
                    allowAddNew={true}
                    multiple={true}
                    label={"Select an interest"}
                    options={interestsLookup}
                />
            </Grid>

        </XForm>
    )
}

export default UpdateInterestsForm