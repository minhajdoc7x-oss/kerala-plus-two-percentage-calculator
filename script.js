const batchData = {
    science: ["English", "Second Language", "Physics", "Chemistry", "Biology/CS", "Mathematics"],
    commerce: ["English", "Second Language", "Business Studies", "Economics", "Accountancy", "Comp App/Maths/Stat/Poli"],
    humanities: ["English", "Second Language", "History", "Economics", "Political Science", "Sociology"]
};

function updateSubjects() {
    const batch = document.getElementById('batchSelect').value;
    const container = document.getElementById('subjectInputs');
    container.innerHTML = "";
    document.getElementById('result').innerHTML = "";

    if (!batch) return;

    batchData[batch].forEach((sub, index) => {
        container.innerHTML += `
            <input type="number" 
                   id="sub${index}" 
                   placeholder="${sub} (Max 200)" 
                   min="0" 
                   max="200"
                   required>
        `;
    });
}

function calculatePercentage() {
    const batch = document.getElementById('batchSelect').value;
    if (!batch) {
        alert("Please choose a batch!");
        return;
    }

    let totalMarks = 0;

    for (let i = 0; i < 6; i++) {
        const value = document.getElementById(`sub${i}`).value;

        if (value === "") {
            alert("Please enter all subject marks!");
            return;
        }

        if (value > 200 || value < 0) {
            alert("Marks must be between 0 and 200!");
            return;
        }

        totalMarks += parseFloat(value);
    }

    let percentage = (totalMarks / 1200) * 100;

    // Confetti Effect 🎉
    confetti({
        particleCount: 180,
        spread: 90,
        origin: { y: 0.6 }
    });

    // Added Watermark and result display
    document.getElementById('result').innerHTML = `
        <div class="watermark">Minhaj</div>
        <div style="margin-top:15px; position: relative; z-index: 2;">
            <div style="font-size: 16px;">Total: <b>${totalMarks}</b> / 1200</div>
            <div class="percent-display">${percentage.toFixed(2)}%</div>
        </div>
    `;
}

// Added this function for the Download Button
function downloadResult() {
    const resultBox = document.getElementById('result');
    if (resultBox.innerHTML === "") {
        alert("Please calculate the percentage first!");
        return;
    }
    // Opens the browser print/save dialog
    window.print();
}

function clearAll() {
    document.getElementById('batchSelect').value = "";
    document.getElementById('subjectInputs').innerHTML = "";
    document.getElementById('result').innerHTML = "";
}
