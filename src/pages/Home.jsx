import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

const Home = () => {
    return ( 
        <div>
            
            <AuthenticatedTemplate>
                Test if you're signed in.
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                You are on landing page and not signed in.
            </UnauthenticatedTemplate>
        </div>
     );
}
 
export default Home;