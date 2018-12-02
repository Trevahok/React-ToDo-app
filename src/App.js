import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
class App extends Component {
    fetchNrenderList() {
        let count = 0;
        axios.get('http://127.0.0.1:8000/tasks')
            .then(result => {
                this.setState({
                    tasks: result.data.map(
                        (d) => {
                            if (d.completed) count++;
                            return <Task d={d} />
                        }),
                    rawData: result.data,
                    completedCount: count,
                    totalCount: result.data.length,
                });
                console.log(this.state);
            })
    }

    constructor() {
        super()
        this.state = {
            tasks: (
                <div className="btn mx-auto btn-secondary"> Loading ... </div>
            ),
            count: 0,
            completedCount: 0,
            totalCount: 1,

        }
        this.fetchNrenderList = this.fetchNrenderList.bind(this);
    }
    componentDidMount() {
        this.fetchNrenderList();
    }
    render() {
        return (
            <div className="container">
                <Progress  progress={(this.state.completedCount / this.state.totalCount) * 100} />
                <TaskList tasks={this.state.tasks} refetch={this.fetchNrenderList} />
            </div>
        );
    }
}

class Progress extends Component {
    render() {
        return (
            <div className="progress mb-4">
                <div className="progress-bar bg-success" role="progressbar" style={{ width: this.props.progress + '%' }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        );
    }
}

class TaskList extends Component {
    render() {
        // const renderList=this.state.tasks.map((task)=> <li>{task.desc}</li>);
        return (
            <div className="list-group">
                {this.props.tasks}
                <button onClick={this.props.refetch}>refresh</button>
            </div>
        )
    }
}
class Task extends Component {
        renderDesc(){
            
         return (this.state.completed)? (<strike>{this.props.d.desc} </strike>): this.props.d.desc;
        }
    constructor(props){
        super(props);
        this.state = {
            completed: false,

        }
    }
    deleteTask(url){
        axios.delete(url);
    }
    componentDidMount(){
        this.setState({
            completed: this.props.d.completed,
            
        })
    }
    render() {
        return (
            <li className='list-group-item text-center' key='{this.props.d.title}'>
                <button className='btn float-left btn-outline-success border-0'>
                    <span aria-hidden='true' className="fa fa-check"></span>
                </button>
                {this.renderDesc()}
                <button className=' btn float-right btn-outline-danger border-0' onClick={()=>this.deleteTask(this.props.d.url)}>
                    <span aria-hidden="true" className='fa fa-times' ></span>
                </button>
            </li>
        )
    }
}
export default App;
