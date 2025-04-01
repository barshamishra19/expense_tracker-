// Expense Data
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let budget = localStorage.getItem("budget") || 0;

// Set Budget
function setBudget() {
    budget = document.getElementById("budget").value;
    localStorage.setItem("budget", budget);
    alert(`Budget set to $${budget}`);
}

// Add Expense
function addExpense() {
    let name = document.getElementById("expense-name").value;
    let amount = parseFloat(document.getElementById("expense-amount").value);
    let category = document.getElementById("expense-category").value;

    if (name === "" || isNaN(amount) || amount <= 0) {
        alert("Enter valid expense details!");
        return;
    }

    let expense = { name, amount, category };
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    document.getElementById("expense-name").value = "";
    document.getElementById("expense-amount").value = "";

    updateExpenseList();
    updateChart();
}

// Display Expenses
function updateExpenseList() {
    let list = document.getElementById("expense-list");
    list.innerHTML = "";

    expenses.forEach((exp, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${exp.name}: $${exp.amount} (${exp.category}) 
                        <button onclick="removeExpense(${index})">X</button>`;
        list.appendChild(li);
    });
}

// Remove Expense
function removeExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    updateExpenseList();
    updateChart();
}

// Update Chart.js Graph
function updateChart() {
    let categories = {};
    expenses.forEach(exp => {
        if (categories[exp.category]) {
            categories[exp.category] += exp.amount;
        } else {
            categories[exp.category] = exp.amount;
        }
    });

    let labels = Object.keys(categories);
    let data = Object.values(categories);

    const ctx = document.getElementById('expenseChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
                borderColor: '#fff',
                borderWidth: 2
            }]
        }
    });
}

// Load Data on Page Load
document.addEventListener("DOMContentLoaded", () => {
    updateExpenseList();
    updateChart();
});
