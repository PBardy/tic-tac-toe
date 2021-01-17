import React from 'react';
import Tile from './Tile';

export interface BoardState {
  turns: number;
  width: number;
  height: number;
  ended: boolean;
  squares: Array<Array<string | null>>;
  theme: string;
}

export interface BoardProps {
  width: number;
  height: number;
  theme: string;
}

class Board extends React.Component<BoardProps, BoardState> {

  public state: BoardState;

  constructor(props: BoardProps) {
    super(props);

    this.state = {
      turns: 0,
      width: props.width,
      ended: false,
      height: props.height,
      squares: [],
      theme: props.theme,
    };

    this.state.squares = this.generate(props.width, props.height);
    this.handleTileClick = this.handleTileClick.bind(this);
  }

  private generate(width: number, height: number): Array<Array<any>> {
    const squares: Array<Array<any>> = new Array<Array<string | null>>();
    for (let row = 0; row < height; row++) {
      squares[row] = new Array(width);
      for (let column = 0; column < width; column++) {
        squares[row][column] = null;
      }
    }
    return squares;
  }

  private fullRow(marker: string): boolean {
    for (let row = 0; row < this.state.height; row++) {
      let rowCount: number = 0;
      for (let column = 0; column < this.state.width; column++) {
        if (this.state.squares[row][column] === marker) {
          rowCount++;
        }
      }
      if (rowCount === this.state.width) {
        return true;
      }
    }
    return false;
  }

  private fullColumn(marker: string): boolean {
    for (let column = 0; column < this.state.width; column++) {
      let columnCount: number = 0;
      for (let row = 0; row < this.state.height; row++) {
        if (this.state.squares[row][column] === marker) {
          columnCount++;
        }
      }
      if (columnCount === this.state.height) {
        return true;
      }
    }
    return false;
  }

  private fullDiagonal(marker: string): boolean {
    let diagonal1: number = 0;
    let diagonal2: number = 0;
    for (let step = 0; step < this.state.height; step++) {
      const opposite: number = this.state.height - step - 1;
      const val1: string | null = this.state.squares[step][step];
      const val2: string | null = this.state.squares[step][opposite];
      if (val1 === marker) diagonal1++;
      if (val2 === marker) diagonal2++;
      if (diagonal1 === this.state.height || diagonal2 === this.state.height) return true;
    }
    return false;
  }

  private restartGame(): void {
    this.setState({
      ended: false,
      squares: this.generate(this.state.width, this.state.height),
    });
  }

  private handleTileClick(row: number, column: number) {
    if (this.state.ended) return;
    if (row < 0 || row > this.state.height) return;
    if (column < 0 || column > this.state.width) return;
    if (this.state.squares[row][column] != null) return;

    const marker: string = this.state.turns % 2 == 0 ? 'X' : 'O';
    this.state.squares[row][column] = marker;
    this.setState(this.state);

    if (this.fullRow(marker) || this.fullColumn(marker) || this.fullDiagonal(marker)) {
      this.state.ended = true;
      return;
    }

    this.state.turns = this.state.turns + 1;
  }

  public componentDidUpdate(prevProps: BoardProps) {
    if (prevProps.width !== this.props.width || prevProps.height !== this.props.height) {
      this.setState({
        width: this.props.width,
        height: this.props.height,
        squares: this.generate(this.props.width, this.props.height),
      });
    }
  }

  public render() {
    const squares: Array<any> = [];

    this.state.squares.map((rowArray: Array<any>, row: number) => {
      rowArray.map((columnArray: Array<any>, column: number) => {
        squares.push(
          <Tile
            row={row}
            column={column}
            theme={this.props.theme}
            onClick={() => this.handleTileClick(row, column)}
            key={"_" + row + "_" + column}
            value={this.state.squares[row][column]}
          />
        )
      });
    });

    return (
      <div>
        <div
          className="App-Board"
          style={{
            gridTemplateRows: `repeat(${this.state.height}, 1fr)`,
            gridTemplateColumns: `repeat(${this.state.width}, 1fr)`,
          }}>
          {squares}
        </div>
        <div 
          id="App-End-Screen"
          onClick={() => this.restartGame()}
          className={`App-Overlay ${this.state.ended ? '' : 'App-Overlay--hidden'}`}>
          <h1>Game Over!</h1>
        </div>
      </div>
    );
  }

}

export default Board;