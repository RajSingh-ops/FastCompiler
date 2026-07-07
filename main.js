import py from './py.js';
import { runCpp } from './cpp.js';

const e = document.getElementById('editor');
const o = document.getElementById('output');
const r = document.getElementById('run');

const btnJava = document.getElementById('java');
const btnPy = document.getElementById('py');
const btnC = document.getElementById('C');
const btnPhp = document.getElementById('php');
const btnJs = document.getElementById('js');

let selectedLang = 'py';
function setSelected(btn) {
    [btnJava, btnPy, btnC, btnPhp, btnJs].forEach(b => b.classList && b.classList.remove('active'));
    if (btn && btn.classList) btn.classList.add('active');
}

btnJava.onclick = () => { selectedLang = 'java'; setSelected(btnJava); };
btnPy.onclick = () => { selectedLang = 'py'; setSelected(btnPy); };
btnC.onclick = () => { selectedLang = 'cpp'; setSelected(btnC); };
btnPhp.onclick = () => { selectedLang = 'php'; setSelected(btnPhp); };
btnJs.onclick = () => { selectedLang = 'js'; setSelected(btnJs); };

setSelected(btnPy);

// Pre-initialize pyodide in background for snappy runs
py.init().catch(()=>{});

r.onclick = async () => {
    const code = e.value;
    if (selectedLang === 'py') {
        await py.runPython(code, o);
    } else if (selectedLang === 'cpp') {
        await runCpp(code, o);
    } else if (selectedLang === 'js') {
        o.innerText = '';
        try {
            const fn = new Function(code);
            const res = fn();
            if (res !== undefined) o.innerText += String(res);
        } catch (err) { o.innerText += String(err); }
    } else {
        o.innerText = `Language '${selectedLang}' not implemented.`;
    }
};

export default {};
