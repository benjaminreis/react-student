import React, { Component } from 'react';
//import FontAwesome from 'react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'


//import '../styles/global.css';

export default class Dropdown extends Component{
  constructor(props){
    super(props) 
    this.state = { 
      listOpen: false,
      headerTitle: this.props.list.filter(x => (x.selected === true)).title
    }
    this.close = this.close.bind(this)
  }

  componentDidUpdate(){
    const { listOpen, headerTitle } = this.state

    setTimeout(() => {
      if(listOpen){
        window.addEventListener('click', this.close)
      }
      else{
        window.removeEventListener('click', this.close)
      }
    }, 0)
  }

  componentWillUnmount(){
    window.removeEventListener('click', this.close)
  }

  close(timeOut){
    this.setState({
      listOpen: false
    })
  }

  selectItem(title, id, stateKey){
    this.setState({
      headerTitle: title,
      listOpen: false
    }, this.props.resetThenSet(id, stateKey))
  }

  toggleList(){
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))

  }

  render(){
    const{list} = this.props
    const{listOpen, headerTitle} = this.state
    //const{listOpen} = this.state
    //const{headerTitle} = this.state.headerTitle

    return(
      <div className="dd-wrapper">
        <div className="dd-header" onClick={() => this.toggleList()}>
          <div className="dd-header-title">{this.props.title}</div>
          {listOpen
            ? <FontAwesomeIcon icon={["fa", "Angle-Up"]} size="2x"/>
            : <FontAwesomeIcon icon="AngleDown" size="2x"/>
          }
        </div>
        {listOpen && <ul className="dd-list" onClick={e => e.stopPropagation()}>
          {list.map((item)=> (
            <li className="dd-list-item" key={item.id} onClick={() => this.selectItem(item.title, item.id, item.key)}>{item.title} {item.selected && "++"}</li>
          ))}
        </ul>}
      </div>
    )
  }
}

//export default Dropdown