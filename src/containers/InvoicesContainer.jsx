import React from "react";
import { Table, Button, Divider } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "../assets/style/Invoices.scss";
import { deleteInvoice } from "../actions/index";

const Invoices = ({ invoices, deleteInvoice }) => {
  const columns = [
    {
      title: "Create",
      dataIndex: "date_created",
      width: "10vw"
    },
    {
      title: "Number",
      dataIndex: "number",
      width: "10vw"
    },
    {
      title: "Supply",
      dataIndex: "date_supplied",
      width: "10vw"
    },
    {
      title: "Comment",
      dataIndex: "comment",
      width: "15vw"
    },
    {
      title: "Edit/Remove",
      dataIndex: "buttons",
      width: "10vw",
      render: (text, index) => {
        return (
          <div className="table-btn">
            <Button>
              <Link to={`/edit_invoice/${index.id}`}>Edit</Link>
            </Button>
            <Button type="danger" onClick={e => deleteInvoice(index)}>
              Delete
            </Button>
          </div>
        );
      }
    }
  ];

  const keys = () => {
    let counter = 1;
    return function() {
      return counter++;
    };
  };

  return (
    <div className="main-page">
      <Divider orientation="left">Invoices</Divider>
      <div className="actions">
        <h3>Actions</h3>
        <Button type="primary">
          <Link to="/create_invoice">Add new</Link>
        </Button>
      </div>
      <div className="invoices-list">
        <h3>Invoices</h3>
        <Table
          columns={columns}
          dataSource={invoices}
          size="middle"
          rowKey={keys()}
          pagination={false}
        />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  invoices: state.data.invoices
});

const mapDispatchToProps = {
  deleteInvoice
};

export const InvoicesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Invoices);
