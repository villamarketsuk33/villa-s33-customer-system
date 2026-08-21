const LIFF_ID =
"2011171771-2kU5r1Xp";



const API_URL =
"https://script.google.com/macros/s/AKfycbyYwFxNc6yQIJZU8Md4ocY89pESFeleZFGjw6erVVh4lEfQXBceJhOUNkVPSRfVTW-S_g/exec";



let lineProfile={};

let employee={};




// --------------------
// Status
// --------------------

function status(msg){

document.getElementById("status")
.innerHTML =
"สถานะ : "+msg;

}





// --------------------
// Start LIFF
// --------------------

async function initLIFF(){


try{


status(
"กำลังเชื่อมต่อ LINE"
);



await liff.init({

liffId:LIFF_ID

});



if(!liff.isLoggedIn()){


status(
"Login LINE"
);


liff.login();

return;


}



const profile =
await liff.getProfile();



lineProfile={


userId:
profile.userId,


displayName:
profile.displayName


};



document
.getElementById("lineName")
.innerHTML =
profile.displayName;



status(
"LINE พร้อมใช้งาน"
);



}


catch(error){


status(
"ERROR : "+error.message
);


console.log(error);


}


}





// --------------------
// Search Employee
// --------------------


document
.getElementById("searchBtn")
.addEventListener(
"click",
searchEmployee
);



async function searchEmployee(){


const empId =
document
.getElementById("empId")
.value;



if(!empId){

alert(
"กรุณากรอกรหัสพนักงาน"
);

return;

}



status(
"กำลังค้นหาข้อมูล"
);



const response =
await fetch(

API_URL+
"?action=checkEmployee&id="
+
empId

);



const data =
await response.json();



if(data.found){


employee=data;



document
.getElementById("result")
.innerHTML=

`

<h3>
ข้อมูลพนักงาน
</h3>


<p>
<b>รหัส:</b>
${data.empId}
</p>


<p>
<b>ชื่อ:</b>
${data.firstname}
${data.lastname}
</p>


<p>
<b>แผนก:</b>
${data.department}
</p>


<p>
<b>ตำแหน่ง:</b>
${data.position}
</p>



<button
class="confirm"
onclick="registerUser()">

ยืนยันข้อมูล

</button>

`;


}

else{


document
.getElementById("result")
.innerHTML=

`
<p style="color:red">
ไม่พบข้อมูลพนักงาน
</p>
`;

}



}





// --------------------
// Register
// --------------------


async function registerUser(){


const body={


action:"register",

empId:
employee.empId,


lineUserId:
lineProfile.userId,


lineName:
lineProfile.displayName


};



const response =
await fetch(

API_URL,

{

method:"POST",

body:
JSON.stringify(body)

}

);



const result =
await response.json();



alert(result.message);



}




initLIFF();