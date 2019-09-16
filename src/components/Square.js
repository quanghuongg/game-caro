import React from "react";
//
// export default function Square({ onClick, value }) {
//     return (
//         <button className="square" onClick={onClick}>
//             {value}
//         </button>
//     );
// }
class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {
        return (
            <button
                className="square"
                onClick={() => this.props.onClick()}
            >
                {this.props.value}
            </button>
        );
    }
}
export default Square;