const STORAGE_KEY = "mybirdKeywords";
const X_SEARCH_BASE_URL = "https://x.com/search";

const form = document.getElementById("keywordForm");
const input = document.getElementById("keywordInput");
const list = document.getElementById("keywordList");
const statusMessage = document.getElementById("statusMessage");
const keywordCount = document.getElementById("keywordCount");
const searchAllButton = document.getElementById("searchAllButton");

let keywords = [];
let statusTimer;

// Load saved keywords each time the popup opens.
document.addEventListener("DOMContentLoaded", loadKeywords);
form.addEventListener("submit", handleAddKeyword);
searchAllButton.addEventListener("click", handleSearchAll);

function loadKeywords() {
  chrome.storage.local.get([STORAGE_KEY], (result) => {
    keywords = Array.isArray(result[STORAGE_KEY]) ? result[STORAGE_KEY] : [];
    renderKeywords();
  });
}

function saveKeywords() {
  chrome.storage.local.set({ [STORAGE_KEY]: keywords }, renderKeywords);
}

function handleAddKeyword(event) {
  event.preventDefault();

  const keyword = normalizeKeyword(input.value);

  if (!keyword) {
    showStatus("Enter a keyword first.");
    return;
  }

  if (hasKeyword(keyword)) {
    showStatus("That keyword is already saved.");
    input.select();
    return;
  }

  keywords = [...keywords, keyword];
  input.value = "";
  input.focus();
  showStatus("Keyword added.");
  saveKeywords();
}

function handleDeleteKeyword(keywordToDelete) {
  keywords = keywords.filter((keyword) => keyword !== keywordToDelete);
  showStatus("Keyword deleted.");
  saveKeywords();
}

function handleSearchKeyword(keyword) {
  openXSearch(keyword);
}

function handleSearchAll() {
  if (!keywords.length) {
    return;
  }

  // X supports OR in the query string, so combined searches stay readable.
  openXSearch(keywords.join(" OR "));
}

function renderKeywords() {
  list.textContent = "";

  keywords.forEach((keyword) => {
    const item = document.createElement("li");
    const name = document.createElement("span");
    const searchButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    item.className = "keyword-item";
    name.className = "keyword-name";
    name.textContent = keyword;
    name.title = keyword;

    searchButton.className = "search-button";
    searchButton.type = "button";
    searchButton.textContent = "Search";
    searchButton.addEventListener("click", () => handleSearchKeyword(keyword));

    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "×";
    deleteButton.title = `Delete ${keyword}`;
    deleteButton.setAttribute("aria-label", `Delete ${keyword}`);
    deleteButton.addEventListener("click", () => handleDeleteKeyword(keyword));

    item.append(name, searchButton, deleteButton);
    list.append(item);
  });

  keywordCount.textContent = `${keywords.length} ${keywords.length === 1 ? "keyword" : "keywords"}`;
  searchAllButton.disabled = keywords.length === 0;
}

function openXSearch(query) {
  // encodeURIComponent keeps spaces, symbols, and OR searches URL safe.
  const url = `${X_SEARCH_BASE_URL}?q=${encodeURIComponent(query)}&src=typed_query&f=live`;
  chrome.tabs.create({ url });
}

function normalizeKeyword(value) {
  return value.trim().replace(/\s+/g, " ");
}

function hasKeyword(keywordToCheck) {
  return keywords.some((keyword) => keyword.toLowerCase() === keywordToCheck.toLowerCase());
}

function showStatus(message) {
  window.clearTimeout(statusTimer);
  statusMessage.textContent = message;
  statusTimer = window.setTimeout(() => {
    statusMessage.textContent = "";
  }, 2200);
}
