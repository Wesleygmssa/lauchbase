const classA = [
  {
    name: "Mayk",
    grade: 9.8
  },
  {
    name: "Diego",
    grade: 10
  },
  {
    name: "Fulano",
    grade: 2
  },
  {
    name: "Mais um student",
    grade: 10
  },
];

const classB = [
  {
    name: "Cleiton",
    grade: 10
  },
  {
    name: "Robson",
    grade: 10
  },
  {
    name: "Siclano",
    grade: 0
  },
  {
    name: "Novo student",
    grade: 5
  },
];

function calculateAverage(students) {
  let sum = 0;

  for (let i = 0; i < students.length; i++) {
    sum += students[i].grade;
  }

  const average = sum / students.length;
  return average;
}

function sendMessage(average, turma) {
  if (average > 5) {
    console.log(`${turma} average: ${average}. Congratulations!`);
  } else {
    console.log(`${turma} average: ${average}. Is not good.`);
  }
}

function markAsFlunked(student) {
  if (student.grade < 5) {
    student.flunked = true;
  }
}

function sendFlunkedMessage(student) {
  if (student.flunked) {
    console.log(`${student.name} flunked!`);
  }
}

function studentsFlunkeds(students) {
  for (let student of students) {
    student.flunked = false;
    markAsFlunked(student);
    sendFlunkedMessage(student);
  }
}

const average1 = calculateAverage(classA);
const average2 = calculateAverage(classB);

sendMessage(average1, 'classA');
sendMessage(average2, 'classB');

studentsFlunkeds(classA);
studentsFlunkeds(classB);