const cubes = document.querySelectorAll('.cube');
const container = document.querySelector('.container');

cubes.forEach(cube => {
    cube.addEventListener('mousedown', function(e) {
        let shiftX = e.clientX - cube.getBoundingClientRect().left;
        let shiftY = e.clientY - cube.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            let newLeft = pageX - shiftX - container.getBoundingClientRect().left;
            let newTop = pageY - shiftY - container.getBoundingClientRect().top;

            // Boundary conditions
            newLeft = Math.max(0, Math.min(container.clientWidth - cube.offsetWidth, newLeft));
            newTop = Math.max(0, Math.min(container.clientHeight - cube.offsetHeight, newTop));

            cube.style.left = newLeft + 'px';
            cube.style.top = newTop + 'px';
        }

        function onMouseMove(e) {
            moveAt(e.pageX, e.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        cube.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            cube.onmouseup = null; // Clean up
        };
    });

    cube.ondragstart = function() {
        return false; // Prevent default drag behavior
    };
});