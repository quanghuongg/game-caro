import React from 'react'

function Square(props) {
    const { win, onClick, value } = props
    return win ? (
        <button
            type="submit"
            className="square square-highlight"
            onClick={onClick}
        >
            {value}
        </button>
    ) : (
        <button type="submit" className="square" onClick={onClick}>
            {value}
        </button>
    )
}

export default Square
