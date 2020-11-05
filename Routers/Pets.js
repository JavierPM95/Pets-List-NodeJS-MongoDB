const express = require('express');
const router = express.Router();

//Mongoose Models
const PetsModel = require('../models/petsSchema.js')

router.get('/', async (req, res) => {
    try {
        const petsListDB = await PetsModel.find();
        res.render("pets", {
            petsList: petsListDB
        })
        
    } catch (error) {
        console.log(error)
    }
})


router.get('/addPet', (req, res) => {
    res.render('addPet')
})

router.post('/', async (req, res) => {
    const body = req.body;
    try {
    //    const petsDB = new PetsModel(body);
    //    await petsDB.save();
    
    await PetsModel.create(body);

    res.redirect('/pets')

    } catch (error) {
        console.log(error)
    }
})


router.get('/:id', async (req, res) => {
    
    const id = req.params.id
    
    try {
        const petDB = await PetsModel.findOne({ _id: id })
        res.render('editPet', {
            pet: petDB,
            error: false
        })
    } catch (error) {
        console.log(error)
        res.render('editPet', {
            error: true,
            message: "Pet's ID not found it"
        })
    }
})


router.delete('/:id', async (req, res) => {

    const id = req.params.id

    try {
        const petDB = await PetsModel.findByIdAndDelete({ _id: id },{usefindByIdAndModify: false})
        
        if (petDB) {
            res.json({
                delete: true,
                message: 'Your pet have been deleted'
            })
        } else {
            res.json({
                delete: false,
                message: 'Something goes wrong. Delete failed'
            })
        }

    } catch (error) {
        console.log(error)
    }
})


router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    try {
        
        const PetDB = await PetsModel.findByIdAndUpdate(id, body, {usefindByIdAndModify: false})

        res.json({
            state: true,
            menssage: 'Your Pet have been edited succesfully'
        })
        

    } catch (error) {
        console.log(error)
        res.json({
            state: false,
            menssage: 'Something goes wrong. Edit failed'
        })
    }

})

module.exports = router;