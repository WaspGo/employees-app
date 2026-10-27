import { Component } from "react";
import "./app.css";
import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: "John C.",
          salary: 800,
          increase: false,
          promotion: false,
          id: 1,
        },
        {
          name: "Alex M.",
          salary: 3000,
          increase: false,
          promotion: false,
          id: 2,
        },
        {
          name: "Carl W.",
          salary: 5000,
          increase: false,
          promotion: false,
          id: 3,
        },
      ],
      term: "",
      state: "",
    };
    this.maxId = 3;
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      return {
        data: data.filter((item) => item.id !== id),
      };
    });
  };

  addItem = (name, salary) => {
    if (
      /[|\\/~^:,;?!&%$@*+]/gi.test(name) === false &&
      name.length >= 3 &&
      salary.length > 0
    ) {
      this.maxId++;
      this.setState(({ data }) => {
        let newArr = [...data];
        newArr.push({
          name: name,
          salary: salary,
          increase: false,
          promotion: false,
          id: this.maxId,
        });
        return {
          data: newArr,
        };
      });
    }
  };

  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            [prop]: !item[prop],
          };
        }
        return item;
      }),
    }));
  };

  getEmployeeAmount = () => {
    let arr = [];
    this.state.data.forEach((item) => {
      arr.push(item);
    });
    return arr.length.toString();
  };

  getIncreaseAmount = () => {
    let arr = [];
    this.state.data.forEach((item) => {
      if (item.increase) {
        arr.push(item.increase);
      }
    });
    return arr.length.toString();
  };

  searchEmp = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.name.indexOf(term) > -1;
    });
  };

  onUpdateSearch = (term) => {
    this.setState({ term });
  };

  onUpdateState = (state) => {
    this.setState({ state });
  };

  render() {
    const { data, term, state } = this.state;
    let visibleData = this.searchEmp(data, term);
    if (state === "all") {
      visibleData = data;
    } else if (state === "promotion") {
      visibleData = data.filter((item) => {
        return item.promotion === true;
      });
    } else if (state === "more") {
      visibleData = data.filter((item) => {
        return item.salary > 1000;
      });
    }
    visibleData = this.searchEmp(visibleData, term);
    return (
      <div className="app">
        <AppInfo
          getEmployeeAmount={this.getEmployeeAmount}
          getIncreaseAmount={this.getIncreaseAmount}
        />

        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter onUpdateState={this.onUpdateState} />
        </div>
        <EmployeesList
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
        />
        <EmployeesAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
