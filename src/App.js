import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            fetchUrl: "http://127.0.0.1:8000/tasks",
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.completeItem = this.completeItem.bind(this);
    }
    fetchTaskList() {
        axios.get(this.state.fetchUrl)
            .then(result => {

                this.setState({
                    data: result.data,
                });
                console.log(this.state);
            })
    }
    componentDidMount() {
        this.fetchTaskList();

    }
    completeItem(url) {
        var remainder = this.state.data.map((task) => {
            if (task.url === url) {
                task = { ...task, completed: !task.completed };
                axios.put(url, task);
                return task;
            }
            return task;
        });
        this.setState({ data: remainder });

    }
    deleteItem(url) {
        var filteredItems = this.state.data.filter(function (task) {
            return (task.url !== url)
        });
        this.setState({
            data: filteredItems,
        });
        axios.delete(url);
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                
                </div>
                <Progress data={this.state.data} />
                <TaskList data={this.state.data} remove={this.deleteItem} complete={this.completeItem} />
            </div>
        )
    }
}
class Progress extends Component {
    render() {
        function calcProgres(data) {
            let count = 0;
            for (var i of data) {
                if (i.completed) {
                    count++;
                }
            }
            return count * 100 / data.length;
        }
        return (
            <div className="progress mb-4">
                <div className="progress-bar bg-success" role="progressbar" style={{ width: calcProgres(this.props.data) + '%' }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        );
    }
}
class TaskList extends Component {
    render() {
        if (this.props.data != null)
            var rend = this.props.data.map((d) => <Task d={d} remove={this.props.remove} complete={this.props.complete} key={d.url.substr(-5)} />);
        return (
            <div className="list-group">
                {rend}
            </div>
        )
    }

}
class Task extends Component {
    render() {
        var renderDesc = () => (this.props.d.completed) ? (<strike>{this.props.d.title} </strike>) : this.props.d.title;
        let key = Date.now()
        return (
            <li className='list-group-item text-center' data-toggle="collapse" data-target={"#collapsedata" + key} >
                <button className='btn float-left btn-outline-success border-0' onClick={() => this.props.complete(this.props.d.url)}>
                    <span aria-hidden='true' className="fa fa-check"></span>
                </button>
                {renderDesc()}
                <div id={"collapse" + key} className="collapse">
                {this.props.d.desc}
                </div>
                <button className=' btn float-right btn-outline-danger border-0' onClick={() => this.props.remove(this.props.d.url)}>
                    <span aria-hidden="true" className='fa fa-times' ></span>
                </button>
            </li>
        )
    }
}
export default App;