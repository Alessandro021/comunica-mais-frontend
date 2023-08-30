import "./Auth.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Register = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div id="register">
            <h2>Comunica+</h2>
            <p className="subtitle">Cadastre para ver as fotos dos seus amigos.</p>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nome" />
                <input type="email" placeholder="E-mail" />
                <input type="password" placeholder="Senha" />
                <input type="password" placeholder="Confirmar senha" />
                <input type="submit" value={"Cadastrar"}/>
            </form>
            <p>Já tem conta? <Link to={"/login"}>Clique aqui.</Link></p>
        </div>
    );
};

export default Register;