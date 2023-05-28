const Teacher = require('../models/teachers');
const errorHandler = require('http-errors');
const mongoose = require('mongoose');
const authSchema = require('../models/Validation');

const getAllTeachers = async(req, res, next) => {
    try{
        const teachers = await Teacher.find();
        res.status(200).json(teachers)
    }catch(err) {
        res.status(500).json({message: err})
    }
};

const getOneTeacher = async(req, res, next) => {
    try{
        const contact = await Teacher.findById(req.params.id);
        if(!contact){
            throw errorHandler(404, "Teacher does not exist");
        }
        res.status(200).json(contact);
    }catch(err){
        if(err instanceof mongoose.CastError){
            next(errorHandler(400, "Invalid teacher id"));
            return;
        }
        next(err);
    }
};

const addNewTeachers = async(req, res, next) => {
    
        try {
            const teacherInfo =  await authSchema.validateAsync({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                gender: req.body.gender,
                email: req.body.email,
                phone: req.body.phone,
                birthDate: req.body.birthDate,
                employmentDate: req.body.employmentDate,
                hobbies: req.body.hobbies,
                comment: req.body.comment
            }, {abortEarly:false});
            const teacher = new Teacher(teacherInfo)
            const savedTeacher = await teacher.save();
            res.status(201).json(savedTeacher);
    }catch(err){
        console.log(err);
        if(err.name === 'ValidationError'){
            next(errorHandler(422, err.message));
            return;
        }
        next(err);
    }
};

const updateTeacherInfo = async (req, res, next) => {
    try{
        const updatedTeacher = await Teacher.findByIdAndUpdate(
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
        if (!updatedTeacher) {
            throw errorHandler(404, "Teacher does not exist");
        }
        res.status(204).json(updatedTeacher)
    }catch(err) {
        console.log(err.mesage);
        if (err instanceof mongoose.CastError) {
            return next(errorHandler(400, 'Invalid teacher ID'))
        }

        next(err)
    }
};

const deleteTeacher = async(req, res, next) => {
    try{
        const deletedTeacher = await Teacher.findByIdAndDelete({_id: req.params.id});
        if(!deletedTeacher){
            throw errorHandler(404, "Teacher does not exist");
        }
        console.log(deletedTeacher);
        res.send(deletedTeacher);
    }catch(err){
        if(err instanceof mongoose.CastError){
            next(errorHandler(400, "Invalid teacher id"));
            return;
        }
        next(err);
    }
};

module.exports = {getAllTeachers, getOneTeacher, addNewTeachers, updateTeacherInfo, deleteTeacher};