import './App.css';
import React, { ChangeEvent } from 'react';
import Board from './components/Board';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTextWidth, faTextHeight, faBars } from '@fortawesome/free-solid-svg-icons';


export interface AppProps {}

export interface AppState {
  theme: string;
  boardWidth: number;
  boardHeight: number;
}

class App extends React.Component<AppProps, AppState> {

  public static minBoardWidth: number = 3;
  public static maxBoardWidth: number = 6;
  public static minBoardHeight: number = 3;
  public static maxBoardHeight: number = 6;

  public state: AppState;

  constructor(props: AppProps) {
    super(props);

    this.state = {
      boardWidth: 3,
      boardHeight: 3,
      theme: "theme-1",
    };
  }

  private updateBoardWidth(event: ChangeEvent<HTMLInputElement>): void {
    const width: number = Number.parseInt(event.target.value);
    if (width == null) return;
    if (width < App.minBoardWidth || width > App.maxBoardWidth) return;
    this.setState({ boardWidth: width });
  }

  private updateBoardHeight(event: ChangeEvent<HTMLInputElement>): void {
    const height: number = Number.parseInt(event.target.value);
    if (height == null) return;
    if (height < App.minBoardHeight || height > App.maxBoardHeight) return;
    this.setState({ boardHeight: height });
  }

  public render() {
    return (
      <div className={`App ${this.state.theme}`}>
        <header className={`App-Header ${this.state.theme}`}>
          <div className="App-Header__inner">
            <div className="App-Header__menu">
              <div className="App-Header__menu-container">
                <FontAwesomeIcon icon={faBars} />
              </div>
            </div>
            <div className="App-Header__sizes">
              <div className="App-Header__sizes-container">
                <FontAwesomeIcon icon={faTextWidth} />
                <input
                  type="number"
                  id="Board-Width"
                  min={App.minBoardWidth}
                  max={App.maxBoardWidth}
                  value={this.state.boardWidth} 
                  className={`${this.state.theme}`}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => this.updateBoardWidth(event)} />
                <FontAwesomeIcon icon={faTextHeight} />
                <input
                  type="number"
                  id="Board-Height" 
                  min={App.minBoardHeight}
                  max={App.maxBoardHeight}
                  value={this.state.boardHeight}
                  className={`${this.state.theme}`}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => this.updateBoardHeight(event)} />
              </div>
            </div>
            <div className="App-Header__colors">
              <div className="App-Header__colors-container">
                <div className="App-Color-Picker" onClick={() => this.setState({ theme: "theme-1" })} title="Blue Theme"></div>
                <div className="App-Color-Picker" onClick={() => this.setState({ theme: "theme-2" })} title="Green Theme"></div>
                <div className="App-Color-Picker" onClick={() => this.setState({ theme: "theme-3" })} title="Red Theme"></div>
                <div className="App-Color-Picker" onClick={() => this.setState({ theme: "theme-4" })} title="Dark Theme"></div>
              </div>
            </div>
          </div>
        </header>
        <Board width={this.state.boardWidth} height={this.state.boardHeight} theme={this.state.theme} />
      </div>
    );
  }

}

export default App;
