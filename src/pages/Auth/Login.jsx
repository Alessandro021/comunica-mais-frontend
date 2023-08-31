import "./Auth.css";
import { Link } from "react-router-dom";
import Message from "../../components/Message/Message";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        
    };
    return (
        <div id="login">
            <h2>Comunica+</h2>
            <p className="subtitle">Faça o login para ver o que há de novo.</p>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
                <input type="submit" value="Entrar"  />
            </form>
            <p>Não tem uma conta? <Link to={"/register"}>Clique aqui.</Link></p>
        </div>
    );
};

export default Login;