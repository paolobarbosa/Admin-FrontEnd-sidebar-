import { useState, useCallback, useEffect } from 'react';
import { InteractionType, EventType } from '@azure/msal-browser';
import { useMsal } from "@azure/msal-react";
import axios from "axios";

const useFetchWithMsal = (msalRequest, apiEndpoint) => {
    const { instance, accounts } = useMsal();
    const [headerData, setHeaderData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {

        const activeAccount = accounts[0];
        if(!activeAccount) return;
        
    
        instance.acquireTokenSilent({
            ...msalRequest,
            account: activeAccount,
        }).then((response) => {
                // You now have the access token
                const bearer = `Bearer ${response.accessToken}`;
                console.log("This is the bearer token: ", bearer);

                axios.get(apiEndpoint, {
                    headers: {
                        "Authorization": bearer,
                    }
                })
                .then((response) => {
                    setHeaderData(response.data);
                })
                .catch((error) => {
                    setError(error);
                });
            })
            .catch((error) => {
                setError(error);
            });
    
    }, [instance, msalRequest, apiEndpoint]);

    console.log(headerData);

    return { headerData, error };
};

export default useFetchWithMsal;
