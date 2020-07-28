const fs = require('fs');

const data = require("../data.json");
const { grade, date } = require("../utils");

exports.index = (req, res) => {
  res.render("students/index", { students: data.students });
}

exports.create = (req, res) => {
  res.render("students/create");
}

exports.show = (req, res) => {
  const { id } = req.params;
  
  const foundStudent = data.students.find((student) => student.id == id);
  if (!foundStudent) return res.send("Student not found!");

  const student = {
    ...foundStudent,
    year: grade(foundStudent.year),
    birth: date(foundStudent.birth).birthDay,
  }

  res.render("students/show", { student });
}

exports.edit = (req, res) => {
  const { id } = req.params;

  const foundStudent = data.students.find((student) => student.id == id);
  if (!foundStudent) return res.send("Student not found!");

  const student = {
    ...foundStudent,
    birth: date(foundStudent.birth).iso
  }

  res.render("students/edit", { student });
}

exports.post = (req, res) => {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "") return res.send('Please, fill all fields!');
  }

  birth = Date.parse(req.body.birth);
  let id = 1;
  const lastStudent = data.students[data.students.length - 1];

  if (lastStudent) {
    id = lastStudent.id + 1;
  }

  data.students.push({
    id,
    ...req.body,
    birth
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write file error!");
    res.redirect(`students/${id}`);
  });
}

exports.update = (req, res) => {
  const { id } = req.body;
  let index = 0;

  const foundStudent = data.students.find((student, foundIndex) => {
    if (id == student.id) { 
      index = foundIndex;
      return true;
    }
  });

  if (!foundStudent) return res.send("Student not found!");

  const student = {
    ...foundStudent,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id)
  }

  data.students[index] = student;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write file error!");
    return res.redirect(`/students/${id}`);
  })
}

exports.delete = (req, res) => {
  const { id } = req.body;

  const filteredStudents = data.students.find((student) => student.id == id);
  data.students = filteredStudents;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write file error!");
    return res.redirect("/students");
  });
}