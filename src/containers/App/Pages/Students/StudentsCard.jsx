import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Checkbox, Row, Col, Divider } from 'antd';
import { connect } from 'react-redux';
import StudentsGenerator from './StudentsGenerator';
import { getStudentsByDepartmentCodeClassCode } from '../../../../redux/actions/departmentActions';
import { AppEmpty } from '../../../../shared/components/AppEmpty';

class StudentsCard extends Component {
  static propTypes = {
    departmentCode: PropTypes.string.isRequired,
    classCode: PropTypes.string.isRequired,
    students: PropTypes.arrayOf(PropTypes.object).isRequired,
    getStudentsByDepartmentCodeClassCode: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getStudentsByDepartmentCodeClassCode(this.props.departmentCode, this.props.classCode);
  }

  render() {
    const { departmentCode, classCode, students } = this.props;

    return (
      <Fragment>
        <Card>
          <Row>
            <Col md={18} xs={24}>
              <StudentsGenerator departmentCode={departmentCode} classCode={classCode} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Divider />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Row>
                {
                  students && students.length > 0 ?
                    (
                      students.map((student, index) => (
                        <Col key={index + 1}>
                          <Checkbox checked={student.user.isActive}>{student.user.userName}</Checkbox>
                        </Col>
                      ),
                      )
                    ) :
                      <AppEmpty />
                }
              </Row>
            </Col>
          </Row>
        </Card>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => ({
  students: ((state.departments.students || {})[props.departmentCode] || {})[props.classCode] || [],
});
const mapDispatchToProps = { getStudentsByDepartmentCodeClassCode };
export default connect(mapStateToProps, mapDispatchToProps)(StudentsCard);
