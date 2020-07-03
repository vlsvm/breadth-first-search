const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
document.querySelector('.container').appendChild(canvas);
const fps = 60;
Grid.init();

let main =()=>{
    Grid.draw();
   window.setTimeout(main, 1000/fps);
}



canvas.addEventListener('mousedown', function (event) {
    let mouseX = event.clientX - event.target.offsetLeft;
    let mouseY = event.clientY - event.target.offsetTop;
    Grid.isBoxPressed(mouseX,mouseY);
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

main();