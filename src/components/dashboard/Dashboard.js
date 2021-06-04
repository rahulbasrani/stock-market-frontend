import React, { Component } from "react";

import StockInfo from "../StockInfo";
import ChartLineGraph from "../ChartLineGraph";
import ChartTable from "../ChartTable";
import Navbar from "./DashboardNavbar";
import DateTable from "../DateTable";
import "./dashboard.style.css";

import {
  loadQuotesForStock,
  loadLogoForStock,
  loadRecentNewsForStock,
  loadChartForStock,
  loadChartForDate,
} from "../../api/iex";

import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { setDate } from "date-fns";

import HeroEmail from "../../assets/images/img_login.svg";

class DashBoard extends Component {
  state = {
    error: null,
    enteredSymbol: "AMZN",
    year: "1d",
    date: new Date(),
    quote: null,
    quoteHistory: [],
    showHistory: false,
    news: [],
    showAllNews: false,
    chart: [],
    isDate: false,
    showAllChart: false,
    dateData: [],
  };

  // The first time our component is rendered
  // this method is called
  componentDidMount() {
    this.loadQuote();
  }
  loadQuote = () => {
    const { enteredSymbol } = this.state;
    const { year } = this.state;

    Promise.all([
      loadQuotesForStock(enteredSymbol),
      loadLogoForStock(enteredSymbol),
      loadRecentNewsForStock(enteredSymbol),
      loadChartForStock(enteredSymbol, year),
    ])
      .then((values) => {
        const [quote, logo, news, chart] = values;
        this.setState((prevState) => {
          // Merge the quote and logo
          const quoteWithLogo = { ...quote, logo: logo };
          // Append the quote w/ logo in history
          const history = prevState.quoteHistory;
          history.push({ ...quoteWithLogo });

          return {
            quote: quoteWithLogo,
            error: null,
            quoteHistory: history,
            news: news,
            chart: chart,
          };
        });
        this.setState({
          isDate: false,
        });
      })
      .catch((error) => {
        // If 404 not found
        if (error.response.status === 404) {
          error = new Error(`The stock symbol ${enteredSymbol} does not exist`);
        }
        this.setState({ error: error });
      });
  };

  onChangeEnteredSymbol = (event) => {
    // The <input> text value entered by user
    // No Spaces, Upper case, Limited to 4 chars
    const value = event.target.value.trim().toUpperCase().slice(0, 4);
    // Change this.state.enteredSymbol
    this.setState({
      enteredSymbol: value,
    });
  };

  onChangeYear = (event) => {
    // The <input> text value entered by user
    // No Spaces, Upper case, Limited to 4 chars
    const value = event.target.value.trim();
    // Change this.state.enteredSymbol
    this.setState({
      year: value,
    });
  };

  onChangeDate = (date) => {
    this.setState({
      date: date,
    });
  };

  onChangeDateData = async () => {
    const { enteredSymbol, date } = this.state;
    const data = await loadChartForDate(enteredSymbol, date);
    console.log(data);
    this.setState({
      dateData: data,
      isDate: true,
    });
  };

  onKeyDownPressEnter = (event) => {
    if (event.keyCode === 13) {
      this.loadQuote();
    }
  };
  onClickShowHistory = (event) => {
    this.setState((prevState) => {
      const showHistory = prevState.showHistory;
      return {
        showHistory: !showHistory,
      };
    });
  };

  onClickShowAllChart = (event) => {
    this.setState((prevState) => {
      const showAllChart = prevState.showAllChart;
      return {
        showAllChart: !showAllChart,
      };
    });
  };

  onClickShowAllNews = (event) => {
    this.setState((prevState) => {
      const showAllNews = prevState.showAllNews;
      return {
        showAllNews: !showAllNews,
      };
    });
  };

