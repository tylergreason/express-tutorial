// include express, Router, and member data
const express = require('express'); 
const router = express.Router(); 
let members = require('../../objects').members;


// get all members (index)
router.get('/', (req, res) => {
    res.json(members); 
})

// get specific member 
router.get('/:id', (req, res) => {
    // change id to integer so it can be compared to member id 
    let id = parseInt(req.params.id); 
    // set member to the first value returned by filtering for a member with the given id 
    let member = members.filter(mem => mem.id === id)[0]; 
    // check that member exists by seeing if it is not undefined 
    if (member){
        // return that member 
        res.json(member); 
    }else{
        res.status(400).json({msg: `member with id ${id} not found`});
        console.log('no member')
        // set status 400 (not found) and include a message 
    }
})

// create new member 
router.post('/', (req, res) => {
    // find id of last member and make the new id that id plus 1 
    let newId = members[members.length-1].id + 1; 
    let newMember = {
        id: newId, 
        name: req.body.name, 
        email: req.body.email, 
        status: 'active'
    }
    // add new member to array 
    // check that name and email are included 
    if (!newMember.name || !newMember.email){
        res.status(400).json({msg: 'name and email are required'})
    }else{
        members.push(newMember); 
        res.json(members); 
    }
})

// update member 
router.put('/:id', (req, res) => {
    // format id as integer 
    let id = parseInt(req.params.id); 
    // find the member by id 
    let member = members.filter(mem => mem.id === id)[0]; 
    console.log('member is: ')
    console.log(member); 
    if (member){
        // get properites of body 
        let properties = Object.getOwnPropertyNames(req.body); 
        console.log(`properties are ${properties}`); 
        // iterate through properties and if the found member has that property, update it 
        properties.forEach(prop => {
            if (member[prop]){
                console.log(member[prop]); 
                member[prop] = req.body[prop]; 
            }
        })
        res.json(member); 
    }else{
        res.status(400).json({msg: `No member with id ${id} found!`})
    }
})

// delete member 
router.delete('/:id', (req, res) => {
    let id = parseInt(req.params.id);
    // find member with that id 
    let member = members.filter(mem => mem.id === id)[0]; 
    if (member){
        members = members.filter(mem => mem.id !== id); 
        res.json(member);
    }
    
    res.json(`member with id ${id} deleted`)
})

// export router 
module.exports = router; 