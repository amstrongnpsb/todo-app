const dateTime = document.getElementsByClassName("date-time")[0];
const addBtn = document.getElementsByClassName("add-content")[0];
const contentWrapper = document.getElementsByClassName("content-wrapper")[0];
const contentList = document.getElementsByClassName("content-list")[0];
var date = new Date();
var current_date =
  date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
var current_time =
  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
var date_time = current_date + " " + current_time;
dateTime.innerHTML = date_time;

const formBtn = addBtn.addEventListener("click", function () {
  if (!document.getElementsByClassName("add-form")[0]) {
    const createAddForm = () => {
      const addFormCard = document.createElement("div");
      addFormCard.innerHTML = `<input type="text" placeholder="Enter New Task"
            class="input-form w-11/12 m-2 rounded-lg p-1 focus:ring-zinc-800 focus:outline-none focus:ring-4 text-zinc-800 pl-4"><i
            class="addtask-button fa-solid fa-plus bg-zinc-800 rounded-full text-zinc-100 p-1 cursor-pointer"></i>`;
      addFormCard.classList.add(
        "add-form",
        "w-10/12",
        "bg-slate-300",
        "mt-3",
        "rounded-xl",
        "animate-show"
      );
      return addFormCard;
    };
    return contentWrapper.insertBefore(createAddForm(), contentList);
  }
  document.getElementsByClassName("add-form")[0].remove();
});

const taskBtn = function () {
  document.addEventListener("click", () => {
    if (event.target.classList.contains("addtask-button")) {
      const input = document.getElementsByClassName("input-form")[0].value;
      var data = [
        { id: 1, task: "learn javascript " },
        { id: 2, task: "learn react" },
        { id: 3, task: "learn react" },
        { id: 4, task: "learn react" },
      ];
      localStorage.setItem("tasklist", JSON.stringify(data));
    }
  });
};
const getLastId = () => {
  const data = JSON.parse(localStorage.getItem("tasklist"));
  const lastId = data[data.length - 1].id;
  console.log(lastId);
};
taskBtn();
getLastId();
