
const size = 8;
const colors = ["#ff4757","#1e90ff","#2ed573","#ffa502","#eccc68"];
const game = document.getElementById("game");
let grid = [];

function createGrid(){
  grid=[];
  for(let r=0;r<size;r++){
    let row=[];
    for(let c=0;c<size;c++){
      row.push(colors[Math.floor(Math.random()*colors.length)]);
    }
    grid.push(row);
  }
}

function render(){
  game.innerHTML="";
  for(let r=0;r<size;r++){
    for(let c=0;c<size;c++){
      const div=document.createElement("div");
      div.className="tile";
      div.style.background=grid[r][c];
      div.dataset.r=r;
      div.dataset.c=c;
      div.onclick=()=>selectTile(r,c);
      game.appendChild(div);
    }
  }
}

let selected=null;

function selectTile(r,c){
  if(!selected){ selected={r,c}; return; }
  let dr=Math.abs(selected.r-r);
  let dc=Math.abs(selected.c-c);
  if(dr+dc===1){
    let temp=grid[selected.r][selected.c];
    grid[selected.r][selected.c]=grid[r][c];
    grid[r][c]=temp;
    render();
    checkMatches();
  }
  selected=null;
}

function checkMatches(){
  let removed=false;
  for(let r=0;r<size;r++){
    for(let c=0;c<size-2;c++){
      if(grid[r][c]===grid[r][c+1] && grid[r][c]===grid[r][c+2]){
        grid[r][c]=grid[r][c+1]=grid[r][c+2]=null;
        removed=true;
      }
    }
  }
  for(let c=0;c<size;c++){
    for(let r=0;r<size-2;r++){
      if(grid[r][c]===grid[r+1][c] && grid[r][c]===grid[r+2][c]){
        grid[r][c]=grid[r+1][c]=grid[r+2][c]=null;
        removed=true;
      }
    }
  }
  if(removed){
    setTimeout(dropTiles,200);
  }
}

function dropTiles(){
  for(let c=0;c<size;c++){
    for(let r=size-1;r>=0;r--){
      if(grid[r][c]===null){
        for(let rr=r;rr>=0;rr--){
          if(grid[rr][c]!==null){
            grid[r][c]=grid[rr][c];
            grid[rr][c]=null;
            break;
          }
        }
      }
    }
  }
  for(let r=0;r<size;r++){
    for(let c=0;c<size;c++){
      if(grid[r][c]===null){
        grid[r][c]=colors[Math.floor(Math.random()*colors.length)];
      }
    }
  }
  render();
}

createGrid();
render();
