document.addEventListener('DOMContentLoaded', displaySavedNotes);

let editIndex = -1;

document.getElementById('customerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const customerName = document.getElementById('customerName').value;
    const amountPaid = document.getElementById('amountPaid').value;
    const amountLeft = document.getElementById('amountLeft').value;
    const dateCreated = new Date().toLocaleDateString();

    const customer = {
        name: customerName,
        paid: amountPaid,
        left: amountLeft,
        date: dateCreated
    };

    saveToLocalStorage(customer);
    displaySavedNotes();
    document.getElementById('customerForm').reset();
});

function saveToLocalStorage(customer) {
    let customers = localStorage.getItem('customers') === null ? [] : JSON.parse(localStorage.getItem('customers'));
    if (editIndex === -1) {
        customers.push(customer);
    } else {
        customers[editIndex] = customer;
        editIndex = -1;
    }
    localStorage.setItem('customers', JSON.stringify(customers));
}

function displaySavedNotes() {
    const notesDiv = document.getElementById('notes');
    notesDiv.innerHTML = '';

    let customers = localStorage.getItem('customers') === null ? [] : JSON.parse(localStorage.getItem('customers'));

    customers.forEach((customer, index) => {
        const note = document.createElement('div');
        note.classList.add('note');
        note.innerHTML = `
            <h3>Note ${index + 1}</h3>
            <p><strong>Customer Name:</strong> ${customer.name}</p>
            <p><strong>Amount Paid:</strong> ₹${customer.paid}</p>
            <p><strong>Amount Left:</strong> ₹${customer.left}</p>
            <p><strong>Date Created:</strong> ${customer.date}</p>
            <button class="edit-btn" onclick="editNote(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
        `;
        notesDiv.appendChild(note);
    });
}

function deleteNote(index) {
    let customers = JSON.parse(localStorage.getItem('customers'));
    customers.splice(index, 1);
    localStorage.setItem('customers', JSON.stringify(customers));
    displaySavedNotes();
}

function editNote(index) {
    let customers = JSON.parse(localStorage.getItem('customers'));
    const customer = customers[index];

    document.getElementById('editAmountPaid').value = customer.paid;
    document.getElementById('editAmountLeft').value = customer.left;
    editIndex = index;

    document.getElementById('editFormContainer').style.display = 'block';
}

document.getElementById('editForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let customers = JSON.parse(localStorage.getItem('customers'));

    customers[editIndex].paid = document.getElementById('editAmountPaid').value;
    customers[editIndex].left = document.getElementById('editAmountLeft').value;

    localStorage.setItem('customers', JSON.stringify(customers));
    document.getElementById('editFormContainer').style.display = 'none';
    displaySavedNotes();
});
