import React from 'react'

import { createStage} from "../gameHelpers";
import { StyledTetrisWrapper } from "./styles/styledTetris";
import { StyledTetris } from "./styles/styledTetris";

import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";


const Tetris = () => {
    return (
        <StyledTetrisWrapper>
            <StyledTetris>
                <Stage stage = {createStage()}/>
                <aside>
                    <Display text="Score" />
                    <Display text="Rows" />
                    <Display text="Level" />
                </aside>
                <div>
                    <StartButton/>
                </div>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
};



export default Tetris;