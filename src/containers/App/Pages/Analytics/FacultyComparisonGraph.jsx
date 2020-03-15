import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, List, Avatar, Button } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Mr.S.K.Nagare', amt: 96,
  },
  {
    name: 'Mrs.M.A.Khade', amt: 80,
  },
  {
    name: 'Mr.A M Kanavaje', amt: 89,
  },
  {
    name: 'Mr. D.M.Satpute', amt: 68,
  },
  {
    name: 'Mr V S Gawade', amt: 94,
  },
  {
    name: 'Mr.Vipul Ajit Sansare', amt: 90,
  },
];

class FacultyComparisonGraph extends Component {
  static propTypes = {
    departmentCode: PropTypes.string.isRequired,
    classCode: PropTypes.string.isRequired,
    setSelectedFaculty: PropTypes.func.isRequired,
  };

  render() {
    const { departmentCode, classCode } = this.props;
    console.log(departmentCode, classCode);
    return (
      <Fragment>
        <Row className="faculty-comparison-container">
          <Col sm={18} xs={24}>
            <div className="responsive-barchart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  maxBarSize={40}
                  margin={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amt" fill="#1890ff" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Col>
          <Col sm={{ span: 5, offset: 1 }} xs={24}>
            <List
              header={<b>All Faculties</b>}
              itemLayout="horizontal"
              dataSource={data}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={<Button onClick={() => this.props.setSelectedFaculty(item)} className="list-title-button" type="link">{item.name}</Button>}
                    description={`Feedback: ${item.amt}%`}
                  />
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(FacultyComparisonGraph);