module.exports = {
    async home(req, res){
        const cars = await req.storage.getAllCars(req.query);
       res.render('index', { cars , query:req.query});
    }
}