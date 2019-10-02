import React from 'react'
import Game from './Game'

class Caro extends React.Component {
    constructor(props) {
        super(props)
        this.newGame = this.newGame.bind(this)
        this.state = {
            game: () => <Game />
        }
    }

    newGame() {
        this.setState({
            game: () => <Game />
        })
    }

    render() {
        const { game } = this.state
        const ActiveGame = game
        return (
            <div>
                <div className="btn-rs-game">
                    <button type="submit" onClick={this.newGame}>
                        RESET GAME
                    </button>
                </div>

                <ActiveGame />
            </div>
        )
    }
}

export default Caro
