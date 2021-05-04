import React from "react";
import {Field, FieldProps, useField} from "formik";
import {TextFieldProps} from "@material-ui/core/TextField";
import {hasValue} from "./inputHelpers";
// @ts-ignore
import {CKEditor} from "@ckeditor/ckeditor5-react"
// @ts-ignore
// import BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './css/XRichTextArea.css'
import FormHelperText from "@material-ui/core/FormHelperText";
import {red} from "@material-ui/core/colors";

export type EditorTheme = 'snow' | 'bubble'

interface IProps {
    name: string
}

const XRichTextArea = ({name, helperText, ...props}: TextFieldProps & IProps) => {
    const [field, meta] = useField({name});
    const error = hasValue(meta.error) ? meta.error : undefined
    const showError = Boolean(error && meta.touched)
    return (

        <Field name={name}>
            {({field, form, meta}: FieldProps<number | string>) => (
                <>
                    <CKEditor
                        editor={ClassicEditor}
                        data={field.value}
                        onChange={(event: any, editor: any) => {
                            form.setFieldValue(field.name, editor.getData())
                        }}
                    />

                    {
                        helperText ? <FormHelperText>{helperText}</FormHelperText> :
                            showError && <FormHelperText>
                            <div className="error-text">{error}</div>
                            </FormHelperText>
                    }
                </>
            )}
        </Field>
    )
}

export default XRichTextArea