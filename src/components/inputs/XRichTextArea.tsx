import React, {useEffect, useState} from "react";
import XTextAreaInput from "./XTextAreaInput";
import {Typography} from "@material-ui/core";
import Toast from "../../utils/Toast";
import {useField} from "formik";
import TextField, {TextFieldProps} from "@material-ui/core/TextField";
import {hasValue} from "./inputHelpers";
import {MuiBulletedTextArea} from "react-bulleted-textarea";

export type EditorTheme = 'snow' | 'bubble'

interface IProps{

}

const XRichTextArea = ({...props}: TextFieldProps & IProps) => {

}

export default XRichTextArea