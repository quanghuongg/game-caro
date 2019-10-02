import React from 'react'

import Square from './Square'

const nSquareToWin = 5

// eslint-disable-next-line react/prefer-stateless-function
class SquareRow extends React.Component {
    render() {
        const { winner, row, rowIdx, onClick } = this.props
        const squareRow = row.map((square, idx) => {
            const k = `s${idx}`
            let win = false

            if (winner) {
                if (
                    winner.direction === 'ToRight' &&
                    idx >= winner.x &&
                    idx <= winner.x + nSquareToWin - 1 &&
                    rowIdx === winner.y
                ) {
                    win = true
                }
                if (
                    winner.direction === 'ToDown' &&
                    rowIdx >= winner.y &&
                    rowIdx <= winner.y + nSquareToWin - 1 &&
                    idx === winner.x
                ) {
                    win = true
                }
                if (
                    winner.direction === 'ToRightDown' &&
                    idx >= winner.x &&
                    idx <= winner.x + nSquareToWin - 1 &&
                    idx - winner.x === rowIdx - winner.y
                ) {
                    win = true
                }
                if (
                    winner.direction === 'ToLeftDown' &&
                    idx <= winner.x &&
                    idx >= winner.x - nSquareToWin + 1 &&
                    winner.x - idx === rowIdx - winner.y
                ) {
                    console.log(
                        `${winner.x} ${winner.y} ${idx} ${rowIdx} ${nSquareToWin}`
                    )
                    win = true
                }
            }
            return (
                <Square
                    win={win}
                    value={square}
                    onClick={() => onClick(rowIdx, idx)}
                    key={k}
                />
            )
        })
        return <div className="board-row">{squareRow}</div>
    }
}

export default SquareRow
