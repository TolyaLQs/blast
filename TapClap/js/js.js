//обявляем переменные

// canvas
// let canvas = document.getElementById('canvas');
let canvas = document.createElement('canvas');
let context = canvas.getContext("2d");
let screenWidth = window.screen.width;
let screenHeight = window.screen.height;

// game state
let play = false;
let pause = false;
let score = 0;
let final_score = 150;
let move = 15;

let div_menu = document.createElement('div');
div_menu.classList.add('menu');
let logo = document.createElement('div');
logo.classList.add('logo');
logo.innerHTML = 'GameBlast';

let btn_play = document.createElement('div');
btn_play.classList.add('btn-play');
btn_play.innerHTML = 'играть';
let btn_setting = document.createElement('div');
btn_setting.classList.add('btn-setting');
btn_setting.innerHTML = 'настройки';

let btn_back = document.createElement('div');
btn_back.classList.add('btn-back');
btn_back.innerHTML = 'назад';

let div_field = document.createElement('div');
div_field.classList.add('div-field');
let div_hud = document.createElement('div');
div_hud.classList.add('div-hud');
let field_score = document.createElement('div');
field_score.classList.add('field-score');

let btn_pause = document.createElement('div');
btn_pause.classList.add('btn-pause');
btn_pause.innerHTML = 'пауза';

let div_d_f_a_p = document.createElement('div');
div_d_f_a_p.classList.add('div-d-f-a-p');
let div_purpose = document.createElement('div');
div_purpose.classList.add('div-purpose');
div_d_f_a_p.append(div_purpose);

let div_final_score = document.createElement('div');
div_final_score.classList.add('div-final-score');
div_final_score.innerHTML = 'цель: ' + final_score;
div_purpose.append(div_final_score);

let div_move = document.createElement('div');
div_move.classList.add('div-move');
div_move.innerHTML = 'ходы: ' + move;
div_purpose.append(div_move);

let pause_field_background = document.createElement('div');
pause_field_background.classList.add('pause-field-background');

let pause_field = document.createElement('div');
pause_field.classList.add('pause-field');
pause_field_background.append(pause_field);

let div_finish_field_background = document.createElement('div');
div_finish_field_background.classList.add('pause-field-background');

let div_finish_field = document.createElement('div');
div_finish_field.classList.add('pause-field');
div_finish_field_background.append(div_finish_field);

let div_game_over = document.createElement('div');
div_game_over.classList.add('logo');
div_game_over.innerHTML = 'Game over';

let div_win = document.createElement('div');
div_win.classList.add('logo');
div_win.innerHTML = 'You win';

let btn_continue = document.createElement('div');
btn_continue.classList.add('btn-continue');
btn_continue.innerHTML = 'продолжить';

let btn_to_finish = document.createElement('div');
btn_to_finish.classList.add('btn-to-finish');
btn_to_finish.innerHTML = 'завершить';

let btn_to_finish1 = document.createElement('div');
btn_to_finish1.classList.add('btn-to-finish');
btn_to_finish1.innerHTML = 'завершить';

let btn_to_finish2 = document.createElement('div');
btn_to_finish2.classList.add('btn-to-finish');
btn_to_finish2.innerHTML = 'завершить';

let btn_sound = document.createElement('div');
btn_sound.classList.add('btn-sound');

let btn_sound1 = document.createElement('div');
btn_sound1.classList.add('btn-sound');

// field size
let value_block_row = 9;
let value_block_column = 9;

// blocks
let block_width = 40;
let block_height = 40;
let width_canvas = '370px';
let height_canvas = '370px';
if (320 <= screenWidth && screenWidth < 699) {
    block_width = 34;
    block_height = 34;
    width_canvas = '320px';
    height_canvas = '320px';
} else {
    block_width = 40;
    block_height = 40;
    width_canvas = '370px';
    height_canvas = '370px';
}
let block_array_row = [];
let block_array_column = [];
let blue = new Image();
let green = new Image();
let purple = new Image();
let red = new Image();
let yellow = new Image();
let null_block = new Image();
let bomb = new Image();

