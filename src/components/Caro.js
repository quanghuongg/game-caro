import Game from "./Game";
import React from "react";

class Caro extends React.Component {
    constructor(props) {
        super(props);
        this.newGame = this.newGame.bind(this);
        this.state = {
            game: () => <Game/>
        };
    }

    newGame() {
        this.setState({
            game: () => <Game/>
        });
    }

    render() {
        const ActiveGame = this.state.game;
        return (
            <div>
                <div className="btn-rs-game">
                    <button onClick={this.newGame}>RESET GAME</button>
                </div>

                <ActiveGame/>

            </div>
        );
    }
}

export default Caro;