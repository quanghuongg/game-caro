import { connect } from 'react-redux';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import io from 'socket.io-client';
import $ from 'jquery';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      row: 20,
      column: 20,
      arrayPlay: [],
      url: 'https://rest-api-jwt.herokuapp.com',
      isXTurn: true,
      isWin: false,
      arrayChoose: [],
      isDecrease: false,
      type: '',
      isShowTable: false,
      objMatch: undefined,
      symbolPlay: 'X',
      message: '',
      isShowChat: true
    };
    this.pattern = '';
    this.patternId = '';
    for (let i = 0; i < this.state.row; i++) {
      this.state.arrayPlay[i] = [];
      for (let j = 0; j < this.state.column; j++) {
        this.state.arrayPlay[i][j] = 0;
      }
    }

    this.socket = {};
  }

  handleWin() {
    let arrayCalc = this.state.arrayPlay;
    for (let i = 0; i < this.state.row; i++) {
      for (let j = 0; j < this.state.column; j++) {
        // Row
        if (j < this.state.column - 5 &&
          arrayCalc[i][j] + arrayCalc[i][j + 1] + arrayCalc[i][j + 2] + arrayCalc[i][j + 3] + arrayCalc[i][j + 4] === 5) {
          this.hightlight('row', i, j);
          this.props.dispatch({
            type: 'XWin'
          });
          this.setState({ isWin: true });
          return true;
        }
        if (j < this.state.column - 5 &&
          arrayCalc[i][j] + arrayCalc[i][j + 1] + arrayCalc[i][j + 2] + arrayCalc[i][j + 3] + arrayCalc[i][j + 4] === -5) {
          this.hightlight('row', i, j);
          alert('O Win');
          this.props.dispatch({
            type: 'OWin'
          });
          this.setState({ isWin: true });
          return true;
        }
        // Column
        if (i < this.state.row - 5 &&
          arrayCalc[i][j] + arrayCalc[i + 1][j] + arrayCalc[i + 2][j] + arrayCalc[i + 3][j] + arrayCalc[i + 4][j] === 5) {
          this.hightlight('column', i, j);
          alert('X Win');
          this.props.dispatch({
            type: 'XWin'
          });
          this.setState({ isWin: true });
          return true;
        }
        if (i < this.state.row - 5 &&
          arrayCalc[i][j] + arrayCalc[i + 1][j] + arrayCalc[i + 2][j] + arrayCalc[i + 3][j] + arrayCalc[i + 4][j] === -5) {
          this.hightlight('column', i, j);
          alert('O Win');
          this.props.dispatch({
            type: 'OWin'
          });
          this.setState({ isWin: true });
          return true;
        }
        // Cross line
        // Right
        if (i < this.state.row - 5 && j < this.state.column - 5 &&
          arrayCalc[i][j] + arrayCalc[i + 1][j + 1] + arrayCalc[i + 2][j + 2] + arrayCalc[i + 3][j + 3] + arrayCalc[i + 4][j + 4] === 5) {
          this.hightlight('cross-right', i, j);
          alert('X Win');
          this.props.dispatch({
            type: 'XWin'
          });
          this.setState({ isWin: true });
          return true;
        }
        if (i < this.state.row - 5 && j < this.state.column - 5 &&
          arrayCalc[i][j] + arrayCalc[i + 1][j + 1] + arrayCalc[i + 2][j + 2] + arrayCalc[i + 3][j + 3] + arrayCalc[i + 4][j + 4] === -5) {
          this.hightlight('cross-right', i, j);
          alert('O Win');
          this.props.dispatch({
            type: 'OWin'
          });
          this.setState({ isWin: true });
          return true;
        }
        // Left
        if (i >= 4 && j < this.state.column - 5 &&
          arrayCalc[i][j] + arrayCalc[i - 1][j + 1] + arrayCalc[i - 2][j + 2] + arrayCalc[i - 3][j + 3] + arrayCalc[i - 4][j + 4] === 5) {
          this.hightlight('cross-left', i, j);
          alert('X Win');
          this.props.dispatch({
            type: 'XWin'
          });
          this.setState({ isWin: true });
          return true;
        }
        if (i >= 4 && j < this.state.column - 5 &&
          arrayCalc[i][j] + arrayCalc[i - 1][j + 1] + arrayCalc[i - 2][j + 2] + arrayCalc[i - 3][j + 3] + arrayCalc[i - 4][j + 4] === -5) {
          this.hightlight('cross-left', i, j);
          alert('O Win');
          this.props.dispatch({
            type: 'OWin'
          });
          this.setState({ isWin: true });
          return true;
        }
      }
    }
    return false;
  }

  hightlight(type, iStart, jStart) {
    var arrayHighlight = [];
    switch (type) {
      case 'row':
        arrayHighlight.push(...[`${iStart}-${jStart}`, `${iStart}-${jStart + 1}`, `${iStart}-${jStart + 2}`, `${iStart}-${jStart + 3}`, `${iStart}-${jStart + 4}`]);
        break;
      case 'column':
        arrayHighlight.push(...[`${iStart}-${jStart}`, `${iStart + 1}-${jStart}`, `${iStart + 2}-${jStart}`, `${iStart + 3}-${jStart}`, `${iStart + 4}-${jStart}`]);
        break;
      case 'cross-right':
        arrayHighlight.push(...[`${iStart}-${jStart}`, `${iStart + 1}-${jStart + 1}`, `${iStart + 2}-${jStart + 2}`, `${iStart + 3}-${jStart + 3}`, `${iStart + 4}-${jStart + 4}`]);
        break;
      case 'cross-left':
        arrayHighlight.push(...[`${iStart}-${jStart}`, `${iStart - 1}-${jStart + 1}`, `${iStart - 2}-${jStart + 2}`, `${iStart - 3}-${jStart + 3}`, `${iStart - 4}-${jStart + 4}`]);
        break;
      default:
        break;
    }
    arrayHighlight.forEach((ele) => {
      document.getElementById(ele).style.backgroundColor = 'green';
    });
  }

  logoutClick(e) {
    this.props.dispatch({
      type: 'Logout'
    });
    localStorage.setItem('username', '');
    this.props.history.push('/login');
  }

  renderRedirect() {
    if (!this.props.isLogged && !localStorage.getItem('logged')) {
      return (
        <Redirect to='/login'/>
      );
    } else {
      return (
        <div>
          <div align="right" className="p2 f-right">
            <Button variant="danger" type="button" onClick={(e) => {
              this.logoutClick(e);
            }}>Logout</Button>
          </div>
        </div>
      );
    }
  }

  changeType(e) {
    var me = this;
    let type = e.target.getAttribute('id');
    this.setState({
      'type': type,
      'isShowTable': type === 'machine'
    });

    if (type === 'people') {
      let socket = io.connect(me.state.url);
      socket.on('connect', () => {
        socket.emit('register', { socketId: socket.id, username: localStorage.getItem('username'), status: 'waiting' });
      });

      socket.on('Founded', (data) => {
        me.startMatch(data);
      });

      socket.on('newMessage', (data) => {
        $('.chat-message').append('<p class=\'message-chat\'><span class=\'c-blue\'>' + me.pattern + '</span>: ' + data.message + '</p>');
        $('.chat-message').scrollTop(9999);
      });

      socket.on('newClick', (data) => {
        me.handleClickPlayWithPeople(data.position.row, data.position.column, true);
      });
    }

  }

  startMatch(data) {
    var me = this;
    let symbol = 'O';
    if (localStorage.getItem('username') === data.player1_username) {
      symbol = 'X';
      me.pattern = data.player2_username;
      me.patternId = data.player2_id;
    } else {
      me.pattern = data.player1_username;
      me.patternId = data.player1_id;
    }
    me.setState({
      objMatch: data,
      isShowTable: true,
      symbolPlay: symbol
    });

  }

  render() {
    return (
      <div>
        <div className="p-2 menu-user">{this.renderRedirect()}</div>
        <div className={this.state.type ? 'hidden' : 'choose'}>
          <button className="btn btn-warning m-2" id="machine" onClick={(e) => {
            this.changeType(e);
          }}>Chơi với máy
          </button>
          <button className="btn btn-warning m-2" id="people" onClick={(e) => {
            this.changeType(e);
          }}>Chơi với người
          </button>
        </div>
        <div className={this.state.type && !this.state.isShowTable ? '' : 'hidden'}>
          <div className="loader"></div>
          <div>Finding Player ...</div>
        </div>
        <div className={this.state.isShowTable ? 'container' : 'container hidden'}>
          <div className="wrapper">
            <div className="info-turn">Next Player : {this.state.isXTurn ? (<span className="c-red">X</span>) :
              <span className="c-blue">O</span>}</div>
            <div className="table-caro">
              {this.createTableCaro(this.state.row, this.state.column)}
            </div>
          </div>
          <div className="ListMove" align="right">
            <div>History</div>
            <table>
              <thead>
              <tr>
                <td>Number</td>
                <td>Player</td>
                <td>Positoin</td>
              </tr>
              </thead>
              <tbody>
              {
                this.state.arrayChoose.map((ele, index) => {
                  let hightlight = 0;
                  if (!this.state.isDecrease) {
                    hightlight = this.state.arrayChoose.length - 1;
                  }
                  return (
                    <tr key={index} className={hightlight === index ? 'active' : ''}>
                      <td>{ele.turn}</td>
                      <td>{ele.person}</td>
                      <td>{ele.position}</td>
                    </tr>
                  );
                })
              }
              </tbody>
            </table>
            <div align="center" style={{ marginTop: 10 }}>
              <button className="btn btn-primary btn-sort mr-2" onClick={() => {
                this.handleSort();
              }}>Sort
              </button>
              <button className="btn btn-info btn-sort ml-2" onClick={() => {
                this.handleUndo();
              }}>Undo
              </button>
            </div>
          </div>
          <div className={this.state.isShowChat ? 'chatbox' : 'chatbox offchat'}>
            <div className="chatcontent">
              <div className="chat-label" onClick={(e) => {
                this.toggleChat();
              }}>Chatting
              </div>
              <div className="chat-message"></div>
            </div>
            <div className="chat-bottom">
              <input className="form-control" placeholder={'Input text ' + this.pattern} type="text"
                     value={this.state.message} name="message" onChange={(e) => {
                this.handleChange(e);
              }}/>
              <button className="btn btn-primary ml-1" onClick={(e) => {
                this.sendMessage();
              }}>Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );

  }

  toggleChat() {
    let toggle = !this.state.isShowChat;
    this.setState({
      isShowChat: toggle
    });
  }

  handleSort() {
    //Reverse array
    let arrayTemp = this.state.arrayChoose;
    arrayTemp = arrayTemp.reverse();
    let sort = !this.state.isDecrease;
    this.setState({
      arrayChoose: arrayTemp,
      isDecrease: sort
    });
  }

  createTableCaro(numberOfRows, numberOfColumns) {
    let table = [];
    for (let i = 0; i <= numberOfRows; i++) {
      let row = [];
      for (let j = 0; j <= numberOfColumns; j++) {
        if (i === 0 || j === 0) {
          if (i === 0 && j === 0) {
            row.push(<span key={j}></span>);
          } else {
            //A in asc ii = 65
            if (i === 0) {
              let charTemp = String.fromCharCode(65 + j - 1);
              row.push(<span key={j}>{charTemp}</span>);
            } else {
              row.push(<span key={j}>{i - 1}</span>);
            }
          }
        } else {
          row.push(
            <button id={`${i - 1}-${j - 1}`} onClick={() => this.handleClick(i - 1, j - 1)} key={j}>
              {this.state.arrayPlay[i - 1][j - 1] === 1 ? (<span className="c-red">X</span>) : ''}
              {this.state.arrayPlay[i - 1][j - 1] === -1 ? (<span className="c-blue">O</span>) : ''}
            </button>);
        }
      }
      table.push(<div key={i} className="row">{row}</div>);
    }
    return table;
  }

  handleClick(row, column, e) {
    // X first
    if (this.state.type === 'machine') this.handleClickPlayWithMachine(row, column);
    if (this.state.type === 'people') this.handleClickPlayWithPeople(row, column);

  }

  handleClickPlayWithMachine(row, column) {
    // Get turn
    if (this.state.arrayPlay[row][column] !== 0 || this.state.isWin || !this.state.isXTurn) {
      return;
    }
    let arrClone = this.state.arrayPlay;
    let chooseClone = this.state.arrayChoose;
    let move = {};
    move.turn = Math.floor((chooseClone.length / 2) + 1);
    move.position = String.fromCharCode(65 + column) + row;
    arrClone[row][column] = 1;
    move.person = 'X';
    if (this.state.isDecrease) {
      chooseClone.unshift(move);
    } else chooseClone.push(move);
    this.setState({
      arrayPlay: arrClone,
      isXTurn: false,
      arrayChoose: chooseClone
    });
    if (this.handleWin()) return;
    // Machine
    let chooseObj = this.getMachinePlay(row, column, Math.random() > 0.5 ? 'row' : 'column');
    move = {};
    move.turn = Math.floor((chooseClone.length / 2) + 1);
    move.position = String.fromCharCode(65 + chooseObj.column) + chooseObj.row;
    arrClone[chooseObj.row][chooseObj.column] = -1;
    move.person = 'O';
    if (this.state.isDecrease) {
      chooseClone.unshift(move);
    } else chooseClone.push(move);
    this.setState({
      arrayPlay: arrClone,
      isXTurn: true,
      arrayChoose: chooseClone
    });
    this.handleWin();

  }

  handleClickPlayWithPeople(row, column, force = false) {
    var me = this;
    let isMyTurn = false;
    if (this.state.symbolPlay === 'X' && this.state.isXTurn) isMyTurn = true;
    if (this.state.symbolPlay === 'O' && !this.state.isXTurn) isMyTurn = true;
    // Get turn
    if (!force) {
      if (this.state.arrayPlay[row][column] !== 0 || this.state.isWin || !isMyTurn) {
        return;
      }
    }
    let arrClone = this.state.arrayPlay;
    let chooseClone = this.state.arrayChoose;
    let move = {};
    move.turn = Math.floor((chooseClone.length / 2) + 1);
    move.position = String.fromCharCode(65 + column) + row;
    arrClone[row][column] = -1;
    let symbol = 'O';
    if ((!force && this.state.symbolPlay === 'X') || (force && this.state.symbolPlay === 'O')) {
      arrClone[row][column] = 1;
      symbol = 'X';
    }
    move.person = symbol;
    if (this.state.isDecrease) {
      chooseClone.unshift(move);
    } else chooseClone.push(move);
    let turnNext = !this.state.isXTurn;
    this.setState({
      arrayPlay: arrClone,
      isXTurn: turnNext,
      arrayChoose: chooseClone
    });
    if (!force) {
      // Emit to patern
      let socket = io.connect(this.state.url);
      socket.emit('sendClick', {
        to: me.patternId,
        position: {
          row: row,
          column: column
        }
      });
    }
    if (this.handleWin()) return;
  }

  getMachinePlay(row, column, increase) {
    let choose = {
      row: row,
      column: column
    };
    if (this.state.arrayPlay[row][column] === 0) return choose;
    if (increase === 'row') return this.getMachinePlay(row + 1, column, 'column');
    if (increase === 'column') return this.getMachinePlay(row, column + 1, 'row');
  }

  handleUndo() {
    let isDecrease = this.state.isDecrease;
    let arrayTemp = this.state.arrayChoose;

    if (!isDecrease) {
      //Reverse array
      arrayTemp = arrayTemp.reverse();
    }
    if (arrayTemp.length >= 2) {
      let pos1 = this.getPosition(arrayTemp[0].position);
      let pos2 = this.getPosition(arrayTemp[1].position);
      arrayTemp.splice(0, 2);
      if (!isDecrease) {
        //Reverse array
        arrayTemp = arrayTemp.reverse();
      }
      let arrayPlayTemp = this.state.arrayPlay;
      arrayPlayTemp[pos1.row][pos1.column] = 0;
      arrayPlayTemp[pos2.row][pos2.column] = 0;
      this.setState({
        arrayPlay: arrayPlayTemp,
        arrayChoose: arrayTemp
      });
    }

  }

  getPosition(position) {
    let row = position;
    row = row.substr(1, row.length);
    let obj = {
      row: parseInt(row),
      column: position.charCodeAt(0) - 'A'.charCodeAt(0)
    };
    return obj;
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  sendMessage() {
    let socket = io.connect(this.state.url);

    // Emit send message
    socket.emit('sendMessage', { to: this.patternId, message: this.state.message });
    $('.chat-message').append('<p class=\'message-chat\'><span class=\'c-red\'>' + localStorage.getItem('username') + '</span>: ' + this.state.message + '</p>');
    $('.chat-message').scrollTop(9999);

    this.setState({
      message: ''
    });

    // Clear Input
    document.querySelector('[name=\'message\']').value = '';
  }
}

function mapStateToProps(state) {
  return {
    isLogged: state.isLogged
  };
};
export default connect(mapStateToProps)(Game);
