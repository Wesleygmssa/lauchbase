const Teacher = require('../models/Teacher');
const { age, graduation, date } = require('../../lib/utils');

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
      callback(teachers) {
        const pagination = {
          total: Math.ceil(teachers[0].total / limit),
          page
        };

        res.render("teachers/index", { teachers, pagination, filter });
      }
    }

    Teacher.paginate(params);
  },

  create(req, res) {
    res.render("teachers/create");
  },

  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") return res.send('Please, fill all fields!');
    }

    Teacher.create(req.body, (teacher) => {
      res.redirect(`/teachers/${teacher.id}`);
    });
  },

  show(req, res) {
    Teacher.find(req.params.id, (teacher) => {
      if (!teacher) res.send("Teacher not found!");

      teacher.age = age(teacher.birth_date);
      teacher.educationLevel = graduation(teacher.education_level);
      teacher.created_at = date(teacher.created_at).format;

      res.render("teachers/show", { teacher });
    });
  },
  
  edit(req, res) {
    Teacher.find(req.params.id, (teacher) => {
      if (!teacher) res.send("Teacher not found!");

      teacher.birth = date(teacher.birth_date).iso;

      res.render("teachers/edit", { teacher });
    });
  },
  
  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") return res.send('Please, fill all fields!');
    }

    Teacher.update(req.body, () => {
      res.redirect(`/teachers/${req.body.id}`);
    });
  },
  
  delete(req, res) {
    Teacher.delete(req.body.id, () => {
      res.redirect(`/teachers`);
    });
  }
}