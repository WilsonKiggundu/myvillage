import {RefObject} from "react";
import Quill from "quill";

const QuillEditor = (ref: RefObject<any>, placeholder: any) => {
    return new Quill(ref.current, {
            theme: 'snow',
            placeholder: placeholder,
            readOnly: false,
            formats: [
                'header', 'underline', 'strike', 'blockquote', 'code-block',
                'bold', 'italic', 'list', 'script', 'indent', 'align'
            ],
            modules: {
                toolbar: [
                    [{'header': [1, 2, 3, 4, 5, 6, false]}],
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],

                    [{'list': 'ordered'}, {'list': 'bullet'}],
                    [{'script': 'sub'}, {'script': 'super'}],
                    [{'indent': '-1'}, {'indent': '+1'}],

                    [{'align': []}],
                ]
            }
        }
    )
}

export default QuillEditor