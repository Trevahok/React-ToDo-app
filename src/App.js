import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            fetchUrl: "https://todorest.herokuapp.com/tasks/",
            loading: true,
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.completeItem = this.completeItem.bind(this);
        this.addItem = this.addItem.bind(this);
    }
    fetchTaskList() {
        axios.get(this.state.fetchUrl)
            .then(result => {
                let dataList= result.data;
                dataList.sort(function(a, b){
                    var keyA = new Date(a.deadline),
                        keyB = new Date(b.deadline);
                    // Compare the 2 dates
                    if(keyA < keyB) return -1;
                    if(keyA > keyB) return 1;
                    return 0;
                });

                this.setState({
                    data: dataList,
                    loading: false,
                });
                console.log(this.state);
            })
    }
    componentWillMount() {
        this.fetchTaskList();
    }
    // componentDidMount() {
    //     this.fetchTaskList();

    // }
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
    addItem(title) {
        var data = {
            "title": title,
            "desc": title,
            completed: false,
            url: 'http://sometempurl.com/sldfjasdfhlsafklj',

        }
        this.setState({
            data: [data, ...this.state.data],
        })
        axios.post(this.state.fetchUrl, data).then((response) => {
            var dataCopy = this.state.data;
            dataCopy.shift()
            this.setState({
                data: [response.data, ...dataCopy],
            })        
            console.log(response);
        }).catch( (error)=> {
            var dataCopy = this.state.data;
            dataCopy.shift()
            this.setState({
                data: dataCopy,
            })
            alert(error.response.data.title);
        });


    }
    render() {
        let loadOrTasklist;
        if (this.state.loading) {
            loadOrTasklist = (
                <div class="d-flex justify-content-center mt-5">
                    <div className="spinner-grow text-success container" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )
        }
        else {
            loadOrTasklist = (
                <TaskList data={this.state.data} remove={this.deleteItem} complete={this.completeItem} />
            )
        }
        return (
            <div className="container">
                <div className=" mt-4 jumbotron  jumbotron-fluid text-center text-success ">
                    <h3> Todo List  </h3>
                </div>
                <Progress data={this.state.data} />
                <TaskInput add={this.addItem} />
                {loadOrTasklist}

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
                <div className="progress-bar bg-success progress-bar-animated" role="progressbar" style={{ width: calcProgres(this.props.data) + '%' }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        );
    }
}
class TaskInput extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.add(event.target.title.value);
        event.target.title.value = '';

    }

    render() {
        console.log(this.props);
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="input-group my-4">
                    <input className="form-control bg-light text-dark" type="text" placeholder='Add Task... ' name='title' />
                    <div className="input-group-append bg-light">
                        <button type="submit" className="btn btn-outline-success border-0 "><span className="fa fa-plus"></span></button>
                    </div>
                </div>
            </form>
        )

    }

}
class TaskList extends Component {
    render() {
        if (this.props.data != null)
            var rend = this.props.data.map((d) => <Task d={d} remove={this.props.remove} complete={this.props.complete} pkId={d.url.substr(-5)} key={d.url.substr(-5)} />);
        return (
            <div>
                {rend}

            </div>
        )
    }

}
class Task extends Component {
    render() {
        var renderTitle = () => (this.props.d.completed) ? (<strike>{this.props.d.title} </strike>) : this.props.d.title;
        return (
            <div className="card mb-3">
                <div className="card-header text-center" id={"heading" + this.props.pkId}>

                    <button className='btn float-left btn-outline-success border-0' onClick={() => this.props.complete(this.props.d.url)}>
                        <span aria-hidden='true' className="fa fa-check"></span>
                    </button>
                    {renderTitle()}
                    <button className='btn float-right btn-outline-danger border-0' onClick={() => this.props.remove(this.props.d.url)}>
                        <span aria-hidden="true" className='fa fa-times' ></span>
                    </button>

                </div>
            </div>
        )
    }
}
export default App;