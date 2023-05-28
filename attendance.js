//var authenticate = "Not logged in";
//const CryptoJS = require('crypto-js');
///////////////////////////////////////////////////////////	
async function login(elementID) {
  var signup = document.getElementById("signupform");
  var signin = document.getElementById("signinform");
  var signupspan = document.getElementById("signupspan");
  var signinspan = document.getElementById("signinspan");
  
  if(elementID==="signupsubmit"){
	 document.getElementById("instructorIDloginmessage").innerHTML="";
	 document.getElementById("instructorPasswordloginmessage").innerHTML="";
	 document.getElementById("instructorIDmessage").innerHTML="";
	 document.getElementById("instructorPasswordmessage").innerHTML="";	
	 document.getElementById("confirmPasswordmessage").innerHTML="";
	let instructorID = document.getElementById("instructorID").value;
	let createpassword = document.getElementById("password").value;
	let confirmpassword = document.getElementById("confirmpassword").value;
	document.getElementById("instructorID").value="";
	document.getElementById("password").value="";
	document.getElementById("confirmpassword").value="";
	document.getElementById("instructorloginID").value="";
	document.getElementById("instructorpassword").value="";	
	
	if(instructorID === ""){
		document.getElementById("instructorIDmessage").innerHTML="Please enter Instructor's ID";	
	}
	else{
		if(instructorID !== ""){
				let instructorIDcheck = await InstructorByID(instructorID);
					if(typeof instructorIDcheck.id === "undefined"){
						document.getElementById("instructorIDmessage").innerHTML="Instructor ID doesn't exist";						
					}
					else{
						document.getElementById("instructorIDmessage").innerHTML="";	
						if(createpassword === ""){
							document.getElementById("instructorPasswordmessage").innerHTML="Please enter Password";							
						}
						else{
							if(createpassword.length<6 || createpassword.length>8){
								document.getElementById("instructorPasswordmessage").innerHTML="Password must be 6 to 8 digits";
							}
							else{
								document.getElementById("instructorPasswordmessage").innerHTML="";
								if(confirmpassword === ""){
									document.getElementById("confirmPasswordmessage").innerHTML="Please confirm Password";
								}
								else{
									if(confirmpassword !== createpassword){
										document.getElementById("confirmPasswordmessage").innerHTML="Password do not match";
									}
									else{
											let datastring = '{"instructorID" : '+Number(instructorID)+', "password" : "'+confirmpassword.toString()+'"}'
											let data = JSON.parse(datastring);
											let url = "http://localhost:8080/api/StaffLogin/CreateLogin";
											try{		
												let response = await fetch(url, {
													method: 'PUT',
													headers: {
														'Content-Type': 'application/json',
													},
													body: JSON.stringify(data),
												});
												
											let InstructorSignUp = await response.text();
												document.getElementById("confirmPasswordmessage").innerHTML=InstructorSignUp;						
										}
										catch(e){
											console.log(e);
										}
									}
								}
							}
						}							
							
					}
		}
	}	  
  }
  else if(elementID==="signinspan"){
	document.getElementById("instructorIDmessage").innerHTML="";
	document.getElementById("instructorPasswordmessage").innerHTML="";	
	document.getElementById("confirmPasswordmessage").innerHTML="";
	document.getElementById("instructorIDloginmessage").innerHTML="";
	document.getElementById("instructorPasswordloginmessage").innerHTML=""; 
	document.getElementById("signupform").style.display="none";
	document.getElementById("signinform").style.display="block";
	document.getElementById("signupspan").style.display="block";
	document.getElementById("signinspan").style.display="none";
	document.getElementById("instructorID").value="";
	document.getElementById("password").value="";
	document.getElementById("confirmpassword").value="";
	document.getElementById("instructorloginID").value="";
	document.getElementById("instructorpassword").value="";	
  }
  else if(elementID==="signinsubmit"){
	document.getElementById("instructorIDmessage").innerHTML="";
	document.getElementById("instructorPasswordmessage").innerHTML="";	
	document.getElementById("confirmPasswordmessage").innerHTML="";
	document.getElementById("instructorIDloginmessage").innerHTML="";
	document.getElementById("instructorPasswordloginmessage").innerHTML="";  
	let instructorloginID = document.getElementById("instructorloginID").value;
	let instructorpassword = document.getElementById("instructorpassword").value;
	document.getElementById("instructorID").value="";
	document.getElementById("password").value="";
	document.getElementById("confirmpassword").value="";
	document.getElementById("instructorloginID").value="";
	document.getElementById("instructorpassword").value="";	
	
	if(instructorloginID === ""){	
		document.getElementById("instructorIDloginmessage").innerHTML="Please enter Instructor's ID";	
	}
	else{
		if(instructorloginID !== ""){
				let instructorIDcheck = await InstructorByID(instructorloginID);
					if(typeof instructorIDcheck.id === "undefined"){
						document.getElementById("instructorIDloginmessage").innerHTML="Instructor ID doesn't exist";						
					}
					else{
						document.getElementById("instructorIDloginmessage").innerHTML="";	
						if(instructorpassword === ""){
							document.getElementById("instructorPasswordloginmessage").innerHTML="Please enter Password";							
						}
						else{
								let datastring = '{"instructorID" : '+Number(instructorloginID)+', "password" : "'+instructorpassword.toString()+'"}'
								let data = JSON.parse(datastring);
								let url = "http://localhost:8080/api/StaffLogin/LoginByInstructor";
											try{
												let response = await fetch(url, {
													method: 'POST',
													headers: {
														'Content-Type': 'application/json',
													},
													body: JSON.stringify(data),
												});
												
											let InstructorSignIn = await response.text();
											if(InstructorSignIn==="Authentication Success"){
												
												var useridencrypt = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(instructorloginID));
												var passwordencrpt = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(instructorpassword));
												setCookie("username",useridencrypt,0.1);

												//var useriddecrypt=CryptoJS.enc.Base64.parse(useridencrypt).toString(CryptoJS.enc.Utf8);
												//var passworddecrypt=CryptoJS.enc.Base64.parse(passwordencrpt).toString(CryptoJS.enc.Utf8);
												//authenticate="logged in";
												//location.href = "file:///D:/Study/COMP-600-002%20Software%20Architecture%20and%20Programming/Project/AttendanceManagementSystemJS/course.html";
											}
											else{
												document.getElementById("instructorPasswordloginmessage").innerHTML=InstructorSignIn;
											}												
										}
										catch(e){
											console.log(e);
										}
									}
								}
							}
						}							
							
					}
  else if(elementID==="signupspan"){
	document.getElementById("instructorIDmessage").innerHTML="";
	document.getElementById("instructorPasswordmessage").innerHTML="";	
	document.getElementById("confirmPasswordmessage").innerHTML="";
	document.getElementById("instructorIDloginmessage").innerHTML="";
	document.getElementById("instructorPasswordloginmessage").innerHTML=""; 
	document.getElementById("signupform").style.display="block";
	document.getElementById("signinform").style.display="none";
	document.getElementById("signupspan").style.display="none";
	document.getElementById("signinspan").style.display="block";
	document.getElementById("instructorID").value="";
	document.getElementById("password").value="";
	document.getElementById("confirmpassword").value="";
	document.getElementById("instructorloginID").value="";
	document.getElementById("instructorpassword").value="";		
  }

}
/////////////////////////////////////////////////////////
function setCookie(name, value, days) {
  const date = new Date();
  //date.setTime(date.getTime() + (days*24*60*60*1000));
  date.setTime(date.getTime() + (days*24*60*60*1000));
  let expires = "expires="+ date.toUTCString();
 
  console.log("date: "+date);
  console.log("time: "+date.getTime()); 
  console.log("new time: "+(date.getTime() + (days*24*60*60*1000)));
  
  console.log(name + "=" + value + ";" + expires + ";path=AttendanceManagementSystemJS/");
  document.cookie = name + "=" + value + ";" + expires + ";path=AttendanceManagementSystemJS/";
  decodedCookie = decodeURIComponent(document.cookie);
  console.log(decodedCookie);
  console.log("setting cookie");
  console.log(expires);
  console.log(document.cookie);
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  let user = getCookie("username");
  console.log("checking cookie");
   console.log(user);
  if (user != "") {
	var useriddecrypt=CryptoJS.enc.Base64.parse(user).toString(CryptoJS.enc.Utf8);
	console.log("Welcome again " + useriddecrypt);
    alert("Welcome again " + useriddecrypt);
  }
  else {
     //user = prompt("Please enter your name:","");
	 console.log("cookie not set");
     if (user == "" || user == null) {
    //   setCookie("username", user, 30);
		location.href = "http://localhost:8088/AttendanceManagementJS/login.html";
     }
  }
}
/////////////////////////////////////////////////////////
     async function getCourses() {
		let Courses; 
		try{
			let response = await fetch(
				"http://localhost:8080/api/Courses/AllCourses"
		  
			);
			Courses = await response.json();
		}
		catch(e){
			console.log(e);
		}
		var CourseID = ""
		var CourseName=""
			var table;
			var row;
			var cell1;
			var cell2;
			
		for(let i = Courses.length-1; i >=0; i--) {
			table = document.getElementById("course");
			row = table.insertRow(0);
			cell1= row.insertCell(0);
			cell2 = row.insertCell(1);

			CourseID=Courses[i].code
			CourseName=Courses[i].courseName;

				cell1.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;"+ CourseID + "&nbsp;&nbsp;&nbsp;";
				cell2.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + CourseName;
			}
			table = document.getElementById("course");
			row = table.insertRow(0);
			cell1= row.insertCell(0);
			cell2 = row.insertCell(1);
				cell1.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;"+ "Course ID" + "&nbsp;&nbsp;&nbsp;";
				cell2.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "Course Name" + "<br/>";
		return Courses;
	  }
