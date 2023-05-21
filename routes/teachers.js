const router = require('express').Router();

const teachersController = require('../controller/TeacherController');


router.get('/teachers', teachersController.getAllTeachers);

router.get('/teachers/:id', teachersController.getOneTeacher);
    
router.post('/teachers', teachersController.addNewTeachers);

router.put('/teachers/:id', teachersController.updateTeacherInfo);

router.delete('/teachers/:id', teachersController.deleteTeacher);

module.exports = router;