import axios from "../apis/jsonPH";

import { useEffect, useState } from "react";
import useAxiosFunction from "../hooks/useAxiosFunction";

const Posts = () => {
    const [posts, error, loading, axiosFetch] = useAxiosFunction();

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
 

    const getData = () => {
        axiosFetch({
            axiosInstance: axios,
            method: "GET",
            url: "/posts"
        });
    }

    useEffect(()=> {
        getData();
        //eslint-disable-next-line
    },[])


   const handleSubmit = () =>{
        axiosFetch({
            axiosInstance: axios,
            method: "POST",
            url: "/posts",
            requestConfig: {
                data: { 
                    ...posts,
                    userId: 10,
                    id: 100,
                    title: title,
                    body: body
                }
            }
        });
    }
  return (
    <article>
           <h2>Posts</h2>
           <div className="row">

            <label htmlFor="title">Post Title</label> <br/>
            <input
                type="text"
                id="title"
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
            />

            <label htmlFor="body">Post Body</label> <br/>
            <input
                type="text"
                id="body"
                value={body}
                onChange={(e)=> setBody(e.target.value)}
            />

           </div>

           <div className="row">
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={getData}>Refetch</button>
           </div>
            
            {loading && <p>Loading....</p>}

            {!loading && error && <p className="errMsg">{error}</p>}

            {!loading && !error && posts?.length && 
                <ul>
                    {posts.map((post, index) => <li key={index}> {post.id}. {post.title}</li>)}
                </ul>
            }

            {!loading && !error && !posts?.length && posts.data && 
                <ul>
                    <p>{`userId: ${posts.data?.userId}, id: ${posts.data?.id} title: ${posts.data?.title}, body: ${posts.data?.body}`}</p>
                </ul>
            }
            

            {!loading && !error && !posts && <p>No posts to display.</p>}

    </article>
  )
}

export default Posts
