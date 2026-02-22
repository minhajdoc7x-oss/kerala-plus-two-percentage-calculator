const batchData = {
    science: ["English", "Second Language", "Physics", "Chemistry", "Biology/Comp Science", "Mathematics"],
    commerce: ["English", "Second Language", "Business Studies", "Economics", "Accountancy", "Comp App/Pol Science/Maths"],
    humanities: ["English", "Second Language", "History", "Economics", "Political Science", "Sociology"]
};

// സൈറ്റ് ലോഡ് ചെയ്യുമ്പോൾ തന്നെ സബ്ജക്റ്റുകൾ കാണിക്കാൻ
window.onload = updateSubjects;

function updateSubjects() {
    const batch = document.getElementById('batchSelect').value;
    const subjects = batchData[batch];
    const container = document.getElementById('subjectInputs');
    container.innerHTML = ""; // പഴയത് ക്ലിയർ ചെയ്യാൻ

    subjects.forEach((sub, index) => {
        container.innerHTML += `<input type="number" id="sub${index}" placeholder="${sub} (Out of 200)">`;
    });
}

function calculatePercentage() {
    let totalMarks = 0;
    for (let i = 0; i < 6; i++) {
        totalMarks += parseFloat(document.getElementById(`sub${i}`).value) || 0;
    }

    // പ്ലസ് ടു പെർസെന്റേജ് സൂത്രവാക്യം
    let percentage = (totalMarks / 1200) * 100;

    let resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <div class="final-score">Total: ${totalMarks} / 1200</div>
        <div class="percent-display">${percentage.toFixed(2)}%</div>
    `;
}

function clearAll() {
    updateSubjects(); // ഇൻപുട്ടുകൾ റീസെറ്റ് ചെയ്യാൻ
    document.getElementById('result').innerHTML = "";
}
