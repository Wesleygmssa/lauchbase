module.exports = {
  age: (timestamp) => {
    const today = new Date();
    const birthDate = new Date(timestamp);

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || month == 0 && today.getDate() <= birthDate.getDate()) {
      age -= 1;
    }

    return age;
  },

  graduation: (schooling) => {
    if (schooling == "school") {
      return "High School";
    
    } else if (schooling == "college") {
      return "College";

    } else if (schooling == "masters") {
      return "Masters";

    } else {
      return "Doctorate";
    }
  },

  grade: (year) => {
    if (year == "5") {
      return "5th year of Elementary School";
    
    } else if (year == "6") {
      return "6th year of Elementary School";

    } else if (year == "7") {
      return "7th year of Elementary School";
    
    } else if (year == "8") {
      return "8th year of Elementary School";

    } else if (year == "1") {
      return "1th year of High School";

    } else if (year == "2") {
      return "2th year of High School";

    } else {
      return "3th year of High School";
    }
  },

  date: (timestamp) => {
    const date = new Date(timestamp);

    const year = date.getUTCFullYear();
    const month = `0${date.getUTCMonth() + 1}`.slice(-2);
    const day = `0${date.getUTCDate()}`.slice(-2);

    return {
      day,
      month,
      year,
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}`
    }
  }
}
