const express = require('express');
const router = express.Router();

//@route    GET api/contacts
//@desc     Get all contacts for this user
//@access   Private
router.get('/', (req, res) => {
    res.send('Get all the contacts for this user');
});

//@route    Post api/contacts
//@desc     Add contact for this user
//@access   Private
router.post('/', (req, res) => {
  res.send('Add contact for this user');
});

//@route    PUT api/contacts/:id
//@desc     Update contact for this user
//@access   Private
router.put('/:id', (req, res) => {
  res.send('Update contact for user');
});

//@route    DELETE api/contacts/:id
//@desc     Register a user
//@access   Public
router.delete('/:id', (req, res) => {
  res.send('Delete a contact for user');
});

module.exports = router;