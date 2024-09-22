// editingIndex is used for which student is currently edited . -1 indicated no editing has been done . 
let editingIndex = -1;
// It cancels the default form submission with e.preventDefault().
document.getElementById('student-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const studentName = document.getElementById('student-name').value;
    const studentId = document.getElementById('student-id').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contact').value;

    const student = { studentName, studentId, email, contact };

    let students = JSON.parse(localStorage.getItem('students')) || [];

    
    if (editingIndex >= 0) {
        students[editingIndex] = student;
        editingIndex = -1; 
    } else {
        students.push(student);
    }

    localStorage.setItem('students', JSON.stringify(students));
    document.getElementById('student-form').reset();
    displayStudents();
});

function displayStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    students.forEach((student, index) => {
        const row = document.createElement('div');
        row.classList.add('table-body-row');
        row.innerHTML = `
            <div>${student.studentId}</div>
            <div>${student.studentName}</div>
            <div>${student.email}</div>
            <div>${student.contact}</div>
            <div>
                <span class="edit-icon" onclick="editStudent(${index})">✏️</span>
                <span class="delete-icon" onclick="deleteStudent(${index})">🗑️</span>
            </div>
        `;
        tableBody.appendChild(row);
    });
}

function editStudent(index) {
    const students = JSON.parse(localStorage.getItem('students'));
    const student = students[index];

  
    document.getElementById('student-name').value = student.studentName;
    document.getElementById('student-id').value = student.studentId;
    document.getElementById('email').value = student.email;
    document.getElementById('contact').value = student.contact;

 
    editingIndex = index;
}

function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem('students'));
    students.splice(index, 1); 
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents(); 
}


document.addEventListener('DOMContentLoaded', displayStudents);