"use client";
import 'chart.js/auto';

import {Button, Input} from "@nextui-org/react";
import {Radar} from "react-chartjs-2";
import {useState} from "react";
import {getSortedSkills} from "@/actions/skills/skills";

export default function Home() {

    const [countUser, setCountUser] = useState('0');
    const [countSkills, setCountSkills] = useState('0');
    const [data, setData] = useState(null);

    const handleClick = async () => {
        const backendData = await getSortedSkills({
            num_users: countUser,
            num_all_skills: countSkills
        })
        if (backendData) {
            setData(backendData)
        }
    }

    const CompareRadar = ({userSkills, desiredSkills, score}) => {
        const radarData = {
            labels: Array.from(Array(Number(countSkills)).keys()).map((item, index) => `Skill #${index}`),
            datasets: [{
                label: 'Desired',
                data: desiredSkills,
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
            }, {
                label: 'User skill',
                data: userSkills,
                fill: true,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(54, 162, 235)'
            }]
        }
        return <div>
            <span>Score: <b>{Number(score * 100).toFixed(2)}%</b></span>
            <Radar data={radarData} options={
                {
                    elements: {
                        line: {
                            borderWidth: 3
                        }
                    },
                    scales: {
                        r: {
                            angleLines: {
                                display: true
                            },
                            ticks: {
                                stepSize: 20,
                            },
                            suggestedMin: 0,
                            suggestedMax: 100
                        }
                    }
                }
            }/>
        </div>
    }

    return (
        <main className={"px-32 text-black bg-white flex flex-col gap-2"}>
            <div/>
            <span className={"text-2xl font-bold"}>Checking cosine similarity</span>
            <hr/>
            <div className={"flex flex-col gap-1 max-w-[450px]"}>
                <span className={"text-xl font-medium mb-2"}>Enter the number of users and the number of skills.</span>
                <Input size={"sm"} label={"User count"} onChange={(v) => setCountUser(v.target.value)} required/>
                <Input size={"sm"} label={"Skill count"} onChange={(v) => setCountSkills(v.target.value)} required/>
                <Button onClick={handleClick} variant={"ghost"} color={"primary"}>Get all skills</Button>
            </div>
            <hr/>
            <div>
                <span className={"text-xl font-medium mb-2"}>Result</span>
                {data?.users ?
                    <div className={"grid grid-cols-3 gap-2"}>
                        {data?.users?.map(user =>
                            <CompareRadar key={user?.score} userSkills={user?.skills} desiredSkills={data?.desired}
                                          score={user?.score}/>)}
                    </div>
                    : <div className={"text-gray-600"}>Please first enter the number of users and the number of skills.</div>}
            </div>
            <hr/>
        </main>
    );
}
