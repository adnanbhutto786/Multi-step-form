document.addEventListener('DOMContentLoaded', function(){
    const formSteps = document.querySelectorAll('.form-step');
    const steps = document.querySelectorAll('.step');
    const progress = document.getElementById('progress');
    const nextBtns = document.querySelectorAll('.next-btn');
    const prevBtns = document.querySelectorAll('.prev-btn');
    const submitBtn = document.querySelector('.submit-btn');
    const form = document.getElementById('multi-step-form');
    const summaryContainer = document.getElementById('summary-container');

    let currentStep = 0;

    updateForm();
    updateProgress();

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if(validateStep(currentStep)){
                currentStep++;
                updateForm();
                updateProgress();
                if(currentStep === formSteps.length-1){
                    generateSummary();
                }
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentStep--;
            updateForm();
            updateProgress();
        });
    });

    submitBtn.addEventListener('click', () => {
        alert('Form Submitted Successfully!');
        form.reset();
        currentStep = 0;
        updateForm();
        updateProgress();
        summaryContainer.innerHTML = '';
    });

    function updateForm(){
        formSteps.forEach((step,index)=>{
            step.classList.toggle('active', index===currentStep);
        });
    }

    function updateProgress(){
        steps.forEach((step,index)=>{
            step.classList.toggle('active', index<=currentStep);
        });
        progress.style.width = `${(currentStep/(steps.length-1))*100}%`;
    }

    function validateStep(stepIndex){
        const inputs = formSteps[stepIndex].querySelectorAll('input[required]');
        let valid = true;
        inputs.forEach(input => {
            if(!input.value.trim()){
                input.style.borderColor = 'red';
                valid = false;
            } else {
                input.style.borderColor = '#ccc';
            }
        });
        return valid;
    }

    function generateSummary(){
        summaryContainer.innerHTML = '';
        const formData = new FormData(form);
        formData.forEach((value,key)=>{
            const div = document.createElement('div');
            div.innerHTML = `<strong>${key}:</strong> ${value}`;
            summaryContainer.appendChild(div);
        });
    }
});
