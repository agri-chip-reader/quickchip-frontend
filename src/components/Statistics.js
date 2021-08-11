import React, { Component } from 'react';

import { Bar } from 'react-chartjs-2';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  colors
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

class Statistics extends Component {

  constructor({reportdata, prediccion, theme}) {
    super();
    this.theme = theme;
    this.prediccion = prediccion;
    this.reportdataaux = reportdata;
    this.ciclos = [];
    this.matriculados = [];
    this.prediccionreporte = []; 
    this.reportdata = null;
    this.options = null;
  }

  formatDatatoDisplay(){
    for(let i = 0; i < this.reportdataaux.length; i++){
      this.ciclos.push(this.reportdataaux[i].semester)
      this.matriculados.push(this.reportdataaux[i].enrolled)
      this.prediccionreporte.push(this.reportdataaux[i].predicted)
    }
    this.ciclos.push('2021-2')
    this.prediccionreporte.push(this.prediccion)
    console.log("-------------")
    console.log("this.matriculados: ", this.matriculados )
    console.log("this.prediccionreporte: ", this.prediccionreporte )
    console.log("this.ciclos: ", this.ciclos )
    console.log("-------------")

  }

  setDatandOptions(theme){
    this.formatDatatoDisplay();
    this.reportdata = {
      datasets: [
        {
          backgroundColor: colors.grey[700],
          data: this.matriculados,
          label: 'Matriculados'
        },
        {
          backgroundColor: colors.cyan[200],
          data: this.prediccionreporte,
          label: 'Proyección'
        }
      ],
      labels: this.ciclos
    };
    this.options = {
      animation: false,
      cornerRadius: 20,
      layout: { padding: 0 },
      legend: { display: false },
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        xAxes: [
          {
            barThickness: 12,
            maxBarThickness: 10,
            barPercentage: 0.5,
            categoryPercentage: 0.5,
            ticks: {
              fontColor: theme.palette.text.secondary
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              fontColor: theme.palette.text.secondary,
              beginAtZero: true,
              min: 0
            },
            gridLines: {
              borderDash: [2],
              borderDashOffset: [2],
              color: theme.palette.divider,
              drawBorder: false,
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
              zeroLineColor: theme.palette.divider
            }
          }
        ]
      },
      tooltips: {
        backgroundColor: theme.palette.background.paper,
        bodyFontColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        enabled: true,
        footerFontColor: theme.palette.text.secondary,
        intersect: false,
        mode: 'index',
        titleFontColor: theme.palette.text.primary
      }
    };
  }
  render() {
    this.setDatandOptions(this.theme)
    return (
      <Card>
        <CardHeader
          title="Comparación entre matriculados y proyección en los últimos ciclos"
        />
        <Divider />
        <CardContent>
          <Box
            sx={{
              height: 400,
              position: 'relative'
            }}
          >
            <Bar
              data={this.reportdata}
              options={this.options}
            />
          </Box>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
        </Box>
      </Card>
    );
  }

}

export default function({reportdata, prediccion}){

  const theme = useTheme();
  return <Statistics reportdata={reportdata} prediccion={prediccion} theme={theme} />;
}
