//原来的小格子叫gridCell，覆盖用的小格子叫numberCell


//board表示16个小格子里面的数字
var board=new Array();
//score表示相加之后的和
var score=0;
//初始化16个格子里面的数字
//hasConflicted[i][j]=false;表示的是这个格子没有发生过数字相加，如果发生了，那么这个格子就不能在这一次的移动中再
//接受下一个格子的移动了，只能等待下一次移动
var hasConflicted = new Array();

$(document).ready(function(){
    newgame();
});

function newgame(){
   // 调用初始化函数,以此来初始化棋盘格子
    init();
    //使随机的两个格子生成数字,因为两个格子所以调用两次
    generateOneNumber();
    generateOneNumber();
}

function init(){
    //为每个格子设置位子
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ ){

            var gridCell = $('#grid-cell-'+i+"-"+j);
            // alert(gridCell.id);
            gridCell.css('top', getPosTop( i , j ) );
            gridCell.css('left', getPosLeft( i , j ) );
        }
    //创建二位数组,同时初始化每个格子为0
    for( var i = 0 ; i < 4 ; i ++ ){
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for( var j = 0 ; j < 4 ; j ++ ){
            board[i][j] = 0;
            //初始化为false;
            hasConflicted[i][j] = false;
        }
    }
//board存储了当前应该显示在面板上的值，同时通过updateView这个函数将board数组中的值传到
    //面板上呈现出来
    updateBoardView();

    score = 0;
}
//updateView函数的作用是根据board数组里面的值对gridCell进行操作，因此每次数字变换都要调用updateView函数
//而面板上面数字的变化原理是将一个名叫number-cell的小格子放在了原来的格子上面以覆盖
//原来的数字，展现出新的变化的数字
function updateBoardView(){

    //每次调用函数时都先将number-cell元素给清除，类似于清除定时器之类的
    $(".number-cell").remove();
    //已出完所有的numberCell之后，就可以为16个每个小格子重新新建各自的numberCell
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ ){
            $("#grid-container").append( '<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>' );
            var theNumberCell = $('#number-cell-'+i+'-'+j);

            //每次都要对board[i][j]里面的数值进行判断，然后觉得呈现方式
            if( board[i][j] == 0 ){
                 //board[i][j]为0时，numberCell是显现不出来的，因此要给它设置相应的属性
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                //然后设置newNumberCell的位子，将他们放在gridCell的中间,每个gridCell长宽为100px
                theNumberCell.css('top',getPosTop(i,j) + 50 );
                theNumberCell.css('left',getPosLeft(i,j) + 50 );
            }
            else{
                 //当board[i][j]不为0时，说明数字在变化，所以theNumberCell样式与gridCell样式一致进行展现，便可将gridCell给覆盖住
                theNumberCell.css('width','100px');
                theNumberCell.css('height','100px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                 //theNumberCell会根据数字的不同将背景色进行变换,
             //注意这里style的属性名称是遵循驼峰命名来的
                theNumberCell.css('background-color',getNumberBackgroundColor( board[i][j] ) );
                //theNumberCell再根据数字的不同为数字设置不同的前景色
                theNumberCell.css('color',getNumberColor( board[i][j] ) );
                //theNumberCell还要显示数值
                theNumberCell.text( board[i][j] );
            }

            hasConflicted[i][j] = false;
        }
}

function generateOneNumber(){

    //先判断这个4X4的格子还有没有空间
    if (nospace(board)) {
        return false;
    }
    //先随机找一个位子,Math.random()是在0-1之间生成随机浮点数，乘以4则表明在0-4之间生成随机数
    var randx=parseInt(Math.floor(Math.random()*4));
    var randy=parseInt(Math.floor(Math.random()*4));
    //在判断随机生成的位子上的数字是不是为0,写个死循环

    var times = 0;
    while( times < 50 ){
        if( board[randx][randy] == 0 )
            break;

        randx = parseInt( Math.floor( Math.random()  * 4 ) );
        randy = parseInt( Math.floor( Math.random()  * 4 ) );

        times ++;
    }
    if( times == 50 ){
        for( var i = 0 ; i < 4 ; i ++ )
            for( var j = 0 ; j < 4 ; j ++ ){
                if( board[i][j] == 0 ){
                    randx = i;
                    randy = j;
                }
            }
    }

    //在随机生成一个数字2或者4
    // var randomNum=Math.ceil(Math.random()*2)*2;
    var randomNum=Math.random()<0.5?2:4;
    //更新board数组
    //在随机位子上将随机数显示出来，同时在显示的时候有个动画效果
    board[randx][randy] = randomNum;
    showNumberWithAnimation( randx , randy , randomNum );

    return true;
}
//现在来写玩家操作游戏的时候的事件，该游戏是等待玩家的操作之后根据玩家的操作再进行数据状态的改变
$(document).keydown( function( event ){
    switch( event.keyCode ){
        case 37: //left
                 //moveLeft()先判断能不能继续向左走
            if( moveLeft() ){
                setTimeout("generateOneNumber()",210);
                //判断游戏是不是结束了
                setTimeout("isgameover()",300);
            }
            break;
        case 38: //up
            if( moveUp() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 39: //right
            if( moveRight() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 40: //down
            if( moveDown() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        default: //default
            break;
    }
});

function isgameover(){
    if( nospace( board ) && nomove( board ) ){
        gameover();
    }
}

function gameover(){
    alert('gameover!');
}
//判断能不能向左走，首先最左边的一列不用判断，因为不能动，因此从第二列开始判断，如果这个格子里面有数字
//而且不为0表示这个格子是可以移动的，左边的格子为0同时这之间没阻碍，那么就可以向左边移动。或者左边的格子有数字
//但是左边的格子和要移动的格子里面的数字一样
function moveLeft(){

    if( !canMoveLeft( board ) )
        return false;

    //moveLeft
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 1 ; j < 4 ; j ++ ){
            if( board[i][j] != 0 ){

                for( var k = 0 ; k < j ; k ++ ){
                    if( board[i][k] == 0 && noBlockHorizontal( i , k , j , board ) ){
                        //move
                        showMoveAnimation( i , j , i , k );
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[i][k] == board[i][j] && noBlockHorizontal( i , k , j , board ) && !hasConflicted[i][k] ){
                        //move
                        showMoveAnimation( i , j , i , k );
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore( score );

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveRight(){
    if( !canMoveRight( board ) )
        return false;

    //moveRight
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 2 ; j >= 0 ; j -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > j ; k -- ){

                    if( board[i][k] == 0 && noBlockHorizontal( i , j , k , board ) ){
                        //move
                        showMoveAnimation( i , j , i , k );
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[i][k] == board[i][j] && noBlockHorizontal( i , j , k , board ) && !hasConflicted[i][k] ){
                        //move
                        showMoveAnimation( i , j , i , k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore( score );

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveUp(){

    if( !canMoveUp( board ) )
        return false;

    //moveUp
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 1 ; i < 4 ; i ++ ){
            if( board[i][j] != 0 ){
                for( var k = 0 ; k < i ; k ++ ){

                    if( board[k][j] == 0 && noBlockVertical( j , k , i , board ) ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , k , i , board ) && !hasConflicted[k][j] ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updateScore( score );

                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveDown(){
    if( !canMoveDown( board ) )
        return false;

    //moveDown
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 2 ; i >= 0 ; i -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > i ; k -- ){

                    if( board[k][j] == 0 && noBlockVertical( j , i , k , board ) ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , i , k , board ) && !hasConflicted[k][j] ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updateScore( score );

                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}