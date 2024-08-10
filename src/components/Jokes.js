import useAxios from "../hooks/useAxios";
import axios from "../apis/Dadjokes";

const Jokes = () => {
    const [response, error, loading, refetch] = useAxios({
        axiosInstance: axios,
        method: 'GET',
        url: '/', 
        requestConfig: {
            headers: {
                'Content-Language': 'en-US',
            },
        }
    });

    return (
        <article>
            <h2>Random Dad Jokes</h2>
            
            {loading && <p>Loading....</p>}

            {!loading && error && <p className="errMsg">{error}</p>}

            {!loading && !error && response && <p>{response.joke}</p>}

            {!loading && !error && !response && <p>No Dad joke to display.</p>}

            <button onClick={refetch}>New Joke</button>
        </article>
    );
};

export default Jokes;
