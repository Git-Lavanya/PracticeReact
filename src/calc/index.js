import React, { useMemo } from "react";
import { queryResponse } from "./sampleData";
import * as _ from "lodash";
import { forEach } from "async-foreach";
import "./calc.css";

const calculateExp = (expression) => {
  try {
    return eval(expression);
  } catch {
    return false;
  }
};
const Register = () => {
  const [expressionValues, setExpression] = React.useState("");
  const handleInput = (data) => {
    setExpression(expressionValues + data);
  };
  const calculate = useMemo(() => calculateExp(expressionValues), [expressionValues]);
  var getState = _.map(queryResponse, _.property("state"));
  const STATE = [...new Set(getState)];
  const currentYear = new Date().getFullYear();
  const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

  const YEAR = range(currentYear, currentYear - 5, -1);
  let outputArr = [];

  forEach(STATE, async (data) => {
    var stateFilterData = _.filter(queryResponse, function (o) {
      return o.state == data;
    });

    var getDistrict = _.map(stateFilterData, _.property("district"));
    const DISTRICT = [...new Set(getDistrict)];

    forEach(DISTRICT, async (districtData) => {
      var districtFilterData = _.filter(stateFilterData, function (o) {
        return o.district == districtData;
      });
      var getSite = _.map(districtFilterData, _.property("site_name"));

      const SITE = [...new Set(getSite)];
      forEach(SITE, async (siteData) => {
        var siteFilterData = _.filter(districtFilterData, function (o) {
          return o.site_name == siteData;
        }).sort((a, b) => b.year - a.year);
        var obj = {};
        forEach(YEAR, async (filterYearData, yearIndex) => {
          const filterSiteData = await siteFilterData.find(async function (element) {
            return Number(element.year) == Number(filterYearData) ? true : false;
          });
          if (yearIndex == 0) {
            obj = {
              district: districtData,
              block_strategy: filterSiteData ? filterSiteData.block_strategy : null,
              site_name: filterSiteData ? filterSiteData.site_name : null,
              current_year_activity: filterSiteData ? filterSiteData.activity : null,
            };
          }
          if (yearIndex == 1) {
            obj = {
              ...obj,
              previous_year_activity: filterSiteData ? filterSiteData.activity : null,
            };
          }
          if (yearIndex != 0 && yearIndex != 1) {
            obj = {
              ...obj,
              [`${filterYearData}_year`]: filterSiteData ? filterSiteData.activity : null,
            };
          }
          console.log(filterSiteData, filterYearData, yearIndex, obj, "filterSiteData");
        });
        (await obj.site_name) !== undefined;
        outputArr.push(obj);
        console.log(obj, outputArr, "outputArr");
      });
    });
  });

  return (
    <center>
      <div className="calculator">
        <div>Calculator</div>
        <div className="resultbox">
          <div>{expressionValues}</div>
          <div>{calculate}</div>
        </div>
        <div className="gridbox">
          {["7", "8", "9", "*", "6", "5", "4", "/", "3", "2", "1", "-", "Del", "0", ".", "+"].map((data, index) => (
            <button onClick={() => handleInput(data)} key={index}>
              {data}
            </button>
          ))}
        </div>
      </div>
    </center>
  );
};
export default Register;
