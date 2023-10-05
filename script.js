const dateTime = document.getElementsByClassName("date-time")[0];
const addBtn = document.getElementsByClassName("add-content")[0];
const contentWrapper = document.getElementsByClassName("content-wrapper")[0];
const contentList = document.getElementsByClassName("content-list")[0];
const taskList = document.getElementsByClassName("task-list")[0];
const createLocalStorage = () => {
  const storageData = JSON.parse(localStorage.getItem("tasklist"));
  let data = [];
  if (!storageData) {
    localStorage.setItem("tasklist", JSON.stringify(data));
  }
};
createLocalStorage();
const date = new Date();
const current_date =
  date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
const current_time =
  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
const date_time = current_date + " " + current_time;

const formBtn = addBtn.addEventListener("click", function () {
  if (!document.getElementsByClassName("add-form")[0]) {
    const createAddForm = () => {
      const addFormCard = document.createElement("div");
      addFormCard.innerHTML = `<input type="text" placeholder="Enter New Task"
            class="input-form w-10/12 m-2 rounded-lg p-1 focus:ring-zinc-800 focus:outline-none focus:ring-4 text-zinc-800 pl-4"><i
            class="addtask-button fa-solid fa-plus bg-zinc-800 rounded-full text-zinc-100 p-1 cursor-pointer"></i>`;
      addFormCard.classList.add(
        "add-form",
        "w-5/12",
        "bg-slate-300",
        "mt-3",
        "rounded-xl",
        "animate-show"
      );
      return addFormCard;
    };
    if (document.getElementsByClassName("nodata-card")[0]) {
      return contentWrapper.insertBefore(
        createAddForm(),
        document.getElementsByClassName("nodata-card")[0]
      );
    } else {
      return contentWrapper.insertBefore(createAddForm(), taskList);
    }
  }
  document.getElementsByClassName("add-form")[0].remove();
});
const data = JSON.parse(localStorage.getItem("tasklist"));
const taskBtn = function () {
  document.addEventListener("click", () => {
    if (event.target.classList.contains("addtask-button")) {
      const getLastId = () => {
        const data = JSON.parse(localStorage.getItem("tasklist"));
        if (data.length == 0) {
          return 1;
        } else {
          let lastId = data[data.length - 1].id;
          return lastId + 1;
        }
      };
      const input = document.getElementsByClassName("input-form")[0].value;
      const savedData = JSON.parse(localStorage.getItem("tasklist"));
      if (savedData.length == 0) {
        const data = [{ id: getLastId(), task: input, time: date_time }];
        localStorage.setItem("tasklist", JSON.stringify(data));
      } else {
        let data = [
          ...savedData,
          { id: getLastId(), task: input, time: date_time },
        ];
        localStorage.setItem("tasklist", JSON.stringify(data));
      }
      if (document.getElementsByClassName("nodata-card")[0]) {
        document.getElementsByClassName("nodata-card")[0].remove();
      } else {
      }
      const updatedData = JSON.parse(localStorage.getItem("tasklist"));
      let taskData = "";
      updatedData.map((i) => {
        taskData += taskCard(i);
      });
      taskList.innerHTML = taskData;
    }
  });
};
taskBtn();
const renderTicketList = function () {
  const savedData = JSON.parse(localStorage.getItem("tasklist"));
  if (savedData == 0) {
    const createNoDataCard = () => {
      const noData = document.createElement("div");
      noData.innerHTML = `NO TASK`;
      noData.classList.add(
        "nodata-card",
        "animate-show",
        "mt-3",
        "text-center",
        "text-xl"
      );
      return noData;
    };
    return contentWrapper.insertBefore(createNoDataCard(), taskList);
  } else {
    let taskData = "";
    savedData.map((i) => {
      taskData += taskCard(i);
    });
    taskList.innerHTML = taskData;
  }
};
renderTicketList();
function taskCard(i) {
  return `<div class="content-list w-3/4 bg-zinc-200 h-auto m-auto mt-3 rounded-xl p-1 flex flex-row animate-card justify-between">
            <div class=" data w-full">
                 <div class="date-time text-zinc-800 text-[12px] font-bold self-end text-center ml-3">
                     ${i.time}</div>
                 <div class="text-zinc-800 text-[15px] font-bold pb-4 pl-4 pr-4 pt-2 capitalize">${i.task}
                 </div>
             </div>
             <div class="delete-button text-red-800 text-2xl m-auto cursor-pointer mr-4
             rounded-full hover:text-red-950 hover:duration-150 active:text-red-800" >
                 <i class="fa-solid fa-trash delete-button" data-key="${i.id}"></i>
             </div>
          </div>`;
}

const deleteTask = () => {
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-button")) {
      const tes = confirm("Want to delete?");
      if (tes == true) {
        const data = JSON.parse(localStorage.getItem("tasklist"));
        const key = event.target.dataset.key;
        const result = data.findIndex((d) => key == d.id);
        if (result !== -1) {
          // splice(indexPosition, how many index to delete)
          const deletedData = data.splice(result, 1);
          localStorage.setItem("tasklist", JSON.stringify(data));
        }
        if (data.length == 0) {
          document.getElementsByClassName("content-list")[0].remove();
        }

        renderTicketList();
      } else {
        return console.log("delete canceled");
      }
    }
  });
};
deleteTask();
