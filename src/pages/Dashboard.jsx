import axios from "axios";
import { useEffect, useState } from "react";

import { 
    MsalAuthenticationTemplate,
    useMsal,
    useIsAuthenticated,
} from "@azure/msal-react";

import { InteractionType } from '@azure/msal-browser';
import { loginRequest, protectedApi } from "../authConfig";
import useFetchWithMsal from "../hooks/useFetchWithMsal";
import useFetch from "../hooks/useFetch";
import { Table } from "react-bootstrap";

const Dashboard = () => {

    const { error, execute, } = useFetch({
        scopes: protectedApi.api.scopes.read,
    });

    const [userRoles, setUserRoles] = useState([]);




    let hasCache = false

    if (window.localStorage.getItem('dashboardData') && window.localStorage.getItem('dashboardData') !== 'undefined') {
        hasCache = true;

    }

    const [data, setData] = useState(hasCache ? JSON.parse(window.localStorage.getItem('dashboardData')) : null);

    console.log(data);

    //When user does not have a role, userRoles is undefined and throws an error, added ternary operation so set isAdmin to false in case userRoles is undefined
    const isAdmin = !userRoles ? false : userRoles.includes("Admin");
    
    const { instance } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const authRequest = {
        ...loginRequest,
    };

    console.log(isAdmin);

    useEffect(() => {
      
        const fetchUserRole = async () => {
            try {
                const userAccount = await instance.getActiveAccount();
                console.log(userAccount);
                console.log(userAccount.idTokenClaims.roles);
                if (userAccount) {
                    setUserRoles(userAccount.idTokenClaims.roles);
                }
            } catch (error) {
                console.error("Error fetching user info");
            }
        }

        if (isAuthenticated) {
            fetchUserRole();
        }

        console.log('Loggin from use effect !date')
        console.log('data:', data)
        console.log('!data', !data);

        if (!data) {
            execute("GET", protectedApi.api.endpoint)
            .then((res) => {

                console.log('going into execute get')
                console.log(res);
                setData(res);

                window.localStorage.setItem("dashboardData", JSON.stringify(res));
            });
        } else {

            setData(JSON.parse(window.localStorage.getItem('dashboardData')));

        }

        console.log(data);
        

    }, [instance, isAuthenticated, execute]);


    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return ( 
        <>
            <MsalAuthenticationTemplate
                interactionType={InteractionType.Redirect} 
                authenticationRequest={authRequest}
            >
                { isAdmin ? (
                    <>
                        <h2>
                            This is the authorized part of the dashboard. Only user with Admin role can see this.
                        </h2>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID No.</th>
                                    <th>Department Name</th>
                                    <th>Department Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data &&
                                    data.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.departmentName}</td>
                                            <td>{item.departmentDescription}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </>
                    
                    
                ) : (
                    <h3>
                        This is the dashboard and you can see this text if you are at least authenticated.
                    </h3>
                )}
            </MsalAuthenticationTemplate>

        </>
        
     );
}
 
export default Dashboard;