// 专门绘制各种图表的函数

import { Chart } from '@antv/g2';
// 渲染环形图
export function renderRingChart(container: any, data: any, title: string, theme: boolean) {
    // 自定义颜色数组
    const colors = ['#00A971', '#66BB6A', '#8BC34A', '#FFD740', '#FFEB3B', '#CDDC39', '#FFC107'];
    // const colors = ['#00A971', '#4EC49C', '#A7DA73', '#E9C662', '#E9E762', '#D8FF95', '#FFC107'];
    
    const keys = Object.keys(data[0]);
    const x = keys[0];
    const y = keys[1];

    const chart = new Chart({
      container,
      autoFit: true,
      height: 360,
    });
  
    chart.coordinate({ type: 'theta', innerRadius: 0.25, outerRadius: 0.8 });
  
    chart.options({
        type: 'interval',
        title: {
          title: title, // 主标题
          // subtitle: '限制高度的柱形图', // 副标题
        },
        theme: theme ? 'light' : 'dark',
        style: { radius: 4, inset: 1 },
        data,
        transform: [{ type: 'sortX', by: 'y', reverse: true }, { type: 'stackY' }],
        encode: { 
          y,
          color: x
        },
        // 使用预定义的颜色数组
        scale: {
          color: {
              range: colors
          }
        },
        labels: [
          {
            text: y,
            fontWeight: 'bold',
            offset: 14,
          },
          {
            text: x,
            position: 'spider',
            connectorDistance: 0,
            fontWeight: 'bold',
            textBaseline: 'bottom',
            dy: -4,
          }
        ],
        animate: { enter: { type: 'waveIn' } },
        legend: false,
      });

    chart.render();
  
    console.log('绘制环形图成功。');
    return chart;
  }

export function renderColumnChart(container: any, data: any, title: string, theme: boolean) {
  
  const keys = Object.keys(data[0]);
  const x = keys[0];
  const y = keys[1];

  const chart = new Chart({
    container,
    autoFit: true,
    height: 360,
  });

  // 声明可视化
  chart.options({
    theme: theme ? 'light' : 'dark',
    type: 'interval',
    title: {
      title,
    //   subtitle: '副标题',
    },
    encode: { x, y, key: x },
    data,
    // xField: 'genre',
    // yField: 'sold',
    scale: {
      color: {
          independent: true // Make color independent of data
      }
    },
    style: {
        fill: '#00A971' // Set the specific color
    },
    animate: {
      update: { duration: 300, easing: 'easeQuadInOut' }
    }
  });

  // 渲染可视化
  chart.render();

  return chart;
}


export function renderColumnChartHorizontal(container: any, data: any, title: string, theme: boolean) {
  
  const keys = Object.keys(data[0]);
  const x = keys[0];
  const y = keys[1];

  const chart = new Chart({
    container,
    autoFit: true,
    height: 360,
  });

  // 声明可视化
  chart.options({
    theme: theme ? 'light' : 'dark',
    type: 'interval',
    title: {
      title,
    //   subtitle: '副标题',
    },
    encode: { x, y, key: x },
    data,
    // xField: 'genre',
    // yField: 'sold',
    scale: {
      color: {
          independent: true // Make color independent of data
      }
    },
    style: {
        fill: '#00A971' // Set the specific color
    },
    coordinate: { 
      transform: [{ type: 'transpose' }] // 转置坐标系实现横向效果
    },
    animate: {
      update: { duration: 300, easing: 'easeQuadInOut' }
    }
  });

  // 渲染可视化
  chart.render();

  return chart;
}

export function renderBarChart(container: any, data: any, title: string, theme: boolean) {

    const colors = ['#00A971', '#4EC49C', '#A6DA73', '#E9C662'];

    const keys = Object.keys(data[0]);
    const x = keys[0];
    const y = keys[1];

    const chart = new Chart({
      container,
      autoFit: true,
      height: 360,
    });
  
    chart.options({
        title: {
          title, 
        //   subtitle: '副标题',
        },
        theme: theme ? 'light' : 'dark',
        type: 'interval',
        data,
        encode: { x, y, color: x },
        // 使用预定义的颜色数组
        scale: {
          color: {
              range: colors
          }
        },
        style: { minHeight: 50 },
      });
  
    chart.render();
    
    return chart; // 添加返回语句
}

