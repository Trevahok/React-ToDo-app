import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
class App extends Component {
    constructor(){
        super();
        this.state={
            progress : ()=> {
                let count =0;
                for ( var i of this.state.rawData){
                    if (i.completed){
                        count++;
                    }
                }
                return count*100/ this.state.rawData.length;
            },
            fetchUrl :'http://127.0.0.1:8000/tasks',
            rawData: [],
        };
    
    }
    componentDidMount(){
        this.fetchTaskList();
    }
    fetchTaskList() {
        axios.get(this.state.fetchUrl)
            .then(result => {
            
                this.setState({
                    rawData: result.data,
                });
                console.log(this.state);
            })
    }
    handleRemove(url){

        axios.delete(url);
        const remainder = this.state.rawData.filter((todo) => {
          if(todo.url !== url) return todo;
        });
        // Update state with filter
        this.setState({rawData: remainder});
    }
    handleComplete(url){
        const remainder = this.state.rawData.filter((task)=>{
            if(task.url === url) return {...task, completed: !task.completed};
            return task;
        });
        this.setState({rawData: remainder});

    }
    render() {
        return (
            <div className="container">
            <Progress progress = {this.state.progress} />
            <TaskList data = {this.state.rawData} remove = {this.handleRemove.bind(this)} complete={this.handleComplete.bind(this)} />
            </div>

        );
    }
}


class Progress extends Component {
    render() {
        return (
            <div>
            <div className="progress mb-4">
                <div className="progress-bar bg-success" role="progressbar" style={{ width: this.props.progress() + '%' }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            </div>
        );
    }
}

class TaskList extends Component {
    render() {
              if (this.props.data != null) 
                var rend = this.props.data.map((d)=> <Task  d={d} remove = {this.props.remove} complete= {this.props.complete }/>) ;
        // const renderList=this.state.tasks.map((task)=> <li>{task.desc}</li>);
        return (
            <div className="list-group">
            {rend}
            </div>
        )
    }
}
class Task extends Component{
    render(){
    var renderDesc = ()=> (this.props.d.completed)? (<strike>{this.props.d.desc} </strike>): this.props.d.desc;
        return (
        <li className='list-group-item text-center' key='{this.props.d.url}'>
            <button className='btn float-left btn-outline-success border-0' onClick= {()=> this.props.complete(this.props.d.url)}>
                <span aria-hidden='true' className="fa fa-check"></span>
            </button>
            {renderDesc()}
            <button className=' btn float-right btn-outline-danger border-0' onClick={()=>this.props.remove(this.props.d.url)}>
                <span aria-hidden="true" className='fa fa-times' ></span>
            </button>
        </li>
        )
    }
}
export default App;
