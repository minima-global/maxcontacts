function pause(length = 500) {
  return new Promise((resolve) => setTimeout(resolve, length));
}

export default pause;
