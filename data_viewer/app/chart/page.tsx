"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface Store {
  ID: string;
  Label: string;
  City: string;
  State: string;
}

interface CalculationData {
  Store: string;
  SKU: string;
  Week: string;
  "Sales Units": string;
  "Sales Dollars": string;
  "Cost Dollars": string;
  "GM Dollars": string;
  "GM %": string;
}

const Chart = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState([]);
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState("");
  const [calculationData, setCalculationData] = useState<CalculationData[]>([]);
  const [filteredData, setFilteredData] = useState<CalculationData[]>([]);

  useEffect(() => {
    const fetchChart = async () => {
      //for chart data 
      const res = await fetch("/Chart.json");
      const data = await res.json();
      setChartData(data);
    };
    fetchChart();
  }, []);

  useEffect(() => {
    //for drop down
    const fetchStores = async () => {
      const res = await fetch("/Store.json");
      const data = await res.json();
      setStores(data);
    };
    fetchStores();
  }, []);

  useEffect(() => {
    const fetchCalculationData = async () => {
      const res = await fetch("/calculation.json");
      const data = await res.json();
      setCalculationData(data);
    };
    fetchCalculationData();
  }, []);

  useEffect(() => {
    if (selectedStore) {
      const filtered = calculationData.filter((d) => d.Store === selectedStore);
      setFilteredData(filtered);
    }
  }, [selectedStore, calculationData]);

  useEffect(() => {
    if (chartData.length === 0) return;

    d3.select(chartRef.current).selectAll("*").remove();

    const parsedData = chartData.map((d) => ({
      week: d["Week"],
      gm: +d["GM Dollars"].replace(/[^0-9.-]+/g, ""),
    }));

    const parsedFilteredData = filteredData.map((d) => ({
      week: d["Week"],
      gm: +d["GM Dollars"].replace(/[^0-9.-]+/g, ""),
    }));

    const margin = { top: 50, right: 30, bottom: 50, left: 60 };
    const barWidth = 30;
    const width = parsedData.length * barWidth;
    const height = 400;

    const svg = d3
      .select(chartRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(parsedData.map((d) => d.week))
      .range([0, width])
      .padding(0.3);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(parsedData, (d) => d.gm)! * 1.1])
      .range([height, 0]);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "middle")
      .style("font-size", "11px");

    svg.append("g").call(
      d3
        .axisLeft(y)
        .ticks(10)
        .tickFormat((d) => `$${((d as number) / 1000).toFixed(0)}k`)
    );

    svg
      .selectAll(".bar-default")
      .data(parsedData)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.week)!)
      .attr("y", (d) => y(d.gm))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.gm))
      .attr("fill", "royalblue");

    svg
      .selectAll(".bar-selected")
      .data(parsedFilteredData)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.week)! + x.bandwidth() / 4)
      .attr("y", (d) => y(d.gm))
      .attr("width", x.bandwidth() / 2)
      .attr("height", (d) => height - y(d.gm))
      .attr("fill", "orange");

    svg
      .append("rect")
      .attr("x", width / 2 - 125)//blue box of Default
      .attr("y", -27)
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", "royalblue")
      .attr("rx", 3);

    svg
      .append("text")
      .attr("x", width / 2 - 110)//text of default
      .attr("y", -20)
      .text("Default GM Dollars")
      .style("font-size", "14px")
      .attr("alignment-baseline", "middle");

    svg
      .append("rect")
      .attr("x", width / 2 + 20)//orange box pf selected
      .attr("y", -27)
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", "orange")
      .attr("rx", 3);

    svg
      .append("text")
      .attr("x", width / 2 + 40)
      .attr("y", -20) //text of selected
      .text("Selected Store GM Dollars")
      .style("font-size", "14px")
      .attr("alignment-baseline", "middle");
  }, [chartData, filteredData]);

  return (
    <div>
      <div>
        Select Store:
        <select value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)}>
          <option value="">-- Choose a Store --</option>
          {stores.map((store) => (
            <option key={store.ID} value={store.ID}>
              {store.Label}
            </option>
          ))}
        </select>
      </div>
      <svg ref={chartRef}></svg>
    </div>
  );
};

export default Chart;