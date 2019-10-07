import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import { getInvoices } from "../actions/index";
import { Spin, Icon } from "antd";
import { InvoicesContainer } from "./InvoicesContainer";
import { InvoiceFormContainer } from "./InvoiceFormContainer";

const antIcon = <Icon type="loading" style={{ fontSize: 128 }} spin />;

class Main extends Component {
  componentDidMount() {
    this.props.getInvoices();
  }

  render() {
    const { isLoading } = this.props;
    if (isLoading) {
      return <Spin indicator={antIcon} />;
    }

    return (
      <div className="content">
        <Switch>
          <Route path="/" exact component={InvoicesContainer} />
          <Route path="/create_invoice" component={InvoiceFormContainer} />
          <Route path="/edit_invoice/:id" component={InvoiceFormContainer} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.loading.isLoading,
  loadingFail: state.loading.loadingFail
});

const mapDispatchToProps = {
  getInvoices
};

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default MainContainer;
