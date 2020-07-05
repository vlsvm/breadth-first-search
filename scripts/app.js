const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
document.querySelector('.container').appendChild(canvas);
Grid.init();
Grid.draw();
canvas.addEventListener('mousedown', function (event) {
    let mouseX = event.clientX - event.target.offsetLeft;
    let mouseY = event.clientY - event.target.offsetTop;
    Grid.isBoxPressed(mouseX,mouseY);
    Grid.draw();
});

document.querySelector('#create').onclick=()=>{
    Grid.mod='createObstacle'
}
document.querySelector('#setStart').onclick=()=>{
    Grid.mod='setStart'
}
document.querySelector('#setFinal').onclick=()=>{
    Grid.mod='findPath'
}