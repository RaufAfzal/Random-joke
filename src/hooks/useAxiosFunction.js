import { useState, useEffect } from "react";

const useAxiosFunction = () => {
    

    const [response, setResponse] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [controller, setController] = useState(0);

    const axiosFetch = async (configObj) => {
        const {
            axiosInstance,
            method,
            url,
            requestConfig ={}
        } = configObj;
        try {
            setLoading(true)
            const ctrl = new AbortController();
            setController(ctrl)
            const res = await axiosInstance[method.toLowerCase()](url, {
                ...requestConfig,
                signal: ctrl.signal
            });
            
            setResponse(res.data);
        } catch (err) {

            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
       
        return () => controller && controller.abort();
        
    
    }, [controller]);

    return [response, error, loading, axiosFetch];
}

export default useAxiosFunction