// 渲染条形图（x轴垂直向上，y轴水平向右）
export function renderHorizontalBarChart(container: any, data: any, title: string, theme: boolean) {
  const colors = [
    '#FFD700', // 金色
    '#90EE90', // 淡绿
    '#98FB98', // 淡绿
    '#228B22', // 深绿
    '#4169E1', // 蓝色
    '#FFA500', // 橙色
    '#8A2BE2', // 紫色
    '#87CEEB', // 天蓝
    '#DDA0DD'  // 淡紫

];
  const keys = Object.keys(data[0]);
    const x = keys[0];
    const y = keys[1];

    const chart = new Chart({
      container,
      autoFit: true,
      height: 360,
    });

    // 配置坐标系，使x轴垂直向上，y轴水平向右
    chart.options({
        title: {
          title,
        },
        theme: theme ? 'light' : 'dark',
        type: 'interval',
        data,
        transform: [{ type: 'sortX', by: 'y', reverse: true }], // 按照y值排序x轴，reverse: false表示从小到大
        encode: { x, y, color: x },
        scale: {
          color: {
              range: colors
          }
        },
        style: { minHeight: 50 },
        coordinate: { 
          transform: [{ type: 'transpose' }] // 转置坐标系实现横向效果
        },
        axis: {
          x: { title: false },
          y: { title: false }
        }
      });

    chart.render();

    return chart;
}

export function renderBarChart2(container: any, data: any, title: string, theme: boolean) {

    const keys = Object.keys(data[0]);
    const x = keys[0];
    const y = keys[1];

    const chart = new Chart({
      container,
      autoFit: true,
      height: 360,
    });
  
    chart.options({
        title: {
          title, 
        //   subtitle: '副标题',
        },
        theme: theme ? 'light' : 'dark',
        type: 'interval',
        data,
        encode: { x, y, color: x },
        style: { minHeight: 50 },
      });
  
    chart.render();
    
    return chart; // 添加返回语句
}

// 折线图
export function renderLineChart(container: any, data: any, title: string, theme: boolean) {

    const keys = Object.keys(data[0]);
    const x = keys[0];
    const y = keys[1];

    const chart = new Chart({
      container,
      autoFit: true,
      height: 360,
    });
  
    chart.options({
      theme: theme ? 'light' : 'dark',
      type: 'view',
      // title: {
      //     title,
      //   //   subtitle: '副标题',
      // },
      autoFit: true,
      paddingRight: 10,
      data,
      // scale: {
      //   y: {
      //     nice: true,
      //     tickMethod: () => [0, 50, 100, 170, 199],
      //   },
      // },
      // axis: {
      //   x: {
      //     labelFormatter: (d:string) => d.substring(0, 4)+'年'+d.substring(5, 7)+'月',
      //   },
      // },
      children: [
        {
          type: 'area',
          encode: { x, y, shape: 'smooth' },
          // axis: { y: { labelFormatter: '~s', title: false } },
          style: {
            fill: 'linear-gradient(90deg, rgba(44, 182, 121, 0.2) 0%, rgba(44, 182, 121, 0) 100%)',
            // fillOpacity: 0.2,
          },
          tooltip: false,
        },
        {
          type: 'line',
          encode: { x, y, shape: 'smooth' },
    //       interaction: {
    //         tooltip: {
    //           render: (event, { title, items }) => `
    // <div style="display: flex; align-items: center;">
    //   <span>${title}：</span>
    //   <h2
    //     style="
    //         margin-left: 8px;
    //         margin-right: 8px;
    //         margin-top:4px;
    //         font-size: 18px;
    //         line-height: 36px;
    //         font-weight: 500px"
    //   >
    //     ${items[0].value}
    //   </h2>
    // </div>
    //           `,
    //         },
    //       },
          style: {
            lineWidth: 2,
            stroke: '#2CB679',
          },
        },
      ],
    });
    
  
    // 渲染可视化
    chart.render();
  
    return chart;
  }