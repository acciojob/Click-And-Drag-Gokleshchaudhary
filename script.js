const container = document.getElementById("container");
const cubes = document.querySelectorAll(".cube");

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

// Place cubes in grid layout manually
const gridSpacing = 10;
const cubeSize = 100;
cubes.forEach((cube, index) => {
  const cols = Math.floor(container.clientWidth / (cubeSize + gridSpacing));
  const x = (index % cols) * (cubeSize + gridSpacing);
  const y = Math.floor(index / cols) * (cubeSize + gridSpacing);
  cube.style.left = `${x}px`;
  cube.style.top = `${y}px`;
});

cubes.forEach(cube => {
  cube.addEventListener("mousedown", (e) => {
    selectedCube = cube;

    // Get the position inside the cube where mouse was clicked
    const rect = cube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    // Bring selected cube to top
    cube.style.zIndex = "1000";

    // Disable transition for smooth drag
    cube.style.transition = "none";
  });
});

document.addEventListener("mousemove", (e) => {
  if (!selectedCube) return;

  const containerRect = container.getBoundingClientRect();

  // Calculate new position
  let newX = e.clientX - containerRect.left - offsetX;
  let newY = e.clientY - containerRect.top - offsetY;

  // Constrain within container
  const maxX = container.clientWidth - selectedCube.clientWidth;
  const maxY = container.clientHeight - selectedCube.clientHeight;

  newX = Math.max(0, Math.min(newX, maxX));
  newY = Math.max(0, Math.min(newY, maxY));

  // Apply position
  selectedCube.style.left = `${newX}px`;
  selectedCube.style.top = `${newY}px`;
});

document.addEventListener("mouseup", () => {
  if (selectedCube) {
    // Reset z-index and transition
    selectedCube.style.zIndex = "";
    selectedCube.style.transition = "";
  }
  selectedCube = null;
});
