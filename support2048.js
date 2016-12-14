function getPosTop( i , j ){
    return 20 + i*120;
}

function getPosLeft( i , j ){
    return 20 + j*120;
}

function getNumberBackgroundColor( number ){
    switch( number ){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
    }

    return "black";
}

function getNumberColor( number ){
    if( number <= 4 )
        return "#776e65";

    return "white";
}

function getNumberText( number ){
    switch( number ){
        case 2:return "小白";break;
        case 4:return "实习生";break;
        case 8:return "程序猿";break;
        case 16:return "项目经理";break;
        case 32:return "架构师";break;
        case 64:return "技术经理";break;
        case 128:return "高级经理";break;
        case 256:return "技术总监";break;
        case 512:return "副总裁";break;
        case 1024:return "CTO";break;
        case 2048:return "总裁";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
    }

    return "black";
}

function nospace( board ){
//双重循环来检验一下每个格子里的数是不是都不为0，如果是，那表明没有空间了
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ )
            if( board[i][j] == 0 )
                return false;

    return true;
}

function canMoveLeft( board ){
//首先最左边的四个格子是不用判断的，肯定不能移动，所以直接判断后三列就好了
    //不能移动的条件：如果坐左边的四个数字都有数值并且与要移动的数字不相等，则不能移动。反之可以
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 1; j < 4 ; j ++ )
            //j=1是因为第一列j=0不用判断，因为他们本来就移动不了
            //能移动的条件,board[i][j]!=0说明这个格子里面有数字可以移动
            if( board[i][j] != 0 )
                if( board[i][j-1] == 0 || board[i][j-1] == board[i][j] )
                    return true;

    return false;
}

function canMoveRight(board){
    //首先最左边的四个格子是不用判断的，肯定不能移动，所以直接判断后三列就好了
    //不能移动的条件：如果坐左边的四个数字都有数值并且与要移动的数字不相等，则不能移动。反之可以
    for (var i = 0; i < 4; i++) 
        for (var j = 2; j >=0; j--) 
            //能移动的条件,board[i][j]!=0说明这个格子里面有数字可以移动
            if(board[i][j]!=0)
               if(board[i][j+1]==0||board[i][j+1]==board[i][j])
                   return true;
   
    return false;
}

function canMoveUp(board){
    //首先最左边的四个格子是不用判断的，肯定不能移动，所以直接判断后三列就好了
    //不能移动的条件：如果坐左边的四个数字都有数值并且与要移动的数字不相等，则不能移动。反之可以
    for (var j = 0; j < 4; j++) 
        for (var i = 1; i < 4; i++) 
            //能移动的条件,board[i][j]!=0说明这个格子里面有数字可以移动
            if(board[i][j]!=0)
                if(board[i-1][j]==0||board[i-1][j]==board[i][j])
                   return true;
 
    return false;
}

function canMoveDown(board){
    //首先最左边的四个格子是不用判断的，肯定不能移动，所以直接判断后三列就好了
    //不能移动的条件：如果坐左边的四个数字都有数值并且与要移动的数字不相等，则不能移动。反之可以
    for (var j = 0; j < 4; j++) 
        for (var i = 2; i >= 0; i--) 
            //能移动的条件,board[i][j]!=0说明这个格子里面有数字可以移动
            if(board[i][j]!=0)
               if(board[i+1][j]==0||board[i+1][j]==board[i][j])
                   return true;
     
    return false;
}

function noBlockHorizontal( row , col1 , col2 , board ){
    for( var i = col1 + 1 ; i < col2 ; i ++ )
        if( board[row][i] != 0 )
            return false;
    return true;
}

function noBlockVertical( col , row1 , row2 , board ){
    for( var i = row1 + 1 ; i < row2 ; i ++ )
        if( board[i][col] != 0 )
            return false;
    return true;
}

function nomove( board ){
    if( canMoveLeft( board ) ||
        canMoveRight( board ) ||
        canMoveUp( board ) ||
        canMoveDown( board ) )
        return false;

    return true;
}

