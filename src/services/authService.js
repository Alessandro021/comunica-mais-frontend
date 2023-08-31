import { api,requestConfig } from "../utils/config";

//CRIAR USUARIO

const register = async (data) => {
    const config = requestConfig("POST", data);

    try {
        const res = await fetch(`${api}/users/register`, config)
            .then((response) => response.json())
            .catch((err) => err);

        if(!res.error){
            localStorage.setItem("user", JSON.stringify(res));
        }

        return res;

    } catch (error) {
        console.log("Error");
    }
};

//LOGOUT
const logout = () => {
    localStorage.removeItem("user");
};

const authService = {
    register,
    logout
};

export default authService;