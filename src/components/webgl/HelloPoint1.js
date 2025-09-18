// 顶点着色器程序：设置点的坐标和尺寸
const VSHADER_SOURCE = 
    `void main() {
        gl_Position = vec4(0.0, 0.5, 0.0, 1.0);
        gl_PointSize = 10.0;
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

    // 设置canvas的背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // 清空canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 绘制一个点
    gl.drawArrays(gl.POINTS, 0, 1);
    //调用该函数时，因为我们绘制的是单独的点，所以设置第1个参数为g1.POINIS;设置第2个参数为0，表示从第1个顶点(虽然只有1个顶点)开始画起的第3个参数count为1，表示在这个简单的程序中仅绘制了1个点。
}