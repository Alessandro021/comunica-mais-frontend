import "./Auth.css";
import { Link } from "react-router-dom";
import Message from "../../components/Message/Message";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { login, reset } from "../../slices/authSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const {loading, error} = useSelector(state => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            email: email,
            password: password
        };
        dispatch(login(user));
    };

    useEffect(() => {
        dispatch(reset());
    },[dispatch]);
    return (
        <div id="login">
            <h2>Comunica+</h2>
            <p className="subtitle">Faça o login para ver o que há de novo.</p>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
                {!loading && <input type="submit" value={"Entrar"}/>}
                {loading && <input type="submit" value={"Aguarde..."} disabled/>}
                {error && Object.values(error).map(err => <Message key={err} msg={err} type="error"/>)}
            </form>
            <p>Não tem uma conta? <Link to={"/register"}>Clique aqui.</Link></p>
        </div>
    );
};

export default Login;