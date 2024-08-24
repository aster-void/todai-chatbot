const chatMessagesElement = document.getElementById("chat-messages");
const chatMessageTemplateElement = document.getElementById(
  "chat-message-template"
);
const inputFormElement = document.getElementById("input-form");
const promptTextInputElement = document.getElementById("prompt-text-input");

inputFormElement.onsubmit = async (event) => {
  // フォームが送信されたときのページ遷移を防ぐ
  event.preventDefault();

  const promptText = promptTextInputElement.value.trim();
  if (promptText === "") return;
  promptTextInputElement.value = "";

  const yourChatMessage = { content: promptText };
  addChatMessageElement("you", yourChatMessage);

  const aiChatMessage = await postChat({ promptText });
  addChatMessageElement("ai", aiChatMessage);
};

// /chat に POST リクエストを送信する
async function postChat(request) {
  const response = await fetch("/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  return await response.json();
}

// メッセージを画面に描画する
function addChatMessageElement(author, chatMessage) {
  // template 要素 (HTMLTemplateElement) は content プロパティを持ち、cloneNode メソッドで複製して利用できる
  // 引数に true を渡すと子孫要素も複製される
  const fragment = chatMessageTemplateElement.content.cloneNode(true);
  // querySelector メソッドを用いると呼ばれたクラス内の要素を CSS のセレクタの記法で検索できる
  const rootElement = fragment.querySelector(".chat-message");
  const authorElement = fragment.querySelector(".chat-message__author");
  const contentElement = fragment.querySelector(".chat-message__content");
  const deleteButtonElement = fragment.querySelector(
    ".chat-message__delete-button"
  );

  // classList プロパティを使うと HTML の class 属性を簡単に操作できる
  rootElement.classList.add(`chat-message--${author}`);
  const authorLabelMap = { you: "あなた", ai: "AI" };
  authorElement.textContent = authorLabelMap[author];
  contentElement.textContent = chatMessage.content;
  deleteButtonElement.onclick = () => {
    rootElement.remove();
  };
  chatMessagesElement.appendChild(fragment);
}
