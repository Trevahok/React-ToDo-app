(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{19:function(e,t,a){e.exports=a(43)},43:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(16),s=a.n(c),o=a(17),i=a(18),l=a(3),u=a(4),d=a(6),m=a(5),p=a(7),b=a(2),h=a(8),f=a.n(h),v=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(d.a)(this,Object(m.a)(t).call(this))).state={data:[],fetchUrl:"http://127.0.0.1:8000/tasks/"},e.deleteItem=e.deleteItem.bind(Object(b.a)(Object(b.a)(e))),e.completeItem=e.completeItem.bind(Object(b.a)(Object(b.a)(e))),e.addItem=e.addItem.bind(Object(b.a)(Object(b.a)(e))),e}return Object(p.a)(t,e),Object(u.a)(t,[{key:"fetchTaskList",value:function(){var e=this;f.a.get(this.state.fetchUrl).then(function(t){e.setState({data:t.data}),console.log(e.state)})}},{key:"componentDidMount",value:function(){this.fetchTaskList()}},{key:"completeItem",value:function(e){var t=this.state.data.map(function(t){return t.url===e?(t=Object(i.a)({},t,{completed:!t.completed}),f.a.put(e,t),t):t});this.setState({data:t})}},{key:"deleteItem",value:function(e){var t=this.state.data.filter(function(t){return t.url!==e});this.setState({data:t}),f.a.delete(e)}},{key:"addItem",value:function(e){var t=this,a={title:e,desc:e,completed:!1};this.state.data;f.a.post(this.state.fetchUrl,a).then(function(e){t.setState({data:[e.data].concat(Object(o.a)(t.state.data))})})}},{key:"render",value:function(){return r.a.createElement("div",{className:"container"},r.a.createElement("div",{class:" mt-4 jumbotron  jumbotron-fluid text-center text-success "},r.a.createElement("h3",null," To-Do List ")),r.a.createElement(j,{data:this.state.data}),r.a.createElement(O,{add:this.addItem}),r.a.createElement(k,{data:this.state.data,remove:this.deleteItem,complete:this.completeItem}))}}]),t}(n.Component),j=function(e){function t(){return Object(l.a)(this,t),Object(d.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"progress mb-4"},r.a.createElement("div",{className:"progress-bar bg-success progress-bar-animated",role:"progressbar",style:{width:function(e){var t=0,a=!0,n=!1,r=void 0;try{for(var c,s=e[Symbol.iterator]();!(a=(c=s.next()).done);a=!0)c.value.completed&&t++}catch(o){n=!0,r=o}finally{try{a||null==s.return||s.return()}finally{if(n)throw r}}return 100*t/e.length}(this.props.data)+"%"},"aria-valuenow":"0","aria-valuemin":"0","aria-valuemax":"100"}))}}]),t}(n.Component),O=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(d.a)(this,Object(m.a)(t).call(this,e))).handleSubmit=a.handleSubmit.bind(Object(b.a)(Object(b.a)(a))),a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"handleSubmit",value:function(e){e.preventDefault(),this.props.add(e.target.title.value),e.target.title.value=""}},{key:"render",value:function(){return console.log(this.props),r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("div",{className:"input-group my-4"},r.a.createElement("input",{className:"form-control bg-light text-dark",type:"text",placeholder:"Add Task... ",name:"title"}),r.a.createElement("div",{className:"input-group-append bg-light"},r.a.createElement("button",{type:"submit",className:"btn btn-outline-success border-0 "},r.a.createElement("span",{className:"fa fa-plus"})))))}}]),t}(n.Component),k=function(e){function t(){return Object(l.a)(this,t),Object(d.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;if(null!=this.props.data)var t=this.props.data.map(function(t){return r.a.createElement(y,{d:t,remove:e.props.remove,complete:e.props.complete,pkId:t.url.substr(-5),key:t.url.substr(-5)})});return r.a.createElement("div",null,t)}}]),t}(n.Component),y=function(e){function t(){return Object(l.a)(this,t),Object(d.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"card mb-3"},r.a.createElement("div",{className:"card-header text-center",id:"heading"+this.props.pkId},r.a.createElement("button",{className:"btn float-left btn-outline-success border-0",onClick:function(){return e.props.complete(e.props.d.url)}},r.a.createElement("span",{"aria-hidden":"true",className:"fa fa-check"})),e.props.d.completed?r.a.createElement("strike",null,e.props.d.title," "):e.props.d.title,r.a.createElement("button",{className:"btn float-right btn-outline-danger border-0",onClick:function(){return e.props.remove(e.props.d.url)}},r.a.createElement("span",{"aria-hidden":"true",className:"fa fa-times"}))))}}]),t}(n.Component),E=v;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[19,2,1]]]);
//# sourceMappingURL=main.1a987a9a.chunk.js.map