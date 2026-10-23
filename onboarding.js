let currentStep = 1;

const totalSteps = 4;

let userData = {
    goal: "",
    foodPreference: "",
    restrictions: [],
    budget: ""
};


// ===============================
// GOAL SELECTION
// ===============================

const goalOptions = document.querySelectorAll(".option");

goalOptions.forEach(option => {

    option.addEventListener("click", () => {

        goalOptions.forEach(item => {
            item.classList.remove("selected");
        });

        option.classList.add("selected");

        userData.goal = option.dataset.value;
    });

});


// ===============================
// FOOD PREFERENCE
// ===============================

const foodOptions = document.querySelectorAll(".food-option");

foodOptions.forEach(option => {

    option.addEventListener("click", () => {

        foodOptions.forEach(item => {
            item.classList.remove("selected");
        });

        option.classList.add("selected");

        userData.foodPreference = option.dataset.value;
    });

});


// ===============================
// DIETARY RESTRICTIONS
// ===============================

const restrictionLabels =
    document.querySelectorAll(".restriction-options label");

restrictionLabels.forEach(label => {

    const checkbox = label.querySelector("input");

    checkbox.addEventListener("change", () => {

        label.classList.toggle(
            "selected",
            checkbox.checked
        );

        updateRestrictions();

    });

});


function updateRestrictions() {

    const checked =
        document.querySelectorAll(
            ".restriction-options input:checked"
        );

    userData.restrictions = [];

    checked.forEach(item => {
        userData.restrictions.push(item.value);
    });

}


// ===============================
// BUDGET BUTTONS
// ===============================

const budgetButtons =
    document.querySelectorAll(".budget-options button");

const budgetInput =
    document.getElementById("budget");

budgetButtons.forEach(button => {

    button.addEventListener("click", () => {

        budgetInput.value =
            button.dataset.budget;

        userData.budget =
            button.dataset.budget;

    });

});


budgetInput.addEventListener("input", () => {

    userData.budget =
        budgetInput.value;

});


// ===============================
// NEXT STEP
// ===============================

function nextStep() {

    if (!validateStep()) {
        return;
    }

    if (currentStep < totalSteps) {

        document
            .getElementById(`step${currentStep}`)
            .classList.remove("active");

        currentStep++;

        document
            .getElementById(`step${currentStep}`)
            .classList.add("active");

        updateProgress();

    } else {

        finishOnboarding();

    }
}


// ===============================
// BACK
// ===============================

function previousStep() {

    if (currentStep > 1) {

        document
            .getElementById(`step${currentStep}`)
            .classList.remove("active");

        currentStep--;

        document
            .getElementById(`step${currentStep}`)
            .classList.add("active");

        updateProgress();
    }

}


// ===============================
// VALIDATION
// ===============================

function validateStep() {

    if (currentStep === 1) {

        if (userData.goal === "") {

            alert("Please select your goal.");

            return false;
        }
    }


    if (currentStep === 2) {

        if (userData.foodPreference === "") {

            alert("Please select your food preference.");

            return false;
        }
    }


    if (currentStep === 3) {

        if (userData.restrictions.length === 0) {

            alert("Please select at least one option.");

            return false;
        }
    }


    if (currentStep === 4) {

        if (
            userData.budget === "" ||
            Number(userData.budget) <= 0
        ) {

            alert("Please enter your daily food budget.");

            return false;
        }
    }

    return true;
}


// ===============================
// PROGRESS
// ===============================

function updateProgress() {

    const percentage =
        (currentStep / totalSteps) * 100;

    document.getElementById("progress").style.width =
        percentage + "%";

    document.getElementById("stepText").textContent =
        `Step ${currentStep} of ${totalSteps}`;

    document.getElementById("progressPercent").textContent =
        percentage + "%";


    const backButton =
        document.getElementById("backBtn");

    if (currentStep === 1) {

        backButton.style.visibility = "hidden";

    } else {

        backButton.style.visibility = "visible";

    }


    const nextButton =
        document.getElementById("nextBtn");

    if (currentStep === totalSteps) {

        nextButton.textContent =
            "Create My Plan ✨";

    } else {

        nextButton.textContent =
            "Continue →";

    }

}


// ===============================
// FINISH
// ===============================

function finishOnboarding() {

    console.log("User Profile:");

    console.log(userData);


    // Temporary storage.
    // Tomorrow we will replace this with Firebase Firestore.

    localStorage.setItem(
        "aaharaUser",
        JSON.stringify(userData)
    );


    alert(
        "Your Aahara360 profile is ready! 🌿"
    );


    window.location.href =
        "dashboard.html";
}


// Start progress
updateProgress();