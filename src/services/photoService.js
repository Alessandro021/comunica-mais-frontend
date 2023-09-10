import { api, requestConfig } from "../utils/config";

const publishPhoto = async (data, token) => {
    const config = requestConfig("POST", data, token, true);

    try {
        const res = await fetch(`${api}/photos`, config)
            .then((response) => response.json())
            .catch(err => err);

        if(res.error) {
            return res;
        }

        if(res.error === false) {
            return res.result;
        }

        return {errors: [{error: "Error ao acessar servidor, tente mais tarde."}]};
    } catch (error) {
        console.log(`ERROR: ${error}`);
        return {errors: [{error: "Error ao acessar servidor, tente mais tarde."}]};
    }
};

const getUserPhotos = async (id, token) => {
    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(`${api}/photos/user/${id}`, config)
            .then((response) => response.json())
            .catch(err => err);

        if(res.error) {
            return res;
        }
    
        if(res.error === false) {
            return res.result;
        }
    
        return {errors: [{error: "Error ao acessar servidor, tente mais tarde."}]};
    } catch (error) {
        console.log(`ERROR: ${error}`);
        return {errors: [{error: "Error ao acessar servidor, tente mais tarde."}]};
    }
};

const deletePhoto = async (id, token) => {
    const config = requestConfig("DELETE", null, token);
    
    try {
        const res = await fetch(`${api}/photos/${id}`, config)
            .then((response) => response.json())
            .catch(err => err);

        if(res.error) {
            return res;
        }
    
        if(res.error === false) {
            return res.result;
        }
    
        return {errors: [{error: "Error ao acessar servidor, tente mais tarde."}]};
    } catch (error) {
        console.log(`ERROR: ${error}`);
        return {errors: [{error: "Error ao acessar servidor, tente mais tarde."}]};
    }

};

const updatePhoto = async (data, id, token) => {
    const config = requestConfig("PUT", data, token);

    try {
        const res = await fetch(`${api}/photos/${id}`, config)
            .then(response => response.json())
            .catch(err => err);
        
        if(res.error) {
            return res;
        }
        
        if(res.error === false) {
            return res.result;
        }
        
        return {errors: [{error: "Error ao acessar servidor, tente mais tarde."}]};
        
    } catch (error) {
        console.log(`ERROR: ${error}`);
        return {errors: [{error: "Error ao acessar servidor, tente mais tarde."}]};
    }
};

const getPhoto = async (id, token) => {
    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(`${api}/photos/${id}`, config)
            .then(response => response.json())
            .catch(err => err);
        
        if(res.error) {
            return res;
        }
            
        if(res.error === false) {
            return res.result;
        }
            
        return {errors: [{error: "Error ao acessar servidor, tente mais tarde."}]}; 
    } catch (error) {
        console.log(`ERROR: ${error}`);
        return {errors: [{error: "Error ao acessar servidor, tente mais tarde."}]};
    }
};

const like = async (id, token) => {
    const config = requestConfig("PUT", null, token);

    try {
        const res = await fetch(`${api}/photos/like/${id}`, config)
            .then(response => response.json())
            .catch(err => err);
        if(res.error) {
            return res;
        }
                
        if(res.error === false) {
            return res.result;
        }
                
        return {errors: [{error: "Error ao acessar servidor, tente mais tarde."}]}; 
    } catch (error) {
        console.log(`ERROR: ${error}`);
        return {errors: [{error: "Error ao acessar servidor, tente mais tarde."}]};
    }
};

const comments = async (data, id, token) => {
    const config = requestConfig("POST", data, token);

    try {
        const res = await fetch(`${api}/photos/comment/${id}`, config)
            .then(response => response.json())
            .catch(err => err);

        if(res.error) {
            return res;
        }
                    
        if(res.error === false) {
            return res.result;
        }
                    
        return {errors: [{error: "Error ao acessar servidor, tente mais tarde."}]};
    } catch (error) {
        console.log(`ERROR: ${error}`);
        return {errors: [{error: "Error ao acessar servidor, tente mais tarde."}]};
    }
};

const getPhotos = async(token) => {
    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(`${api}/photos`, config)
            .then(response => response.json())
            .catch(err => err);

        if(res.error) {
            return res;
        }
                    
        if(res.error === false) {
            return res.result;
        }
                    
        return {errors: [{error: "Error ao acessar servidor, tente mais tarde."}]};
    } catch (error) {
        console.log(`ERROR: ${error}`);
        return {errors: [{error: "Error ao acessar servidor, tente mais tarde."}]};
    }
};

const searchPhotos = async (query, token) => {
    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(`${api}/photos/search?q=${query}`, config)
            .then(response => response.json())
            .catch(err => err);

        if(res.error) {
            return res;
        }
                    
        if(res.error === false) {
            return res.result;
        }
                    
        return {errors: [{error: "Error ao acessar servidor, tente mais tarde."}]};
    } catch (error) {
        console.log(`ERROR: ${error}`);
        return {errors: [{error: "Error ao acessar servidor, tente mais tarde."}]};
    }
};

const photoService =  {
    publishPhoto,
    getUserPhotos,
    deletePhoto,
    updatePhoto,
    getPhoto,
    like,
    comments,
    getPhotos,
    searchPhotos
};

export default photoService;