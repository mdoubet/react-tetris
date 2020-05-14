import React, { useState } from 'react';

import  { createStage, checkCollision } from "../gameHelpers";

//styled components
import { StyledTetrisWrapper } from "./styles/styledTetris";
import { StyledTetris } from "./styles/styledTetris";

//custom hooks
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";

//components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";


const Tetris = () => {

    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage(player, resetPlayer);

    console.log('re-render');

    const moveLaterally = dir => {
        if (!checkCollision(player, stage, {x: dir, y: 0})){
            updatePlayerPos({x: dir, y: 0});
        }
    }

    const startGame = () => {
        //reset everything
        setStage(createStage());
        resetPlayer();
        setGameOver(false);
    }
    const drop = () => {
        if(!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({x: 0, y: 1, collided: false})
        } else {
            // check for game over condition
            if(player.pos.y < 1) {
                console.log("GAME OVER !!!!");
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({ x: 0, y: 0, collided: true });
        }
    }
    const dropPlayer = () => {
        drop();
    }
    const move = ({ keyCode }) => {
        if (!gameOver) {
            if(keyCode === 37) { //37 is left arrow
                moveLaterally(-1) //moves player one to the left
            } else if (keyCode === 39) { //right arrow
                moveLaterally(1)         //move one to the right
            } else if (keyCode === 40){ //down arrow
                dropPlayer();
            }
        }

    }
    return (
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
            <StyledTetris>
                <Stage stage = {stage}/>
                <aside>
                    {gameOver? (
                        <Display gameOver={gameOver} text="Game Over" />
                    ) : (

                    <div>
                    <Display text="Score" />
                    <Display text="Rows" />
                    <Display text="Level" />
                    </div>
                    )}

                    <StartButton callback={startGame}/>
                </aside>

            </StyledTetris>
        </StyledTetrisWrapper>
    );
};



export default Tetris;