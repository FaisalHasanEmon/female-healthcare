import React from "react";
import AnalyticsCharts from "../../../../components/dashboardComponents/AnalyticsCharts";
import { DoughnutChart } from "../../../../components/dashboardComponents/DoughnutChart";

const Analytics = () => {
  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-12   gap-8 *:rounded-[20px] ">
        {/* Item - 1  */}
        <div className="lg:col-span-5 lg:row-span-6 ">
          <AnalyticsCharts heading="Mood"></AnalyticsCharts>
        </div>
        {/* Item - 2  */}
        <div className="lg:col-span-4 lg:row-span-6 ">
          <AnalyticsCharts heading="Energy"></AnalyticsCharts>
        </div>
        {/* Item - 3 */}
        <div className="lg:col-span-3 lg:row-span-7">
          <DoughnutChart></DoughnutChart>
        </div>
        {/* Item - 4 */}
        <div className="lg:col-span-5 lg:row-span-6 ">
          <AnalyticsCharts heading="Symptoms"></AnalyticsCharts>
        </div>
        {/* Item - 5 */}
        <div className="lg:col-span-4 lg:row-span-6 bg-brandPrimary/45 p-[18px]  space-y-[18px]">
          <h3 className="text-[20px] text-black font-semibold">
            FENYX Insight
          </h3>
          <p className="text-[14px] text-[#666666]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
            alias aliquam esse quasi adipisci corporis doloremque quo asperiores
            temporibus saepe nam, quisquam modi laboriosam rerum cum placeat
            beatae. Optio, aut aliquam aspernatur recusandae dicta ratione
            eveniet aliquid, facere sunt fugiat tempora nulla nemo ab ut error?
            Iure, ullam. At, repudiandae?
          </p>
        </div>
        {/* Item - 6 */}
        <div className="lg:col-span-3 lg:row-span-5 "></div>
      </div>
    </section>
  );
};

export default Analytics;
