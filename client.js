var manager= [];

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: false,
      value: 1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount(){
    manager = [];
    console.log("Hello I am in initializeData !!!!");
    $.ajax({
      async: true,
      type: 'GET',
      url: 'http://localhost:1337/getManagerName',
      dataType: 'json',
      success: function (data) {
        for (let i = 0; i < data.length; i++) {
          manager[i] = ({ managerID: data[i].ID, Name: data[i].Name});
        }
        //console.log(manager);
        this.setState({initial:true});
      }.bind(this),
    });
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }
  render() {
    if(this.state.initial){
      const managerInstances = manager.map((pInstance) =>
      <option key={pInstance.managerID} value={pInstance.managerID}>{pInstance.Name}</option>)
      return (
        <div className="manager-div">
        <form onSubmit={this.handleSubmit}>
          <label>
            Select the Manager:
            <select value={this.state.value} onChange={this.handleChange}>
              {managerInstances}
            </select>
          </label>
          <br></br>
          <input type="submit" value="Submit" />
        </form>
        </div>
      );
    }
    else{
      return <div>No result found for this subscription</div>;
    }
  }
}

ReactDOM.render(<Note />, document.getElementById('react'))
