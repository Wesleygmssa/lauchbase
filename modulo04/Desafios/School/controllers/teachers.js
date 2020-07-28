const fs = require('fs');
const Intl = require('intl');

const data = require("../data.json");
const { age, graduation, date } = require("../utils");

exports.index = (req, res) => {
  res.render("teachers/index", { teachers: data.teachers });
}

exports.create = (req, res) => {
  res.render("teachers/create");
}

exports.show = (req, res) => {
  const { id } = req.params;
  
  const foundTeacher = data.teachers.find((teacher) => teacher.id == id);
  if (!foundTeacher) return res.send("Teacher not found!");

  const teacher = {
    ...foundTeacher,
    age: age(foundTeacher.birth),
    schooling: graduation(foundTeacher.schooling),
    subjects: foundTeacher.subjects.split(","),
    created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at)
  }

  res.render("teachers/show", { teacher });
}

exports.edit = (req, res) => {
  const { id } = req.params;

  const foundTeacher = data.teachers.find((teacher) => teacher.id == id);
  if (!foundTeacher) return res.send("Instructor not found!");

  const teacher = {
    ...foundTeacher,
    birth: date(foundTeacher.birth).iso
  }

  res.render("teachers/edit", { teacher });
}

exports.post = (req, res) => {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "") return res.send('Please, fill all fields!');
  }

  let { avatar_url, name, birth, type, schooling, subjects } = req.body;

  birth = Date.parse(birth);
  const created_at = Date.now();
  const id = Number(data.teachers.length + 1);

  data.teachers.push({
    id,
    avatar_url,
    name,
    birth,
    type,
    schooling,
    subjects,
    created_at
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write file error!");
    res.redirect(`teachers/${id}`);
  });
}

exports.update = (req, res) => {
  const { id } = req.body;
  let index = 0;

  const foundTeacher = data.teachers.find((teacher, foundIndex) => {
    if (id == teacher.id) { 
      index = foundIndex;
      return true;
    }
  });

  if (!foundTeacher) return res.send("Teacher not found!");

  const teacher = {
    ...foundTeacher,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id)
  }

  data.teachers[index] = teacher;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write file error!");
    return res.redirect(`/teachers/${id}`);
  })
}

exports.delete = (req, res) => {
  const { id } = req.body;

  const filteredTeachers = data.teachers.find((teacher) => teacher.id == id);
  data.teachers = filteredTeachers;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write file error!");
    return res.redirect("/teachers");
  });
}