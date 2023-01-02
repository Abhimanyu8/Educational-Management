const form = document.getElementById("school-form");
const schoolList = document.getElementById("school-list");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const location = document.getElementById("location").value;

  const school = document.createElement("div");
  school.classList.add("school");
  school.innerHTML = `
    <h3>${name}</h3>
    <p>${location}</p>
  `;

  schoolList.appendChild(school);

  form.reset();
});

schoolList.addEventListener("click", (event) => {
  if (event.target.tagName === "H3") {
    event.target.parentElement.classList.toggle("selected");
  }
});

const filterInput = document.getElementById("filter");

filterInput.addEventListener("input", (event) => {
  const filterValue = event.target.value.toLowerCase();
  const schools = document.querySelectorAll(".school");

  schools.forEach((school) => {
    const name = school.querySelector("h3").textContent.toLowerCase();
    const location = school.querySelector("p").textContent.toLowerCase();
    if (name.includes(filterValue) || location.includes(filterValue)) {
      school.style.display = "block";
    } else {
      school.style.display = "none";
    }
  });
});
