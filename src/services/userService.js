import { api,requestConfig } from "../utils/config";

const profile = async (data, token) => {
    const config = requestConfig("GET", data, token);
    try {
        const res = await fetch(`${api}/users/profile`, config)
            .then((response) => response.json())
            .catch(error => error);

        if(res.result){
            return res.result;
        } else {
            return {errors: [{error: "Error ao acessar servidor, tente mais tarde."}]};
        }
    } catch (error) {
        console.log(`ERROR: ${error}`);
        return {errors: ["Error ao acessar servidor, tente mais tarde."]};
    }
};

const updateProfile = async (data, token) => {
    const config = requestConfig("PUT", data, token, true);

    try {
        const res = await fetch(`${api}/users`, config)
            .then((response) => response.json())
            .catch(error => error);
        
        if(res.error){
            return res;
        }
        if(res.error === false){
            return res.result;
        }

        return {errors: [{error: "Error ao acessar servidor, tente mais tarde."}]};
        
    } catch (error) {
        console.log(`ERROR: ${error}`);
        return {errors: [{error: "Error ao acessar servidor, tente mais tarde."}]};
    }
};

const userService = {
    profile,
    updateProfile
};

export default userService;