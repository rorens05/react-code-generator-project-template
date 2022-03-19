import React, { useEffect } from 'react'
import { useContext } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { UserContext } from '../../context/UserContext';
import MainContainer from '../../components/layouts/MainContainer'
import { Col, Row } from 'react-bootstrap';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

export default function Dashboard() {

  const userContext = useContext(UserContext)
  const {user} = userContext.data

  useEffect(() => {
    if (user.isStudent) return (window.location.href = "/404");
  }, [])
  

  if(user.isSchoolAdmin){
    return (
      <MainContainer title="Dashboard" activeHeader={"dashboard"}>
        <Row>
          <Col className='px-4' sm={8}>
          <h2 className="primary-color mt-5 mb-3">Analitics</h2>
            <div className='dashboard-content mb-5 mt-3'>
              <div className="dashboard-content-item rounded shadow bg-danger" >
              </div>
              <div className="dashboard-content-item rounded shadow bg-warning" >
              </div>
              <div className="dashboard-content-item rounded shadow bg-info" >
              </div>
            </div>
            <div>
              <h2 className='primary-color mb-3'>Sample Line Chart</h2>
              <div className='chart-container'>
                <Line
                  data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [{
                      label: 'My First dataset',
                      backgroundColor: 'rgb(255, 99, 132)',
                      borderColor: 'rgb(255, 99, 132)',
                      data: [0, 10, 5, 2, 20, 30, 45],
                    }]
                  }}
                />
              </div>
            </div>
          </Col>
          <Col className='px-4' sm={4}>
            <h2 className="primary-color mt-5 mb-3">Sample Doughnut chart</h2>
            <div className='chart-container'>
              <Doughnut 
                data={{labels: [
                  'Red',
                  'Blue',
                  'Yellow'
                ],
                datasets: [{
                  label: 'My First Dataset',
                  data: [300, 50, 100],
                  backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                  ],
                  hoverOffset: 4
                }]}}
              />
            </div>
          </Col>

        </Row>
      </MainContainer>
    )
  }

  return <Redirect to="/404"/>
}
