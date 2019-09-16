import React from "react";

import Square from "./Square";


class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(400).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        let status;
        const winner = calculateWinner(this.state.squares);
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        let indents = [];
        for (let i = 0; i < 20; i++) {
            indents.push(<div className="board-row">
                {this.renderSquare(i * 20 + 1)}
                {this.renderSquare(i * 20 + 2)}
                {this.renderSquare(i * 20 + 3)}
                {this.renderSquare(i * 20 + 4)}
                {this.renderSquare(i * 20 + 5)}
                {this.renderSquare(i * 20 + 6)}
                {this.renderSquare(i * 20 + 7)}
                {this.renderSquare(i * 20 + 8)}
                {this.renderSquare(i * 20 + 9)}
                {this.renderSquare(i * 20 + 10)}
                {this.renderSquare(i * 20 + 11)}
                {this.renderSquare(i * 20 + 12)}
                {this.renderSquare(i * 20 + 13)}
                {this.renderSquare(i * 20 + 14)}
                {this.renderSquare(i * 20 + 15)}
                {this.renderSquare(i * 20 + 16)}
                {this.renderSquare(i * 20 + 17)}
                {this.renderSquare(i * 20 + 18)}
                {this.renderSquare(i * 20 + 19)}
                {this.renderSquare(i * 20 + 20)}
            </div>);
        }
        return (
            <div>
                {indents}
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}



function calculateWinner2 (row, column, char) {
    let results = [];
    let tempArr = [];
    let blockedHead = false;
    let blockedTail = false;
    let count = 0;


    // check for the HORIZONTAL line
    for (let i = column; i >= 0; i--) {
        let current = this.matrix[row][i];
        if (current === char) {
            count++;
            tempArr.push({ 'row': row, 'column': i });
        }
        else if (current !== '') {
            blockedHead = true;
            break;
        }
        else
            break;
    }
    for (let i = column + 1; i < this.columns; i++) {
        let current = this.matrix[row][i];
        if (current === char) {
            count++;
            tempArr.push({ 'row': row, 'column': i });
        }
        else if (current !== '') {
            blockedTail = true;
            break;
        }
        else
            break;
    }
    if ((count == 5 && !(blockedHead && blockedTail))) {
        results = results.concat(tempArr);
    }

    // check for the VERTICAL line
    tempArr = [];
    blockedHead = false;
    blockedTail = false;
    count = 0;
    for (let i = row; i >= 0; i--) {
        let current = this.matrix[i][column];
        if (current === char) {
            count++;
            tempArr.push({ 'row': i, 'column': column });
        }
        else if (current !== '') {
            blockedHead = true;
            break;
        }
        else
            break;
    }

    for (let i = row + 1; i < this.rows; i++) {
        let current = this.matrix[i][column];
        if (current === char) {
            count++;
            tempArr.push({ 'row': i, 'column': column });
        }
        else if (current !== '') {
            blockedTail = true;
            break;
        }
        else
            break;
    }
    if ((count == 5 && !(blockedHead && blockedTail))) {
        results = results.concat(tempArr);
    }

    // check for the DIAGONAL line
    tempArr = [];
    blockedHead = false;
    blockedTail = false;
    count = 0;
    for (let i = row, j = column; i >= 0 && j >= 0; i--, j--) {
        let current = this.matrix[i][j];
        if (current === char) {
            count++;
            tempArr.push({ 'row': i, 'column': j });
        }
        else if (current !== '') {
            blockedHead = true;
            break;
        }
        else
            break;
    }
    for (let i = row + 1, j = column + 1; i < this.rows && j < this.columns; i++, j++) {
        let current = this.matrix[i][j];
        if (current === char) {
            count++;
            tempArr.push({ 'row': i, 'column': j });
        }
        else if (current !== '') {
            blockedTail = true;
            break;
        }
        else
            break;
    }
    if ((count == 5 && !(blockedHead && blockedTail))) {
        results = results.concat(tempArr);
    }

    // check for the back DIAGONAL line
    tempArr = [];
    blockedHead = false;
    blockedTail = false;
    count = 0;
    for (let i = row, j = column; i >= 0 && j < this.columns; i--, j++) {
        let current = this.matrix[i][j];
        if (current === char) {
            count++;
            tempArr.push({ 'row': i, 'column': j });
        }
        else if (current !== '') {
            blockedHead = true;
            break;
        }
        else
            break;
    }
    for (let i = row + 1, j = column - 1; i < this.rows && j >= 0; i++, j--) {
        let current = this.matrix[i][j];
        if (current === char) {
            count++;
            tempArr.push({ 'row': i, 'column': j });
        }
        else if (current !== '') {
            blockedTail = true;
            break;
        }
        else
            break;
    }
    if ((count == 5 && !(blockedHead && blockedTail))) {
        results = results.concat(tempArr);
    }

    return results;
};

export default Board;