import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

const {Title} = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    console.log(coinHistory);

    const coinPrice = [];
    const coinTimeStamp = [];
    for(let i=0;i<coinHistory?.data?.history?.length;i++){
        coinPrice.push(coinHistory.data.history[i].price);
        console.log("price" +coinHistory.data.history[i].price);
        coinTimeStamp.push(new Date(coinHistory.data.history[i].timestamp).toLocaleDateString());
    }

    console.log(coinTimeStamp);
    console.log(coinPrice);

    const data ={
        labels:coinTimeStamp,
        datasets:[
            {
                label: 'Price in USD',
                data: coinPrice,
                fill:false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd',
                yAxisID:'y'
            }
        ]
    };
    console.log(data);
    const options = {
        scales :{
            y:{
                beginAtZero:true
            }
        }
    }

    return (
        <>
            <Row className="chart-header">
                <Title level={2} className="chart-title">
                    {coinName} Price Chart
                </Title>
                <Col className="price-container">
                    <Title level={5} className="price-change">
                        {coinHistory?.data?.change}%
                    </Title>
                    <Title level={5} className="current-price">
                        Current {coinName} Price: ${currentPrice}
                    </Title>
                </Col>
            </Row>
            <Line data={data} options={options}/>
        </>
    );
};

export default LineChart;