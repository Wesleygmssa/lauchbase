module.exports = {
  age(timestamp) {
    const today = new Date();
    const birthDate = new Date(timestamp);

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || month == 0 && today.getDate() <= birthDate.getDate()) {
      age -= 1;
    }

    return age;
  },

  graduation(schooling) {
    if (schooling == "High School") {
      return "High School";
    
    } else if (schooling == "College") {
      return "College";

    } else if (schooling == "Masters") {
      return "Masters";

    } else {
      return "Doctorate";
    }
  },

  grade(year) {
    if (year == "5th year of Elementary School") {
      return "5th year of Elementary School";
    
    } else if (year == "6th year of Elementary School") {
      return "6th year of Elementary School";

    } else if (year == "7th year of Elementary School") {
      return "7th year of Elementary School";
    
    } else if (year == "8th year of Elementary School") {
      return "8th year of Elementary School";

    } else if (year == "1th year of High School") {
      return "1th year of High School";

    } else if (year == "2th year of High School") {
      return "2th year of High School";

    } else {
      return "3th year of High School";
    }
  },

  date(timestamp) {
    const date = new Date(timestamp);

    const year = date.getUTCFullYear();
    const month = `0${date.getUTCMonth() + 1}`.slice(-2);
    const day = `0${date.getUTCDate()}`.slice(-2);

    return {
      day,
      month,
      year,
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}`,
      format: `${day}/${month}/${year}`
    }
  }
}
