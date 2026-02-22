const batchData = {
    science: ["English", "Malayalam/Hindi", "Physics", "Chemistry", "Biology/CS", "Mathematics"],
    commerce: ["English", "Malayalam/Hindi", "Business Studies", "Economics", "Accountancy", "Comp App/Maths/Stat/Poli"],
    humanities: ["English", "Malayalam/Hindi", "History", "Economics", "Political Science", "Sociology"]
};

function updateSubjects() {
    const batch = document.getElementById('batchSelect').value;
    const container = document.getElementById('subjectInputs');
    const result = document.getElementById('result');

    container.innerHTML = "";
    result.innerHTML = "";

    if (!batch) return;

    batchData[batch].forEach((subject, index) => {
        container.innerHTML += `
            <input 
                type="number" 
                id="sub${index}" 
                placeholder="${subject} (Max 200)"
                min="0"
                max="200"
                required
            >
        `;
    });
}

function calculatePercentage() {
    const batch = document.getElementById('batchSelect').value;

    if (!batch) {
        alert("Please select your batch!");
        return;
    }

    let totalMarks = 0;

    for (let i = 0; i < 6; i++) {
        const input = document.getElementById(`sub${i}`);
        const value = input.value;

        if (value === "") {
            alert("Please enter all subject marks!");
            return;
        }

        if (value < 0 || value > 200) {
            alert("Marks must be between 0 and 200!");
            return;
        }

        totalMarks += parseFloat(value);
    }

    const percentage = (totalMarks / 1200) * 100;

    // 🎉 Confetti Effect
    confetti({
        particleCount: 180,
        spread: 90,
        origin: { y: 0.6 }
    });

    // ✨ Attractive Result Display (No Circle)
    document.getElementById('result').innerHTML = `
        <div class="result-content">
            
            <div class="big-percentage">
                ${percentage.toFixed(2)}%
            </div>

            <div class="total-display">
                Total Marks: <span>${totalMarks}</span> / 1200
            </div>

        </div>
    `;
}

function clearAll() {
    document.getElementById('batchSelect').value = "";
    document.getElementById('subjectInputs').innerHTML = "";
    document.getElementById('result').innerHTML = "";
}
