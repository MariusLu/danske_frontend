import React, { Component } from "react";
import axios from "axios";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap";

const columns = [
  {
    dataField: "Company Name",
    text: "Company Name",
    sort: true,
    headerTitle: true,
  },
  {
    dataField: "Isin Code",
    text: "Isin Code",
    sort: true,
    headerTitle: true,
  },
  {
    dataField: "Recommendation",
    text: "Recommendation",
    sort: true,
    headerTitle: true,
  },
  {
    dataField: "Last Price",
    text: "Last Price",
    sort: true,
    headerTitle: true,
  },
  {
    dataField: "Target Price",
    text: "Target Price",
    sort: true,
    headerTitle: true,
  },
  {
    dataField: "Upside",
    text: "Upside",
    sort: true,
    headerTitle: true,
  },
  {
    dataField: "Country",
    text: "Country",
    sort: true,
    headerTitle: true,
  },
  {
    dataField: "Industry",
    text: "Industry",
    sort: true,
    headerTitle: true,
  },
  {
    dataField: "Free Float%",
    text: "Free Float%",
    sort: true,
    headerTitle: true,
  },
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      fileName: "",
      file: "",
      
    };
    this.saveFile = this.saveFile.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }


  saveFile = (e) => {
    this.setState({
      file: e.target.files[0],
      fileName: e.target.files[0].name
    })
  }

  uploadFile = (e) => {
    const formData = new FormData();
    formData.append("file", this.state.file);
    formData.append("fileName", this.state.fileName);
    console.log(formData)
    try {
      const res = axios.post(
        `https://danskebackend.eu.openode.io/upload`,
        formData
      );
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  }


  fetchData = () => {
    const url = `https://danskebackend.eu.openode.io/getData`;
    axios
      .get(url)
      .then(response => this.setState({products: response.data}))
      .catch(error => console.log(error));
  };

  render() {
  return (
    <div class="container-fluid">
<div className="row">
      <input type="file" onChange={this.saveFile} />
      <button onClick={this.uploadFile}>Upload</button>
                </div>
      <div class="row">
        <div class="col-md-10 col-md-offset-1">
          <BootstrapTable
            keyField="id"
            columns={columns}
            data={this.state.products}
            search
          ></BootstrapTable>
        </div>
    </div>
  </div>
  )};
}
