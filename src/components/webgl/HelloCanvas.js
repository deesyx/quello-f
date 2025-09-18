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

    // 指定清空canvas的背景色
    // gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearColor(0.5, 0.5, 0.5, 1.0);

    // 清空canvas
    gl.clear(gl.COLOR_BUFFER_BIT);
}