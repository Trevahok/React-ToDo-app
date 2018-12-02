import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
class App extends Component {
    constructor(){
        super();
        this.state={
            progress : 0,
        }
        this.fetchTaskList = this.fetchTaskList.bind(this);
    }
    componentDidMount(){
        this.fetchTaskList();
    }
    fetchTaskList() {
        let count =0;
        axios.get('http://127.0.0.1:8000/tasks')
            .then(result => {
                for ( var i of result.data){
                    if (i.completed){
                        count++;
                    }
                }
                this.setState({
                    rawData: result.data,
                    progress: count*100/result.data.length,
                });
                console.log(this.state);
            })
    }
    render() {
        return (
            <div className="container">
            <Progress progress = {this.state.progress} />
            <TaskList data = {this.state.rawData} refetch = {this.fetchTaskList} />
            </div>

        );
    }
}


class Progress extends Component {
    render() {
        return (
            <div>
            <div className="progress mb-4">
                <div className="progress-bar bg-success" role="progressbar" style={{ width: this.props.progress + '%' }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            </div>
        );
    }
}

class TaskList extends Component {
    componentWillReceiveProps({data}) {
      this.setState({...this.state,data})
    }
    render() {
              if (this.props.data != null) 
                var rend = this.props.data.map((d)=> <Task completed = {d.completed} d={d} refetch = {this.props.refetch} />) ;
        // const renderList=this.state.tasks.map((task)=> <li>{task.desc}</li>);
        return (
            <div className="list-group">
            {rend}
            </div>
        )
    }
}
class Task extends Component{
   componentWillReceiveProps({d}) {
     this.setState({...this.state,d})
   } 
    renderDesc(){
     return (this.props.completed)? (<strike>{this.props.d.desc} </strike>): this.props.d.desc;
    }
    deleteTask(url){
        axios.delete(url).then(
        this.props.refetch()
        );
    }
    completeTask(url){
        console.log(this.props.d, url);
        axios.put(url, {...this.props.d,completed : !this.props.completed})
    }
    render(){
        return (
        <li className='list-group-item text-center' key='{this.props.d.title}'>
            <button className='btn float-left btn-outline-success border-0' onClick= {()=> this.completeTask(this.props.d.url)}>
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
