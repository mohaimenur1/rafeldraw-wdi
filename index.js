console.log("script running");

let container = document.querySelector(".containers");
let btn = document.getElementById("spin");
let number = Math.ceil(Math.random() * 10000);
let mid = document.querySelector(".mid");
let reset = document.getElementById("reset");

let flash = document.querySelector(".containers .one");

btn.onclick = function () {
  container.style.transform = "rotate(" + number + "deg)";
  number += Math.ceil(Math.random() * 10000);
  container.classList.add("spin");
  setTimeout(() => {
    container.classList.add("hide-spinner");
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

document.getElementById("spin").addEventListener("click", async () => {
  const userDetailsContainer = document.getElementById("userDetails");

  const randomUser = await getRandomUser();
  btn.classList.add("hide-btn");
  btn.classList.remove("show-btn");
  reset.classList.add("show-btn");
  reset.classList.remove("hide-btn");
  setTimeout(async () => {
    container.classList.add("hide-spinner");
    if (randomUser) {
      userDetailsContainer.innerHTML = `
        <h4>1st Prize</h4>
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
          body: JSON.stringify({ prizeNumber: 1 }),
        }
      );
      const user = await response.json();
      console.log("user1", user);

      return {
        user,
      };
    } catch (error) {
      console.error("Error fetching random user:", error);
      return null;
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  btn.classList.add("show-btn");
  reset.classList.add("hide-btn");
});

document.getElementById("reset").addEventListener("click", () => {
  location.reload(true);
});
