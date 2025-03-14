import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus, faTrash, faUtensils, faClipboardList, faChartPie, faEdit } from "@fortawesome/free-solid-svg-icons";
import BackButton from './BackButton.js'

export default function CalorieLogger() {
    const [bmrInfo, setBmrInfo] = useState(null);
    const [formData, setFormData] = useState({ age: "", gender: "male", height: "", weight: "", activity_level: "sedentary" });
    const [showBmrForm, setShowBmrForm] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [foodResults, setFoodResults] = useState([]);
    const [mealLog, setMealLog] = useState([]);
    const [totalCalories, setTotalCalories] = useState(0);
    const [warning, setWarning] = useState("");
    const userId = localStorage.getItem("userId") || "default_user"; 
    const API_URL = process.env.REACT_APP_BACKEND_URL;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    setLoading(true);
    Promise.all([
        fetch(`${API_URL}/api/bmr/${userId}`).then(res => res.json()),
        fetchMealLog()
    ]).then(([bmrData]) => {
        if (bmrData && bmrData.bmr) {
            setBmrInfo(bmrData);
            setShowBmrForm(false);
        }
    }).catch(error => {
        console.error("Error fetching data:", error);
    }).finally(() => {
        setLoading(false);
    });
}, []);

    const handleBmrSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${API_URL}/api/bmr`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userId, ...formData }),
        });
        const data = await response.json();
        setBmrInfo(data);
        setShowBmrForm(false);
    };

    const searchFood = async () => {
        if (!searchQuery) return;
        const response = await fetch(`${API_URL}/api/food/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await response.json();
        setFoodResults(data.slice(0, 5));
    };

//storing food logs using backend 
    // const addFood = async (food) => {
    //     const { description, foodNutrients } = food;
    //     const calories = foodNutrients.find(n => n.nutrientName === "Energy")?.value || 0;

    //     await fetch(`${API_URL}/api/food/log`, {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ user_id: userId, food_name: description, calories, quantity: "1 serving" }),
    //     });

    //     fetchMealLog();
    // };

    // const fetchMealLog = async () => {
    //     const response = await fetch(`${API_URL}/api/food/logs?user_id=${userId}`);
    //     const data = await response.json();
    //     setMealLog(data);

    //     const totalRes = await fetch(`${API_URL}/api/food/total-calories?user_id=${userId}`);
    //     const totalData = await totalRes.json();
    //     setTotalCalories(totalData.total_calories);

    //     if (bmrInfo && totalData.total_calories > bmrInfo.daily_calorie_limit) {
    //         setWarning("⚠️ You have exceeded your daily calorie limit!");
    //     } else {
    //         setWarning("");
    //     }
    // };

    // const removeFood = async (id) => {
    //     await fetch(`${API_URL}/api/food/log/${id}`, { method: "DELETE" });
    //     fetchMealLog();
    // };
    
