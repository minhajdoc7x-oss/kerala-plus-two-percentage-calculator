const batchData = {
    science: ["English", "Malayalam/Hindi", "Physics", "Chemistry", "Biology/CS", "Mathematics"],
    commerce: ["English", "Malayalam/Hindi", "Business Studies", "Economics", "Accountancy", "Comp App/Maths/Stat/Poli"],
    humanities: ["English", "Malayalam/Hindi", "History", "Economics", "Political Science", "Sociology"]
};

function updateSubjects() {
    const batch = document.getElementById('batchSelect').value;
    const container = document.getElementById('subjectInputs');
    container.innerHTML = "";
    if (batch === "") return;

    batchData[batch].forEach((sub, index) => {
        container.innerHTML += `<input type="number" id="sub${index}" placeholder="${sub} (Max 200)">`;
    });
}

function calculatePercentage() {
    const batch = document.getElementById('batchSelect').value;
    if (batch === "") { alert("Please choose a batch!"); return; }

    let totalMarks = 0;
    for (let i = 0; i < 6; i++) {
        totalMarks += parseFloat(document.getElementById(`sub${i}`).value) || 0;
    }

    let percentage = (totalMarks / 1200) * 100;

    // --- ഇഫക്റ്റ് വരാനുള്ള കോഡ് ---
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff0081', '#4e73df', '#1cc88a']
    });

    document.getElementById('result').innerHTML = `
        <div style="font-size: 18px; color: #333; margin-top:10px;">Total: ${totalMarks} / 1200</div>
        <div class="percent-display">${percentage.toFixed(2)}%</div>
    `;
}

function clearAll() {
    document.getElementById('batchSelect').value = "";
    document.getElementById('subjectInputs').innerHTML = "";
    document.getElementById('result').innerHTML = "";
}
