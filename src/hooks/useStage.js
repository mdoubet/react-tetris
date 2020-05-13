import { useState, useEffect } from 'react';
import { createStage } from "../gameHelpers";

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage());

    useEffect(()=> {
        const updateStage = prevStage => {
            //first flush the stage
            //i.e. make sure all cells marked 'clear' have a 0
            const newStage = prevStage.map(row =>
            row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)),
            );

            //draw the tetromino
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) =>{
                    if (value !== 0){
                        newStage[y + player.pos.y][x + player.pos.x] =[
                            value,
                            `${player.collided ? 'merged' : 'clear'}`,
                        ];
                    }
                });
            });
            return newStage;
        };

        setStage(prev => updateStage(prev))
    }, [player.collided, player.pos.x, player.pos.y, player.tetromino]);

    return [stage, setStage];
}