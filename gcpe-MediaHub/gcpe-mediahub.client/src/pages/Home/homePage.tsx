import { useContext, useState } from 'react';
import { AuthenticationContext } from '../../App';
import { logout } from '../../services/Keycloak';
import moment from 'moment';
import Layout from '../../components/Layout';


const fetchRestictedContent = async (_: string, setMessage: (message: any) => void) => {
    setMessage('Request in flight...')
    const response = await fetch('mediacontacts');
    setMessage(await response.json());
}


function Home() {
    const keycloak = useContext(AuthenticationContext) as any;
    const [message, setMessage] = useState(null);

    const formatDate = (unixTime: number) => {
        return moment(unixTime * 1000).format('dddd, MMMM Do, YYYY h:mm A');
    };

    return (
        <>
            {typeof keycloak !== 'string' && 'authenticated' in keycloak && keycloak.authenticated && (
            <Layout title={"Home Page"} selectedNavItem="1">
                    <div>
                        <h2>Token Details</h2>
                        {'idTokenParsed' in keycloak && keycloak.idTokenParsed && <p>{`Id token expires at ` + formatDate(keycloak.idTokenParsed.exp)}</p>}
                        {'tokenParsed' in keycloak && keycloak.tokenParsed && <p>{`Access token expires at ` + formatDate(keycloak.tokenParsed.exp)}</p>}
                        {'refreshTokenParsed' in keycloak && keycloak.refreshTokenParsed && <p>{`Refresh token expires at ` + formatDate(keycloak.refreshTokenParsed.exp)}</p>}
                        <button onClick={() => logout()}>logout</button>
                    </div>

                    <div>
                        <h2>Test Rest API</h2>
                        <p>In order to test sending a token to a backing rest api, you need to also be running one of the <a href="https://github.com/bcgov/keycloak-example-apps/tree/dev/examples/oidc/public/rest-api" target="_blank">rest API examples</a>.</p>
                        {'token' in keycloak && keycloak.token && <button onClick={() => fetchRestictedContent(keycloak.token, setMessage)}>Fetch Restricted Content</button>}
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
