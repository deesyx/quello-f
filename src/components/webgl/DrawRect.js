function main() {
    // 获取canvas元素
    const canvas = document.getElementById('example');
    if (!canvas) {
        console.log('获取canvas失败');
        return;
    }

    // 获取绘制二维图形的绘图上下文
    const ctx = canvas.getContext('2d');

    // 绘制矩形
    ctx.fillStyle = 'rgba(0, 0, 255, 1.0)';
    ctx.fillRect(120, 10, 150, 150);
}