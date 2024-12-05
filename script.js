const accountList = document.getElementById('accountList');
const accounts = [];

function renderAccounts() {
    accountList.innerHTML = '';
    if (accounts.length === 0) {
        accountList.innerHTML = '<tr><td colspan="5" class="text-muted text-center">No accounts added yet.</td></tr>';
    } else {
        accounts.forEach((account, index) => {
            accountList.innerHTML += `
                <tr>
                    <td>${account.name}</td>
                    <td>${account.number}</td>
                    <td>${account.type}</td>
                    <td>${account.balance}</td>
                    <td>
                        <button class="btn btn-warning btn-sm me-2" onclick="editAccount(${index})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteAccount(${index})">Delete</button>
                    </td>
                </tr>
            `;
        });
    }
}

document.getElementById('addAccountForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const accountName = document.getElementById('accountName').value.trim();
    const accountNumber = document.getElementById('accountNumber').value.trim();
    const accountType = document.getElementById('accountType').value;
    const initialBalance = parseFloat(document.getElementById('initialBalance').value);

    // Check if the account number already exists
    const accountExists = accounts.some(account => account.number === accountNumber);

    if (accountExists) {
        showError("Account with this number already exists. Please use a different account number.");
        return;
    }

    // Add the account if it doesn't exist
    accounts.push({ name: accountName, number: accountNumber, type: accountType, balance: initialBalance });
    renderAccounts();
    document.getElementById('addAccountForm').reset();
    showSuccess("Account added successfully!");
});

function editAccount(index) {
    const account = accounts[index];

    document.getElementById('accountName').value = account.name;
    document.getElementById('accountNumber').value = account.number;
    document.getElementById('accountType').value = account.type;
    document.getElementById('initialBalance').value = account.balance;

    accounts.splice(index, 1);
    renderAccounts();
}

function deleteAccount(index) {
    accounts.splice(index, 1);
    renderAccounts();
}

function showError(message) {
    // Create an error box element
    const errorBox = document.createElement('div');
    errorBox.className = 'alert alert-danger mt-3';
    errorBox.textContent = message;

    // Add the error box to the form
    const form = document.getElementById('addAccountForm');
    form.appendChild(errorBox);

    // Remove the error box after 3 seconds
    setTimeout(() => {
        form.removeChild(errorBox);
    }, 3000);
}

function showSuccess(message) {
    // Create a success box element
    const successBox = document.createElement('div');
    successBox.className = 'alert alert-success mt-3';
    successBox.textContent = message;

    // Add the success box to the form
    const form = document.getElementById('addAccountForm');
    form.appendChild(successBox);

    // Remove the success box after 3 seconds
    setTimeout(() => {
        form.removeChild(successBox);
    }, 3000);
}

renderAccounts();
