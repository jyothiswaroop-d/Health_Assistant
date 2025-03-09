document.getElementById("healthForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const age = parseInt(document.getElementById("age").value);
    const weight = parseInt(document.getElementById("weight").value);

    if (isNaN(age) || isNaN(weight) || age <= 0 || weight <= 0) {
        alert("Please enter valid age and weight.");
        return;
    }

    // Get personalized recommendations
    const { diet, healthSuggestions } = getRecommendations(age, weight);

    // Display the recommendations
    document.getElementById("dietPlan").innerHTML = `<strong>Diet Plan:</strong> ${diet}`;
    document.getElementById("healthSuggestions").innerHTML = `<strong>Health Suggestions:</strong> ${healthSuggestions}`;

    // Show the recommendations section
    document.getElementById("recommendations").classList.remove("hidden");
});

// Function to generate recommendations based on age and weight
function getRecommendations(age, weight) {
    let dietPlan = "";
    let healthSuggestions = "";

    // Diet Plan based on Age and Weight
    if (age <= 30) {
        if (weight <= 50) {
            dietPlan = "Increase protein intake and focus on whole grains, legumes, and healthy fats to gain muscle.";
            healthSuggestions = "Aim for 7-8 hours of sleep, stay hydrated, and include strength training in your routine.";
        } else if (weight <= 70) {
            dietPlan = "Maintain a balanced diet with a mix of lean protein, vegetables, and healthy fats.";
            healthSuggestions = "Stay active with cardio and strength training. Focus on 30 minutes of physical activity a day.";
        } else {
            dietPlan = "Focus on a calorie deficit with a mix of protein-rich foods, leafy greens, and healthy fats.";
            healthSuggestions = "Increase cardio activities like jogging or cycling and aim for 45 minutes of physical activity most days.";
        }
    } else if (age <= 50) {
        if (weight <= 60) {
            dietPlan = "Focus on a balanced diet with an emphasis on protein and moderate carbs. Include heart-healthy fats.";
            healthSuggestions = "Incorporate low-impact exercises such as walking or swimming, and focus on joint health.";
        } else if (weight <= 80) {
            dietPlan = "Moderate portion sizes and focus on whole foods. Limit processed sugars and carbs.";
            healthSuggestions = "Aim for 30-40 minutes of moderate-intensity exercise per day to manage weight.";
        } else {
            dietPlan = "Focus on a lower-calorie, high-protein diet with plenty of vegetables and fruits.";
            healthSuggestions = "Increase physical activity with a combination of cardio and strength exercises.";
        }
    } else {
        if (weight <= 60) {
            dietPlan = "Focus on nutrient-dense, low-calorie foods to maintain health and manage weight.";
            healthSuggestions = "Low-impact activities like walking or yoga are great for maintaining mobility.";
        } else {
            dietPlan = "A calorie-controlled, high-protein diet will help in weight management.";
            healthSuggestions = "Incorporate gentle exercises and prioritize flexibility and balance exercises.";
        }
    }

    return { diet: dietPlan, healthSuggestions };
}
