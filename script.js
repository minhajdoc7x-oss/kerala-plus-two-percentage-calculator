const batchData = {
    science: ["English", "Malayalam/Hindi", "Physics", "Chemistry", "Biology/CS", "Mathematics"],
    commerce: ["English", "Malayalam/Hindi", "Business Studies", "Economics", "Accountancy", "Comp App/Maths/Stat"],
    humanities: ["English", "Malayalam/Hindi", "History", "Economics", "Political Science", "Sociology"]
};

function updateSubjects() {
    const batch = document.getElementById('batchSelect').value;
    const container = document.getElementById('subjectInputs');
    container.innerHTML = "";

    if (batch === "") {
        container.innerHTML = "<p style='color: #666; margin-top: 15px;'>Please select your batch to start.</p>";
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
    let hasError = false;

    for (let i = 0; i < 6; i++) {
        let val = document.getElementById(`sub${i}`).value;
        if (val === "") {
            hasError = true;
        }
        totalMarks += parseFloat(val) || 0;
    }

    if (hasError) {
        alert("Please fill all subject marks!");
        return;
    }

    let percentage = (totalMarks / 1200) * 100;

    // --- ഇതാണ് ആ എഫക്റ്റ് (Confetti Effect) ---
    var duration = 3 * 1000;
    var end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff0081', '#4e73df', '#1cc88a']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff0081', '#4e73df', '#1cc88a']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
    // ---------------------------------------

    document.getElementById('result').innerHTML = `
        <div style="font-size: 18px; color: #333; margin-top:10px; font-weight: bold;">Total Score: ${totalMarks} / 1200</div>
        <div class="percent-display">${percentage.toFixed(2)}%</div>
    `;
}

function clearAll() {
    document.getElementById('batchSelect').value = "";
    document.getElementById('result').innerHTML = "";
    updateSubjects();
}
