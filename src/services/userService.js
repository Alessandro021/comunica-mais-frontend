import { api,requestConfig } from "../utils/config";

const profile = async (data, token) => {
    const config = requestConfig("GET", data, token);
    try {
        const res = await fetch(`${api}/users/profile`, config)
            .then((response) => response.json())
            .catch(error => error);

        return res.result;
    } catch (error) {
        console.log(`ERROR: ${error}`);
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
        } else {
            return res.result;
        }
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
};

const userService = {
    profile,
    updateProfile
};

export default userService;