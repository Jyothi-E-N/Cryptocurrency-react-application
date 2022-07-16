import React, { useState } from "react";
import { useGetReferenceCurrenciesQuery } from "../services/cryptoapi";
import { Link } from "react-router-dom";
import { Row, Avatar, Collapse, Typography, Col, Card, Select } from "antd";
import HTMLReactParser from "html-react-parser";
import Column from "antd/lib/table/Column";

const { Panel } = Collapse;
const { Title } = Typography;
const { Option } = Select;

const Exchanges = () => {
    const [type, setType] = useState("coin");
    const { data, isFetching } = useGetReferenceCurrenciesQuery(type);
    if (isFetching) return "Loading";
    console.log(data);

    return (
        <>
            <div>
                <Title
                    style={{ marginTop: "40px", textAlign: "center" }}
                    level={2}
                >
                    Reference Currencies of {"coin"}
                </Title>
                <Row gutter={[24, 24]}>
                    <Col span={24}>
                        <Select
                            style={{
                                marginBottom: "20px",
                                textAlign: "center",
                                width: "250px",
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                            }}
                            showSearch
                            placeholder="Select a reference currency"
                            optionFilterProp="children"
                            onChange={(value) => setType(value)}
                        >
                            <Option value="coin">Coin</Option>
                            <Option value="fiat">Fiet</Option>
                            <Option value="denominator">Denominator</Option>
                        </Select>
                    </Col>
                </Row>
                <Row gutter={[24, 24]}>
                    {data?.data?.currencies.map((currency, i) => (
                        <Col
                            xs={24}
                            sm={12}
                            lg={6}
                            className="crypto-card"
                            key={currency?.uuid}
                        >
                            <Link to={`/crypto/${currency?.uuid}`}>
                                <Card
                                    title={`${i + 1}. ${currency.name}`}
                                    extra={
                                        <img
                                            className="crypto-image"
                                            src={currency.iconUrl}
                                        />
                                    }
                                    hoverable
                                >
                                    <p>Symbol: {currency?.symbol}</p>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    );
};

export default Exchanges;
