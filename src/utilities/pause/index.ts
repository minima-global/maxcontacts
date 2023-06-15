function pause() {
  return new Promise((resolve) => setTimeout(resolve, 500));
}

export default pause;
