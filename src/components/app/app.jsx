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
      filter: "all",
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
      /[|\\/~^:,;?!&%$@*+0-9]/gi.test(name) === false &&
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
    } else {
      window.alert("Невірно введено імʼя або З/П");
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

  filterPost = (items, filter) => {
    switch (filter) {
      case "promotion":
        return items.filter((item) => item.promotion);
      case "moreThan1000":
        return items.filter((item) => item.salary > 1000);
      default:
        return items;
    }
  };

  onFilterSelect = (filter) => {
    this.setState({ filter });
  };

  onUpdateValue = (id, salary) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            salary: salary,
          };
        }
        return item;
      }),
    }));
  };

  render() {
    const { data, term, filter } = this.state;
    const visibleData = this.filterPost(this.searchEmp(data, term), filter);

    return (
      <div className="app">
        <AppInfo
          getEmployeeAmount={this.getEmployeeAmount}
          getIncreaseAmount={this.getIncreaseAmount}
        />

        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
        </div>
        <EmployeesList
          onUpdateValue={this.onUpdateValue}
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
