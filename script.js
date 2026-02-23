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
    let status = percentage >= 35 ? "PASS ✅" : "FAILED ❌";

    // --- PLAY SOUND ---
    const sound = document.getElementById("gradeSound");
    if (sound) {
        sound.currentTime = 0; 
        sound.play().catch(e => console.log("Audio playback blocked."));
    }

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <div id="targetResult" style="margin-top:20px; padding: 20px; background: #ffffff; border-radius: 15px; border: 2px solid #1cc88a; text-align: center; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
            <div style="font-size: 18px; margin-bottom: 5px;">Total Marks: <b>${totalMarks} / ${maxTotal}</b></div>
            <div style="font-size: 32px; font-weight: bold; color: #4e73df; margin-bottom: 5px;">Percentage: ${percentage.toFixed(2)}%</div>
            <div style="font-size: 20px; font-weight: 700; color: ${percentage >= 35 ? '#1cc88a' : '#e74a3b'}; margin-bottom: 15px;">Status: ${status}</div>
            
            <div style="text-align: left; margin-bottom: 15px;">
                <span style="font-size: 14px; font-weight: bold; color: #333;">📈 Performance Bar</span>
                <div style="width: 100%; background: #e9ecef; border-radius: 10px; height: 15px; margin-top: 5px; overflow: hidden; border: 1px solid #ddd;">
                    <div style="width: ${percentage}%; background: linear-gradient(90deg, #4e73df, #1cc88a); height: 100%; transition: width 1s ease-in-out;"></div>
                </div>
            </div>

            <div style="border-top: 1px solid #eee; margin-top: 10px; padding-top: 15px; font-size: 13px; color: #666; line-height: 1.6;">
                ────────────────────────────<br>
                <b>PLUS TWO PERCENTAGE PORTAL</b><br>
                Developed by <b>Minhaj</b><br>
                Academic Year 2026<br>
                ────────────────────────────
            </div>
        </div>
    `;

    setTimeout(() => {
        const element = document.getElementById("targetResult");
        if(element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, 150);

    if (percentage >= 35) {
        confetti({
            particleCount: 180,
            spread: 90,
            origin: { y: 0.6 }
        });
    }
}

function saveAsImage() {
    const resultBox = document.getElementById("result");
    if (resultBox.innerHTML.trim() === "") {
        alert("Please calculate a result first!");
        return;
    }

    html2canvas(resultBox, {
        backgroundColor: "#ffffff",
        scale: 2 
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
