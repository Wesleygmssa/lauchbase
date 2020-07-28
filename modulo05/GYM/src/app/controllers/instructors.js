const Instructor = require('../models/Instructor');
const { age, date } = require('../../lib/utils');

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
      callback(instructors) {
        const pagination = {
          total: Math.ceil(instructors[0].total / limit),
          page
        };

        res.render("instructors/index", { instructors, pagination, filter });
      }
    }

    Instructor.paginate(params);
  },

  create(req, res) {
    res.render("instructors/create");
  },
  
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") return res.send('Please, fill all fields!');
    }

    Instructor.create(req.body, (instructor) => {
      res.redirect(`/instructors/${instructor.id}`);
    });
  },
  
  show(req, res) {
    Instructor.find(req.params.id, (instructor) => {
      if (!instructor) res.send("Instructor not found!");
      
      instructor.age = age(instructor.birth);
      instructor.services = instructor.services.split(",");
      instructor.created_at = date(instructor.created_at).format;

      res.render("instructors/show", { instructor });
    });
  },
  
  edit(req, res) {
    Instructor.find(req.params.id, (instructor) => {
      if (!instructor) res.send("Instructor not found!");
      
      instructor.birth = date(instructor.birth).iso;

      res.render("instructors/edit", { instructor });
    });
  },
  
  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") return res.send('Please, fill all fields!');
    }

    Instructor.update(req.body, () => {
      res.redirect(`/instructors/${req.body.id}`);
    });
  },
  
  delete(req, res) {
    Instructor.delete(req.body.id, () => {
      res.redirect(`/instructors`);
    });
  }
}