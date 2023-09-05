// global variable declaration==========================
let isNameValid = false;
let isEmailValid = false;
let isPhoneValid = false;

let currStep = 1;

let selectedPlan = "";
let planDuration = "monthly";
let addOns = [];

let totalPlanPrice;
let totalAddOnPrice;

// step-1 form =============================================

let form_input_fields = document.querySelectorAll(".form-1 input");
for (let input of form_input_fields) {
    input.addEventListener("keyup", validate_fields);
}

function validate_fields(event) {
    if (event.currentTarget.id == "name") {
        if (event.currentTarget.value == "") {
            document.querySelector(".form-1 .name .field-requirement-flag").classList.remove("noDisplay");
            isNameValid = false;
        } else {
            document.querySelector(".form-1 .name .field-requirement-flag").classList.add("noDisplay");
            isNameValid = true;
        }
    } else if (event.currentTarget.id == "email") {
        if (event.currentTarget.value == "") {
            document.querySelector(".form-1 .email .field-requirement-flag").classList.remove("noDisplay");
            isEmailValid = false;
        } else {
            document.querySelector(".form-1 .email .field-requirement-flag").classList.add("noDisplay");
        }

        if (event.currentTarget.value == "") {
            isEmailValid = false;
            document.querySelector(".form-1 .email-validation-flag").classList.add("noDisplay");
        } else if (validate_email(event.currentTarget.value)) {
            document.querySelector(".form-1 .email-validation-flag").classList.add("noDisplay");
            isEmailValid = true;
        } else {
            document.querySelector(".form-1 .email-validation-flag").classList.remove("noDisplay");
            isEmailValid = false;
        }
    } else if (event.currentTarget.id == "phone") {
        if (event.currentTarget.value == "") {
            document.querySelector(".form-1 .phone .field-requirement-flag").classList.remove("noDisplay");
        } else {
            document.querySelector(".form-1 .phone .field-requirement-flag").classList.add("noDisplay");
        }

        if (event.currentTarget.value == "") {
            isPhoneValid = false;
            document.querySelector(".form-1 .phone-validation-flag").classList.add("noDisplay");
        } else if (validate_phone(event.currentTarget.value)) {
            document.querySelector(".form-1 .phone-validation-flag").classList.add("noDisplay");
            isPhoneValid = true;
        } else {
            document.querySelector(".form-1 .phone-validation-flag").classList.remove("noDisplay");
            isPhoneValid = false;
        }
    }
}

function validate_email(email) {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regex.test(email)) {
        return true;
    } else {
        return false;
    }
}

function validate_phone(phone) {
    let regex = /([+]?\d{1,2}[.-\s]?)+(\d{3}[.-]?){2}\d{4}/g;
    if (regex.test(phone)) {
        return true;
    } else {
        return false;
    }
}

// navigation ==============================================================

let next_button = document.querySelector(".navigate .next");
next_button.addEventListener("click", open_next_form);

let form_1 = document.querySelector(".form-1");
let form_2 = document.querySelector(".form-2");
let form_3 = document.querySelector(".form-3");
let form_4 = document.querySelector(".form-4");
let thank_you = document.querySelector(".thank-you");

let step_1_number = document.querySelector(".step-1 .step-number");
let step_2_number = document.querySelector(".step-2 .step-number");
let step_3_number = document.querySelector(".step-3 .step-number");
let step_4_number = document.querySelector(".step-4 .step-number");

