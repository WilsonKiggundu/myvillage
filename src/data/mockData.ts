import {IPerson} from "../modules/profiles/people/IPerson";
import {IOption} from "../components/inputs/inputHelpers";
import {IEducation} from "../interfaces/IEducation";

export const Startups = [
    {
        "id": "9ba0fb47-9b47-4457-99c3-4950092f3c90",
        "name": "The Innovation Village Kampala",
        "details": "The Innovation Village is a destination entrepreneurs call home. We purpose to deliberately grow innovation by putting in place a platform that challenges assumption, ignites thought and questions status quo. As a launchpad for innovators, we bring together partners, startups, investors and researchers to act as one force for good.",
        "interests": ["Funding"],
        "logo": "https://innovationvillage.co.ug/wp-content/uploads/2020/07/new-logo-white-02-1.png",
        "category": "Business"
    },
    {
        "id": "02fe081a-0239-4100-a92d-2a7b8fd04401",
        "name": "Kanzu Code",
        details: "",
        "interests": ["Marketing"],
        "logo": "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        "category": "Business"
    },
    {
        "id": "318c64d2-b80b-42e7-91d3-f7a7c7cbe813",
        "name": "Let's Work",
        details: "",
        "interests": ["Funding"],
        "logo": "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        "category": "Media"
    },
    {
        "id": "5998ebd9-b528-4ccc-88a5-b8cf7a87abd1",
        "name": "Skiptube",
        details: "",
        "logo": "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        "interests": ["Meetups", "Technology", "Funding", "Talent"],
        "category": "Manufacturing"
    }
]

export const Interests = [
    {"id": "5ed21bc3-7c5b-4a42-96c0-2431ef39e830", "name": "in consequat"},
    {"id": "ed77495c-9e60-4e2d-878f-44f62ac86d74", "name": "pede"},
    {"id": "d218a5d1-2513-402b-b0e3-fa25e5859c47", "name": "in"},
    {"id": "c4c188cd-0885-40d6-85c1-82f73d805314", "name": "quisque"},
    {"id": "38db9ab4-9455-4da6-a2e7-69a12bdc7062", "name": "platea"},
    {"id": "aae83d88-f0e4-4d2b-92a7-03e662d5f9fa", "name": "lacus"},
    {"id": "d8f357f0-91f2-497d-9003-faab79c5479a", "name": "donec odio"},
    {"id": "4f586c9e-a7e8-4d73-b04b-937e0f7805aa", "name": "dapibus"},
] as IOption[]

export const Qualifications = [{
    grade: "First class honors",
    startYear: "2007",
    endYear: "2011",
    fieldOfStudy: "Engineering",
    degree: "BSc. Electrical Engineering",
    activities: "Soccer, scripture union",
    school: "Makerere University Kampala",
    description: "Everybody is a genius but if you judge a fish by it's ability to climb a tree, it will spend the rest of it's life wondering how stupid it is."
}] as IEducation[]

export const PersonProfiles = [
    {
        id: "8100c725-34d3-4d0c-85ff-80c1754ccb47",
        firstName: "Moishe",
        lastName: "Canham",
        middleName: "Kiggundu",
        bio: "",
        categories: ['investor', 'student'],
        gender: 'male',
        dateOfBirth: '07.02.2000'
    }, {
        id: "b44aaf9e-9a4d-4048-9afa-7b96f7e0a67d",
        firstName: "Lillian",
        lastName: "Musoke",
        middleName: "Nassange",
        bio: "",
        categories: ['student'],
        gender: 'female',
        dateOfBirth: '07.09.2010'
    }, {
        id: "a58d651a-5d9e-4dee-a7e4-bf20e56e1f11",
        firstName: "Eliana",
        lastName: "Kwagala",
        middleName: "Aretha",
        bio: "",
        categories: ['student'],
        gender: 'female',
        dateOfBirth: '07.09.2010'
    }
] as IPerson[]

export const Awards = [
    {
        "id": "a58d651a-5d9e-4dee-a7e4-bf20e56e1f11",
        "date": "4/18/2020",
        "award": "Top 100 SMEs of 2020",
        "awardedBy": "Private Sector Foundation Uganda",
        "category": "dui luctus",
        "details": "Phasellus sit amet erat. a tempus. Vivamus in felis eu sapien cursus vestibulum.",
        "location": "China"
    }, {
        "id": "90a4e738-eb87-4790-9280-1157e9e0868d",
        "date": "8/12/2020",
        "awardedBy": "InnoZ",
        "category": "aliquam",
        "details": "Maecenas pulvinar lobortis est. Phasellus sit amet erat.",
        "location": "Libya"
    }, {
        "id": "99b1b1bb-e31d-4d16-bfc2-95ba47716830",
        "date": "10/31/2019",
        "awardedBy": "Twitterlist",
        "category": "nonummy maecenas",
        "details": "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
        "location": "Philippines"
    }, {
        "id": "26daadd8-fdae-433c-a954-d47e397b57b2",
        "date": "5/27/2020",
        "awardedBy": "Camimbo",
        "category": "tellus",
        "details": "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. a justo.",
        "location": "Brazil"
    }
]

export const Posts = [{
    "id": "0399ade7-c8ce-4d50-8884-c88b12d83ba0",
    "details": "Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst.",
    "date": "9/29/2020"
}]

export const Comments = [{
    "id": "b871f217-3c68-4421-9b20-d3e6273f1845",
    "author": "Corette Belden",
    "date": "9/24/2019",
    "details": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.",
    "avatar": "https://cdn.vuetifyjs.com/images/lists/1.jpg"
}, {
    "id": "52f950fe-449b-4541-a8e6-9173505748dc",
    "author": "Curtis Self",
    "date": "7/29/2020",
    "details": "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat.",
    "avatar": "https://cdn.vuetifyjs.com/images/lists/2.jpg"
}]