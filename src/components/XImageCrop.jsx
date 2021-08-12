import React, {useState} from "react";
import ImgCrop from 'antd-img-crop'
import {Upload} from 'antd'

import 'antd/dist/antd.css';
// import './index.scss';

export default function XImageCrop() {
    const [fileList, setFileList] = useState([])

    const onChange = ({ fileList: newFileList }) => {
        console.log(newFileList);
        setFileList(newFileList);
    };

    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);

        if (imgWindow) {
            imgWindow.document.write(image.outerHTML);
        } else {
            window.location.href = src;
        }
    };

    return (
        <ImgCrop grid>
            <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
            >
                {fileList.length < 3 && '+ Upload'}
            </Upload>
        </ImgCrop>
    );
}