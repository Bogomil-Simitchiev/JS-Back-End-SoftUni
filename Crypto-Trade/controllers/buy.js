module.exports = async (req, res) => {
    const cryptoId = req.params.id;
    const ownerId = req.session.user.id;

    try {
        if (await req.storage.buyCrypto(cryptoId, ownerId)) {
            res.redirect(`/details/${cryptoId}`);
        } else {
            res.redirect('/login');
        }

    } catch (error) {
        console.log(error);
        res.redirect('/details' + cryptoId);
    }
}