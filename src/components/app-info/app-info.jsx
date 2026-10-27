import "./app-info.css";

const AppInfo = (props) => {
  const { getEmployeeAmount, getIncreaseAmount } = props;
  return (
    <div className="app-info">
      <h1>Облік співробітників у компанії N</h1>
      <h2>Загальна кількість співробітників: {getEmployeeAmount()} </h2>
      <h2>Премію отримають: {getIncreaseAmount()}</h2>
    </div>
  );
};

export default AppInfo;
