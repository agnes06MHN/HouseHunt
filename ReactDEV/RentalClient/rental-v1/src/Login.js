import {useRef, useState, useEffect,useContext} from 'react'
import AuthContext from './context/AuthProvider';

import axios from './api/axios';
import SearchBar from './components/SearchBar';
const LOGIN_URL = '/auth';

const Login = () => {
    const {setAuth} = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [succes, setSucces] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    },[])

    useEffect(() => {
        setErrMsg('')
    },[user,pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({user,pwd}),
                {
                    headers: {'Content-Type':'application/json'},
                    withCredentials : true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(responsse));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({user,pws,roles,accessToken});
            setUser('');
            setPwd('');
            setSucces(true);
        }catch (err) {
            if(!err?.resposne){
                setErrMsg('No server response');
            } else if (err.response?.status === 400){
                setErrMsg('Missing username or password');
            } else if(err.response?.status == 401){
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login failed');
            }
            //Debug forcé le login.
            setSucces(true);
            errRef.current.focus();

        }
        
    }

    return(
        <>{
            succes ? (
                <section>
                    <h1>Vous êtes connecté</h1>
                    <br />
                    <SearchBar />
                </section>
            ):(
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Connexion</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='userName'>Login:</label>
                        <input 
                            type="text" 
                            id="username" 
                            ref={userRef} 
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />
                        <label htmlFor='password'>Password:</label>
                        <input 
                            type="password" 
                            id="password" 
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Se connecter</button>
                    </form>
                    <p>
                        <span className="line">
                            <a href='#'>S'incrire</a>
                        </span>
                    </p>
                </section>
            )
        }
        </>
    )
}

export default Login