let pyodide = null;
let currentOutput = null;

async function ensurePyodide() {
    if (!pyodide) {
        pyodide = await loadPyodide({
            stdout: (text) => { if (currentOutput) currentOutput.innerText += text + "\n"; }
        });
    }
}

export async function runPython(code, outputEl) {
    currentOutput = outputEl;
    outputEl.innerText = "";
    try {
        await ensurePyodide();
        let result = await pyodide.runPythonAsync(code);
        if (result !== undefined && result !== null) {
            outputEl.innerText += result;
        }
    } catch (error) {
        outputEl.innerText += String(error);
    }
}

export async function init() {
    await ensurePyodide();
}

export default { runPython, init };
