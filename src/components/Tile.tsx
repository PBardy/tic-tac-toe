import React from 'react';
import classNames from 'classnames';

export interface TileState {
  row: number;
  column: number;
  theme: string;
  value: string | null;
  onClick: any;
}

export interface TileProps {
  row: number;
  column: number;
  theme: string;
  value: string | null;
  onClick: any;
}

class Tile extends React.Component<TileProps, TileState> {

  public state: TileState;

  constructor(props: TileProps) {
    super(props);

    this.state = {
      row: props.row,
      column: props.column,
      value: props.value,
      theme: props.theme,
      onClick: props.onClick,
    };
  }

  public componentDidUpdate(prevProps: TileProps) {
    if(prevProps.value !== this.props.value) {
      this.setState({value: this.props.value});
    }
  }

  public render() {
    const classes = classNames({
      "App-Tile": true,
      "App-Tile--X": this.props.value === "X",
      "App-Tile--O": this.props.value === "O",
    });
    
    return (
      <div className={`${classes} ${this.props.theme}`} onClick={this.props.onClick}>
        {this.state.value}
      </div>
    )
  }
}

export default Tile;