blue.src = 'img/blue.png';
green.src = 'img/green.png';
purple.src = 'img/purple.png';
red.src = 'img/red.png';
yellow.src = 'img/yellow.png';
null_block.src = 'img/null_block.png';
bomb.src = 'img/bomb.png';

// audio boom
let boom = new Audio();
boom.src = 'audio/boom.wav';
let sound = true;

// block_array_column = [[1, 1, 1, 1, 1, 1, 1, 1, 1],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1]];

function drawColor(color) {
    switch (color) {
        case 0:
            return blue;
        case 1:
            return green;
        case 2:
            return purple;
        case 3:
            return red;
        case 4:
            return yellow;
        case 5:
            return null_block;
        case 6:
            return bomb;
    }
}

function randomColor() {
    num = Math.floor(5 * Math.random());
    return num;
}

function drawBlockArray() {
    block_array_column = [];
    for (i = 0; i < 9; i++) {
        block_array_row = [];
        for (j = 0; j < 9; j++) {
            num = randomColor();
            block_array_row.push(num);
        }
        block_array_column.push(block_array_row);
    }

}

function drawBlock(array) {
    for (i = 0; i < value_block_column; i++) {
        for (j = 0; j < value_block_row; j++) {
            color = drawColor(array[i][j]);
            context.drawImage(color, j * block_width + 1 + j, i * block_height + 1 + i, block_width, block_height);
        }
    }
}

function deleteBlock(similar) {
    if (similar.length > 1) {
        similar.forEach(function (el) {
            block_array_column[el[0]][el[1]] = 5;
        });
        if (sound === true) {
            boom.play();
        }
    } else {
        console.log('1 object');
    }
}

function searchNeighbourLeft(i, j) {
    if (block_array_column[i][j] === block_array_column[i][j + 1]) {
        return [1, [i, j + 1]];
    } else {
        return [0, 0];
    }
}

function searchNeighbourDown(i, j) {
    if (block_array_column[i][j] === block_array_column[i + 1][j]) {
        return [1, [i + 1, j]];
    } else {
        return [0, 0];
    }
}

function searchNeighbourRight(i, j) {
    if (block_array_column[i][j] === block_array_column[i][j - 1]) {
        return [1, [i, j - 1]];
    } else {
        return [0, 0];
    }
}

function searchNeighbourTop(i, j) {
    if (block_array_column[i][j] === block_array_column[i - 1][j]) {
        return [1, [i - 1, j]];
    } else {
        return [0, 0];
    }
}

