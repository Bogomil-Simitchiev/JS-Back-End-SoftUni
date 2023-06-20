module.exports = async (req, res) => {
    const offers = await req.storage.getAllCryptos();
    res.render('catalog', { title: 'Cryptos page', offers });
}