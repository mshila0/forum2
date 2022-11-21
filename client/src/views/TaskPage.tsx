import React, {FormEvent, useState} from 'react';
import styles from "../components/LoginRegistrationForm/Form.module.css"
import spinner from "./spin.gif"

export type Post = {
    userId: string;
    id: string;
    title: string;
    body: string;
} | undefined;

export type PostInfo = {
    id: string;
    name: string;
    username: string;
    email: string;
} | undefined;

const URL = "https://jsonplaceholder.typicode.com";


function TaskPage() {
    const [id, setId] = useState("");
    const [error, setError] = useState("");
    const [post, setPost] = useState<Post | undefined>();
    const [postInfo, setPostInfo] = useState<PostInfo | undefined>();
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setPost(undefined);
        setPostInfo(undefined);
        setLoading(true);
        try {
            const response = await fetch(`${URL}/posts/${id}`);
            if (response.status !== 200) {
                throw Error(response.statusText);
            }
            const post = await response.json();
            setPost(post);
            const userResponse = await fetch(`${URL}/users/${post?.userId}`);
            if (userResponse.status !== 200) {
                throw Error(userResponse.statusText);
            }
            const user = await userResponse.json();
            setPostInfo(user);
        } catch (e) {
            if (e instanceof Error) {
                setError('Что-то пошло не так')
            }
        } finally {
            setLoading(false);
        }
    };

    return <>
        <h3>Task</h3>
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    ID:
                    <input type="text" value={id} onChange={e => setId(e.target.value)}/>
                    <br/>
                </label>
                <button disabled={isLoading} type="submit">Получить данные!</button>
            </form>
        </div>
        {isLoading && <div><img src={spinner} alt="spinner"/></div>}
        {error && <div className={styles.error}>{error}</div>}
        {post && <div>
            <b>{post?.title}</b><br/>
            {post?.userId}
            {post?.body}
        </div>}
        {postInfo && <div>
            <b>{postInfo?.name}</b><br/>
            {postInfo?.email}
        </div>}
    </>;
}

export default TaskPage;