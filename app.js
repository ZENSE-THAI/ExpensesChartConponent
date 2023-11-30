function genarateChart () {
    fetch('./data.json')
    .then((res) => res.json()) //fecth ข้อมูลจาก data.json
    .then((data) => {
        const maxAmount = Math.max(...data.map((chart) => chart.amount));
        const info  = {
            labels: data.map((chart) => chart.day),
            datasets : [
                {   
                    data:data.map((chart) => chart.amount),
                    backgroundColor: data.map((chart) => {
                        return chart.amount === maxAmount ? "hsl(186, 34%, 60%)" : "hsl(10, 79%, 65%)";
                    }),
                    borderRadius:5,
                    hoverBackgroundColor:data.map((chart) => {
                        return chart.amount === maxAmount ? "hsla(186, 34%, 60%,.6t)" : "hsla(10, 79%, 65%,.5)";
                    }),
                    Cursor:["pointer"],
                }
            ]
        }
        const titleTooltip=(e)=>`$${e[0].formattedValue}`;
        const labelTooltip=(e)=>"";
        const options = {
            scales:{
                y:{
                    ticks:{
                        display:false
                    },
                    grid:{
                        display:false,
                        drawTicks:false,
                        drawBorder:false
                    },
                },
                x:{
                    grid:{
                        display:false,
                        drawTicks:false,
                    },

                }
            },
            plugins :{
                legend:{
                    display:false,
                    },
                tooltip:{
                    yAlign:"bottom",
                    displayColors:false,
                    callbacks:{
                        title:titleTooltip,
                        label:labelTooltip,
                    }
                }
            }
        }
        const config = {
            responsive: true,
            type : "bar",
            data : info ,
            options
        }  // 

        const myChart = new Chart(document.getElementById("myChart"),config)
    })
}

genarateChart(myChart); // เรียกใช้ฟังก์ชัน generateChart() เพื่อสร้างกราฟ