import * as React from "react";
import ReactToPrint from "react-to-print";
import DetailToPrint from "./DetailToPrint";
import "./print.css";

class TextComponent extends React.PureComponent {
  render() {
    const prDetail = this.props.prDetail;
    const row = this.props.row;
    const liability = this.props.liability;
    const asset = this.props.asset;
    const totalCapital = this.props.totalCapital;
    const account = this.props.account;
    const commodity = this.props.commodity;
    const osLaon = this.props.osLaon;
    const paidUpShare = this.props.paidUpShare;
    return (
      <DetailToPrint
        style={{ marginBottom: "1cm" }}
        prDetail={prDetail}
        row={row}
        liability={liability}
        asset={asset}
        totalCapital={totalCapital}
        account={account}
        commodity={commodity}
        osLaon={osLaon}
        paidUpShare={paidUpShare}
        fromprint={true}
      />
    );
  }
}

export class PrintDetail extends React.PureComponent {
  componentRef = null;

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      text: "old boring text",
    };
  }

  setComponentRef = (ref) => {
    this.componentRef = ref;
  };

  reactToPrintContent = () => {
    return this.componentRef;
  };

  reactToPrintTrigger = () => {
    // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
    // to the root node of the returned component as it will be overwritten.

    // Bad: the `onClick` here will be overwritten by `react-to-print`
    // return <button onClick={() => alert('This will not work')}>Print this out!</button>;

    // Good
    return <button className="ui button twitter">Print</button>;
  };

  render() {
    const prDetail = this.props.prDetail;
    const row = this.props.row;
    const liability = this.props.liability;
    const asset = this.props.asset;
    const totalCapital = this.props.totalCapital;
    const account = this.props.account;
    const commodity = this.props.commodity;
    const osLaon = this.props.osLaon;
    const paidUpShare = this.props.paidUpShare;
    return (
      <div>
        <ReactToPrint
          style={{ display: "none" }}
          content={this.reactToPrintContent}
          documentTitle={row?.name}
          removeAfterPrint
          trigger={this.reactToPrintTrigger}
        />
        {this.state.isLoading && (
          <p className="indicator">onBeforeGetContent: Loading...</p>
        )}
        <div className="hidden">
          <TextComponent
            prDetail={prDetail}
            row={row}
            liability={liability}
            asset={asset}
            totalCapital={totalCapital}
            account={account}
            commodity={commodity}
            osLaon={osLaon}
            paidUpShare={paidUpShare}
            ref={this.setComponentRef}
          />
        </div>
      </div>
    );
  }
}
