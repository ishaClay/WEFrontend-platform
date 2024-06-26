import { Doughnut } from "react-chartjs-2";

const MaturityLevel = () => {
  const data = {
    labels: ["Introductory", "Intermediate", "Advanced"],
    datasets: [
      {
        label: "Poll",
        data: [100],
        backgroundColor: ["#FFD56A", "green", "red"],
        borderColor: ["#FFD56A", "green", "red"],
      },
    ],
  };

  const textCenter = {
    id: "textCenter",
    beforeDatasetDraw(chart: any) {
      const { ctx, data } = chart;
      ctx.save();
      ctx.font = "bold 25px sans-serif";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        `${data.datasets[0].data[0]}%`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      );
      ctx.restore();
    },
  };

  const options = {
    cutout: "80%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            label += Math.round(context.parsed * 100) + "%";
            return label;
          },
        },
      },
    },
  };

  const Labels = () => (
    <div className="left-0 top-0 h-full flex items-center gap-5">
      {data.labels.map((label, index) => {
        let colorClass, opacityClass;
        if (index === 0) {
          colorClass =
            "bg-gradient-to-r from-red-500 via-red-500 to-transparent";
          opacityClass = "bg-opacity-25";
        } else if (index === 1) {
          colorClass =
            "bg-gradient-to-r from-yellow-500 via-yellow-500 to-transparent";
          opacityClass = "bg-opacity-50";
        } else {
          colorClass =
            "bg-gradient-to-r from-green-500 via-green-500 to-transparent";
          opacityClass = "bg-opacity-75";
        }
        return (
          <div key={index} className="flex items-center relative">
            <div
              className={`w-[60px] h-[27px] ${colorClass} ${opacityClass} rounded-l-lg rounded-r-none `}
            ></div>
            <div className="text-base text-black font-nunito rounded-r-lg ms-[-30px]">
              {label}
            </div>
          </div>
        );
      })}
    </div>
  );
  return (
    <div className="mb-8">
      <div className="mb-5">
        <h3 className="font-bold font-nunito xl:text-[22px] text-[18px] relative pb-1">
          Our Maturity Level
          <div className="bg-[#64A70B] w-[115px] h-[2px] absolute left-0 bottom-0"></div>
        </h3>
      </div>
      <div className="relative grid grid-cols-12 items-center">
        <div className="xl:col-span-2 col-span-4">
          <div className="w-52 h-52 relative">
            <Doughnut data={data} options={options} plugins={[textCenter]} />
          </div>
        </div>
        <div className="xl:col-span-10 col-span-8 border border-[#D9D9D9] rounded-xl h-[200px] flex items-center">
          <div className="ps-10">
            <div className="mb-5">
              <p className="inline">Your overall sustainability level -</p>{" "}
              <span className="font-poppins font-bold text-[#000000] leading-6">
                Intermediate
              </span>
            </div>
            <div className="flex">
              <Labels />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaturityLevel;