//////////////////////////////////////////////////
	  async function CourseByName(coursename) {

		let url = "http://localhost:8080/api/Courses/CourseByName/"+coursename;

		let Courseadded;		
		try{
			let response = await fetch(
					url
			);				
			Courseadded = await response.json();
			console.log(Courseadded[0].code);
			console.log(Courseadded[0].courseName);
			return Courseadded;
		}
		catch(e){
			console.log(e);
		}
		
	}
//////////////////////////////////////////////////
	  async function CourseByID(code) {

		let url = "http://localhost:8080/api/Courses/CourseByID/"+code;

		let Courseadded;		
		try{
			let response = await fetch(
					url
			);				
			Courseadded = await response.json();
			console.log(Courseadded.code);
			console.log(Courseadded.courseName);
			return Courseadded;
		}
		catch(e){
			console.log(e);
		}
		
	}	
//////////////////////////////////////////////////	  
	  async function NewCourse() {
		 
		 var CourseName = document.getElementById("CourseName").value;
		 document.getElementById("CourseName").value = "";
		 let url = "http://localhost:8080/api/Courses/NewCourse/"+CourseName;
		 let NewCourseadded;
		 try{
			let response = await fetch(
				url
			);
			NewCourseadded = await response.json();

			var CourseID = ""
			var CourseName=""
				var table;
				var row;
				var cell1;
				var cell2;
			
			for(let i = NewCourseadded.length-1; i>=0; i--) {
				table = document.getElementById("new");
				row = table.insertRow(0);
				cell1= row.insertCell(0);
				cell2 = row.insertCell(1);

				CourseID=NewCourseadded[i].code
				CourseName=NewCourseadded[i].courseName;

					cell1.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;"+ CourseID + "&nbsp;&nbsp;&nbsp;";
					cell2.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + CourseName;
				}
				table = document.getElementById("new");
				row = table.insertRow(0);
				cell1= row.insertCell(0);
				cell2 = row.insertCell(1);
					cell1.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;"+ "Course ID" + "&nbsp;&nbsp;&nbsp;";
					cell2.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "Course Name" + "<br/>";
		
		 }
		 catch(e){
			 console.log(e);
		 }
	}
