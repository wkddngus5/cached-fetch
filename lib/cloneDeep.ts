function cloneDeep(target: unknown) {
  return target ? JSON.parse(JSON.stringify(target)) : undefined;
}

export default cloneDeep;
