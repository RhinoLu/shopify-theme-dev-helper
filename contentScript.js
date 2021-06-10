let try_count = 0;
const id = setInterval(() => {
  const iframe = document.querySelectorAll('iframe[context="Main"]')[0];
  if (iframe) {
    const buttons = iframe.contentDocument.querySelectorAll("a[class*='Polaris-Button_']");
    // console.log(buttons.length);
    if (buttons.length > 0) {
      clearInterval(id);
      const regex = /themes\/(.*)\/editor$/;
      buttons.forEach((anchor) => {
        // console.log(anchor.href, String(anchor.href).match(regex));
        const match = String(anchor.href).match(regex);
        if (match) {
          const theme_id = match[1];
          const span = document.createElement("span");
          span.textContent = theme_id;
          span.style.position = "absolute";
          span.style.right = "0";
          span.style.top = "0";
          span.style.cursor = "pointer";
          span.onclick = (e) => {
            navigator.clipboard.writeText(theme_id).then(() => {
              console.log('Async: Copying to clipboard was successful!');
            }, (err) => {
              console.error('Async: Could not copy text: ', err);
            });
          };
          anchor.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.append(span);
          anchor.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.position = "relative";
        }
      });
    }
  }
  try_count += 1;
  if (try_count > 100) {
    console.log("time out~");
    clearInterval(id);
  }
}, 500);