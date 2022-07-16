import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptosQuery } from "../services/cryptoapi";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
    const count = simplified ? 6 : 50;

    const demoImage =
        "https://image.shutterstock.com/image-photo/ethereum-on-pile-cryptocurrency-600w-794562280.jpg";

    const { data: cryptosList } = useGetCryptosQuery(100);
    const { data: cryptoNews } = useGetCryptoNewsQuery({
        newsCategory,
        count,
    });
    if (!cryptoNews?.value) return "Loading...";
    console.log(cryptoNews);
    return (
        <div>
            <Row gutter={[24, 24]}>
                {!simplified && (
                    <Col span={24}>
                        <Select
                            showSearch
                            className="select-news"
                            placeholder="Select a Crypto"
                            optionFilterProp="children"
                            onChange={(value) => setNewsCategory(value)}
                            filterOption={(input, option) =>
                                option.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase())
                            }
                        >
                            <Option value="Cryptocurrency">
                                Cryptocurrency
                            </Option>
                            {cryptosList?.data?.coins.map((coin) => (
                                <Option value={coin.name}>{coin.name}</Option>
                            ))}
                        </Select>
                    </Col>
                )}
                {cryptoNews?.value?.map((news, i) => (
                    <Col xs={24} sm={12} lg={8} key={i}>
                        <Card
                            hoverable
                            className="news-card"
                            style={{ borderRadius: "5px" }}
                        >
                            <a href={news.url} target="_blank" rel="noreferrer">
                                <div className="news-image-container">
                                    <Title
                                        style={{ textAlign: "left" }}
                                        className="news-title"
                                        level={4}
                                    >
                                        {news.name}
                                    </Title>
                                    <img
                                        style={{
                                            maxWidth: "120px",
                                            maxHeight: "100px",
                                            marginLeft: "20px",
                                            borderRadius: "5px",
                                        }}
                                        src={
                                            news?.image?.thumbnail
                                                ?.contentUrl || demoImage
                                        }
                                        alt="news"
                                    />
                                </div>
                                <p>
                                    {news.description > 100
                                        ? `${news.description.substring(
                                              0,
                                              100
                                          )}...`
                                        : news.description}
                                </p>
                                <div className="provider-container">
                                    <div>
                                        <Avatar
                                            src={
                                                news.provider[0]?.image
                                                    ?.thumbnail?.contentUrl ||
                                                demoImage
                                            }
                                            alt="news"
                                        />
                                        <Text className="provider-name">
                                            {news.provider[0]?.name}
                                        </Text>
                                    </div>
                                    <Text>
                                        {moment(news.datePublished)
                                            .startOf("ss")
                                            .fromNow()}
                                    </Text>
                                </div>
                            </a>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default News;
