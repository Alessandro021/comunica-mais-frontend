import { api,requestConfig } from "../utils/config";

//CRIAR USUARIO

const register = async (data) => {
    const config = requestConfig("POST", data);

    try {
        const res = await fetch(`${api}/users/register`, config)
            .then((response) => response.json())
            .catch((err) => err);

        if(res.error === false){
            localStorage.setItem("user", JSON.stringify(res.result));
        }

        return res;

    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
};

//LOGOUT
const logout = () => {
    localStorage.removeItem("user");
};

const login = async (data) => {
    const config = requestConfig("POST", data);

    try {
        const res = await fetch(`${api}/users/login`, config)
            .then(response => response.json())
            .catch(err => err);
        if(res.error === false){
            localStorage.setItem("user", JSON.stringify(res.result));
        }

        return res;
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
};

const authService = {
    register,
    logout,
    login
};

export default authService;