import axios from "axios";


export const token = async () => {
    try{
        const { data } = await axios.get("https://localhost:5000/api/token");
        console.log(data)
        return data;
    }catch(e){
        console.log(e);
    }
}

export const hash = async (params) => {
    try{
        const { data } = await axios.get(`https://localhost:5000/api/hash/${params}`);

        return data;
    }catch(e){
        console.log(e);
    }
}


export const api = axios.create({
    baseURL: "https://api.ater.gob.ar/",
    
})

export const fetchApi = async (params, token, hash) => {
    
    const url = `/verificarToken/${ params.length > 1?params.join('/') : params }/${ hash }`
    console.log({params, token:token.slice(-30), hash},url)
    try{
        const { data } = await api.get( url,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": token    
            }
        });
        return data       
    }catch(e){
        return e
    }
}