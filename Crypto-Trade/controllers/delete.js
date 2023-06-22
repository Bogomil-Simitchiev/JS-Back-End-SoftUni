module.exports = async (req, res) => {
    const cryptoId = req.params.id;
    const ownerId = req.session.user.id;

    try {
        if (await req.storage.deleteOffer(cryptoId, ownerId)) {
            res.redirect('/catalog');
        } else {
            res.redirect('/login');
        }

    } catch (error) {
        console.log(error);
        res.redirect('/404');
    }
}