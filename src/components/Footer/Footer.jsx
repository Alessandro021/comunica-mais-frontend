import "./Footer.css";

const Footer = () => {
    const ano = new Date().getUTCFullYear();
    return (
        <footer id="footer">
            <p>Comunica+ &copy; {ano}</p>
        </footer>
    );
};

export default Footer;