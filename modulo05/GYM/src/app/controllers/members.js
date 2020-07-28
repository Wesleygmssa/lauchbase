const Member = require('../models/Member');
const { date } = require('../../lib/utils');

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
      callback(members) {

        const pagination = {
          total: Math.ceil(members[0].total / limit),
          page
        }

        res.render("members/index", { members, pagination, filter });
      }
    }

    Member.paginate(params);
  },

  create(req, res) {
    Member.instructorsSelectOptions((options) => {
      res.render("members/create", { instructorOptions: options });
    });
  },
  
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") return res.send('Please, fill all fields!');
    }

    Member.create(req.body, (member) => {
      res.redirect(`/members/${member.id}`);
    });
  },
  
  show(req, res) {
    Member.find(req.params.id, (member) => {
      if (!member) res.send("Member not found!");
      
      member.birth = date(member.birth).birthDay;

      res.render("members/show", { member });
    });
  },
  
  edit(req, res) {
    Member.find(req.params.id, (member) => {
      if (!member) res.send("Member not found!");
      
      member.birth = date(member.birth).iso;

      Member.instructorsSelectOptions((options) => {
        res.render("members/edit", { member, instructorOptions: options });
      });
    });
  },
  
  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") return res.send('Please, fill all fields!');
    }

    Member.update(req.body, () => {
      res.redirect(`/members/${req.body.id}`);
    });
  },
  
  delete(req, res) {
    Member.delete(req.body.id, () => {
      res.redirect(`/members`);
    });
  }
}