function pause() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

export default pause;
