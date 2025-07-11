const container = document.querySelector(".container");
const cubes = document.querySelectorAll(".cube");

let selected = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach(cube => {
  cube.addEventListener("mousedown", e => {
    selected = cube;
    const rect = cube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  });
});

document.addEventListener("mousemove", e => {
  if (selected) {
    const containerRect = container.getBoundingClientRect();
    const cubeRect = selected.getBoundingClientRect();

    let newX = e.clientX - containerRect.left - offsetX;
    let newY = e.clientY - containerRect.top - offsetY;

    // Boundary check
    newX = Math.max(0, Math.min(container.clientWidth - cubeRect.width, newX));
    newY = Math.max(0, Math.min(container.clientHeight - cubeRect.height, newY));

    selected.style.left = `${newX}px`;
    selected.style.top = `${newY}px`;
  }
});

document.addEventListener("mouseup", () => {
  selected = null;
});
