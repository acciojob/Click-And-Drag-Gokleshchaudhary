// Your code here.
const cubes = document.querySelectorAll('.cube');
const container = document.querySelector('.container');

cubes.forEach(cube => {
    cube.addEventListener('mousedown', (e) => {
        const offsetX = e.clientX - cube.getBoundingClientRect().left;
        const offsetY = e.clientY - cube.getBoundingClientRect().top;

        const onMouseMove = (e) => {
            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;

            // Boundary conditions
            const containerRect = container.getBoundingClientRect();
            const cubeRect = cube.getBoundingClientRect();

            if (newX < containerRect.left) newX = containerRect.left;
            if (newX + cubeRect.width > containerRect.right) newX = containerRect.right - cubeRect.width;
            if (newY < containerRect.top) newY = containerRect.top;
            if (newY + cubeRect.height > containerRect.bottom) newY = containerRect.bottom - cubeRect.height;

            cube.style.left = newX - containerRect.left + 'px';
            cube.style.top = newY - containerRect.top + 'px';
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
});