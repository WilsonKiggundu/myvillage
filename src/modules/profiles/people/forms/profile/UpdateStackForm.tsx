import XForm from "../../../../../components/forms/XForm";
import {FormikHelpers} from "formik";
import React, {useEffect, useState} from "react";
import * as yup from "yup"
import {useDispatch} from "react-redux";
import {getAsync, makeUrl} from "../../../../../utils/ajax";
import {Grid} from "@material-ui/core";
import {IPerson} from "../../IPerson";
import {Endpoints} from "../../../../../services/Endpoints";
import XSelectInputCreatable from "../../../../../components/inputs/XSelectInputCreatable";
import {reqArray} from "../../../../../data/validations";
import {editPersonStack} from "../../redux/peopleActions";

interface IProps {
    person: IPerson
    onClose?: () => any
}

const schema = yup.object().shape(
    {
        interests: reqArray
    }
)


const UpdateStackForm = ({onClose, person}: IProps) => {
    const dispatch = useDispatch()

    const {interests} = person
    const [interestsLookup, setStackLookup] = useState<any>([])

    useEffect(() => {

        (async () => {
            const lookupUrl = makeUrl("Profiles", Endpoints.lookup.interest)
            const response: any = await getAsync(lookupUrl, {});

            if (response.status === 200){
                let lookupStack = response.body.map((m: any) => ({id: m.id, name: m.category}))

                const lookupStackFiltered: any = []
                lookupStack.forEach((el: any) => {
                    const exists = interests?.some((i: any) => i.interestId === el.id)
                    if (!exists) {
                        lookupStackFiltered.push(el)
                    }
                })

                setStackLookup(lookupStackFiltered)
            }

        })();

    }, [])

    const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {

        const {interests} = values

        dispatch(editPersonStack({interests, personId: person.id}))

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

export default UpdateStackForm