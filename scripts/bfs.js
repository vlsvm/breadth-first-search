class Box{
    constructor(posX,posY){
        this.width=100;
        this.heigth=100;
        this.posX = posX;
        this.posY = posY;
        this.neighbors=[];
        this.cameFrom=[];
        this.color = 'white';
        this.reachable=true;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posX,this.posY,this.width,this.heigth);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(this.posX,this.posY,this.width,this.heigth);
    }
    togleObstacle(){
        if(this.reachable){
            this.reachable=false;
            this.color='gray';
        }else{
            this.reachable=true;
            this.color='white';
        }
    }
}
Grid={
    boxes:[],
    mod:'findPath',
    startPoint:'',
    init(){
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
        this.getNeighbors();
    },
    setStartPoint(startPoint){
        this.reset();
        this.startPoint = startPoint;
        this.startPoint.color = 'red';
    },
    getNeighbors(){
        for(let i=0;i<this.boxes.length;i++){
            for(let j=0;j<this.boxes[i].length;j++){
                if(i>0) this.boxes[i][j].neighbors.push(this.boxes[i-1][j]);
                if(j<7)this.boxes[i][j].neighbors.push(this.boxes[i][j+1]);
                if(i<5)this.boxes[i][j].neighbors.push(this.boxes[i+1][j]);
                if(j>0)this.boxes[i][j].neighbors.push(this.boxes[i][j-1]);
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
                    let posX = this.boxes[i][j].posX;
                    let posY = this.boxes[i][j].posY;
                    if((mouseX>=posX && mouseX<=posX+100)&&
                    (mouseY>=posY && mouseY<=posY+100)){
                        this.reset();  
                        if(this.mod==='createObstacle'){
                            this.boxes[i][j].togleObstacle();
                        } else if(this.mod==='findPath'){
                            this.findPath(this.boxes[i][j]);
                        }else if(this.mod==='setStart'){
                            this.setStartPoint(this.boxes[i][j]);
                        }                        
                    }
                             
            }
        }
    },
    reset(){
        for(let i=0;i<this.boxes.length;i++){
            for(let j=0;j<this.boxes[i].length;j++){
                this.boxes[i][j].cameFrom.length=0;
                if(this.boxes[i][j].reachable){
                    this.boxes[i][j].color='white';
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
                    if (!visited.includes(element)&&element.reachable){
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
