const router = require('express').Router();
const api = require('./api');
const path = require('path');

router.use('/api',api);

router.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname,'../app/dist/index.html'))
})

module.exports = router;

