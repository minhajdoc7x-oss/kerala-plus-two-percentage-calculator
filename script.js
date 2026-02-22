const batchData = {
    science: ["English", "Malayalam/Hindi", "Physics", "Chemistry", "Biology/Computer Science", "Mathematics"],
    commerce: ["English", "Malayalam/Hindi", "Business Studies", "Economics", "Accountancy", "Comp App/Pol Science/Maths"],
    humanities: ["English", "Malayalam/Hindi", "History", "Economics", "Political Science", "Sociology"]
};

function updateSubjects() {
    const batch = document.getElementById('batchSelect').value;
    const container = document.getElementById('subjectInputs');
    container.innerHTML = "";

    if (batch === "") {
        container.innerHTML = "<p style='color: #666;'>Please select your batch to continue.</p>";
        return;
    }

    batchData[batch].forEach((sub, index) => {
        container.innerHTML += `<input type="number" id="sub${index}" placeholder="${sub} (Max 200)">`;
    });
}

function calculatePercentage() {
    const batch = document.getElementById('batchSelect').value;
    if (batch === "") {
        alert("Please choose a batch first!");
        return;
    }

    let totalMarks = 0;
    for (let i = 0; i < 6; i++) {
        let mark = parseFloat(document.getElementById(`sub${i}`).value) || 0;
        totalMarks += mark;
    }

    // Formula: (Total Marks / 1200) * 100
    let percentage = (totalMarks / 1200) * 100;

    document.getElementById('result').innerHTML = `
        <div style="font-size: 18px; color: #333;">Total Score: ${totalMarks} / 1200</div>
        <div class="percent-display">${percentage.toFixed(2)}%</div>
    `;
}

function clearAll() {
    document.getElementById('batchSelect').value = "";
    document.getElementById('subjectInputs').innerHTML = "";
    document.getElementById('result').innerHTML = "";
    updateSubjects();
}
