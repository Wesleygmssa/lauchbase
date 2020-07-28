const Student = require('../models/Student');
const { age, grade, date } = require('../../lib/utils');

module.exports = {
  index(req, res) {
    let { filter, page, limit } = req.query;

    page = page || 1;
    limit = limit || 2;
    let offset = limit * (page - 1);

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(students) {
        const pagination = {
          total: Math.ceil(students[0].total / limit),
          page
        };

        res.render("students/index", { students, pagination, filter });
      }
    }

    Student.paginate(params);
  },

  create(req, res) {
    Student.teachersSelectOptions((options) => {
      res.render("students/create", { teacherOptions: options });
    });
  },

  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") res.send('Please, fill all fields!');
    }

    Student.create(req.body, (student) => {
      res.redirect(`/students/${student.id}`);
    });
  },

  show(req, res) {
    Student.find(req.params.id, (student) => {
      if (!student) res.send("Student not found!");

      student.age = age(student.birth);
      student.educationLevel = grade(student.year);
      student.created_at = date(student.created_at).format;

      res.render("students/show", { student });
    });
  },
  
  edit(req, res) {
    Student.find(req.params.id, (student) => {
      if (!student) res.send("Student not found!");

      student.birth = date(student.birth).iso;

      Student.teachersSelectOptions((options) => {
        res.render("students/edit", { student, teacherOptions: options });
      });
    });
  },
  
  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") return res.send('Please, fill all fields!');
    }

    Student.update(req.body, () => {
      res.redirect(`/students/${req.body.id}`);
    });
  },
  
  delete(req, res) {
    Student.delete(req.body.id, () => {
      res.redirect(`/students`);
    });
  }
}