console.log("script 3 running");

let container3 = document.querySelector(".containers3");
let btn3 = document.getElementById("spin3");
let number3 = Math.ceil(Math.random() * 10000);
let mid3 = document.querySelector(".mid3");
let reset3 = document.getElementById("reset3");

let flash3 = document.querySelector(".containers3 .one3");

btn3.onclick = function () {
  container3.style.transform = "rotate(" + number + "deg)";
  number3 += Math.ceil(Math.random() * 10000);
  container3.classList.add("spin3");
  setTimeout(() => {
    container3.classList.add("hide-spinner3");
    // mid.classList.add("hide-mid");
  }, 3000);
};

async function getRandomUser() {
  try {
    const response = await fetch("http://192.168.16.81:8002/raffeldraw/list/");
    // const response = await fetch("https://jsonplaceholder.typicode.com/users");

    const users = await response.json();

    const randomUser = users[Math.floor(Math.random() * users.length)];

    return {
      id: randomUser.id,
      name: randomUser?.name,
      companyName: randomUser.companyName,
      designation: randomUser.designation,
    };
  } catch (error) {
    console.error("Error fetching random user:", error);
    return null;
  }
}

document.getElementById("spin3").addEventListener("click", async () => {
  const userDetailsContainer = document.getElementById("userDetails3");

  const randomUser = await getRandomUser();
  //   btn3.classList.add("hide-btn3");
  //   btn3.classList.remove("show-btn3");
  //   reset3.classList.add("show-btn3");
  //   reset3.classList.remove("hide-btn3");
  setTimeout(async () => {
    container3.classList.add("hide-spinner3");
    if (randomUser) {
      userDetailsContainer.innerHTML = `
        <h4>3rd Winner</h4>
        <p class='name-tag'>${randomUser?.name}</p>
        <p class='detail'>${randomUser?.companyName}</p>
        <p class='detail'>(${randomUser?.designation})</p>
        // <p class='name-tag'>${randomUser?.name}</p>
        // <p class='detail'>${randomUser?.website}</p>
        // <p class='detail'>(${randomUser?.company?.name})</p>
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
//   btn3.classList.add("show-btn3");
//   reset3.classList.add("hide-btn3");
// });
