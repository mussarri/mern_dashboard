import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { useGetSalesQuery } from "redux/api";
import { Box } from "@mui/material";

function OverviewChart({ isDashboard = false, view }) {
  const { isLoading, isError, data } = useGetSalesQuery();

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error</div>;
  if (data) {
    const lineData = [];
    data.monthlyData.reduce((acc, { month, totalSales, totalUnits }) => {
      const row = {
        x: month,
        y: view === "sales" ? acc + totalSales : acc + totalUnits,
      };
      lineData.push(row);
      return view === "sales" ? acc + totalSales : acc + totalUnits;
    }, 0);
    console.log(lineData);
    const totalSales = [
      {
        id: view === "sales" ? "totalSales" : "totalUnits",
        color: "hsl(84, 70%, 10%)",
        data: lineData,
      },
    ];

    return (
      <Box sx={{ height: "100%", width: "100%" }}>
        <ResponsiveLine
          data={totalSales}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          curve="linear"
          colors={{ scheme: "nivo" }}
          theme={{
            fontSize: "12px",
            textColor: "#aaa",
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "month",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "count",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </Box>
    );
  }
}

export default OverviewChart;
