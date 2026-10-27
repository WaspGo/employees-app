import { Component } from "react";
import "./app-filter.css";

class AppFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: [
        "btn btn-light",
        "btn btn-outline-light",
        "btn btn-outline-light",
      ],
    };
  }

  render() {
    const { onUpdateState } = this.props;
    const { state } = this.state;
    return (
      <div className="btn-group">
        <button
          className={`${state[0]}`}
          type="button"
          id="0"
          onClick={(e) => {
            onUpdateState("all");
            state.forEach((item, index) => {
              state[index] = "btn btn-outline-light";
            });
            state.forEach((item, index) => {
              if (index == e.target.id) {
                state[index] = "btn btn-light";
              }
            });
          }}
        >
          Всі співробітники
        </button>
        <button
          className={`${state[1]}`}
          type="button"
          id="1"
          onClick={(e) => {
            onUpdateState("promotion");
            state.forEach((item, index) => {
              state[index] = "btn btn-outline-light";
            });
            state.forEach((item, index) => {
              if (index == e.target.id) {
                state[index] = "btn btn-light";
              }
            });
          }}
        >
          На підвищення
        </button>
        <button
          className={`${state[2]}`}
          type="button"
          id="2"
          onClick={(e) => {
            onUpdateState("more");
            state.forEach((item, index) => {
              state[index] = "btn btn-outline-light";
            });
            state.forEach((item, index) => {
              if (index == e.target.id) {
                state[index] = "btn btn-light";
              }
            });
          }}
        >
          З/П більше 1000$
        </button>
      </div>
    );
  }
}

export default AppFilter;
