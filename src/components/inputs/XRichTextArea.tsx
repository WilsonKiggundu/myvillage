import React from "react";
import {Field, FieldProps, useField} from "formik";
import {TextFieldProps} from "@material-ui/core/TextField";
import {hasValue} from "./inputHelpers";
// @ts-ignore
import {CKEditor} from "@ckeditor/ckeditor5-react"

// @ts-ignore
import CustomBuild from "ckeditor5-custom-build/build/ckeditor"

// @ts-ignore
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

// @ts-ignore
import './css/XRichTextArea.css'
import FormHelperText from "@material-ui/core/FormHelperText";

export type EditorTheme = 'snow' | 'bubble'


interface IProps {
    name: string
    editor?: any
    placeholder?: string
}

const XRichTextArea = ({name, placeholder, editor, helperText, ...props}: TextFieldProps & IProps) => {
    const [field, meta] = useField({name});
    const error = hasValue(meta.error) ? meta.error : undefined
    const showError = Boolean(error && meta.touched)

    const editorConfiguration = {
        placeholder: placeholder,
        toolbar: {
            viewportTopOffset: 70,
            items: [
                'heading', 'bold', 'italic',
                'undo', 'redo', 'table', 'alignment',
                'link', 'bulletedList', 'numberedList',
                'blockQuote', 'codeBlock'
            ]
        },
        heading: {
            options: [
                {model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph'},
                {model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1'},
                {model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2'}
            ]
        },
        alignment: {
            options: ['left', 'center', 'right']
        }
    }

    return (

        <Field name={name}>
            {({field, form, meta}: FieldProps<number | string>) => (
                <>
                    <CKEditor
                        editor={ClassicEditor}
                        config={editorConfiguration}
                        data={field.value}
                        onChange={(event: any, editor: any) => {
                            form.setFieldValue(field.name, editor.getData())
                        }}
                    />

                    {
                        showError ?
                            <FormHelperText>
                                <span className="error-text">{error}</span>
                            </FormHelperText> :
                            <FormHelperText>{helperText}</FormHelperText>
                    }
                </>
            )}
        </Field>
    )
}

export default XRichTextArea