const resumeForm = document.getElementById("resumeForm");

resumeForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(resumeForm);
  const data = Object.fromEntries(formData.entries());

  const res = await fetch("/generate_resume", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.text();
 document.getElementById("resumeContent").innerText = result || "Failed to generate resume.";

});

    function downloadResume() {
      const element = document.getElementById("resumeContent");
      html2pdf().from(element).save("resume.pdf");
    }

    function saveResume() {
      const formData = new FormData(resumeForm);
      const data = Object.fromEntries(formData.entries());
      localStorage.setItem("myResume", JSON.stringify(data));
      alert("Resume saved locally!");
    }

    function loadResume() {
      const savedData = localStorage.getItem("myResume");
      if (savedData) {
        const data = JSON.parse(savedData);
        for (let key in data) {
          const el = document.getElementsByName(key)[0];
          if (el) el.value = data[key];
        }
        alert("Resume loaded.");
      } else {
        alert("No resume found.");
      }
    }

    function switchTemplate() {
      const container = document.querySelector(".container");
      const value = document.getElementById("template").value;
      if (value === "modern") {
        container.style.backgroundColor = "#f0f0ff";
        container.style.border = "2px solid #764ba2";
      } else if (value === "Advance") {
        container.style.backgroundColor = "#e4d1e8";
        container.style.border = "2px solid #1f1e45";
        
      } 
      else {
        container.style.backgroundColor = "#ffffff";
        container.style.border = "none";
      }
    }

    document.getElementById("photoInput").addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          document.getElementById("photoPlaceholder").innerHTML = `<img src="${e.target.result}" alt="Profile Photo">`;
        };
        reader.readAsDataURL(file);
      }
    });