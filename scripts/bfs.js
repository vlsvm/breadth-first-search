class Box{
    constructor(posX,posY){
        this.width=100;
        this.heigth=100;
        this.posX = posX;
        this.posY = posY;
        this.neighbors=[];
        this.cameFrom=[];
        this.color = 'white';
        this.isReachable=true;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posX,this.posY,this.width,this.heigth);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(this.posX,this.posY,this.width,this.heigth);
    }
    togleObstacle(){
        if(this.isReachable){
            this.isReachable=false;
            this.color='gray';
        }else{
            this.isReachable=true;
            this.color='white';
        }
    }
}
Grid={
    boxes:[],
    mod:'findPath',
    startPoint:'',
    init(){//create and draw boxes
        posX=0;
        posY=0;
        for(let i=0;i<6;i++){
            this.boxes[i]=[];
            for(let j=0;j<8;j++){
                let box = new Box(posX,posY);
                box.draw();
                this.boxes[i][j]=box;
                if((posX+=box.width)>=canvas.width){
                    posX=0;
                    posY+=100;
                }
            }
        }
        this.startPoint = this.boxes[0][0];
        this.getNeighborsForBoxes();
    },
    setStartPoint(box){
        this.reset();
        if(box.isReachable){
            this.startPoint = box;
            this.startPoint.color = 'red';
        }
    },
    getNeighborsForBoxes(){
        for(let i=0;i<this.boxes.length;i++){
            for(let j=0;j<this.boxes[i].length;j++){
                let box = this.boxes[i][j];
                if(i>0) box.neighbors.push(this.boxes[i-1][j]);
                if(j>0)box.neighbors.push(this.boxes[i][j-1]);
                if(j<this.boxes[i].length-1)box.neighbors.push(this.boxes[i][j+1]);
                if(i<this.boxes.length-1)box.neighbors.push(this.boxes[i+1][j]);
                
            }
        }    
    },
    draw(){
        for(let i=0;i<6;i++){
            for(let j=0;j<8;j++){
                this.boxes[i][j].draw();
            }
        }
    },
    isBoxPressed(mouseX,mouseY){
        for(let i=0;i<this.boxes.length;i++){
            for(let j=0;j<this.boxes[i].length;j++){
                let box = this.boxes[i][j];
                let posX = box.posX;
                let posY = box.posY;
                if((mouseX>=posX && mouseX<=posX+100)&&//if click was within box borders    
                    (mouseY>=posY && mouseY<=posY+100)){
                        this.reset();  
                        if(this.mod==='createObstacle'){
                            box.togleObstacle();
                        } else if(this.mod==='findPath'){
                            this.findPath(box);
                        }else if(this.mod==='setStart'){
                            this.setStartPoint(box);
                        }                        
                    }
                             
            }
        }
    },
    reset(){
        for(let i=0;i<this.boxes.length;i++){
            for(let j=0;j<this.boxes[i].length;j++){
                let box = this.boxes[i][j];
                box.cameFrom.length=0;
                if(box.isReachable){
                    box.color='white';
                }
                
            }
        }
    },
    findPath(finalPoint){
        let visited=[];
        let frontier=[];
        frontier.push(this.startPoint);
        visited.push(this.startPoint);
        while(frontier.length!=0){
            let box = frontier.shift();
            if(box===finalPoint){
                finalPoint.color = 'red';
                box.cameFrom.forEach(element => {
                    element.color = 'red';
                });
                break;
            }else{  box.neighbors.forEach(element => {
                    if (!visited.includes(element)&&element.isReachable){
                            element.cameFrom.push(box);
                            element.cameFrom = element.cameFrom.concat(box.cameFrom);
                            frontier.push(element);
                            visited.push(element);                      
                    }
                });
            }
        }
    }
}
