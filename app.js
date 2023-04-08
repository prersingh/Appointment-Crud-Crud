function submitdetails(event) {
    event.preventDefault();
    const fname = event.target.fname.value;
    const lname = event.target.lname.value;
    const mobile = event.target.mobile.value;
  
    const obj = {
      fname,
      lname,
      mobile,
    };
  
    axios
      .post("https://crudcrud.com/api/6de48a2af990435cbeaafa810bd75f44/AppointmentData", obj)
      .then((response) => {
        showuseronscreen(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    axios
      .get("https://crudcrud.com/api/6de48a2af990435cbeaafa810bd75f44/AppointmentData")
      .then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          showuseronscreen(response.data[i]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  function showuseronscreen(obj) {
    const parentelem = document.getElementById("listofitems");
    const childelem = document.createElement("li");
    childelem.textContent = obj.fname + " - " + obj.lname + " - " + obj.mobile;
  
    const deletebutton = document.createElement("input");
    deletebutton.type = "button";
    deletebutton.value = "Delete Input";
  
    deletebutton.onclick = () => {
      axios
        .delete(`https://crudcrud.com/api/6de48a2af990435cbeaafa810bd75f44/AppointmentData/${obj._id}`)
        .then(() => {
          parentelem.removeChild(childelem);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    const editbutton = document.createElement("input");
    editbutton.type = "button";
    editbutton.value = "Edit Input";
  
    editbutton.onclick = () => {
      document.getElementById("fname").value = obj.fname;
      document.getElementById("lname").value = obj.lname;
      document.getElementById("mobile").value = obj.mobile;
      document.getElementById("submitbutton").style.display = "none";
      const updatebutton = document.getElementById("updatebutton");
      updatebutton.style.display = "block";
      updatebutton.onclick = () => {
        axios
          .put(`https://crudcrud.com/api/6de48a2af990435cbeaafa810bd75f44/AppointmentData/${obj._id}`, {
            fname: document.getElementById("fname").value,
            lname: document.getElementById("lname").value,
            mobile: document.getElementById("mobile").value,
          })
          .then((response) => {
            childelem.textContent = response.data.fname + " - " + response.data.lname + " - " + response.data.mobile;
            document.getElementById("submitbutton").style.display = "block";
            updatebutton.style.display = "none";
          })
          .catch((err) => {
            console.log(err);
          });
      };
    };
  
    childelem.appendChild(deletebutton);
    childelem.appendChild(editbutton);
  
    parentelem.appendChild(childelem);
  }