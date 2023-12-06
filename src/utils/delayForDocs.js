export function delayForDocs(promise) {
  return new Promise((resolve) => {
    setTimeout(resolve, 500);
  }).then(() => promise);
}
