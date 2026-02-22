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
        if (value === "" || value > 200 || value < 0) {
            alert("Please enter valid marks for all subjects!");
            return;
        }
        totalMarks += parseFloat(value);
    }

    let percentage = (totalMarks / 1200) * 100;

    // റിസൾട്ട് ഡിസ്‌പ്ലേ സെറ്റ് ചെയ്യുന്നു
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <div style="margin-top:15px; padding: 10px; background: #f9f9f9; border-radius: 10px;">
            <div style="font-size: 16px;">Total: <b>${totalMarks}</b> / 1200</div>
            <div class="percent-display" style="font-size: 24px; font-weight: bold; color: #1cc88a;">${percentage.toFixed(2)}%</div>
        </div>
    `;

    // --- ഇതാണ് താഴേക്ക് സ്ക്രോൾ ചെയ്യാനുള്ള ഉറപ്പുള്ള വഴി ---
    // ബട്ടൺ അമർത്തി റിസൾട്ട് വന്നാൽ ഉടൻ പേജ് താഴേക്ക് നീങ്ങും
    setTimeout(() => {
        window.scrollTo({
            top: document.body.scrollHeight, // പേജിന്റെ ഏറ്റവും താഴെ ഭാഗത്തേക്ക്
            behavior: 'smooth'
        });
    }, 100);

    confetti({
        particleCount: 180,
        spread: 90,
        origin: { y: 0.6 }
    });
}

function clearAll() {
    document.getElementById('batchSelect').value = "";
    document.getElementById('subjectInputs').innerHTML = "";
    document.getElementById('result').innerHTML = "";
    
    // ക്ലിയർ ചെയ്യുമ്പോൾ മുകളിലേക്ക് പോകാൻ
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
