const employees = [
    {id: 1, name: "john", age: "18", profession: "developer"},
    {id: 2, name: "jack", age: "20", profession: "developer"},
    {id: 3, name: "karen", age: "19", profession: "admin"}
];

function PrintDeveloperbyMap() {
    const developers = employees.map(employee => {
        if (employee.profession === "developer") {
            return employee;
        }
    }).filter(Boolean); // Remove undefined values
    displayEmployees(developers);
}

function PrintDeveloperbyForEach() {
    const developers = [];
    employees.forEach(employee => {
        if (employee.profession === "developer") {
            developers.push(employee);
        }
    });
    displayEmployees(developers);
}

function addData() {
    const newEmployee = {id: 4, name: "susan", age: "20", profession: "intern"};
    employees.push(newEmployee);
    displayEmployees(employees);
}

function removeAdmin() {
    const updatedEmployees = employees.filter(employee => employee.profession !== "admin");
    displayEmployees(updatedEmployees);
}

function ConcatinateArray() {
    const newEmployees = [
        {id: 5, name: "alice", age: "22", profession: "designer"},
        {id: 6, name: "bob", age: "23", profession: "manager"},
        {id: 7, name: "charlie", age: "24", profession: "analyst"}
    ];
    const allEmployees = employees.concat(newEmployees);
    displayEmployees(allEmployees);
}

// --- DRAGGABLE CUBES LOGIC ---
let cubePositions = {}; // Store positions by employee id

function displayEmployees(employeeArray) {
    const employeeList = document.getElementById('employeeList');
    employeeList.innerHTML = ''; // Clear previous entries

    // Arrange cubes in a grid by default
    const cols = 4;
    const cubeWidth = 130;
    const cubeHeight = 80;
    const gap = 10;

    employeeArray.forEach((employee, idx) => {
        const div = document.createElement('div');
        div.className = 'cube';
        div.setAttribute('data-id', employee.id);
        div.innerHTML = `
            <div>ID: ${employee.id}</div>
            <div>Name: ${employee.name}</div>
            <div>Age: ${employee.age}</div>
            <div>Profession: ${employee.profession}</div>
        `;

        // Set position: use saved if exists, else grid
        let pos = cubePositions[employee.id];
        if (!pos) {
            const row = Math.floor(idx / cols);
            const col = idx % cols;
            pos = {
                left: col * (cubeWidth + gap),
                top: row * (cubeHeight + gap)
            };
            cubePositions[employee.id] = pos;
        }
        div.style.left = pos.left + 'px';
        div.style.top = pos.top + 'px';

        employeeList.appendChild(div);
    });

    enableDrag();
}

function enableDrag() {
    const container = document.getElementById('employeeList');
    const cubes = container.querySelectorAll('.cube');
    let selectedCube = null;
    let offsetX = 0, offsetY = 0;
    let containerRect = container.getBoundingClientRect();

    cubes.forEach(cube => {
        cube.onmousedown = function(e) {
            selectedCube = cube;
            selectedCube.classList.add('dragging');
            containerRect = container.getBoundingClientRect();
            const rect = cube.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };
    });

    function onMouseMove(e) {
        if (!selectedCube) return;
        let x = e.clientX - containerRect.left - offsetX;
        let y = e.clientY - containerRect.top - offsetY;
        // Boundary constraints
        x = Math.max(0, Math.min(x, container.offsetWidth - selectedCube.offsetWidth));
        y = Math.max(0, Math.min(y, container.offsetHeight - selectedCube.offsetHeight));
        selectedCube.style.left = x + 'px';
        selectedCube.style.top = y + 'px';
    }

    function onMouseUp() {
        if (selectedCube) {
            selectedCube.classList.remove('dragging');
            // Save new position
            const id = selectedCube.getAttribute('data-id');
            cubePositions[id] = {
                left: parseInt(selectedCube.style.left),
                top: parseInt(selectedCube.style.top)
            };
            selectedCube = null;
        }
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
}

// Initial display
displayEmployees(employees);