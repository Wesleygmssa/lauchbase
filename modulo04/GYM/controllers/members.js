const fs = require('fs');

const data = require('../data.json');
const { date } = require('../utils');

exports.index = (req, res) => {
  res.render("members/index", { members: data.members });
}

exports.create = (req, res) => {
  res.render("members/create");
}

exports.show = (req, res) => {
  const { id } = req.params;

  const foundMember = data.members.find((member) => member.id == id);
  if (!foundMember) return res.send("Member not found!");

  const member = {
    ...foundMember,
    birth: date(foundMember.birth).birthDay
  }

  res.render("members/show", { member });
}

exports.edit = (req, res) => {
  const { id } = req.params;

  const foundMember = data.members.find((member) => member.id == id);
  if (!foundMember) return res.send("Member not found!");

  const member = {
    ...foundMember,
    birth: date(foundMember.birth).iso
  }

  res.render("members/edit", { member });
}

exports.post = (req, res) => {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "") return res.send('Please, fill all fields!');
  }

  birth = Date.parse(req.body.birth);
  let id = 1;
  const lastMember = data.members[data.members.length - 1];
  
  if (lastMember) {
    id = lastMember.id + 1;
  }
  
  data.members.push({
    id,
    ...req.body,
    birth
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write file error!");
    res.redirect(`members/${id}`);
  });
}


exports.put = (req, res) => {
  const { id } = req.body;
  let index = 0;

  const foundMember = data.members.find((member, foundIndex) => {
    if (id == member.id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundMember) return res.send("Member not found!");

  const member = {
    ...foundMember,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id)
  }

  data.members[index] = member;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write file error!");
    return res.redirect(`/members/${id}`);
  });
}

exports.delete = (req, res) => {
  const { id } = req.body;

  const filteredmembers = data.members.filter((member) => member.id != id);
  data.members = filteredmembers;
  
  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write file error!");
    return res.redirect("/members");
  });
}