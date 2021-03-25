import XForm from "../../../../../components/forms/XForm";
import {FormikHelpers} from "formik";
import React, {useEffect, useState} from "react";
import * as yup from "yup"
import {useDispatch} from "react-redux";
import {getAsync, makeUrl} from "../../../../../utils/ajax";
import {Grid} from "@material-ui/core";
import {IPerson} from "../../IPerson";
import {Endpoints} from "../../../../../services/Endpoints";
import {reqArray} from "../../../../../data/validations";
import XSelectInputCreatable from "../../../../../components/inputs/XSelectInputCreatable";
import {editPersonCategories} from "../../redux/peopleActions";

interface IProps {
    person: IPerson
    onClose?: () => any
}

const schema = yup.object().shape(
    {
        categories: reqArray
    }
)


const UpdateCategoryForm = ({person, onClose}: IProps) => {
    const dispatch = useDispatch()
    const categories = person.categories
    const [categoriesLookup, setCategoriesLookup] = useState<any>([])

    useEffect(() => {


        (async () => {
            const lookupUrl = makeUrl("Profiles", Endpoints.lookup.category)
            const response: any = await getAsync(lookupUrl, {});

            if (response.status === 200){
                let lookupCategories = response.body.map((m: any) => ({id: m.id, name: m.name}))

                const lookupCategoriesFiltered: any = []
                lookupCategories.forEach((el: any) => {
                    const exists = categories?.some((i: any) => i.categoryId === el.id)
                    if (!exists) {
                        lookupCategoriesFiltered.push(el)
                    }
                })

                setCategoriesLookup(lookupCategoriesFiltered)
            }

        })();

    }, [categories])

    const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {

        const {categories} = values

        dispatch(editPersonCategories({categories, personId: person.id}))

        actions.resetForm()
        if (onClose) {
            onClose()
        }
    }

    return (
        <XForm
            debug={false}
            schema={schema}
            submitButtonLabel={"Update"}
            onSubmit={handleSubmit}>
            <Grid spacing={2} container>
                <Grid item xs={12}>
                    <XSelectInputCreatable
                        variant={"outlined"}
                        name={"categories"}
                        allowAddNew={true}
                        multiple={true}
                        label={"Select a category"}
                        options={categoriesLookup}
                        dialogTitle={"Add a category"}
                        dialogSubtitle={"Did you miss a category in our list? Please, add it!"}
                    />
                </Grid>
            </Grid>

        </XForm>
    )
}

export default UpdateCategoryForm