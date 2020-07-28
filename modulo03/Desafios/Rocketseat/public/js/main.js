const courses = document.querySelectorAll('.card');

for (let course of courses) {
  course.addEventListener("click", function() {
    const courseId = course.getAttribute("id");
    window.location.href = `/courses/${courseId}`;
  });
}