let e=document.getElementById("editor");
let o=document.getElementById("output");
let r=document.getElementById("run");
let pyodide = await loadPyodide({
        stdout: (text) => { o.innerText += text + "\n"; }
    });
r.onclick=async()=>{
o.innerText = "";
    try {
        let result = await pyodide.runPythonAsync(e.value);
        if (result !== undefined && result !== null) {
            o.innerText += result;
        }
    } catch (error) {
        o.innerText += error;
    }

}