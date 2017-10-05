var manager = [];
class AddEmployeePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: false,
      employeeName:'',
      dept:'',
      dob:'',
      phoneNumber:'',
      managerId:'1001'
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addEmployee = this.addEmployee.bind(this);
  }
  componentWillMount(){
    manager = [];
    $.ajax({
      async: true,
      type: 'GET',
      url: 'http://localhost:1337/getAllEmployee',
      dataType: 'json',
      success: function (data) {
        for (let i = 0; i < data.length; i++) {
          manager[i] = ({ managerID: data[i].empId, Name: data[i].empName});
        }
        this.setState({initial:true});
      }.bind(this),
    });
  }

  addEmployee(){
    var state = this.state;
    var employee = {
    'employee': state,
    }
    $.ajax({
      type: 'POST',
      url: "http://localhost:1337/addEmployee",
      data: JSON.stringify(employee),
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
      }.bind(this),
    });
  }

  handleInputChange(e) {
    e.preventDefault();
    var name = e.target.name;
    var state = this.state;
    state[name] = e.target.value;
    this.setState(state);
  }

  render() {
    if(this.state.initial){
      const managerInstances = manager.map((pInstance) =>
      <option key={pInstance.managerID} name="managerId" value={pInstance.managerID}>{pInstance.Name}</option>)
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
      <br />
      <div className="row">
        <div className="input-field col s6">
          <input id="EmployeeName" name="employeeName" type="text" onChange={this.handleInputChange} className="validate" />
          <label className="active">Name</label>
        </div>
        <div className="input-field col s6">
          <input name="dept" id="dept" type="text" onChange={this.handleInputChange} className="validate" />
          <label className="active">Department</label>
          </div>
        <div className="input-field col s6">
          <input name="dob" id="DOB" type="text" onChange={this.handleInputChange} className="validate" />
          <label className="active">Date Of Birth (mm/dd/yyyy)</label>
          </div>
          <div className="input-field col s6">
          <input id="EmployeePhoneNumber" name="phoneNumber" type="text" onChange={this.handleInputChange} className="validate" />
          <label className="active">Phone Number</label>
        </div>
        <div className="input-field col s6">
          <select name="managerId" onChange={this.handleInputChange}>
            {managerInstances}
          </select>
        </div>
        <div className="input-field col s6">
        <button className="btn waves-effect waves-light" onClick={this.addEmployee}>Submit
    <i className="material-icons right">send</i>
</button>
</div>
      </div>
      </div>
    );
  }else{
      return <div>No result found for this subscription</div>;
  }
  }
}

ReactDOM.render(<AddEmployeePage />, document.getElementById('react'))
