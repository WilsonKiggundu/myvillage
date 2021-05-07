import React, {ChangeEvent, useState} from "react";
import {withStyles} from "@material-ui/core";

import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';

const Accordion = withStyles({
    root: {
        borderTop: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);

interface IProps {
    id: number
    title: string
    children?: any
}

export default function XAccordion({id, title, children}: IProps) {

    const [expanded, setExpanded] = useState<string | false>('panel0');
    const panelId = `panel${id}`
    const panelHeader = `panel${id}d-header`
    const panelContent = `panel${id}d-content`

    const handleChange = (panel: string) => (event: ChangeEvent<{}>, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    }

    return (
        <Accordion
            square
            expanded={expanded === panelId}
            onChange={handleChange(panelId)}>
            <AccordionSummary
                aria-controls={panelContent}
                id={panelHeader}>
                <strong>{title}</strong>
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    )
}