const { Schema, model } = require('mongoose');

const ElevMedie2 = new Schema({
    IDNP: { type: String, unique: true, required: true, default: '' },
    Name: { type: String, required: true, default: '' },
    Surname: { type: String, required: true, default: '' },
    Class: {type: Number, required: true},
    Romana: {type: String, required: false},
    Mate: {type: String, required: false},
    Info: {type: String, required: false},
    Istoria: {type: String, required: false},
    Geografia: {type: String, required: false},
    Chimia: {type: String, required: false},
    Fizica: {type: String, required: false},
    Stiinte: {type: String, required: false},
    Optional: {type: String, required: false},
    Engleza: {type: String, required: false},
    Biologia: {type: String, required: false},
    Rusa: {type: String, required: false},
    Medie: {type: String, required: false}
});

module.exports = model('ElevMedie2', ElevMedie2);