  render() {
    const {
      quote,
      enteredSymbol,
      year,
      quoteHistory,
      showHistory,
      news,
      showAllNews,
      chart,
      showAllChart,
      error,
      date,
      dateData,
      isDate,
    } = this.state;

    const chartReverse = [...chart].reverse();
    const chartReverseMin = chartReverse.slice(0, 12);

    const quoteHistoryReverse = [...quoteHistory].reverse();

    const newsMin = [...news].slice(0, 2);

    const companyName = !!quote && quote.companyName;
    const chartCloses = [];
    const chartDates = [];
    chart.map((chartItem) => {
      chartDates.push(chartItem.label);
      chartCloses.push(chartItem.close);
      return null;
    });

    return (
      <div>
        <Navbar />
        <div className="App dashboard-body">
          <div className=" pb-3 jumbotron-class">
            <span>
              <img
                className="img-dashboard  col-md-4"
                src={HeroEmail}
                alt=" "
              />
            </span>
            <div className="container  container-class col-md-6">
              <h1 className="col-md-10 class-heading">
                Stock Market Representation
              </h1>
              <div>
                <div className="col-md-12 mt-3">
                  <h5>Select date interval</h5>
                </div>

                <form className=" center-form col-md-5">
                  <select
                    name="year"
                    id="year"
                    className=" custom-select dropdown-year col-md-8 py-2"
                    value={year}
                    onChange={this.onChangeYear}
                    required
                  >
                    <option value="select">--Select One--</option>
                    <option value="1d">Today</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                    <option value="2011">2011</option>
                    <option value="2010">2010</option>
                    <option value="2y">Last two years</option>
                    <option value="3y">Last three years</option>
                    <option value="5y">Last five years</option>
                    <option value="10y">Last ten years</option>
                    <option value="15y">Last fifteen years</option>
                  </select>
                </form>
              </div>
              <div className="">
                <div className="col-md-12 mt-3">
                  <h5>Enter company symbol</h5>
                </div>

                <form className="form-inline  center-form col-md-8">
                  <input
                    type="text"
                    name="enteredSymbol"
                    value={enteredSymbol}
                    placeholder="Symbol e.g. AMZN"
                    className="form-control col-md-8"
                    aria-label="Symbol"
                    onChange={this.onChangeEnteredSymbol}
                    onKeyDown={this.onKeyDownPressEnter}
                    required
                  />
                  <span className="input-group-btn">
                    <button
                      type="button"
                      className="btn btn-success ml-1"
                      style={{
                        padding: "10px",
                        "box-shadow": "1px 1px 5px #000",
                      }}
                      onClick={this.loadQuote}
                    >
                      Show Stock
                    </button>
                  </span>
                </form>
                <div className="address mt-3">
                  <span className="star-mark">⭐</span> Please type symbol
                  notation for company name as this API only include symbols for
                  eg.(TWTR:twitter,CSCO:cisco)
                </div>
              </div>
              <form className="form-inline  center-form mt-5 col-md-8">
                <div className="date-label mb-2">
                  See details of stocks on specific date
                </div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    variant="dialog"
                    format="yyyy-MM-dd"
                    margin="normal"
                    id="date"
                    name="date"
                    maxDate={new Date()}
                    value={date}
                    onChange={this.onChangeDate}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
                <span className="input-group-btn">
                  <button
                    type="button"
                    className="btn btn-primary ml-2 mt-0"
                    onClick={this.onChangeDateData}
                    style={{
                      "box-shadow": "1px 1px 5px #000",
                    }}
                  >
                    GO
                  </button>
                </span>
              </form>
            </div>
          </div>

          <div className="container-fluid">
            <div className="row">
              {!!error && (
                <div className="col alert alert-danger" rolw="alert">
                  <h4 className="alert-heading">Sadly..</h4>
                  <p>
                    {
                      error.message // Condition that must pass for this to show
                    }
                  </p>
                </div>
              )}
            </div>

            <div className="row mt-3">
              <div className="col">
                <h2>Latest Stock Data</h2>
                {!!quote ? <StockInfo {...quote} /> : <p>Loading...</p>}

                <div className="mt-3">
                  <button
                    className="btn btn-success btn-block"
                    onClick={this.onClickShowHistory}
                  >
                    {showHistory ? "Hide" : "Show Previous Stock Data"}
                  </button>
                </div>

                <div className="mt-3">
                  {showHistory && !!quoteHistory && (
                    <div>
                      <h2 className="text-center">Previous Stock Data</h2>
                      {quoteHistoryReverse.map((quoteHistoryItem, index) => {
                        return (
                          <div key={"quote" + index}>
                            <StockInfo {...quoteHistoryItem} />
                            <hr />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {isDate && dateData[0] && (
                <div className="col mt-5 ">
                  <div className="date-values text-success mb-4">
                    On {dateData[0].label}. Find detailed information of stocks
                    below.
                  </div>
                  <DateTable
                    open={dateData[0].open}
                    close={dateData[0].close}
                    high={dateData[0].high}
                    low={dateData[0].low}
                    volume={dateData[0].volume}
                    symbol={dateData[0].symbol}
                    change={dateData[0].change}
                  />
                </div>
              )}

              {isDate && !dateData[0] && (
                <div className="col mt-5">
                  <div className="date-errors mt-5">
                    No Data Found, Try to find for nearby dates instead of your
                    currently selected date.
                  </div>
                </div>
              )}

              {!isDate && (
                <div className="col">
                  {!!chart && (
                    <div className="charts">
                      <h2 className="text-center">
                        {!!companyName && companyName + " "}
                      </h2>
                      <ChartLineGraph
                        title={enteredSymbol}
                        chartLabels={chartDates}
                        chartData={chartCloses}
                      />
                    </div>
                  )}

                  <div className="mt-3">
                    {!showAllChart && !!chartReverseMin && (
                      <ChartTable chart={chartReverseMin} />
                    )}
                    {showAllChart && !!chartReverse && (
                      <ChartTable chart={chartReverse} />
                    )}
                    <button
                      className="btn btn-success my-3 btn-block"
                      onClick={this.onClickShowAllChart}
                    >
                      {showAllChart ? "Show Less" : "Show All"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashBoard;
