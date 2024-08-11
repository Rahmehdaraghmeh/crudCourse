var cousreName = document.getElementById("cousreName");
var cousreCatogare = document.getElementById("cousreCatogare");
var cousrePrice = document.getElementById("cousrePrice");
var cousreDescription = document.getElementById("cousreDescription");
var clickbtn = document.getElementById("click");
var deleteBtn = document.getElementById("deleteBtn");
var data = document.getElementById("data");
var courses;
var currentindex;
//بدل ما تكون فاضيه جبلي شو في في localstorage 
// جبلي واعرض قبل ما اضغط على اضافه
//مرات اول ما افتح برنامج ما في عندي اشي مخزن وراه يكون نال  لازم افحص
if (localStorage.getItem("courseList") == null) {
    courses = []
} else {
    courses = JSON.parse(localStorage.getItem("courseList"));
}
readData();

// من مبدا انو اخلي فانكش بس يعمل اشي واح فقط 
clickbtn.onclick = function() {
    if (clickbtn.innerHTML == "Add Course") {
        addCourse();
    } else {
        updatacourse();
        clickbtn.innerHTML == "Add Course" // بس اخلص تديث رجع للاصله 
    }

    readData();
    Clear();
}


function addCourse() {

    //حطيتهن في اوبجكيت لانو احسن لانو متغييرات مترابطة 
    var course = {
        Name: cousreName.value, //مشان اطول قيمه من input use .value 
        Catogare: cousreCatogare.value,
        Price: cousrePrice.value,
        Description: cousreDescription.value,
    };

    courses.push(course); //" "**" ضفت على الاريه مشان كل  ما اضيف اوبجكت احفظو"" *** مش  احذف القديم واضيف الجديد  ب
    localStorage.setItem("courseList", JSON.stringify(courses));
};

function readData() {
    //READ 
    var result = "";
    for (let i = 0; i < courses.length; i++) {
        result += `<tr>
         <td> ${i}</td>
         <td> ${courses[i].Name}</td>
         <td> ${courses[i].Catogare}</td>
         <td> ${courses[i].Price}</td>
         <td> ${courses[i].Description}</td>
           <td>  <button type="button " id="delete" class=" btn btn-outline-danger" onclick="deleteCourse(${i})">delete</button>
            <button type="button " id="update" class=" btn btn-outline-info" onclick="getCourseData(${i})">update</button></td> </tr>`

    }
    //store data om body table 
    data.innerHTML = result;
};

function Clear() {
    // clear 
    // tags  بدي بس اضيف افضي يل عندي مشان اضيف قيم جديد  يعني بدي اخلي قيمه فاضيه 
    cousreName.value = "";
    cousreCatogare.value = "";
    cousrePrice.value = "";
    cousreDescription.value = "";
}

function deleteCourse(index) { //بدي احذف بناءا عل موقع 
    courses.splice(index, 1);
    localStorage.setItem("courseList", JSON.stringify(courses)); // ارد ابعث الاريه معدله
    readData(); //لازم ارد لانو حذقت من اريه 
}
deleteBtn.onclick = function() {
    localStorage.removeItem("courseList"); // حتى احذف منها 
    courses = [];
    readData();
}

function search(e) {
    var result = "";
    for (let i = 0; i < courses.length; i++) {
        if (courses[i].Name.toLowerCase().includes(e.toLowerCase())) {
            result += `<tr>
         <td> ${i}</td>
         <td> ${courses[i].Name}</td>
         <td> ${courses[i].Catogare}</td>
         <td> ${courses[i].Price}</td>
         <td> ${courses[i].Description}</td>
           <td>  <button type="button " id="delete" class=" btn btn-outline-danger" onclick="deleteCourse(${i})">delete</button>
            <button type="button " id="update" class=" btn btn-outline-info">update</button></td> </tr>`

        }
    }
    //store data om body table 
    data.innerHTML = result;
}

function getCourseData(index) {
    cousreName.value = courses[index].Name; // حتر اعرض القيم في مدخلات 
    cousreCatogare.value = courses[index].Catogare;
    cousrePrice.value = courses[index].Price;
    cousreDescription.value = courses[index].Description;
    clickbtn.innerHTML = "update course";
    currentindex = index; // مشان وين احدث 
}

function updatacourse() {
    var course = {
        Name: cousreName.value, //مشان اطول قيمه الجديده  من input using  .value 
        Catogare: cousreCatogare.value,
        Price: cousrePrice.value,
        Description: cousreDescription.value,
    };
    courses[currentindex].Name = course.Name;
    courses[currentindex].Price = course.Price;
    courses[currentindex].Catogare = course.Catogare;
    courses[currentindex].Description = course.Description; // مشان اخذ القيمه الجديدة 
    localStorage.setItem("courseList", JSON.stringify(courses)); // مشان اضمن انو تعديل الجديد صار 

};