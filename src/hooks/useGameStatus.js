import { useState, useEffect, useCallback} from 'react';

export const useGameStatus = rowsCleared => {
    const [score, setScore] = useState(0);
    const [rows, setRows] = useState(0);
    const [level, setLevel] = useState(1);
    const [timerInterval, setTimerInterval] = useState(800)

    const linePoints = [40, 100, 300, 1200];

    const calcScore = useCallback(() => { //why is calcScore useCallback and not useEffect?
        //check if we have scored
        if(rowsCleared > 0){


            setScore(prevState => prevState + linePoints[rowsCleared/2 - 1] * level);
            setRows(prev => prev + rowsCleared/2);

        }
        // Level Up & increase speed when 10 rows are cleared
        console.log("rows : ", rows);
        if(rows > ((level * 3) - 1)) {
            setLevel(prev => (prev + 1));
            setTimerInterval(prev => (prev * .7 + 50));

        }


    }, [rows, level, linePoints, rowsCleared])

    useEffect(()=>{
        calcScore();
    }, [calcScore, rowsCleared, score])

    return [score, setScore, rows, setRows, level, setLevel, timerInterval, setTimerInterval]

}