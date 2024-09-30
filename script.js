let previewContainer = document.querySelector('.course-preview');
let previewBox = previewContainer.querySelectorAll('.preview');

document.querySelectorAll('.course-container .course .buttons').forEach(button =>{
    button.onclick = () =>{
      previewContainer.style.display = 'flex';
      let name = button.closest('.course').getAttribute('data-name');
      
      previewBox.forEach(preview =>{
        let target = preview.getAttribute('data-target');
        if(name == target){
          preview.classList.add('active');
        }
      });
    };
  });

  previewBox.forEach(close =>{
    close.querySelector('.fa-times').onclick = () =>{
      close.classList.remove('active');
      previewContainer.style.display = 'none';
    };
  });


  function getCoursesFromLocalStorage() {
    let courses = localStorage.getItem('courses');
    return courses ? JSON.parse(courses) : [];
}

function saveCoursesToLocalStorage(courses) {
    localStorage.setItem('courses', JSON.stringify(courses));
}

function loadCourses() {
    let courses = getCoursesFromLocalStorage();
    courses.forEach(course => {
        addCourseToPage(course);
    });
}

function addCourseToPage(course) {
    let courseCount = document.querySelectorAll('.course').length + 1;
    let newCourse = document.createElement('div');
    newCourse.classList.add('course');
    newCourse.setAttribute('data-name', `p-${courseCount}`);
    newCourse.innerHTML = `
       <img src="images/buscar.png" alt="">
       <h3>${course.title}</h3>
       <p><span class="info">Profesor:</span> ${course.profesor}</p>
       <p><span class="info">Fecha de inicio:</span> ${course.date}</p>
       <p><span class="info">Duración: </span> ${course.duration} meses</p> <br>
       <p class="buttons"> Más información </p>
    `;

    document.querySelector('.course-container').appendChild(newCourse);

    let newPreview = document.createElement('div');
    newPreview.classList.add('preview');
    newPreview.setAttribute('data-target', `p-${courseCount}`);
    newPreview.innerHTML = `
       <i class="fas fa-times"></i>
       <img src="images/buscar.png" alt="">
       <h3>${course.title}</h3>
       <div class="preview-content">
           <p><span class="info">Profesor:</span> ${course.profesor}</p>
           <p><span class="info">Fecha de inicio:</span> ${course.date}</p>
           <p><span class="info">Duración: </span> ${course.duration} meses</p>
       </div>
       <p>${course.description}</p>
       <p class="buttons"> <i class="fa-solid fa-user-plus"></i>Registrarse</p>
    `;

    document.querySelector('.course-preview').appendChild(newPreview);

    // Configurar el botón de "Más información"
    newCourse.querySelector('.buttons').onclick = () => {
        previewContainer.style.display = 'flex';
        newPreview.classList.add('active');
    };

    // Configurar el botón de cerrar la previsualización
    newPreview.querySelector('.fa-times').onclick = () => {
        newPreview.classList.remove('active');
        previewContainer.style.display = 'none';
    };
}

document.getElementById('add-course-form').addEventListener('submit', function(e) {
    e.preventDefault();

    let title = document.getElementById('course-title').value;
    let profesor = document.getElementById('course-profesor').value;
    let date = document.getElementById('course-date').value;
    let duration = document.getElementById('course-duration').value;
    let description = document.getElementById('course-description').value;

    let newCourse = {
        title: title,
        profesor: profesor,
        date: date,
        duration: duration,
        description: description
    };

    let courses = getCoursesFromLocalStorage();
    courses.push(newCourse);
    saveCoursesToLocalStorage(courses);

    addCourseToPage(newCourse);

    document.getElementById('add-course-form').reset();
});

window.onload = loadCourses;