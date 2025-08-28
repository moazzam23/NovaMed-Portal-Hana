import { createContext, useState, useEffect } from "react";
import { Box, Image, Heading } from "../components/elements";
import PulseLoader from "react-spinners/PulseLoader";

export const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        setLoading(true);
        setTimeout(()=> { setLoading(false) }, 1000);
    }, []);

    return (
        <LoaderContext.Provider value={{ loading }}>
            { loading ? 
                <Box className="mc-spinner">
                    <Image src="images/CO_LOGO-1.png" alt="logo" />
                    <Box className="mc-spinner-group">
                        <Heading>Loading</Heading>
                        <PulseLoader 
                            color="#F07632"
                            loading={loading} 
                            size={8} 
                        /> 
                    </Box>
                </Box>
                : 
                children 
            }
        </LoaderContext.Provider>
    )
}