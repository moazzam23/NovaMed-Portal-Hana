import React from "react";
import data from "../../data/master/analytics.json";
import PageLayout from "../../layouts/PageLayout";
import { Row, Col } from "react-bootstrap";
import { Breadcrumb } from "../../components";
import { Box, Item, Anchor, Heading } from "../../components/elements";
import { TrafficsTable, PagesTable } from "../../components/tables";
import TabsDeviceCard from "../../components/cards/TabsDevicesCard";
import {
  CardHeader,
  AnalyticsCard,
  DevicesCard,
  CountriesCard,
} from "../../components/cards";
import { OrdersChart } from "../../components/charts";

export default function Analytics() {
  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <Box className="mc-card">
            <Breadcrumb title={data?.pageTitle}>
              {data?.breadcrumb.map((item, index) => (
                <Item key={index} className="mc-breadcrumb-item">
                  {item.path ? (
                    <Anchor className="mc-breadcrumb-link" href={item.path}>
                      {item.text}
                    </Anchor>
                  ) : (
                    item.text
                  )}
                </Item>
              ))}
            </Breadcrumb>
          </Box>
        </Col>
        {data?.mixed.map((item, index) => (
          <Col xl={4} key={index}>
            <AnalyticsCard
              label={item.label}
              digit={item.digit}
              dataSet={item.dataSet}
              dataKey={item.dataKey}
              variant={item.variant}
              dotsMenu={item.more}
              total={item.total}
              percentage={item.percentage}
            />
          </Col>
        ))}
        {/* <Col xl={12}>
          <DevicesCard
            title={data?.device.title}
            icon={data?.device.icon}
            option={data?.device.option}
            chart={data?.device.chart}
          />
        </Col> */}
        <Col xl={12}>
          <div className="mc-card">
            <Heading>{data?.finTitle}</Heading>{" "}
          </div>
        </Col>
        {data?.device.map((item, i) => (
          <Col xl={4}>
            <TabsDeviceCard
              key={i}
              title={item.title}
              icon={item.icon}
              option={item.option}
              chart={item.chart}
            />
          </Col>
        ))}
        <Col xl={12}>
          <div className="mc-card">
            <Heading>{data?.saleTitle}</Heading>{" "}
          </div>
        </Col>
        {data?.mostSales.map((item, i) => (
          <Col xl={4}>
            <DevicesCard
              key={i}
              title={item.title}
              icon={item.icon}
              option={item.option}
              chart={item.chart}
            />
          </Col>
        ))}
        {/* <Col xs={12} xl={5}>
          <CountriesCard
            title={data?.country.title}
            dotsMenu={data?.country.dotsMenu}
            items={data?.country.items}
          />
        </Col> */}
        {/* <Col xl={5}>
          <Box className="mc-card">
            <CardHeader title={data?.pages.title} dotsMenu={data?.dotsMenu} />
            <PagesTable thead={data?.pages.thead} tbody={data?.pages.tbody} />
          </Box>
        </Col> */}
        {/* <Col xs={12} xl={7}>
          <Box className="mc-card">
            <CardHeader title={data?.traffic.title} dotsMenu={data?.dotsMenu} />
            <TrafficsTable
              thead={data?.traffic.thead}
              tbody={data?.traffic.tbody}
            />
          </Box>
        </Col> */}
      </Row>
    </PageLayout>
  );
}
