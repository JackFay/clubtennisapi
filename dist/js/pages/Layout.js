import React from "react";
import { Link } from "react-router";
import Nav from "../components/Nav";
import Footer from "../components/Footer"

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Welcome",
    };
  }

  changeTitle(title) {
    this.setState({title});
  }

  render() {
    const {location} = this.props;
    //console.log(location);
    return (
        <div>
        <Nav location={location} />
        {this.props.children}
      </div>
    );
  }
}
