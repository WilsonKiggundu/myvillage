import {AsyncTypeahead, Highlighter, Menu, MenuItem} from "react-bootstrap-typeahead";
import React, {Fragment, useState} from "react";
import {getPeople} from "../modules/profiles/people/redux/peopleEndpoints";
import * as _ from 'lodash'
import grey from "@material-ui/core/colors/grey";
import {getStartups} from "../modules/profiles/startups/redux/startupsEndpoints";
import {Urls} from "../routes/Urls";

const XAsyncTypeahead = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);

    const handleSearch = async (query) => {
        setIsLoading(true);

        // startups
        // people
        // jobs
        // events

        const options = []

        const peopleResponse = await getPeople({name: query});
        const {persons} = peopleResponse.body

        options.push(...persons.map(person => ({
            label: `${person.firstname} ${person.lastname}`,
            id: person.id,
            type: 'People',
            avatar: person.avatar
        })))

        const startupsResponse = await getStartups({name: query});
        const {startups} = startupsResponse.body

        options.push(...startups.map(startup => ({
            label: `${startup.name}`,
            subtitle: startup.category,
            id: startup.id,
            type: 'Businesses',
            avatar: startup.avatar
        })))

        setOptions(options)
        setIsLoading(false)
    };

    // Bypass client-side filtering by returning `true`. Results are already
    // filtered by the search endpoint, so no need to do it again.
    const filterBy = () => true;

    const handleClick = (option) => {
        switch (option.type) {
            case 'Businesses':
                window.location.replace(Urls.profiles.singleStartup(option.id))
            default:
                return
        }
    }

    return (
        <AsyncTypeahead
            filterBy={filterBy}
            id="async-example"
            isLoading={isLoading}
            labelKey="label"

            minLength={3}
            onSearch={handleSearch}
            options={options}
            placeholder="Search anything..."
            renderMenu={(options, menuProps, state) => {
                let index = 0;
                const types = _.groupBy(options, 'type');
                const items = Object.keys(types).sort().map((type) => (
                    <Fragment key={type}>
                        {index !== 0 && <Menu.Divider/>}
                        <Menu.Header>{type.toString()}</Menu.Header>
                        {types[type].map((i) => {
                            const item =
                                <MenuItem onClick={() => handleClick(i)} key={index} option={i} position={index}>
                                    <Highlighter search={"tate.text"}>
                                        {i.label}
                                    </Highlighter>
                                    <div style={{color: grey[400]}}>
                                        <small>
                                            {i.subtitle}
                                        </small>
                                    </div>
                                </MenuItem>;

                            index += 1;
                            return item;
                        })}
                    </Fragment>
                ))

                return <Menu {...menuProps}>{items}</Menu>
            }}
        />
    )
        ;
};

export default XAsyncTypeahead;