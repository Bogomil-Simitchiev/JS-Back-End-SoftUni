module.exports = {
   async details(req, res) {
      const id = req.params.id;
      const car = await req.storage.getCarById(id);

      if (req.session.user && req.session.user.id == car.owner) {
         car.isOwner = true;
      }

      if (car) {
         res.render('details', { car });
      } else {
         res.redirect('/404');
      }
   }
}