function searchNeighbour(i, j) {
    neighbour = 0;
    array_neighbour = [];
    if (i === 0 && j === 0) {
        neighbour = searchNeighbourLeft(i, j)[0] + searchNeighbourDown(i, j)[0];
        array_neighbour.push(searchNeighbourLeft(i, j)[1], searchNeighbourDown(i, j)[1]);
        return [neighbour, array_neighbour];
    } else if (i === 0 && j === value_block_row - 1) {
        neighbour = searchNeighbourDown(i, j)[0] + searchNeighbourRight(i, j)[0];
        array_neighbour.push(searchNeighbourDown(i, j)[1], searchNeighbourRight(i, j)[1]);
        return [neighbour, array_neighbour];
    } else if (i === value_block_column - 1 && j === value_block_row - 1) {
        neighbour = searchNeighbourRight(i, j)[0] + searchNeighbourTop(i, j)[0];
        array_neighbour.push(searchNeighbourRight(i, j)[1], searchNeighbourTop(i, j)[1]);
        return [neighbour, array_neighbour];
    } else if (i === value_block_column - 1 && j === 0) {
        neighbour = searchNeighbourLeft(i, j)[0] + searchNeighbourTop(i, j)[0];
        array_neighbour.push(searchNeighbourLeft(i, j)[1], searchNeighbourTop(i, j)[1]);
        return [neighbour, array_neighbour];
    } else if (i === 0 && 0 < j < value_block_row - 1) {
        neighbour = searchNeighbourLeft(i, j)[0] + searchNeighbourDown(i, j)[0] + searchNeighbourRight(i, j)[0];
        array_neighbour.push(searchNeighbourLeft(i, j)[1], searchNeighbourDown(i, j)[1], searchNeighbourRight(i, j)[1]);
        return [neighbour, array_neighbour];
    } else if (0 < i < value_block_column - 1 && j === value_block_row - 1) {
        neighbour = searchNeighbourDown(i, j)[0] + searchNeighbourRight(i, j)[0] + searchNeighbourTop(i, j)[0];
        array_neighbour.push(searchNeighbourDown(i, j)[1], searchNeighbourRight(i, j)[1], searchNeighbourTop(i, j)[1]);
        return [neighbour, array_neighbour];
    } else if (i === value_block_column - 1 && 0 < j < value_block_row - 1) {
        neighbour = searchNeighbourLeft(i, j)[0] + searchNeighbourRight(i, j)[0] + searchNeighbourTop(i, j)[0];
        array_neighbour.push(searchNeighbourLeft(i, j)[1], searchNeighbourRight(i, j)[1], searchNeighbourTop(i, j)[1]);
        return [neighbour, array_neighbour];
    } else if (0 < i < value_block_column - 1 && j === 0) {
        neighbour = searchNeighbourLeft(i, j)[0] + searchNeighbourDown(i, j)[0] + searchNeighbourTop(i, j)[0];
        array_neighbour.push(searchNeighbourLeft(i, j)[1], searchNeighbourDown(i, j)[1], searchNeighbourTop(i, j)[1]);
        return [neighbour, array_neighbour];
    } else if (0 < i < value_block_column - 1 && 0 < j < value_block_row - 1) {
        neighbour = searchNeighbourLeft(i, j)[0] + searchNeighbourDown(i, j)[0] + searchNeighbourRight(i, j)[0] + searchNeighbourTop(i, j)[0];
        array_neighbour.push(searchNeighbourLeft(i, j)[1], searchNeighbourDown(i, j)[1], searchNeighbourRight(i, j)[1], searchNeighbourTop(i, j)[1]);
        return [neighbour, array_neighbour];
    } else {
        console.log('no tap block');
        return [0, 0];
    }

}

