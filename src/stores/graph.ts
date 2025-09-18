// 专门绘制各种图表的函数

import { Chart } from '@antv/g2';
// 渲染环形图
export function renderRingChart(container: any, data: any, title: string, theme: boolean) {
    
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
    animate: {
      update: { duration: 300, easing: 'easeQuadInOut' }
    }
  });

  // 渲染可视化
  chart.render();

  return chart;
}


export function renderBarChart(container: any, data: any, title: string, theme: boolean) {

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

// 渲染条形图（x轴垂直向上，y轴水平向右）
export function renderHorizontalBarChart(container: any, data: any, title: string, theme: boolean) {
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
  
    // 声明可视化
    chart.options({
      theme: theme ? 'light' : 'dark',
      type: 'line',
      title: {
          title,
        //   subtitle: '副标题',
      },
      data,
      encode: { x, y, key: x },
      style: {
          lineWidth: 3,
      },
      animate: {
        update: { duration: 300 }
      }
    });
  
    // 渲染可视化
    chart.render();
  
    return chart;
  }