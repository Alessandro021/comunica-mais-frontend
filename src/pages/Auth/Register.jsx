import "./Auth.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        };

        // console.log(user);
    };
    return (
        <div id="register">
            <h2>Comunica+</h2>
            <p className="subtitle">Cadastre para ver as fotos dos seus amigos.</p>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />
                <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
                <input type="password" placeholder="Confirmar senha" value={confirmPassword} onChange={e => setconfirmPassword(e.target.value)} />
                <input type="submit" value={"Cadastrar"}/>
            </form>
            <p>Já tem conta? <Link to={"/login"}>Clique aqui.</Link></p>
        </div>
    );
};

export default Register;