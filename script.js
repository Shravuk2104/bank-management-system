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

            const accountName = document.getElementById('accountName').value;
            const accountNumber = document.getElementById('accountNumber').value;
            const accountType = document.getElementById('accountType').value;
            const initialBalance = parseFloat(document.getElementById('initialBalance').value);

            accounts.push({ name: accountName, number: accountNumber, type: accountType, balance: initialBalance });
            renderAccounts();
            document.getElementById('addAccountForm').reset();
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

        renderAccounts();