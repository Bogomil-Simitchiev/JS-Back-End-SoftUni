module.exports = {
    async get(req,res){
        const id = req.params.id;
        const car = await req.storage.getCarById(id);
     if (car) {
        res.render('edit', { car } );   
     }else{
        res.redirect('/404');
     }
    },
    async post(req,res){
        const id = req.params.id;
        const info = req.body;

        if (info.name != '' && info.description != '' && info.imageUrl != '' && info.price != '') {
            const car = {
                name:info.name,
                description:info.description,
                imageUrl:info.imageUrl,
                price: Number(info.price),
                id: id
            }
    
            await req.storage.editCar(id, car);
            res.redirect('/');
        }else{
            res.redirect('/edit');
        }
    }
}