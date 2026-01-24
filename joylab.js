let items = [];
const TAX_RATE = 0.07;

function estdCost() {
  const name = document.getElementById("materialname").value.trim();
  const quantity = parseFloat(document.getElementById("usedquantity").value);
  const pricePerUnit = parseFloat(document.getElementById("priceperunit").value);
  const commissionInput = document.getElementById("commissionPercent");
  const commissionPercent = commissionInput ? parseFloat(commissionInput.value) : 0;

  if (!name || isNaN(quantity) || isNaN(pricePerUnit) || quantity <= 0 || pricePerUnit <= 0) {
    alert("Please enter valid material details.");
    return;
  }

  if (commissionPercent < 0 || commissionPercent > 100) {
    alert("Commission percentage must be between 0 and 100.");
    return;
  }

  const cost = quantity * pricePerUnit;
  items.push({ name, quantity, pricePerUnit, cost });

  updateItemList();
  calculateCosts(commissionPercent);
  clearInputs();
}

function updateItemList() {
  const itemList = document.getElementById("itemList");
  itemList.innerHTML = ""; // Clear previous list

  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} — ${item.quantity} @ $${item.pricePerUnit.toFixed(2)} = $${item.cost.toFixed(2)}`;
    itemList.appendChild(li);
  });
}

function calculateCosts(commissionPercent) {
  const subtotal = items.reduce((sum, item) => sum + item.cost, 0);
  const tax = subtotal * TAX_RATE;
  const commission = subtotal * (commissionPercent / 100);
  const total = subtotal + tax + commission;

  document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("taxAmount").textContent = `$${tax.toFixed(2)}`;
  document.getElementById("commissionAmount").textContent = `$${commission.toFixed(2)}`;
  document.getElementById("totalCost").textContent = `$${total.toFixed(2)}`;
}

function clearInputs() {
  document.getElementById("materialname").value = "";
  document.getElementById("usedquantity").value = "";
  document.getElementById("priceperunit").value = "";
  
}

/*Security Page*/
window.onload = function () {
  const browserInfoList = document.getElementById("browserInfoList");

  const info = [
    `Browser Name: ${navigator.appName}`,
    `Browser Version: ${navigator.appVersion}`,
    `Browser Language: ${navigator.language}`,
    `Online Status: ${navigator.onLine ? "Online" : "Offline"}`,
    `Platform: ${navigator.platform}`,
    `User Agent: ${navigator.userAgent}`,
    `Screen Width: ${screen.width}px`,
    `Screen Height: ${screen.height}px`,
    `Available Width: ${screen.availWidth}px`,
    `Available Height: ${screen.availHeight}px`,
    `Color Depth: ${screen.colorDepth}`,
    `URL: ${location.href}`
  ];

  info.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    browserInfoList.appendChild(li);
  });
};


//Registration JSS
document.getElementById("registrationForm").addEventListener("submit", function (event) {
  event.preventDefault();

  try {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const course = document.getElementById("course").value;
    const checkboxes = document.querySelectorAll("input[name='interests']:checked");
    const selectedInterests = Array.from(checkboxes).map(cb => cb.value);

    // Password rule: at least one number and one special character (_, -, #)
    const passwordRegex = /^(?=.*[0-9])(?=.*[_\-#]).+$/;

    if (!name || !email || !password || !course || selectedInterests.length === 0) {
      throw new Error("Please fill out all fields and select at least one interest.");
    }

    if (!passwordRegex.test(password)) {
      throw new Error("Password must include at least one number and one special character (_, -, #).");
    }

    
    const registrationData = {
      name,
      email,
      password,
      course,
      interests: selectedInterests
    };

    
    console.log("Registration Successful:", registrationData);

    // Success message
    const msg = document.getElementById("formMsg");
    msg.textContent = "Registration successful!";
    msg.style.color = "green";

    document.getElementById("registrationForm").reset();

  } catch (error) {
   
    const msg = document.getElementById("formMsg");
    msg.textContent = error.message;
    msg.style.color = "red";
  }
});


/*Feedback Form*/
document.getElementById('simpleFeedbackForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const email = this.fbEmail.value.trim();
  const comments = this.fbComments.value.trim();
  const msg = document.getElementById('fbMessage');

  if (!email) {
    msg.style.color = 'red';
    msg.textContent = 'Please enter your email.';
    return;
  }
  if (!comments) {
    msg.style.color = 'red';
    msg.textContent = 'Please enter your feedback.';
    return;
  }

  msg.style.color = 'green';
  msg.textContent = 'Thank you for your feedback!';

  this.reset();
});
