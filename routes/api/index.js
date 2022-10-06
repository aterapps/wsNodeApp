const router = require('express').Router();
const { aterapi, hash, getToken } = require('../../config');


// router.get('/hash/:parametro1/parametro2', (req,res)=>{
//     try{
//         const { data } = aterapi.get(`/${api}/${hash(req.params)}`);
//         res.json(data);
//     }catch(e){
//         console.log(e);
//         res.json([]);
//     }
// })


router.get('/token', async (req,res)=>{
    try{
        const token  = await getToken();
        res.json({token:token});
    }catch(e){
        console.log(e);
        res.json([]);
    }
})

router.get('/hash/:params?',(req, res)=>{
const crypto = require('crypto');

const params = req.params.params
params 
    ? res.json({hash: hash(params)})
    : res.json({hash: hash('')})
})

router.get('/verificarToken/:pregunta', async (req,res)=>{
    console.log('no se')
    try{
        const url = `/verificarToken/${req.params.pregunta}/${hash(req.params)}`
        console.log(url)
        const  data  = await aterapi(url);
        res.json(data);
    }catch(e){
        console.log(e);
        res.json([e]);
    }
})

module.exports = router;