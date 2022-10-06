const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const axios = require('axios');


    const config = {
        client_id: '633c1bf4d4708efdc07e4e83',
        cert_name: '192.168.3.190',
        passphrase: ''
    }

    const key = fs.readFileSync(path.join(__dirname, 'certs',`${config.cert_name}.key`));
    const cert = fs.readFileSync(path.join(__dirname, 'certs', `${config.cert_name}.crt`));
    const pfx = fs.readFileSync(path.join(__dirname, 'certs',`${config.cert_name}.pfx`));
    // const HostKey = fs.readFileSync(path.join(__dirname, 'host.key'));
    // const HostCert = fs.readFileSync(path.join(__dirname, 'host.crt'));
    
    const agent = new https.Agent({
        pfx: pfx,
        passphrase: config.passphrase,
        rejectUnauthorized: false
    })


    const getToken = async () => {
        try{
            const  { data }  = await axios.get('https://api.ater.gob.ar/autenticar',{
                httpsAgent: agent
            }) 
            return data.token;
        }catch(e){
            console.log(e);
        }
    }
    const aterapi = async (url) => {
        const finalUrl = `https://api.ater.gob.ar${url}`
        const token = await getToken();
        console.log(finalUrl, token)
        try{
            const  { data }  = await axios.get(finalUrl,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        "Authorization": token
                    }
                },
                {
                    httpsAgent: agent
                }
            ) 
            return data
        }catch(e){
            console.log(e);
        }
    }



    const hash = (params) =>{
        return crypto.createHash('sha512').update(config.client_id + Object.values(params).join('')).digest('base64').slice(0,10);
    }

module.exports = {
    hash,
    getToken,
    agent,
    aterapi,
    key,
    cert,
    pfx, 
    config
}

//openssl genrsa 2048 > host.key
//openssl req -new -x509 -nodes -sha256 -days 365 -key host.key -out host.cert