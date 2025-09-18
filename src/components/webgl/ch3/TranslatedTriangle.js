// 顶点着色器程序：设置点的坐标和尺寸

const VSHADER_SOURCE = 
    `
    attribute vec4 a_Position;
    // attribute float a_PointSize;
    void main() {
        gl_Position = a_Position;
        // gl_PointSize = 10.0;
    }`; 

// 片元着色器程序：设置点的颜色
const FSHADER_SOURCE = 
    `
    // precision mediump float; // 精度限定词 precision qualifier
    // uniform vec4 u_FragColor;
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
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

    // 设置顶点位置
    const n = initVertexBuffers(gl);
    if (n < 0) {
        console.log('设置顶点位置失败');
        return;
    }

    // 设置canvas的背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);

    // gl.drawArrays(gl.TRIANGLES, 0, n);
    // gl.drawArrays(gl.LINES, 0, n);
    // gl.drawArrays(gl.LINES_STRIP, 0, n);
    // gl.drawArrays(gl.LINE_LOOP, 0, n);
}

//  创建顶点缓冲区对象，将多个顶点的数据保存在缓冲区，然后将缓冲区传给顶点着色器
function initVertexBuffers(gl) { 
    const vertices = new Float32Array([
        0.0, 0.5, -0.5, -0.5, 0.5, -0.5
    ]);
    let n = 3;
    // 创建缓冲区对象
    const vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('创建缓冲区对象失败');
        return -1;
    }
    // 将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // 向缓冲区对象写入数据
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('获取attribute变量存储位置失败');
        return -1;
    }


    // 将缓冲区对象分配给attribute变量a_Position
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    // 连接a_Position变量和缓冲区对象
    gl.enableVertexAttribArray(a_Position);

    return n;
}