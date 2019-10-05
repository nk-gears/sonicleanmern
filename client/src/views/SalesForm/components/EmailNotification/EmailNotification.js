import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';
import { fetchEmailNotification } from 'modules/EmailNotification'


class EmailNotification extends Component {

  constructor(props) {
    super(props)
    this.props.fetchEmailNotification();
    this.state = {
      value: null
    }
  }
  saveChanges = (value) => {
    this.setState({ value });
    this.props.emailNotification(value);
  }

  render() {
    const { emailNotificationData } = this.props;
    return (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="font-weight-normal text-black"> Email Notification </h3>
        </div>
        <h6 className="text-black font-weight-normal mt-2">To CC employees on order confirmation emails, you will have to create an account for them in your <a href="#">company profile page.</a></h6>
        <div className="mt-3 mb-5">
          <Select
            name="form-field-name2"
            value={this.state.value}
            options={emailNotificationData}
            onChange={this.saveChanges}
            multi
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ emailNotificationList }) => {
  const { emailNotificationData } = emailNotificationList;
  return { emailNotificationData };
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchEmailNotification: () => {
      dispatch(fetchEmailNotification());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailNotification);

//export default EmailNotification