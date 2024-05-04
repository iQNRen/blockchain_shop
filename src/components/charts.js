import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const BarChart = () => {
    const chartRef = useRef(null);
    useEffect(() => {
        let num = [0, 0, 0];
        let data = JSON.parse(localStorage.getItem('orders'))
        for (let i = 0; i < data.length; i++) {
            if (data[i].category === '电子产品') {
                num[0] += 1;
            }
            if (data[i].category === '服装') {
                num[1] += 1;
            }
            if (data[i].category === '玩具') {
                num[2] += 1;
            }
        } console.warn("num", num)
        const chartDom = chartRef.current;
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(chartDom);
        const option = {
            title: {
                text: '各产品销售情况'
            },
            tooltip: {},
            xAxis: {
                data: ['电子产品', '服装', '玩具']
            },
            yAxis: {},
            series: [
                {
                    name: '销量',
                    type: 'bar',
                    data: [num[0], num[1], num[2]]
                }
            ]
        }
        option && myChart.setOption(option);
    }, [])

    return <div ref={chartRef} style={{ width: '600px', height: '400px' }}></div>

}

export default BarChart;
