const batchData = {
    science: ["English", "Second Language", "Physics", "Chemistry", "Biology/CS", "Mathematics"],
    commerce: ["English", "Second Language", "Business Studies", "Economics", "Accountancy", "Comp App/Maths/Stat/Poli"],
    humanities: ["English", "Second Language", "History", "Economics", "Political Science", "Sociology"]
};

function updateSubjects() {
    const batch = document.getElementById('batchSelect').value;
    const container = document.getElementById('subjectInputs');
    const totalMarkDiv = document.getElementById('totalMarkContainer'); 
    
    container.innerHTML = "";
    document.getElementById('result').innerHTML = "";

    if (!batch) {
        if(totalMarkDiv) totalMarkDiv.style.display = "none";
        return;
    }

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
    const maxTotalInput = document.getElementById('maxTotal'); 
    
    if (!batch) {
        alert("Please choose a batch!");
        return;
    }

    const maxTotal = maxTotalInput ? parseFloat(maxTotalInput.value) : 1200;

    let totalMarks = 0;
    for (let i = 0; i < 6; i++) {
        const value = document.getElementById(`sub${i}`).value;
        if (value === "" || value > 200 || value < 0) {
            alert("Please enter valid marks (0-200) for all subjects!");
            return;
        }
        totalMarks += parseFloat(value);
    }

    let percentage = (totalMarks / maxTotal) * 100;

    // --- PLAY SOUND ---
    const sound = document.getElementById("gradeSound");
    if (sound) {
        sound.currentTime = 0; // Reset sound to start
        sound.play().catch(e => console.log("Audio playback blocked by browser."));
    }

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <div id="targetResult" style="margin-top:15px; padding: 15px; background: #f9f9f9; border-radius: 10px; border: 2px solid #1cc88a;">
            <div style="font-size: 16px;">Total Obtained: <b>${totalMarks}</b> / ${maxTotal}</div>
            <div class="percent-display" style="font-size: 28px; font-weight: bold; color: #1cc88a;">${percentage.toFixed(2)}%</div>
        </div>
    `;

    setTimeout(() => {
        const element = document.getElementById("targetResult");
        if(element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, 150);

    confetti({
        particleCount: 180,
        spread: 90,
        origin: { y: 0.6 }
    });
}

// --- NEW: SAVE AS IMAGE FUNCTION ---
function saveAsImage() {
    const resultBox = document.getElementById("result");
    if (resultBox.innerHTML.trim() === "") {
        alert("Please calculate a result first!");
        return;
    }

    html2canvas(resultBox, {
        backgroundColor: "#ffffff",
        scale: 2 // Higher quality image
    }).then(canvas => {
        let link = document.createElement('a');
        link.download = 'My_Plus_Two_Result.png';
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}

function clearAll() {
    document.getElementById('batchSelect').value = "";
    document.getElementById('subjectInputs').innerHTML = "";
    document.getElementById('result').innerHTML = "";
    
    const totalMarkDiv = document.getElementById('totalMarkContainer');
    if(totalMarkDiv) totalMarkDiv.style.display = "none"; 
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