function open_next_form(event) {
    if (currStep == 1) {
        if (isNameValid && isEmailValid && isPhoneValid) {
            form_1.classList.add("noDisplay");
            form_2.classList.remove("noDisplay");
            document.querySelector(".navigate .pre").classList.remove("noDisplay");
            document.querySelector(".navigate").classList.remove("fix-navigate");
            step_1_number.classList.remove("selected-step-number");
            step_2_number.classList.add("selected-step-number");
            currStep = 2;
        } else {
            if (isNameValid == false) {
                document.querySelector(".form-1 .name .field-requirement-flag").classList.remove("noDisplay");
            }
            if (isEmailValid == false) {
                document.querySelector(".form-1 .email .field-requirement-flag").classList.remove("noDisplay");
            }
            if (isPhoneValid == false) {
                document.querySelector(".form-1 .phone .field-requirement-flag").classList.remove("noDisplay");
            }
        }
    } else if (currStep == 2) {
        if (selectedPlan != "") {
            form_2.classList.add("noDisplay");
            form_3.classList.remove("noDisplay");
            step_2_number.classList.remove("selected-step-number");
            step_3_number.classList.add("selected-step-number");
            currStep = 3;
        } else {
            document.querySelector(".form-2 .field-requirement-flag").classList.remove("noDisplay");
        }
    } else if (currStep == 3) {
        form_3.classList.add("noDisplay");
        form_4.classList.remove("noDisplay");
        activate_form_4();
        step_3_number.classList.remove("selected-step-number");
        step_4_number.classList.add("selected-step-number");
        document.querySelector(".navigate .next").innerText = "Confirm";
        document.querySelector(".navigate .next").classList.add("confirm");
        currStep = 4;
    } else if (currStep == 4) {
        form_4.classList.add("noDisplay");
        thank_you.classList.remove("noDisplay");
        document.querySelector(".navigate").classList.add("noDisplay");
    }
}

let pre_button = document.querySelector(".navigate .pre");
pre_button.addEventListener("click", open_previous_form);

function open_previous_form(event) {
    if (currStep == 2) {
        form_1.classList.remove("noDisplay");
        form_2.classList.add("noDisplay");
        pre_button.classList.add("noDisplay");
        document.querySelector(".navigate").classList.add("fix-navigate");
        step_2_number.classList.remove("selected-step-number");
        step_1_number.classList.add("selected-step-number");
        currStep = 1;
    } else if (currStep == 3) {
        form_3.classList.add("noDisplay");
        form_2.classList.remove("noDisplay");
        step_3_number.classList.remove("selected-step-number");
        step_2_number.classList.add("selected-step-number");
        currStep = 2;
    } else if (currStep == 4) {
        form_4.classList.add("noDisplay");
        form_3.classList.remove("noDisplay");
        step_4_number.classList.remove("selected-step-number");
        step_3_number.classList.add("selected-step-number");
        document.querySelector(".navigate .next").innerText = "Next Step";
        document.querySelector(".navigate .next").classList.remove("confirm");
        currStep = 3;
    }
}

// step -2 form========================================

let plans = document.querySelectorAll(".form-2 .plans .plan-card");

for (let plan of plans) {
    plan.addEventListener("click", select_plan);
}

function select_plan(event) {
    totalPlanPrice = "";
    document.querySelector(".form-2 .field-requirement-flag").classList.add("noDisplay");
    if (selectedPlan != "") {
        selectedPlan.classList.remove("selected-plan");
    }
    event.currentTarget.classList.add("selected-plan");
    selectedPlan = event.currentTarget;
}

let button = document.querySelector(".button");
button.addEventListener("click", change_duration);

function change_duration(event) {
    let arcade_price = document.querySelector(".form-2 .arcade .price");
    let advanced_price = document.querySelector(".form-2 .advanced .price");
    let pro_price = document.querySelector(".form-2 .pro .price");

    let online_service_price = document.querySelector(".form-3 .online-service .price");
    let larger_storage_price = document.querySelector(".form-3 .larger-storage .price");
    let customizable_profile_price = document.querySelector(".form-3 .customizable-profile .price");

    if (planDuration == "monthly") {
        arcade_price.innerHTML = "&dollar;90/yr";
        advanced_price.innerHTML = "&dollar;120/yr";
        pro_price.innerHTML = "&dollar;150/yr";

        online_service_price.innerHTML = "+&dollar;10/yr";
        larger_storage_price.innerHTML = "+&dollar;20/yr";
        customizable_profile_price.innerHTML = "+&dollar;20/yr";

        document.querySelector(".button .slider").classList.toggle("switch");
        planDuration = "yearly";
        let free_features = document.querySelectorAll(".plans .free");
        for (let free of free_features) {
            free.classList.remove("noDisplay");
        }
    } else {
        arcade_price.innerHTML = "&dollar;9/mo";
        advanced_price.innerHTML = "&dollar;12/mo";
        pro_price.innerHTML = "&dollar;15/mo";

        online_service_price.innerHTML = "+&dollar;1/mo";
        larger_storage_price.innerHTML = "+&dollar;2/mo";
        customizable_profile_price.innerHTML = "+&dollar;2/mo";

        document.querySelector(".button .slider").classList.toggle("switch");
        planDuration = "monthly";
        let free_features = document.querySelectorAll(".plans .free");
        for (let free of free_features) {
            free.classList.add("noDisplay");
        }
    }
}

