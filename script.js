const history = [];

const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const err1 = document.getElementById("err1");
const err2 = document.getElementById("err2");

document.getElementById("calculator-form").addEventListener("submit", function (event) {
    event.preventDefault();

    num1.classList.remove("error-border"); err1.style.display = "none"; err1.textContent = "";
    num2.classList.remove("error-border"); err2.style.display = "none"; err2.textContent = "";

    const n1 = parseInput(num1.value);
    const n2 = parseInput(num2.value);

    if (n1 === null) { num1.classList.add("error-border"); err1.textContent = "Введите число"; err1.style.display = "block"; }
    if (n2 === null) { num2.classList.add("error-border"); err2.textContent = "Введите число"; err2.style.display = "block"; }
    if (n1 === null || n2 === null) return;

    const op = document.getElementById("operator").value;
    let result;

    if (op === "+") result = n1 + n2;
    else if (op === "-") result = n1 - n2;
    else if (op === "*") result = n1 * n2;
    else if (op === "/") {
        if (n2 === 0) { num2.classList.add("error-border"); err2.textContent = "Деление на ноль"; err2.style.display = "block"; return; }
        result = n1 / n2;
    }

    result = parseFloat(result.toFixed(10));

    history.push(`${n1} ${op} ${n2} = ${result}`);

    const box = document.getElementById("result-box");
    box.innerHTML = "";
    history.slice(-4).forEach((expr, i, arr) => {
        const div = document.createElement("div");
        div.className = "history-item" + (i < arr.length - 1 ? " history-item--pale" : "");
        div.textContent = expr;
        box.appendChild(div);
    });
});

function parseInput(raw) {
    const num = Number(raw.replace(",", ".").trim());
    return (raw.trim() !== "" && Number.isFinite(num)) ? num : null;
}

num1.addEventListener("input", () => { num1.classList.remove("error-border"); err1.style.display = "none"; });
num2.addEventListener("input", () => { num2.classList.remove("error-border"); err2.style.display = "none"; });
