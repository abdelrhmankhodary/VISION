  // عرض / إخفاء نموذج تسجيل الدخول
  const authLinks = document.querySelectorAll('.auth-links a');
  authLinks.forEach(link => {
      link.addEventListener('click', function() {
          const formType = this.innerText.toLowerCase();
          const authForm = document.querySelector('.auth-form');
          if (authForm) {
              authForm.style.display = 'block';
              authForm.innerText = `${formType} form displayed`; // يمكنك تغيير هذه الرسالة إلى رد فعل أخرى
          }
      });
  });

  // تشغيل الفيديو بدون صوت
  const video = document.querySelector('video');
  if (video) {
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
  }

  // رد فعل عند النقر على الصور المتحركة
  // Change opacity when mouse hovers over an image
  document.querySelectorAll('img').forEach(image => {
      // Exclude background and logo images
      if (!image.src.includes('background.png') && !image.src.includes('logo.png')) {
          image.addEventListener('mouseover', function() {
              this.style.opacity = '0.9'; // Change the opacity value as needed
          });

          // Restore opacity when mouse moves away from the image
          image.addEventListener('mouseout', function() {
              this.style.opacity = '1';
          });
      }
  });

  const form = document.querySelector('.auth-form');
  form.addEventListener('submit', function(event) {
      event.preventDefault(); // منع إرسال النموذج
      alert('Form submitted'); // عرض رسالة بأن النموذج قد تم تقديمه
  });

  window.addEventListener('load', function() {
      alert('Page loaded'); // عرض رسالة عندما تكتمل تحميل الصفحة
  });

  window.addEventListener('scroll', function() {
      // تنفيذ إجراء ما عند التمرير في الصفحة
      console.log('Scrolled');
  });

  const searchInput = document.querySelector('#search');
  searchInput.addEventListener('input', function() {
      // تنفيذ إجراء ما عند تغيير قيمة حقل البحث
      console.log('Search input changed');
  });

  const checkBox = document.querySelector('#checkbox');
  checkBox.addEventListener('change', function() {``
      // تنفيذ إجراء ما عند تحديد أو إلغاء تحديد الخانة
      console.log('Checkbox changed');
  });

  const inputField = document.querySelector('#inputField');
  inputField.addEventListener('change', function() {
      // تنفيذ إجراء ما عند تغيير قيمة حقل الإدخال
      console.log('Input field changed');
  });