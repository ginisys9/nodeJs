var  apiUrl = 'http://localhost:3000/api/users',
logIn = document.getElementById("loginForm"),
register  = document.getElementById("registerForm");

if(register){
    register.addEventListener("submit",async (event)=>{
        event.preventDefault()
      
     var username = document.querySelector("#regUser").value,      
       email = document.querySelector("#regEmail").value,      
       password = document.querySelector("#regPass").value,
       result = await fetch(`${apiUrl}/register`,{
         method:'POST',
         headers:{"content-Type":"application/json"},
         body:JSON.stringify({username,email,password})
      }),
      data = await result.json()
     
      if (result.ok) {
        alert("Registration successful. You can login.")
        window.location.href= "login.html"
      }else{
       alert(data.message || 'Registration failed');
      }
    })
}


if(logIn)
{
logIn.addEventListener("submit", async (event)=>{
    event.preventDefault();
    
    var username = document.querySelector("#loginUser").value,
    password = document.querySelector("#loginPass").value,
    result = await fetch(`${apiUrl}/login`,{
         method:'POST',
         headers:{"Content-Type":"application/json"},
         body:JSON.stringify({username,password})
    }),
    data = await result.json();
    
    if(result.ok){
        localStorage.setItem("token",data.token);
        window.location.href="student.html";
    }else{
        alert(data.message || 'login failed')
    }
})
}