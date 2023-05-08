const to_do_input = document.querySelector("#to_do");
const list = document.querySelector("#list");
const to_do_form = document.querySelector("#to_do_form");
const sc_feedback = document.querySelector("#sc_feedback");
const heading = document.querySelector("#heading");

to_do_form.addEventListener("submit", function (event) {
  event.preventDefault();
  let task = to_do_input.value;
  addTaskToDom(task);
  removeValue(to_do_input);
  screenReaderFeedback(task);
});

list.addEventListener("click", function (event) {
  if (hasClassName(event.target, "delete_task")) {
    const li = event.target.closest("li");
    const taskName = event.target.previousElementSibling.textContent;
    deleteTask(li);
    moveFocus(heading);
    screenReaderFeedback(taskName, "removed");
  }
});

function deleteTask(theTarget) {
  list.removeChild(theTarget);
}

function moveFocus(element) {
  element.focus();
}

function addTaskToDom(task) {
  let newId = generateID();
  let taskItem = createNewElement("li", "", list, ["class", "task"]);
  let checkbox = createNewElement("input", null, taskItem, [
    "type",
    "checkbox",
  ]);

  let label = createNewElement("label", task, taskItem, ["for", newId]);
  checkbox.setAttribute("id", newId);
  let deleteBtn = createNewElement("button", "Delete Task", taskItem, [
    "class",
    "delete_task",
  ]);
}

function createNewElement(tagName, textNode, parent, attribute = null) {
  let node = document.createElement(tagName);
  if (textNode != null) {
    let customTextNode = document.createTextNode(textNode);
    node.appendChild(customTextNode);
  }
  if (attribute != null) {
    node.setAttribute(attribute[0], attribute[1]);
  }
  parent.appendChild(node);
  return node;
}

function removeValue(input) {
  input.value = "";
}

function screenReaderFeedback(task, feedback = "added") {
  sc_feedback.textContent = `${task} ${feedback}`;
}

function generateID() {
  let idPrefix = "task_num_";
  let tasks = document.querySelectorAll("#list > li");
  if (tasks.length === 0) {
    return `${idPrefix}0`;
  }
  return idPrefix + tasks.length;
}

function hasClassName(element, className) {
  if (element.classList.contains(className)) {
    return true;
  } else {
    return false;
  }
}
