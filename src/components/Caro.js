import React from 'react'
import Game from './Game'
import { Button } from 'react-bootstrap'
class Caro extends React.Component {
    constructor(props) {
        super(props)
        this.newGame = this.newGame.bind(this)
        this.state = {
            game: () => <Game history={this.props.history}/>
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
                    <Button align="center" variant="light" type="submit" onClick={this.newGame}>
                        RESET GAME
                    </Button>
                </div>

                <ActiveGame />
            </div>
        )
    }
}

export default Caro
