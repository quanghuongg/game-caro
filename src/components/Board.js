import React from 'react'

import Square from './Square'
import SquareRow from './SquareRow '

class Board extends React.Component {
    renderSquare(i) {
        const { squares, onClick } = this.props
        return <Square value={squares[i]} onClick={() => onClick(i)} />
    }

    render() {
        const { squares, winner, onClick } = this.props
        const board = squares.map((row, idx) => {
            const k = `r${idx}`
            return (
                <SquareRow
                    winner={winner}
                    rowIdx={idx}
                    row={row}
                    onClick={onClick}
                    key={k}
                />
            )
        })
        return <div>{board}</div>
    }
}

export default Board
