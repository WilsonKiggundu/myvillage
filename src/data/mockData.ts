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

export const Events = [{
    "title": "Actuary",
    "startDate": "2020-11-20",
    "endDate": "2020-07-08",
    "interval": "Monthly",
    "description": "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.",
    "location": "773 Melrose Pass",
    "videoLink": "https://dagondesign.com/vivamus/in/felis/eu.png?pede=vestibulum&ac=ante&diam=ipsum&cras=primis&pellentesque=in&volutpat=faucibus&dui=orci&maecenas=luctus&tristique=et&est=ultrices&et=posuere&tempus=cubilia&semper=curae&est=nulla&quam=dapibus"
}, {
    "title": "Sales Associate",
    "startDate": "2019-12-10",
    "endDate": "2020-03-25",
    "interval": "Daily",
    "description": "Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
    "location": "841 East Lane",
    "videoLink": "https://hostgator.com/in/eleifend/quam.json?urna=condimentum&pretium=id&nisl=luctus&ut=nec&volutpat=molestie&sapien=sed&arcu=justo&sed=pellentesque&augue=viverra&aliquam=pede&erat=ac&volutpat=diam&in=cras&congue=pellentesque&etiam=volutpat&justo=dui&etiam=maecenas&pretium=tristique&iaculis=est&justo=et&in=tempus&hac=semper&habitasse=est&platea=quam&dictumst=pharetra&etiam=magna&faucibus=ac&cursus=consequat&urna=metus&ut=sapien&tellus=ut&nulla=nunc&ut=vestibulum&erat=ante&id=ipsum&mauris=primis&vulputate=in&elementum=faucibus&nullam=orci&varius=luctus&nulla=et&facilisi=ultrices&cras=posuere&non=cubilia&velit=curae&nec=mauris&nisi=viverra&vulputate=diam&nonummy=vitae&maecenas=quam&tincidunt=suspendisse&lacus=potenti&at=nullam&velit=porttitor&vivamus=lacus&vel=at&nulla=turpis&eget=donec&eros=posuere&elementum=metus&pellentesque=vitae&quisque=ipsum&porta=aliquam&volutpat=non&erat=mauris&quisque=morbi&erat=non&eros=lectus&viverra=aliquam&eget=sit&congue=amet&eget=diam"
}, {
    "title": "Director of Sales",
    "startDate": "2020-11-27",
    "endDate": "2020-10-28",
    "interval": "Annually",
    "description": "<strong>Vestibulum rutrum rutrum neque.</strong> Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia.",
    "location": "77 Anzinger Drive",
    "videoLink": "http://chron.com/praesent.json?tellus=ut&in=rhoncus&sagittis=aliquet&dui=pulvinar&vel=sed&nisl=nisl&duis=nunc&ac=rhoncus&nibh=dui&fusce=vel&lacus=sem&purus=sed&aliquet=sagittis&at=nam&feugiat=congue&non=risus&pretium=semper&quis=porta&lectus=volutpat&suspendisse=quam&potenti=pede&in=lobortis&eleifend=ligula&quam=sit&a=amet&odio=eleifend&in=pede&hac=libero&habitasse=quis&platea=orci&dictumst=nullam&maecenas=molestie&ut=nibh&massa=in&quis=lectus&augue=pellentesque&luctus=at&tincidunt=nulla&nulla=suspendisse&mollis=potenti&molestie=cras&lorem=in&quisque=purus&ut=eu&erat=magna&curabitur=vulputate&gravida=luctus&nisi=cum&at=sociis&nibh=natoque&in=penatibus&hac=et&habitasse=magnis&platea=dis&dictumst=parturient&aliquam=montes&augue=nascetur&quam=ridiculus&sollicitudin=mus&vitae=vivamus&consectetuer=vestibulum&eget=sagittis&rutrum=sapien&at=cum&lorem=sociis&integer=natoque&tincidunt=penatibus&ante=et&vel=magnis&ipsum=dis&praesent=parturient&blandit=montes&lacinia=nascetur&erat=ridiculus&vestibulum=mus&sed=etiam&magna=vel&at=augue&nunc=vestibulum&commodo=rutrum&placerat=rutrum&praesent=neque&blandit=aenean&nam=auctor&nulla=gravida"
}, {
    "title": "Analyst Programmer",
    "startDate": "2020-09-25",
    "endDate": "2020-06-07",
    "interval": "Annually",
    "description": "In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
    "location": "06 Ridge Oak Point",
    "videoLink": "http://china.com.cn/posuere/felis/sed.xml?sit=aliquam&amet=erat&eleifend=volutpat&pede=in&libero=congue&quis=etiam&orci=justo&nullam=etiam&molestie=pretium&nibh=iaculis&in=justo&lectus=in&pellentesque=hac&at=habitasse&nulla=platea&suspendisse=dictumst&potenti=etiam&cras=faucibus&in=cursus&purus=urna&eu=ut&magna=tellus&vulputate=nulla&luctus=ut&cum=erat&sociis=id&natoque=mauris&penatibus=vulputate&et=elementum&magnis=nullam&dis=varius&parturient=nulla&montes=facilisi&nascetur=cras&ridiculus=non&mus=velit&vivamus=nec&vestibulum=nisi&sagittis=vulputate&sapien=nonummy&cum=maecenas&sociis=tincidunt&natoque=lacus&penatibus=at&et=velit&magnis=vivamus&dis=vel&parturient=nulla&montes=eget&nascetur=eros&ridiculus=elementum&mus=pellentesque&etiam=quisque&vel=porta&augue=volutpat&vestibulum=erat&rutrum=quisque&rutrum=erat&neque=eros&aenean=viverra&auctor=eget&gravida=congue&sem=eget&praesent=semper&id=rutrum&massa=nulla&id=nunc&nisl=purus&venenatis=phasellus&lacinia=in&aenean=felis&sit=donec&amet=semper&justo=sapien&morbi=a&ut=libero&odio=nam&cras=dui&mi=proin&pede=leo&malesuada=odio&in=porttitor&imperdiet=id&et=consequat&commodo=in&vulputate=consequat&justo=ut&in=nulla&blandit=sed&ultrices=accumsan&enim=felis&lorem=ut&ipsum=at&dolor=dolor&sit=quis&amet=odio&consectetuer=consequat&adipiscing=varius&elit=integer"
}, {
    "title": "Structural Analysis Engineer",
    "startDate": "2020-06-19",
    "endDate": "2020-04-21",
    "interval": "Weekly",
    "description": "Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
    "location": "951 Saint Paul Park",
    "videoLink": "https://shinystat.com/libero/nullam/sit/amet/turpis.jsp?molestie=erat&sed=id&justo=mauris&pellentesque=vulputate&viverra=elementum"
}, {
    "title": "Professor",
    "startDate": "2020-03-31",
    "endDate": "2020-10-06",
    "interval": "Monthly",
    "description": "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat.",
    "location": "4199 Kingsford Way",
    "videoLink": "https://soup.io/sem.xml?vestibulum=justo&ante=sollicitudin&ipsum=ut&primis=suscipit&in=a&faucibus=feugiat&orci=et&luctus=eros&et=vestibulum&ultrices=ac&posuere=est&cubilia=lacinia&curae=nisi&mauris=venenatis&viverra=tristique&diam=fusce&vitae=congue&quam=diam&suspendisse=id&potenti=ornare&nullam=imperdiet&porttitor=sapien&lacus=urna&at=pretium&turpis=nisl&donec=ut&posuere=volutpat"
}, {
    "title": "Recruiting Manager",
    "startDate": "2020-11-13",
    "endDate": "2020-02-24",
    "interval": "Daily",
    "description": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis.",
    "location": "61124 Old Gate Hill",
    "videoLink": "https://dmoz.org/nisl/venenatis/lacinia/aenean/sit.json?interdum=libero&eu=nullam&tincidunt=sit&in=amet&leo=turpis&maecenas=elementum&pulvinar=ligula&lobortis=vehicula&est=consequat&phasellus=morbi&sit=a&amet=ipsum&erat=integer&nulla=a&tempus=nibh&vivamus=in&in=quis&felis=justo&eu=maecenas&sapien=rhoncus&cursus=aliquam&vestibulum=lacus&proin=morbi"
}, {
    "title": "Operator",
    "startDate": "2020-07-12",
    "endDate": "2019-11-21",
    "interval": "Weekly",
    "description": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus.",
    "location": "9746 Waubesa Trail",
    "videoLink": "https://deliciousdays.com/in/ante.xml?proin=quis&at=augue&turpis=luctus&a=tincidunt&pede=nulla&posuere=mollis&nonummy=molestie&integer=lorem&non=quisque&velit=ut&donec=erat&diam=curabitur&neque=gravida&vestibulum=nisi&eget=at&vulputate=nibh&ut=in&ultrices=hac&vel=habitasse&augue=platea&vestibulum=dictumst&ante=aliquam&ipsum=augue&primis=quam&in=sollicitudin&faucibus=vitae&orci=consectetuer&luctus=eget&et=rutrum&ultrices=at&posuere=lorem&cubilia=integer&curae=tincidunt&donec=ante&pharetra=vel&magna=ipsum&vestibulum=praesent&aliquet=blandit&ultrices=lacinia&erat=erat&tortor=vestibulum&sollicitudin=sed&mi=magna&sit=at&amet=nunc&lobortis=commodo&sapien=placerat&sapien=praesent&non=blandit&mi=nam&integer=nulla&ac=integer&neque=pede&duis=justo"
}, {
    "title": "Accounting Assistant I",
    "startDate": "2020-12-21",
    "endDate": "2020-01-03",
    "interval": "Annually",
    "description": "Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien.",
    "location": "42202 Holmberg Junction",
    "videoLink": "https://pagesperso-orange.fr/molestie/sed/justo/pellentesque.jsp?duis=odio&bibendum=consequat&felis=varius&sed=integer&interdum=ac&venenatis=leo&turpis=pellentesque&enim=ultrices&blandit=mattis&mi=odio&in=donec&porttitor=vitae&pede=nisi&justo=nam&eu=ultrices&massa=libero&donec=non&dapibus=mattis&duis=pulvinar&at=nulla&velit=pede&eu=ullamcorper&est=augue&congue=a&elementum=suscipit&in=nulla&hac=elit&habitasse=ac&platea=nulla&dictumst=sed&morbi=vel&vestibulum=enim&velit=sit&id=amet&pretium=nunc&iaculis=viverra&diam=dapibus&erat=nulla&fermentum=suscipit&justo=ligula&nec=in&condimentum=lacus&neque=curabitur&sapien=at&placerat=ipsum&ante=ac&nulla=tellus&justo=semper&aliquam=interdum&quis=mauris"
}, {
    "title": "Cost Accountant",
    "startDate": "2019-12-08",
    "endDate": "2020-08-06",
    "interval": "Monthly",
    "description": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna.",
    "location": "7417 Bobwhite Trail",
    "videoLink": "http://vinaora.com/felis/ut/at/dolor/quis.json?rhoncus=justo&aliquet=etiam&pulvinar=pretium&sed=iaculis&nisl=justo&nunc=in&rhoncus=hac&dui=habitasse&vel=platea&sem=dictumst&sed=etiam&sagittis=faucibus&nam=cursus&congue=urna&risus=ut&semper=tellus&porta=nulla&volutpat=ut&quam=erat&pede=id&lobortis=mauris&ligula=vulputate&sit=elementum&amet=nullam&eleifend=varius&pede=nulla&libero=facilisi&quis=cras&orci=non&nullam=velit&molestie=nec&nibh=nisi&in=vulputate&lectus=nonummy&pellentesque=maecenas&at=tincidunt&nulla=lacus&suspendisse=at&potenti=velit&cras=vivamus&in=vel&purus=nulla&eu=eget&magna=eros&vulputate=elementum&luctus=pellentesque&cum=quisque&sociis=porta&natoque=volutpat&penatibus=erat&et=quisque&magnis=erat&dis=eros&parturient=viverra&montes=eget&nascetur=congue&ridiculus=eget&mus=semper&vivamus=rutrum&vestibulum=nulla&sagittis=nunc&sapien=purus&cum=phasellus&sociis=in&natoque=felis&penatibus=donec&et=semper&magnis=sapien&dis=a&parturient=libero&montes=nam"
}, {
    "title": "Health Coach IV",
    "startDate": "2020-10-31",
    "endDate": "2020-07-22",
    "interval": "Weekly",
    "description": "Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit.",
    "location": "1 Arrowood Point",
    "videoLink": "https://abc.net.au/consequat/ut/nulla/sed/accumsan/felis.xml?tortor=lectus&risus=pellentesque&dapibus=at&augue=nulla&vel=suspendisse&accumsan=potenti&tellus=cras&nisi=in&eu=purus&orci=eu&mauris=magna&lacinia=vulputate&sapien=luctus&quis=cum&libero=sociis&nullam=natoque&sit=penatibus&amet=et&turpis=magnis&elementum=dis&ligula=parturient&vehicula=montes&consequat=nascetur&morbi=ridiculus&a=mus&ipsum=vivamus&integer=vestibulum&a=sagittis&nibh=sapien&in=cum&quis=sociis&justo=natoque&maecenas=penatibus&rhoncus=et&aliquam=magnis&lacus=dis&morbi=parturient&quis=montes&tortor=nascetur&id=ridiculus"
}, {
    "title": "Director of Sales",
    "startDate": "2020-04-15",
    "endDate": "2020-06-05",
    "interval": "Daily",
    "description": "Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum.",
    "location": "76852 Russell Place",
    "videoLink": "http://deliciousdays.com/aenean/sit/amet/justo.json?lectus=in&in=libero&est=ut&risus=massa&auctor=volutpat&sed=convallis&tristique=morbi&in=odio&tempus=odio&sit=elementum&amet=eu&sem=interdum&fusce=eu&consequat=tincidunt&nulla=in&nisl=leo&nunc=maecenas&nisl=pulvinar&duis=lobortis&bibendum=est&felis=phasellus&sed=sit&interdum=amet&venenatis=erat&turpis=nulla&enim=tempus&blandit=vivamus&mi=in&in=felis&porttitor=eu&pede=sapien&justo=cursus&eu=vestibulum"
}, {
    "title": "Quality Engineer",
    "startDate": "2020-11-10",
    "endDate": "2020-04-01",
    "interval": "Monthly",
    "description": "Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
    "location": "69 Carberry Alley",
    "videoLink": "https://weebly.com/suscipit/ligula/in/lacus/curabitur.png?maecenas=vestibulum&tristique=sed&est=magna&et=at&tempus=nunc&semper=commodo&est=placerat&quam=praesent&pharetra=blandit&magna=nam&ac=nulla&consequat=integer&metus=pede&sapien=justo&ut=lacinia&nunc=eget&vestibulum=tincidunt&ante=eget&ipsum=tempus&primis=vel&in=pede&faucibus=morbi&orci=porttitor&luctus=lorem&et=id&ultrices=ligula&posuere=suspendisse&cubilia=ornare&curae=consequat&mauris=lectus&viverra=in&diam=est&vitae=risus&quam=auctor&suspendisse=sed&potenti=tristique&nullam=in&porttitor=tempus&lacus=sit&at=amet&turpis=sem&donec=fusce&posuere=consequat&metus=nulla&vitae=nisl&ipsum=nunc&aliquam=nisl&non=duis&mauris=bibendum&morbi=felis&non=sed&lectus=interdum&aliquam=venenatis&sit=turpis"
}, {
    "title": "Nurse",
    "startDate": "2020-09-25",
    "endDate": "2020-07-01",
    "interval": "Monthly",
    "description": "Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    "location": "6726 Holmberg Trail",
    "videoLink": "https://drupal.org/eros/elementum/pellentesque.html?pellentesque=nec&volutpat=dui&dui=luctus&maecenas=rutrum&tristique=nulla&est=tellus&et=in"
}, {
    "title": "Structural Engineer",
    "startDate": "2020-07-05",
    "endDate": "2020-09-24",
    "interval": "Monthly",
    "description": "In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
    "location": "9158 Tony Road",
    "videoLink": "https://symantec.com/laoreet/ut/rhoncus/aliquet/pulvinar/sed.html?interdum=tellus&eu=semper&tincidunt=interdum&in=mauris&leo=ullamcorper&maecenas=purus&pulvinar=sit&lobortis=amet&est=nulla&phasellus=quisque&sit=arcu&amet=libero&erat=rutrum&nulla=ac"
}]