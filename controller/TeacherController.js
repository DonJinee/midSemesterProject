const Teacher = require('../models/teachers')

const getAllTeachers = async(req, res) => {
    try{
        const teachers = await Teacher.find();
        res.status(200).json(teachers)
    }catch(err) {
        res.status(500).json({message: err})
    }
};

const getOneTeacher = async(req, res) => {
    try{
        const contact = await Teacher.findById(req.params.id);
        res.status(200).json(contact);
    }catch(err){
        res.status(500).json({message: err});
    }
};

const addNewTeachers = async(req, res) => {
    const teacher = new Teacher ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        email: req.body.email,
        phone: req.body.phone,
        birthDate: req.body.birthDate,
        employmentDate: req.body.employmentDate,
        hobbies: req.body.hobbies,
        comment: req.body.comment
    });
        try {
        const savedTeacher = await teacher.save();
        res.status(201).json(savedTeacher);
    }catch(err){
        res.status(500).json(err)
    }
};

const updateTeacherInfo = async (req, res) => {
    try{
        const updatedTeacher = await Teacher.updateOne(
            {_id: req.params.id},
            {$set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                gender: req.body.gender,
                email: req.body.email,
                phone: req.body.phone,
                birthDate: req.body.birthDate,
                employmentDate: req.body.employmentDate,
                hobbies: req.body.hobbies,
                comment: req.body.comment
            }}
        );
        res.status(204).json(updatedTeacher)
    }catch(err) {
        res.status(500).json({message: err} || 'Update Error!!!');
    }
};

const deleteTeacher = async(req, res) => {
    try{
        const deletedTeacher = await Teacher.deleteOne({_id: req.params.id});
        res.status(204).json(deletedTeacher)
    }catch(err){
        res.status(500).json({message: err})
    }
};

module.exports = {getAllTeachers, getOneTeacher, addNewTeachers, updateTeacherInfo, deleteTeacher};