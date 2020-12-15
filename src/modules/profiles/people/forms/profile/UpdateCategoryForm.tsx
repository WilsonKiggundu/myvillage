import XForm from "../../../../../components/forms/XForm";
import {FormikHelpers} from "formik";
import React, {useEffect, useState} from "react";
import * as yup from "yup"
import {useDispatch} from "react-redux";
import {get, makeUrl, post} from "../../../../../utils/ajax";
import Toast from "../../../../../utils/Toast";
import {Grid} from "@material-ui/core";
import {IPerson} from "../../IPerson";
import {IOption} from "../../../../../components/inputs/inputHelpers";
import {Endpoints} from "../../../../../services/Endpoints";
import Chip from "@material-ui/core/Chip";
import XTextInput from "../../../../../components/inputs/XTextInput";
import {reqArray, reqString} from "../../../../../data/validations";
import XSelectInput from "../../../../../components/inputs/XSelectInput";
import {Options} from "../../../../../utils/options";
import {IProfileCategory} from "../../../../../interfaces/IProfileCategory";
import {addCategory} from "../../personSlice";
import {addComment} from "../../../../posts/postsSlice";
import {unwrapResult} from "@reduxjs/toolkit";
import {getProfile, getUser} from "../../../../../services/User";

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
    const [categories, setCategories] = useState<IOption[]>([]);

    useEffect(() => {
        const url = makeUrl("Profiles", Endpoints.lookup.category)
        get(url, {}, (categories) => {
            if (categories) {
                setCategories(categories.map((category: any) => ({
                    id: category.id,
                    name: category.name
                })))
            }
        })

    }, [setCategories])

    const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {

        const {categories} = values
        const user: IPerson = getProfile()

        await Promise.all(categories.map(async (category: string) => {
            const resultAction: any = dispatch(addCategory({personId: user.id, categoryId: category}))
            unwrapResult(resultAction)
        }))

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
                    <XSelectInput
                        options={categories}
                        label={"Category"}
                        multiple={true}
                        helperText={"Select all that apply to you"}
                        name={"categories"}
                    />
                </Grid>
            </Grid>

        </XForm>
    )
}

export default UpdateCategoryForm