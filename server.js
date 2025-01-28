const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;
const FILE_NAME = 'slf.json';

// Middleware
app.use(bodyParser.json());
app.use(cors());

// خدمة الملفات الثابتة (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// نقطة النهاية لمعالجة البيانات المرسلة من النموذج
app.post('/submit', (req, res) => {
    const { name, birthDate, job, specialization } = req.body;

    if(!name || !birthDate || !job || !specialization){
        return res.json({ success: false, message: 'بيانات غير كاملة.' });
    }

    const userData = { name, birthDate, job, specialization };

    // قراءة البيانات الحالية من الملف إذا كان موجودًا
    let data = [];
    if(fs.existsSync(FILE_NAME)){
        const rawData = fs.readFileSync(FILE_NAME);
        try {
            data = JSON.parse(rawData);
        } catch (e) {
            console.error("خطأ في قراءة ملف JSON:", e);
            return res.json({ success: false, message: 'خطأ في ملف البيانات.' });
        }
    }

    // إضافة البيانات الجديدة
    data.push(userData);

    // كتابة البيانات مرة أخرى إلى الملف
    fs.writeFile(FILE_NAME, JSON.stringify(data, null, 2), (err) => {
        if(err){
            console.error("حدث خطأ أثناء كتابة الملف:", err);
            return res.json({ success: false, message: 'خطأ أثناء حفظ البيانات.' });
        }
        res.json({ success: true, message: 'تم حفظ البيانات بنجاح.' });
    });
});

// تشغيل الخادم
app.listen(PORT, () => {
    console.log(`الخادم يعمل على http://localhost:${PORT}`);
});
