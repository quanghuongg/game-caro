import React from "react";

import Square from "./Square";
import SquareRow from "./SquareRow ";

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        let board;
        board = this.props.squares.map((row, idx) => {
            let k = "r" + idx;
            return (
                <SquareRow winner={this.props.winner} rowIdx={idx} row={row} onClick={this.props.onClick} key={k}/>
            )
        })
        return (
            <div>
                {board}
            </div>
        );
    }
}


export default Board;