function arrayUnique(array) {
    a = array.concat();
    for (i = 0; i < a.length; ++i) {
        for (j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
}

function searchAllNeighbour(i, j) {
    array_all_block_tap = [];
    array_f = [];
    array_all_block_tap.push([i, j]);
    array_f = [...array_all_block_tap];
    for (step = 0; step < value_block_row * value_block_column; step++) {
        if (array_all_block_tap.length > 0) {
            array_all_block_tap.forEach(function (block) {
                value_neighbour = searchNeighbour(block[0], block[1]);
                value_neighbour[1].forEach(function (el) {
                    a = 0;
                    if (el !== 0) {
                        array_f.forEach(function (l) {
                            if (l[0] === el[0] && l[1] === el[1]) {
                                a++;
                                return false;
                            }
                        })
                        if (a === 0) {
                            array_all_block_tap.push(el);
                        }
                    }
                })
                array_all_block_tap = arrayUnique(array_all_block_tap);
                array_f = arrayUnique(array_f.concat(array_all_block_tap));
            })
        } else {
            break;
        }
        array_f = arrayUnique(array_f);
    }
    return array_f;
}

function fillingEmptyBlocks(block_array_column) {
    for (j = 0; j <= block_array_column.length - 1; j++) {
        empty = 0;
        for (i = block_array_column.length - 1; i >= 0; i--) {
            if (block_array_column[i][j] === 5) {
                empty++;
            } else {
                if (empty > 0) {
                    block_array_column[i + empty][j] = block_array_column[i][j];
                    block_array_column[i][j] = 5;
                }
            }
        }
        if (block_array_column[0][j] === 5) {
            block_array_column[0][j] = randomColor();
        }
    }
}

function searchBlockBomb(arew, brew) {
    array_b = [];
    array_b.push([arew, brew]);
    if (arew === 0 && brew === 0) {
        arw = arew;
        brw = brew;
    } else if (arew === 1 && brew === 1) {
        arw = arew - 1;
        brw = brew - 1;
    } else if (arew === 1 && brew === 0) {
        arw = arew - 1;
        brw = brew;
    } else if (arew === 0 && brew === 1) {
        arw = arew;
        brw = brew - 1;
    } else if (arew === 0 && brew > 1) {
        arw = arew;
        brw = brew - 2;
    } else if (arew > 1 && brew === 0) {
        arw = arew - 2;
        brw = brew;
    } else if (arew === 1 && brew > 1) {
        arw = arew - 1;
        brw = brew - 2;
    } else if (arew > 1 && brew === 1) {
        arw = arew - 2;
        brw = brew - 1;
    } else {
        arw = arew - 2;
        brw = brew - 2;
    }
    for (a1 = arw; a1 < arew + 3 && a1 < 9; a1++) {
        for (b1 = brw; b1 < brew + 3 && b1 < 9; b1++) {
            if(block_array_column[a1][b1] !== 6){
                array_b.push([a1, b1]);
            }
        }

    }
    console.log('array= ' + array_b);
    return array_b;
}

function clickBlock() {
    canvas.onmousedown = function (event) {
        x = event.offsetX;
        y = event.offsetY;
        console.log('x=' + x + ' y=' + y);
        if (1 < x && x <= (block_width * 9 + 8) && 1 < y && y <= (block_height * 9 + 8)) {
            console.log('1');
            j = parseInt(x / (block_width + 1));
            i = parseInt(y / (block_height + 1));
            arew = i;
            brew = j;
            console.log('i=' + i + ' j=' + j);
            if (block_array_column[arew][brew] === 6) {
                neighbour = searchBlockBomb(arew, brew);
                f = neighbour.length;
                neighbour = deleteBlock(neighbour);
                if (f > 1) {
                    score = score + f;
                    console.log(move);
                    move = move - 1;
                }
            } else {
                neighbour = searchAllNeighbour(i, j);
                f = neighbour.length;
                neighbour = deleteBlock(neighbour);
                if (f > 1) {
                    score = score + f;
                    console.log(move);
                    move = move - 1;
                }
                if (f >= 5) {
                    block_array_column[arew][brew] = 6;
                }
            }
            div_move.innerHTML = 'ходы: ' + move;
            field_score.innerHTML = 'очки: ' + score;
        } else {
            console.log('2');
            logicGame();
        }
        return f;
        // empty = fillingEmptyBlocks(block_array_column);
        // requestAnimationFrame(logicGame);
    };
}

function btnContinue() {
    btn_continue.addEventListener('click', function (el) {
        console.log('1233');
        document.body.removeChild(pause_field_background);
    })
}

function btnToFinish() {
    btn_to_finish.addEventListener('click', function (el) {
        document.body.removeChild(pause_field_background);
        document.body.removeChild(div_field);

        menu();
    })
}

function pauseGame() {
    btn_pause.addEventListener('click', function (el) {
        document.body.prepend(pause_field_background);
        pause_field.prepend(logo);
        pause_field.append(btn_continue);
        pause_field.append(btn_to_finish);
        pause_field.append(btn_sound1);
        if (sound === true) {
            btn_sound1.innerHTML = 'звук вкл.';
        } else {
            btn_sound1.innerHTML = 'звук выкл.';
        }
        btn_sound1.addEventListener('click', function () {
            if (sound === true) {
                btn_sound1.innerHTML = 'звук выкл.';
                sound = false;
            } else {
                btn_sound1.innerHTML = 'звук вкл.';
                sound = true;
            }
        })
        btnContinue();
        btnToFinish();
    })
}

function logicGame() {
    canvas.setAttribute('width', width_canvas);
    canvas.setAttribute('height', height_canvas);
    screenWidth = window.screen.width;
    if (320 <= screenWidth && screenWidth < 699) {
        block_width = 34;
        block_height = 34;
        width_canvas = '316px';
        height_canvas = '316px';
    } else {
        block_width = 40;
        block_height = 40;
        width_canvas = '370px';
        height_canvas = '370px';
    }
    if (move <= 0 && score < final_score) {
        pause = true;
        document.body.prepend(div_finish_field_background);
        div_finish_field.append(div_game_over);
        div_finish_field.append(btn_to_finish1);
        btn_to_finish1.addEventListener('click', function (el) {
            document.body.removeChild(div_finish_field_background);
            document.body.removeChild(div_field);
            div_finish_field.removeChild(div_game_over);
            div_finish_field.removeChild(btn_to_finish1);
            menu();
        })
    } else if (move >= 0 && score >= final_score) {
        pause = true;
        document.body.prepend(div_finish_field_background);
        div_finish_field.append(div_win);
        div_finish_field.append(btn_to_finish2);
        btn_to_finish2.addEventListener('click', function (el) {
            document.body.removeChild(div_finish_field_background);
            document.body.removeChild(div_field);
            div_finish_field.removeChild(div_win);
            div_finish_field.removeChild(btn_to_finish2);
            menu();
        })
    } else {
        if (pause === false) {
            div_move.innerHTML = 'ходы: ' + move;
            field_score.innerHTML = 'очки: ' + score;
            console.log(move + ' - ' + score);
            drawBlock(block_array_column);
            f = clickBlock();
            fillingEmptyBlocks(block_array_column);
            requestAnimationFrame(logicGame);
        } else {
            menu();
        }
    }

}

function hud() {
    document.body.prepend(div_field);
    div_field.append(div_hud);
    div_hud.append(field_score);
    div_hud.append(btn_pause);
    return div_field;
}

function start() {
    if (play === true) {
        score = 0;
        move = 15;
        field = hud()
        field_score.innerHTML = 'очки: ' + 0;
        field.append(div_d_f_a_p);
        div_d_f_a_p.prepend(canvas);

        console.log(play);
        drawBlockArray();
        logicGame();
        pauseGame();
    }
}

function setting() {
    div_menu.prepend(logo);
    div_menu.append(btn_sound);
    div_menu.append(btn_back);
    if (sound === true) {
        btn_sound.innerHTML = 'звук вкл.';
    } else {
        btn_sound.innerHTML = 'звук выкл.';
    }
    btn_sound.addEventListener('click', function () {
        if (sound === true) {
            btn_sound.innerHTML = 'звук выкл.';
            sound = false;
        } else {
            btn_sound.innerHTML = 'звук вкл.';
            sound = true;
        }
    })
    btn_back.addEventListener('click', function () {
        div_menu.removeChild(btn_sound);
        div_menu.removeChild(btn_back);
        menu();
    })

}

function menu() {
    score = 0;
    move = 15;
    document.body.prepend(div_menu);
    div_menu.prepend(logo);
    div_menu.append(btn_play);
    div_menu.append(btn_setting);
    btn_play.addEventListener('click', function () {
        document.body.removeChild(div_menu);
        play = true;
        pause = false;
        drawBlockArray();
        start();
    })

    btn_setting.addEventListener('click', function (el) {
        div_menu.removeChild(btn_play);
        div_menu.removeChild(btn_setting);
        setting();
    })
}

window.onload = menu();
