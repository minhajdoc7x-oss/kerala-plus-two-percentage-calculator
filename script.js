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

    const sound = document.getElementById("gradeSound");
    if (sound) {
        sound.currentTime = 0; 
        sound.play().catch(e => console.log("Audio playback blocked."));
    }

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <div id="targetResult" style="margin-top:20px; padding: 25px; background: #ffffff; border-radius: 20px; border: 2px solid #1cc88a; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            <div style="font-size: 18px; color: #333; margin-bottom: 8px;">Total Marks: <b>${totalMarks} / ${maxTotal}</b></div>
            <div style="font-size: 34px; font-weight: 800; color: #5d81f1; margin-bottom: 10px;">Percentage: ${percentage.toFixed(2)}%</div>
            <div style="font-size: 22px; font-weight: 700; color: ${percentage >= 35 ? '#1cc88a' : '#e74a3b'}; margin-bottom: 20px;">Status: ${status}</div>
            
            <div style="text-align: left; margin-bottom: 20px;">
                <span style="font-size: 15px; font-weight: 700; color: #444;">📈 Performance Bar</span>
                <div style="width: 100%; background: #e9ecef; border-radius: 50px; height: 16px; margin-top: 8px; overflow: hidden; border: 1px solid #ddd;">
                    <div style="width: ${percentage}%; background: linear-gradient(90deg, #4e73df, #1cc88a); height: 100%; border-radius: 50px; transition: width 1.5s ease-in-out;"></div>
                </div>
            </div>

            <div style="border-top: none; margin-top: 15px; padding-top: 10px; font-family: 'Poppins', sans-serif;">
                
                <div style="height: 1.5px; width: 85%; max-width: 280px; background: #555; margin: 0 auto 15px auto;"></div>
                
                <b style="color: #666; font-size: 14px; letter-spacing: 1px; text-transform: uppercase;">Plus Two Result Portal</b><br>
                
                <style>
                    @keyframes rainbow {
                        0% { color: #ff0000; }
                        20% { color: #ff8000; }
                        40% { color: #ffff00; }
                        60% { color: #00ff00; }
                        80% { color: #0000ff; }
                        100% { color: #8b00ff; }
                    }
                    .changing-name {
                        font-size: 22px; 
                        font-weight: 900; 
                        margin: 10px 0; 
                        display: inline-block;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        animation: rainbow 3s infinite linear;
                        filter: drop-shadow(0px 2px 2px rgba(0,0,0,0.1));
                    }
                </style>

                <div class="changing-name">
                    Developed by Minhaj
                </div><br>
                
                <span style="color: #888; font-size: 14px; font-weight: 500;">Academic Year 2026</span>
                
                <div style="height: 1.5px; width: 85%; max-width: 280px; background: #555; margin: 15px auto 0 auto;"></div>
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
