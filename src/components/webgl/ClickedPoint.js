// 顶点着色器程序：设置点的坐标和尺寸

const VSHADER_SOURCE = 
    `
    attribute vec4 a_Position;
    attribute float a_PointSize;
    void main() {
        gl_Position = a_Position;
        gl_PointSize = a_PointSize;
    }`; 

// 片元着色器程序：设置点的颜色
const FSHADER_SOURCE = 
    `void main() {
        gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
    }`; 

function main(){
    const canvas = document.getElementById('webgl');
    if(!canvas){
        console.log('获取canvas失败');
        return;
    }

    // 获取webGL绘图上下文
    const gl = getWebGLContext(canvas);
    if(!gl){
        console.log('获取webgl上下文失败');
        return;
    }

    // 初始化着色器
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('初始化着色器失败');
        return;
    }

    // 获取attribute变量的存储位置
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position');

    if (a_Position < 0) {
        console.log('获取attribute变量存储位置失败');
        return -1;
    }

    const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');

    // 注册鼠标点击事件响应函数
    canvas.onmousedown = function(ev) {
        click(ev, gl, canvas, a_Position);
    }
    // 将顶点位置传输给attribute变量
    gl.vertexAttrib3f(a_Position, 0.0, 0.5, 0.0);
    gl.vertexAttrib1f(a_PointSize, 5.0);


    // 设置canvas的背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);


}

let g_points = [];
function click(ev, gl, canvas, a_Position) {
    let x = ev.clientX;
    let y = ev.clientY;
    let rect = ev.target.getBoundingClientRect();
    // 1、将鼠标点击位置的坐标（浏览器窗口中的坐标）换算成在canvas画布中的坐标
    // rect.left和rect.top是canvas的原点在浏览器客户区中的坐标，所以先用x、y分别减去它们
    // 2、然后将canvas坐标转换到WebGL坐标系
    // 先把canvas的原点平移到中心点
    // 然后将0~400映射到-1.0~1.0
    x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);
    // 将坐标存储到数组中
    g_points.push([x, y]);

    // 每次绘制之前都要用制定背景色来清空画布
    gl.clear(gl.COLOR_BUFFER_BIT);

    for (let i=0; i<g_points.length; i++) {
        const xy = g_points[i];
        gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}