////////////////////////////////////////////////	
	  async function UpdateCourse() {
		
		let url = "http://localhost:8080/api/Courses/UpdateCourse";
		let CourseID = Number(document.getElementById("UpdateCourseID").value);
		let CourseName = document.getElementById("UpdateCourseName").value;
		document.getElementById("UpdateCourseID").value="";
		document.getElementById("UpdateCourseName").value="";
		let datastring = '{"code" : '+Number(CourseID)+', "courseName" : "'+CourseName.toString()+'"}'
		let data = JSON.parse(datastring);
		try{		
			let response = await fetch(url, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
		}
		catch(e){
			console.log(e);
		}
		
		let UpdatedCourseadded = await response.json();
		
		var CourseIDupdate = ""
		var CourseNameupdate=""
			var table;
			var row;
			var cell1;
			var cell2;
			
			table = document.getElementById("update");
			row = table.insertRow(0);
			cell1= row.insertCell(0);
			cell2 = row.insertCell(1);

			CourseIDupdate=UpdatedCourseadded.code
			CourseNameupdate=UpdatedCourseadded.courseName;

				cell1.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;"+ CourseIDupdate + "&nbsp;&nbsp;&nbsp;";
				cell2.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + CourseNameupdate;
			
			table = document.getElementById("update");
			row = table.insertRow(0);
			cell1= row.insertCell(0);
			cell2 = row.insertCell(1);
				cell1.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;"+ "Course ID" + "&nbsp;&nbsp;&nbsp;";
				cell2.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "Course Name" + "<br/>";
		  return UpdatedCourseadded;
	  }

///////////////////////////////////////////////
     async function getCourseSchedule() {
		 let url;
		 let CourseID;
		 let CourseName;
		 let FindCourse;
		 let FindCourseID;
		 let FindCourseName;
		 let CourseSchedule;
		 var table;
		 var row;
		 
		 var messagecount=0;
		 
		 if(parseInt(document.getElementById("Course").value, 10)){
			CourseID = document.getElementById("Course").value;
			FindCourse=await CourseByID(CourseID);
			FindCourseID=FindCourse.code;
			CourseID=FindCourseID;
			FindCourseName=FindCourse.courseName;			
			url="http://localhost:8080/api/Courses/CourseSchedule/"+CourseID;
		 }
		 else{
			CourseName = document.getElementById("Course").value;
			try{
				FindCourse=await CourseByName(CourseName);
				FindCourseID=FindCourse[0].code;
				CourseID=FindCourseID;
				FindCourseName=FindCourse[0].courseName;
				url="http://localhost:8080/api/Courses/CourseSchedule/"+CourseID;
			}
			catch(e){
					messagecount=messagecount+1;
					var cell1;
					table = document.getElementById("schedule");
					row = table.insertRow(0);
					cell1= row.insertCell(0);
					cell1.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;"+ "Please enter valid course name" + "&nbsp;&nbsp;&nbsp;";					
				}
			}
			
		document.getElementById("Course").value="";
		if(CourseID==FindCourseID && typeof CourseID!="undefined" && typeof FindCourseID!=="undefined"){
			try{
				let response = await fetch(
					url
				);
				CourseSchedule = await response.json();
			
				if(CourseSchedule.length>0){
					var Day1=""
					var Day2=""
					var Day3=""
						var table;
						var row;
						var cell1;
						var cell2;
						var cell3;
						var cell4;
						var cell5;

						table = document.getElementById("schedule");
						row = table.insertRow(0);
						cell1= row.insertCell(0);
						cell2 = row.insertCell(1);
						cell3 = row.insertCell(2);
						cell4 = row.insertCell(3);
						cell5 = row.insertCell(4);
				
						CourseID=CourseSchedule[0].code;
						CourseName=CourseSchedule[0].courseName;
						Day1=CourseSchedule[1].days;
						Day2=CourseSchedule[3].days;
						Day3=CourseSchedule[5].days;
				
							cell1.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;"+ CourseID + "&nbsp;&nbsp;&nbsp;";
							cell2.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + CourseName +"&nbsp;&nbsp;&nbsp;&nbsp;";
							cell3.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;"+ Day1 + "&nbsp;&nbsp;&nbsp;";
							cell4.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + Day2 +"&nbsp;&nbsp;&nbsp;&nbsp;";
							cell5.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + Day3 +"&nbsp;&nbsp;&nbsp;&nbsp;";
				
					table = document.getElementById("schedule");
					row = table.insertRow(0);
					cell1= row.insertCell(0);
					cell2 = row.insertCell(1);
					cell3 = row.insertCell(2);
					cell4 = row.insertCell(3);
					cell5 = row.insertCell(4);
					
					cell1.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;"+ "Course ID" + "&nbsp;&nbsp;&nbsp;";
					cell2.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "Course Name" +"&nbsp;&nbsp;&nbsp;&nbsp;";
					cell3.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;"+ "Day 1" + "&nbsp;&nbsp;&nbsp;";
					cell4.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "Day 2" +"&nbsp;&nbsp;&nbsp;&nbsp;";
					cell5.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "Day 3" +"&nbsp;&nbsp;&nbsp;&nbsp;";					
				}
				else{

						var table;
						var row;
						var cell1;

						table = document.getElementById("schedule");
						row = table.insertRow(0);
						cell1= row.insertCell(0);
						cell1.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;"+ "No schedule for given course" + "&nbsp;&nbsp;&nbsp;";
					}
				}
				catch(e){
					console.log(e);
				}
		}
		else{
			if(messagecount!=1){
				var cell1;
				table = document.getElementById("schedule");
				row = table.insertRow(0);
				cell1= row.insertCell(0);
				cell1.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;"+ "Please enter valid course ID" + "&nbsp;&nbsp;&nbsp;";
			}
		}
		
		return CourseSchedule;
	  }

///////////////////////////////////////////////
     async function DeleteCourse() {
		 let url;
		 let CourseID;
		 let CourseName;
		 let FindCourse;
		 let FindCourseID;
		 let FindCourseName;
		 let DeleteMessage;
		 var table;
		 var row;
		 
		 var messagecount=0;
		 
		 if(parseInt(document.getElementById("DeleteCourse").value, 10)){
			CourseID = document.getElementById("DeleteCourse").value;
			FindCourse=await CourseByID(CourseID);
			FindCourseID=FindCourse.code;
			CourseID=FindCourseID;
			FindCourseName=FindCourse.courseName;			
			url="http://localhost:8080/api/Courses/DeleteCourse/"+CourseID;
		 }
		 else{
			CourseName = document.getElementById("DeleteCourse").value;
			try{
				FindCourse=await CourseByName(CourseName);
				FindCourseID=FindCourse[0].code;
				CourseID=FindCourseID;
				FindCourseName=FindCourse[0].courseName;
				url="http://localhost:8080/api/Courses/DeleteCourse/"+CourseID;
			}
			catch(e){
					messagecount=messagecount+1;
					document.getElementById("DeletionMessage").innerHTML="Please enter valid course name";				
				}
			}
		
		if(CourseID==FindCourseID && typeof CourseID!="undefined" && typeof FindCourseID!=="undefined"){
			try{
				let response = await fetch(
					url,{
						method: 'DELETE',
					}
				);
				DeleteMessage = await response.text();
			
					if(DeleteMessage!=null){
						document.getElementById("DeletionMessage").innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;"+DeleteMessage;
					}
				}
				catch(e){
					console.log(e);
				}
		}
		else{
			if(messagecount!=1){
				document.getElementById("DeletionMessage").innerHTML="Please enter valid course ID";
			}
		}
		return DeleteMessage;
	  }	  

///////////////////////////////////////////////////////////	  
function ScheduleInputChange(){
	let inputTag=document.getElementById("Course").value;
	if(inputTag=="Enter ID or Name"){
		document.getElementById("Course").value="";
	}
	else if(inputTag==""){
		document.getElementById("Course").value="Enter ID or Name";		
	}
}
///////////////////////////////////////////////////////////	  
function DeleteInputChange(){
	let inputTag=document.getElementById("DeleteCourse").value;
	if(inputTag=="Enter ID or Name"){
		document.getElementById("DeleteCourse").value="";
	}
	else if(inputTag==""){
		document.getElementById("DeleteCourse").value="Enter ID or Name";		
	}
}

//////////////////////////////////////////////////////	  
     async function getInstructors() {
        try{
			let response = await fetch(
				"http://localhost:8080/api/Instructor/AllInstructors"
		  
			);
			let Instructors = await response.json();
		}
		catch(e){
			console.log(e);
		}
		
		var InstructorID = ""
		var InstructorName=""
			var table;
			var row;
			var cell1;
			var cell2;
			var cell3;
									
		for(let i = Instructors.length-1; i >=0; i--) {

			table = document.getElementById("intro");
			row = table.insertRow(0);
			cell1= row.insertCell(0);
			cell2 = row.insertCell(1);
			cell3 = row.insertCell(2);

			InstructorID=Instructors[i].id;
			InstructorName=Instructors[i].firstName+" "+Instructors[i].lastName;
			InstructorEmail=Instructors[i].email;
			
				cell1.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;"+ InstructorID + "&nbsp;&nbsp;&nbsp;";
				cell2.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + InstructorName +"&nbsp;&nbsp;&nbsp;&nbsp;";
				cell3.innerHTML=InstructorEmail + "&nbsp;&nbsp;&nbsp;";			
		}
			table = document.getElementById("intro");
			row = table.insertRow(0);
			cell1= row.insertCell(0);
			cell2 = row.insertCell(1);
			cell3 = row.insertCell(2);
				
			cell1.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;"+ "Instructor ID" + "&nbsp;&nbsp;&nbsp;";
			cell2.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "Instructor Name" +"&nbsp;&nbsp;&nbsp;&nbsp;";
			cell3.innerHTML="Email" + "&nbsp;&nbsp;&nbsp;"+ "<br/>";
		
		return Instructors;
	  }

///////////////////////////////////////////////////////////	 
	async function InstructorByID(id) {
		let Instructor;
		let url="http://localhost:8080/api/Instructor/InstructorByID/"+id;
		try{
			let response = await fetch(
				url
			);
			Instructor = await response.json();
			return Instructor;
		}
		catch(e){
			console.log(e);
		}			
	}
///////////////////////////////////////////////////////////	  
function myFunction(){
    var select = document.getElementById('Component');
    var value = select.value
    if (value == "course.html")
    {
		getCourses();
		
    }
    else if (value == "instructors.html")
    {	
		getInstructors();
		 
    }
    else if (value == "courseSchedule.html")
    {
	
    }
	else if (value == "Course Instructors")
    {
        window.location.href = "https://www.yahoo.com/";
    }
    else if (value == "Student's Courses")
    {
        window.location.href = "https://www.msn.com/";
    }
    else if (value == "Attendance Record")
    {
        window.location.href = "https://www.yahoo.com/";
    }
};


/*if(window.location.href === "file:///D:/Study/COMP-600-002%20Software%20Architecture%20and%20Programming/Project/AttendanceManagementSystemJS/course.html" && authenticate==="Not logged in"){
	location.href="file:///D:/Study/COMP-600-002%20Software%20Architecture%20and%20Programming/Project/AttendanceManagementSystemJS/login.html";
	authenticate="continue";
}
else if(window.location.href === "file:///D:/Study/COMP-600-002%20Software%20Architecture%20and%20Programming/Project/AttendanceManagementSystemJS/instructors.html" && authenticate==="Not logged in"){
	location.href="file:///D:/Study/COMP-600-002%20Software%20Architecture%20and%20Programming/Project/AttendanceManagementSystemJS/login.html";
	authenticate="continue";
}*/






/*async function myFunction() {
	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	var name =  getUsers().then(data => (data));
	await delay(2000);
	
  document.getElementById("demo").innerHTML = name;
 
}*/
/*   async function getCourses() {
		
        let response = await fetch(
          "http://localhost:8080/api/Courses/AllCourses"
		  
        );
		 
        let Courses = await response.json();
		var CourseID = ""
		var CourseName=""
		Courses.forEach(Course);
			document.getElementById("Course").innerHTML = CourseID;
        

		return data;
      }*/
	  
	 /* async function postUser() {
	    let url = "http://localhost:8080/api/NewCustomer";
        let data = {"firstName" : "Aman", "lastName" : "Bidla", "province" : "SK", "address1" : "", "phoneNumber" : "1-306-351-1777", "creditLimit" : 1000.0, "postalCode" : "S6H 1X3", "city" : "Moose Jaw", "address2" : ""};

        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
	  }*/