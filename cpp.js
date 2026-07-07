export async function runCpp(code, outputEl) {
    outputEl.innerText = "Compiling C++...\n";
    const payload = {
        source_code: code,
        language_id: 54,
        stdin: ""
    };
    try {
        const res = await fetch('https://judge0.p.rapidapi.com/submissions?base64_encoded=false&wait=true', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        if (!res.ok) {
            outputEl.innerText += `Request failed: ${res.status} ${res.statusText}\n`;
            outputEl.innerText += 'Judge0 endpoint may require an API key or be unreachable from this origin.';
            return;
        }
        const result = await res.json();
        if (result.stdout) outputEl.innerText += result.stdout;
        if (result.stderr) outputEl.innerText += result.stderr;
        if (result.compile_output) outputEl.innerText += result.compile_output;
        if (!result.stdout && !result.stderr && !result.compile_output) {
            outputEl.innerText += JSON.stringify(result, null, 2);
        }
    } catch (err) {
        outputEl.innerText += String(err);
    }
}

export default { runCpp };
