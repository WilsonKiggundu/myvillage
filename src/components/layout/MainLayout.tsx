import React, {forwardRef, useEffect, useRef, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import ApplicationBar from "../appBar/AppBar";
import {useSelector} from "react-redux";

import './MainLayout.css'
import {userSelector} from "../../data/coreSelectors";
import {getAsync, makeUrl} from "../../utils/ajax";
import {Endpoints} from "../../services/Endpoints";
import UpdateCategoryForm from "../../modules/profiles/people/forms/profile/UpdateCategoryForm";
import XDialog from "../dialogs/XDialog";

interface IProps {
    user?: any
    title?: string
    children?: any,
    mobilePadding?: boolean
}

function MainLayout(props: IProps) {

    const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState<boolean>(false)
    const [person, setPerson] = useState<any>()
    const user = useSelector(userSelector)


    // check if logged in user has setup their categories
    useEffect(() => {
        (async () => {
            const url = makeUrl("Profiles", Endpoints.person.base)

            if (user) {
                try {
                    const response: any = await getAsync(`${url}/${user.profile.sub}`);
                    const person = response.body
                    if (!person.categories.length){
                        setPerson(person)
                        setOpenAddCategoryDialog(true)
                    }
                } catch (e: any) {
                    console.log("Failed to fetch user" + e)
                }
            }

        })();
    }, [user])

    useEffect(() => {
        document.body.style.backgroundColor = '#F1F1F0'
    }, [user])

    const truthy = false;

    return (
        <>
            <CssBaseline/>
            <ApplicationBar/>
            <main className="MainLayout-main">
                {props.children}
            </main>

            <XDialog title={"Update Categories"}
                     open={openAddCategoryDialog}
                     onClose={() => setOpenAddCategoryDialog(false)}>
                <UpdateCategoryForm
                    person={person}
                    onClose={() => setOpenAddCategoryDialog(false)}/>
            </XDialog>
        </>
    );
}

export default MainLayout
