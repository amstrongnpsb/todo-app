const searchInput = document.getElementsByClassName("search-input")[0];
const getData = (input) => {
  const data = JSON.parse(localStorage.getItem("tasklist"));
  let filtered = data.filter((d) => d.task.includes(input));
  let taskData = "";
  filtered.map((i) => {
    taskData += taskCard(i);
  });
  taskList.innerHTML = taskData;
};
const input = searchInput.addEventListener("input", function (e) {
  onInput(e.target.value);
});
const onInput = debounce(getData, 1000);
function debounce(func, timeout) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
