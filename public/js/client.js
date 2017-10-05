var manager= [];
var employeeList = [];
class DisplayPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: false,
      value: 1,
      id : 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.getEmployee = this.getEmployee.bind(this);
  }
  componentWillMount(){
    manager = [];
    $.ajax({
      async: true,
      type: 'GET',
      url: 'http://localhost:1337/getManagerName',
      dataType: 'json',
      success: function (data) {
        for (let i = 0; i < data.length; i++) {
          manager[i] = ({ managerID: data[i].ManagerId, Name: data[i].ManagerName});
        }
        this.setState({initial:true});
      }.bind(this),
    });
  }

  getEmployee(event) {
    employeeList = [];
    if(event!= null){
      var lookup = {"ManagerId" : "" + event.target.name};
    }else{
      var lookup = {"ManagerId" : "1"};
    }
    $.ajax({
      type: 'POST',
      url: "http://localhost:1337/getEmployee",
      data: JSON.stringify(lookup),
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        var managerID = data[0].ManagerID;
        for (let i = 0; i < data.length; i++) {
          employeeList[i] = ({ Employee_ID: data[i].empId, Employee_Name: data[i].empName, Employee_Dept: data[i].empDept, Employee_DOB: data[i].empdob , Employee_PhnNumber: data[i].empphnnumber });
        }
        this.setState({id:managerID});
      }.bind(this),
    });
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    if(this.state.initial){
      const employeeInstances = employeeList.map((eInstance) =>
      <tr><td>{eInstance.Employee_ID}</td><td>{eInstance.Employee_Name}</td><td>{eInstance.Employee_Dept}</td><td>{eInstance.Employee_DOB}</td><td>{eInstance.Employee_PhnNumber}</td></tr>)

      const managerInstances = manager.map((pInstance) =>
      <a key={pInstance.managerID} name={pInstance.managerID} value={pInstance.managerID} onClick={this.getEmployee} className="collection-item">{pInstance.Name}</a>)
      return (
        <div>
        <nav>
        <div className="nav-wrapper">
        <a href="#" className="brand-logo right">Logo</a>
        <ul id="nav-mobile" className="left hide-on-med-and-down">
        <li><a href="../Pages/view.html">View</a></li>
        <li><a href="../Pages/index.html">Add Employee</a></li>
        </ul>
        </div>
        </nav>
        <div className="row">
        <div className="col s4">
        <div className="collection">
        {managerInstances}
        </div>
        </div>
        <div className="col s6">
        <table className="striped">
        <thead>
        <tr>
        <th>Employee ID</th>
        <th>Name</th>
        <th>Department</th>
        <th>Date Of Birth</th>
        <th>Phone Number</th>
        </tr>
        </thead>
        <tbody>
        {employeeInstances}
        </tbody>
        </table>
        </div>
        </div>
        </div>
      );
    }
    else{
      return <div>No result found for this subscription</div>;
    }
  }
}

ReactDOM.render(<DisplayPage />, document.getElementById('react'))
