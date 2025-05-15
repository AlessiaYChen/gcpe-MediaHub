
import Layout from '../../components/Layout';
import ContactsTable from './contactsTable';
import { useState, useContext, useEffect } from 'react';
import { AuthenticationContext } from '../../App';

//import {
//    FolderRegular,
//    EditRegular,
//    OpenRegular,
//    DocumentRegular,
//    PeopleRegular,
//    DocumentPdfRegular,
//    VideoRegular,
//} from "@fluentui/react-icons";


const MediaContacts = () => {
    const [contacts, setContacts] = useState([]);
    useContext(AuthenticationContext);

    const fetchContacts = async () => {
        const response = await fetch('mediacontacts');
        const data = await response.json();
        setContacts(data);
    };

    useEffect(() => {   
        fetchContacts();
    }, []);

    return (
        <Layout title={"Media Contacts"}>
            <div>
                <ContactsTable items={contacts} />
            </div>
        </Layout>
    );
}


export default MediaContacts;

