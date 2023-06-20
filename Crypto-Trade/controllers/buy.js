module.exports = (req, res) => {
    const id = req.params.id;
    console.log('bought crypto!' + id);
    res.render('details', { title: 'Details' });
}