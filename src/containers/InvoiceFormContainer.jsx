import React from "react";
import { Form, Icon, Input, Button, DatePicker, Divider } from "antd";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "../assets/style/Form.scss";
import { formatDate } from "../constance";
import moment from "moment";
import { addInvoice, changeInvoice } from "../actions/index";
import { redirect } from "../actions/loading";

const { TextArea } = Input;

export class FormCreator extends React.Component {

  invoiceId = 0;
  isChangingMode = false;
  invoice = {};

  changeWindow = date => {
    const config = {
      rules: [
        {
          type: "object",
          required: true,
          message: "Please select date!"
        }
      ]
    };

    const dateFormat = "DD-MM-YYYY";

    if (this.isChangingMode) {
      return { ...config, initialValue: moment(date, dateFormat) };
    } else {
      return config;
    }
  };

  componentDidMount() {
    const { invoices, match } = this.props;
    if (match.path !== "/create_invoice") {
      this.invoiceId = match.params.id;
      this.invoice = invoices.find(el => el.id === this.invoiceId);
      this.isChangingMode = true;
      this.forceUpdate();
    }
  }

  componentWillUnmount() {
    this.props.redirect(false);
    this.invoice = {};
    this.props.form.resetFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values = {
          ...values,
          date_created: formatDate(new Date(values.date_created)),
          date_supplied: formatDate(new Date(values.date_supplied)),
          number: +values.number
        };
        if (!this.isChangingMode) {
          this.props.addInvoice(values);
        } else {
          values = {
            ...values,
            id: this.invoiceId
          };
          this.props.form.resetFields();
          this.props.changeInvoice(values);
        }
      } else {
        console.log(err);
      }
    });
  };

  initialComment = () => {
    if (this.isChangingMode) {
      return {
        initialValue: this.invoice.comment,
        rules: [
          {
            required: false,
            message: "Please input your comment!"
          }
        ]
      };
    } else {
      return {
        rules: [
          {
            required: false,
            message: "Please input your comment!"
          }
        ]
      };
    }
  };

  validateNumber = (rule, value, callback) => {
    if (value.length < 3) {
      callback("Too short!");
    }
    callback();
  };

  render() {
    if (this.props.redirected) {
      return <Redirect to="/" />;
    }

    const { getFieldDecorator } = this.props.form;
    const { number, date_created, date_supplied } = this.invoice;

    return (
      <div>
        <Divider orientation="left">
          {this.isChangingMode ? "Edit invoice" : "Create Invoice"}
        </Divider>
        <div className="form-creator">
          <Form
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            onSubmit={this.handleSubmit}
            labelAlign="left"
            colon={false}
          >
            <div className="border-form">
              <Form.Item label="Number:">
                <div style={{ display: "block" }}>
                  {getFieldDecorator("number", {
                    initialValue: number,
                    rules: [
                      {
                        required: true,
                        message: "Please input invoice number!"
                      },
                      {
                        validator: this.validateNumber
                      }
                    ]
                  })(
                    <Input
                      addonBefore="INV-"
                      type="number"
                      addonAfter={<Icon type="setting" />}
                      // onChange={this.onChangeNumber}
                    />
                  )}
                </div>
              </Form.Item>
              <Form.Item label="Invoice Data:">
                {getFieldDecorator(
                  "date_created",
                  this.changeWindow(date_created)
                )(
                  <DatePicker
                    // onChange={this.onChangeDateCreated}
                    locale={{ dateFormat: "DD-MM-YYYY" }}
                    // defaultValue={moment(date_supplied, dateFormat)}
                  />
                )}
              </Form.Item>
              <Form.Item label="Supply Date:">
                {getFieldDecorator(
                  "date_supplied",
                  this.changeWindow(date_supplied)
                )(
                  <DatePicker
                    // onChange={this.onChangeDateSupplied}
                    locale={{ dateFormat: "DD-MM-YYYY" }}
                  />
                )}
              </Form.Item>
              <Form.Item label="Comment:">
                {getFieldDecorator("comment", this.initialComment())(
                  <TextArea
                    rows={2}
                    onChange={this.onChangeComment}
                    maxLength={160}
                  />
                )}
              </Form.Item>
            </div>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const InvoiceForm = Form.create({ name: "register" })(FormCreator);

const mapStateToProps = state => ({
  invoices: state.data.invoices,
  redirected: state.loading.redirected
});

const mapDispatchToProps = {
  addInvoice,
  redirect,
  changeInvoice
};

export const InvoiceFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoiceForm);
