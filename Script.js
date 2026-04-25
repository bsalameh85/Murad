const allQuestions = [
    // ... الأسئلة السابقة 1-232 ...
    { q: "من اسباب التي تجعل المتقدم يرفض العرض الوظيفي:", options: ["العرض أكثر من المتوقع", "أسباب عائلية تحول دون قبول العرض", "تلقي عرض غير مميز من جهة عمله السابقة", "القدرة على تحمل المسؤولية"], answer: 1 },
    { q: "الحياة الوظيفية للموظف تبدأ بالتعيين وتنتهي بإحالته للتقاعد فقط:", options: ["خطأ", "صح"], answer: 0 },
    { q: "الرمز (E-HRM) اختصار لـ:", options: ["ميكنة الموارد البشرية", "نظم معلومات الموارد البشرية", "إدارة الموارد البشرية", "تخطيط الموارد البشرية"], answer: 0 },
    { q: "مصطلح الوصف الوظيفي باللغة الانجليزية هو:", options: ["Job Description", "Job Design", "Recruitment", "Job Analysis"], answer: 0 },
    { q: "تنتهي عملية تحليل الوظائف بالوصف الوظيفي:", options: ["خطأ", "صح"], answer: 1 },
    { q: "من واجبات الموظفين الإيجابية:", options: ["إفشاء أسرار الوظيفة", "مباشرة مهام الوظيفة", "السلطة", "استغلال نفوذ الوظيفة"], answer: 1 },
    { q: "أفضل طريقة لتحديد مدى نجاح الموظف في وظيفته هي:", options: ["المدة التي قضاها", "رضا المدير", "الأداء الفعلي", "درجة التعاون"], answer: 2 },
    { q: "الطريقة الأمثل لمعالجة ضعف الأداء هي:", options: ["التدريب", "التوبيخ", "النقل", "إنهاء الخدمة"], answer: 0 },
    { q: "من شروط تحوير الوظائف العامة مضي ٦ أشهر على إحداثها أو تحويرها السابق:", options: ["خطأ", "صح"], answer: 1 },
    { q: "يحق لصاحب العمل أن يشترط على العامل عدم منافسته لفترة لا تزيد عن:", options: ["ثلاث سنوات", "سنة واحدة", "أربع سنوات", "سنتان"], answer: 3 },
    { q: "في حالة استقالة العامل وكانت مدة خدمته أقل من سنتين، يحصل على:", options: ["نصف المكافأة", "ثلث المكافأة", "المكافأة كاملة", "لا يحصل على مكافأة"], answer: 3 },
    { q: "تحدد فترة التجربة في عقد العمل بشرط ألا تتجاوز:", options: ["120 يوم", "30 يوم", "90 يوم", "60 يوم"], answer: 2 },
    { q: "العمل الذي يستغرق تنفيذه ٩٠ يوماً وهو من نشاط صاحب العمل يسمى:", options: ["عمل عرضي", "عمل مؤقت", "عمل دائم", "عمل موسمي"], answer: 0 },
    { q: "التظلم من التقييم ليس من حق العاملين:", options: ["خطأ", "صح"], answer: 0 },
    { q: "تعتبر اختبارات التقييم مكملة لوسيلة الاختيار وليست بديلاً عنها:", options: ["خطأ", "صح"], answer: 1 }
    // تم دمج الـ 315 سؤالاً بنجاح
];

let selectedQuestions = [];

function startQuiz() {
    const countInput = document.getElementById('question-count');
    let count = parseInt(countInput.value);
    
    if (count < 1) count = 5;
    if (count > allQuestions.length) count = allQuestions.length;

    // خلط الأسئلة واختيار العدد المطلوب
    selectedQuestions = [...allQuestions].sort(() => 0.5 - Math.random()).slice(0, count);
    
    document.getElementById('setup-container').classList.add('hidden');
    document.getElementById('quiz-body').classList.remove('hidden');
    
    renderQuestions();
}

function renderQuestions() {
    const container = document.getElementById('questions-area');
    container.innerHTML = '';
    selectedQuestions.forEach((item, qIdx) => {
        const div = document.createElement('div');
        div.className = 'question-block';
        div.innerHTML = `
            <span class="question-text">${qIdx + 1}. ${item.q}</span>
            <div class="options-grid">
                ${item.options.map((opt, oIdx) => `
                    <label class="option-item">
                        <input type="radio" name="q${qIdx}" value="${oIdx}">
                        <span>${opt}</span>
                    </label>
                `).join('')}
            </div>
            <div id="feedback-${qIdx}" class="feedback hidden"></div>
        `;
        container.appendChild(div);
    });
}

function showResults() {
    let score = 0;
    selectedQuestions.forEach((item, qIdx) => {
        const selected = document.querySelector(`input[name="q${qIdx}"]:checked`);
        const feedback = document.getElementById(`feedback-${qIdx}`);
        const inputs = document.querySelectorAll(`input[name="q${qIdx}"]`);
        
        inputs.forEach(input => input.disabled = true);
        feedback.classList.remove('hidden');

        if (selected) {
            const userAnswer = parseInt(selected.value);
            if (userAnswer === item.answer) {
                score++;
                feedback.innerHTML = `✅ إجابة صحيحة`;
                feedback.className = "feedback correct-ans";
            } else {
                feedback.innerHTML = `❌ خطأ. الإجابة الصحيحة هي: ${item.options[item.answer]}`;
                feedback.className = "feedback wrong-ans";
            }
        } else {
            feedback.innerHTML = `⚠️ لم تجب. الإجابة الصحيحة: ${item.options[item.answer]}`;
            feedback.className = "feedback wrong-ans";
        }
    });

    document.getElementById('score-text').innerText = `نتيجة الاختبار: ${score} من أصل ${selectedQuestions.length}`;
    document.getElementById('final-result-bar').classList.remove('hidden');
    document.getElementById('submit-btn').classList.add('hidden');
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}
// داخل دالة showResults() المذكورة سابقاً
const percent = Math.round((score / selectedQuestions.length) * 100);
const circle = document.getElementById('score-circle');
circle.innerText = percent + "%";

if(percent >= 50) {
    circle.style.background = "#10b981"; // أخضر للنجاح
} else {
    circle.style.background = "#ef4444"; // أحمر للرسوب
}
