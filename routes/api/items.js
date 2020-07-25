const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

// Item Model
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    get all the items

router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then((items) => res.json(items))
})


// @route   POST api/items
// @desc    create a item

router.post('/', (req, res) => {

    let name = req.query.name;
    let id = mongoose.Types.ObjectId();
    const newItem = new Item({
        name,
        _id: id,

    });

    newItem.save().then(item => res.json(item)).catch(err => console.log(err))

})

// @route   DELETE api/items
// @desc    delete a item

router.delete('/:id', (req, res) => {

    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => {
            res.status(404).json({ error: err });
        })
})



module.exports = router;