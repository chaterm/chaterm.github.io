// 初始化AOS动画库
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 1)';
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 代码示例动态效果
const codeExamples = [
    `import dataprocess
from llm import training

# 快速开始示例
data = dataprocess.fetch("example.com")
training.prepare(data)`,
    `# 数据清洗示例
cleaned_data = dataprocess.clean(data)
metadata = dataprocess.extract_metadata(cleaned_data)
print(f"处理完成: {len(cleaned_data)} 条记录")`,
    `# 模型训练示例
model = training.create_model()
model.train(cleaned_data)
model.evaluate(test_data)`
];

let currentCodeIndex = 0;
const codeElement = document.querySelector('.code-window code');

// 每5秒切换一次代码示例
setInterval(() => {
    currentCodeIndex = (currentCodeIndex + 1) % codeExamples.length;
    if (codeElement) {
        codeElement.textContent = codeExamples[currentCodeIndex];
        // 添加打字机效果
        typeWriter(codeElement, codeExamples[currentCodeIndex]);
    }
}, 5000);

// 打字机效果函数
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// 响应式导航栏
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', () => {
        navbarCollapse.classList.toggle('show');
    });

    // 点击导航链接后自动收起菜单
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navbarCollapse.classList.remove('show');
        });
    });
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化第一个代码示例
    const codeElement = document.querySelector('.code-window code');
    if (codeElement) {
        typeWriter(codeElement, codeExamples[0]);
    }
}); 