//storing food logs using local browser 
    const addFood = (food) => {
        const { description, foodNutrients } = food;
        const calories = foodNutrients.find(n => n.nutrientName === "Energy")?.value || 0;
    
        const newFood = {
            id: Date.now(), // Unique ID based on timestamp
            food_name: description,
            calories,
            quantity: "1 serving",
            timestamp: Date.now() // Store the time food was added
        };
    
        const mealLog = JSON.parse(localStorage.getItem("mealLog")) || [];
        mealLog.push(newFood);
    
        localStorage.setItem("mealLog", JSON.stringify(mealLog));
        fetchMealLog();
    };

    const fetchMealLog = () => {
        let mealLog = JSON.parse(localStorage.getItem("mealLog")) || [];
        const now = Date.now();
    
        // Remove items older than 24 hours
        mealLog = mealLog.filter(food => now - food.timestamp < 86400000);
        
        // Save cleaned meal log back to localStorage
        localStorage.setItem("mealLog", JSON.stringify(mealLog));
    
        // Calculate total calories
        const totalCalories = mealLog.reduce((sum, food) => sum + food.calories, 0);
    
        setMealLog(mealLog);
        setTotalCalories(totalCalories); // Ensure this state is updated
    };
    
    // Call fetchMealLog on component mount
    useEffect(() => {
        fetchMealLog();
    }, []);
    
    
    const removeFood = (id) => {
        let mealLog = JSON.parse(localStorage.getItem("mealLog")) || [];
        mealLog = mealLog.filter(food => food.id !== id);
    
        localStorage.setItem("mealLog", JSON.stringify(mealLog));
        fetchMealLog();
    };
    
    

    const caloriesLeft = bmrInfo ? Math.max(bmrInfo.daily_calorie_limit - totalCalories, 0) : 0;
    const exceededCalories = totalCalories > bmrInfo?.daily_calorie_limit 
    ? totalCalories - bmrInfo.daily_calorie_limit 
    : 0;
    const caloriePercentage = bmrInfo
    ? Math.min((totalCalories / bmrInfo.daily_calorie_limit) * 100, 100)
    : 0;

    return (
        <div className="mt-4 p-4" style={{minHeight:"100vh", maxWidth:"1000px", margin:"5px auto"}}>
            <BackButton/>

            {loading ? (
                <div className="text-center my-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
        ) : (
            <>
                {showBmrForm ? (
                    <form onSubmit={handleBmrSubmit} className="mt-5 p-4 border rounded shadow bg-light" style={{maxWidth:"350px", margin:"5px auto"}}>
                        <div className="mb-3">
                            <label className="form-label">Age:</label>
                            <input type="number" className="form-control" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} required />
                        </div>
                    
                        <div className="mb-3">
                            <label className="form-label">Gender:</label>
                            <select className="form-select" value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    
                        <div className="mb-3">
                            <label className="form-label">Height (cm):</label>
                            <input type="number" className="form-control" value={formData.height} onChange={(e) => setFormData({ ...formData, height: e.target.value })} required />
                        </div>
                    
                        <div className="mb-3">
                            <label className="form-label">Weight (kg):</label>
                            <input type="number" className="form-control" value={formData.weight} onChange={(e) => setFormData({ ...formData, weight: e.target.value })} required />
                        </div>
                    
                        <div className="mb-3">
                            <label className="form-label">Activity Level:</label>
                            <select className="form-select" value={formData.activity_level} onChange={(e) => setFormData({ ...formData, activity_level: e.target.value })}>
                                <option value="sedentary">Sedentary: little or no exercise</option>
                                <option value="light">Exercise 1-3 times/week</option>
                                <option value="moderate">Exercise 4-5 times/week</option>
                                <option value="active">Daily exercise or intense exercise 3-4 times/week</option>
                                <option value="very_active">Intense exercise 6-7 times/week</option>
                            </select>
                        </div>
                    
                        <button type="submit" className="btn btn-primary w-100">Calculate & Save</button>
                    </form>
                
                ) : (
                    <div className="mb-4">
                        <div className="mt-3 border border-secondary rounded text-center" style={{padding:"10px 20px 0px 20px"}}>
                            <div className="d-flex justify-content-between">
                                <h3 className="fs-5 fw-bold">Your BMR Info : </h3>
                                <button  onClick={() => setShowBmrForm(true)}  className="btn btn-primary btn-sm">
                                    <FontAwesomeIcon icon={faEdit} className="align-center" />
                                </button>
                            </div>
                            <div className="mt-2 d-flex justify-content-between flex-wrap">
                                <p><strong>Age:</strong> {bmrInfo.age}</p>
                                <p><strong>Gender:</strong> {bmrInfo.gender}</p>
                                <p><strong>Height:</strong> {bmrInfo.height} cm</p>
                                <p><strong>Weight:</strong> {bmrInfo.weight} kg</p>
                                {/* <p><strong>BMR:</strong> {bmrInfo.bmr.toFixed(2)} Calories/day</p>  */}
                                <p><strong>BMR:</strong> {bmrInfo?.bmr ? bmrInfo.bmr.toFixed(2) : "N/A"} Calories/day</p>
                                <p><strong>Calorie Limit:</strong> {bmrInfo.daily_calorie_limit} kcal/day</p>
                            </div>
                        </div>

                        <div className="mt-5 p-4 border rounded shadow-sm bg-light">
                            <h2 className="text-center fw-bold mb-3">
                                <FontAwesomeIcon icon={faUtensils} className="text-primary me-2" />
                                Calorie Logger
                            </h2>

                            <div className="mb-3">
                                <div className="input-group">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => {setSearchQuery(e.target.value); searchFood();}}
                                    className="form-control"
                                    placeholder="Search for food..."
                                    style={{
                                        boxShadow:"none",
                                    }}
                                />
                                <button onClick={searchFood} className="btn btn-primary">
                                    <FontAwesomeIcon icon={faSearch} />
                                </button>
                                </div>
                            </div>

                            <div className="mb-3" >
                                {foodResults.map((food) => (
                                <div key={food.fdcId} className="d-flex justify-content-between align-items-center border rounded p-2 mb-2 bg-white">
                                    <span>{food.description} - {food.foodNutrients.find(n => n.nutrientName === "Energy")?.value || 0} kcal</span>
                                    <button onClick={() => addFood(food)} className="btn btn-success btn-sm">
                                    <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>
                                ))}
                            </div>

                            <h3 className="fw-bold">
                                <FontAwesomeIcon icon={faClipboardList} className="text-secondary me-2" />
                                Your Meal Log
                            </h3>
                            <div className="mb-3" style={{fontSize:"14px"}}>
                                {mealLog.map((food) => (
                                <div key={food.id} className="d-flex justify-content-between align-items-center border rounded p-2 mb-2 bg-white ">
                                    <span>{food.food_name} - {food.quantity} - {food.calories} kcal</span>
                                    <button onClick={() => removeFood(food.id)} className="btn btn-danger btn-sm">
                                    <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                                ))}
                            </div>

                            <h3 className="fw-bold text-center">
                                <FontAwesomeIcon icon={faChartPie} className="text-warning me-2" />
                                Total Calories: {totalCalories} kcal
                            </h3>
                            <div className="d-flex justify-content-center my-3">
                                <div style={{ width: 150, height: 150 }}>
                                <CircularProgressbar
                                    value={caloriePercentage}
                                    text={totalCalories > bmrInfo.daily_calorie_limit ? `${exceededCalories} kcal extra` : `${caloriesLeft} kcal left`}
                                    styles={buildStyles({
                                    textSize: "12px",
                                    pathColor: totalCalories > bmrInfo.daily_calorie_limit ? "#dc3545" : "#28a745",
                                    textColor: "#333",
                                    trailColor: "#ddd",
                                    strokeLinecap: "round"
                                    })}
                                />
                                </div>
                            </div>

                            {warning && (
                                <p className="text-danger fw-bold text-center mt-2">{warning}</p>
                            )}
                        </div>
                    </div>
                )}
            </>
        )}

        </div>
    );
}
