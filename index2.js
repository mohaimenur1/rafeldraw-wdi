console.log("script 2 running");

let container2 = document.querySelector(".containers2");
let btn2 = document.getElementById("spin2");
let number2 = Math.ceil(Math.random() * 10000);
let mid2 = document.querySelector(".mid2");
let reset2 = document.getElementById("reset2");

let flash2 = document.querySelector(".containers2 .one2");

btn2.onclick = function () {
  container2.style.transform = "rotate(" + number + "deg)";
  number2 += Math.ceil(Math.random() * 10000);
  container2.classList.add("spin2");
  setTimeout(() => {
    container2.classList.add("hide-spinner2");
    // mid.classList.add("hide-mid");
  }, 3000);
};

async function getRandomUser() {
  try {
    const response = await fetch("http://192.168.16.81:8002/raffeldraw/list/");
    const users = await response.json();

    const randomUser = users[Math.floor(Math.random() * users.length)];

    return {
      id: randomUser.id,
      name: randomUser.name,
      companyName: randomUser.companyName,
      designation: randomUser.designation,
    };
  } catch (error) {
    console.error("Error fetching random user:", error);
    return null;
  }
}

document.getElementById("spin2").addEventListener("click", async () => {
  const userDetailsContainer = document.getElementById("userDetails2");

  const randomUser = await getRandomUser();
  //   btn2.classList.add("hide-btn2");
  //   btn2.classList.remove("show-btn2");
  //   reset2.classList.add("show-btn2");
  //   reset2.classList.remove("hide-btn2");
  setTimeout(async () => {
    container2.classList.add("hide-spinner2");
    if (randomUser) {
      userDetailsContainer.innerHTML = `
        <h4>1st Winner</h4>
        <p class='name-tag'>${randomUser?.name}</p>
        <p class='detail'>${randomUser?.companyName}</p>
        <p class='detail'>(${randomUser?.designation})</p>
      `;
    }
  }, 4000);

  if (randomUser) {
    try {
      const response = await fetch(
        `http://192.168.16.81:8002/raffeldraw/winner/${randomUser.id}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const user = await response.json();
      console.log("user", user);

      return {
        user,
      };
    } catch (error) {
      console.error("Error fetching random user:", error);
      return null;
    }
  }
});

// document.addEventListener("DOMContentLoaded", () => {
//   btn.classList.add("show-btn2");
//   reset.classList.add("hide-btn2");
// });
