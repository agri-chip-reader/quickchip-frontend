import React, { Component } from 'react';
import { CSVLink } from 'react-csv';
import Statistics from './Statistics';
import TasksProgress from "src/components/dashboard/TasksProgress";
import TotalCustomers from "src/components/dashboard/TotalCustomers";
import { ExportXlsx } from './ExportXlsx';

class Prediction extends Component {

    constructor({ reportdata, predictionresponse }) {
        super();
        this.predictionresponse = predictionresponse;
        this.reportdata = reportdata;
        this.headers = [
            { label: "Semester", key: "semester"},
            { label: "Prediccion", key: "predicted"},
            { label: "Matriculados", key: "enrolled"}
        ];
    }

    csvReport(){
        console.log("this.reportdata: ", this.reportdata)
        return ({
            filename: 'Reporte.csv',
            headers: this.headers,
            data: this.reportdata
        });
    }

    render() {
        return (
        <div>
            <br></br>
            <div style={ {display: "flex", width: "100%"}}>
                <div style={ { width: "50%", marginRight: "10px" }}>
                    <TasksProgress title={"FIABILIDAD"} fiabiality={this.predictionresponse.fiability*100}/> 
                </div>
                <div style={ { width: "50%", marginLeft: "10px"}}>
                    <TotalCustomers  title={"PREDICCIÓN DE MATRICULADOS"} quantity= {this.predictionresponse.prediction} />
                </div>
            </div>
            {/* <div style={ {marginTop: "10px"} }></div> */}
            <br></br>< Statistics reportdata={this.reportdata} prediccion={this.predictionresponse.prediction} />
            <div> <CSVLink {...this.csvReport()}> Exportar recurso en CSV</CSVLink></div> 
            <ExportXlsx csvData={this.reportdata} fileName="ReportenExcel" /> 
        </div>
        );
    }
}

export default function ({ reportdata, predictionresponse }) {
    return <Prediction reportdata={reportdata} predictionresponse={predictionresponse}/>
}