// step -3 form=====================================
let add_ons = document.querySelectorAll(".form-3 .form-fields .add-on");
for (let add_on of add_ons) {
    add_on.addEventListener("click", select_add_on);
}

function select_add_on(event) {
    totalAddOnPrice = 0;
    addOns = [];
    if (event.target.tagName == "INPUT") {
        if (event.target.checked == false) {
            event.currentTarget.classList.remove("selected-add-on");
        } else {
            event.currentTarget.classList.add("selected-add-on");
        }
    } else {
        if (event.currentTarget.querySelector("input").checked == true) {
            event.currentTarget.querySelector("input").checked = false;
            event.currentTarget.classList.remove("selected-add-on");
        } else {
            event.currentTarget.querySelector("input").checked = true;
            event.currentTarget.classList.add("selected-add-on");
        }
    }

    for (let add_on of add_ons) {
        if (add_on.querySelector("input").checked == true) {
            addOns.push(add_on);
        }
    }
}

// step-4 form=============================================================

let plan_header = document.querySelector(".form-4 .plan-header");
let add_ons_div = document.querySelector(".form-4 .add-ons");

function activate_form_4() {
    totalAddOnPrice = 0;
    totalPlanPrice = "";

    let add_ons = document.querySelectorAll(".form-4 .add-ons .add-on");
    for (let add_on of add_ons) {
        add_ons_div.removeChild(add_on);
    }

    plan_header.querySelector(".plan-name-duration").innerText =
        selectedPlan.querySelector(".plan-name").innerText + " (" + planDuration[0].toUpperCase() + planDuration.slice(1) + ")";
    plan_header.querySelector(".price").innerHTML = selectedPlan.querySelector(".price").innerHTML;

    for (let add_on of addOns) {
        let add_on_div = document.createElement("div");
        add_on_div.classList.add("add-on");
        let name_p = document.createElement("p");
        name_p.classList.add("name");
        name_p.innerText = add_on.querySelector(".name").innerText;
        let price_p = document.createElement("p");
        price_p.classList.add("price");
        price_p.innerHTML = add_on.querySelector(".price").innerHTML;

        add_on_div.appendChild(name_p);
        add_on_div.appendChild(price_p);
        add_ons_div.appendChild(add_on_div);

        let new_price = "";
        for (let digit of add_on.querySelector(".price").innerHTML) {
            if (!isNaN(digit)) {
                new_price += digit;
            }
        }
        totalAddOnPrice += parseInt(new_price);
    }

    for (let digit of selectedPlan.querySelector(".price").innerHTML) {
        if (!isNaN(digit)) {
            totalPlanPrice += digit;
        }
    }
    totalPlanPrice = parseInt(totalPlanPrice);
    let total = totalAddOnPrice + totalPlanPrice;
    console.log(total);
    if (planDuration == "monthly") {
        document.querySelector(".total-price .price").innerHTML = "&dollar;" + total + "/" + planDuration.slice(0, 2);
    } else {
        document.querySelector(".total-price .price").innerHTML = "&dollar;" + total + "/" + "yr";
    }
}

let change_button = document.querySelector(".form-4 .change");
change_button.addEventListener("click", open_step_2);

function open_step_2(event) {
    form_4.classList.add("noDisplay");
    form_2.classList.remove("noDisplay");
    step_4_number.classList.remove("selected-step-number");
    step_2_number.classList.add("selected-step-number");
    currStep = 2;
}
