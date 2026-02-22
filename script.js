const batchData = {
    science: ["English", "Second Language", "Physics", "Chemistry", "Biology/CS", "Mathematics"],
    commerce: ["English", "Second Language", "Business Studies", "Economics", "Accountancy", "Comp App/Maths/Stat/Poli"],
    humanities: ["English", "Second Language", "History", "Economics", "Political Science", "Sociology"]
};

function updateSubjects() {
    const batch = document.getElementById('batchSelect').value;
    const container = document.getElementById('subjectInputs');
    const totalMarkDiv = document.getElementById('totalMarkContainer'); // Link to the new HTML div
    
    container.innerHTML = "";
    document.getElementById('result').innerHTML = "";

    if (!batch) {
        if(totalMarkDiv) totalMarkDiv.style.display = "none";
        return;
    }

    // "Enter Total Mark" സെക്ഷൻ കാണിക്കുന്നു
    if(totalMarkDiv) totalMarkDiv.style.display = "block";

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
    const maxTotalInput = document.getElementById('maxTotal'); // "Enter Total Mark" ഇൻപുട്ട്
    
    if (!batch) {
        alert("Please choose a batch!");
        return;
    }

    const maxTotal = maxTotalInput ? parseFloat(maxTotalInput.value) : 1200;

    let totalMarks = 0;
    for (let i = 0; i < 6; i++) {
        const value = document.getElementById(`sub${i}`).value;
        if (value === "" || value > 200 || value < 0) {
            alert("Please enter valid marks for all subjects!");
            return;
        }
        totalMarks += parseFloat(value);
    }

    // യൂസർ നൽകിയ ടോട്ടൽ മാർക്ക് വെച്ച് ശതമാനം കണക്കാക്കുന്നു
    let percentage = (totalMarks / maxTotal) * 100;

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <div id="targetResult" style="margin-top:15px; padding: 15px; background: #f9f9f9; border-radius: 10px; border: 2px solid #1cc88a;">
            <div style="font-size: 16px;">Total: <b>${totalMarks}</b> / ${maxTotal}</div>
            <div class="percent-display" style="font-size: 28px; font-weight: bold; color: #1cc88a;">${percentage.toFixed(2)}%</div>
        </div>
    `;

    setTimeout(() => {
        const element = document.getElementById("targetResult");
        element.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 150);

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
    
    const totalMarkDiv = document.getElementById('totalMarkContainer');
    if(totalMarkDiv) totalMarkDiv.style.display = "none"; // ക്ലിയർ ചെയ്യുമ്പോൾ ബോക്സ് മറയ്ക്കുന്നു
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
