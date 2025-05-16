import { useContext, useState } from 'react';
import { AuthenticationContext } from '../../App';
import { logout } from '../../services/Keycloak';
import moment from 'moment';
import Layout from '../../components/Layout';


const fetchRestictedContent = async (token: string, setMessage: any) => {
    // Defaulting to 8080 for demo purposes
    const serverURI = import.meta.env.VITE_SERVER_URI ?? 'https://localhost:5173'
    setMessage('Request in flight...')
    const response = await fetch('mediacontacts');
    setMessage(await response.json());
     
}


function Home() {
    const keycloak = useContext(AuthenticationContext);
    const [message, setMessage] = useState(null);

    const formatDate = (unixTime) => {
        return moment(unixTime * 1000).format('dddd, MMMM Do, YYYY h:mm A');
    };

    return (
        <>
            {keycloak.authenticated && (
            <Layout title={"Home Page"}>
                    <div>
                        <h2>Token Details</h2>
                        <p>{`Id token expires at ` + formatDate(keycloak.idTokenParsed.exp)}</p>
                        <p>{`Access token expires at ` + formatDate(keycloak.tokenParsed.exp)}</p>
                        <p>{`Refresh token expires at ` + formatDate(keycloak.refreshTokenParsed.exp)}</p>
                        <button onClick={() => logout()}>logout</button>
                    </div>

                    <div>
                        <h2>Test Rest API</h2>
                        <p>In order to test sending a token to a backing rest api, you need to also be running one of the <a href="https://github.com/bcgov/keycloak-example-apps/tree/dev/examples/oidc/public/rest-api" target="_blank">rest API examples</a>.</p>
                        <button onClick={() => fetchRestictedContent(keycloak.token, setMessage)}>Fetch Restricted Content</button>
                    </div>

                    {message && (
                        <>
                            <p>{message}</p>
                        </>
                    )}
               
        </Layout >
            )}
        </>
    );
    
}

export default Home;