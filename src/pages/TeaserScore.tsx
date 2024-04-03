import { Doughnut } from 'react-chartjs-2';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import TeaserScoreHeader from '@/components/TeaserScoreHeader';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

function TeaserScore() {
    const data = {
        labels: ['Introductory', 'Intermediate', 'Advanced',],
        datasets: [{
            label: 'Poll',
            data: [100], 
            backgroundColor: ['#FFD56A','green', 'red'],
            borderColor: ['#FFD56A','green', 'red', ],

        }]
    };


    const textCenter = {
        id: 'textCenter',
        beforeDatasetDraw(chart:any) {
            const { ctx, data } = chart;
            ctx.save();
            ctx.font = 'bold 25px sans-serif';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${data.datasets[0].data[0]}%`, chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y)
            ctx.restore();
        }
    };
    const options = {
        cutout: '80%',
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function (context:any) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += Math.round(context.parsed * 100) + '%';
                        return label;
                    }
                }
            }
        }
    };

    const Labels = () => (
        <div className="absolute left-0 top-0 flex flex-col justify-center h-full">
            {data.labels.map((label, index) => {
                let colorClass, opacityClass, message;
                if (index === 0) {
                    colorClass = 'bg-gradient-to-r from-red-500 via-red-500 to-transparent';
                    opacityClass = 'bg-opacity-25';
                    message = '0 to 39.9';
                } else if (index === 1) {
                    colorClass = 'bg-gradient-to-r from-yellow-500 via-yellow-500 to-transparent';
                    opacityClass = 'bg-opacity-50';
                    message = '40 to 69.9';
                } else {
                    colorClass = 'bg-gradient-to-r from-green-500 via-green-500 to-transparent';
                    opacityClass = 'bg-opacity-75';
                    message = '70 to 100';
                }
                return (
                    <div key={index} className="text-sm flex flex-col items-center relative  mt-10 h-6">
                        <div className={`absolute left-0 top-0 h-full w-2/4 ${colorClass} ${opacityClass} rounded-l-lg rounded-r-none `}></div>
                        <div className="ml-10 pl-2 rounded-r-lg">{label}</div>
                        <div className="ml-10 pl-2 rounded-r-lg">{message}</div>
                    </div>
                );
            })}
        </div>
    );

    return (
        <div className="flex flex-col h-screen">
            <TeaserScoreHeader />       
            <div className="bg-[url('../assets/img/backgroundscore.png')]">
                <div className="w-full max-w-[800px] mx-auto mt-20 mb-32 flex justify-center">
                    <Card className="border-t-8 border-solid border-[#00778B] flex justify-between">
                        <div className='mr-0'>
                            <CardHeader>
                                <div className="flex flex-col pl-8 pt-4">
                                    <div className="flex items-center">
                                        <CardTitle className="text-xl font-bold">Hooray!</CardTitle>
                                        <img
                                            className="w-[32px] h-[32px] ml-3 mb-0"
                                            src="../assets/img/Green.png"
                                            alt="Green checkmark"
                                        />
                                    </div>
                                    <div className="bg-[#64A70B] h-1 w-20 mt-0 ml-0"></div>
                                </div>
                            </CardHeader>
                            <CardContent className=" pr-0 flex">
                                <div className="pl-8 flex-1">
                                    <CardDescription className="text-sm font-[calibri] text-[#002A3A]">You've taken the first stride on your sustainability journey!🌿</CardDescription>
                                    <p className="font-bold font-[calibri] text-[#002A3A]">Curious about your progress?</p>
                                    <p className="text-sm font-[calibri] text-[#002A3A]">
                                        To view the full results and embark on the complete learning
                                        <br />
                                        experience, hop over to our registration page. Your adventure
                                        <br />
                                        towards sustainability is about to get even more exciting! 🚀
                                        <br />
                                    </p>
                                    <button className="bg-[#00778B] text-white py-2 px-4 rounded-md ml-0 mt-4">
                                        Complete your Registration
                                    </button>
                                </div>
                            </CardContent>
                        </div>

                        <div className="flex justify-between">
                            <div className=" mt-0 mb-6 mr-18 ml-8   relative">
                                <h2 className="text-lg font-semibold mt-8 ml-5">Here's a sneak peek at your score!</h2>
                                <Labels />
                                <div className="text-center mt-8 mb-0 mr-8 ml-20  relative">
                                    <div className="w-40 h-40 mt-0 ml-16 relative">
                                        <Doughnut data={data} options={options} plugins={[textCenter]} />
                                    </div>
                                    <div>
                                        <button className="bg-yellow-500 hover:bg-yellow-500 active:bg-yellow-500 text-white font-bold py-1 px-4 mt-3 ml-20 rounded">
                                            Intermediate
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default TeaserScore;
