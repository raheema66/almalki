document.getElementById('dataForm').addEventListener('submit', function(e) {
    e.preventDefault(); // منع إعادة تحميل الصفحة

    const name = document.getElementById('name').value.trim();
    const birthDate = document.getElementById('birthDate').value;
    const job = document.getElementById('job').value.trim();
    const specialization = document.getElementById('specialization').value.trim();

    // التحقق من صحة البيانات (يمكن توسيعها حسب الحاجة)
    if (!name || !birthDate || !job || !specialization) {
        displayMessage('يرجى ملء جميع الحقول.', 'red');
        return;
    }

    const data = {
        name,
        birthDate,
        job,
        specialization
    };

    // إرسال البيانات إلى الخادم باستخدام Fetch API
    fetch('/submit', { // تم تعديل URL ليكون نسبيًا
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if(result.success){
            displayMessage('تم حفظ البيانات بنجاح!', 'green');
            document.getElementById('dataForm').reset();
        } else {
            displayMessage('حدث خطأ أثناء حفظ البيانات.', 'red');
        }
    })
    .catch(error => {
        console.error('خطأ:', error);
        displayMessage('حدث خطأ أثناء الاتصال بالخادم.', 'red');
    });
});

function displayMessage(message, color) {
    const msgDiv = document.getElementById('message');
    msgDiv.style.color = color;
    msgDiv.textContent = message;
}
